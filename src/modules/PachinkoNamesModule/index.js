/* global pachinkoDef */
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import HHModule from '../HHModule'

import styles from './styles.lazy.scss'

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
    }

    shouldRun() {
        return Helpers.isCurrentPage('pachinko')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        styles.use()

        Helpers.defer(() => {
            const girlDictionary = Helpers.getGirlDictionary()

            this.girlLists = {}

            pachinkoDef.forEach(({type, content}) => {
                const rewardGirls = (content && content.rewards && content.rewards.girl_shards && content.rewards.girl_shards.plain_data) || []
                const girlList = rewardGirls.map(({id_girl}) => girlDictionary.get(id_girl))
                this.girlLists[type] = girlList
            })

            const deferredAttachment = () => {
                const observer = new MutationObserver(() => this.applyPanel())
                observer.observe($('.playing-zone')[0], {attributes: true})

                this.applyPanel()
            }

            if ($('.playing-zone').length) {
                deferredAttachment()
            } else {
                const pachinkoReadyObserver = new MutationObserver(() => {
                    if ($('.playing-zone').length) {
                        pachinkoReadyObserver.disconnect()
                        deferredAttachment()
                    }
                })
                pachinkoReadyObserver.observe($('#pachinko_whole')[0], {childList: true})
            }
        })

        this.hasRun = true
    }

    applyPanel () {
        const type = $('.playing-zone').attr('type-panel')
        const girlList = this.girlLists[type]

        const isCxH = Helpers.isCxH()
        const $panelHtml = Helpers.$(`
            <div class="availableGirls rarity-styling">
                <div class="scrollArea">
                    ${girlList.length ? this.label('availableGirls') : ''}
                    ${girlList.map(girl => girl ? `<${isCxH ? 'span' : `a href="${Helpers.getWikiLink(girl.name)}" target="_blank"`} class="availableGirl ${girl.rarity}-text">${girl.name.replace(' ', ' ')}</${isCxH ? 'span': 'a'}>` : '<span class="unknownGirl">Unknown</a>').join(', ')}
                </div>
            </div>
        `)

        $('.game-rewards').before($panelHtml)

        $panelHtml.niceScroll('.scrollArea', {bouncescroll: false})
        $panelHtml.find('.nicescroll-rails-vr').css('right', '5px')
    }
}

export default PachinkoNamesModule
