import Helpers from '../../common/Helpers'

const gameConfigs = {
    HH: {
        chica: 'chica',
        delachica: 'de la chica',
        lachica: 'la chica',
        laschicas: 'las chicas',
        flower: 'flores',
    },
    GH: {
        chica: 'chico',
        delachica: 'del chico',
        lachica: 'el chico',
        laschicas: 'los chicos',
        flower: 'piruletas',
    },
    CxH: {
        chica: 'chica',
        delachica: 'de la chica',
        lachica: 'la chica',
        laschicas: 'las chicas',
        flower: 'joyas',
    },
    PSH: {
        chica: 'chica',
        delachica: 'de la chica',
        lachica: 'la chica',
        laschicas: 'las chicas',
        flower: 'cervezas',
    },
    HoH: {
        chica: 'chica',
        delachica: 'de la chica',
        lachica: 'la chica',
        laschicas: 'las chicas',
        flower: 'flores',
    },
}
const gameConfig = gameConfigs[Helpers.getGameKey()]

export const common = {
    all: 'Todo',
}

export const config = {
    refresh: 'Actualizacion Menu principal',
    villain: 'Menu Pelear contra villano',
    villain_tiers: `Mostrar Rangos con ${Helpers.isGH() ? 'Chicos' : 'Chicas'}`,
    market: 'Informacion de Mercado',
    marketEquipsFilter: 'Filtro de equipos de mercado',
    harem: 'Informacion de Harén',
    league: 'Informacion de Liga',
    league_board: 'Mostrar los mejores de la liga',
    league_promo: 'Mostrar información de promoción',
    simFight: 'Simulacion de Liga / Temporada / Villano',
    simFight_logging : 'Registro detallado en la consola del navegador',
    teamsFilter: 'Filtro de equipos',
    champions: 'Informacion de Campeones',
    champions_poseMatching: 'Agregar indicadores de coincidencia de pose',
    champions_fixPower: `Normaliza el poder de ${gameConfig.laschicas} para comparar.`,
    homeScreen: 'Accesos directos y timers de la pantalla de inicio',
    homeScreen_leaguePos: 'Mostrar rango de liga actual (hace una llamada de red adicional)',
    resourceBars: 'Barra de recursos / Rastreador de boosters',
    popSort: 'Clasificación de LdP y navegación rápida', //'LdP' being short for 'Lugares de Poder'
    seasonStats: 'Estadísticas de la temporada',
    pachinkoNames: 'Mostrar nombres en Pachinko',
    contestSummary: 'Resumen de recompensas guardadas de las competiciones',
    battleEndstate: 'Muestra los valores finales después de omitir la batalla.',
    gemStock: 'Stock de gemas en el mercado/harén',
    staticBackground: 'Previene cambios de fondo durante Días de Orgía',
    rewardShards: `Mostrar el contador de fragmentos actual en las recompensas para ${Helpers.isGH() ? 'chicos' : 'chicas'}`,
    leaderboardFix: 'Arreglar las tablas de clasificación de Temporada, CdV, CdlG y Panteón',
    hideClaimedRewards: 'Ocultar recompensas reclamadas de Temporada/CdA/CdV',
    disableDragDrop: 'Desactivar la opción de Drag-and-Drop en el mercado',
    autoRefresh: 'Refresca el juego automáticamente cada 10 minutos',
    villainBreadcrumbs: 'Agregar ruta de navegación a las páginas de villanos',
    blessingSpreadsheetLink: 'Agregue un enlace a la hoja de cálculo de datos de bendiciones en la ventana emergente de bendiciones',
    homeScreenIcons: 'Agregar íconos de funciones a los enlaces de la pantalla de inicio',
    homeScreenOrder: 'Orden alternativo de los enlaces de la pantalla de inicio',
    homeScreenOldish: 'Diseño viejo de la pantalla de inicio (No es compatible con la optimización del estilo reorganizado en el lado derecho)',
    overridePachinkoConfirm: `Desactivar las ventanas emergentes de advertencia "No hay ${Helpers.isGH() ? 'chicos' : 'chicas'} disponibles" en Pachinko/NC`,
    sidequestCompletionMarkers: 'Marcadores de finalización de misiones secundarias',
    censorMode: 'Censurar todas las imágenes NSFW',
    fixProfilePopup: 'Reparar ventanas emergentes de perfil de jugador',
    eventEndIndicators: 'Indicadores de finalización de evento en la pantalla de inicio',
    haremTeamsFilter: 'Filtro de equipos de harén',
    upgradeQuickNav: 'Navegación rápida en la página de actualización',
    leaderboardClubmateIndicators: 'Destacar a los compañeros de club en las tablas de clasificación',
    leaderboardProfilePopups: 'Enlaces a perfiles de jugadores desde tablas de clasificación',
}
export const stConfig = {
    missionsBackground: 'Cambiar el fondo de las misiones',
    collectMoneyAnimation: 'Desactivar la animación de recogida de dinero',
    mobileBattle: 'Arreglar la pantalla de batalla para Mobile',
    darkMobileLeague: 'Fondo oscuro en ligas para Mobile',
    hideRotateDevice: 'Ocultar la etiqueta de rotación del dispositivo en Mobile',
    salaryTimers: `Timers legibles de salarios de ${Helpers.isGH() ? 'chicos' : 'chicas'}`,
    moveSkipButton: 'Mueve el botón de saltar batalla abajo',
    poseAspectRatio: `Arreglar la relación de aspecto de la pose ${Helpers.isGH() ? 'del chico' : 'de la chica'} en la batalla`,
    reduceBlur: 'Reducir el efecto de profundidad de campo en la pantalla de inicio',
    homeScreenRightSideRearrange: 'Reorganizar los elementos en el lado derecho de la pantalla de inicio',
    selectableId: 'Hacer seleccionable el ID de usuario del perfil',
    messengerDarkMode: 'Modo oscuro para el Messenger',
    leagueTableCompressed: 'Tabla compacta de la liga',
    leagueTableRowStripes: 'Filas de la tabla de la liga a rayas',
    leagueTableShadow: 'Eliminar la sombra de la tabla de la liga',
    clubTableShadow: 'Eliminar la sombra de la tabla del club',
    removeParticleEffects: 'Eliminar los efectos de partículas de la pantalla de inicio',
    eventGirlTicks: `Marcas de ${gameConfig.chica} de evento mejoradas`,
    eventGirlBorders: `Bordes verdes en ${gameConfig.chica}s de eventos obtenidos`,
    compactNav: 'Usar menú principal compacto',
    poaBorders: 'Bordes verdes en las recompensas obtenidas de CdA',
    champGirlPower: `Arreglar el desbordamiento de poder ${gameConfig.delachica} del campeón`,
    champGirlOverlap: `Arreglar ${gameConfig.lachica} del campeón superponiéndosea a la selección de ${gameConfig.chica}s`,
    hideGameLinks: 'Ocultar enlaces de juegos',
    poaTicks: 'Corrija las posiciones de marca en la pantalla de CdA',
    poaGirlFade: `Arreglar la transparencia de la pose ${gameConfig.delachica} en el CdA`,
    newButtons: 'Reemplace los botones de estilo antiguo restantes',
    bonusFlowersOverflow: `Evite que aparezcan ${gameConfig.flores} adicionales fuera de la pantalla`,
    popButtons: 'Ocultar los botones Auto-asignar y Auto-reclamar LdP',
    contestNotifs: 'Mover notificaciones de concurso',
    contestPointsWidth: 'Evitar el desbordamiento de puntos de la tabla del concurso',
    leagueChangeTeamButton: 'Arreglar el posicionamiento de los botones en el bloque izquierdo en la liga',
    compactPops: 'LdP compacto',
    monthlyCardText: 'Corregir el texto de la tarjeta mensual',
    povUnclutter: 'Claridad de la página de CdV/CdG',
    dailyGoals: 'Remodelación de objetivos diarios',
    bbProgress: 'Mejor barra de progreso de recompensas de Boss Bang',
    compactLossScreen: 'Pantalla de derrota compacta',
    seasonalEventTweaks: 'Optimierungen für Saisonales Event',
    compactHaremFilters: 'Filtros de harén compactos',
    expandedMarketInventory: 'Ampliación del inventario de mercado',
    compactResourceSummary: 'Inventario de recursos compacto',
    hideClaimAllButton: 'Ocultar el botón "Reclamar todo" en la pantalla de recompensas de temporada',
}

export const villain = {
    darklord: 'Señor Oscuro',
    ninjaspy: 'Ninja espía',
    jacksoncrew: 'La tripulación de Jackson',
    pandorawitch: 'Pandora Bruja',
    werebunnypolice: 'Policía hombres-conejos',
    fallback: 'Mondo {{world}} nemico',
    event: 'Evento',
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

export const harem = {
    marketRestocked: 'El <a href="../shop.html">Mercado</a> reabastecido desde su última visita',
    visitMarket: 'Visite el <a href="../shop.html">Mercado</a> primero para ver un resumen del inventario aquí',
    haremStats: 'Estadísticas del harén',
    upgrades: 'Mejoras',
    levelsAwakening: 'Niveles y Despertar',
    market: 'Inventario y Mercado',
    wikiPage: 'Página wiki de {{name}}',
    haremLevel: 'Nivel de Harén',
    unlockedScenes: 'Escenas desbloqueadas',
    income: 'Ingresos',
    or: '{{left}} o {{right}}',
    toUpgrade: 'Para actualizar todo:',
    toLevelCap: 'Para nivelar hasta el tope:',
    toLevelMax: 'Para nivelar al máximo: ({{max}}):',
    affectionScenes: 'Escenas de afecto',
    buyable: 'Disponible en el mercado:',
    sellable: 'En inventario:',
    gifts: 'Regalos',
    books: 'Libros',
    canBeSold: 'Se puede vender por {{sc}}',
    canBeBought: '{{item}} por {{amount}}',
    marketRestock: 'Mercado se reabastece a las {{time}} o al nivel {{level}}',
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
    hideFoughtOpponents: 'Ocultar oponentes peleados',
    showFoughtOpponents: 'Mostrar oponentes peleados',
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

export const simFight = {
    guaranteed: 'Garantizado',
    impossible: 'Imposible',
}

export const teamsFilter = {
    searchedName: 'Nombre',
    girlName: `Nombre ${Helpers.isGH() ? 'del chico' : 'de la chica'}`,
    searchedClass: 'Clase',
    searchedElement: 'Elemento',
    searchedRarity: 'Rareza',
    levelRange: 'Rango de nivel',
    levelCap: 'Límite de nivel',
    levelCap_capped: 'Alcanzado',
    levelCap_uncapped: 'No alcanzado',
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
    blessedAttributes: Helpers.isGH() ? 'Benditos chicos' : 'Benditas chicas',
    nonBlessedAttributes: Helpers.isGH() ? 'Chicos no bendecidos' : 'Chicas no bendecidas',
}

export const champions = {
    clubChampDuration: '{{duration}} desde el comienzo de la ronda',
}

export const resourceBars = {
    popsIn: 'LdPs en {{time}}',
    popsReady: 'LdPs listos',
    readyAt: 'Listo en {{time}}',
    endAt: 'Termina en {{time}}', //If it's too long you can change it to 'Acaba en {{time}}', which means 'finishes in {{time}}'
    fullAt: 'Lleno en {{time}}',
    xp: 'Siguiente: {{xp}} XP',
}

export const homeScreen = {
    clubChamp: 'El Campeón de Club',
    completeIn: 'Completo en ',
    newMissionsIn: 'Nuevas misiones en ',
    missionsReady: 'Misiones listas',
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
    availableGirls: `${Helpers.isGH() ? 'Chicos' : 'Chicas'} disponibles: `,
    poolGirls: 'Selección actual: ',
}

export const contestSummary = {
    totalRewards: 'Recompensas totales guardadas ({{contests}} Competiciones):',
    contestsWarning: '¡Los Competiciones caducan después de 21 días!'
}

export const villainBreadcrumbs = {
    town: 'Cuidad',
    adventure: 'Aventura',
    begincity: 'Primera ciudad',
    gemskingdom: 'El Reino de las Gemas',
    ninjavillage: 'Aldea de los Ninjas',
    invadedkingdom: 'El Reino Invadido',
    juysea: 'El mar del Jugo',
    admittance: 'Admisión de los muertos',
    magicforest: 'Bosque mágico',
    hamelintown: 'Ciudad de Hamelín',
    plainofrituals: 'Llanura de los rituales',
    heroesuniversity: 'Universidad de Héroes',
    ninjasacredlands: 'Tierra sagrada Ninja',
    splatters: 'Salpicaduras del archipiélago',
    digisekai: 'Digisekai',
    stairway: 'Escalera al cielo',
    training: 'Training Dimension',
    weresquidisland: 'Isla WereSquid',
    haremtournament: 'El Torneo del Harem',
}

export const blessingSpreadsheetLink = {
    name: `Abra la hoja de cálculo de datos de bendición de ${Helpers.isGH() ? 'Bella' : 'zoopokemon'}`
}

export const haremTeamsFilter = {
    team: 'Equipo',
    visitTeams: 'Visita el <a href="../teams.html">Equipos</a> primero.'
}

export const leaderboardClubmateIndicators = {
    clubmate: 'Compañero de club',
}
