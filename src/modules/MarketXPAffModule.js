/* global Hero */
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'
import * as GirlXP from '../data/GirlXP'
const MODULE_KEY = 'marketXPAff'

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

        const updateGirlXP = (girl) => {
            const girlTooltip = girl.data('new-girl-tooltip')
            const girlData = girl.data('g')
            if (!girlTooltip || !girlData) {
                // No current girl (most likely due to filter)
                return
            }
            const {rarity} = girlTooltip
            const {Xp, level_cap} = girlData
            const lvl_max = level_cap || Hero.infos.level
            const xp_total = GirlXP[rarity][lvl_max-2]

            const {cur, max} = Xp
            const xp_total_remaining = xp_total - cur
            const xp_next_remaining = max - cur

            const $xpBar = girl.find('.bar-wrap[rel="xp"]')
            $xpBar.find('#xpTool').remove()
            $xpBar.append('<span id="xpTool" class="infoTooltip xpTooltip">XP: ' + I18n.nThousand(cur) + '</span>')

            if( xp_total_remaining > 0) {
                $xpBar.find('.over').text(this.label('xp', {remainNext: I18n.nThousand(xp_next_remaining), remainMax: I18n.nThousand(xp_total_remaining)}))
            }
        }

        const updateGirlAff = (girl) => {
            const girlData = girl.data('g')
            if (!girlData) {
                // No current girl (most likely due to filter)
                return
            }
            const {Affection: {max, cur}} = girlData
            let aff_remaining = max - cur
            girl.find('.bar-wrap[rel="aff"] .over span').text(this.label('aff', {remainNext: I18n.nThousand(aff_remaining)}))
        }

        const updateBoth = () => {
            let girl = $('div.girl-ico:not(.not-selected)')
            updateGirlXP(girl)
            updateGirlAff(girl)
        }
        updateBoth()

        // change shop area
        $('#type_item > [type=potion], #type_item > [type=gift]').click(updateBoth)

        // arrows
        $('.g1 > [nav=left], .g1 > [nav=right]').click(updateBoth)

        // events from other modules
        $(document).on('market:selected-girl-changed', updateBoth)

        const updateFuncs = {
            potion: updateGirlXP,
            gift: updateGirlAff
        }

        let button = document.querySelector('#inventory button[rel=use]')
        button.addEventListener('click', function(){
            const girl = $('div.girl-ico:not(.not-selected)')

            const type = $('#type_item > .selected').attr('type')
            const update = updateFuncs[type]
            if (update) {
                setTimeout(function(){update(girl)}, 500)
                setTimeout(function(){update(girl)}, 3000)
            }
        })

        this.hasRun = true
    }

    injectCSS() {
        this.insertRule(`
            .xpTooltip {
                margin-top: 23px;
                margin-left: 20px;
            }
        `)

        this.insertRule(`
            .bar-wrap[rel="xp"]:hover .xpTooltip {
                visibility: visible;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default MarketGirlsFilterModule
