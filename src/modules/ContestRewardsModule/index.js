import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import CoreModule from '../CoreModule'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'contestSummary'
class ContestRewardsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun() {
        return Helpers.isCurrentPage('activities')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        styles.use()

        Helpers.defer(() => {
            this.displayRewardSums()

            const observer = new MutationObserver((mutations) => {
                for(const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        this.displayRewardSums()
                    }
                }
            })

            observer.observe($('.left_part .scroll_area')[0],{attributes: false, childList: true, subtree: false})
        })

        this.hasRun = true
    }

    displayRewardSums () {
        const $contestPanel = $('.over_bunny.over_panel')

        const rewards=$('.contest_header.ended .slot, .contest_header.ended .shards_girl_ico')
        let rewardList={}
        function getAmount(reward){
            try{
                return I18n.parseLocaleRoundedInt(reward.getElementsByTagName('p')[0].innerText)
            }catch(e){
                return 1
            }
        }
        for(let i=0;i<rewards.length;i++) {
            const imgSrcAttr = rewards[i].children[0].attributes.getNamedItem('src')
            const key = `${rewards[i].className}${rewards[i].children[0].className}${imgSrcAttr ? imgSrcAttr.value : ''}`
            try{
                rewardList[key].amount+=getAmount(rewards[i])
            }catch(e){
                rewardList[key]={
                    div: rewards[i].cloneNode(true),
                    amount: getAmount(rewards[i])
                }
            }
        }

        if (!this.$rewardsDisplay) {
            this.$rewardsDisplay = $('<div class="scriptRewardsDisplay"></div>')
            $contestPanel.append(this.$rewardsDisplay)
        }
        this.$rewardsDisplay.html('')
        this.$rewardsDisplay.append(`<h3>${this.label('totalRewards', {contests: $('.contest .contest_header.ended').length})}</h3>`)
        for (const reward in rewardList) {
            let rewardDiv=rewardList[reward].div
            try{rewardDiv.getElementsByTagName('p')[0].remove()}catch(e){/*NOOP*/}
            rewardDiv.innerHTML+=`<p>${(!rewardDiv.className.includes('slot'))?'X':''}${I18n.nRounding(rewardList[reward].amount,1,-1)}</p>`
            rewardDiv.className+=' reward_sum'
            if(!rewardDiv.className.includes('slot')){
                rewardDiv.children[1].setAttribute('shards',`${I18n.nRounding(rewardList[reward].amount,1,-1)}`)
            }
            this.$rewardsDisplay.append(rewardList[reward].div)
        }
        this.$rewardsDisplay.append(`<br><br>${this.label('contestsWarning')}`)
    }
}

export default ContestRewardsModule
