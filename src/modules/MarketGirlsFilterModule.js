/* global GT, HH_MAX_LEVEL */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'
import filterIcon from '../assets/filter.svg'
const {$} = Helpers
const MODULE_KEY = 'marketGirlsFilter'

class MarketGirlsFilterModule extends HHModule {
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
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        this.injectCSS()

        let container = $('.g1>div')

        let cur_id = parseInt(container.find('.number.selected').text().split('/')[0])
        container.find('.number').remove()

        let allGirls = Array.from( container.find('.girl-ico').toArray(), e => $(e) )

        let nb_girls = container.children().length
        let nav = $('<span class="number selected">/</span>')
        container.append(nav)

        let max_girl = $(`<span>${nb_girls}</span>`)
        nav.append(max_girl)

        function updateNavMax() {
            nb_girls = container.children().length - 1
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
            return container.children().eq(id - 1)
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
                const {level, Name, class: carac} = $girl.data('g')
                $('#girls_list>.level_target_squared>div>div').attr('chars', level.length)
                $('#girls_list>.level_target_squared>div>div').text(level)
                $('#girls_list>h3').text(Name)
                $('#girls_list>.icon').attr('carac', carac)
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
                return Array.from(allGirls, girl => ({id: $(girl).attr('id_girl'), ...$(girl).data('new-girl-tooltip') }))
            }

            const createFilterBox = () => {
                const buildTextInput = ({id, label, placeholder}) => `
                    <div class="form-control">
                        <div class="input-group">
                            <label class="head-group" for="${id}">${label}</label>
                            <input type="text" autocomplete="off" id="${id}" placeholder="${placeholder}" icon="search">
                        </div>
                    </div>
                `
                const buildSelectInput = ({id, label, options}) => `
                    <div class="form-control">
                        <div class="select-group">
                            <label class="head-group" for="${id}">${label}</label>
                            <select name="${id}" id="${id}" icon="down-arrow">
                                <option value="all" selected="selected">${this.label('all')}</option>
                                ${options.map(({label, value}) => `<option value="${value}">${label}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                `

                const affectionGradeOption = grade => ({ label: this.label(`grade${grade}`), value: grade })
                return $(`
                    <div style="position:relative">
                        <div id="arena_filter_box" class="form-wrapper" style="display: none;">
                            ${buildTextInput({id: 'sort_name', label: this.label('searchedName'), placeholder: this.label('girlName')})}
                            ${buildSelectInput({id: 'sort_class', label: this.label('searchedClass'), options: [1,2,3].map(option => ({label: GT.caracs[option], value: option}))})}
                            ${buildSelectInput({id: 'sort_rarity', label: this.label('searchedRarity'), options: ['starting', 'common', 'rare', 'epic', 'legendary', 'mythic'].map(option => ({label: GT.design[`girls_rarity_${option}`], value: option}))})}
                            ${buildTextInput({id: 'sort_level', label: this.label('levelRange'), placeholder: `1-${HH_MAX_LEVEL}`})}
                            ${buildSelectInput({id: 'sort_aff_category', label: this.label('searchedAffCategory'), options: [1,3,5,6].map(affectionGradeOption)})}
                            ${buildSelectInput({id: 'sort_aff_lvl', label: this.label('searchedAffLevel'), options: [0,1,2,3,4,5,6].map(affectionGradeOption)})}
                            <input type="button" class="blue_button_L" rel="select-team" value="${this.label('team')}" />
                        </div>
                    </div>`)
            }

            function createTeamsBox() {
                const bdsmTeamsJson = localStorage.getItem('bdsmTeams')
                if (!bdsmTeamsJson) {
                    return $(`
                    <div style="position:relative">
                        <div class="team-selection" style="display: none;">
                            <span class="close-team-selection" />
                            ${this.label('visitTeams')}
                        </div>
                    </div>`)
                }
                const {teamIds, teamsDict} = JSON.parse(bdsmTeamsJson)
                return $(`
                <div style="position:relative">
                    <div class="team-selection" style="display: none;">
                        <span class="close-team-selection" />
                        <div class="teams-grid-container rarity-background">
                            ${teamIds.map(teamId => teamsDict[teamId]).map(team => `
                                <div class="team-slot-container ${team.iconRarity}" data-id-team="${team.teamId}" data-girl-ids='${JSON.stringify(team.girls)}'>
                                    <img src="${team.icon}" />
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

            function filterGirls(form, girlsData, useTeam) {
                const sorterClass = form.find('#sort_class').val()
                const sorterRarity = form.find('#sort_rarity').val()
                const sorterAffCategory = form.find('#sort_aff_category').val()
                const sorterAffLvl = form.find('#sort_aff_lvl').val()
                const sorterName = form.find('#sort_name').val()
                const sorterRange = form.find('#sort_level').val().split('-')
                const nameRegex = new RegExp(sorterName, 'i')

                hideCurrentGirl()

                girlsData.forEach((girl, i) => {
                    if (useTeam) {
                        if(useTeam.includes(girl.id)) {
                            nav.before(allGirls[i])
                        } else {
                            allGirls[i].detach()
                        }
                    } else {
                        const $grade = $(girl.Graded2)
                        const affectionCategory = `${$grade.length}`
                        const affectionLvl = `${$grade.filter('g:not(.grey):not(.green)').length}`

                        const matchesClass = (girl.class === sorterClass) || (sorterClass === 'all')
                        const matchesRarity = (girl.rarity === sorterRarity) || (sorterRarity === 'all')
                        const matchesAffCategory = (affectionCategory === sorterAffCategory) || (sorterAffCategory === 'all')
                        const matchesAffLvl = (affectionLvl === sorterAffLvl) || (sorterAffLvl === 'all')
                        const matchesName = (girl.Name.search(nameRegex) > -1)
                        const matchesLevel =  (!sorterRange[0] || girl.level >= parseInt(sorterRange[0]) )
                        && (!sorterRange[1] || girl.level <= parseInt(sorterRange[1]) )

                        if(matchesClass && matchesRarity && matchesName && matchesLevel && matchesAffCategory && matchesAffLvl) {
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
                target.append(filterBox)
                target.append(teamsBox)

                btn.on('click', function() {
                    $('#arena_filter_box').css('display', $('#arena_filter_box').css('display')==='block'?'none':'block')
                })

                let sortGirls = () => {
                    filterGirls(filterBox, girlsData)
                }
                const filterGirlsWithTeam = (team) => {
                    filterGirls(filterBox, girlsData, team)
                }

                filterBox.find('#sort_class') .on('change', sortGirls)
                filterBox.find('#sort_rarity').on('change', sortGirls)
                filterBox.find('#sort_aff_category').on('change', sortGirls)
                filterBox.find('#sort_aff_lvl').on('change', sortGirls)
                filterBox.find('#sort_name')  .on('input' , sortGirls )
                filterBox.find('#sort_level') .on('input' , sortGirls )
                filterBox.find('[rel=select-team]').click(() => $('.team-selection').css('display', $('.team-selection').css('display')==='block'?'none':'block'))
                teamsBox.find('.team-slot-container').click(function () {
                    filterGirlsWithTeam($(this).data('girl-ids'))
                    $('.team-selection').css('display', 'none')
                })
                teamsBox.find('.close-team-selection').click(() => $('.team-selection').css('display', 'none'))
            }

            let girlsData = getGirlData()
            createFilter( $('#girls_list'), girlsData )
        }

        addGirlFilter()

        this.hasRun = true
    }

    injectCSS() {
        this.insertRule(`
            #arena_filter_box label.head-group {
                display: block;
                position: relative;
                left: -5px;
                z-index: 15;
                margin-bottom: -8px;
                margin-top: -3px !important;
                padding-left: 7px;
                font-size: 14px;
                font-weight: 400;
                letter-spacing: .22px;
                text-align: left !important;
                color: #ffb827;
                background:transparent;
                text-shadow: -1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,-2px -2px 5px rgba(255,159,0,.4),2px -2px 5px rgba(255,159,0,.4),-2px 2px 5px rgba(255,159,0,.4),2px 2px 5px rgba(255,159,0,.4),0 0 10px rgba(255,159,0,.4);
            }
        `)

        this.insertRule(`
            #shops #girls_list .g1 > div > .number {
                left: 0 !important;
            }
        `)

        this.insertRule(`
            label.girl_filter {
                background: none;
            }
        `)
        this.insertRule(`
            label.girl_filter input {
                height: 32px;
                width: 32px;
                display: block;
                padding: 0px;
            }
        `)
        this.insertRule(`
            label.girl_filter::before {
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
        this.insertRule(Helpers.mediaMobile(`
            label.girl_filter {
                position: absolute;
                left: -2px;
                top: 0px;
            }
        `))

        this.insertRule(Helpers.mediaDesktop(`
            label.girl_filter {
                position: absolute;
                left: -2px;
                top: -12px;
            }
        `))

        this.insertRule(`
            #arena_filter_box {
                position: absolute;
                left: -215px;
                width: 200px;
                height: fit-content;
                z-index: 3;
                border-radius: 8px 10px 10px 8px;
                background-color: rgb(30, 38, 30);
                box-shadow: rgba(255, 255, 255, 0.73) 0px 0px;
                padding: 5px;
                border: 1px solid rgb(255, 162, 62);
            }
        `)
        this.insertRule(Helpers.mediaMobile(`
            #arena_filter_box {
                top: -218px;
            }
        `))
        this.insertRule(Helpers.mediaDesktop(`
            #arena_filter_box {
                top: -230px;
            }
        `))

        this.insertRule(`
            .team-selection {
                position: absolute;
                left: 0px;
                bottom: -208px;
                width: 400px;
                height: fit-content;
                border-radius: 8px 10px 10px 8px;
                background-color: #1e261e;
                box-shadow: rgba(255, 255, 255, 0.73) 0px 0px;
                padding: 5px; border: 1px solid #ffa23e;
                z-index:10;
            }
        `)
        this.insertRule(`
            .teams-grid-container {
                display: grid;
                grid-template-columns: auto auto auto auto;
                grid-row-gap: 1rem;
                padding: .4rem .9rem .4rem .9rem;
                margin-right: -1rem;
            }
        `)
        this.insertRule(`
            .team-slot-container {
                overflow: hidden;
            }
        `)
        this.insertRule(`
            .close-team-selection {
                position: absolute;
                display: block;
                background: url(${Helpers.getCDNHost()}/clubs/ic_xCross.png);
                background-size: cover;
                height: 32px;
                width: 35px;
                top:-16px;
                right:-17px;
                cursor: pointer;
            }
        `)
        this.insertRule(`
            [rel=select-team] {
                width: 100%;
                height: 36px;
                padding-top: 5px;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default MarketGirlsFilterModule
