import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'
import I18n from '../i18n'
import HHModule from './HHModule'

import styles from './SeasonStatsModule.lazy.scss'

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
        styles.use()

        Helpers.defer(() => {
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

        })

        this.hasRun = true
    }
}

export default SeasonStatsModule
