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
    collectMoneyAnimation: 'Delete the collect money animation',
    contestSummary: 'Saved Contests rewards summary',
    battleEndstate: 'Show final values when skipping battle',
}
export const stConfig = {
    missionsBackground: 'Change missions background',
    blessingsButtonAlign:'Align blessings button',
    bonusFlowersOverflow:`Prevent bonus ${gameConfig.flower}s dropping off-screen`,
    champGirlPower:`Fix Champion ${gameConfig.girl} power overflow`,
    champGirlOverlap:`Fix Champion ${gameConfig.girl} overlapping ${gameConfig.girl} selection`,
    clubTableShadow:'Remove club table shadow',
    compactNav:'Use compact main menu',
    eventGirlBorders:`Green borders on obtained event ${gameConfig.girl}s`,
    eventGirlTicks:`Improved event ${gameConfig.girl} ticks`,
    hideGameLinks:'Hide game links',
    leagueTableCompressed:'Compact league table',
    leagueTableRowStripes:'Striped league table rows',
    leagueTableShadow:'Remove league table shadow',
    moveSkipButton:'Move the battle skip button down',
    newButtons:'Replace remaining old-style buttons',
    poaThousands:'Add thousands seperators for PoA tasks',
    poaTicks:'Fix tick positions on PoA screen',
    poaBorders:'Green borders on obtained PoA rewards',
    poaGirlFade:`Fix ${gameConfig.girl} pose fade on PoA`,
    popButtons:'Hide Auto-assign and Auto-claim PoP buttons',
    poseAspectRatio:`Fix ${gameConfig.girl} pose aspect ratio in battle`,
    removeParticleEffects:'Remove home screen particle effects',
    scriptSocials:'Adjust position of socials to not overlap with HH++ bars',
    scriptTimerBars:'Script timer bars',
    seasonsButton:'Fix border on Seasons button',
    shrinkBundles:'Shrink bundles',
    sidequestCompletionMarkers:'Sidequest completion markers',
    contestNotifs:'Move contest notifications',
    contentPointsWidth:'Prevent contest table points overflow',
    leagueChangeTeamButton:'Fix positioning of left block buttons in league',
    compactPops:'Compact PoPs',
    monthlyCardText:'Fix monthly card text',
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
