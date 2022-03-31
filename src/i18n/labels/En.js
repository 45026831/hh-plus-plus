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

export const common = {
    all: 'All',
}

export const config = {
    refresh: 'Home screen refresh',
    villain: 'Fight a villain menu',
    villain_tiers: `Show tiers with ${gameConfig.girl}s`,
    market: 'Market information',
    marketGirlsFilter: `${gameConfig.Girl}s filter at the market`,
    marketEquipsFilter: 'Equips filter at the market',
    marketXPAff: 'XP and affection at the market',
    marketHideSellButton: 'Toggleable "Sell" button',
    harem: 'Harem information',
    league: 'League information',
    league_board: 'Show the league tops',
    league_promo: 'Show promotion information',
    simFight : 'League / Season / Villains sim',
    simFight_logging : 'Detailed logging in the browser console',
    simFight_highPrecisionMode: 'High precision mode (warning: slow!)',
    teamsFilter: 'Teams filter',
    champions: 'Champions information',
    champions_fixPower: `Include Hero power in ${gameConfig.girl} power display`,
    homeScreen: 'Home Screen Shortcuts & Timers',
    resourceBars: 'Resource bars / Booster tracking',
    popSort: 'PoP sorting and quick navigation',
    seasonStats: 'Season stats',
    pachinkoNames: 'Show names in Pachinko',
    contestSummary: 'Saved Contests rewards summary',
    battleEndstate: 'Show final values when skipping battle',
    gemStock: 'Gem stock in Market/Harem',
    staticBackground: 'Prevent background switching during Orgy Days',
    rewardShards: `Display current shard counts on ${gameConfig.girl} rewards`,
    leaderboardFix: 'Fix Season and PoV leaderboards',
    hideClaimedRewards: 'Hide claimed Season/PoA/PoV rewards',
    disableDragDrop: 'Disable Drag-and-Drop in the Market',
    autoRefresh: 'Auto-refresh the game every 10 minutes',
    villainBreadcrumbs: 'Add breadcrumbs to villain pages',
    blessingSpreadsheetLink: 'Add link to the blessing data spreadsheet on the blessings popup',
    homeScreenIcons: 'Add feature icons to home screen links',
    homeScreenOrder: 'Alternative order of home screen links',
    homeScreenOldish: 'Legacy layout of home screen (Not compatible with right-side rearrange Style Tweak)',
}
export const stConfig = {
    missionsBackground: 'Change missions background',
    collectMoneyAnimation: 'Delete the collect money animation',
    mobileBattle: 'Fix Mobile battle screen',
    darkMobileLeague: 'Dark background on mobile league',
    hideRotateDevice: 'Hide the device rotation reminder on mobile',
    salaryTimers: `Readable ${gameConfig.girl} salary timers`,
    moveSkipButton: 'Move the battle skip button down',
    poseAspectRatio: `Fix ${gameConfig.girl} pose aspect ratio in battle`,
    reduceBlur: 'Reduce depth-of-field effect on home screen',
    homeScreenRightSideRearrange: 'Rearrange the items on the right side of the home screen',
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
    werebunnypolice: 'WereBunny Police',
    edward: 'Edward',
    edernas: 'Edernas',
    maro: 'Maro',
    bodyhack: 'BodyHack',
    greygolem: 'Grey Golem',
    nymph: 'The Nymph',
    athicus: 'Athicus Ho’ole',
    jockstrap: 'The Mimic',
    fallback: 'World {{world}} villain',
    event: 'Event',
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
    searchedName: 'Search',
    girlName: `${gameConfig.Girl} name`,
    searchedClass: 'Class',
    searchedElement: 'Element',
    searchedRarity: 'Rarity',
    levelRange: 'Level range',
    levelCap: 'Level cap',
    levelCap_capped: 'Capped',
    levelCap_uncapped: 'Uncapped',
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

export const marketXPAff = {
    xp: '↑ {{remainNext}} · ⤒ {{remainMax}}',
    aff: 'Next: {{remainNext}}'
}

export const marketHideSellButton = {
    hide: 'Hide "Sell" button'
}

export const harem = {
    marketRestocked: '> The <a href="../shop.html">Market</a> restocked since your last visit.',
    visitMarket: '> Visit the <a href="../shop.html">Market</a> first to see an inventory summary here',
    itemSummary: '{{count}} ({{value}} {{type}})',
    costSC: '{{cost}} <span cur="soft_currency"></span>',
    costHC: '{{cost}} <span cur="hard_currency"></span>',
    haremStats: 'Harem Stats',
    upgrades: 'Upgrades',
    levelsAwakening: 'Levels & Awakening',
    market: 'Inventory & Market',
    wikiPage: '{{name}}\'s wiki page',
    haremLevel: 'Harem level',
    unlockedScenes: 'Unlocked scenes',
    income: 'Income',
    or: '{{left}} or {{right}}',
    toUpgrade: 'To upgrade all:',
    toLevelCap: 'To level to cap:',
    toLevelMax: 'To level to max ({{max}}):',
    affectionScenes: 'Affection Scenes',
    buyable: 'Available in the market:',
    sellable: 'In inventory:',
    gifts: 'Gifts',
    books: 'Books',
    canBeSold: 'Can be sold for {{sc}}',
    canBeBought: '{{item}} for {{amount}}',
    marketRestock: 'Market restocks at {{time}} or at level {{level}}',
}

export const league = {
    stayInTop: 'To <em><u>stay in the top {{top}}</u></em>, you must have a minimum of <em>{{points}}</em> points',
    notInTop: 'To <em><u>be in the top {{top}}</u></em>, you must have a minimum of <em>{{points}}</em> points',
    challengesRegen: 'Natural regeneration: <em>{{challenges}}</em>',
    challengesLeft: 'Challenges left: <em>{{challenges}}</em>',
    averageScore: 'Average score per fight: <em>{{average}}</em>',
    scoreExpected: 'Score expected: <em>{{score}}</em>',
    toDemote: 'To <em><u>demote</u></em>, you must be passed by <em>{{players}}</em> players',
    willDemote: 'To <em><u>demote</u></em>, you can have a maximum of <em>{{points}}</em> points',
    willDemoteZero: 'To <em><u>demote</u></em>, you must remain at <em>0</em> points',
    toNotDemote: 'To <em><u>not demote</u></em>, you must have more than <em>0</em> points',
    toStay: 'To <em><u>not promote</u></em>, you must be passed by <em>{{players}}</em> players',
    willStay: 'To <em><u>not promote</u></em>, you can have a maximum of <em>{{points}}</em> points',
    hideFoughtOpponents: 'Hide fought opponents',
    showFoughtOpponents: 'Show fought opponents',
    currentLeague: 'Current league',
    victories: 'Victories',
    defeats: 'Defeats',
    unknown: 'Unknown',
    notPlayed: 'Not played',
    levelRange: 'Level range',
    leagueFinished: 'League finished on {{date}}',
    opponents: 'Opponents',
    leaguePoints: 'Points',
    avg: 'Average',
}

export const simFight = {
    guaranteed: 'Guaranteed',
    impossible: 'Impossible',
}

export const teamsFilter = {
    searchedName: 'Search',
    girlName: `${gameConfig.Girl} name`,
    searchedClass: 'Class',
    searchedElement: 'Element',
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
    searchedBlessedAttributes: 'Blessings',
    blessedAttributes: `Blessed ${gameConfig.girl}s`,
    nonBlessedAttributes: `Non-blessed ${gameConfig.girl}s`,
}

export const champions = {
    participants: 'Participants: {{participants}}/{{members}}',
    clubChampDuration: '{{duration}} since round start',
}

export const resourceBars = {
    popsIn: 'PoPs in {{time}}',
    popsReady: 'PoPs ready',
    readyAt: 'Ready at {{time}}',
    endAt: 'Ends at {{time}}',
    fullAt: 'Full at {{time}}',
    xp: 'Next: {{xp}} XP',
}

export const homeScreen = {
    clubChamp: 'Club Champion',
    completeIn: 'Complete in ',
    newMissionsIn: 'New missions in ',
    missionsReady: 'Missions ready',
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

export const villainBreadcrumbs = {
    town: 'Town',
    adventure: 'Adventure',
    begincity: 'Begin City',
    gemskingdom: 'Gems Kingdom',
    ninjavillage: 'Ninja Village',
    invadedkingdom: 'Invaded Kingdom',
    juysea: 'The Juy Sea',
    admittance: 'Admittance of the dead',
    magicforest: 'Magic Forest',
    hamelintown: 'Hamelin Town',
    plainofrituals: 'Plain of rituals',
    heroesuniversity: 'Heroes University',
    ninjasacredlands: 'Ninja sacred lands',
    splatters: 'Splatters Archipelago',
    digisekai: 'Digisekai',
    stairway: 'Stairway to heaven',
    training: 'Training Dimension',
    weresquidisland: 'WereSquid Island',
    begincitycxh: 'Begin City',
    heroacademy: 'Hero Academy',
    newcenabum: 'New Cenabum',
    ontheprowl: 'On the Prowl',
    bushexplorations: 'Bush Explorations',
    thespy: 'The Spy Who Came Inside Me',
}

export const blessingSpreadsheetLink = {
    name: `Open ${Helpers.isGH() ? 'Bella' : 'zoopokemon'}'s blessing data spreadsheet`
}
