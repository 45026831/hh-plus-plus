export const common = {
    all: 'Toutes',
}

export const config = {
    refresh: 'Rafraîchir page d\'accueil',
    villain: 'Menu des combats des trolls',
    villain_tiers: 'Montrer les paliers/filles', // TODO GH
    xpMoney : 'XP / Argent + précis',
    market: 'Infos marché',
    marketGirlsFilter: 'Filtre des filles au marché', // TODO GH
    marketEquipsFilter: false, // TODO
    marketXPAff: 'XP et affection au marché',
    marketHideSellButton: false, // TODO
    harem: 'Infos harem',
    league: 'Infos ligue',
    league_board: 'Montrer les tops ligue',
    league_promo: 'Montrer les informations sur la promotion',
    simFight: 'Simu ligue / saison / combats de troll',
    simFight_logging : 'Détails dans la console du navigateur',
    simFight_highPrecisionMode: false, // TODO
    teamsFilter: 'Filtre d\'équipes',
    champions: 'Infos champions',
    homeScreen: false, // TODO
    resourceBars: false, // TODO
    popSort: false, // TODO
    seasonStats: 'Stats de la saison',
    pachinkoNames: 'Montrer les noms au Pachinko',
    contestSummary: 'Récap\' des récompenses des Compètes enregistrées',
    battleEndstate: 'Afficher le détail quand tu passe le combat',
    gemStock: false, // TODO
    staticBackground: false, // TODO
    rewardShards: false, // TODO
    leaderboardFix: false, // TODO
}
export const stConfig = {
    missionsBackground: 'Change l\'arrière-plan des missions',
    collectMoneyAnimation: 'Désactive l\'animation de récolte d\'argent',
    mobileBattle: false, // TODO
    darkMobileLeague: false, // TODO
    hideRotateDevice: false, // TODO
    salaryTimers: false, // TODO
}

export const villain = {
    ninjaspy: 'Espion Ninja',
    jacksoncrew: 'Éq. de Jackson',
    pandorawitch: 'Sorcière Pandora',
    werebunnypolice: 'Police des Lapines-Garous',
    fallback: 'Monde {{world}} troll',
}

export const market = {
    pointsUnbought: 'Nombre de points requis pour max',
    moneyUnspent: 'Argent demandé pour max',
    moneySpent: 'Argent dépensé dans le marché',
    pointsLevel: 'Points donnés par ton niveau',
    pointsBought: 'Points achetés au marché',
    pointsEquip: 'Points donnés par ton équipement',
    pointsBooster: 'Points donnés par tes boosters',
    pointsClub: 'Points donnés par ton club',
    boosterItem: 'boosters',
    xpItem: 'livres',
    xpCurrency: 'XP',
    affItem: 'cadeaux',
    affCurrency: 'affection',
    equips: 'équipements',
    youOwn: 'Tu possèdes <b>{{count}}</b> {{type}}.',
    youCanSell: 'Tu peux tout vendre pour <b>{{cost}}</b> <span class="hudSC_mix_icn"></span>.',
    youCanGive: 'Tu peux donner un total de <b>{{value}}</b> {{currency}}.',
}

export const marketGirlsFilter = {
    searchedName: 'Nom ',
    girlName: 'Nom de la fille', // TODO GH
    searchedClass: 'Classe',
    searchedElement: 'Élément',
    searchedRarity: 'Rareté',
    levelRange: 'Intervalle de niveaux',
    searchedAffCategory: 'Catégorie d\'affection',
    searchedAffLevel: 'Niveau d\'affection',
    grade0: '0 étoile',
    grade1: '1 étoile',
    grade2: '2 étoiles',
    grade3: '3 étoiles',
    grade4: '4 étoiles',
    grade5: '5 étoiles',
    grade6: '6 étoiles',
    team: 'Équipe',
    visitTeams: 'Visiter d\'abord <a href="../teams.html">l\'équipe</a>.',
}

export const marketXPAff = {
    aff: false, // TODO
}

export const marketHideSellButton = {
    hide: false, // TODO
}

export const harem = {
    marketRestocked: false, // TODO
    visitMarket: false, // TODO
    haremStats: false, // TODO
    upgrades: false, // TODO
    levelsAwakening: false, // TODO
    market: false, // TODO
    wikiPage: 'Page wiki de {{name}}',
    haremLevel: 'Niveau de harem',
    unlockedScenes: false, // TODO
    income: 'Revenus',
    or: '{{left}} ou {{right}}',
    toUpgrade: false, // TODO
    toLevelCap: false, // TODO
    toLevelMax: false, // TODO
    affectionScenes: false, // TODO
    buyable: false, // TODO
    sellable: false, // TODO
    gifts: 'Cadeaux',
    books: 'Livres',
    canBeSold: false, // TODO
    canBeBought: '{{item}} pour {{amount}}',
    marketRestock: false, // TODO
}

export const league = {
    stayInTop: 'Pour <em><u>rester dans le top {{top}}</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
    notInTop: 'Pour <em><u>être dans le top {{top}}</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
    challengesRegen: 'Régénération naturelle: <em>{{challenges}}</em>',
    challengesLeft: 'Défis restants: <em>{{challenges}}</em>',
    averageScore: 'Average score per fight: <em>{{average}}</em>',
    scoreExpected: 'Score moyen par combat: <em>{{score}}</em>',
    toDemote: 'Pour <em><u>être rétrogradé</u></em>, vous devez être dépassé par <em>{{players}}</em> joueurs',
    willDemote: 'Pour <em><u>être rétrogradé</u></em>, vous pouvez avoir un maximum de <em>{{points}}</em> points',
    willDemoteZero: 'Pour <em><u>être rétrogradé</u></em>, vous devez rester avec <em>0</em> points',
    toNotDemote: 'Pour <em><u>ne pas être rétrogradé</u></em>, vous devez avoir plus de <em>0</em> points',
    toStay: 'Pour <em><u>ne pas être promu</u></em>, vous devez être dépassé par <em>{{players}}</em> joueurs',
    willStay: 'Pour <em><u>ne pas être promu</u></em>, vous pouvez avoir un maximum de <em>{{points}}</em> points',
    hideFoughtOpponents: false, // TODO
    showFoughtOpponents: false, // TODO
    currentLeague: 'Ligue actuelle',
    victories: 'Victoires',
    defeats: 'Defaites',
    unknown: 'Inconnus',
    notPlayed: 'Non joués',
    levelRange: 'Étendue de niveau',
    leagueFinished: 'Ligue terminée le {{date}}',
    opponents: 'Adversaires',
    leaguePoints: 'Points',
    avg: 'Moyenne',
}

export const teamsFilter = {
    searchedName: 'Nom',
    girlName: 'Nom de la fille', // TODO GH
    searchedClass: 'Classe',
    searchedElement: 'Élément',
    searchedRarity: 'Rareté',
    levelRange: 'Intervalle de niveaux',
    searchedAffCategory: 'Catégorie d\'affection',
    searchedAffLevel: 'Niveau d\'affection',
    grade0: '0 étoile',
    grade1: '1 étoile',
    grade2: '2 étoiles',
    grade3: '3 étoiles',
    grade4: '4 étoiles',
    grade5: '5 étoiles',
    grade6: '6 étoiles',
    searchedBlessedAttributes: 'Bénédictions',
    blessedAttributes: 'Filles bénies', // TODO GH
    nonBlessedAttributes: 'Filles non bénies', // TODO GH
}

export const champions = {
    participants: false, // TODO
    clubChampDuration: '{{duration}} depuis le début du tour',
}

export const resourceBars = {
    popsIn: false, // TODO
    popsReady: false, // TODO
    readyAt: false, // TODO
    endAt: false, // TODO
    fullAt: false, // TODO
}

export const homeScreen = {
    clubChamp: 'Le Champion de Club',
    completeIn: false, // TODO
    newMissionsIn: false, // TODO
    missionsReady: false, // TODO
}

export const seasonStats = {
    fights: 'Combats',
    victories: 'Victoires',
    defeats: 'Defaites',
    mojoWon: 'Mojo gagnés',
    mojoLost: 'Mojo perdus',
    mojoWonAvg: 'Moyenne mojo gagnés',
    mojoLostAvg: 'Moyenne mojo perdus',
    mojoAvg: 'Moyenne mojo globale',
}

export const pachinkoNames = {
    availableGirls: 'Filles disponibles: ', // TODO GH
}

export const contestSummary = {
    totalRewards: 'Total des récompenses enregistrées ({{contests}} Compètes) :',
    contestsWarning: 'Les Compètes expirent après 21 jours !',
}
