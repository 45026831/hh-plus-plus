import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'
import { lsKeys } from '../../common/Constants'

const MODULE_KEY = 'leaderboardClubmateIndicators'

class LeaderboardClubmateIndicatorsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return ['activities', 'tower-of-fame', 'pantheon', 'season.html', 'path-of-valor', 'path-of-glory'].some(page => Helpers.isCurrentPage(page))
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            if (['activities', 'tower-of-fame'].some(page => Helpers.isCurrentPage(page))) {
                this.addClubmateAnnotations()
            }
        })

        $(document).on('leaderboard-annotated', (event, data) => this.addClubmateAnnotations(data))
        $(document).on('league:table-sorted', () => {this.addClubmateAnnotations()})

        this.hasRun = true
    }

    async addClubmateAnnotations (data) {
        const selector = (data && data.selector) || ''
        const clubStatus = Helpers.lsGet(lsKeys.CLUB_STATUS)
        const nameColumnSelector = this.getNameColumnSelector()

        if (clubStatus && clubStatus.memberIds) {
            clubStatus.memberIds.forEach((id) => {
                if (id === `${window.Hero.infos.id}`) {return}
                $(`${selector} [sorting_id='${id}']`).find(nameColumnSelector).append(`<div class="script-flair script-clubmate"><span class="globalClubs_mix_icn" tooltip="${this.label('clubmate')}"/></div>`)
            })
        }
    }

    getNameColumnSelector () {
        if (Helpers.isCurrentPage('activities')) {
            return 'td:nth-of-type(2)'
        } else if (Helpers.isCurrentPage('tower-of-fame')) {
            return '.nickname'
        }
        return '> div:nth-of-type(2)'
    }
}

export default LeaderboardClubmateIndicatorsModule
