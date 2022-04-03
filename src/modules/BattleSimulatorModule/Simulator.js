class Simulator {
    constructor({player, opponent, logging, preSim}) {
        this.player = player
        this.opponent = opponent
        this.logging = logging
        this.preSim = preSim
    }

    run () {
        const setup = x => {
            x.critMultiplier = 2 + x.bonuses.critDamage
            x.dmg = Math.max(0, x.dmg)
            x.baseAttack = {
                probability: 1 - x.critchance,
                damageAmount: Math.ceil(x.dmg),
                healAmount: Math.ceil(x.dmg * x.bonuses.healOnHit)
            }
            x.critAttack = {
                probability: x.critchance,
                damageAmount: Math.ceil(x.dmg * x.critMultiplier),
                healAmount: Math.ceil(x.dmg * x.critMultiplier * x.bonuses.healOnHit)
            }
            x.hp = Math.ceil(x.hp)
        }

        setup(this.player)
        setup(this.opponent)

        this.cache = {}
        this.runs = 0

        let ret
        try {
            // start simulation from player's turn
            ret = this.playerTurn(this.player.hp, this.opponent.hp, 0)
        } catch (error) {
            if (this.logging) console.log(`An error occurred during the simulation against ${this.opponent.name}`)
            return {
                points: [],
                win: Number.NaN,
                loss: Number.NaN,
                avgTurns: Number.NaN,
                scoreClass: 'minus'
            }
        }

        const sum = ret.win + ret.loss
        ret.win /= sum
        ret.loss /= sum
        ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close'

        if (this.logging) {console.log(`Ran ${this.runs} simulations against ${this.opponent.name}, won ${ret.win * 100}% of simulated fights, average turns: ${ret.avgTurns}`)}

        if (this.preSim) {
            if (ret.win <= 0) ret.impossible = true
            if (ret.loss <= 0) ret.guaranteed = true
        }

        return ret
    }

    mergeResult(x, xProbability, y, yProbability) {
        const points = {}
        Object.entries(x.points).map(([point, probability]) => [point, probability * xProbability])
            .concat(Object.entries(y.points).map(([point, probability]) => [point, probability * yProbability]))
            .forEach(([point, probability]) => {
                points[point] = (points[point] || 0) + probability
            })
        const merge = (x, y) =>  x * xProbability + y * yProbability
        const win = merge(x.win, y.win)
        const loss = merge(x.loss, y.loss)
        const avgTurns = merge(x.avgTurns, y.avgTurns)
        return { points, win, loss, avgTurns }
    }

    playerTurn(playerHP, opponentHP, turns) {
        turns += 1
        // avoid a stack overflow
        const maxAllowedTurns = 50
        if (turns > maxAllowedTurns) throw new Error()

        // read cache
        const cachedResult = this.cache?.[playerHP]?.[opponentHP]
        if (cachedResult) return cachedResult

        // simulate base attack and critical attack
        const baseAtk = this.player.baseAttack
        const baseAtkResult = this.playerAttack(playerHP, opponentHP, baseAtk, turns)
        const critAtk = this.player.critAttack
        const critAtkResult = this.playerAttack(playerHP, opponentHP, critAtk, turns)
        // merge result
        const mergedResult = this.mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability)

        // count player's turn
        mergedResult.avgTurns += 1

        // write cache
        if (!this.cache[playerHP]) this.cache[playerHP] = {}
        if (!this.cache[playerHP][opponentHP]) this.cache[playerHP][opponentHP] = {}
        this.cache[playerHP][opponentHP] = mergedResult

        return mergedResult
    }

    playerAttack(playerHP, opponentHP, attack, turns) {
        // damage
        opponentHP -= attack.damageAmount

        // heal on hit
        playerHP += attack.healAmount
        playerHP = Math.min(playerHP, this.player.hp)

        // check win
        if (opponentHP <= 0) {
            const point = 15 + Math.ceil(10 * playerHP / this.player.hp)
            this.runs += 1
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 0 }
        }

        // next turn
        return this.opponentTurn(playerHP, opponentHP, turns)
    }

    opponentTurn(playerHP, opponentHP, turns) {
        // simulate base attack and critical attack
        const baseAtk = this.opponent.baseAttack
        const baseAtkResult = this.opponentAttack(playerHP, opponentHP, baseAtk, turns)
        const critAtk = this.opponent.critAttack
        const critAtkResult = this.opponentAttack(playerHP, opponentHP, critAtk, turns)
        // merge result
        return this.mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability)
    }

    opponentAttack(playerHP, opponentHP, attack, turns) {
        // damage
        playerHP -= attack.damageAmount

        // heal on hit
        opponentHP += attack.healAmount
        opponentHP = Math.min(opponentHP, this.opponent.hp)

        // check loss
        if (playerHP <= 0) {
            const point = 3 + Math.ceil(10 * (this.opponent.hp - opponentHP) / this.opponent.hp)
            this.runs += 1
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 0 }
        }

        // next turn
        return this.playerTurn(playerHP, opponentHP, turns)
    }
}

export default Simulator
window.HHPlusPlus.Simulator = Simulator
