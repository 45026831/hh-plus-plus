import Helpers from '../../common/Helpers'
import FavouritesManager from './FavouritesManager'

class EquipHelpers {

    static flattenRelevantKeys (data) {
        const {level, carac1_equip, carac2_equip, carac3_equip, endurance_equip, chance_equip, id_member_armor, item: {id_equip, rarity, name_add}, skin: {identifier, subtype}} = data
        return {identifier, id_member_armor, subtype, id_equip, rarity, name_add, level, carac1_equip, carac2_equip, carac3_equip, endurance_equip, chance_equip}
    }

    static makeEquipKey (data) {
        const flattened = EquipHelpers.flattenRelevantKeys(data)
        return EquipHelpers.keyParts.map(part => flattened[part]).join('_')
    }

    static makeFavouriteKey (data) {
        const flattened = EquipHelpers.flattenRelevantKeys(data)
        return EquipHelpers.favouriteKeyParts.map(part => flattened[part]).join('_')
    }

    static keyMatchesFilter (key, favouriteKey, filter) {
        const keyParts = key.split('_')

        let matches = true

        matches &= (filter.subtype === EquipHelpers.filterDefault || filter.subtype === keyParts[EquipHelpers.keyPartOrdinals.subtype])
        matches &= (filter.rarity === EquipHelpers.filterDefault || filter.rarity === keyParts[EquipHelpers.keyPartOrdinals.rarity])
        matches &= (filter.stats === EquipHelpers.filterDefault || EquipHelpers.statsMap[filter.stats].includes(keyParts[EquipHelpers.keyPartOrdinals.name_add]))
        matches &= (filter.favourites === EquipHelpers.filterDefault || JSON.parse(filter.favourites) === FavouritesManager.isFavourite(favouriteKey))

        return matches
    }

    static createGridSelectorItem ({id, value, icon, bgColor, bgImage, parentName}) {
        const inputId = `${parentName}-${id}-${value}`
        return `
            <input type="radio" name="${parentName}-${id}" id="${inputId}" value="${value}"/>
            <label for="${inputId}">
                ${icon ? `<img src="${Helpers.getCDNHost()}/${icon}">` : ''}
                ${bgColor || bgImage ? `<div style="${bgColor?`background-color:${bgColor};`:''}${bgImage?`background-image:${bgImage};background-size:contain;`:''}"></div>` : ''}
            </label>
        `
    }

    static createGridSelector ({id, options, gridConfig, parentName}) {
        const inputId = `${parentName}-${id}-${EquipHelpers.filterDefault}`
        return `
            <div class="grid-selector" rel="${id}">
                <div class="clear-selector">
                    <input type="radio" name="${parentName}-${id}" id="${inputId}" value="${EquipHelpers.filterDefault}" checked="checked" />
                    <label for="${inputId}">
                        <img src="${Helpers.getCDNHost()}/${EquipHelpers.filterDefaultIcon}" />
                    </label>
                </div>
                <div class="selector-options" style="grid-auto-flow:${gridConfig.flow}; grid-template-rows:${gridConfig.rows}; grid-template-columns:${gridConfig.cols}">
            ${options.map(option => {
        const {value, icon, bgColor, bgImage} = option
        return EquipHelpers.createGridSelectorItem({id, value, icon, bgColor, bgImage, parentName})
    }).join('')}
                </div>
            </div>
        `
    }

    static createFilterBox (parentName) {
        return $(`
            <div>
                <div class="equip_filter_box form-wrapper" style="display: none;">
                    ${['subtype', 'rarity', 'stats', 'favourites'].map(key => EquipHelpers.createGridSelector({id: key, options: EquipHelpers.filterOptions[key], gridConfig: EquipHelpers.filterOptionsGrids[key], parentName})).join('')}
                </div>
            </div>`)
    }

    static createFilterBtn () {
        return $('<label class="equip_filter"><input type="button" class="blue_button_L" value="" /></label>')
    }
}

EquipHelpers.keyParts = ['id_member_armor', 'subtype', 'rarity', 'name_add']
EquipHelpers.keyPartOrdinals = EquipHelpers.keyParts.reduce((a,k,i)=>{a[k]=i;return a}, {})
EquipHelpers.favouriteKeyParts = ['identifier', 'subtype', 'id_equip', 'level', 'carac1_equip', 'carac2_equip', 'carac3_equip', 'endurance_equip', 'chance_equip']
EquipHelpers.statsMap = {
    rainbow: ['16'],
    hc:['1', '6', '7', '8', '9'],
    ch: ['2', '6', '10', '11', '12'],
    kh: ['3', '7', '10', '13', '14'],
    end: ['4', '8', '11', '13', '15'],
    har: ['5', '9', '12', '14', '15'],
}
EquipHelpers.filterDefault = 'all'
EquipHelpers.filterDefaultIcon = 'caracs/no_class.png'
EquipHelpers.filterOptions = new (class {
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
        {value: 'kh', icon: 'pictures/misc/items_icons/3.png'},
        {value: 'end', icon: 'pictures/misc/items_icons/4.png'},
        {value: 'har', icon: 'pictures/misc/items_icons/5.png'},
    ]}
    get favourites () {return [
        {value: true, icon: 'design/ic_star_orange.svg'},
        {value: false, icon: 'design/ic_star_white.svg'}
    ]}
})()
EquipHelpers.filterOptionsGrids = {
    subtype: {
        flow: 'column',
        cols: '1fr 1fr',
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
        rows: '1fr 1fr 1fr',
    },
    favourites: {
        flow: 'row',
        cols: '1fr auto',
        rows: '1fr'
    },
}

export default EquipHelpers
