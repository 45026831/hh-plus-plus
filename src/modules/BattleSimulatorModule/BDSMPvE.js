import I18n from '../../i18n'
import SimHelpers from './SimHelpers'

class BDSMPvE {
    constructor({label}) {
        this.label = label
    }

    extract () {
        const {opponent_fighter, hero_data} = window
        const opponent_data = opponent_fighter.player
        const {
            chance: playerCrit,
            damage: playerAtk,
            defense: playerDef,
            remaining_ego: playerRemainingEgo,
            total_ego: playerTotalEgo,
        } = hero_data
        const playerEgo = playerRemainingEgo || playerTotalEgo
        const {
            team: playerTeam
        } = hero_data
        let normalisedElements = playerTeam.theme_elements
        let normalisedSynergies = playerTeam.synergies

        if (!normalisedElements) {
            normalisedElements = []
            const teamElementCounts = SimHelpers.countElementsInTeam([0,1,2,3,4,5,6].map(key => playerTeam.girls[key].element_data.type))
            Object.entries(teamElementCounts).forEach(([type, count]) => {
                if (count >= 3) {
                    normalisedElements.push({type})
                }
            })
        }

        if (!normalisedSynergies) {
            normalisedSynergies = JSON.parse($('#leagues_left .hexa .icon-area').attr('synergy-data'))
        }

        const playerElements = normalisedElements.map(({type}) => type)
        const playerSynergies = normalisedSynergies
        const playerBonuses = {
            critDamage: SimHelpers.findBonusFromSynergies(playerSynergies, 'fire'),
            critChance: SimHelpers.findBonusFromSynergies(playerSynergies, 'stone'),
            healOnHit: SimHelpers.findBonusFromSynergies(playerSynergies, 'water'),
        }

        const {
            chance: opponentCrit,
            damage: opponentAtk,
            defense: opponentDef,
            remaining_ego: opponentRemainingEgo,
            total_ego: opponentTotalEgo,
            nickname: name
        } = opponent_data
        const opponentEgo = opponentRemainingEgo || opponentTotalEgo
        const {
            team: opponentTeam
        } = opponent_data
        const opponentTeamMemberElements = [];
        [0,1,2,3,4,5,6].forEach(key => {
            const teamMember = opponentTeam.girls[key]
            if (teamMember && teamMember.element) {
                opponentTeamMemberElements.push(teamMember.element)
            }
        })
        const opponentElements = opponentTeam.theme_elements.map(({type}) => type)

        const opponentSynergies = opponentTeam.synergies
        const teamGirlSynergyBonusesMissing = opponentSynergies.every(({team_girls_count}) => !team_girls_count)
        let counts
        if (teamGirlSynergyBonusesMissing) {
            // Open bug, sometimes opponent syergy data is missing team bonuses, so we need to rebuild it from the team
            counts = opponentTeamMemberElements.reduce((a,b)=>{a[b]++;return a}, {
                fire: 0,
                stone: 0,
                sun: 0,
                water: 0,
                nature: 0,
                darkness: 0,
                light: 0,
                psychic: 0
            })
        }

        const opponentBonuses = {
            critDamage: SimHelpers.findBonusFromSynergies(opponentSynergies, 'fire', teamGirlSynergyBonusesMissing, counts),
            critChance: SimHelpers.findBonusFromSynergies(opponentSynergies, 'stone', teamGirlSynergyBonusesMissing, counts),
            healOnHit: SimHelpers.findBonusFromSynergies(opponentSynergies, 'water', teamGirlSynergyBonusesMissing, counts),
        }


        const dominanceBonuses = SimHelpers.calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo,
            dmg: playerAtk - opponentDef,
            critchance: SimHelpers.calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: {...playerBonuses, dominance: dominanceBonuses.player},
            theme: playerElements,
        }
        const opponent = {
            hp: opponentEgo,
            dmg: opponentAtk - playerDef,
            critchance: SimHelpers.calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name,
            bonuses: {...opponentBonuses, dominance: dominanceBonuses.opponent},
            theme: opponentElements,
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
        $('.player_team_block.opponent .average-lvl')
            .wrap('<div class="gridWrapper"></div>')
            .after($matchRating)
    }
}

export default BDSMPvE
