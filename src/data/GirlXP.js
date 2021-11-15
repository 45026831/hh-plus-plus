/* global HH_MAX_LEVEL */
const STARTING = 1
const COMMON = 1
const RARE = 1.2
const EPIC = 1.4
const LEGENDARY = 1.6
const MYTHIC = 4

const buildCumulativeXPForRarity = (multiplier) => Array((window.GIRL_MAX_LEVEL || HH_MAX_LEVEL) - 1).fill().map((_,i) => Math.ceil(10*multiplier*(Math.pow(1.0075,i)))).reduce((a,x,i) => {a.push(x + (i===0?0:a[a.length-1]));return a}, [])

export const starting = buildCumulativeXPForRarity(STARTING)
export const common = buildCumulativeXPForRarity(COMMON)
export const rare = buildCumulativeXPForRarity(RARE)
export const epic = buildCumulativeXPForRarity(EPIC)
export const legendary = buildCumulativeXPForRarity(LEGENDARY)
export const mythic = buildCumulativeXPForRarity(MYTHIC)
