import Helpers from '../../common/Helpers'
const{isGH, isCxH} = Helpers
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
const gameConfig = isGH() ? gameConfigs.GH : isCxH() ? gameConfigs.CxH : gameConfigs.HH

export const config = {
    refresh: 'Home screen refresh',
    villain: 'Fight a villain menu',
    villain_tiers: `Show tiers with ${gameConfig.girl}s`,
    xpMoney : 'Better XP / Money',
    market: 'Market information',
    marketFilter: `${gameConfig.Girl}s filter at the market`,
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
