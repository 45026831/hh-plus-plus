const STANDARD_SIM_RUNS = 10000
const HIGH_PRECISION_SIM_RUNS = 50000

class Simulator {
    constructor({player, opponent, highPrecisionMode, logging}) {
        this.player = player
        this.opponent = opponent
        this.simRuns = highPrecisionMode ? HIGH_PRECISION_SIM_RUNS : STANDARD_SIM_RUNS
        this.logging = logging
    }

    run () {
        const setup = x => {
            x.critMultiplier = 2 + x.bonuses.critDamage
            x.baseAttack = {
                probability: 1 - x.critchance,
                damageAmount: Math.max(0, Math.round(x.dmg)),
                healAmount: Math.round(x.dmg * x.bonuses.healOnHit)
            }
            x.critAttack = {
                probability: x.critchance,
                damageAmount: Math.max(0, Math.round(x.dmg * x.critMultiplier)),
                healAmount: Math.round(x.dmg * x.critMultiplier * x.bonuses.healOnHit)
            }
            x.hp = Math.round(x.hp)
        }

        setup(this.player)
        setup(this.opponent)

        this.cache = { }
        this.runs = 0

        // start simulation from player's turn
        let ret = this.playerTurn(this.player.hp, this.opponent.hp)

        let sum = ret.win + ret.loss
        ret.win /= sum
        ret.loss /= sum
        ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close'

        if (this.logging) {console.log(`Ran ${this.runs} simulations against ${this.opponent.name}, won ${ret.win * 100}% of simulated fights, average turns: ${ret.avgTurns}`)}

        return ret
    }

    mergeResult(x, xProbability, y, yProbability) {
        let points = { }
        for (let [point, probability] of Object.entries(x.points)) {
            points[point] = (points[point] ?? 0) + probability * xProbability
        }
        for (let [point, probability] of Object.entries(y.points)) {
            points[point] = (points[point] ?? 0) + probability * yProbability
        }
        const merge = (x, y) =>  x * xProbability + y * yProbability
        let win = merge(x.win, y.win)
        let loss = merge(x.loss, y.loss)
        let avgTurns = merge(x.avgTurns, y.avgTurns)
        return { points, win, loss, avgTurns }
    }

    playerTurn(playerHP, opponentHP) {
        // read cache
        let cachedResult = this.cache?.[playerHP]?.[opponentHP]
        if (cachedResult) return cachedResult

        // simulate base attack and critical attack
        let baseAtk = this.player.baseAttack;
        let baseAtkResult = this.playerAttack(playerHP, opponentHP, baseAtk)
        let critAtk = this.player.critAttack;
        let critAtkResult = this.playerAttack(playerHP, opponentHP, critAtk)
        // merge result
        let mergedResult = this.mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability)

        // count player's turn
        mergedResult.avgTurns++

        // write cache
        if (!this.cache[playerHP]) this.cache[playerHP] = { }
        if (!this.cache[playerHP][opponentHP]) this.cache[playerHP][opponentHP] = { }
        this.cache[playerHP][opponentHP] = mergedResult

        return mergedResult
    }

    playerAttack(playerHP, opponentHP, attack) {
        // damage
        opponentHP -= attack.damageAmount

        // heal on hit
        playerHP += attack.healAmount
        playerHP = Math.min(playerHP, this.player.hp)

        // check win
        if (opponentHP <= 0) {
            let point = 15 + Math.ceil(10 * playerHP / this.player.hp)
            this.runs++
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 1 }
        }

        // next turn
        return this.opponentTurn(playerHP, opponentHP)
    }

    opponentTurn(playerHP, opponentHP) {
        // simulate base attack and critical attack
        let baseAtk = this.opponent.baseAttack;
        let baseAtkResult = this.opponentAttack(playerHP, opponentHP, baseAtk)
        let critAtk = this.opponent.critAttack;
        let critAtkResult = this.opponentAttack(playerHP, opponentHP, critAtk)
        // merge result
        return this.mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability)
    }

    opponentAttack(playerHP, opponentHP, attack) {
        // damage
        playerHP -= attack.damageAmount

        // heal on hit
        opponentHP += attack.healAmount
        opponentHP = Math.min(opponentHP, this.opponent.hp)

        // check loss
        if (playerHP <= 0) {
            let point = 3 + Math.ceil(10 * (this.opponent.hp - opponentHP) / this.opponent.hp)
            this.runs++
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 1 }
        }

        // next turn
        return this.playerTurn(playerHP, opponentHP)
    }
}

export default Simulator
window.HHPlusPlus.Simulator = Simulator
