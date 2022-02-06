export const common = {
    all: 'Tutti',
}

export const config = {
    refresh: 'Refresh pagina Home',
    villain: 'Menù battaglia Troll',
    villain_tiers: 'Mostra battaglie con ragazze', // TODO GH
    xpMoney : 'Migliora XP / soldi',
    market: 'Informazioni negozio',
    marketGirlsFilter: 'Filtro per ragazze nel mercato', // TODO GH
    marketEquipsFilter: false, // TODO
    marketXPAff: 'XP e affetto nel mercato',
    marketHideSellButton: false, // TODO
    harem: 'Informazioni Harem',
    league: 'Informazioni sulle Leghe',
    league_board: 'Mostra i top della lega',
    league_promo: 'Mostra informazioni sulla promozione',
    simFight: 'Simulazione Leghe / Stagione / Troll',
    simFight_logging: 'Accesso dettagliato nella console del browser',
    simFight_highPrecisionMode: false, // TODO
    teamsFilter: 'Filtro delle squadre',
    champions: 'Informazioni sui Campioni',
    homeScreen: false, // TODO
    resourceBars: false, // TODO
    popSort: false, // TODO
    seasonStats: false, // TODO
    pachinkoNames: 'Mostra i nomi nel Pachinko',
    contestSummary: 'Riepilogo dei premi salvati dei contest',
    battleEndstate: 'Mostra i valori finali dopo aver saltato la battaglia',
}
export const stConfig = {
    missionsBackground: 'Cambiare lo sfondo delle missioni',
    collectMoneyAnimation: 'Disattivare l\'animazione di raccolta dei soldi',
    mobileBattle: false, // TODO
    darkMobileLeague: false, // TODO
    hideRotateDevice: false, // TODO
    salaryTimers: false, // TODO
}

export const villain = {
    darklord: 'Signore Oscuro',
    ninjaspy: 'Spia Ninja',
    jacksoncrew: 'Ciurma di Jackson',
    pandorawitch: 'Strega Pandora',
    werebunnypolice: 'Polizia del Conigli Mannari',
    fallback: 'Mundo {{world}} villano'
}

export const market = {
    pointsUnbought: 'Punti statistica necessari per il massimo',
    moneyUnspent: 'Soldi necessari per il massimo',
    moneySpent: 'Soldi spesi al negozio',
    pointsLevel: 'Punti acquisiti da aumento livello',
    pointsBought: 'Punti comprati al negozio',
    pointsEquip: 'Punti statistica da equipaggiamento',
    pointsBooster: 'Punti statistica dei potenziamenti',
    pointsClub: 'Punti statistica bonus del Club',
    boosterItem: 'potenziamenti',
    xpItem: 'libri',
    xpCurrency: 'XP',
    affItem: 'regali',
    affCurrency: 'affetto',
    equips: 'equipaggiamento',
    youOwn: 'Possiedi <b>{{count}}</b> {{type}}.',
    youCanSell: 'Puoi vendere tutto per <b>{{cost}}</b> <span class="hudSC_mix_icn"></span>.',
    youCanGive: 'Puoi dare un massimo di <b>{{value}}</b> {{currency}}.'
}

export const marketGirlsFilter = {
    searchedName: 'Nome',
    girlName: 'Nome della ragazza', // TODO GH
    searchedClass: 'Classe',
    searchedElement: 'Elemento',
    searchedRarity: 'Rarità',
    levelRange: 'Gamma di livelli',
    searchedAffCategory: 'Categoria di affetto',
    searchedAffLevel: 'Livello di affetto',
    grade0: '0 stella',
    grade1: '1 stella',
    grade2: '2 stelle',
    grade3: '3 stelle',
    grade4: '4 stelle',
    grade5: '5 stelle',
    grade6: '6 stelle',
    team: 'Squadra',
    visitTeams: 'Visita le <a href="../teams.html">Squadre</a> prima.'
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
    wikiPage: false, // TODO
    haremLevel: 'Il livello del Harem',
    unlockedScenes: false, // TODO
    income: 'Guadagno',
    or: '{{left}} o {{right}}',
    toUpgrade: false, // TODO
    toLevelCap: false, // TODO
    toLevelMax: false, // TODO
    affectionScenes: false, // TODO
    buyable: false, // TODO
    sellable: false, // TODO
    gifts: 'Regali',
    books: 'Libri',
    canBeSold: false, // TODO
    canBeBought: '{{item}} per {{amount}}',
    marketRestock: false, // TODO
}

export const league = {
    stayInTop: 'Per <em><u>rimanere tra i primi {{top}}</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
    notInTop: 'Per <em><u>essere tra i primi {{top}}</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
    challengesRegen: 'Rigenerazione naturale: <em>{{challenges}}</em>',
    challengesLeft: 'Combattimenti mancanti: <em>{{challenges}}</em>',
    averageScore: 'Punteggio medio per combattimento: <em>{{average}}</em>',
    scoreExpected: 'Punteggio previsto: <em>{{score}}</em>',
    toDemote: 'Per <em><u>retrocedere</u></em>, devi essere sorpassato da <em>{{players}}</em> giocatori',
    willDemote: 'Per <em><u>retrocedere</u></em>, puoi avere al massimo <em>{{points}}</em> punti',
    willDemoteZero: 'Per <em><u>retrocedere</u></em>, devi rimanere a <em>0</em> punti',
    toNotDemote: 'Per <em><u>non retrocedere</u></em>, devi avere più di <em>0</em> punti',
    toStay: 'Per <em><u>non essere promosso</u></em>, devi essere sorpassato da <em>{{players}}</em> giocatori',
    willStay: 'Per <em><u>non essere promosso</u></em>, puoi avere al massimo <em>{{points}}</em> punti',
    hideFoughtOpponents: false, // TODO
    showFoughtOpponents: false, // TODO
    currentLeague: 'Lega attuale',
    victories: 'Vittorie',
    defeats: 'Sconfitte',
    unknown: 'Sconosciuto',
    notPlayed: 'Non giocato',
    levelRange: 'Gamma di livelli',
    leagueFinished: 'Lega finita il {{date}}',
    opponents: 'Avversari',
    leaguePoints: 'Punti',
    avg: 'Media',
}

export const teamsFilter = {
    searchedName: 'Nome',
    girlName: 'Nome della ragazza', // TODO GH
    searchedClass: 'Classe',
    searchedElement: 'Elemento',
    searchedRarity: 'Rarità',
    levelRange: 'Gamma di livelli',
    searchedAffCategory: 'Categoria di affetto',
    searchedAffLevel: 'Livello di affetto',
    grade0: '0 stella',
    grade1: '1 stella',
    grade2: '2 stelle',
    grade3: '3 stelle',
    grade4: '4 stelle',
    grade5: '5 stelle',
    grade6: '6 stelle',
    searchedBlessedAttributes: 'Benedizioni',
    blessedAttributes: 'Ragazze benedette', // TODO GH
    nonBlessedAttributes: 'Ragazze non benedette', // TODO GH
}

export const champions = {
    participants: false, // TODO
    clubChampDuration: false, // TODO
}

export const resourceBars = {
    popsIn: false, // TODO
    popsReady: false, // TODO
    readyAt: false, // TODO
    endAt: false, // TODO
    fullAt: false, // TODO
}

export const homeScreen = {
    clubChamp: 'Il Campione per Club',
    completeIn: false, // TODO
    newMissionsIn: false, // TODO
    missionsReady: false, // TODO
}

export const seasonStats = {
    fights: 'Combattimenti',
    victories: 'Vittorie',
    defeats: 'Sconfitte',
    mojoWon: 'Mojo vinto',
    mojoLost: 'Mojo perso',
    mojoWonAvg: 'Media mojo vinto',
    mojoLostAvg: 'Media mojo perso',
    mojoAvg: 'Media mojo globale',
}

export const pachinkoNames = {
    availableGirls: 'Ragazze disponibili: ' // TODO GH
}

export const contestSummary = {
    totalRewards: 'Recompensas totales guardadas ({{contests}} Competiciones):',
    contestsWarning: '¡Los Competiciones caducan después de 21 días!'
}
