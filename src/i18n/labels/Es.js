export const common = {
    all: 'Todo',
}

export const config = {
    refresh: 'Actualizacion Menu principal',
    villain: 'Menu Pelear contra villano',
    villain_tiers: 'Mostrar Rangos con Chicas', // TODO GH
    xpMoney : 'Mejor XP / Dinero',
    market: 'Informacion de Mercado',
    marketGirlsFilter: 'Filtro de chicas en el mercado', // TODO GH
    marketEquipsFilter: false, // TODO
    marketXPAff: 'El XP y el afecto en el mercado',
    marketHideSellButton: false, // TODO
    harem: 'Informacion de Harén',
    league: 'Informacion de Liga',
    league_board: 'Mostrar los mejores de la liga',
    league_promo: 'Mostrar información de promoción',
    simFight: 'Simulacion de Liga / Temporada / Villano',
    simFight_logging : 'Registro detallado en la consola del navegador',
    simFight_highPrecisionMode: false, // TODO
    teamsFilter: 'Filtro de equipos',
    champions: 'Informacion de Campeones',
    homeScreen: false, // TODO
    resourceBars: false, // TODO
    popSort: false, // TODO
    seasonStats: false, // TODO
    pachinkoNames: 'Mostrar nombres en Pachinko',
    contestSummary: 'Resumen de recompensas guardadas de las competiciones',
    battleEndstate: 'Muestra los valores finales después de omitir la batalla.',
    gemStock: false, // TODO
    staticBackground: false, // TODO
    rewardShards: false, // TODO
    leaderboardFix: false, // TODO
}
export const stConfig = {
    missionsBackground: 'Cambiar el fondo de las misiones',
    collectMoneyAnimation: 'Desactivar la animación de recogida de dinero',
    mobileBattle: false, // TODO
    darkMobileLeague: false, // TODO
    hideRotateDevice: false, // TODO
    salaryTimers: false, // TODO
}

export const villain = {
    darklord: 'Señor Oscuro',
    ninjaspy: 'Ninja espía',
    jacksoncrew: 'La tripulación de Jackson',
    pandorawitch: 'Pandora Bruja',
    werebunnypolice: 'Policía hombres-conejos',
    fallback: 'Mondo {{world}} nemico'
}

export const xpMoney = {
    xp: false, // TODO
}

export const market = {
    pointsUnbought: 'Puntos de estatus necesarios para maximo',
    moneyUnspent: 'Dinero necesario para maximo',
    moneySpent: 'Dinero usado en el mercado',
    pointsLevel: 'Puntos de estatus de nivel',
    pointsBought: 'Puntos comprados del mercado',
    pointsEquip: 'Puntos de estatus de equipamiento',
    pointsBooster: 'Puntos de estatus de los potenciadores',
    pointsClub: 'Puntos de estatus del club',
    boosterItem: 'potenciadores',
    xpItem: 'libros',
    xpCurrency: 'XP',
    affItem: 'regalos',
    affCurrency: 'afecto',
    equips: 'equipamiento',
    youOwn: 'Tienes <b>{{count}}</b> {{type}}.',
    youCanSell: 'Puedes vender todo por <b>{{cost}}</b> <span class="hudSC_mix_icn"></span>.',
    youCanGive: 'Puedes dar un total de <b>{{value}}</b> {{currency}}.'
}

export const marketGirlsFilter = {
    searchedName: 'Nombre',
    girlName: 'Nombre de la chica', // TODO GH
    searchedClass: 'Clase',
    searchedElement: 'Elemento',
    searchedRarity: 'Rareza',
    levelRange: 'Rango de nivel',
    searchedAffCategory: 'Categoría de afecto',
    searchedAffLevel: 'Nivel de afecto',
    grade0: '0 estrella',
    grade1: '1 estrella',
    grade2: '2 estrellas',
    grade3: '3 estrellas',
    grade4: '4 estrellas',
    grade5: '5 estrellas',
    grade6: '6 estrellas',
    team: 'Equipo',
    visitTeams: 'Visita el <a href="../teams.html">Equipos</a> primero.'
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
    haremLevel: 'Nivel de Harén',
    unlockedScenes: false, // TODO
    income: 'Ingresos',
    or: '{{left}} o {{right}}',
    toUpgrade: false, // TODO
    toLevelCap: false, // TODO
    toLevelMax: false, // TODO
    affectionScenes: false, // TODO
    buyable: false, // TODO
    sellable: false, // TODO
    gifts: 'Regalos',
    books: 'Libros',
    canBeSold: false, // TODO
    canBeBought: '{{item}} por {{amount}}',
    marketRestock: false, // TODO
}

export const league = {
    stayInTop: 'Para <em><u>quedar entre los {{top}} primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
    notInTop: 'Para <em><u>estar entre los {{top}} primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
    challengesRegen: 'Regeneracion naturel: <em>{{challenges}}</em>',
    challengesLeft: 'Retos pendientes: <em>{{challenges}}</em>',
    averageScore: 'Puntuación media por combate: <em>{{average}}</em>',
    scoreExpected: 'Puntuación esperada: <em>{{score}}</em>',
    toDemote: 'Para <em><u>descender</u></em>, debes ser superado por <em>{{players}}</em> jugadores',
    willDemote: 'Para <em><u>descender</u></em>, puedes tener un máximo de <em>{{points}}</em> puntos',
    willDemoteZero: 'Para <em><u>descender</u></em>, debes mantenerte en <em>0</em> puntos',
    toNotDemote: 'Para <em><u>no descender</u></em>, debes tener más de <em>0</em> puntos',
    toStay: 'Para <em><u>no promocionar</u></em>, debes ser superado por <em>{{players}}</em> jugadores',
    willStay: 'Para <em><u>no promocionar</u></em>, puedes tener un máximo de <em>{{points}}</em> puntos',
    hideFoughtOpponents: false, // TODO
    showFoughtOpponents: false, // TODO
    currentLeague: 'Liga actual',
    victories: 'Victorias',
    defeats: 'Derrota',
    unknown: 'Desconocido',
    notPlayed: 'No jugado',
    levelRange: 'Rango de nivel',
    leagueFinished: 'Liga terminó el {{date}}',
    opponents: 'Opositores',
    leaguePoints: 'Puntos',
    avg: 'Media',
}

export const teamsFilter = {
    searchedName: 'Nombre',
    girlName: 'Nombre de la chica', // TODO GH
    searchedClass: 'Clase',
    searchedElement: 'Elemento',
    searchedRarity: 'Rareza',
    levelRange: 'Rango de nivel',
    searchedAffCategory: 'Categoría de afecto',
    searchedAffLevel: 'Nivel de afecto',
    grade0: '0 estrella',
    grade1: '1 estrella',
    grade2: '2 estrellas',
    grade3: '3 estrellas',
    grade4: '4 estrellas',
    grade5: '5 estrellas',
    grade6: '6 estrellas',
    searchedBlessedAttributes: 'Benediciones',
    blessedAttributes: 'Benditas chicas', // TODO GH
    nonBlessedAttributes: 'Chicas no bendecidas', // TODO GH
}

export const champions = {
    clubChampDuration: '{{duration}} desde el comienzo de la ronda',
}

export const resourceBars = {
    popsIn: false, // TODO
    popsReady: false, // TODO
    readyAt: false, // TODO
    endAt: false, // TODO
    fullAt: false, // TODO
}

export const homeScreen = {
    clubChamp: 'El Campeón de Club',
    completeIn: false, // TODO
    newMissionsIn: false, // TODO
    missionsReady: false, // TODO
}

export const seasonStats = {
    fights: 'Peleas',
    victories: 'Victorias',
    defeats: 'Derrota',
    mojoWon: 'Mojo ganado',
    mojoLost: 'Mojo perdido',
    mojoWonAvg: 'Mojo ganado promedio',
    mojoLostAvg: 'Mojo perdido promedio',
    mojoAvg: 'Promedio total de mojo',
}

export const pachinkoNames = {
    availableGirls: 'Chicas disponibles: ' // TODO GH
}

export const contestSummary = {
    totalRewards: 'Ricompense totali salvate ({{contests}} contest):',
    contestsWarning: 'I contest scadono dopo 21 giorni!'
}
