import I18n from '../../i18n'
import SimHelpers from './SimHelpers'

class Season {
    constructor(idOpponent) {
        this.idOpponent = idOpponent
    }

    extract() {
        const { caracs_per_opponent } = window

        const $playerData = $('#season-arena .battle_hero')
        const $opponentData = $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2 * this.idOpponent + 1) + ')')
        const opponentId = $opponentData.attr('data-opponent') // using attr as we want a string, not a number

        const {
            total_ego: playerTotalEgo,
            remaining_ego: playerRemainingEgo,
            damage: playerAtk,
            defense: playerDef,
            chance: playerCrit
        } = caracs_per_opponent[opponentId]
        const playerEgo = playerTotalEgo || playerRemainingEgo

        const playerSynergyDataJSON = $playerData.find('.hero_team .icon-area').attr('synergy-data')
        const playerSynergies = JSON.parse(playerSynergyDataJSON)
        const playerTeam = $playerData.find('.hero_team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const playerTeamMemberElements = playerTeam.map(({ element_data }) => element_data.type)
        const playerElements = SimHelpers.calculateThemeFromElements(playerTeamMemberElements)
        const playerBonuses = {
            critDamage: SimHelpers.findBonusFromSynergies(playerSynergies, 'fire'),
            critChance: SimHelpers.findBonusFromSynergies(playerSynergies, 'stone'),
            healOnHit: SimHelpers.findBonusFromSynergies(playerSynergies, 'water'),
        }

        const opponentEgo = parseInt($opponentData.find('.hero_stats div:nth-child(2) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10)
        const opponentDef = parseInt($opponentData.find('.hero_stats div:nth-child(1) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10)
        const opponentAtk = parseInt($opponentData.find('.hero_stats div:nth-child(1) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10)
        const opponentCrit = parseInt($opponentData.find('.hero_stats div:nth-child(2) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10)
        const opponentTeam = $opponentData.find('.hero_team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const opponentTeamMemberElements = opponentTeam.map(({ element }) => element)
        const opponentElements = SimHelpers.calculateThemeFromElements(opponentTeamMemberElements)
        const opponentBonuses = SimHelpers.calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements)

        const dominanceBonuses = SimHelpers.calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo,
            dmg: playerAtk - opponentDef,
            critchance: SimHelpers.calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: playerBonuses
        }
        const opponent = {
            hp: opponentEgo,
            dmg: opponentAtk - playerDef,
            critchance: SimHelpers.calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name: $('.season_arena_opponent_container:nth-child(' + (2 * this.idOpponent + 1) + ') > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').text(),
            bonuses: opponentBonuses
        }

        return { player, opponent }
    }

    display(result) {
        const $opponentData = $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2 * this.idOpponent + 1) + ')')
        let $gridWrapper = $opponentData.find('.gridWrapper')
        if (!$gridWrapper.length) {
            $opponentData.find('.average-lvl').wrap('<div class="gridWrapper"></div>')
            $gridWrapper = $opponentData.find('.gridWrapper')
        }

        $gridWrapper.find('.matchRating').remove()
        const { rewards } = $opponentData.find('.rewards_list').data('reward-display')
        const pointsReward = rewards.find(({ type }) => type === 'victory_points')
        const points = parseInt($(pointsReward.value).text())
        const expected = result.win * points - (1 - result.win) * (40 - points)
        const pointClass = expected > 15 ? 'plus' : expected < 0 ? 'minus' : 'close'
        $gridWrapper.append(`<span class="matchRating"><span class="${result.scoreClass}">${I18n.nRounding(100 * result.win, 2, -1)}%</span><br/><span class="${pointClass}">E[<span cur="victory_points"></span>]=${I18n.nRounding(expected, 1, -1)}</span></span>`)
    }
}

export default Season
