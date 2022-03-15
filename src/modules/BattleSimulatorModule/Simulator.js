const STANDARD_SIM_RUNS = 10000
const HIGH_PRECISION_SIM_RUNS = 50000

class Simulator {
    constructor({player, opponent, highPrecisionMode, logging, preSim}) {
        this.player = player
        this.opponent = opponent
        this.simRuns = highPrecisionMode ? HIGH_PRECISION_SIM_RUNS : STANDARD_SIM_RUNS
        this.logging = logging
        this.preSim = preSim
    }

    async run () {
        const ret = {
            points: {},
            win: 0,
            loss: 0,
            avgTurns: 0,
            scoreClass: ''
        }

        this.player.critMultiplier = 2 + this.player.bonuses.critDamage
        this.opponent.critMultiplier = 2 + this.opponent.bonuses.critDamage

        if (this.preSim) {
            const impossibilityCheck = await this.simulateBattle({...this.player, critchance: 1}, {...this.opponent, critchance: 0})
            if (impossibilityCheck.points < 15) {
                ret.loss = 1
                ret.scoreClass = 'minus'
                ret.impossible = true
                return ret
            }
            const guaranteeCheck = await this.simulateBattle({...this.player, critchance: 0}, {...this.opponent, critchance: 1})
            if (guaranteeCheck.points >= 15) {
                ret.win = 1
                ret.scoreClass = 'plus'
                ret.guaranteed = true
                return ret
            }
        }

        let runs = 0
        let wins = 0
        let losses = 0
        const pointsCollector = {}
        let totalTurns = 0

        const simulations = Array(this.simRuns).fill(null).map(async () => {
            return await this.simulateBattle({...this.player}, {...this.opponent})
        })

        const results = await Promise.all(simulations)
        results.forEach(({points, turns}) => {
            pointsCollector[points] = (pointsCollector[points] || 0) + 1
            if (points >= 15) {
                wins++
            } else {
                losses++
            }

            totalTurns += turns
            runs++
        })

        ret.points = Object.entries(pointsCollector).map(([points, occurrences]) => ({[points]: occurrences/runs})).reduce((a,b)=>Object.assign(a,b), {})

        ret.win = wins/runs
        ret.loss = losses/runs
        ret.avgTurns = totalTurns/runs
        ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close'

        if (this.logging) {console.log(`Ran ${runs} simulations against ${this.opponent.name}, won ${ret.win * 100}% of simulated fights, average turns: ${ret.avgTurns}`)}

        return ret
    }

    async simulateBattle (player, opponent) {
        let points

        const playerStartHP = player.hp
        const opponentStartHP = opponent.hp

        let turns = 0
        const maxAllowedTurns = 50

        while (turns < maxAllowedTurns) {
            turns++
            //your turn
            let damageAmount = player.dmg
            if (Math.random() < player.critchance) {
                damageAmount = player.dmg * player.critMultiplier
            }
            let healAmount = Math.min(playerStartHP - player.hp, damageAmount * player.bonuses.healOnHit)
            opponent.hp -= damageAmount
            player.hp += healAmount

            //check win
            if(opponent.hp<=0){
                //count score
                points = 15+Math.ceil(player.hp/playerStartHP * 10)
                break
            }

            //opp's turn
            damageAmount = opponent.dmg
            if (Math.random() < opponent.critchance) {
                damageAmount = opponent.dmg * opponent.critMultiplier
            }
            healAmount = Math.min(opponentStartHP - opponent.hp, damageAmount * opponent.bonuses.healOnHit)
            player.hp -= damageAmount
            opponent.hp += healAmount

            //check loss
            if(player.hp<=0){
                //count score
                points = 3+Math.ceil((opponentStartHP - opponent.hp)/opponentStartHP * 10)
                break
            }
        }

        return {points, turns}
    }
}

export default Simulator
window.HHPlusPlus.Simulator = Simulator
