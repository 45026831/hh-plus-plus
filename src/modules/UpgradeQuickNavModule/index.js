import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'
import { lsKeys } from '../../common/Constants'

const MODULE_KEY = 'upgradeQuickNav'

const RESOURCE_TYPES = ['experience', 'affection']

class UpgradeQuickNavModule extends CoreModule {
    constructor() {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)

        this.linkUrls = { prev: {}, next: {} }
    }

    shouldRun() {
        return Helpers.isCurrentPage('/girl/')
    }

    run() {
        if (this.hasRun || !this.shouldRun()) { return }

        styles.use()

        Helpers.defer(() => {
            const filteredGirlIds = Helpers.lsGet(lsKeys.HAREM_FILTER_IDS)
            if (!filteredGirlIds || filteredGirlIds.length < 2) { return }
            const girlDictionary = Helpers.getGirlDictionary()
            const currentGirlId = window.girl.id_girl

            let previousGirlId, nextGirlId

            const currentIndex = filteredGirlIds.indexOf(currentGirlId)
            if (currentIndex > -1) {
                let previousIndex = currentIndex - 1
                if (previousIndex < 0) {
                    previousIndex += filteredGirlIds.length
                }

                let nextIndex = currentIndex + 1
                if (nextIndex >= filteredGirlIds.length) {
                    nextIndex -= filteredGirlIds.length
                }

                previousGirlId = filteredGirlIds[previousIndex]
                nextGirlId = filteredGirlIds[nextIndex]
            } else {
                previousGirlId = filteredGirlIds[0]
                nextGirlId = filteredGirlIds[filteredGirlIds.length - 1]
            }

            const previousGirl = girlDictionary.get(`${previousGirlId}`)
            const nextGirl = girlDictionary.get(`${nextGirlId}`)

            const $girlAvatar = $('.girl-section .girl-avatar')

            this.$prev = this.buildAvatarHtml(previousGirlId, previousGirl, 'prev')
            this.$next = this.buildAvatarHtml(nextGirlId, nextGirl, 'next')

            $girlAvatar.prepend(this.$prev)
            $girlAvatar.append(this.$next)

            window.replaceImageSources()

        })

        const initTabSystem_actual = window.initTabSystem
        const tabSystemHook = (...args) => {
            const ret = initTabSystem_actual(...args)

            const { tab_system_instances } = window

            const tabsInstance = tab_system_instances['girl-leveler-tabs']
            const { tabs } = tabsInstance

            const switchTab_actual = tabs.affection.callback
            const hook = (tabContent) => {
                switchTab_actual(tabContent)
                this.$prev.attr('href', this.linkUrls.prev[tabContent])
                this.$next.attr('href', this.linkUrls.next[tabContent])
            }
            tabs.affection.callback = hook
            tabs.experience.callback = hook

            return ret
        }
        window.initTabSystem = tabSystemHook

        this.hasRun = true
    }

    buildAvatarHtml(id, { pose }, className) {
        const ava = `${Helpers.getCDNHost()}/pictures/girls/${id}/ava${pose}.png`
        RESOURCE_TYPES.forEach(type => {
            this.linkUrls[className][type] = `/girl/${id}?resource=${type}`
        })

        return Helpers.$(`<a class="script-quicknav-${className}" href="${this.linkUrls[className][this.getCurrentResource()]}"><img girl-ava-src="${ava}"/></a>`)
    }

    getCurrentResource() {
        let resource = 'experience'
        if (location.search && location.search.includes('resource')) {
            const urlPattern = new RegExp('resource=(?<resource>[a-z]+)')
            const matches = urlPattern.exec(location.search)
            resource = matches.groups.resource
        }
        return resource
    }
}

export default UpgradeQuickNavModule
