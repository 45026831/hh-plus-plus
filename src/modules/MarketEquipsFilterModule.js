/* global  */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'
import filterIcon from '../assets/filter.svg'
import { lsKeys } from '../common/Constants'

import styles from './MarketEquipsFilterModule.lazy.scss'

const {$} = Helpers
const MODULE_KEY = 'marketEquipsFilter'

const getFavorites = () => Helpers.lsGet(lsKeys.EQUIP_FAVORITES) || []
const setFavorites = (favorites) => Helpers.lsSet(lsKeys.EQUIP_FAVORITES, favorites)
const addToFavorites = (id) => {
    const favorites = getFavorites()
    if (favorites.includes(id)) {return}

    favorites.push(id)
    setFavorites(favorites)
}
const removeFromFavorites = (id) => {
    const favorites = getFavorites()
    const index = favorites.indexOf(id)
    if (index < 0) {return}

    favorites.splice(index, 1)
    setFavorites(favorites)
}

const FILTER_DEFAULT = 'all'
const FILTER_DEFAULT_ICON = 'caracs/no_class.png'
const FILTER_OPTIONS = new (class {
    get subtype () {return  [
        {value: '1', icon: 'pictures/items/ET1.png'},
        {value: '2', icon: 'pictures/items/EH1.png'},
        {value: '3', icon: 'pictures/items/EB1.png'},
        {value: '4', icon: 'pictures/items/ES1.png'},
        {value: '5', icon: 'pictures/items/EF1.png'},
        {value: '6', icon: 'pictures/items/EA1.png'}
    ]}
    get rarity () {return [
        {value: 'common', bgColor: '#8d8e9f'},
        {value: 'rare', bgColor: '#23b56b'},
        {value: 'epic', bgColor: '#ffb244'},
        {value: 'legendary', bgColor: '#9150bf', bgImage: `url(${Helpers.getCDNHost()}/legendary.png)`}
    ]}
    get stats () {return [
        {value: 'rainbow', icon: 'pictures/misc/items_icons/16.svg'},
        {value: 'hc', icon: 'pictures/misc/items_icons/1.png'},
        {value: 'ch', icon: 'pictures/misc/items_icons/2.png'},
        {value: 'kh', icon: 'pictures/misc/items_icons/3.png'}
    ]}
    get favorites () {return [
        {value: true, icon: 'design/ic_star_orange.svg'},
        {value: false, icon: 'design/ic_star_white.svg'}
    ]}
})()
const FILTER_OPTIONS_GRIDS = {
    subtype: {
        flow: 'column',
        cols: '40px 40px',
        rows: '1fr 1fr 1fr'
    },
    rarity: {
        flow: 'row',
        cols: '1fr 1fr',
        rows: '1fr 1fr'
    },
    stats: {
        flow: 'row',
        cols: '1fr 1fr',
        rows: '1fr 1fr'
    },
    favorites: {
        flow: 'row',
        cols: '1fr auto',
        rows: '1fr'
    },
}
const STATS_MAP = {
    rainbow: ['16'],
    hc:['1', '6', '7', '8', '9'],
    ch: ['2', '6', '10', '11', '12'],
    kh: ['3', '7', '10', '13', '14']
}

const createGridSelectorItem = ({id, value, icon, bgColor, bgImage}) => `
    <input type="radio" name=${id} id="${id}-${value}" value="${value}"/>
    <label for="${id}-${value}">
        ${icon ? `<img src="${Helpers.getCDNHost()}/${icon}">` : ''}
        ${bgColor || bgImage ? `<div style="${bgColor?`background-color:${bgColor};`:''}${bgImage?`background-image:${bgImage};background-size:contain;`:''}"></div>` : ''}
    </label>
`

const createGridSelector = ({id, options, gridConfig}) => `
    <div class="grid-selector" rel="${id}">
        <div class="clear-selector">
            <input type="radio" name="${id}" id="${id}-${FILTER_DEFAULT}" value="${FILTER_DEFAULT}" checked="checked" />
            <label for="${id}-${FILTER_DEFAULT}">
                <img src="${Helpers.getCDNHost()}/${FILTER_DEFAULT_ICON}" />
            </label>
        </div>
        <div class="selector-options" style="grid-auto-flow:${gridConfig.flow}; grid-template-rows:${gridConfig.rows}; grid-template-columns:${gridConfig.cols}">
    ${options.map(option => {
        const {value, icon, bgColor, bgImage} = option
        return createGridSelectorItem({id, value, icon, bgColor, bgImage})
    }).join('')}
        </div>
    </div>
`

const createFilterBox = () => {
    return $(`
            <div style="position:relative">
                <div class="equip_filter_box form-wrapper" style="display: none;">
                    ${['subtype', 'rarity', 'stats', 'favorites'].map(key => createGridSelector({id: key, options: FILTER_OPTIONS[key], gridConfig: FILTER_OPTIONS_GRIDS[key]})).join('')}
                </div>
            </div>`)
}

const createFilterBtn = () => {
    return $('<label class="equip_filter"><input type="button" class="blue_button_L" value="" /></label>')
}

const makeEquipKey = ({identifier, id_equip, level, carac1_equip, carac2_equip, carac3_equip, endurance_equip, chance_equip, subtype}) => [identifier, subtype, id_equip, level, carac1_equip, carac2_equip, carac3_equip, endurance_equip, chance_equip].join('_')

class MarketEquipsFilterModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        }
        super({
            group: 'core',
            name: MODULE_KEY,
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
        this.sheet = Helpers.getSheet()
        this.insertedRules = []

        this.currentFilter = {
            subtype: FILTER_DEFAULT,
            rarity: FILTER_DEFAULT,
            stats: FILTER_DEFAULT,
            favorites: FILTER_DEFAULT
        }
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    applyFilter () {
        const favorites = getFavorites()
        const $visibleEquips = $('#inventory .armor .slot:not(.empty)')

        let visibleCount = 0

        $visibleEquips.each((i,el) => {
            const $el = $(el)
            const equipData = $el.data('d')
            const {name_add, rarity, subtype} = equipData
            const equipKey = makeEquipKey(equipData)

            const isFavorite = favorites.includes(equipKey)

            let $favoriteToggle = $el.find('.favorite-toggle')
            if (!$favoriteToggle.length) {
                $favoriteToggle = this.$favoriteToggle.clone().attr('data-equip-key', equipKey)
                $el.prepend($favoriteToggle)
            } else {
                $favoriteToggle.off('click')
            }
            $favoriteToggle.click(this.favoriteToggleCallback)
            $favoriteToggle.attr('data-is-favorite', isFavorite)

            const subtypeMatches = this.currentFilter.subtype === FILTER_DEFAULT || this.currentFilter.subtype === subtype
            const rarityMatches = this.currentFilter.rarity === FILTER_DEFAULT || this.currentFilter.rarity === rarity
            const statsMatches = this.currentFilter.stats === FILTER_DEFAULT || STATS_MAP[this.currentFilter.stats].includes(name_add)
            const favoritesMatches = this.currentFilter.favorites === FILTER_DEFAULT || JSON.parse(this.currentFilter.favorites) === isFavorite

            if ([subtypeMatches, rarityMatches, statsMatches, favoritesMatches].every(a=>a)) {
                $(el).removeClass('filtered_out')
                visibleCount++
            } else {
                $(el).addClass('filtered_out')
            }
        })

        const $container = $('#inventory .armor .inventory_slots > div:first-child()')
        if (visibleCount < 12) {
            const $visibleSlots = $container.find('.slot:visible()')
            // pad with empty slots
            let toPad = 12 - $visibleSlots.length
            while (toPad > 0) {
                $container.find('.slot').last().after('<div class="slot empty"></div>')
                toPad--
            }
        }
        $container.getNiceScroll().resize()
        $(document).trigger('market:equip-filter:done')
    }

    checkSelection () {
        const $selected = $('#inventory .armor .inventory_slots .selected')

        if ($selected.length){
            if ($selected.is(':visible')) {
                // check for favourite
                const isFavorite = JSON.parse($selected.find('.favorite-toggle').attr('data-is-favorite'))
                if (isFavorite) {
                    $('#shops #inventory button[rel=sell]').prop('disabled', true)
                }
            } else {
                // change selection
                const $container = $('#inventory .armor .inventory_slots > div:first-child()')
                const index = $selected.index()
                let $newSelection
                let newSelection

                // first, try after
                $newSelection = $container.find(`.slot:gt(${index}):not(.empty):visible()`)
                if ($newSelection.length) {
                    newSelection = $newSelection[0]
                }

                if (!newSelection) {
                    // try before instead
                    $newSelection = $container.find(`.slot:lt(${index}):not(.empty):visible()`)

                    if ($newSelection.length) {
                        newSelection = $newSelection[$newSelection.length - 1]
                    }
                }

                if (newSelection) {
                    $(newSelection).click()
                } else {
                    // Nothing left visible, disable buttons
                    $('#shops #inventory button[rel=sell], #shops #inventory button[rel=use]').prop('disabled', true)
                }
            }
        }
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        $(document).on('market:equips-updated', () => {
            this.applyFilter()
        })


        const attachFilterBox = () => {
            const $btn = createFilterBtn()
            const $box = createFilterBox()
            const $togglable = $box.find('.equip_filter_box')

            const $container = $('#inventory .armor')

            $container.append($btn).append($box)

            $btn.click(() => $togglable.toggle())
            $box.find('input').each((i, input) => {
                $(input).change((e) => {
                    const {value, name} = e.target
                    this.currentFilter[name] = value
                    this.applyFilter()
                    this.checkSelection()
                })
            })
        }

        this.$favoriteToggle = $('<div class="favorite-toggle"></div>')
        this.favoriteToggleCallback = (e) => {
            const $favoriteToggle = $(e.target)
            const equipKey = `${$favoriteToggle.data('equip-key')}`
            const isFavorite = JSON.parse($favoriteToggle.attr('data-is-favorite'))

            if (isFavorite) {
                removeFromFavorites(equipKey)
            } else {
                addToFavorites(equipKey)
            }
            this.applyFilter()
        }

        Helpers.defer(() => {
            this.injectDynamicCSS()

            attachFilterBox()
            this.applyFilter()

            const favouriteSafetyObserver = new MutationObserver(() => this.checkSelection())
            favouriteSafetyObserver.observe($('#inventory .armor .inventory_slots > div:first-child()')[0], {subtree: true, attributes: true, attributeFilter: ['class']})
        })

        this.hasRun = true
    }

    injectDynamicCSS() {
        this.insertRule(`
            label.equip_filter::before {
                background-image: url(${filterIcon});
            }
        `)
        this.insertRule(`
            #inventory .armor .slot .favorite-toggle[data-is-favorite=false] {
                background-image: url(${Helpers.getCDNHost()}/design/ic_star_white.svg);
            }
        `)
        this.insertRule(`
            #inventory .armor .slot .favorite-toggle[data-is-favorite=true] {
                background-image: url(${Helpers.getCDNHost()}/design/ic_star_orange.svg);
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default MarketEquipsFilterModule
