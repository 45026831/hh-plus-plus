import Helpers from '../../common/Helpers'
const{isGH, isCxH} = Helpers
const gameConfigs = {
    HH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes'
    },
    GH: {
        girl: 'guy',
        Girl: 'Guy',
        haremettes: 'harem guys'
    },
    CxH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes'
    }
}
const gameConfig = isGH() ? gameConfigs.GH : isCxH() ? gameConfigs.CxH : gameConfigs.HH

export const config = {
    refresh: 'Home screen refresh',
    villain: 'Fight a villain menu',
    tiers: `Show tiers with ${gameConfig.girl}s`,
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
    missionsBackground: 'Change missions background',
    collectMoneyAnimation: 'Delete the collect money animation',
    oldPoAWindow: 'Old PoA window',
    contestSummary: 'Saved Contests rewards summary',
    battleEndstate: 'Show final values when skipping battle',
}
