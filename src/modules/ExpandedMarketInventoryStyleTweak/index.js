import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'expandedMarketInventory'

class ExpandedMarketInventoryStyleTweak extends STModule {
    constructor () {
        const configSchema = ({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('stConfig', MODULE_KEY),
            default: true
        })
        super({
            configSchema,
            styles
        })
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (!this.shouldRun()) {return}
        super.run()

        Helpers.defer(() =>{
            if ($('.player-inventory-content').children('.slot-container').length) {
                this.initialPad()
            } else {
                const observer = new MutationObserver(() => {
                    if ($('.player-inventory-content').children('.slot-container').length) {
                        this.initialPad()
                        observer.disconnect()
                    }
                })
                observer.observe($('.player-inventory-content')[0], {childList: true})
            }
        })
    }

    initialPad () {
        const slotsPerRow = 4
        const desiredRows = 3
        const desiredSlots = desiredRows * slotsPerRow

        $('.player-inventory-content, #player-inventory-booster').each((i, el) => {
            const $content = $(el)
            const currentSlots = $content.find('.slot-container').length
            let extraSlots = 0
            if (desiredSlots > currentSlots) {
                extraSlots = desiredSlots - currentSlots
            } else if (desiredSlots < currentSlots && currentSlots % slotsPerRow > 0) {
                const currentEmptySlots = $content.find('.slot-container.empty').length
                const nonEmptySlots = $content.find('.slot-container:not(.empty)').length
                const lastRowLength = nonEmptySlots % slotsPerRow
                const amountNeededToCompleteRow = (slotsPerRow - lastRowLength) % slotsPerRow

                extraSlots = amountNeededToCompleteRow - currentEmptySlots

                if (currentSlots + extraSlots < desiredSlots) {
                    extraSlots += desiredSlots - (currentSlots + extraSlots)
                }
            }

            if (extraSlots > 0) {
                while (extraSlots > 0) {
                    $content.append('<div class="slot-container empty"><div class="slot empty"></div></div>')
                    extraSlots--
                }
            } else if (extraSlots < 0) {
                while (extraSlots < 0) {
                    $content.find('.slot-container.empty').last().remove()
                    extraSlots++
                }
            }
        })
    }
}

export default ExpandedMarketInventoryStyleTweak
