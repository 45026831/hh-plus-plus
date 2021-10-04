import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'

class SeasonStatsModule extends HHModule {
    constructor () {
        const configSchema = {
            baseKey: 'seasonStats',
            label: I18n.getModuleLabel('config', 'seasonStats'),
            default: true
        }
        super({
            group: 'core',
            name: 'seasonStats',
            configSchema
        })
        this.label = I18n.getModuleLabel.bind(this, 'seasonStats')
        this.sheet = Helpers.getSheet()
        this.insertedRules = []
    }

    shouldRun() {
        return Helpers.isCurrentPage('season.html') || Helpers.isCurrentPage('season-arena')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}
        this.injectCSS()

        const seasonStats = Helpers.lsGet(lsKeys.SEASON_STATS)
        if (!seasonStats) {
            return
        }

        const {fights, victories, losses, won_mojo, lost_mojo} = seasonStats

        const statsTooltip = `
            <span class="scriptSeasonStatsTooltip" style="visibility: visible;">
                <table>
                    <tbody>
                        <tr><td>${this.label('fights')} :</td><td>${fights}</td></tr>
                        <tr><td>${this.label('victories')} :</td><td>${victories}</td></tr>
                        <tr><td>${this.label('defeats')} :</td><td>${losses}</td></tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr><td>${this.label('mojoWon')} :</td><td>${won_mojo}</td></tr>
                        <tr><td>${this.label('mojoLost')} :</td><td>${lost_mojo}</td></tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr><td>${this.label('mojoWonAvg')} :</td><td>${I18n.nRounding(won_mojo / Math.max(victories, 1), 2, -1)}</td></tr>
                        <tr><td>${this.label('mojoLostAvg')} :</td><td>${I18n.nRounding(lost_mojo / Math.max(losses, 1), 2, -1)}</td></tr>
                        <tr><td>${this.label('mojoAvg')} :</td><td>${I18n.nRounding((won_mojo - lost_mojo) / Math.max(fights, 1), 2, -1)}</td></tr>
                    </tbody>
                </table>
            </span>
        `.replace(/( {4}|\n)/g, '')

        const $stats = $('<span class="scriptSeasonStats">Stats</span>').attr('hh_title', statsTooltip)
        if (Helpers.isCurrentPage('season.html')) {
            $('div#seasons_tab_title').append($stats)
        } else {
            $('.hero .hero_details .center_y').append($stats)
        }

        this.hasRun = true
    }

    injectCSS () {
        this.insertRule(`
            .scriptSeasonStatsTooltip {
                font-size: 12px;
                color: #fff;
            }
        `)
        this.insertRule(`
            .scriptSeasonStats {
                color: #8ec3ff;
                font-size: 16px;
            }
        `)
        this.insertRule(`
            #seasons_tab_title .scriptSeasonStats {
                margin-left: 54px;
            }
        `)
        this.insertRule(`
            .hero .scriptSeasonStats {
                margin-left: 15px;
            }
        `)
        this.insertRule(`
            .scriptSeasonStatsTooltip table {
                margin-left: auto;
                margin-right: auto;
            }
        `)
        this.insertRule(`
            .scriptSeasonStatsTooltip table tr td:first-child {
                text-align: right;
            }
        `)
        this.insertRule(`
            .scriptSeasonStatsTooltip table tr td:last-child {
                text-align: left;
            }
        `)
    }

    insertRule (rule) {
        this.insertedRules.push(this.sheet.insertRule(rule))
    }
}

export default SeasonStatsModule
