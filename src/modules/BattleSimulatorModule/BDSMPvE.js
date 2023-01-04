import I18n from '../../i18n'
import SimHelpers from './SimHelpers'

class BDSMPvE {
    constructor({label}) {
        this.label = label
    }

    extract () {
        const playerStats = $('#pre-battle #player-panel .stat')
        const playerAtk = I18n.parseLocaleRoundedInt(playerStats[0].innerText)
        const playerEgo = I18n.parseLocaleRoundedInt(playerStats[1].innerText)
        const playerDef = I18n.parseLocaleRoundedInt(playerStats[2].innerText)
        const playerHarmony = I18n.parseLocaleRoundedInt(playerStats[3].innerText)

        const $playerData = $('#player-panel')
        const playerSynergyDataJSON = $playerData.find('.icon-area').attr('synergy-data')
        const playerSynergies = JSON.parse(playerSynergyDataJSON)
        const playerTeam = $playerData.find('.team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const playerTeamMemberElements = playerTeam.map(({element_data})=>element_data.type)
        const playerElements = SimHelpers.calculateThemeFromElements(playerTeamMemberElements)
        const playerBonuses = {
            critDamage: SimHelpers.findBonusFromSynergies(playerSynergies, 'fire'),
            critChance: SimHelpers.findBonusFromSynergies(playerSynergies, 'stone'),
            healOnHit: SimHelpers.findBonusFromSynergies(playerSynergies, 'water'),
        }

        const opponentStats = $('#pre-battle #opponent-panel .stat')
        const opponentAtk = I18n.parseLocaleRoundedInt(opponentStats[0].innerText)
        const opponentEgo = I18n.parseLocaleRoundedInt(opponentStats[1].innerText)
        const opponentDef = I18n.parseLocaleRoundedInt(opponentStats[2].innerText)
        const opponentHarmony = I18n.parseLocaleRoundedInt(opponentStats[3].innerText)

        const $opponentData = $('#opponent-panel')
        const opponentTeam = $opponentData.find('.team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const opponentTeamMemberElements = opponentTeam.map(({element})=>element)
        const opponentElements = SimHelpers.calculateThemeFromElements(opponentTeamMemberElements)
        const opponentBonuses = SimHelpers.calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements, true)

        const dominanceBonuses = SimHelpers.calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo,
            dmg: playerAtk - opponentDef,
            critchance: SimHelpers.calculateCritChanceShare(playerHarmony, opponentHarmony) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: playerBonuses
        }
        const opponent = {
            hp: opponentEgo,
            dmg: opponentAtk - playerDef,
            critchance: SimHelpers.calculateCritChanceShare(opponentHarmony, playerHarmony) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name: $('#opponent-panel .hero-name-container').text(),
            bonuses: opponentBonuses
        }

        return {player, opponent}
    }

    display (result) {
        const $matchRating = $(`<div class="matchRating ${result.scoreClass}">${I18n.nRounding(100*result.win, 2, -1)}%</div>`)
        if (result.impossible) {
            $matchRating.append(`<span class="short-circuit xUncheck_mix_icn" tooltip="${this.label('impossible')}"></span>`)
        }
        if (result.guaranteed) {
            $matchRating.append(`<span class="short-circuit vCheck_mix_icn" tooltip="${this.label('guaranteed')}"></span>`)
        }
        $('#opponent-panel .average-lvl')
            .wrap('<div class="gridWrapper"></div>')
            .after($matchRating)
    }
}

export default BDSMPvE
