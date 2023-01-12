import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const {$} = Helpers

const MODULE_KEY = 'champions'

const calculateCCShardProjection = (percentage, participants) => {
// formula from zoopokemon's spreadsheet
// return Math.max(
//     1,
//     Math.floor(
//         (Math.round(percentage * 100) / 100) *
//         (3 * participants + 4)
//     )
// )

    // the "socialist" formula
    // return Math.round((7/8) * Math.sqrt(participants))

    // zoopokemon's proposed shard range
    // percentage = Math.max(percentage, 0)
    // const percentagePoint = Math.round(percentage * 100)
    // const I = (p) => Math.ceil(100/p)
    // const h = (x) => 0.0075 * Math.pow(x - 1, 2) + 2

    // let max, min
    // const fairShare = I(participants)
    // const scale = h(participants)
    // if (percentagePoint <= fairShare) {
    //     max = Math.round(
    //         (
    //             (Math.ceil((5/3) * scale) - 1)
    //             /
    //             fairShare
    //         )
    //         * percentagePoint
    //         + 1
    //     )
    //     min = Math.round(
    //         (
    //             (Math.ceil((1/3) * scale) - 1)
    //             /
    //             fairShare
    //         )
    //         * percentagePoint
    //         + 1
    //     )
    // } else {
    //     max = Math.round(
    //         (
    //             (Math.ceil((5/3) * scale) - 1)
    //             /
    //             (4 * fairShare)
    //         )
    //         * (percentagePoint - fairShare)
    //         + Math.ceil((5/3) * scale)
    //     )
    //     min = Math.ceil((1/3) * scale)
    // }

    // return `${min}-${max}`

    // upcoming formula as promised by Noacc
    return Math.round(0.6 * Math.sqrt(participants)) + Math.round(percentage * 100)
}

class ChampionsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            restriction: {blacklist: ['HoH']},
            subSettings: [
                {
                    key: 'poseMatching',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_poseMatching`),
                    default: true
                },
                {
                    key: 'fixPower',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_fixPower`),
                    default: true
                }
            ]
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return ['champions/', 'clubs', 'club-champion'].some(page => Helpers.isCurrentPage(page))
    }

    run ({poseMatching, fixPower}) {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            if (Helpers.isCurrentPage('clubs')) {
                this.addChampionInfoOnClubsPage()
                this.fixChampRestTimer()
            }
            if (Helpers.isCurrentPage('champions/') || Helpers.isCurrentPage('club-champion')) {
                this.poseMatching({poseMatching, fixPower})
                this.showTicketsWhileResting()
                this.fasterSkipButton()
                this.showChampionLevel()
            }
        })

        this.hasRun = true
    }

    addChampionInfoOnClubsPage () {
        const {clubChampionsData, membersList, server_now_ts, HHTimers} = window
        if (!clubChampionsData || !clubChampionsData.fight.active || !clubChampionsData.fight.participants.length) {return}

        const {champion: {bar}, fight: {participants, start_time}, timers} = clubChampionsData
        const totalPositiveImpressionParticipants = participants.length //.filter(({challenge_impression_done}) => parseInt(challenge_impression_done) > 0).length

        const totalImpression = parseInt(bar.max)

        // Display impression and shard projections on the champ table
        participants.forEach(({id_member, challenge_impression_done}) => {
            const impression = parseInt(challenge_impression_done)
            const percentage = impression / totalImpression
            const shards = calculateCCShardProjection(percentage, totalPositiveImpressionParticipants)

            //
            const $cellHTML = $(`
                <div>${I18n.nThousand(impression)}</div>
                <div>${I18n.nRounding(percentage * 100, 2, 0)}% / <span class="shard"></span> x ${shards}</div>
            `)

            $(`#club_champions_body_table tbody [sorting_id=${id_member}] td.impression`).empty().append($cellHTML)
        })

        // Show participant count
        $('#club_champions_container').prepend(`<div class="script-participant-count">${this.label('participants', {participants: totalPositiveImpressionParticipants, members: membersList.length})}</div>`)

        // Mark members that haven't hit the champ
        const participatingMembers = participants.map(({id_member})=>id_member)
        const nonParticipatingMembers = membersList.filter(({id_member})=>!participatingMembers.includes(id_member))

        const highlightNonParticipants = () => {
            nonParticipatingMembers.forEach(({id_member}) => {
                $(`#members [sorting_id=${id_member}]`).addClass('non-participant')
            })
        }
        highlightNonParticipants()
        new MutationObserver(highlightNonParticipants).observe(document.getElementById('members'), {childList: true, subtree: true})

        // Fix broken progress bar in non-english locales
        const $clubChampionsBar = $('.club_champions_bar')
        $clubChampionsBar.attr('style', $clubChampionsBar.attr('style').replace(',','.'))

        // Add time since start
        const $timerFight = $('.club_champions_timer_fight')
        if ($timerFight.length) {
            const {format_time_short} = window

            const durationString = `<span class="script-round-duration-time">${format_time_short(server_now_ts - start_time)}</span>`
            const $dummyTimerTarget = $('<span class="dumy-timer-target" style="display:none!important;"></span>')
            $timerFight.append('<br/>').append(`<span class="script-round-duration">${this.label('clubChampDuration', {duration: durationString})}</span>`).append($dummyTimerTarget)
            const $durationEl = $timerFight.find('.script-round-duration')
            const $durationText = $durationEl.find('.script-round-duration-time')

            const timerDuration = clubChampionsData.timers.championFight - server_now_ts

            let timerId

            const onUpdate = () => {
                if (!timerId) {
                    return
                }
                const timer = HHTimers.timers[timerId]
                const remainingTime = timer.remainingTime

                $durationText.text(format_time_short(clubChampionsData.timers.championFight - remainingTime - clubChampionsData.fight.start_time))
            }
            const onComplete = ()=>{}

            timerId = HHTimers.initDecTimer($dummyTimerTarget, timerDuration, onComplete, onUpdate)
        }

        // Show challenge button instead of refill button while team resting
        $('.btn_skip_team_cooldown').hide()
        if (!$('.btn_skip_champion_cooldown').length) {
            $('.challenge_container').show()
        }

        // Fix team rest timer
        if (timers.teamRest) {
            const getTeamRestTimer = () => Object.values(HHTimers.timers).find(({$elm}) => $elm && $elm.selector === '.team_rest_timer')
            let teamRestTimer = getTeamRestTimer()
            const fixTimer = () => {
                teamRestTimer.remainingTime = parseInt(timers.teamRest) - server_now_ts
                teamRestTimer.update()
            }
            if (teamRestTimer) {
                fixTimer()
            } else {
                const observer = new MutationObserver(() => {
                    teamRestTimer = getTeamRestTimer()
                    if (teamRestTimer) {
                        observer.disconnect()
                        fixTimer()
                    }
                })

                observer.observe($('.team_rest_timer .text > span')[0], {childList: true})
            }
        }

    }

    fixChampRestTimer () {
        const {clubChampionsData, server_now_ts, HHTimers} = window
        if (!clubChampionsData || !clubChampionsData.fight.active) {return}
        const {timers} = clubChampionsData

        // Fix champ rest timer
        if (timers.teamRest) {
            const getTeamRestTimer = () => Object.values(HHTimers.timers).find(({$elm}) => $elm && $elm.hasClass && $elm.hasClass('team_rest_timer'))
            let championRestTimer = getTeamRestTimer()
            const fixTimer = () => {
                championRestTimer.remainingTime = parseInt(timers.teamRest) - server_now_ts
                championRestTimer.update()
            }
            if (championRestTimer) {
                fixTimer()
            } else {
                const observer = new MutationObserver(() => {
                    championRestTimer = getTeamRestTimer()
                    if (championRestTimer) {
                        observer.disconnect()
                        fixTimer()
                    }
                })

                observer.observe($('.team_rest_timer .text > span')[0], {childList: true})
            }
        }
    }

    poseMatching ({poseMatching, fixPower}) {
        const {championData} = window
        const {canDraft, champion, hero_damage} = championData

        if (!canDraft) {return}

        const {poses} = champion
        const figures = poses.map(fig=>`${fig}`)
        const figuresExtrapolated = [...figures, ...figures]

        const attachMatches = () => {
            const $girlSelection = $('.champions-middle__girl-selection')
            const {team} = championData

            team.forEach(({id_girl, figure, damage}, i) => {
                const $girl = $girlSelection.find(`[id_girl=${id_girl}]`)

                if (poseMatching) {
                    const rightPoseWrongPlace = figures.includes(figure)
                    const rightPoseRightPlace = figuresExtrapolated[i] === figure

                    let $marker = $girl.find('.script-pose-match')
                    if (!$marker.length) {
                        $marker = $('<span class="script-pose-match"></span>')
                        $girl.append($marker)
                    }

                    if (rightPoseRightPlace) {
                        $marker.addClass('green-tick-icon')
                        $marker.removeClass('empty')
                    } else if (rightPoseWrongPlace) {
                        $marker.addClass('green-tick-icon')
                        $marker.addClass('empty')
                    }
                }

                if (fixPower) {
                    const actualPower = damage + hero_damage
                    const $damage = $girl.find('[carac=damage]')
                    $damage.text(I18n.nRounding(actualPower, 1, 1)).attr('hh_title', I18n.nThousand(actualPower))
                }
            })
        }
        attachMatches()

        new MutationObserver(attachMatches).observe($('#contains_all>section')[0], {childList: true})

        const onDraft = (response) => {
            const {teamArray} = response
            window.championData.team = teamArray
        }
        Helpers.onAjaxResponse(/action=team_draft/, onDraft)
        Helpers.onAjaxResponse(/action=champion_team_draft/, onDraft)
        const onReorder = (response, opt) => {
            if (!response.success) {return}

            const searchParams = new URLSearchParams(opt.data)
            const reorderedIDs = searchParams.getAll('team_order[]')

            const {team} = championData

            const reorderedTeam = []
            reorderedIDs.forEach(id => {
                reorderedTeam.push(team.find(({id_girl})=>id_girl===id))
            })

            window.championData.team = reorderedTeam
            attachMatches()
        }
        Helpers.onAjaxResponse(/action=team_reorder/, onReorder)
        Helpers.onAjaxResponse(/action=champion_team_reorder/, onReorder)
    }

    showTicketsWhileResting () {
        const attachCount = () => {
            if (!$('.champions-bottom__ticket-amount').length) {
                const {championData} = window
                $('.champions-bottom__rest').css({'width': '280px'})
                    .before(`<div class="champions-bottom__ticket-amount"><span class="ticket_icn"></span>x ${championData.champion.currentTickets}</div>`)
            }
        }
        attachCount()
        new MutationObserver(attachCount).observe($('#contains_all>section')[0], {childList: true})
    }

    fasterSkipButton () {
        Helpers.onAjaxResponse(/class=TeamBattle/i, (response) => {
            const observer = new MutationObserver(() => {
                if ($('button.skip-button').length) {
                    $('button.skip-button').click(() => {
                        $('.rounds-info__counter .placeholder-num').text(response.battle.length)
                    })
                    $('button.skip-button').show()
                    observer.disconnect()
                }
            })
            observer.observe($('#contains_all > section')[0], {childList: true})
        })
    }

    showChampionLevel () {
        const {championData, GT} = window
        if (!championData) {return}
        const {champion} = championData
        if (!champion) {return}
        const {level} = champion
        if (!level) {return}

        const annotate = () => {
            $('.champions-top__title').append(`<span class="script-champ-level">(${GT.design.Lvl} ${level})</span>`)
        }
        if ($('.champions-top__title').length) {
            annotate()
        } else {
            const observer = new MutationObserver(() => {
                if ($('.champions-top__title').length) {
                    annotate()
                    observer.disconnect()
                }
            })
            observer.observe($('#contains_all > section')[0], {childList: true})
        }
    }
}

export default ChampionsModule
