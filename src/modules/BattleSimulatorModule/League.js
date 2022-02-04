import I18n from '../../i18n'
import SimHelpers from './SimHelpers'

class League {
    constructor ({highPrecisionMode}) {
        this.highPrecisionMode = highPrecisionMode
    }

    extract () {
        const {playerLeaguesData, heroLeaguesData, caracs_per_opponent} = window
        const opponentId = playerLeaguesData.id_fighter
        const {
            chance: playerCrit,
            damage: playerAtk,
            defense: playerDef,
            remaining_ego: playerEgo,
        } = caracs_per_opponent[opponentId]
        const {
            team: playerTeam
        } = heroLeaguesData
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
            total_ego: opponentEgo,
            nickname: name
        } = playerLeaguesData
        const {
            team: opponentTeam
        } = playerLeaguesData
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
            bonuses: playerBonuses
        }
        const opponent = {
            hp: opponentEgo,
            dmg: opponentAtk - playerDef,
            critchance: SimHelpers.calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name,
            bonuses: opponentBonuses
        }

        return {player, opponent}
    }

    display (result) {
        const {GT} = window
        const {points: calc, win, scoreClass} = result
        let probabilityTooltip = '<table class=\'probabilityTable\'>'
        let expectedValue = 0
        const pointGrade=['#fff','#fff','#fff','#ff2f2f','#fe3c25','#fb4719','#f95107','#f65b00','#f26400','#ed6c00','#e97400','#e37c00','#de8400','#d88b00','#d19100','#ca9800','#c39e00','#bba400','#b3aa00','#aab000','#a1b500','#97ba00','#8cbf00','#81c400','#74c900','#66cd00']
        for (let i=25; i>=3; i--) {
            if (calc[i]) {
                const isW = i>=15
                probabilityTooltip += `<tr style='color:${isW?pointGrade[25]:pointGrade[3]};' data-tint='${isW?'w':'l'}'><td>${i}</td><td>${(100*calc[i]).toFixed(2)}%</td></tr>`
                expectedValue += i*calc[i]
            }
        }
        probabilityTooltip += `<tr class='${scoreClass}'><td>${GT.design.leagues_won_letter}</td><td>${(100*win).toFixed(2)}%</td></tr>`
        probabilityTooltip += '</table>'

        $('.matchRating').remove()

        const $rating = $(`<div class="matchRating" style="color:${pointGrade[Math.round(expectedValue)]};" generic-tooltip="${probabilityTooltip}">E[X]:<br/>${I18n.nRounding(expectedValue, this.highPrecisionMode ? 2: 1, 0)}</div>`)
        $('#leagues_right .average-lvl').wrap('<div class="gridWrapper"></div>').after($rating)
        $('.lead_table_default > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) .level').append($rating)
    }
}

export default League
