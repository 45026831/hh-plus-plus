/* global server_now_ts */
import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'
import { BUYABLE, SELLABLE, TYPES } from '../data/Market'

let marketInfo

const saveMarketInfo = () => {
    Helpers.lsSet(lsKeys.MARKET_INFO, marketInfo)
}

const castInt = (value) => {
    return typeof value === 'string' ? parseInt(value, 10) : value
}

class MarketInfoCollector {
    static collect () {
        if (!Helpers.isCurrentPage('shop')) {
            return
        }

        marketInfo = Helpers.lsGet(lsKeys.MARKET_INFO) || {}

        const handleBuyableItemUpdate = () => {
            MarketInfoCollector.collectBuyableItems()
            saveMarketInfo()
        }
        const handleSellableItemUpdate = type => {
            MarketInfoCollector.collectSellableItemsOfType(type)
            saveMarketInfo()
            $(document).trigger('market:inventory-updated')
        }
        const handleEquipsInventoryUpdate = () => {
            MarketInfoCollector.collectEquipsList()
            saveMarketInfo()
            $(document).trigger('market:equips-updated')
        }

        BUYABLE.forEach(type => {
            new MutationObserver(handleBuyableItemUpdate).observe($(`#shops_left .${TYPES[type]}`)[0], {childList: true})
        })
        SELLABLE.forEach(type => {
            new MutationObserver(() => handleSellableItemUpdate(type)).observe($(`#inventory .${TYPES[type]} .inventory_slots > div`)[0], {childList: true, subtree: true})
        })
        new MutationObserver(handleEquipsInventoryUpdate).observe($('#inventory .armor .inventory_slots > div')[0], {childList: true, subtree: true})

        MarketInfoCollector.collectRefreshTime()
        MarketInfoCollector.collectBuyableItems()
        MarketInfoCollector.collectSellableItems()
        MarketInfoCollector.collectEquipsList()

        saveMarketInfo()
    }

    static collectRefreshTime () {
        marketInfo.refreshTime = server_now_ts + parseInt($('.shop_count [rel=count]').attr('time'), 10)
    }

    static collectBuyableItems () {
        if (!marketInfo.buyableItems) {
            marketInfo.buyableItems = {}
        }

        BUYABLE.forEach(type => {
            const collector = {
                sc: {
                    count: 0,
                    cost: 0,
                    value: 0,
                },
                hc: {
                    count: 0,
                    cost: 0,
                    value: 0,
                }
            }
            $(`#shops_left .${TYPES[type]} .slot:not(.empty)`).each((i, slot) => {
                const {currency, count, value, price} = $(slot).data('d')
                const subCollector = collector[currency]

                subCollector.count += count
                subCollector.cost += castInt(price) * count
                subCollector.value += castInt(value) * count
            })
            marketInfo.buyableItems[type] = collector
        })
    }

    static collectSellableItems () {
        if (!marketInfo.sellableItems) {
            marketInfo.sellableItems = {
                booster: {
                    count: 0,
                    cost: 0,
                },
                xp: {
                    count: 0,
                    cost: 0,
                    value: 0
                },
                aff: {
                    count: 0,
                    cost: 0,
                    value: 0
                }
            }
        }
        SELLABLE.forEach(type => MarketInfoCollector.collectSellableItemsOfType(type))
    }

    static collectSellableItemsOfType (type) {
        const items = {
            count: 0,
            cost: 0,
            value: 0
        }

        $(`#inventory .${TYPES[type]} .slot:not(.empty)`).each((i, slot) => {
            const {count: countStr, value, price_sell} = $(slot).data('d')

            const count = castInt(countStr)
            items.count += count
            items.cost += castInt(price_sell) * count
            if (['xp', 'aff'].includes(type)) {
                items.value += castInt(value) * count
            }
        })

        marketInfo.sellableItems[type] = items
    }

    static collectEquipsList () {
        const items = {
            count: 0,
            cost: 0
        }

        $('#inventory .armor .slot:not(.empty)').each((i, slot) => {
            const {price_sell} = $(slot).data('d')

            items.count += 1
            items.cost += castInt(price_sell)
        })

        marketInfo.equipsAggregate = items
    }
}

export default MarketInfoCollector