/* global  */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'
import filterIcon from '../assets/filter.svg'
import { lsKeys } from '../common/Constants'
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
const FILTER_OPTIONS = {
    subtype: [
        {value: '1', icon: 'pictures/items/ET1.png'},
        {value: '2', icon: 'pictures/items/EH1.png'},
        {value: '3', icon: 'pictures/items/EB1.png'},
        {value: '4', icon: 'pictures/items/ES1.png'},
        {value: '5', icon: 'pictures/items/EF1.png'},
        {value: '6', icon: 'pictures/items/EA1.png'}
    ],
    rarity: [
        {value: 'common', bgColor: '#8d8e9f'},
        {value: 'rare', bgColor: '#23b56b'},
        {value: 'epic', bgColor: '#ffb244'},
        {value: 'legendary', bgColor: '#9150bf', bgImage: `url(${Helpers.getCDNHost()}/legendary.png)`}
    ],
    stats: [
        {value: 'rainbow', icon: 'pictures/misc/items_icons/16.svg'},
        {value: 'hc', icon: 'pictures/misc/items_icons/1.png'},
        {value: 'ch', icon: 'pictures/misc/items_icons/2.png'},
        {value: 'kh', icon: 'pictures/misc/items_icons/3.png'}
    ],
    favorites: [
        {value: true, icon: 'design/ic_star_orange.svg'},
        {value: false, icon: 'design/ic_star_white.svg'}
    ]
}
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

        // this.allEquipIds = []
        // this.equipDict = {}
        // this.equipIndex = {
        //     subtype: [1,2,3,4,5,6].map(k=>({[k]:[]})).reduce((a,b)=>Object.assign(a,b), {}),
        //     rarity: ['common', 'rare', 'epic', 'legendary'].map(k=>({[k]:[]})).reduce((a,b)=>Object.assign(a,b), {}),
        //     stats: ['rainbow', 'hc', 'ch', 'kh'].map(k=>({[k]:[]})).reduce((a,b)=>Object.assign(a,b), {})
        // }
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

    // index () {
    //     const $visibleEquips = $('#inventory .armor .slot:not(.empty)')

    //     $visibleEquips.each((i,el) => {
    //         const {id_m_i, name_add, rarity, subtype} = $(el).data('d')
    //         const [equipKey] = id_m_i
    //         if (this.equipDict[equipKey]) {
    //             return
    //         }

    //         let stats
    //         switch(name_add) {
    //         case '1':
    //             stats = 'hc'
    //             break
    //         case '2':
    //             stats = 'ch'
    //             break
    //         case '3':
    //             stats = 'kh'
    //             break
    //         case '16':
    //             stats = 'rainbow'
    //             break
    //         }
    //         this.equipDict[equipKey] = el
    //         this.allEquipIds.push(equipKey)
    //         this.equipIndex.subtype[subtype].push(equipKey)
    //         this.equipIndex.rarity[rarity].push(equipKey)
    //         if (stats) {
    //             this.equipIndex.stats[stats].push(equipKey)
    //         }
    //     })
    // }

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

            const stats = []

            const typeMap = [
                {
                    type: 'hc',
                    ids: ['1', '6', '7', '8', '9']
                },
                {
                    type: 'ch',
                    ids: ['2', '6', '10', '11', '12']
                },
                {
                    type: 'kh',
                    ids: ['3', '7', '10', '13', '14']
                },
                {
                    type: 'rainbow',
                    ids: ['16']
                }
            ]

            typeMap.forEach(({type, ids}) => {
                if (ids.includes(name_add)) {
                    stats.push(type)
                }
            })

            const subtypeMatches = this.currentFilter.subtype === FILTER_DEFAULT || this.currentFilter.subtype === subtype
            const rarityMatches = this.currentFilter.rarity === FILTER_DEFAULT || this.currentFilter.rarity === rarity
            const statsMatches = this.currentFilter.stats === FILTER_DEFAULT || stats.includes(this.currentFilter.stats)
            const favoritesMatches = this.currentFilter.favorites === FILTER_DEFAULT || JSON.parse(this.currentFilter.favorites) === isFavorite
            // TODO favorites

            if ([subtypeMatches, rarityMatches, statsMatches, favoritesMatches].every(a=>a)) {
                $(el).show()
                visibleCount++
            } else {
                $(el).hide()
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

        this.injectCSS()

        // $(document).on('market:equips-updated', () => this.index())
        // this.index()
        const attachListener = () => {
            $(document).one('market:equips-updated', () => {
                this.applyFilter()
            })
        }
        $(document).on('market:equip-filter:done', () => {
            setTimeout(attachListener, 10)
        })
        attachListener()


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
        attachFilterBox()

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

        this.applyFilter()

        const favouriteSafetyObserver = new MutationObserver(() => this.checkSelection())
        favouriteSafetyObserver.observe($('#inventory .armor .inventory_slots > div:first-child()')[0], {subtree: true, attributes: true, attributeFilter: ['class']})

        this.hasRun = true
    }

    injectCSS() {
        this.insertRule(`
            #shops label.equip_filter {
                background: transparent;
            }
        `)
        this.insertRule(`
            #shops #inventory label.equip_filter {
                width: 32px;
                position: absolute;
                top: -6px;
            }
        `)
        this.insertRule(`
            label.equip_filter input {
                height: 32px;
                width: 32px;
                display: block;
                padding: 0px;
            }
        `)
        this.insertRule(`
            label.equip_filter::before {
                content: ' ';
                display: block;
                position: absolute;
                height: 100%;
                width: 100%;
                background-image: url(${filterIcon});
                background-position: center;
                background-size: 24px;
                background-repeat: no-repeat;
                pointer-events: none;
            }
        `)
        this.insertRule(`
            .equip_filter_box {
                position: absolute;
                bottom: 0px;
                left: -215px;
                width: 200px;
                height: -moz-fit-content;
                height: fit-content;
                z-index: 3;
                border-radius: 8px 10px 10px 8px;
                background-color: rgb(30, 38, 30);
                box-shadow: rgba(255, 255, 255, 0.73) 0px 0px;
                padding: 5px;
                border: 1px solid rgb(255, 162, 62);
            }
        `)
        this.insertRule(`
            #shops #inventory .equip_filter_box label {
                background: transparent;
                width: auto;
                margin: 0px;
            }
        `)
        this.insertRule(`
            .grid-selector {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
            }
        `)
        this.insertRule(`
            .grid-selector:last-child {
                margin-bottom: 0px;
            }
        `)
        this.insertRule(`
            .grid-selector input {
                display: none;
            }
        `)
        this.insertRule(`
            .grid-selector .selector-options {
                width: -moz-fit-content;
                width: fit-content;
                display: grid;
                grid-gap: 2px;
            }
        `)
        this.insertRule(`
            .grid-selector .selector-options img {
                height: 32px;
                width: 32px;
                margin: 2px;
            }
        `)
        this.insertRule(`
            .grid-selector .selector-options div {
                height: 28px;
                width: 28px;
                margin: 4px;
                border-radius: 5px;
            }
        `)
        this.insertRule(`
            .grid-selector .clear-selector {
                width: -moz-fit-content;
                width: fit-content;
                margin-right: 5px;
            }
        `)
        this.insertRule(`
            .grid-selector .clear-selector img {
                height: 36px;
                width: 36px;
            }
        `)
        this.insertRule(`
            #shops #inventory .grid-selector input:checked+label,
            #shops #inventory .grid-selector input:hover+label {
                background-color: #fff8;
            }
        `)
        this.insertRule(`
            #inventory .armor .slot .favorite-toggle {
                position: absolute;
                display: none;
                height: 32px;
                width: 32px;
                top: 0px;
                right: 0px;
                background-size: 22px;
                background-repeat: no-repeat;
                background-position: center;
                z-index: 1;
                border-top-right-radius: 5px;
                border-bottom-left-radius: 5px;
            }
        `)
        this.insertRule(`
            #inventory .armor .slot:hover .favorite-toggle[data-is-favorite=false], #inventory .armor .slot .favorite-toggle[data-is-favorite=true] {
                display: block;
            }
        `)
        this.insertRule(`
            #inventory .armor .slot .favorite-toggle[data-is-favorite=false] {
                background-image: url(${Helpers.getCDNHost()}/design/ic_star_white.svg);
                opacity: 0.7;
            }
        `)
        this.insertRule(`
            #inventory .armor .slot .favorite-toggle[data-is-favorite=true] {
                background-image: url(${Helpers.getCDNHost()}/design/ic_star_orange.svg);
                background-color: rgba(30, 38, 30, 0.7);
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default MarketEquipsFilterModule
