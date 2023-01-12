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
        return ['season.html', 'path-of-valor', 'path-of-glory', 'pantheon.html'].some(page => Helpers.isCurrentPage(page))
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            this.fixLeaderboards()
        })

        this.hasRun = true
    }

    fixLeaderboards () {
        // do not use $('#leaderboard_list') because jQuery cannot select multiple elements with the same id
        document.querySelectorAll('#leaderboard_list')
            .forEach(leaderboardList => this.fixLeaderboard(leaderboardList))
    }

    fixLeaderboard (leaderboardList) {
        const $leaderboardList = $(leaderboardList)
        const numRows = $leaderboardList.find('.leaderboard_row').length

        if (numRows === 0) {
            // not loaded yet
            const observer = new MutationObserver(() => {
                observer.disconnect()
                this.fixLeaderboard(leaderboardList)
            })
            observer.observe(leaderboardList, {childList: true})
            return
        }

        const inTheTop1000 = numRows <= 1000
        if (!inTheTop1000) return

        if (Helpers.isCurrentPage('season.html')) {
            this.fixSeasonLeaderboard($leaderboardList)
        } else if (['path-of-valor', 'path-of-glory'].some(page => Helpers.isCurrentPage(page))) {
            this.fixPathLeaderboard($leaderboardList)
        } else if (Helpers.isCurrentPage('pantheon.html')) {
            this.fixPathLeaderboard($leaderboardList)
        }
    }

    fixSeasonLeaderboard ($leaderboardList) {
        const {leaderboard_data} = window
        const ownRowData = leaderboard_data.find(({is_hero})=>is_hero)
        if (!ownRowData) {return}

        const $ownRow = $leaderboardList.find('.leaderboard_row')
            .eq(ownRowData.rank - 1)
            .clone()
            .addClass('script-season-leaderboard-fix')
        $leaderboardList.append($ownRow)
    }

    fixPathLeaderboard ($leaderboardList) {
        const $ownRow = $leaderboardList.find('.leaderboard_row.hero-row')
            .clone()
            .addClass('build-at-bottom')
        $leaderboardList.append($ownRow)
    }
}

export default LeaderboardFixModule
