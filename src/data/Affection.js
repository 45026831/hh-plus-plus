class AffStage {
    constructor ({aff, sc, hc}) {
        this.aff = aff
        this.sc = sc
        this.hc = hc
    }
}

class AffRarity {
    constructor (steps) {
        this.steps = steps
        this.totalAffCache = {}
        this.totalSCCache = {}
        this.totalHCCache = {}
    }

    totalAff(stage) {
        if (stage > this.steps.length) {
            throw new Error(`bad data for stage ${stage}`)
        }
        if (!this.totalAffCache[stage]) {
            this.totalAffCache[stage] = this.steps.slice(0,stage).reduce((sum, step) => sum + step.aff, 0)
        }
        return this.totalAffCache[stage]
    }

    totalSC(stage) {
        if (stage > this.steps.length) {
            throw new Error(`bad data for stage ${stage}`)
        }
        if (!this.totalSCCache[stage]) {
            this.totalSCCache[stage] = this.steps.slice(0,stage).reduce((sum, step) => sum + step.sc, 0)
        }
        return this.totalSCCache[stage]
    }

    totalHC(stage) {
        if (stage > this.steps.length) {
            throw new Error(`bad data for stage ${stage}`)
        }
        if (!this.totalHCCache[stage]) {
            this.totalHCCache[stage] = this.steps.slice(0,stage).reduce((sum, step) => sum + step.hc, 0)
        }
        return this.totalHCCache[stage]
    }
}

export default {
    starting: new AffRarity([
        new AffStage({aff:  90,  sc:  36000, hc:  36}),
        new AffStage({aff:  225, sc:  90000, hc:  60}),
        new AffStage({aff:  563, sc: 225000, hc: 114}),
        new AffStage({aff: 1125, sc: 450000, hc: 180}),
        new AffStage({aff: 2250, sc: 900000, hc: 300}),
    ]),
    common: new AffRarity([
        new AffStage({aff:  180, sc:   72000, hc:  72}),
        new AffStage({aff:  450, sc:  180000, hc: 120}),
        new AffStage({aff: 1125, sc:  450000, hc: 228}),
        new AffStage({aff: 2250, sc:  900000, hc: 360}),
        new AffStage({aff: 4500, sc: 1800000, hc: 600}),
    ]),
    rare: new AffRarity([
        new AffStage({aff:   540, sc:  216000, hc:  216}),
        new AffStage({aff:  1350, sc:  540000, hc:  360}),
        new AffStage({aff:  3375, sc: 1350000, hc:  678}),
        new AffStage({aff:  6750, sc: 2700000, hc: 1080}),
        new AffStage({aff: 13500, sc: 5400000, hc: 1800}),
    ]),
    epic: new AffRarity([
        new AffStage({aff:  1260, sc:   504000, hc:  504}),
        new AffStage({aff:  3150, sc:  1260000, hc:  840}),
        new AffStage({aff:  7875, sc:  3150000, hc: 1578}),
        new AffStage({aff: 15750, sc:  6300000, hc: 2520}),
        new AffStage({aff: 31500, sc: 12600000, hc: 4200}),
    ]),
    legendary: new AffRarity([
        new AffStage({aff:  1800, sc:   720000, hc:  720}),
        new AffStage({aff:  4500, sc:  1800000, hc: 1200}),
        new AffStage({aff: 11250, sc:  4500000, hc: 2250}),
        new AffStage({aff: 22500, sc:  9000000, hc: 3600}),
        new AffStage({aff: 45000, sc: 18000000, hc: 6000}),
    ]),
    mythic: new AffRarity([
        new AffStage({aff:   4500, sc:  1800000, hc:  1800}),
        new AffStage({aff:  11250, sc:  4500000, hc:  3000}),
        new AffStage({aff:  28125, sc: 11250000, hc:  5628}),
        new AffStage({aff:  56250, sc: 22500000, hc:  9000}),
        new AffStage({aff: 112500, sc: 45000000, hc: 15000}),
        new AffStage({aff: 225000, sc: 90000000, hc: 18000}),
    ])
}
