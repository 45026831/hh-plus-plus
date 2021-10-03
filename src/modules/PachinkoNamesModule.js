/* global pachinkoDef */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'

class PachinkoNamesModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: 'pachinkoNames',
            label: I18n.getModuleLabel('config', 'pachinkoNames'),
            default: true
        }
        super({
            group: 'core',
            name: 'pachinkoNames',
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, 'pachinkoNames')
        this.sheet = Helpers.getSheet()
        this.insertedRules = []
    }

    shouldRun() {
        return Helpers.isCurrentPage('pachinko')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        this.injectCSS()

        const girlDictionary = Helpers.getGirlDictionary()

        this.girlLists = {}

        pachinkoDef.forEach(({type, content}) => {
            const rewardGirls = (content && content.rewards && content.rewards.girl_shards && content.rewards.girl_shards.plain_data) || []
            const girlList = rewardGirls.map(({id_girl}) => girlDictionary.get(id_girl))
            this.girlLists[type] = girlList
        })

        const observer = new MutationObserver(this.applyPanel.bind(this))
        observer.observe($('.playing-zone')[0], {attributes: true})

        this.applyPanel()

        this.hasRun = true
    }

    applyPanel () {
        const type = $('.playing-zone').attr('type-panel')
        const girlList = this.girlLists[type]

        const $panelHtml = Helpers.$(`
            <div class="availableGirls">
                <div class="scrollArea">
                    ${girlList.length ? this.label('availableGirls') : ''}
                    ${girlList.map(girl => girl ? `<a class="availableGirl" href="${Helpers.getWikiLink(girl.name)}" >${girl.name.replace(' ', ' ')}</a>` : '<span class="unknownGirl">Unknown</a>').join(', ')}
                </div>
            </div>
        `)

        $('.game-rewards').before($panelHtml)

        $panelHtml.niceScroll('.scrollArea', {bouncescroll: false})
        $panelHtml.find('.nicescroll-rails-vr').css('right', '5px')
    }

    injectCSS () {
        this.insertRule(`
            .availableGirl {
                color: rgb(208, 132, 103);
                text-decoration: none;
            }
        `)
        this.insertRule(`
            .availableGirl:hover {
                color: #fff;
            }
        `)
        this.insertRule(`
            .availableGirls {
                font-size: 12px;
                text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000;
                overflow: hidden;
                height: 82px;
                padding-left: 20px;
                padding-right: 20px;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .cover .pachinko_img {
                height: 153px;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .cover h3.shadow-text {
                top: 118px;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .cover p {
                position: relative;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .cover .pachinko_img img {
                position: relative;
                left: unset;
                margin-left: auto;
                margin-right: auto;
                width: 215px;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .cover {
                height: 226px;
            }
        `)
        this.insertRule(`
            #playzone-replace-info .graduation {
                font-size: 10px;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default PachinkoNamesModule
