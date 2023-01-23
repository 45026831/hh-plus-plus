import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import tierIconGold from '../../assets/hh-plus-plus-gold.svg'
import tierIconSilver from '../../assets/hh-plus-plus-silver.svg'

import styles from './styles.lazy.scss'
import Supporters from '../../data/Supporters'

const MODULE_KEY = 'leaderboardSupportersIndicators'

const TIER_ICONS = {
    gold: tierIconGold,
    silver: tierIconSilver,
}

class LeaderboardSupportersIndicatorsModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
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
                this.addSupporterAnnotations()
            }
        })

        $(document).on('leaderboard-annotated', (event, data) => this.addSupporterAnnotations(data))
        $(document).on('league:table-sorted', () => {this.addSupporterAnnotations()})

        this.hasRun = true
    }

    async addSupporterAnnotations (data) {
        const selector = (data && data.selector) || ''
        const supporters = await Supporters.getSupporters()
        const filteredSupporters = supporters.filter(({flairs}) => flairs)

        const gameKey = Helpers.getGameKey()
        const gamePlatform = Helpers.getPlatform()

        const nameColumnSelector = this.getNameColumnSelector()

        filteredSupporters.forEach(({tier, flairs}) => {
            flairs.forEach(({game, platform, id}) => {
                if (game === gameKey && platform === gamePlatform) {
                    $(`${selector} [sorting_id='${id}']`).find(nameColumnSelector).append(`<div class="script-flair script-supporter"><img class="tier-icon" src="${TIER_ICONS[tier]}" tooltip="HH++ ${tier.substring(0,1).toUpperCase()}${tier.substring(1)} Tier Supporter"/></div>`)
                }
            })
        })
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

export default LeaderboardSupportersIndicatorsModule
