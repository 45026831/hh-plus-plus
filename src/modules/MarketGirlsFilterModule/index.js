/* global GT, GIRL_MAX_LEVEL */
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'
import Snippets from '../../common/Snippets'
import filterIcon from '../../assets/filter.svg'
import { lsKeys } from '../../common/Constants'
import {ICON_NAMES as ELEMENTS_ICON_NAMES} from '../../data/Elements'
import Sheet from '../../common/Sheet'
import styles from './styles.lazy.scss'

const {$} = Helpers
const MODULE_KEY = 'marketGirlsFilter'

const DEFAULT_FILTER = {
    carac: 'all',
    rarity: 'all',
    element: 'all',
    affCategory: 'all',
    affLvl: 'all',
    name: '',
    range: '',
    team: null,
    levelCap: 'all'
}

class MarketGirlsFilterModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        styles.use()

        const deferredRun = () => {
            this.injectCSSVars()

            const clearFilter = () => {
                saveFilter(DEFAULT_FILTER)
            }
            const saveFilter = (filter) => {
                Helpers.lsSet(lsKeys.MARKET_GIRLS_FILTER, filter)
            }
            const saveBasicFilter = (form) => {
                const filter = {
                    carac: form.find('#sort_class').val(),
                    rarity: form.find('#sort_rarity').val(),
                    element: form.find('#sort_element').val(),
                    affCategory: form.find('#sort_aff_category').val(),
                    affLvl: form.find('#sort_aff_lvl').val(),
                    name: form.find('#sort_name').val(),
                    range: form.find('#sort_level').val(),
                    levelCap: form.find('#sort_level_cap').val(),
                }
                saveFilter(filter)
            }
            const saveTeamFilter = (team) => {
                const filter = {
                    ...DEFAULT_FILTER,
                    team
                }
                saveFilter(filter)
            }
            const loadFilter = () => {
                return Object.assign({}, DEFAULT_FILTER, Helpers.lsGet(lsKeys.MARKET_GIRLS_FILTER))
            }

            let container = $('.g1>div')

            const nav = container.find('.number.selected, .nav_placement')

            let cur_id = parseInt(nav.text().split('/')[0])
            nav.empty().text('/')
            container.find('.number:not(.selected)').remove()

            let allGirls = Array.from( container.find('.girl-ico').toArray(), e => $(e) )

            let nb_girls = container.children('.girl-ico').length

            let max_girl = $(`<span>${nb_girls}</span>`)
            nav.append(max_girl)

            function updateNavMax() {
                nb_girls = container.children('.girl-ico').length
                max_girl.text(nb_girls)
            }

            let num_girl = $(`<span contenteditable>${cur_id}</span>`)
            nav.prepend(num_girl)

            num_girl.on('input', () => {
                let dst_num = parseInt(num_girl.text())

                if(dst_num <= 0 || dst_num > nb_girls || ! Number.isFinite(dst_num) )
                    return

                goto_girl(dst_num, false)
            })

            function next_girl_id(id = cur_id) {
                return ((id - 1 + 1)%nb_girls) + 1
            }
            function prev_girl_id(id = cur_id) {
                return ((id - 1 + nb_girls - 1)%nb_girls) + 1
            }

            function girl_at(id = cur_id) {
                return container.children('.girl-ico').eq(id - 1)
            }

            function hideCurrentGirl() {
                let cur_girl = girl_at()
                cur_girl.addClass('not-selected')

                girl_at(prev_girl_id()).css('left', '-145px')
                cur_girl.css('left', '-145px')
                girl_at(next_girl_id()).css('left', '-145px')
            }

            function goto_girl(id_girl, override_nav = true, hide_current = true) {
                if(hide_current)
                    hideCurrentGirl()

                let dst_girl = girl_at(id_girl)
                dst_girl.removeClass('not-selected')

                girl_at(prev_girl_id(id_girl)).css('left', '0px')
                girl_at(next_girl_id(id_girl)).css('left', '290px')
                dst_girl.css('left', '145px')

                window.$girl = dst_girl

                if( override_nav )
                    num_girl.text(id_girl)

                cur_id = id_girl

                update_header()

                $(document).trigger('market:selected-girl-changed')
            }

            function update_header() {
                const {$girl} = window

                if ($girl.attr('class').includes('girl')) {
                    const { level, name, element_data, class: carac } = $girl.data('g')
                    $('#girls_list>.level_target_squared>div>div').attr('chars', level.length)
                    $('#girls_list>.level_target_squared>div>div').text(level)
                    $('#girls_list>h3').text(name)
                    if (element_data) {
                        $('#girls_list>.icon').attr('src', `${Helpers.getCDNHost()}/pictures/girls_elements/${ELEMENTS_ICON_NAMES[element_data.type]}.png`)
                    } else {
                        $('#girls_list>.icon').attr('carac', carac)
                    }
                }
            }

            let lnav = container.parent().find('span[nav="left"]')
            lnav.off('click')
            lnav.on('click', () => { goto_girl( prev_girl_id() ) })

            let rnav = container.parent().find('span[nav="right"]')
            rnav.off('click')
            rnav.on('click', () => { goto_girl( next_girl_id() ) })

            const addGirlFilter = () => {

                function getGirlData() {
                    return Array.from(allGirls, girl => ({id: $(girl).attr('id_girl'), ...$(girl).data('g'), ...$(girl).data('new-girl-tooltip') }))
                }

                const createFilterBox = () => {
                    const affectionGradeOption = grade => ({ label: this.label(`grade${grade}`), value: grade })
                    const {carac, rarity, element, name, range, affCategory, affLvl, levelCap} = loadFilter()

                    const awakeningThreshold = Helpers.getAwakeningThreshold()
                    const currentThreshold = awakeningThreshold ? awakeningThreshold.currentThreshold : GIRL_MAX_LEVEL
                    return $(`
                    <div style="position:relative">
                        <div id="arena_filter_box" class="form-wrapper" style="display: none;">
                            <span class="close-filter" />
                            ${Snippets.textInput({id: 'sort_name', label: this.label('searchedName'), placeholder: this.label('girlName'), value: name})}
                            ${Snippets.selectInput({id: 'sort_class', label: this.label('searchedClass'), options: [1,2,3].map(option => ({label: GT.caracs[option], value: option})), value: carac, className: 'script-filter-carac'})}
                            ${Snippets.selectInput({id: 'sort_element', label: this.label('searchedElement'), options: ['fire', 'nature', 'stone', 'sun', 'water', 'darkness', 'light', 'psychic'].map(option => ({label: GT.design[`${option}_flavor_element`], value: option})), value: element, className: 'script-filter-element'})}
                            ${Snippets.selectInput({id: 'sort_rarity', label: this.label('searchedRarity'), options: ['starting', 'common', 'rare', 'epic', 'legendary', 'mythic'].map(option => ({label: GT.design[`girls_rarity_${option}`], value: option})), value: rarity, className: 'script-filter-rarity rarity-styling'})}
                            ${Snippets.textInput({id: 'sort_level', label: this.label('levelRange'), placeholder: `1-${currentThreshold}`, value: range})}
                            ${Snippets.selectInput({id: 'sort_level_cap', label: this.label('levelCap'), options: ['capped', 'uncapped'].map(option => ({label: this.label(`levelCap_${option}`), value: option})), value: levelCap, className: 'script-filter-level-cap'})}
                            ${Snippets.selectInput({id: 'sort_aff_category', label: this.label('searchedAffCategory'), options: ['1','3','5','6'].map(affectionGradeOption), value: affCategory, className: 'script-filter-aff-category'})}
                            ${Snippets.selectInput({id: 'sort_aff_lvl', label: this.label('searchedAffLevel'), options: ['0','1','2','3','4','5','6'].map(affectionGradeOption), value: affLvl, className: 'script-filter-aff-level'})}
                            <div class="button-group">
                                <input type="button" class="blue_button_L" rel="select-team" value="${this.label('team')}" />
                                <label class="clear_girl_filter"><input type="button" class="red_button_L" value="" rel="clear-filter" /></label>
                            </div>
                        </div>
                    </div>`)
                }

                const createTeamsBox = () => {
                    const bdsmTeams = Helpers.lsGet(lsKeys.TEAMS_DICTIONARY)
                    if (!bdsmTeams) {
                        return $(`
                    <div style="position:relative">
                        <div class="team-selection" style="display: none;">
                            <span class="close-team-selection" />
                            ${this.label('visitTeams')}
                        </div>
                    </div>`)
                    }
                    const {teamIds, teamsDict} = bdsmTeams
                    return $(`
                <div style="position:relative">
                    <div class="team-selection" style="display: none;">
                        <span class="close-team-selection" />
                        <div class="teams-grid-container rarity-background">
                            ${teamIds.map(teamId => teamsDict[teamId]).map(team => `
                                <div class="team-slot-container ${team.iconRarity}" data-id-team="${team.teamId}" data-girl-ids='${JSON.stringify(team.girls)}'>
                                    <img src="${Helpers.getCDNHost()}/pictures/girls/${team.iconId}/ico${team.iconLevel}.png" />
                                    ${team.themeElements ? `
                                        <div class="theme-icons">
                                            ${team.themeElements.map(element=>`<img class="theme-icon" src="${Helpers.getCDNHost()}/pictures/girls_elements/${element}.png"/>`).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                `)
                }

                function createFilterBtn() {
                    return $('<label class="girl_filter"><input type="button" class="blue_button_L" value="" /></label>')
                }

                function filterGirls(girlsData, additionalGirlId) {
                    const {carac, rarity, element, affCategory, affLvl, name, range, team: useTeam, levelCap} = loadFilter()
                    let sorterClass = carac
                    let sorterRarity = rarity
                    let sorterElement = element
                    let sorterAffCategory = affCategory
                    let sorterAffLvl = affLvl
                    let sorterName = name
                    let sorterRange = range.split('-')
                    const nameRegex = new RegExp(sorterName, 'i')

                    hideCurrentGirl()

                    girlsData.forEach((girl, i) => {
                        if (additionalGirlId && additionalGirlId === girl.id) {
                            nav.before(allGirls[i])
                        } else if (useTeam) {
                            if(useTeam.includes(girl.id)) {
                                nav.before(allGirls[i])
                            } else {
                                allGirls[i].detach()
                            }
                        } else {
                            const $grade = $(girl.graded2)
                            const affectionCategory = `${$grade.length}`
                            const affectionLvl = `${$grade.filter('g:not(.grey):not(.green)').length}`
                            const girlLevel = parseInt(girl.level)
                            const girlLevelCap = girl.level_cap

                            const matchesClass = (girl.class === sorterClass) || (sorterClass === 'all')
                            const matchesElement = (girl.element_data.type === sorterElement) || (sorterElement === 'all')
                            const matchesRarity = (girl.rarity === sorterRarity) || (sorterRarity === 'all')
                            const matchesAffCategory = (affectionCategory === sorterAffCategory) || (sorterAffCategory === 'all')
                            const matchesAffLvl = (affectionLvl === sorterAffLvl) || (sorterAffLvl === 'all')
                            const matchesName = (girl.name.search(nameRegex) > -1)
                            const matchesLevel =  (!sorterRange[0] || girl.level >= parseInt(sorterRange[0]) )
                        && (!sorterRange[1] || girl.level <= parseInt(sorterRange[1]) )
                            const matchesLevelCap = (levelCap === 'all') || (levelCap === 'capped' && girlLevel === girlLevelCap) || (levelCap === 'uncapped' && girlLevel !== girlLevelCap)

                            if(matchesClass && matchesElement && matchesRarity && matchesName && matchesLevel && matchesAffCategory && matchesAffLvl && matchesLevelCap) {
                                nav.before(allGirls[i])
                            } else {
                                allGirls[i].detach()
                            }
                        }

                    })

                    updateNavMax()
                    goto_girl(1, true, false)
                }

                function createFilter(target, girlsData) {
                    let filterBox = createFilterBox()
                    let teamsBox = createTeamsBox()
                    let btn = createFilterBtn()

                    target.append(btn)
                    $('#overlay')
                        .append(filterBox)
                        .append(teamsBox)
                    // target.append(filterBox)
                    // target.append(teamsBox)

                    $('#sort_element').selectric({
                        optionsItemBuilder: (itemData) => {
                            const {element, text} = itemData
                            return element.val().length && element.val() !== 'all' ? `<span class="element-icon ${element.val()}_element_icn"></span>${text}` : text
                        }
                    })
                    $('#sort_class').selectric({
                        optionsItemBuilder: (itemData) => {
                            const {element, text} = itemData
                            return element.val().length && element.val() !== 'all' ? `<span carac="${element.val()}"></span>${text}` : text
                        }
                    })
                    $('#sort_rarity').selectric({
                        optionsItemBuilder: (itemData) => {
                            const {element, text} = itemData
                            return element.val().length && element.val() !== 'all' ? `<span class="${element.val()}-text">${text}</span>` : text
                        }
                    })
                    const otherFields = ['level_cap', 'aff_category', 'aff_lvl']
                    otherFields.forEach(field => $(`#sort_${field}`).selectric())

                    btn.on('click', function() {
                        $('#arena_filter_box').css('display', $('#arena_filter_box').css('display')==='grid'?'none':'grid')
                    })

                    let sortGirls = () => {
                        saveBasicFilter(filterBox)
                        filterGirls(girlsData)
                    }
                    const populateFields = () => {
                        const {carac, rarity, element, name, range, affCategory, affLvl, levelCap} = loadFilter()
                        filterBox.find('#sort_class').val(carac).selectric('refresh')
                        filterBox.find('#sort_rarity').val(rarity).selectric('refresh')
                        filterBox.find('#sort_element').val(element).selectric('refresh')
                        filterBox.find('#sort_aff_category').val(affCategory).selectric('refresh')
                        filterBox.find('#sort_aff_lvl').val(affLvl).selectric('refresh')
                        filterBox.find('#sort_name').val(name)
                        filterBox.find('#sort_level').val(range)
                        filterBox.find('#sort_level_cap').val(levelCap).selectric('refresh')
                    }
                    const filterGirlsWithTeam = (team) => {
                        saveTeamFilter(team)
                        populateFields()
                        filterGirls(girlsData)
                    }
                    const clearFilterAndForm = () => {
                        clearFilter()
                        populateFields()
                        filterGirls(girlsData)
                    }

                    ['sort_class', 'sort_element', 'sort_rarity', 'sort_aff_category', 'sort_aff_lvl', 'sort_level_cap'].forEach(id => {
                        filterBox.find(`#${id}`).on('change', sortGirls)
                    });
                    ['sort_name', 'sort_level'].forEach(id => {
                        filterBox.find(`#${id}`).on('input' , sortGirls)
                    })
                    filterBox.find('[rel=select-team]').click(() => $('.team-selection').css('display', $('.team-selection').css('display')==='block'?'none':'block'))
                    filterBox.find('[rel=clear-filter]').click(clearFilterAndForm)
                    filterBox.find('.close-filter').click(() => $('#arena_filter_box').css('display', 'none'))
                    teamsBox.find('.team-slot-container').click(function () {
                        filterGirlsWithTeam($(this).data('girl-ids'))
                        $('.team-selection').css('display', 'none')
                    })
                    teamsBox.find('.close-team-selection').click(() => $('.team-selection').css('display', 'none'))
                }

                let girlsData = getGirlData()
                createFilter( $('#girls_list'), girlsData )

                const searchParams = new URL(window.location.href).searchParams
                if (searchParams.has('girl')) {
                    const girlId = searchParams.get('girl')
                    filterGirls(girlsData, girlId)
                    let index = $(`[id_girl=${girlId}]`).index()
                    if (index > 0) {
                        goto_girl(index + 1)
                    }
                } else {
                    filterGirls(girlsData)
                }
            }

            addGirlFilter()

        }

        Helpers.defer(() => {
            if ($('#type_item > .selected').length) {
                deferredRun()
            } else {
                const marketReadyObserver = new MutationObserver(() => {
                    if ($('#type_item > .selected').length) {
                        marketReadyObserver.disconnect()
                        deferredRun()
                    }
                })

                marketReadyObserver.observe($('#type_item')[0], {attributes: true, attributeFilter:['class'], subtree: true})
            }

        })

        this.hasRun = true
    }

    injectCSSVars() {
        Sheet.registerVar('filter-icon', `url('${filterIcon}')`)
        Sheet.registerVar('cross-icon', `url('${Helpers.getCDNHost()}/clubs/ic_xCross.png')`)
    }
}

export default MarketGirlsFilterModule
