export const calculateStatPrice = (points) => {
    let cost = 0
    if (points < 2000) {
        cost = 5 + points * 2
    }
    else if (points < 4000) {
        cost = 4005 + (points - 2000) * 4
    }
    else if (points < 6000) {
        cost = 12005 + (points - 4000) * 6
    }
    else if (points < 8000) {
        cost = 24005 + (points - 6000) * 8
    }
    else if (points < 10000) {
        cost = 40005 + (points - 8000) * 10
    }
    else if (points < 12000) {
        cost = 60005 + (points - 10000) * 12
    }
    else if (points < 14000) {
        cost = 84005 + (points - 12000) * 14
    }
    else if (points < 16000) {
        cost = 112005 + (points - 14000) * 16
    }
    return cost
}
export const calculateTotalPrice = (points) => {
    let last_price = calculateStatPrice(points)
    let price = 0
    if (points < 2000) {
        price = (7 + last_price) / 2 * points
    }
    else if (points < 4000) {
        price = 4012000 + (4009 + last_price) / 2 * (points - 2000)
    }
    else if (points < 6000) {
        price = 20026000 + (12011 + last_price) / 2 * (points - 4000)
    }
    else if (points < 8000) {
        price = 56042000 + (24013 + last_price) / 2 * (points - 6000)
    }
    else if (points < 10000) {
        price = 120060000 + (40015 + last_price) / 2 * (points - 8000)
    }
    else if (points < 12000) {
        price = 220080000 + (60017 + last_price) / 2 * (points - 10000)
    }
    else if (points < 14000) {
        price = 364102000 + (84019 + last_price) / 2 * (points - 12000)
    }
    else if (points < 16000) {
        price = 560126000 + (112021 + last_price) / 2 * (points - 14000)
    }
    return price
}
export const POINTS_PER_LEVEL = 30
export const TYPES = {
    xp: 'potion',
    aff: 'gift',
    booster: 'booster'
}
export const NEW_TYPES = {
    xp: 'books',
    aff: 'gifts',
    booster: 'boosters'
}
export const BUYABLE = ['xp', 'aff']
export const SELLABLE = ['xp', 'aff', 'booster']
