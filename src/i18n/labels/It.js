import Helpers from '../../common/Helpers'

export const common = {
    all: 'Tutti',
}

export const config = {
    refresh: 'Refresh pagina Home',
    villain: 'Menù battaglia Troll',
    villain_tiers: `Mostra battaglie con ${Helpers.isGH() ? 'ragazzi' : 'ragazze'}`,
    market: 'Informazioni negozio',
    marketGirlsFilter: `Filtro per ${Helpers.isGH() ? 'ragazzi' : 'ragazze'} nel mercato`,
    marketEquipsFilter: 'Filtro per ogetti nel mercato',
    marketXPAff: 'XP e affetto nel mercato',
    marketHideSellButton: 'Nascondi il bottone di vendita nel mercato',
    harem: 'Informazioni Harem',
    league: 'Informazioni sulle Leghe',
    league_board: 'Mostra i top della lega',
    league_promo: 'Mostra informazioni sulla promozione',
    simFight: 'Simulazione Leghe / Stagione / Troll',
    simFight_logging: 'Accesso dettagliato nella console del browser',
    teamsFilter: 'Filtro delle squadre',
    champions: 'Informazioni sui Campioni',
    champions_poseMatching: 'Aggiungi indicatori di corrispondenza delle pose',
    champions_fixPower: `Includi il potere dell'eroe nella mostra del potere ${Helpers.isGH() ? 'delli ragazzi' : 'delle ragazze'}`,
    homeScreen: 'Scorciatoie e timer della schermata principale',
    homeScreen_leaguePos: 'Mostra la posizione attuale nella lega (crea una chiamata di rete addizionale)',
    resourceBars: 'Barre di risorse / Monitoraggio dei booster',
    popSort: 'LdP ordinamento e navigazione rapida',
    seasonStats: 'Statistiche di stagione',
    pachinkoNames: 'Mostra i nomi nel Pachinko',
    contestSummary: 'Riepilogo dei premi salvati dei contest',
    battleEndstate: 'Mostra i valori finali dopo aver saltato la battaglia',
    gemStock: 'Scorte di gemme nel Mercato/Harem',
    staticBackground: 'Impedi lo scambio di sfondo durante i giorni dell\'orgia',
    rewardShards:  'Mostra i conti attuali dei frammenti sulle ricompense',
    leaderboardFix: 'Correggi le classifiche di Stagione e SdV',
    hideClaimedRewards: 'Nascondi le ricompense già rivendicate per la stagione/PoA/PoV',
    disableDragDrop: 'Disabilitare il drag-and-drop nel mercato',
    autoRefresh: 'Aggiorna il gioco automaticamente ogni 10 minuti',
    villainBreadcrumbs: 'Aggiungi briciole di pane alle pagine dei troll',
    blessingSpreadsheetLink: 'Aggiungi il link della tabella dei dati delle benedizioni sul popup delle benedizioni',
    homeScreenIcons: 'Aggiungi le icone delle funzioni ai link della schermata iniziale',
    homeScreenOrder: 'Disposizione alternativa dei link nella schermata iniziale',
    homeScreenOldish: 'Vecchia schermata iniziale (Non compatibile con l\'ottimizzazione dello stile riorganizzato sul lato destro)',
    overridePachinkoConfirm: `Disattiva i pop-up di avviso "${Helpers.isGH() ? 'Nessun ragazzo' : 'Nessuna ragazza'} disponibile" in Pachinko/NC`,
}
export const stConfig = {
    missionsBackground: 'Cambiare lo sfondo delle missioni',
    collectMoneyAnimation: 'Disattivare l\'animazione di raccolta dei soldi',
    mobileBattle: 'Correggi schermata di battaglia mobile',
    darkMobileLeague: 'Sfondo scuro nella lega mobile',
    hideRotateDevice: 'Nascondi il ricordo della rotazione del device su mobile',
    salaryTimers: 'Leggibile timer di salario',
    moveSkipButton: 'Sposta il bottone salta battaglia in basso',
    poseAspectRatio: `Correggi le proporzioni delle pose ${Helpers.isGH() ? 'delli ragazzi' : 'delle ragazze'} in combattimento`,
    reduceBlur: 'Riduci l\'effetto di profondità di campo sulla schermata iniziale',
    homeScreenRightSideRearrange: 'Riorganizza gli elementi sul lato destro della schermata iniziale',
    selectableId: 'Rendi selezionabile l\'ID utente',
    messengerDarkMode: 'Modo scuro per il messaggero',
}

export const villain = {
    darklord: 'Signore Oscuro',
    ninjaspy: 'Spia Ninja',
    jacksoncrew: 'Ciurma di Jackson',
    pandorawitch: 'Strega Pandora',
    werebunnypolice: 'Polizia del Conigli Mannari',
    fallback: 'Mundo {{world}} villano',
    event: 'Evento',
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
    youCanGive: 'Puoi dare un massimo di <b>{{value}}</b> {{currency}}.',
}

export const marketGirlsFilter = {
    searchedName: 'Nome',
    girlName: `Nome ${Helpers.isGH() ? 'del ragazzo' : 'della ragazza'}`,
    searchedClass: 'Classe',
    searchedElement: 'Elemento',
    searchedRarity: 'Rarità',
    levelRange: 'Gamma di livelli',
    levelCap: 'Limite di livello',
    levelCap_capped: 'Raggiunto',
    levelCap_uncapped: 'Non raggiunto',
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
    aff: 'Prossimo: {{remainNext}}',
}

export const marketHideSellButton = {
    hide: 'Nascondi il bottone "Vendi"',
}

export const harem = {
    marketRestocked: '> Il <a href="../shop.html">mercato</a> si è rifornito dalla tua ultima visita.',
    visitMarket: '> Visita prima il <a href="../shop.html">Mercato</a> per vedere un riassunto dell\'inventario qui',
    haremStats: 'Statistiche dell\'harem',
    upgrades: 'Aggiornamenti',
    levelsAwakening: 'Livelli e risveglio',
    market: 'Inventario e mercato',
    wikiPage: 'La pagina wiki di {{name}}}',
    haremLevel: 'Il livello del Harem',
    unlockedScenes: 'Scene sbloccate',
    income: 'Guadagno',
    or: '{{left}} o {{right}}',
    toUpgrade: 'Per aggiornare tutti:',
    toLevelCap: 'Per salire di livello fino:',
    toLevelMax: 'Per salire di livello al massimo ({{max}}):',
    affectionScenes: 'Scene d\'affetto',
    buyable: 'Dispondibili nel mercato:',
    sellable: 'Nell\'inventario:',
    gifts: 'Regali',
    books: 'Libri',
    canBeSold: 'Può essere venduto per {{sc}}',
    canBeBought: '{{item}} per {{amount}}',
    marketRestock: 'Il mercato si rifornisce in {{time}} o al livello {{level}}',
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
    hideFoughtOpponents: 'Nascondi avversari combattuti',
    showFoughtOpponents: 'Mostra avversari combattuti',
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

export const simFight = {
    guaranteed: 'Garantito',
    impossible: 'Impossibile',
}

export const teamsFilter = {
    searchedName: 'Nome',
    girlName: `Nome ${Helpers.isGH() ? 'del ragazzo' : 'della ragazza'}`,
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
    blessedAttributes: Helpers.isGH() ? 'Ragazzi benedetti' : 'Ragazze benedette',
    nonBlessedAttributes: Helpers.isGH() ? 'Ragazzi non benedetti' : 'Ragazze non benedette',
}

export const champions = {
    participants: 'Partecipanti: {{participants}}/{{members}}',
    clubChampDuration: '{{duration}} dall\'inizio del giro',
}

export const resourceBars = {
    popsIn: 'LdP in {{time}}',
    popsReady: 'LdP pronti',
    readyAt: 'Pronto in {{time}}',
    endAt: 'Termina in {{time}}',
    fullAt: 'Pieno in {{time}}',
    xp: 'Prossimo: {{xp}} XP',
}

export const homeScreen = {
    clubChamp: 'Il Campione per Club',
    completeIn: 'Completa in ',
    newMissionsIn: 'Nuova Missione in ',
    missionsReady: 'Missioni pronte',
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
    availableGirls: `${Helpers.isGH() ? 'Ragazzi' : 'Ragazze'} disponibili: `,
    poolGirls: 'Selezione corrente: ',
}

export const contestSummary = {
    totalRewards: 'Ricompense totali salvate ({{contests}} contest):',
    contestsWarning: 'I contest scadono dopo 21 giorni!',
}

export const villainBreadcrumbs = {
    town: 'Città',
    adventure: 'Avventura',
    begincity: 'Città dell\'inizio',
    gemskingdom: 'Il reame delle gemme',
    ninjavillage: 'Villaggio dei ninja',
    invadedkingdom: 'Il regno invaso',
    juysea: 'Il mare Juy',
    admittance: 'Ammissione del defunto',
    magicforest: 'La foresta magica',
    hamelintown: 'Città di Hamelin',
    plainofrituals: 'Piano dei rituali',
    heroesuniversity: 'Università degli Eroi',
    ninjasacredlands: 'Terre Sacre dei Ninja',
    splatters: 'Arcipelago Appiccicoso',
    digisekai: 'Digisekai',
    stairway: 'Scalinata verso il Cielo',
    training: 'Dimensione d\'Allenamento',
    weresquidisland: 'Isola dei Calamari Mannari',
}

export const blessingSpreadsheetLink = {
    name: `Apri il foglio della tabella dei dati delle benedizioni di ${Helpers.isGH() ? 'Bella' : 'zoopokemon'}`
}
