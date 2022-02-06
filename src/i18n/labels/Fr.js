export const common = {
    all: 'Toutes',
}

export const config = {
    refresh: 'Rafraîchir page d\'accueil',
    villain: 'Menu des combats des trolls',
    villain_tiers: 'Montrer les paliers/filles', // TODO GH 'Montrer les paliers/mecs'
    xpMoney : 'XP / Argent + précis',
    market: 'Infos marché',
    marketGirlsFilter: 'Filtre des filles au marché', // TODO GH 'Filtre des mecs au marché'
    marketEquipsFilter: 'Filtre d\'équipements au marché', // TODO
    marketXPAff: 'XP et affection au marché',
    marketHideSellButton: 'Bouton de vente activable', // TODO
    harem: 'Infos harem',
    league: 'Infos ligue',
    league_board: 'Montrer les tops ligue',
    league_promo: 'Montrer les informations sur la promotion',
    simFight: 'Simu ligue / saison / combats de troll',
    simFight_logging : 'Détails dans la console du navigateur',
    simFight_highPrecisionMode: 'Mode haute précision (attention: lent!)', // TODO
    teamsFilter: 'Filtre d\'équipes',
    champions: 'Infos champions',
    homeScreen: 'Raccourcis & timers de l\'écran principal', // TODO
    resourceBars: 'Barres de ressorces / Indicateurs de boosters', // TODO
    popSort: 'Tri LdP et navigation rapide', // TODO
    seasonStats: 'Stats de la saison',
    pachinkoNames: 'Montrer les noms au Pachinko',
    contestSummary: 'Récap\' des récompenses des Compètes enregistrées',
    battleEndstate: 'Afficher le détail quand tu passes le combat', //FIXED A TYPO
    gemStock: 'Stock de gemmes au marché/harem', // TODO
    staticBackground: 'Empêche les changements de décor durant les Jours d\'Orgie', // TODO
    rewardShards: 'Affiche le nombre de Fragments d\'Affection actuels sur les ${gameConfig.girl} en récompense', // TODO
    leaderboardFix: 'Corrige les classements de Saisons et Voie de la Valeur', // TODO
}
export const stConfig = {
    missionsBackground: 'Change l\'arrière-plan des missions',
    collectMoneyAnimation: 'Désactive l\'animation de récolte d\'argent',
    mobileBattle: 'Corrige l\'écran de bataille sur mobile', // TODO
    darkMobileLeague: 'Fond sombre en Ligue sur mobile', // TODO
    hideRotateDevice: 'Masque le message de rotation de l\'écran sur mobile', // TODO
    salaryTimers: 'Timers de salaires de ${gameConfig.girl} lisibles', // TODO
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
    girlName: 'Nom de la fille', // TODO GH 'Nom du mec'
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
    aff: 'Suiv.: {{remainNext}}', // TODO
}

export const marketHideSellButton = {
    hide: 'Masquer bouton "Vendre"', // TODO
}

export const harem = {
    marketRestocked: '> Le <a href="../shop.html">Marché</a> s\'est rempli depuis votre dernière visite.', // TODO
    visitMarket: '> Visitez d\'abord le <a href="../shop.html">Marché</a> pour pouvoir afficher un résumé de votre inventaire ici', // TODO
    haremStats: 'Stats du harem', // TODO
    upgrades: 'Améliorations', // TODO
    levelsAwakening: 'Niveaux & Eveil', // TODO
    market: 'Inventaire & Marché', // TODO
    wikiPage: 'Page wiki de {{name}}',
    haremLevel: 'Niveau de harem',
    unlockedScenes: 'Scènes déverrouillées', // TODO
    income: 'Revenus',
    or: '{{left}} ou {{right}}',
    toUpgrade: 'Pour tout améliorer', // TODO
    toLevelCap: 'Pour limite de niveau', // TODO
    toLevelMax: 'Pour niveau max ({{max}}):', // TODO
    affectionScenes: 'Scènes d\'affection', // TODO
    buyable: 'Dispo au marché', // TODO
    sellable: 'Dans l\'inventaire', // TODO
    gifts: 'Cadeaux',
    books: 'Livres',
    canBeSold: 'Vendable pour {{sc}}', // TODO
    canBeBought: '{{item}} pour {{amount}}',
    marketRestock: 'Marché rempli à {{time}} ou au niv. {{level}}', // TODO
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
    hideFoughtOpponents: 'Masquer adversaires combattus', // TODO
    showFoughtOpponents: 'Montrer adversaires combattus', // TODO
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
    girlName: 'Nom de la fille', // TODO GH 'Nom du mec'
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
    blessedAttributes: 'Filles bénies', // TODO GH 'Mecs bénis'
    nonBlessedAttributes: 'Filles non bénies', // TODO GH 'Mecs non bénis'
}

export const champions = {
    participants: 'Participants: {{participants}}/{{members}}', // TODO
    clubChampDuration: '{{duration}} depuis le début du tour',
}

export const resourceBars = {
    popsIn: 'LdP dans {{time}}', // TODO
    popsReady: 'LdP dispo', // TODO
    readyAt: 'Ready at {{time}}', // TODO
    endAt: 'Fin à {{time}}', // TODO
    fullAt: 'Rempli à {{time}}', // TODO
}

export const homeScreen = {
    clubChamp: 'Le Champion de Club',
    completeIn: 'Terminé dans ', // TODO
    newMissionsIn: 'Nouv. missions dans ', // TODO
    missionsReady: 'Missions disponibles', // TODO
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
    availableGirls: 'Filles disponibles: ', // TODO GH 'Mecs disponibles'
}

export const contestSummary = {
    totalRewards: 'Total des récompenses enregistrées ({{contests}} Compètes) :',
    contestsWarning: 'Les Compètes expirent après 21 jours !',
}
