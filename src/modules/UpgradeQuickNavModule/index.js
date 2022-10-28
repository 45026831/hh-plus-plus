import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'
import { lsKeys } from '../../common/Constants'

const MODULE_KEY = 'upgradeQuickNav'

class UpgradeQuickNavModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('/girl/')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            const filteredGirlIds = Helpers.lsGet(lsKeys.HAREM_FILTER_IDS)
            if (!filteredGirlIds || filteredGirlIds.length < 2) {return}
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

            const previousGirl = girlDictionary.get(previousGirlId)
            const nextGirl = girlDictionary.get(nextGirlId)

            const $girlAvatar = $('.girl-section .girl-avatar')

            $girlAvatar.prepend(this.buildAvatarHtml(previousGirlId, previousGirl, 'prev'))
            $girlAvatar.append(this.buildAvatarHtml(nextGirlId, nextGirl, 'next'))

            window.replaceImageSources()
        })

        this.hasRun = true
    }

    buildAvatarHtml (id, {pose}, className) {
        const ava = `${Helpers.getCDNHost()}/pictures/girls/${id}/ava${pose}.png`
        const href = `/girl/${id}`

        return Helpers.$(`<a class="script-quicknav-${className}" href="${href}"><img girl-ava-src="${ava}"/></a>`)
    }
}

export default UpgradeQuickNavModule
