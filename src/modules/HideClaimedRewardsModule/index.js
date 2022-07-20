import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'hideClaimedRewards'

const POV_REM_PER_GROUP = 0.3 + 3.6 // margin-top + height
const POV_PX_PER_GROUP = POV_REM_PER_GROUP * 16
const SEASON_TIER_WIDTH = 69.6

// Inspired by the hide claimed rewards module from the Ben Brazke script
class HideClaimedRewardsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return ['path-of-valor', 'path-of-glory', 'season.html', 'event.html', 'seasonal'].some(page => Helpers.isCurrentPage(page))
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            if (['path-of-valor', 'path-of-glory'].some(page => Helpers.isCurrentPage(page))) {
                this.pov()
            } else if (Helpers.isCurrentPage('season.html')) {
                this.season()
            } else if (Helpers.isCurrentPage('event.html')) {
                this.poa()
            } else if (Helpers.isCurrentPage('seasonal')) {
                this.seasonalEvent()
            }
        })

        this.hasRun = true
    }

    pov () {
        let hidden = false
        const $groupsToHide = $('.potions-paths-tier:not(.unclaimed):has(.claimed-slot)')
        const $groupsRemaining = $('.potions-paths-tier.unclaimed')
        const claimedCount = $groupsToHide.length
        const unclaimedCount = $groupsRemaining.length
        const heightPattern = /height: ?(?<existingLength>[0-9.a-z%]+);?/
        let existingLengthStr
        let newLength
        const $progressBar = $('.potions-paths-progress-bar .potions-paths-progress-bar-current')
        const styleAttr = $progressBar.attr('style')

        const assertHidden = () => {
            if (claimedCount === 0) {
                // nothing to do
                return
            }

            $groupsToHide.addClass('script-hide-claimed')
            hidden = true
            if (styleAttr) {
                $progressBar.attr('style', styleAttr.replace(heightPattern, `height:${newLength};`))
            }
        }
        const assertShown = () => {
            $('.script-hide-claimed').removeClass('script-hide-claimed')
            hidden = false
            if (styleAttr) {
                $progressBar.attr('style', styleAttr.replace(heightPattern, `height:${existingLengthStr};`))
            }
        }

        if (styleAttr) {
            const matches = styleAttr.match(heightPattern)
            if (matches && matches.groups) {
                existingLengthStr = matches.groups.existingLength
            }
            if (existingLengthStr) {
                newLength = existingLengthStr
                if (existingLengthStr.endsWith('px')) {
                    const existingLength = parseInt(existingLengthStr)
                    newLength = Math.round(existingLength - (claimedCount * POV_PX_PER_GROUP)) + 'px'
                } else if (existingLengthStr.endsWith('rem')) {
                    const existingLength = parseFloat(existingLengthStr)
                    newLength = existingLength - (claimedCount * POV_REM_PER_GROUP) + 'rem'
                }
            }
        }
        assertHidden()
        $('.potions-paths-progress-bar-section').stop(true).animate({
            scrollTop: Math.max(0, (unclaimedCount * POV_PX_PER_GROUP) - 150)
        }, 100)

        const toggle = () => {
            if (hidden) {
                assertShown()
            } else {
                assertHidden()
            }
        }

        $('.girl-preview').click(toggle)
    }

    season () {
        let hidden = false

        const fixWidth = () => {
            const $row = $('.rewards_seasons_row')
            $row.css('width', 'max-content')
        }
        const assertHidden = (shouldScroll) => {
            const $tiers = $('.rewards_pair')
            const {season_tiers, season_has_pass, season_tier} = window

            let unclaimedCount = 0
            let rewardsHidden = false

            $tiers.each((i, el) => {
                const {free_reward_picked, pass_reward_picked, tier} = season_tiers[i]
                if (free_reward_picked === '1' && (!season_has_pass || pass_reward_picked === '1')) {
                    $(el).addClass('script-hide-claimed')
                    rewardsHidden = true
                } else if (parseInt(tier) <= season_tier) {
                    unclaimedCount++
                }
            })

            hidden = rewardsHidden

            fixWidth()

            const $rowScroll = $('.rewards_container_seasons')
            $rowScroll.getNiceScroll().resize()

            if (shouldScroll) {
                const left = SEASON_TIER_WIDTH * unclaimedCount
                $rowScroll.getNiceScroll(0).doScrollLeft(Math.max(0, left - 600), 200)
            }
        }
        const assertShown = () => {
            $('.script-hide-claimed').removeClass('script-hide-claimed')
            hidden = false
            fixWidth()
            const $rowScroll = $('.rewards_container_seasons')
            $rowScroll.getNiceScroll().resize()
        }

        const $rowScroll = $('.rewards_container_seasons')
        if ($rowScroll.length && $rowScroll.getNiceScroll(0).doScrollLeft) {
            assertHidden(true)
        } else {
            const observer = new MutationObserver(() => {
                const $rowScroll = $('.rewards_container_seasons')
                if ($rowScroll.length && $rowScroll.getNiceScroll(0).doScrollLeft) {
                    observer.disconnect()
                    assertHidden(true)
                }
            })
            observer.observe(document.getElementById('seasons_tab_container'), {childList: true, subtree: true})
        }

        Helpers.onAjaxResponse(/action=claim/, (response, opt) => {
            const searchParams = new URLSearchParams(opt.data)

            // key is free/pass_<tier>
            const key = searchParams.get('key')

            const keyPattern = /(?<type>free|pass)_(?<tier>[0-9]+)/
            const matches = key.match(keyPattern)

            let type, tier

            if (matches && matches.groups) {
                ({type, tier} = matches.groups)
            }

            const {season_tiers} = window

            const tierToUpdate = season_tiers.find(({tier: check})=>tier === check)

            if (tierToUpdate) {
                tierToUpdate[`${type}_reward_picked`] = '1'
            }

            if (hidden) {
                assertHidden(false)
            }
        })
        const toggle = () => {
            if (hidden) {
                assertShown()
            } else {
                assertHidden(false)
            }
        }
        $('#girls_holder').click(toggle)
    }

    poa () {
        if(!$('a.active[href*="?tab=path_event_"]').length){return}

        const {bonusRewardsUnlocked} = window

        const assertHidden = () => {
            $('.nc-poa-reward-pair').each((i, el) => {
                const $free = $(el).find('.nc-poa-free-reward')
                const $pass = $(el).find('.nc-poa-locked-reward')
                if ( $free.hasClass('claimed') && ( $pass.hasClass('claimed') || !bonusRewardsUnlocked)) {
                    $(el).addClass('script-hide-claimed')
                }
            })
        }
        const assertShown = () => {
            $('.nc-poa-reward-pair').removeClass('script-hide-claimed')
        }
        const fixScroll = () => {
            $('.scroll-area').getNiceScroll().resize()
        }
        assertHidden()
        fixScroll()
        const toggle = () => {
            if ($('.script-hide-claimed').length) {
                assertShown()
            } else {
                assertHidden()
            }
            fixScroll()
        }
        $('#poa-content .girls').click(()=>{toggle()})
    }

    seasonalEvent () {
        let hidden = false
        const $groupsToHide = $('.seasonal-tier:not(.unclaimed):has(.claimed-slot)')
        const $groupsRemaining = $('.seasonal-tier.unclaimed')
        const claimedCount = $groupsToHide.length
        const widthPattern = /width: ?(?<existingLength>[0-9.a-z%]+);?/
        let existingLengthStr
        let newLength
        const $progressBar = $('.seasonal-progress-bar .seasonal-progress-bar-current')
        const styleAttr = $progressBar.attr('style')

        const assertHidden = () => {
            if (claimedCount === 0) {
                // nothing to do
                return
            }

            $groupsToHide.addClass('script-hide-claimed')
            hidden = true
            if (styleAttr) {
                setTimeout(() => {
                    newLength = $groupsRemaining.last().find('.tier-level')[0].offsetLeft
                    $progressBar.attr('style', styleAttr.replace(widthPattern, `width:${newLength}px;`))
                }, 1)
            }
        }
        const assertShown = () => {
            $('.script-hide-claimed').removeClass('script-hide-claimed')
            hidden = false
            if (styleAttr) {
                $progressBar.attr('style', styleAttr.replace(widthPattern, `width:${existingLengthStr};`))
            }
        }

        if (styleAttr) {
            const matches = styleAttr.match(widthPattern)
            if (matches && matches.groups) {
                existingLengthStr = matches.groups.existingLength
            }
        }
        assertHidden()
        $('.seasonal-progress-bar-section').stop(true).animate({
            scrollLeft: Math.max(0, newLength - 150)
        }, 100)

        const toggle = () => {
            if (hidden) {
                assertShown()
            } else {
                assertHidden()
            }
        }

        $('.girls-reward-container').click(toggle)
    }
}

export default HideClaimedRewardsModule
