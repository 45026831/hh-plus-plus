/* global leagues_list, playerLeaguesData */

import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import Sheet from '../../common/Sheet'

import meanIcon from '../../assets/mean.svg'

import styles from './styles.lazy.scss'
import { lsKeys } from '../../common/Constants'

const MODULE_KEY = 'league'

const TOPS = [4, 15, 30]
const CHALLENGES_PER_PLAYER = 3

const getScoreDisplayDataForTop = (currentPos, currentScore, top, scoreToBeat, scoreToStayAbove) => {
    let symbol = ''
    let diff
    let score
    let labelKey
    if (currentPos <= top) {
        score = scoreToStayAbove
        diff = currentScore - scoreToStayAbove
        if (diff) {
            symbol = '-'
        }
        labelKey = 'stayInTop'
    } else {
        score = scoreToBeat + 1
        diff = score - currentScore
        symbol = '+'
        labelKey = 'notInTop'
    }

    return {
        symbol,
        diff,
        score,
        labelKey
    }
}

class LeagueInfoModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            subSettings: [
                {
                    key: 'board',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_board`),
                    default: true
                },
                {
                    key: 'promo',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_promo`),
                    default: true
                }
            ]
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)

        this.aggregates = {
            challengesDone: 0,
            challengesPossible: 0,
            challengesTotal: 0,
            playersTotal: 0,
            levelRange: {
                min: 0,
                max: 0,
                median: 0,
            },
            playerRank: 0,
            playerScore: 0,
            tops: {},
            demotions: {},
            demoteThreshold: 0,
            avg: 0,
            scoreExpected: 0,
        }

        this.possibleChallengesTooltip = ''
    }

    shouldRun () {
        return Helpers.isCurrentPage('tower-of-fame')
    }

    run ({board, promo}) {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()
            this.aggregateData()
            this.displaySummary({board, promo})
            this.manageTableAnnotations()
            this.manageHideFoughtOpponents()
        })

        this.hasRun = true
    }

    injectCSSVars () {
        Sheet.registerVar('legendary-bg', `url("${Helpers.getCDNHost()}/legendary.png")`)
    }

    aggregateData() {
        const {leagues_list, season_end_at, Hero} = window
        const playersTotal = leagues_list.length
        this.aggregates.playersTotal = playersTotal

        const posPointsIndex = {}

        const demoteThreshold = playersTotal-14
        const nonDemoteThreshold = playersTotal-15
        this.aggregates.demoteThreshold = demoteThreshold
        const thresholds = [...TOPS, ...TOPS.map(top => top+1)]

        const levels = []

        leagues_list.forEach(({nb_challenges_played, level, place, class: rowClass, html}) => {
            const $row = $(html.replace(/[\n\t]/g, ''))

            levels.push(parseInt(level, 10))

            const points = I18n.parseLocaleRoundedInt($row.eq(4).text())

            posPointsIndex[place] = points
            if (thresholds.includes(place)) {
                this.aggregates.tops[place] = points
            }
            if (demoteThreshold === place) {
                this.aggregates.demotions.demote = points
            } else if (nonDemoteThreshold === place) {
                this.aggregates.demotions.nonDemote = points
            }

            if (rowClass && rowClass.includes('personal_highlight')) {
                // is self
                this.aggregates.playerRank = place
                this.aggregates.playerScore = points
            } else {
                this.aggregates.challengesDone += parseInt(nb_challenges_played, 10)
            }
        })

        const challengesPossibleMinutes = parseInt(Math.floor(season_end_at/60), 10)
        const challengesPossible = (Hero.energies.challenge.amount !== Hero.energies.challenge.max_amount)? Math.floor((challengesPossibleMinutes + (35 - Hero.energies.challenge.next_refresh_ts / 60))/35) + parseInt(Hero.energies.challenge.amount, 10) : Math.floor(challengesPossibleMinutes/35) + parseInt(Hero.energies.challenge.amount, 10)
        this.aggregates.challengesPossible = challengesPossible

        levels.sort((a,b) => a-b)
        const midpoint = Math.floor(levels.length / 2)
        this.aggregates.levelRange = {
            min: Math.min(...levels),
            max: Math.max(...levels),
            median: levels.length % 2 ? levels[midpoint] : (levels[midpoint - 1] + levels[midpoint]) / 2.0
        }

        const {challengesDone, playerScore} = this.aggregates
        const challengesTotal = (playersTotal - 1) * CHALLENGES_PER_PLAYER
        this.aggregates.challengesTotal = challengesTotal
        const avgScore = (challengesDone !== 0) ? playerScore/challengesDone : 0
        const avgRounded = Math.round(avgScore*100)/100
        const scoreExpected = Math.floor(avgScore*challengesTotal)
        const leagueScore = {
            points: playerScore,
            avg: avgRounded
        }
        const oldScore = Helpers.lsGet(lsKeys.LEAGUE_SCORE) || {points: 0, avg: 0}
        const {points: oldPoints} = oldScore
        if (playerScore > oldPoints) {
            Helpers.lsSet(lsKeys.LEAGUE_SCORE, leagueScore)
        }

        this.aggregates.avg = avgRounded
        this.aggregates.scoreExpected = scoreExpected
    }

    displaySummary({board, promo}) {
        const {challengesDone, challengesPossible, challengesTotal, playerScore, playerRank, tops, demotions, demoteThreshold, avg, scoreExpected} = this.aggregates

        let topsHtml = ''
        let promoHtml = ''
        if (board) {
            topsHtml = TOPS.map(top => {
                const scoreDisplayData = getScoreDisplayDataForTop(playerRank, playerScore, top, tops[top], tops[top+1])
                const {diff, score, symbol, labelKey} = scoreDisplayData

                return `<span class="minTop${top}" hh_title="${this.label(labelKey, {points: I18n.nThousand(score), top})}"><span class="scriptLeagueInfoIcon top${top}"></span>${symbol}${I18n.nThousand(diff)}</span>`
            }).join('')
        }
        if (promo) {
            const {league_tag} = window
            const {demote, nonDemote} = demotions

            const canDemote = league_tag > 1
            const canPromote = league_tag < 9

            const playerAtZeroPoints = playerScore === 0
            const playerIsTop15 = playerRank <= 15
            const playerWouldDemote = canDemote && (playerAtZeroPoints || playerScore <= demote)

            let textDemote
            let textNonDemote
            let textStagnate

            if (canDemote) {
                if (!playerWouldDemote) {
                    textDemote = this.label('toDemote', {players: demoteThreshold - playerRank})
                } else {
                    if (playerAtZeroPoints) {
                        textDemote = this.label('willDemoteZero')
                        textNonDemote = this.label('toNotDemote')
                    } else {
                        textDemote = this.label('willDemote', {points: nonDemote})
                    }
                }
            }

            if (canPromote) {
                if (playerIsTop15) {
                    if (!playerAtZeroPoints) {
                        textStagnate = this.label('toStay', {players: 16 - playerRank})
                    }
                } else {
                    textStagnate = this.label('willStay', {points: tops[15]})
                }
            }

            const promotionInfoTooltip = [textStagnate, textNonDemote, textDemote].filter(a=>a).map(text=>`<p>${text}</p>`).join('')

            promoHtml = `
                <span class="promotionInfo" hh_title="${promotionInfoTooltip}">
                    <img src="${Helpers.getCDNHost()}/leagues/ic_rankup.png" style="height: 15px; width: 12px; margin-left: 6px; margin-bottom: 0px;">
                </span>
            `

        }

        const challengesLeft = challengesTotal - challengesDone
        this.possibleChallengesTooltip = `${this.label('challengesRegen', {challenges: challengesPossible})}<br/>${this.label('challengesLeft', {challenges: challengesLeft})}`

        const summaryHtml = `
            <div class="scriptLeagueInfo">
                <span class="averageScore" hh_title="${this.label('averageScore', {average: I18n.nThousand(avg)})}<br/>${this.label('scoreExpected', {score: I18n.nThousand(scoreExpected)})}"><img src="${meanIcon}" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 0px;">${I18n.nThousand(avg)}</span>
                <span class="possibleChallenges" hh_title="${this.possibleChallengesTooltip}"><img src="${Helpers.getCDNHost()}/league_points.png" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 0px;">${challengesPossible}/${challengesLeft}</span>
                ${topsHtml}
                ${promoHtml}
            </div>
        `

        $('div.league_end_in').append(summaryHtml)
    }

    manageHideFoughtOpponents () {
        let rowCache = []

        function removeFoughtOpponents() {
            let board = document.getElementsByClassName('leadTable')[0]
            if(!board)
                return
            rowCache = []
            const $opponents = $(board).find('tr')
            $opponents.each((i, el) => {
                try {
                    const $opponent = $(el)
                    rowCache.push($opponent)
                    const playerId = $opponent.attr('sorting_id')
                    if(leagues_list.find(({id_player}) => id_player === playerId).nb_challenges_played === '3'){
                        $opponent.detach()
                    }
                } catch(e) {
                    // Ignore
                }
            })
        }

        function displayFoughtOpponents() {
            const board = document.getElementsByClassName('leadTable')[0]
            if(!board || !rowCache.length)
                return
            rowCache.forEach($opponent => {
                $(board).append($opponent)
            })
        }

        let hidden = Helpers.lsGet(lsKeys.FOUGHT_OPPONENTS_HIDDEN)
        $('.league_end_in').append('<button id="beaten_opponents" class=""><span id="hide_beaten"></span></button>')

        const setButtonDisplay = () => {
            const label = this.label('showFoughtOpponents')
            $('#hide_beaten').html(`<img alt="${label}" hh_title="${label}" src="${Helpers.getCDNHost()}/quest/ic_eyeopen.svg">`)
        }
        const setButtonHide = () => {
            const label = this.label('hideFoughtOpponents')
            $('#hide_beaten').html(`<img alt="${label}" hh_title="${label}" src="${Helpers.getCDNHost()}/quest/ic_eyeclosed.svg">`)
        }

        if (hidden) {
            removeFoughtOpponents()
            setButtonDisplay()
        }
        else {
            setButtonHide()
        }

        let button = document.querySelector('#beaten_opponents')
        button.addEventListener('click', function(){
            if (!hidden) {
                removeFoughtOpponents()
                setButtonDisplay()
            } else {
                displayFoughtOpponents()
                setButtonHide()
            }
            $('.leagues_table .lead_table_view').getNiceScroll().resize()
            hidden = !hidden
            Helpers.lsSet(lsKeys.FOUGHT_OPPONENTS_HIDDEN, hidden)
        })

        let sort_by = document.querySelectorAll('span[sort_by]')
        for (let sort of sort_by) {
            sort.addEventListener('click', function(){
                if (hidden) {
                    removeFoughtOpponents()
                }
                $(document).trigger('league:table-sorted')
                // displayLeaguePlayersInfo()
            })
        }
    }

    manageTableAnnotations () {
        function resolveScoreConflicts(scores) {
            console.log('resolving scores', scores)
            const resolutionIndices = {
                4: [0,1,3],
                5: [0,3,4],
                6: [3,4,5]
            }
            const resolved = scores.filter((_,i) => resolutionIndices[scores.length].includes(i))
            console.log('resolved to:', resolved)
            return resolved
        }

        const displayLeaguePlayersInfo = () => {
            let player = playerLeaguesData.id_fighter
            let points
            try{
                points=Helpers.lsGet(lsKeys.LEAGUE_POINT_HISTORY)[player].points
            }catch(e){
                points=[]
            }
            for(let i=0;i<3;i++){
                let result=$('.result')[i]
                if(result.innerText!==''){
                    result.innerText=points[i] || '?'
                }
            }

            const data = Helpers.lsGet(lsKeys.LEAGUE_RESULTS) || {}
            const pointHistory = Helpers.lsGet(lsKeys.LEAGUE_POINT_HISTORY) || {}
            let pointHistoryChanged = false
            $('.leagues_table .lead_table_view tbody.leadTable tr').each((i, el) => {
                let playerData = $(el)
                let playerId = playerData.attr('sorting_id')
                let player = data[playerId]
                if (player) {
                    if (playerData.find('.classLeague').length===0) {
                        playerData.find('.square-avatar-wrapper').append($('<div class="classLeague"></div>'))
                    }
                    if (player.themeIcons) {
                        const $classLeague = playerData.find('.classLeague')
                        $classLeague.empty()
                        player.themeIcons.forEach(icon => {
                            $classLeague.append(`<img class="theme-icon" src="${icon}"/>`)
                        })
                    }
                }
                if (!playerData.hasClass('personal_highlight')){
                    let points
                    const leaguesListPlayer = leagues_list.find(({id_player}) => id_player===playerId)
                    try{
                        points=pointHistory[playerId].points
                        if (leaguesListPlayer.nb_challenges_played === '3' && points.length > 3) {
                            points = resolveScoreConflicts(points)
                            pointHistory[playerId].points = points
                            pointHistoryChanged = true
                        }
                    }catch{
                        points=[]
                    }
                    let pointsText=''
                    const showIndividualPoints = Helpers.lsGetRaw(lsKeys.TABLE_SHOW_INDIVIDUAL) === '1'
                    if (showIndividualPoints) {
                        pointsText = [0,1,2].map(j => {
                            if(j<parseInt(leaguesListPlayer.nb_challenges_played)){
                                return points[j] || '?'
                            }
                            return '-'
                        }).join('/')
                    } else {
                        pointsText = `${leaguesListPlayer.nb_challenges_played}/3`
                    }
                    if (!playerData.hasClass('selected-player-leagues')) {
                        playerData[0].children[3].innerText=pointsText
                    }
                }
            })
            if (pointHistoryChanged) {
                Helpers.lsSet(lsKeys.LEAGUE_POINT_HISTORY, pointHistory)
            }
        }

        const calculateVictories = () => {
            let data = Helpers.lsGet(lsKeys.LEAGUE_RESULTS) || {}
            let nb_players = this.aggregates.playersTotal
            let nb_opponents = nb_players-1
            Helpers.lsSet(lsKeys.LEAGUE_PLAYERS, nb_opponents)

            let fightsPlayed = 0
            for (let i=0; i<nb_players; i++) {
                fightsPlayed += parseInt(leagues_list[i].nb_challenges_played)
            }

            let tot_victory = 0
            let tot_defeat = 0
            for(let key in data) {
                tot_victory += data[key].victories
                tot_defeat += data[key].defeats
            }

            let tot_notPlayed = 3*nb_opponents - fightsPlayed
            let nb_unknown = fightsPlayed - tot_victory - tot_defeat
            Helpers.lsSet(lsKeys.LEAGUE_UNKNOWN, nb_unknown)

            const {min, max, median} = this.aggregates.levelRange

            const leagueStatsText = `
                <hr/>
                <span id="leagueStats"><u>${this.label('currentLeague')}</u>
                <table>
                    <tbody>
                        <tr><td>${this.label('victories')} :</td><td><em>${tot_victory}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${this.label('defeats')} :</td><td><em>${tot_defeat}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${this.label('unknown')} :</td><td><em>${nb_unknown}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${this.label('notPlayed')} :</td><td><em>${tot_notPlayed}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${this.label('levelRange')} :</td><td><em>${min}</em>…<em>${median}</em>…<em>${max}</em></td></tr>
                    </tbody>
                </table>
                </span>`

            const old_data = Helpers.lsGet(lsKeys.LEAGUE_RESULTS_OLD) || {}
            const old_nb_opponents = Helpers.lsGet(lsKeys.LEAGUE_PLAYERS_OLD) || 0
            const old_nb_unknown = Helpers.lsGet(lsKeys.LEAGUE_UNKNOWN_OLD) || 0
            const old_score = Helpers.lsGet(lsKeys.LEAGUE_SCORE_OLD) || {}
            const old_time = Helpers.lsGet(lsKeys.LEAGUE_TIME_OLD) || 0

            let oldLeagueStatsText = ''

            if (old_time > 0) {
                let old_tot_victory = 0
                let old_tot_defeat = 0

                const old_points = old_score.points || 0
                const old_avg = old_score.avg || 0

                for(let old_key in old_data) {
                    old_tot_victory += old_data[old_key].victories
                    old_tot_defeat += old_data[old_key].defeats
                }

                let old_tot_notPlayed = 3*old_nb_opponents - old_tot_victory - old_tot_defeat - old_nb_unknown

                const options = {year: 'numeric', month: 'short', day: 'numeric'}
                let old_date_end_league = new Date(old_time*1000).toLocaleDateString(I18n.getLang(), options)

                oldLeagueStatsText = `
                    <hr/>
                    <span id="oldLeagueStats">
                        ${this.label('leagueFinished', {date: `<em>${old_date_end_league}</em>`})}
                        <table>
                            <tbody>
                                <tr><td>${this.label('victories')} :</td><td><em>${old_tot_victory}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${this.label('defeats')} :</td><td><em>${old_tot_defeat}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${this.label('notPlayed')} :</td><td><em>${old_tot_notPlayed}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${this.label('opponents')} :</td><td><em>${old_nb_opponents}</em></td></tr>
                                <tr><td>${this.label('leaguePoints')} :</td><td><em>${I18n.nThousand(old_points)}</em></td></tr>
                                <tr><td>${this.label('avg')} :</td><td><em>${I18n.nThousand(old_avg)}</em></td></tr>
                            </tbody>
                        </table>
                    </span>`
            }

            const allLeagueStatsText = `${this.possibleChallengesTooltip}${leagueStatsText}${oldLeagueStatsText}`
            $('.possibleChallenges').attr('hh_title', allLeagueStatsText)
        }

        const saveVictories = () => {
            let data = Helpers.lsGet(lsKeys.LEAGUE_RESULTS) || {}
            let player = `${playerLeaguesData.id_fighter}`
            let spec = playerLeaguesData.class
            let $themeIcons = $('#leagues_middle .selected-player-leagues .theme-container img')
            if (!$themeIcons.length) {
                $themeIcons = $('#leagues_right .team-theme')
            }
            const themeIcons = $themeIcons.map((i,el)=>$(el).attr('src')).toArray()
            let results = window.match_history[player]
            const nb_victories = results.filter(match => match === 'won').length
            const nb_defeats = results.filter(match => match === 'lost').length

            data[player] = {
                victories: nb_victories,
                defeats: nb_defeats,
                class: spec,
                themeIcons
            }

            Helpers.lsSet(lsKeys.LEAGUE_RESULTS, data)

            calculateVictories()
        }

        saveVictories()
        displayLeaguePlayersInfo()

        let observeCallback = () => {
            saveVictories()
            displayLeaguePlayersInfo()
        }

        $(document).on('league:table-sorted', () => {
            displayLeaguePlayersInfo()
        })

        const leagueTableShowIndividualCurrent = Helpers.lsGetRaw(lsKeys.TABLE_SHOW_INDIVIDUAL) || '0'
        const individualDisplaySwitchOptions = [
            {label: '22/21/-', value: '1'},
            {label: '2/3', value: '0'}
        ].map(option => Helpers.$(`
            <label>
                <input type="radio" name="leagueTableShowIndividual" value="${option.value}" ${option.value === leagueTableShowIndividualCurrent ? 'checked' : ''} />
                <span>${option.label}</span>
            </label>
        `).change((e) => {
            Helpers.lsSetRaw(lsKeys.TABLE_SHOW_INDIVIDUAL, e.target.value)
            displayLeaguePlayersInfo()
        }))
        const individualDisplaySwitch = $('<div class="individualDisplaySwitch"></div>')
        individualDisplaySwitchOptions.forEach((option, i) => {
            if (i > 0) {
                individualDisplaySwitch.append('&middot;')
            }
            individualDisplaySwitch.append(option)
        })

        $('.league_end_in').append(individualDisplaySwitch)

        $(document).on('league:player-selected', () => {
            observeCallback()
        })
    }
}

export default LeagueInfoModule
