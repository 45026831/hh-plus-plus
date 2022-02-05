import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'leaderboardFix'

class LeaderboardFixModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return ['season.html', 'path-of-valor'].some(page => Helpers.isCurrentPage(page))
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            if (Helpers.isCurrentPage('season.html')) {
                this.fixSeasonLeaderboard()
            } else if (Helpers.isCurrentPage('path-of-valor')) {
                this.fixPoVLeaderboard()
            }
        })

        this.hasRun = true
    }

    fixSeasonLeaderboard () {
        const {leaderboard_data} = window
        const ownRowData = leaderboard_data.find(({is_hero})=>is_hero)
        if (!ownRowData) {return}

        const $ownRow = $('#leaderboard_list .leaderboard_row').eq(ownRowData.index).clone()
        $ownRow.addClass('script-player-row')
        const $ownRowContainer = $('<div class="script-player-row-container"></div>')
        $ownRowContainer.append($ownRow)
        $('#leaderboard_holder').append($ownRowContainer)
    }

    fixPoVLeaderboard () {
        const observer = new MutationObserver(() => {
            observer.disconnect()

            const $ownRow = $('#leaderboard_list .leaderboard_row.hero-row').clone()
            $ownRow.addClass('script-player-row')
            const $ownRowContainer = $('<div class="script-player-row-container"></div>')
            $ownRowContainer.append($ownRow)
            $('#leaderboard_holder').append($ownRowContainer)
        })
        observer.observe(document.getElementById('leaderboard_list'), {childList: true})
    }
}

export default LeaderboardFixModule
