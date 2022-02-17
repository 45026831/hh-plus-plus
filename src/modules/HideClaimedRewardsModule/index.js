import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'hideClaimedRewards'

const POV_REM_PER_GROUP = 0.3 + 3.6 // margin-top + height
const POV_PX_PER_GROUP = POV_REM_PER_GROUP * 16

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
        return ['path-of-valor', 'season.html', 'event.html'].some(page => Helpers.isCurrentPage(page))
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            if (Helpers.isCurrentPage('path-of-valor')) {
                this.pov()
            } else if (Helpers.isCurrentPage('season.html')) {
                this.season()
            } else if (Helpers.isCurrentPage('event.html')) {
                this.poa()
            }
        })

        this.hasRun = true
    }

    pov () {
        const $groupsToHide = $('.pov-tier:not(.unclaimed):has(.claimed-slot)')
        const $groupsRemaining = $('.pov-tier.unclaimed')
        const claimedCount = $groupsToHide.length
        const unclaimedCount = $groupsRemaining.length

        if (claimedCount === 0) {
            // nothing to do
            return
        }

        $groupsToHide.addClass('script-hide-claimed')

        const $progressBar = $('.pov-progress-bar .pov-progress-bar-current')
        const styleAttr = $progressBar.attr('style')
        if (styleAttr) {
            const heightPattern = /height: ?(?<existingLength>[0-9.a-z]+);?/
            const matches = styleAttr.match(heightPattern)
            let existingLengthStr
            if (matches && matches.groups) {
                existingLengthStr = matches.groups.existingLength
            }
            if (existingLengthStr) {
                let newLength = existingLengthStr
                if (existingLengthStr.endsWith('px')) {
                    const existingLength = parseInt(existingLengthStr)
                    newLength = Math.round(existingLength - (claimedCount * POV_PX_PER_GROUP)) + 'px'
                } else if (existingLengthStr.endsWith('rem')) {
                    const existingLength = parseFloat(existingLengthStr)
                    newLength = existingLength - (claimedCount * POV_REM_PER_GROUP) + 'rem'
                }

                $progressBar.attr('style', styleAttr.replace(heightPattern, `height:${newLength};`))
            }
        }

        $('.pov-progress-bar-section').stop(true).animate({
            scrollTop: Math.max(0, (unclaimedCount * POV_PX_PER_GROUP) - 150)
        }, 100)
    }

    season () {
        const assertHidden = (shouldScroll) => {
            const $tiers = $('.rewards_pair')
            const {season_tiers, season_has_pass, season_tier} = window

            let unclaimedCount = 0

            $tiers.each((i, el) => {
                const {free_reward_picked, pass_reward_picked, tier} = season_tiers[i]
                if (free_reward_picked === '1' && (!season_has_pass || pass_reward_picked === '1')) {
                    $(el).addClass('script-hide-claimed')
                } else if (parseInt(tier) <= season_tier) {
                    unclaimedCount++
                }
            })

            const $visibleTiers = $tiers.filter(':visible')
            const tierWidthStr = $tiers.css('width')
            const tierWidth = parseFloat(tierWidthStr)
            const totalWith = tierWidth * $visibleTiers.length

            const $row = $('.rewards_seasons_row')
            const $rowScroll = $('.rewards_container_seasons')
            $row.css('width', `${totalWith}px`)
            $rowScroll.getNiceScroll().resize()

            if (shouldScroll) {
                const left = tierWidth * unclaimedCount
                $rowScroll.getNiceScroll(0).doScrollLeft(Math.max(0, left - 600), 200)
            }
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

            assertHidden(false)
        })
    }

    poa () {
        // Ben's original scraping code, to be replaced when a PoA is available to dev against.

        if(!$('a.active[href*="?tab=path_event_"]').length){return}

        let i=0
        //let sw =
        $('#nc-poa-tape-rewards').css('width','max-content !important;')
        function hiderew(){
            i=0
            $('.nc-poa-reward-pair').each(function(){
                let w = $(this).find('.nc-poa-reward-container')
                // eslint-disable-next-line eqeqeq
                if( $(w).eq(0).hasClass('claimed') && ( $(w).eq(1).hasClass('claimed') || ($('#nc-poa-tape-blocker').length!=0))){
                    $(this).css('display','none')
                    i++
                }
            })
        }
        function showrew(){
            i=0
            $('.nc-poa-reward-pair').each(function(){
                $(this).css('display','inline-block')
            })
        }
        function scrollrew(){
            let wth=$('.nc-poa-reward-pair').length-i
            $('.scroll-area').css('display','none').css('display','')
            let pos = $('.current-objective').parent().index()-i
            if(pos<8){pos=0}else if(pos>wth-8){pos=wth}
            let mwth=+$('.scroll-area').parent().parent().css('width').replace(/[^0-9]/gi, '')
            $('.scroll-area')[0].scrollTo((wth*92-mwth)/wth*pos, 0)
        }
        hiderew()
        scrollrew()
        function togglerew(){
            // eslint-disable-next-line eqeqeq
            if(i==0){
                hiderew()
            }else{
                showrew()
            }
            scrollrew()
        }
        //$('.current-objective').parent().click(()=>{togglerew()})
        $('#poa-content .girls').click(()=>{togglerew()})
    }
}

export default HideClaimedRewardsModule
