import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'

class ContestRewardsModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: 'contestSummary',
            label: I18n.getModuleLabel('config', 'contestSummary'),
            default: true
        }
        super({
            group: 'core',
            name: 'contestSummary',
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, 'contestSummary')
        this.sheet = Helpers.getSheet()
        this.insertedRules = []
    }

    shouldRun() {
        return Helpers.isCurrentPage('activities')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        this.injectCSS()

        this.displayRewardSums()

        const observer = new MutationObserver((mutations) => {
            for(const mutation of mutations) {
                if (mutation.type === 'childList') {
                    this.displayRewardSums()
                }
            }
        })

        observer.observe($('.left_part .scroll_area')[0],{attributes: false, childList: true, subtree: false})

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

    injectCSS () {
        this.insertRule(`
            .slot.reward_sum {
                margin-right: 5px;
                border: 2px solid #fff;
            }
        `)

        this.insertRule(`
            .slot.reward_sum img {
                display: inline;
                width: 60%;
                height: 60%!important;
                margin: 0px!important;
            }
        `)

        this.insertRule(`
            .shards_girl_ico.reward_sum {
                position: relative;
                float: none;
                width: 40px;
                height: 40px;
                margin-right: 5px;
            }
        `)

        this.insertRule(`
            .shards_girl_ico.reward_sum img {
                width: 100%;
                height: 100%!important;
                margin: 0px!important;
            }
        `)

        this.insertRule(`
            .shards_girl_ico.reward_sum .shards {
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-flex-direction: row;
                -moz-flex-direction: row;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-flex-wrap: wrap;
                -moz-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                -webkit-justify-content: unset;
                -moz-justify-content: unset;
                -ms-justify-content: unset;
                justify-content: unset;
                -ms-flex-pack: unset;
                -webkit-align-content: unset;
                -moz-align-content: unset;
                -ms-align-content: unset;
                align-content: unset;
                -webkit-align-items: center;
                -moz-align-items: center;
                -ms-align-items: center;
                align-items: center;
                -webkit-align-self: unset;
                -moz-align-self: unset;
                -ms-align-self: unset;
                align-self: unset;
                width: 100%;
                height: 20px;
                margin: -36px 0 0;
            }
        `)

        this.insertRule(`
            .shards_girl_ico.reward_sum span.shard {
                top: 45px;
                left: 5px;
                width: 20px;
                height: 20px;
            }
        `)

        this.insertRule(`
            .shards_girl_ico.reward_sum p {
                position: absolute;
                padding-left: 20px;
                color: #80058b;
                text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff;
                top: -18px;
                font-size: 8px;
                line-height: 2;
                margin: 40px 0 0 -4px;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default ContestRewardsModule
