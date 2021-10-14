import Helpers from '../../common/Helpers'
const gameConfigs = {
    HH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes',
        flower: 'flower'
    },
    GH: {
        girl: 'guy',
        Girl: 'Guy',
        haremettes: 'harem guys',
        flower: 'lollipop'
    },
    CxH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes',
        flower: 'jewel'
    }
}
const gameConfig = gameConfigs[Helpers.getGameKey()]

export const config = {
    refresh: 'Home screen refresh',
    villain: 'Fight a villain menu',
    villain_tiers: `Show tiers with ${gameConfig.girl}s`,
    xpMoney : 'Better XP / Money',
    market: 'Market information',
    marketGirlsFilter: `${gameConfig.Girl}s filter at the market`,
    marketEquipsFilter: 'Equips filter at the market',
    marketXPAff: 'XP and affection at the market',
    sortArmorItems: 'Button to sort armor items by rarity',
    hideSellButton: 'Button to hide "Sell" button',
    harem: 'Harem information',
    league: 'League information',
    leagueBoard: 'Show the league tops',
    leaguePromo: 'Show promotion information',
    simFight : 'League / Season / Villains sim',
    logSimFight : 'Detailed logging in the browser console',
    teamsFilter: 'Teams filter',
    champions: 'Champions information',
    links: 'Shortcuts/Timers',
    seasonStats: 'Season stats',
    pachinkoNames: 'Show names in Pachinko',
    contestSummary: 'Saved Contests rewards summary',
    battleEndstate: 'Show final values when skipping battle',
}
export const stConfig = {
    missionsBackground: 'Change missions background',
    collectMoneyAnimation: 'Delete the collect money animation',
}

export const villain = {
    darklord: 'Dark Lord',
    ninjaspy: 'Ninja Spy',
    gruntt: 'Gruntt',
    edwarda: 'Edwarda',
    donatien: 'Donatien',
    silvanus: 'Silvanus',
    bremen: 'Bremen',
    finalmecia: 'Finalmecia',
    rokosensei: 'Roko Senseï',
    karole: 'Karole',
    jacksoncrew: 'Jackson&#8217;s Crew',
    pandorawitch: 'Pandora Witch',
    nike: 'Nike',
    sake: 'Sake',
    edward: 'Edward',
    edernas: 'Edernas',
    maro: 'Maro',
    bodyhack: 'BodyHack',
    greygolem: 'Grey Golem',
    nymph: 'The Nymph',
    fallback: 'World {{world}} villain'
}

export const xpMoney = {
    xp: 'Next: {{xp}} XP'
}

export const market = {
    pointsUnbought: 'Stat points buyable to max',
    moneyUnspent: 'Money required to max',
    moneySpent: 'Money spent in market',
    pointsLevel: 'Level-based stat points',
    pointsBought: 'Market-bought stat points',
    pointsEquip: 'Equipments stat points',
    pointsBooster: 'Boosters stat points',
    pointsClub: 'Club bonus stat points',
    boosterItem: 'boosters',
    xpItem: 'books',
    xpCurrency: 'XP',
    affItem: 'gifts',
    affCurrency: 'affection',
    equips: 'equips',
    youOwn: 'You own <b>{{count}}</b> {{type}}.',
    youCanSell: 'You can sell everything for <b>{{cost}}</b> <span class="hudSC_mix_icn"></span>.',
    youCanGive: 'You can give a total of <b>{{value}}</b> {{currency}}.'
}

export const marketGirlsFilter = {
    all: 'All',
    searchedName: 'Search',
    girlName: 'Girl name',
    searchedClass: 'Class',
    searchedRarity: 'Rarity',
    levelRange: 'Level range',
    searchedAffCategory: 'Affection category',
    searchedAffLevel: 'Affection level',
    grade0: '0 stars',
    grade1: '1 star',
    grade2: '2 stars',
    grade3: '3 stars',
    grade4: '4 stars',
    grade5: '5 stars',
    grade6: '6 stars',
    team: 'Team',
    visitTeams: 'Visit <a href="../teams.html">Teams</a> first.'
}

export const seasonStats = {
    fights: 'Fights',
    victories: 'Victories',
    defeats: 'Defeats',
    mojoWon: 'Won mojo',
    mojoLost: 'Lost mojo',
    mojoWonAvg: 'Won mojo average',
    mojoLostAvg: 'Lost mojo average',
    mojoAvg: 'Total mojo average',
}

export const pachinkoNames = {
    availableGirls: `Available ${gameConfig.girl}s: `
}

export const contestSummary = {
    totalRewards: 'Total Saved Rewards ({{contests}} Contests):',
    contestsWarning: 'Contests expire after 21 days!'
}
