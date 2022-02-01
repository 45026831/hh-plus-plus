/* global GT */
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import filterIcon from '../../assets/filter.svg'

import styles from './styles.lazy.scss'
import Sheet from '../../common/Sheet'

const MODULE_KEY = 'teamsFilter'

class TeamsFilterModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
        this.all = I18n.getModuleLabel('common', 'all')
    }

    shouldRun () {
        return Helpers.isCurrentPage('edit-team')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()
            this.updateFilterGirlData()
            $('h3.panel-title').before('<button id="arena_filter" class="blue_button_L"><span class="filter_mix_icn"></span></button>')
            $('h3.panel-title').after(this.createFilterBox())
            this.createFilterEvents()
        })

        this.hasRun = true
    }

    injectCSSVars() {
        Sheet.registerVar('filter-icon', `url('${filterIcon}')`)
    }

    updateFilterGirlData() {
        this.arenaGirls = $('.harem-panel-girls div.harem-girl-container')

        this.girlsData = $.map(this.arenaGirls, function(girl) {
            // CxH still uses 'new-girl-tooltip-data' and is broken in the UI
            return JSON.parse($(girl).attr('data-new-girl-tooltip') || $(girl).attr('new-girl-tooltip-data'))
        })
    }

    createFilterEvents() {
        $('#arena_filter').on('click', () => {
            if (typeof this.arenaGirls === 'undefined' || typeof this.girlsData === 'undefined') return
            let currentBoxDisplay = $('#arena_filter_box').css('display')
            $('#arena_filter_box').css('display', currentBoxDisplay === 'none' ? 'block' : 'none')
        })

        const doFilter = () => {
            this.filterGirls()
        }
        $('#filter_class').on('change', doFilter)
        $('#filter_element').on('change', doFilter)
        $('#filter_rarity').on('change', doFilter)
        $('#filter_name').get(0).oninput = doFilter
        $('#filter_blessed_attributes').on('change', doFilter)
        $('#filter_aff_category').on('change', doFilter)
        $('#filter_aff_lvl').on('change', doFilter)
    }

    filterGirls() {
        let filterClass = $('#filter_class').get(0).selectedIndex
        let filterElement = $('#filter_element').get(0).value
        let filterRarity = $('#filter_rarity').get(0).value
        let filterName = $('#filter_name').get(0).value
        let nameRegex = new RegExp(filterName, 'i')
        let filterBlessedAttributes = $('#filter_blessed_attributes').get(0).value
        let filterAffCategory = $('#filter_aff_category').get(0).value
        let filterAffLvl = $('#filter_aff_lvl').get(0).value

        let girlsFiltered = $.map(this.girlsData, (girl, index) => {
            let matchesClass = (girl.class === `${filterClass}`) || (filterClass === 0)
            const {elementData, element_data} = girl
            let matchesElement = ((elementData || element_data).type === filterElement) || filterElement === 'all'
            let matchesRarity = (girl.rarity === filterRarity) || (filterRarity === 'all')
            const {Name, name} = girl
            let matchesName = ((Name || name).search(nameRegex) > -1)
            let matchesBlessedAttributes
            switch (filterBlessedAttributes) {
            case 'blessed_attributes':
                matchesBlessedAttributes = !!girl.blessed_attributes
                break
            case 'non_blessed_attributes':
                matchesBlessedAttributes = !girl.blessed_attributes
                break
            case 'all':
                matchesBlessedAttributes = (filterBlessedAttributes === 'all')
                break
            }

            const $grade = $(girl.graded2)
            const affectionCategory = `${$grade.length}`
            const affectionLvl = `${$grade.filter('g:not(.grey):not(.green)').length}`
            let matchesAffCategory = (affectionCategory === filterAffCategory) || (filterAffCategory === 'all')
            let matchesAffLvl = (affectionLvl === filterAffLvl) || (filterAffLvl === 'all')

            return (matchesClass && matchesElement && matchesRarity && matchesName && matchesBlessedAttributes && matchesAffCategory && matchesAffLvl) ? index : null
        })

        $.each(this.arenaGirls, function(index, girlElem) {
            $(girlElem).css('display', $.inArray(index, girlsFiltered) > -1 ? 'flex' : 'none')
        })

        //update scroll display
        // $('.harem-panel-girls').css('overflow', '')
        // $('.harem-panel-girls').css('overflow', 'hidden')
        $('.panel-body').getNiceScroll().resize()
    }

    createFilterBox() {
        let totalHTML = '<div id="arena_filter_box" class="form-wrapper" style="display: none;">'

        totalHTML += '<div class="form-control"><div class="input-group">'
            + '<label class="head-group" for="filter_name">' + this.label('searchedName') + '</label>'
            + '<input type="text" autocomplete="off" id="filter_name" placeholder="' + this.label('girlName') + '" icon="search">'
            + '</div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_class">' +  this.label('searchedClass') + '</label>'
            + '<select name="filter_class" id="filter_class" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option><option value="hardcore">' + GT.caracs[1] + '</option><option value="charm">' + GT.caracs[2] + '</option><option value="knowhow">' + GT.caracs[3] + '</option>'
            + '</select></div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_element">' + this.label('searchedElement') + '</label>'
            + '<select name="filter_element" id="filter_element" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option>'
            + ['fire', 'nature', 'stone', 'sun', 'water', 'darkness', 'light', 'psychic'].map(option => `<option value="${option}">${GT.design[`${option}_flavor_element`]}</option>`).join('')
            + '</select></div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_rarity">' +  this.label('searchedRarity') + '</label>'
            + '<select name="filter_rarity" id="filter_rarity" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option>'
            + ['starting','common','rare','epic','legendary','mythic'].map(option => `<option value="${option}">${GT.design[`girls_rarity_${option}`]}</option>`).join('')
            + '</select></div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_aff_category">' +  this.label('searchedAffCategory') + '</label>'
            + '<select name="filter_aff_category" id="filter_aff_category" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option><option value="1">' +  this.label('grade1') + '</option><option value="3">' +  this.label('grade3') + '</option><option value="5">' +  this.label('grade5') + '</option><option value="6">' +  this.label('grade6') + '</option>'
            + '</select></div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_aff_lvl">' +  this.label('searchedAffLevel') + '</label>'
            + '<select name="filter_aff_lvl" id="filter_aff_lvl" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option><option value="0">' +  this.label('grade0') + '</option><option value="1">' +  this.label('grade1') + '</option><option value="2">' +  this.label('grade2') + '</option><option value="3">' +  this.label('grade3') + '</option><option value="4">' +  this.label('grade4') + '</option><option value="5">' +  this.label('grade5') + '</option><option value="6">' +  this.label('grade6') + '</option>'
            + '</select></div></div>'

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_blessed_attributes">' +  this.label('searchedBlessedAttributes') + '</label>'
            + '<select name="filter_blessed_attributes" id="filter_blessed_attributes" icon="down-arrow">'
            + '<option value="all" selected="selected">' + this.all + '</option><option value="blessed_attributes">' +  this.label('blessedAttributes') + '</option><option value="non_blessed_attributes">' +  this.label('nonBlessedAttributes') + '</option>'
            + '</select></div></div>'

        totalHTML += '</div>'

        return totalHTML
    }
}

export default TeamsFilterModule
