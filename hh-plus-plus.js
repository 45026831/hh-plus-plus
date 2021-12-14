// ==UserScript==
// @name            Hentai Heroes++ BDSM version
// @description     Adding things here and there in the Hentai Heroes game. Also supports HHCore-based games such as GH and CxH.
// @version         0.37.35
// @match           https://*.hentaiheroes.com/*
// @match           https://nutaku.haremheroes.com/*
// @match           https://*.gayharem.com/*
// @match           https://*.comixharem.com/*
// @run-at          document-end
// @namespace       https://github.com/45026831/hh-plus-plus
// @updateURL       https://raw.githubusercontent.com/45026831/hh-plus-plus/main/hh-plus-plus.js
// @downloadURL     https://raw.githubusercontent.com/45026831/hh-plus-plus/main/hh-plus-plus.js
// @grant           none
// @author          Raphael, 1121, Sluimerstand, shal, Tom208, test_anon, 45026831(Numbers)
// ==/UserScript==

/*  ===========
     CHANGELOG
    =========== */
// The changelog can be found at https://raw.githubusercontent.com/45026831/hh-plus-plus/main/CHANGELOG


/* =========
    GENERAL
   ========= */

// Define jQuery
var $ = window.jQuery;

if (!$) {
    console.log('HH++ WARNING: No jQuery found. Probably an error page. Ending the script here');
    return;
}

// Define CSS
var sheet = (function() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
})();

var location = window.location
if (location.pathname === '/' && location.hostname.includes('www')) {
    // iframe container, stop here
    return
}

var CurrentPage = location.pathname;

const isGH = [
    'www.gayharem.com',
    'nutaku.gayharem.com'
].includes(location.host)
const isCxH = [
    'www.comixharem.com',
    'nutaku.comixharem.com'
].includes(location.host)
const isHH = !(isGH || isCxH)

const gameConfigs = {
    HH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes',
        trollMenuFontWeight: '400'
    },
    GH: {
        girl: 'guy',
        Girl: 'Guy',
        haremettes: 'harem guys',
        trollMenuFontWeight: '400'
    },
    CxH: {
        girl: 'girl',
        Girl: 'Girl',
        haremettes: 'haremettes',
        trollMenuFontWeight: '800'
    }
}
const gameConfig = isGH ? gameConfigs.GH : isCxH ? gameConfigs.CxH : gameConfigs.HH

// Only Nutaku HH is divided by 6. CxH and GH use the same values as CxH.com and GH.com
const IS_NUTAKU_KOBANS = HH_UNIVERSE === 'nutaku';

const HC = 1;
const CH = 2;
const KH = 3;
const classRelationships = {
    [HC]: {
        s: KH,
        t: CH
    },
    [CH]: {
        s: HC,
        t: KH
    },
    [KH]: {
        s: CH,
        t: HC
    }
};

const ELEMENTS_ENABLED = !!GT.design.fire_flavor_element
/**
 * ELEMENTS ASSUMPTIONS
 *
 * 1) Girl and Harem synergy bonuses for Attack, Defense, Ego and Harmony are already included in the shown stats for league and seasons
 * 2) Girl and Harem synergy bonuses for Crit damage, Defense reduction, Heal-on-hit, and Crit chance are not shown at all for league and seasons for opponents and must be built from team and an estimate of harem
 * 3) Countering bonuses are not included in any shown stats
 * 4) For villains and pantheon, defense reduction and countering ego + attack bonuses are included in the shown stats, the rest of 2) and 3) still apply.
 *
 * ELEMENTS FACTS
 *
 * 1) Crit damage and chance bonuses are additive; Ego and damage bonuses are multiplicative
 * 2) Opponent harem synergies are completely unavailable to the player, it has been promised that they will be available soon but not in the initial release
 */
const ELEMENTS = {
    chance: {
        darkness: 'light',
        light: 'psychic',
        psychic: 'darkness'
    },
    egoDamage: {
        fire: 'nature',
        nature: 'stone',
        stone: 'sun',
        sun: 'water',
        water: 'fire'
    }
}
const ELEMENTS_ICON_NAMES = {
    "fire": "Eccentric",
    "nature": "Exhibitionist",
    "stone": "Physical",
    "sun": "Playful",
    "water": "Sensual",
    "darkness": "Dominatrix",
    "light": "Submissive",
    "psychic": "Voyeurs"
}

const STOCHASTIC_SIM_RUNS = 10000

const mediaMobile = '@media only screen and (max-width: 1025px)';
const mediaDesktop = '@media only screen and (min-width: 1026px)';

const CDNs = {
    'nutaku.haremheroes.com': 'hh.hh-content.com',
    'www.hentaiheroes.com': 'hh2.hh-content.com',
    'www.comixharem.com': 'ch.hh-content.com',
    'nutaku.comixharem.com': 'ch.hh-content.com',
    'www.gayharem.com': 'gh1.hh-content.com',
    'nutaku.gayharem.com': 'gh.hh-content.com'
}
const cdnHost = CDNs[location.host] || 'hh.hh-content.com'

/* ==============
    TRANSLATIONS
   ============== */

const supportedLanguages = ['en', 'fr', 'es', 'it', 'de']
const htmlLang = $('html').attr('lang').substring(0,2)
const lang = supportedLanguages.includes(htmlLang) ? htmlLang : supportedLanguages[0];

const texts = {
    en: {
        optionsRefresh: 'Home screen refresh',
        optionsVillain: 'Fight a villain menu',
        optionsTiers: `Show tiers with ${gameConfig.girl}s`,
        optionsXPMoney : 'Better XP / Money',
        optionsMarket: 'Market information',
        optionsMarketFilter: `${gameConfig.Girl}s filter at the market`,
        optionsMarket_XP_Aff: 'XP and affection at the market',
        optionsSortArmorItems: 'Button to sort armor items by rarity',
        optionsHideSellButton: 'Button to hide "Sell" button',
        optionsHarem: 'Harem information',
        optionsLeague: 'League information',
        optionsLeagueBoard: 'Show the league tops',
        optionsLeaguePromo: 'Show promotion information',
        optionsSimFight : 'League / Season / Villains sim',
        optionsLogSimFight : 'Detailed logging in the browser console',
        optionsTeamsFilter: 'Teams filter',
        optionsChampions: 'Champions information',
        optionsLinks: 'Shortcuts/Timers',
        optionsSeasonStats: 'Season stats',
        optionsPachinkoNames: 'Show names in Pachinko',
        //optionsEpicPachinkoNames: 'Show names in Epic Pachinko',
        optionsMissionsBackground: 'Change missions background',
        optionsCollectMoneyAnimation: 'Delete the collect money animation',
        optionsContestSummary: 'Saved Contests rewards summary',
        optionsBattleEndstate: 'Show final values when skipping battle',
        optionsGemStock: 'Gem stock in Market/Harem',
        and: 'and',
        or: 'or',
        affection: 'affection',
        harem_stats: 'Harem Stats',
        haremettes: gameConfig.haremettes,
        hardcore: 'Hardcore',
        charm: 'Charm',
        knowhow: 'Know-how',
        shagger: 'Shagger',
        lover: 'Lover',
        expert: 'Expert',
        Defense_against: 'Defense against ',
        specialist_in: 'specialist in ',
        harem_level: 'harem level',
        to_go: 'to go',
        unlocked_scenes: 'scenes unlocked',
        money_income: 'Money income',
        per_hour: 'per hour',
        when_all_collectable: 'when all collectable',
        required_to_unlock: `Required to upgrade all ${gameConfig.haremettes}`,
        required_to_get_max_level: `Required to level all ${gameConfig.haremettes}`,
        my_stocks: 'My stock',
        equipments: 'equipments',
        boosters: 'boosters',
        books: 'books',
        gifts: 'gifts',
        currently_buyable: 'Currently buyable stock',
        visit_the: 'Visit the <a href="../shop.html">Market</a> first.',
        visit_teams: 'Visit <a href="../teams.html">Teams</a> first.',
        not_compatible: 'Your webbrowser is not compatible.',
        or_level: 'or level',
        restock: 'Restock',
        wiki: '\'s wiki page',
        evolution_costs: 'Upgrade costs are',
        world: 'World ',
        villain: ' villain',
        fight_villain: 'Fight a villain',
        you_own: 'You own',
        you_can_give: 'You can give a total of',
        you_can_sell: 'You can sell everything for',
        stat_points_need: 'Stat points buyable to max',
        money_need: 'Money required to max',
        money_spent: 'Money spent in market',
        points_from_level: 'Level-based stat points',
        bought_points: 'Market-bought stat points',
        equipment_points: 'Equipments stat points',
        ginseng_points: 'Boosters stat points',
        club_points: 'Club bonus stat points',
        Xp: 'XP',
        starting: 'Starting',
        common: 'Common',
        rare: 'Rare',
        epic: 'Epic',
        legendary: 'Legendary',
        mythic: 'Mythic',
        day: 'd',
        hour: 'h',
        minute: 'm',
        second: 's',
        demote_up: 'To <em><u>demote</u></em>, you can have a maximum of <em>{{points}}</em> points',
        demote_down: 'To <em><u>demote</u></em>, you must be passed by <em>{{players}}</em> players',
        demote_holdzero: 'To <em><u>demote</u></em>, you must remain at <em>0</em> points',
        stagnate_up: 'To <em><u>not promote</u></em>, you can have a maximum of <em>{{points}}</em> points',
        stagnate_down: 'To <em><u>not promote</u></em>, you must be passed by <em>{{players}}</em> players',
        stagnate_atzero: 'To <em><u>not demote</u></em>, you must have more than <em>0</em> points',
        top4_up: 'To <em><u>be in the top 4</u></em>, you must have a minimum of <em>{{points}}</em> points',
        top4_hold: 'To <em><u>stay in the top 4</u></em>, you must have a minimum of <em>{{points}}</em> points',
        top15_up: 'To <em><u>be in the top 15</u></em>, you must have a minimum of <em>{{points}}</em> points',
        top15_hold: 'To <em><u>stay in the top 15</u></em>, you must have a minimum of <em>{{points}}</em> points',
        top30_up: 'To <em><u>be in the top 30</u></em>, you must have a minimum of <em>{{points}}</em> points',
        top30_hold: 'To <em><u>stay in the top 30</u></em>, you must have a minimum of <em>{{points}}</em> points',
        challenges_regen: 'Natural regeneration: ',
        challenges_left: '<br />Challenges left: ',
        season_fights: 'Season fights: ',
        in: 'in',
        pop: 'Places',
        season: 'Season',
        full_in: 'Full in',
        ends_at: 'Ends at',
        full: 'Full',
        league: 'League',
        boosters_end: 'Boosters end',
        victories: 'Victories',
        defeats: 'Defeats',
        unknown: 'Unknown',
        opponents: 'Opponents',
        notPlayed: 'Not played',
        leaguePoints: 'Points',
        avg: 'Average',
        levelRange: 'Level range',
        league_ending: 'League ending on ',
        league_finished: 'League finished on ',
        current_league: 'Current league',
        averageScore: 'Average score per fight: ',
        scoreExpected: 'Score expected: ',
        available_girls: `Available ${gameConfig.girl}s: `,
        fights: 'Fights',
        won_mojo: 'Won mojo',
        lost_mojo: 'Lost mojo',
        won_mojo_avg: 'Won mojo average',
        lost_mojo_avg: 'Lost mojo average',
        mojo_avg: 'Global mojo average',
        filter: 'Filter',
        searched_name : 'Search',
        girl_name: `${gameConfig.Girl} name`,
        searched_class: 'Class',
        searched_element: 'Element',
        searched_rarity: 'Rarity',
        team_number: 'Team number',
        all: 'All',
        team: 'Team',
        save_as: 'Save as',
        load_from: 'Load from',
        level_range: 'Level range',
        searched_aff_category: 'Affection category',
        searched_aff_lvl: 'Affection level',
        zero_star: '0 star',
        one_star: '1 star',
        two_stars: '2 stars',
        three_stars: '3 stars',
        four_stars: '4 stars',
        five_stars: '5 stars',
        six_stars: '6 stars',
        combativity: 'Combativity',
        energy: 'Energy',
        sort: 'Sort',
        hide: 'Hide',
        display: 'Display',
        searched_blessed_attributes: `Blessings`,
        blessed_attributes: `Blessed ${gameConfig.girl}s`,
        non_blessed_attributes: `Non-blessed ${gameConfig.girl}s`,
        total_rewards: 'Total Saved Rewards ({{contests}} Contests):',
        contests_warning: 'Contests expire after 21 days!',
        clubChampDuration: '{{duration}} since round start'
    },
    fr: {
        optionsRefresh: 'Rafraîchir page d\'accueil',
        optionsVillain: 'Menu des combats des trolls',
        optionsTiers: 'Montrer les paliers/filles',
        optionsXPMoney : 'XP / Argent + précis',
        optionsMarket: 'Infos marché',
        optionsMarketFilter: 'Filtre des filles au marché',
        optionsMarket_XP_Aff: 'XP et affection au marché',
        optionsSortArmorItems: 'Bouton pour trier les équipements par rareté',
        optionsHideSellButton: 'Bouton pour masquer le bouton "Vendre"',
        optionsHarem: 'Infos harem',
        optionsLeague: 'Infos ligue',
        optionsLeagueBoard: 'Montrer les tops ligue',
        optionsLeaguePromo: 'Montrer les informations sur la promotion',
        optionsSimFight: 'Simu ligue / saison / combats de troll',
        optionsLogSimFight : 'Détails dans la console du navigateur',
        optionsTeamsFilter: 'Filtre d\'équipes',
        optionsChampions: 'Infos champions',
        optionsLinks: 'Raccourcis/Timers',
        optionsSeasonStats: 'Stats de la saison',
        optionsPachinkoNames: 'Montrer les noms au Pachinko',
        //optionsEpicPachinkoNames: 'Montrer noms au PE',
        optionsMissionsBackground: 'Change l\'arrière-plan des missions',
        optionsCollectMoneyAnimation: 'Désactive l\'animation de récolte d\'argent',
        optionsContestSummary: 'Récap\' des récompenses des Compètes enregistrées',
        optionsBattleEndstate: 'Afficher le détail quand tu passe le combat',
        optionsGemStock: 'Liste des gemmes dans le Marché/Harem',
        and: 'et',
        or: 'ou',
        affection: 'affection',
        harem_stats: 'Stats du harem',
        haremettes: 'haremettes',
        hardcore: 'Hardcore',
        charm: 'Charme',
        knowhow: 'Savoir-faire',
        shagger: 'Niqueur',
        lover: 'Romantique',
        expert: 'Expert',
        Defense_against: 'Défense contre les ',
        specialist_in: 'spécialiste du ',
        harem_level: 'niveau de harem',
        to_go: 'restant',
        unlocked_scenes: 'scènes débloquées',
        money_income: 'Revenus',
        per_hour: 'par heure',
        when_all_collectable: 'quand tout est disponible',
        required_to_unlock: 'Requis pour débloquer la scène',
        required_to_get_max_level: 'Requis pour obtenir toutes les filles au niveau maximum',
        my_stocks: 'Mes stocks',
        equipments: 'équipements',
        boosters: 'boosters',
        books: 'livres',
        gifts: 'cadeaux',
        currently_buyable: 'Stock disponible au marché',
        visit_the: 'Visiter d\'abord le <a href="../shop.html">marché</a>.',
        visit_teams: 'Visiter d\'abord <a href="../teams.html">l\'équipe</a>.',
        not_compatible: 'Votre navigateur n\'est pas compatible.',
        or_level: 'ou niveau',
        restock: 'Restock',
        wiki: 'Page wiki de ',
        evolution_costs: 'Ses couts d\'évolution sont',
        world: 'Monde ',
        villain: ' troll',
        fight_villain: 'Combats un troll',
        you_own: 'Tu possèdes',
        you_can_give: 'Tu peux donner un total de',
        you_can_sell: 'Tu peux tout vendre pour',
        stat_points_need: 'Nombre de points requis pour max',
        money_need: 'Argent demandé pour max',
        money_spent: 'Argent dépensé dans le marché',
        points_from_level: 'Points donnés par ton niveau',
        bought_points: 'Points achetés au marché',
        equipment_points: 'Points donnés par ton équipement',
        ginseng_points: 'Points donnés par tes boosters',
        club_points: 'Points donnés par ton club',
        Xp: 'XP',
        starting: 'Fille de départ',
        common: 'Commun',
        rare: 'Rare',
        epic: 'Épique',
        legendary: 'Légendaire',
        mythic: 'Mythique',
        day: 'j',
        hour: 'h',
        minute: 'm',
        second: 's',
        demote_up: 'Pour <em><u>être rétrogradé</u></em>, vous pouvez avoir un maximum de <em>{{points}}</em> points',
        demote_down: 'Pour <em><u>être rétrogradé</u></em>, vous devez être dépassé par <em>{{players}}</em> joueurs',
        demote_holdzero: 'Pour <em><u>être rétrogradé</u></em>, vous devez rester avec <em>0</em> points',
        stagnate_up: 'Pour <em><u>ne pas être promu</u></em>, vous pouvez avoir un maximum de <em>{{points}}</em> points',
        stagnate_down: 'Pour <em><u>ne pas être promu</u></em>, vous devez être dépassé par <em>{{players}}</em> joueurs',
        stagnate_atzero: 'Pour <em><u>ne pas être rétrogradé</u></em>, vous devez avoir plus de <em>0</em> points',
        top4_up: 'Pour <em><u>être dans le top 4</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        top4_hold: 'Pour <em><u>rester dans le top 4</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        top15_up: 'Pour <em><u>être dans le top 15</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        top15_hold: 'Pour <em><u>rester dans le top 15</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        top30_up: 'Pour <em><u>être dans le top 30</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        top30_hold: 'Pour <em><u>rester dans le top 30</u></em>, vous devez avoir un minimum de <em>{{points}}</em> points',
        challenges_regen: 'Régénération naturelle: ',
        challenges_left: '<br />Défis restants: ',
        season_fights: 'Combats de Saison: ',
        in: 'dans',
        pop: 'Lieux',
        season: 'Saison',
        full_in: 'Remplie dans',
        ends_at: 'Fin à',
        full: 'Remplie',
        league: 'Ligue',
        boosters_end: 'Fin boosters',
        victories: 'Victoires',
        defeats: 'Defaites',
        unknown: 'Inconnus',
        opponents: 'Adversaires',
        notPlayed: 'Non joués',
        leaguePoints: 'Points',
        avg: 'Moyenne',
        levelRange: 'Étendue de niveau',
        league_ending: 'Ligue terminant le ',
        league_finished: 'Ligue terminée le ',
        current_league: 'Ligue actuelle',
        averageScore: 'Score moyen par combat: ',
        scoreExpected: 'Score attendu: ',
        available_girls: 'Filles disponibles: ',
        fights: 'Combats',
        won_mojo: 'Mojo gagnés',
        lost_mojo: 'Mojo perdus',
        won_mojo_avg: 'Moyenne mojo gagnés',
        lost_mojo_avg: 'Moyenne mojo perdus',
        mojo_avg: 'Moyenne mojo globale',
        filter: 'Filtre',
        searched_name : 'Nom recherché',
        girl_name: 'Nom de la fille',
        searched_class: 'Classe recherchée',
        searched_rarity: 'Rareté recherchée',
        team_number: 'Équipe #',
        all: 'Toutes',
        team: 'Équipe',
        save_as: 'Sauver sous',
        load_from: 'Charger',
        level_range: 'Intervalle de niveaux',
        searched_aff_category: 'Catégorie d\'affection recherchée',
        searched_aff_lvl: 'Niveau d\'affection recherché',
        zero_star: '0 étoile',
        one_star: '1 étoile',
        two_stars: '2 étoiles',
        three_stars: '3 étoiles',
        four_stars: '4 étoiles',
        five_stars: '5 étoiles',
        six_stars: '6 étoiles',
        combativity: 'Combativité',
        energy: 'Énergie',
        sort: 'Trier',
        hide: 'Masquer',
        display: 'Afficher',
        searched_blessed_attributes: 'Filles bénies recherchées',
        blessed_attributes: 'Filles bénies',
        non_blessed_attributes: 'Filles non bénies',
        total_rewards: 'Total des récompenses enregistrées ({{contests}} Compètes) :',
        contests_warning: 'Les Compètes expirent après 21 jours !',
        clubChampDuration: '{{duration}} depuis le début du tour'
    },
    es: {
        optionsRefresh: 'Actualizacion Menu principal',
        optionsVillain: 'Menu Pelear contra villano',
        optionsTiers: 'Mostrar Rangos con Chicas',
        optionsXPMoney : 'Mejor XP / Dinero',
        optionsMarket: 'Informacion de Mercado',
        optionsMarketFilter: 'Filtro de chicas en el mercado',
        optionsMarket_XP_Aff: 'El XP y el afecto en el mercado',
        optionsSortArmorItems: 'Botón para ordenar los artículos de armadura por rareza',
        optionsHideSellButton: 'Botón para ocultar el botón de "Venta"',
        optionsHarem: 'Informacion de Harén',
        optionsLeague: 'Informacion de Liga',
        optionsLeagueBoard: 'Mostrar los mejores de la liga',
        optionsLeaguePromo: 'Mostrar información de promoción',
        optionsSimFight: 'Simulacion de Liga / Temporada / Villano',
        optionsLogSimFight: 'Registro detallado en la consola del navegador',
        optionsTeamsFilter: 'Filtro de equipos',
        optionsChampions: 'Informacion de Campeones',
        optionsLinks: 'Atajos/Temporizadores',
        optionsSeasonStats: 'Season stats',
        optionsPachinkoNames: 'Mostrar nombres en Pachinko',
        //optionsEpicPachinkoNames: 'Mostrar nombres en Epic Pachinko',
        optionsMissionsBackground: 'Cambiar el fondo de las misiones',
        optionsCollectMoneyAnimation: 'Desactivar la animación de recogida de dinero',
        optionsContestSummary: 'Resumen de recompensas guardadas de las competiciones',
        optionsBattleEndstate: 'Muestra los valores finales después de omitir la batalla.',
        and: 'y',
        or: 'o',
        in: 'en',
        affection: 'afecto',
        harem_stats: 'Estatus del Harén',
        haremettes: 'haremettes',
        hardcore: 'Folladas',
        charm: 'Encanto',
        knowhow: 'Saber-hacer',
        shagger: 'Follador',
        lover: 'Amante',
        expert: 'Experto',
        Defense_against: 'Defensa contra ',
        specialist_in: 'especialista en ',
        harem_level: 'nivel de harén',
        to_go: 'restante',
        unlocked_scenes: 'escenas desbloqueadas',
        money_income: 'Ingreso de dinero',
        per_hour: 'por hora',
        when_all_collectable: 'cuando todo es coleccionable',
        required_to_unlock: 'Requerido para desbloquear todas las escenas bloqueadas',
        required_to_get_max_level: 'Requerido para obtener el máximo nivel de todas las chicas',
        my_stocks: 'Mi Stock',
        equipments: 'equipamiento',
        boosters: 'potenciadores',
        books: 'libros',
        gifts: 'regalos',
        currently_buyable: 'Stocks Comprables Actualmente',
        visit_the: 'Visita el <a href="../shop.html">Mercado</a> primero.',
        visit_teams: 'Visita el <a href="../teams.html">Equipos</a> primero.',
        not_compatible: 'Tu navegador no es compatible.',
        or_level: 'o nivel',
        restock: 'Restock',
        wiki: ' wiki',
        evolution_costs: 'Sus costo de evolucion son',
        world: 'Mundo ',
        villain: ' villano',
        fight_villain: 'Pelear un villano',
        you_own: 'Tienes',
        you_can_give: 'Puedes dar un total de',
        you_can_sell: 'Puedes vender todo por',
        stat_points_need: 'Puntos de estatus necesarios para maximo',
        money_need: 'Dinero necesario para maximo',
        money_spent: 'Dinero usado en el mercado',
        points_from_level: 'Puntos de estatus de nivel',
        bought_points: 'Puntos comprados del mercado',
        equipment_points: 'Puntos de estatus de equipamiento',
        ginseng_points: 'Puntos de estatus de los potenciadores',
        club_points: 'Puntos de estatus del club',
        Xp: 'XP',
        starting: 'Principiante',
        common: 'Común',
        rare: 'Raro',
        epic: 'Épico',
        legendary: 'Legendario',
        mythic: 'Mítica',
        day: 'd',
        hour: 'h',
        minute: 'm',
        second: 's',
        demote_up: 'Para <em><u>descender</u></em>, puedes tener un máximo de <em>{{points}}</em> puntos',
        demote_down: 'Para <em><u>descender</u></em>, debes ser superado por <em>{{players}}</em> jugadores',
        demote_holdzero: 'Para <em><u>descender</u></em>, debes mantenerte en <em>0</em> puntos',
        stagnate_up: 'Para <em><u>no promocionar</u></em>, puedes tener un máximo de <em>{{points}}</em> puntos',
        stagnate_down: 'Para <em><u>no promocionar</u></em>, debes ser superado por <em>{{players}}</em> jugadores',
        stagnate_atzero: 'Para <em><u>no descender</u></em>, debes tener más de <em>0</em> puntos',
        top4_up: 'Para <em><u>estar entre los 4 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        top4_hold: 'Para <em><u>quedar entre los 4 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        top15_up: 'Para <em><u>estar entre los 15 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        top15_hold: 'Para <em><u>quedar entre los 15 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        top30_up: 'Para <em><u>estar entre los 30 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        top30_hold: 'Para <em><u>quedar entre los 30 primeros</u></em>, debes tener un mínimo de <em>{{points}}</em> puntos',
        challenges_regen: 'Regeneracion naturel: ',
        challenges_left: '<br />Retos pendientes: ',
        pop: 'Lugares',
        season: 'Temporada',
        full_in: 'Completa',
        ends_at: 'Termina a',
        full: 'Completa',
        league: 'Liga',
        boosters_end: 'Fin potenciadores',
        victories: 'Victorias',
        defeats: 'Derrota',
        unknown: 'Desconocido',
        opponents: 'Opositores',
        notPlayed: 'No jugado',
        leaguePoints: 'Puntos',
        avg: 'Media',
        levelRange: 'Rango de nivel',
        league_ending: 'Liga termina el ',
        league_finished: 'Liga terminó el ',
        current_league: 'Liga actual',
        averageScore: 'Puntuación media por combate: ',
        scoreExpected: 'Puntuación esperada: ',
        available_girls: 'Chicas disponibles: ',
        fights: 'Fights',
        won_mojo: 'Won mojo',
        lost_mojo: 'Lost mojo',
        won_mojo_avg: 'Won mojo average',
        lost_mojo_avg: 'Lost mojo average',
        mojo_avg: 'Global mojo average',
        filter: 'Filtro',
        searched_name : 'Nombre buscado',
        girl_name: 'Nombre de la chica',
        searched_class: 'Clase buscada',
        searched_rarity: 'Rareza buscada',
        team_number: 'Equipo #',
        all: 'Todo',
        team: 'Equipo',
        save_as: 'Guardar como',
        load_from: 'Carga',
        level_range: 'Rango de nivel',
        searched_aff_category: 'Categoría de afecto buscada',
        searched_aff_lvl: 'Nivel de afecto buscado',
        zero_star: '0 estrella',
        one_star: '1 estrella',
        two_stars: '2 estrellas',
        three_stars: '3 estrellas',
        four_stars: '4 estrellas',
        five_stars: '5 estrellas',
        six_stars: '6 estrellas',
        combativity: 'Combatividad',
        energy: 'Energía',
        sort: 'Ordenar',
        hide: 'Ocultar',
        display: 'Mostrar',
        searched_blessed_attributes: 'Buscar chicas bendecidas',
        blessed_attributes: 'Benditas chicas',
        non_blessed_attributes: 'Chicas no bendecidas',
        total_rewards: 'Recompensas totales guardadas ({{contests}} Competiciones):',
        contests_warning: '¡Los Competiciones caducan después de 21 días!',
        clubChampDuration: '{{duration}} desde el comienzo de la ronda'
    },
    it: {
        optionsRefresh: 'Refresh pagina Home',
        optionsVillain: 'Menù battaglia Troll',
        optionsTiers: 'Mostra battaglie con ragazze',
        optionsXPMoney : 'Migliora XP / soldi',
        optionsMarket: 'Informazioni negozio',
        optionsMarketFilter: 'Filtro per ragazze nel mercato',
        optionsMarket_XP_Aff: 'XP e affetto nel mercato',
        optionsSortArmorItems: 'Pulsante per ordinare l\'equipaggiamento per rarità',
        optionsHideSellButton: 'Pulsante per nascondere il pulsante "Vendi"',
        optionsHarem: 'Informazioni Harem',
        optionsLeague: 'Informazioni sulle Leghe',
        optionsLeagueBoard: 'Mostra i top della lega',
        optionsLeaguePromo: 'Mostra informazioni sulla promozione',
        optionsSimFight: 'Simulazione Leghe / Stagione / Troll',
        optionsLogSimFight : 'Accesso dettagliato nella console del browser',
        optionsTeamsFilter: 'Filtro delle squadre',
        optionsChampions: 'Informazioni sui Campioni',
        optionsLinks: 'Scorciatoie/Timer',
        optionsSeasonStats: 'Season stats',
        optionsPachinkoNames: 'Mostra i nomi nel Pachinko',
        //optionsEpicPachinkoNames: 'Mostra i nomi nel Pachinko Epico',
        optionsMissionsBackground: 'Cambiare lo sfondo delle missioni',
        optionsCollectMoneyAnimation: 'Disattivare l\'animazione di raccolta dei soldi',
        optionsContestSummary: 'Riepilogo dei premi salvati dei contest',
        optionsBattleEndstate: 'Mostra i valori finali dopo aver saltato la battaglia.',
        and: 'e',
        or: 'o',
        in: 'in',
        affection: 'affetto',
        harem_stats: 'Stato dell\'Harem',
        haremettes: 'ragazze dell\'harem',
        hardcore: 'Prono',
        charm: 'Fascino',
        knowhow: 'Competenza',
        shagger: 'Scopata',
        lover: 'Amante',
        expert: 'Esperto',
        Defense_against: 'Difesa contro ',
        specialist_in: 'specialista in ',
        harem_level: 'livello harem',
        to_go: 'mancanti',
        unlocked_scenes: 'scene sbloccate',
        money_income: 'Guadagni',
        per_hour: 'orario',
        when_all_collectable: 'quando si può raccogliere tutto',
        required_to_unlock: 'Necessario per sbloccare tutte le scene',
        required_to_get_max_level: 'Necessario per livellare tutte le ragazze',
        my_stocks: 'Mio inventario',
        equipments: 'equipaggiamento',
        boosters: 'potenziamenti',
        books: 'libri',
        gifts: 'regali',
        currently_buyable: 'Attualmente acquistabili',
        visit_the: 'Visita il <a href="../shop.html">negozio</a> prima.',
        visit_teams: 'Visita le <a href="../teams.html">Squadre</a> prima.',
        not_compatible: 'Il tuo browser non è compatibile.',
        or_level: 'o livello',
        restock: 'Rifornimento',
        wiki: ' -> wiki',
        evolution_costs: 'Il costo del potenziamento è',
        world: 'Mondo ',
        villain: ' nemico',
        fight_villain: 'Combattimenti',
        you_own: 'Possiedi',
        you_can_give: 'Puoi dare un massimo di',
        you_can_sell: 'Puoi vendere tutto per',
        stat_points_need: 'Punti statistica necessari per il massimo',
        money_need: 'Soldi necessari per il massimo',
        money_spent: 'Soldi spesi al negozio',
        points_from_level: 'Punti acquisiti da aumento livello',
        bought_points: 'Punti comprati al negozio',
        equipment_points: 'Punti statistica da equipaggiamento',
        ginseng_points: 'Punti statistica dei potenziamenti',
        club_points: 'Punti statistica bonus del Club',
        Xp: 'XP',
        starting: 'Starter',
        common: 'Comuni',
        rare: 'Rare',
        epic: 'Epiche',
        legendary: 'Leggendarie',
        mythic: 'Mitiche',
        day: 'g',
        hour: 'h',
        minute: 'm',
        second: 's',
        demote_up: 'Per <em><u>retrocedere</u></em>, puoi avere al massimo <em>{{points}}</em> punti',
        demote_down: 'Per <em><u>retrocedere</u></em>, devi essere sorpassato da <em>{{players}}</em> giocatori',
        demote_holdzero: 'Per <em><u>retrocedere</u></em>, devi rimanere a <em>0</em> punti',
        stagnate_up: 'Per <em><u>non essere promosso</u></em>, puoi avere al massimo <em>{{points}}</em> punti',
        stagnate_down: 'Per <em><u>non essere promosso</u></em>, devi essere sorpassato da <em>{{players}}</em> giocatori',
        stagnate_atzero: 'Per <em><u>non retrocedere</u></em>, devi avere più di <em>0</em> punti',
        top4_up: 'Per <em><u>essere tra i primi 4</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        top4_hold: 'Per <em><u>rimanere tra i primi 4</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        top15_up: 'Per <em><u>essere tra i primi 15</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        top15_hold: 'Per <em><u>rimanere tra i primi 15</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        top30_up: 'Per <em><u>essere tra i primi 30</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        top30_hold: 'Per <em><u>rimanere tra i primi 30</u></em>, devi avere un minimo di <em>{{points}}</em> punti',
        challenges_regen: 'Rigenerazione naturale: ',
        challenges_left: '<br />Combattimenti mancanti: ',
        pop: 'Luoghi',
        season: 'Stagione',
        full_in: 'Piena tra',
        ends_at: 'Termina alle',
        full: 'Piena',
        league: 'Leghe',
        boosters_end: 'Fine potenz.',
        victories: 'Vittorie',
        defeats: 'Sconfitte',
        unknown: 'Sconosciuto',
        opponents: 'Avversari',
        notPlayed: 'Non giocato',
        leaguePoints: 'Punti',
        avg: 'Media',
        levelRange: 'Gamma di livelli',
        league_ending: 'Fine della lega il ',
        league_finished: 'Lega finita il ',
        current_league: 'Lega attuale',
        averageScore: 'Punteggio medio per combattimento: ',
        scoreExpected: 'Punteggio previsto: ',
        available_girls: 'Ragazze disponibili: ',
        fights: 'Combattimenti',
        won_mojo: 'Mojo vinto',
        lost_mojo: 'Mojo perso',
        won_mojo_avg: 'Media mojo vinto',
        lost_mojo_avg: 'Media mojo perso',
        mojo_avg: 'Media mojo globale',
        filter: 'Filtro',
        searched_name : 'Nome ricercato',
        girl_name: 'Nome della ragazza',
        searched_class: 'Classe ricercata',
        searched_rarity: 'Rarità ricercata',
        team_number: 'Squadra #',
        all: 'Tutti',
        team: 'Squadra',
        save_as: 'Salva come',
        load_from: 'Carica',
        level_range: 'Gamma di livelli',
        searched_aff_category: 'Categoria di affetto ricercata',
        searched_aff_lvl: 'Livello di affetto ricercato',
        zero_star: '0 stella',
        one_star: '1 stella',
        two_stars: '2 stelle',
        three_stars: '3 stelle',
        four_stars: '4 stelle',
        five_stars: '5 stelle',
        six_stars: '6 stelle',
        combativity: 'Combattività',
        energy: 'Energia',
        sort: 'Ordina',
        hide: 'Nascondi',
        display: 'Visualizza',
        searched_blessed_attributes: 'Ricerca ragazze benedette',
        blessed_attributes: 'Ragazze benedette',
        non_blessed_attributes: 'Ragazze non benedette',
        total_rewards: 'Ricompense totali salvate ({{contests}} contest):',
        contests_warning: 'I contest scadono dopo 21 giorni!'
    },
    de: {
        optionsRefresh: 'Homepage aktualisieren',
        optionsVillain: 'Widersacher-Menü',
        optionsTiers: 'Stufen mit Girls anzeigen',
        optionsXPMoney : 'Migliora XP / soldi',
        optionsMarket: 'Marktplatz-Informationen',
        optionsMarketFilter: 'Mädchenfilter auf dem Markt',
        optionsMarket_XP_Aff: 'XP und Zuneigung auf dem Markt',
        optionsSortArmorItems: 'Schaltfläche zum Sortieren von Rüstungsgegenständen nach Seltenheit',
        optionsHideSellButton: 'Schaltfläche zum Ausblenden der Schaltfläche "Verkaufen"',
        optionsHarem: 'Harem-Informationen',
        optionsLeague: 'Liga-Informationen',
        optionsLeagueBoard: 'Die Liga-Spitzen anzeigen',
        optionsLeaguePromo: 'Werbeinformationen anzeigen',
        optionsSimFight: 'Liga/Saison/Widersacher-Simulation',
        optionsLogSimFight: 'Detaillierte Protokollierung in der Browserkonsole',
        optionsTeamsFilter: 'Mannschaften filtern',
        optionsChampions: 'Champion-Informationen',
        optionsLinks: 'Abkürzungen/Zeitgeber',
        optionsSeasonStats: 'Season stats',
        optionsPachinkoNames: 'Namen in Pachinko anzeigen',
        //optionsEpicPachinkoNames: 'Namen in Episch Pachinko anzeigen',
        optionsMissionsBackground: 'Missionshintergrund ändern',
        optionsCollectMoneyAnimation: 'Deaktivieren Sie die Animation "Geld sammeln"',
        optionsContestSummary: 'Zusammenfassung der gespeicherten Wettbewerbsprämien',
        optionsBattleEndstate: 'Endgültige Werte beim Überspringen des Kampfes anzeigen',
        optionsGemStock: 'Verfügbare Juwele im Markt/Harem',
        and: 'und',
        or: 'oder',
        in: 'in',
        affection: 'Zuneigung',
        harem_stats: 'Harem-Statistiken',
        haremettes: 'Harem-Mädchen',
        hardcore: 'Hardcore',
        charm: 'Charme',
        knowhow: 'Wissen',
        shagger: 'Stecher',
        lover: 'Liebhaber',
        expert: 'Experte',
        Defense_against: 'Verteidigung gegen ',
        specialist_in: 'spezialisiert auf ',
        harem_level: 'Harem-Level',
        to_go: 'übrig',
        unlocked_scenes: 'Szenen freigeschaltet',
        money_income: 'Einkommen',
        per_hour: 'pro Stunde',
        when_all_collectable: 'wenn komplett einsammelbar',
        required_to_unlock: 'Erforderlich für alle Mädchen-Upgrades',
        required_to_get_max_level: 'Erforderlich für maximale Mädchen-Level',
        my_stocks: 'Meine Bestände',
        equipments: 'Ausrüstungen',
        boosters: 'Booster',
        books: 'Bücher',
        gifts: 'Geschenke',
        currently_buyable: 'Aktuelle Marktangebote',
        visit_the: 'Besuche zuerst den <a href="../shop.html">Marktplatz</a>.',
        visit_teams: 'Besuche zuerst die <a href="../teams.html">Teams</a>.',
        not_compatible: 'Dein Browser ist nicht kompatibel.',
        or_level: 'oder Level',
        restock: 'neue Angebote',
        wiki: '-Wikiseite',
        evolution_costs: 'Die Upgradekosten betragen',
        world: 'Welt ',
        villain: ' Widersacher',
        fight_villain: 'Widersacher',
        you_own: 'Du besitzt',
        you_can_give: 'Insgesamt verteilbar:',
        you_can_sell: 'Du kannst alles verkaufen für',
        stat_points_need: 'benötigte Statuspunkte bis Maximum',
        money_need: 'nötiges Geld bis Maximum',
        money_spent: 'bisher ausgegeben',
        points_from_level: 'Statuspunkte durch Heldenlevel',
        bought_points: 'gekaufte Statuspunkte',
        equipment_points: 'Statuspunkte durch Ausrüstung',
        ginseng_points: 'Statuspunkte durch Booster',
        club_points: 'Statuspunkte durch Club-Boni',
        Xp: 'XP',
        starting: 'Starter',
        common: 'Gewöhnlich',
        rare: 'Selten',
        epic: 'Episch',
        legendary: 'Legendär',
        mythic: 'Mythisch',
        day: 'd',
        hour: 'h',
        minute: 'm',
        second: 's',
        demote_up: 'Um <em><u>abzusteigen</u></em>, darfst du maximal <em>{{points}}</em> Punkte haben',
        demote_down: 'Um <em><u>abzusteigen</u></em>, musst du von <em>{{players}}</em> Spielern überholt werden',
        demote_holdzero: 'Um <em><u>abzusteigen</u></em>, musst du bei <em>0</em> Punkten bleiben',
        stagnate_up: 'Um <em><u>nicht aufzusteigen</u></em>, darfst du maximal <em>{{points}}</em> Punkte haben',
        stagnate_down: 'Um <em><u>nicht aufzusteigen</u></em>, musst du von <em>{{players}}</em> Spielern überholt werden',
        stagnate_atzero: 'Um <em><u>nicht abzusteigen</u></em>, musst du mehr als <em>0</em> Punkte',
        top4_up: 'Um <em><u>in die Top 4 zu kommen</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        top4_hold: 'Um <em><u>in den Top 4 zu bleiben</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        top15_up: 'Um <em><u>in die Top 15 zu kommen</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        top15_hold: 'Um <em><u>in den Top 15 zu bleiben</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        top30_up: 'Um <em><u>in die Top 30 zu kommen</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        top30_hold: 'Um <em><u>in den Top 30 zu bleiben</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
        challenges_regen: 'Regeneration: ',
        challenges_left: '<br />verbleibende Kämpfe: ',
        pop: 'Orte',
        season: 'Saison',
        full_in: 'Voll in',
        ends_at: 'Endet um',
        full: 'Voll',
        league: 'Liga',
        boosters_end: 'Booster enden',
        victories: 'Siege',
        defeats: 'Niederlagen',
        unknown: 'Unbekannt',
        opponents: 'Gegner',
        notPlayed: 'Nicht gespielt',
        leaguePoints: 'Punkte',
        avg: 'Mittelwert',
        levelRange: 'Level-Spanne',
        league_ending: 'Liga Ende ',
        league_finished: 'Liga endete am ',
        current_league: 'Aktuelle Liga',
        averageScore: 'Durchschnitt pro Kampf: ',
        scoreExpected: 'Erwartetes Ergebnis: ',
        available_girls: 'Freie Mädchen: ',
        fights: 'Kämpfe',
        won_mojo: 'gewonnenes Mojo',
        lost_mojo: 'verlorenes Mojo',
        won_mojo_avg: 'im Mittel gewonnenes Mojo',
        lost_mojo_avg: 'im Mittel verlorenes Mojo',
        mojo_avg: 'Globales mittleres Mojo',
        filter: 'Filter',
        searched_name : 'Name',
        girl_name: 'Name',
        searched_class: 'Klasse',
        searched_rarity: 'Seltenheit',
        team_number: 'Team #',
        all: 'Alle',
        team: 'Team',
        save_as: 'Speichern',
        load_from: 'Laden',
        level_range: 'Level',
        searched_aff_category: 'maximale Zuneigung',
        searched_aff_lvl: 'aktuelle Zuneigung',
        zero_star: '0 Sterne',
        one_star: '1 Stern',
        two_stars: '2 Sterne',
        three_stars: '3 Sterne',
        four_stars: '4 Sterne',
        five_stars: '5 Sterne',
        six_stars: '6 Sterne',
        combativity: 'Kampflust',
        energy: 'Energie',
        sort: 'Sortieren',
        hide: 'Ausblenden',
        display: 'Anzeigen',
        searched_blessed_attributes: 'Segnungen',
        blessed_attributes: 'gesegnet',
        non_blessed_attributes: 'nicht gesegnet',
        total_rewards: 'Gesamtzahl der gespeicherten Belohnungen ({{contests}} Wettbewerbe):',
        contests_warning: 'Wettbewerbe verfallen nach 21 Tagen!',
        clubChampDuration: '{{duration}} seit Rundenbeginn'
    }
};

const labels = texts[lang]
const label = (key) => (labels && labels[key]) || texts.en[key]

var tierGirlsID;

let locale = 'fr';
if (lang === 'en') {
    locale = 'en'
}
const localeDecimalSep = Number(1.1).toLocaleString(locale).replace(/[0-9]/g, '');
const parseLocaleFloat = (numStr) => parseFloat(numStr.split(localeDecimalSep).map(part => part.replace(/[^0-9]/g, '')).join('.'), 10);

// Parser for League stats
const parseLocaleRoundedInt = (numStr) => numStr.includes(localeDecimalSep) ? parseInt(numStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (numStr.includes('K')) ? parseInt(numStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(numStr.replace(/[^0-9]/gi, ''), 10);

// Numbers: thousand spacing
function nThousand(x) {
    if (typeof x != 'number') {
        x = 0;
    }
    return x.toLocaleString(locale).replace(' ', ' ');
}

// Numbers: rounding to K, M, G and T
function nRounding(num, digits, updown) {
    var power = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'B' },
        { value: 1E12, symbol: 'T' },
    ];
    var i;
    for (i = power.length - 1; i > 0; i--) {
        if (num >= power[i].value) {
            break;
        }
    }
    if (updown == 1) {
        return +(Math.ceil(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == 0) {
        return +(Math.round(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == -1) {
        return +(Math.floor(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
}

const onAjaxResponse = (pattern, callback)  => {
    $(document).ajaxComplete((evt, xhr, opt) => {
        if(~opt.data.search(pattern)) {
            if(!xhr.responseText.length) {
                return
            }
            const responseData = JSON.parse(xhr.responseText)
            if(!responseData || !responseData.success) {
                return
            }
            return callback(responseData, opt, xhr, evt)
        }
    })
}

if (isHH) {
    tierGirlsID = [
        ['8', '9', '10', '7270263', '979916751'],
        ['14', '13', '12', '318292466', '936580004'],
        ['19', '16', '18', '610468472', '54950499'],
        ['29', '28', '26', '4749652', '345655744'],
        ['39', '40', '41', '267784162', '763020698'],
        ['64', '63', '31', '406004250', '864899873'],
        ['85', '86', '84', '267120960', '536361248'],
        ['114', '115', '116', '379441499', '447396000'],
        ['1247315', '4649579', '7968301', '46227677', '933487713'],
        ['1379661', '4479579', '1800186', '985085118', '339765042'],
        ['24316446', '219651566', '501847856', '383709663', '90685795'],
        ['225365882', '478693885', '231765083', '155415482', '769649470'],
        ['86962133', '243793871', '284483399', 0, 0],
        ['612527302', '167231135', '560979916', '784911160', '549524850', '184523411', 0, 0]
    ];
}
else if (isGH) {
    tierGirlsID = [
        ['8', '9', '10', '7270263', '979916751'],
        ['14', '13', '12', '318292466', '936580004'],
        ['19', '16', '18', '610468472', '54950499'],
        ['29', '28', '26', '4749652', '345655744'],
        ['39', '40', '41', '267784162', '763020698'],
        ['64', '63', '31', '406004250', '864899873'],
        ['85', '86', '84', '267120960', '536361248'],
        ['114', '115', '116', '379441499', '447396000'],
        ['1247315', '4649579', '7968301', '46227677', '933487713'],
        ['1379661', '4479579', '1800186', 0, 0],
    ];
}
else if (isCxH) {
    tierGirlsID = [
        ['830009523', '907801218', '943323021', 0, 0],
        ['271746999', '303805209', '701946373', 0, 0],
        ['943255266', '977228200', '743748788', 0, 0],
        ['514994766', '140401381', '232860230', 0, 0]
    ];
}

const XP_MULTIPLIERS = {
    STARTING: 1,
    COMMON: 1,
    RARE: 1.2,
    EPIC: 1.4,
    LEGENDARY: 1.6,
    MYTHIC: 4,
}

const buildCumulativeXPForRarity = (multiplier) => Array((window.GIRL_MAX_LEVEL || HH_MAX_LEVEL) - 1).fill().map((_,i) => Math.ceil(10*multiplier*(Math.pow(1.0075,i)))).reduce((a,x,i) => {a.push(x + (i===0?0:a[a.length-1]));return a}, [])

const GIRLS_EXP_LEVELS = {
    starting: buildCumulativeXPForRarity(XP_MULTIPLIERS.STARTING),
    common: buildCumulativeXPForRarity(XP_MULTIPLIERS.COMMON),
    rare: buildCumulativeXPForRarity(XP_MULTIPLIERS.RARE),
    epic: buildCumulativeXPForRarity(XP_MULTIPLIERS.EPIC),
    legendary: buildCumulativeXPForRarity(XP_MULTIPLIERS.LEGENDARY),
    mythic: buildCumulativeXPForRarity(XP_MULTIPLIERS.MYTHIC)
};

const MEAN_ICON_URI = "data:image/svg+xml,%3Csvg width='8mm' height='8mm' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cg aria-label='x' style='stroke-width:0.272511;fill:%23fff'%3E%3Cpath d='M 7.0395058,7.5271268 H 4.4234097 V 6.960306 H 5.1428362 L 3.9110909,5.270744 2.6793457,6.960306 H 3.4096725 V 7.5271268 H 1.2622937 V 6.960306 H 2.0144213 L 3.5731785,4.8129271 1.8509153,2.4366399 H 1.1532897 V 1.8698191 H 3.6821825 V 2.4366399 H 3.0063577 l 1.1881436,1.63506 1.1881437,-1.63506 H 4.619617 V 1.8698191 h 2.18008 V 2.4366399 H 6.0475694 L 4.5324138,4.5295167 6.2982786,6.960306 h 0.7412272 z'/%3E%3C/g%3E%3Cpath style='fill:none;stroke:%23fff;stroke-width:0.503;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' d='m 1.1597452,0.80972094 h 5.647'/%3E%3C/g%3E%3C/svg%3E"

/* =========
    OPTIONS
   ========= */
function loadSetting(e){
    try { var temp = JSON.parse(localStorage.getItem('HHS.'+e)) } catch(err) { temp = null }
    if (temp === null){
        if ( false
            // default values - only for those not using the ingame settings (an ingame saved setting overrides this)
            // leading '//' disables a feature by default
            ||e=='refresh'
            ||e=='villain'
            ||e=='tiers'
            ||e=='xpMoney'
            ||e=='market'
            ||e=='marketFilter'
            ||e=='market_XP_Aff'
            ||e=='sortArmorItems'
            ||e=='hideSellButton'
            ||e=='harem'
            ||e=='league'
            ||e=='leagueBoard'
            ||e=='leaguePromo'
            ||e=='simFight'
            //||e=='logSimFight'
            ||e=='teamsFilter'
            ||e=='champions'
            ||e=='links'
            ||e=='seasonStats'
            ||e=='pachinkoNames'
            //||e=='pachinkoNamesMulti'
            ||e=='missionsBackground'
            ||e=='collectMoneyAnimation'
            ||e=='contestRewards'
            ||e=='battleEndstate'
            ||e=='gemStock'
        ) return true
        return false
    }
    return temp
}

if (CurrentPage.indexOf('home') != -1) options();

// Show which modules are enabled and if so, run them when appropriate
if (loadSetting('refresh')) {
    if (CurrentPage.indexOf('home') != -1) {
        moduleRefresh();
    }
}
if (loadSetting('villain')) {
    try {
        moduleVillain();
    } catch(e) {}
}
if (loadSetting('xpMoney')) {
    try {
        moduleXP();
        moduleMoney();
    } catch(e) {}
}
if (loadSetting('market')) {
    if (CurrentPage.indexOf('shop') != -1) {
        moduleMarket();
    }
}
if (loadSetting('marketFilter')) {
    moduleMarketFilter();
}
if (loadSetting('market_XP_Aff')) {
    if (CurrentPage.indexOf('shop') != -1) {
        moduleMarket_XP_Aff();
    }
}
if (loadSetting('sortArmorItems')) {
    if (CurrentPage.indexOf('shop') != -1) {
        moduleSortArmorItems();
    }
}
if (loadSetting('hideSellButton')) {
    if (CurrentPage.indexOf('shop') != -1) {
        moduleHideSellButton();
    }
}
if (loadSetting('harem')) {
    if (CurrentPage.includes('harem') && !CurrentPage.includes('hero')) {
        moduleHarem();
    }
}
if (loadSetting('league')) {
        moduleLeague();
    }
if (loadSetting('simFight')) {
    if (CurrentPage.indexOf('tower-of-fame') != -1)
        moduleSim();
    if (CurrentPage.indexOf('season-arena') != -1)
        moduleSeasonSim();
    if (window.location.href.includes('/troll-pre-battle') || window.location.href.includes('/pantheon-pre-battle'))
        moduleBattleSim();
}
if (loadSetting('teamsFilter')) {
    moduleTeamsFilter();
}
if (loadSetting('champions')) {
    moduleChampions();
}
if (loadSetting('links')) {
    try {
        moduleLinks();
    } catch(e) {}
}
if (loadSetting('seasonStats')) {
    if (CurrentPage.indexOf('season-battle') != -1 || CurrentPage.indexOf('season') != -1) {
        moduleSeasonStats();
    }
}
if (loadSetting('pachinkoNames')) {
    modulePachinkoNames();
}
if (loadSetting('missionsBackground')) {
    moduleMissionsBackground();
}
if (loadSetting('collectMoneyAnimation')) {
    moduleCollectMoneyAnimation();
}
if (loadSetting('contestRewards')) {
    moduleContestRewards()
}
if (loadSetting('battleEndstate')) {
    moduleBattleEndstate()
}
if (loadSetting('gemStock')) {
    moduleGemStock()
}

function options() {

    // Options menu
    $('div#contains_all').append('<a href="#"><img src="https://i.postimg.cc/c1F37PYz/icon-options.png" id="hhsButton"></a>');
    $('div#contains_all').append('<div id="hhsOptions" class="hhsTooltip" style="display: none;">'
                                 + '<label class="switch"><input type="checkbox" hhs="refresh"><span class="slider"></span></label>' + texts[lang].optionsRefresh + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="villain"><span class="slider"></span></label>' + texts[lang].optionsVillain + '<br />'
                                 + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="tiers"><span class="slider"></span></label>' + texts[lang].optionsTiers + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="xpMoney"><span class="slider"></span></label>' + texts[lang].optionsXPMoney + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="market"><span class="slider"></span></label>' + texts[lang].optionsMarket + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="marketFilter"><span class="slider"></span></label>' + texts[lang].optionsMarketFilter + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="market_XP_Aff"><span class="slider"></span></label>' + texts[lang].optionsMarket_XP_Aff + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="sortArmorItems"><span class="slider"></span></label>' + texts[lang].optionsSortArmorItems + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="hideSellButton"><span class="slider"></span></label>' + texts[lang].optionsHideSellButton + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="harem"><span class="slider"></span></label>' + texts[lang].optionsHarem + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="league"><span class="slider"></span></label>' + texts[lang].optionsLeague + '<br />'
                                 + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="leagueBoard"><span class="slider"></span></label>' + texts[lang].optionsLeagueBoard + '<br />'
                                 + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="leaguePromo"><span class="slider"></span></label>' + texts[lang].optionsLeaguePromo + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="simFight"><span class="slider"></span></label>' + texts[lang].optionsSimFight + '<br />'
                                 + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="logSimFight"><span class="slider"></span></label>' + texts[lang].optionsLogSimFight + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="teamsFilter"><span class="slider"></span></label>' + texts[lang].optionsTeamsFilter + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="champions"><span class="slider"></span></label>' + texts[lang].optionsChampions + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="links"><span class="slider"></span></label>' + texts[lang].optionsLinks + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="seasonStats"><span class="slider"></span></label>' + texts[lang].optionsSeasonStats + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="pachinkoNames"><span class="slider"></span></label>' + texts[lang].optionsPachinkoNames + '<br />'
                                 //+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="pachinkoNamesMulti"><span class="slider"></span></label>' + texts[lang].optionsEpicPachinkoNames + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="missionsBackground"><span class="slider"></span></label>' + texts[lang].optionsMissionsBackground + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="collectMoneyAnimation"><span class="slider"></span></label>' + texts[lang].optionsCollectMoneyAnimation + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="contestRewards"><span class="slider"></span></label>' + label('optionsContestSummary') + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="battleEndstate"><span class="slider"></span></label>' + label('optionsBattleEndstate') + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="gemStock"><span class="slider"></span></label>' + label('optionsGemStock')
                                 + '</div>');

    // Show and hide options menu
    $('#hhsButton').click(function() {
        var x = document.getElementById('hhsOptions');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        }
        else {
            x.style.display = 'none';
        }
    });
    $('[hhs]').each(function(){
        $(this).attr('checked', loadSetting($(this).attr('hhs')))
    })
    $('[hhs]').click(function() {
        localStorage.setItem('HHS.'+$(this).attr('hhs'), $(this).prop('checked'))
    })

    // Dependency of villain menu options
    $('[hhs=villain]').click(function() {
        if (!$(this).is(':checked')) {
            $('[hhs=tiers]').prop('checked', false);
            localStorage.setItem('HHS.tiers', false)
        }
    });
    $('[hhs=tiers]').click(function() {
        if ($(this).is(':checked')) {
            $('[hhs=villain]').prop('checked', true);
            localStorage.setItem('HHS.villain', true)
        }
    });

    // Dependency of league info options
    $('[hhs=league]').click(function() {
        if (!$(this).is(':checked')) {
            $('[hhs=leagueBoard]').prop('checked', false);
            localStorage.setItem('HHS.leagueBoard', false)
            $('[hhs=leaguePromo]').prop('checked', false);
            localStorage.setItem('HHS.leaguePromo', false)
        }
    });
    $('[hhs=leagueBoard]').click(function() {
        if ($(this).is(':checked')) {
            $('[hhs=league]').prop('checked', true);
            localStorage.setItem('HHS.league', true)
        }
    });
    $('[hhs=leaguePromo]').click(function() {
        if ($(this).is(':checked')) {
            $('[hhs=league]').prop('checked', true);
            localStorage.setItem('HHS.league', true)
        }
    });

    // Dependency of fight simulation options
    $('[hhs=simFight]').click(function() {
        if (!$(this).is(':checked')) {
            $('[hhs=logSimFight]').prop('checked', false);
            localStorage.setItem('HHS.logSimFight', false)
        }
    });
    $('[hhs=logSimFight]').click(function() {
        if ($(this).is(':checked')) {
            $('[hhs=simFight]').prop('checked', true);
            localStorage.setItem('HHS.simFight', true)
        }
    });

    //CSS
    sheet.insertRule('#hhsButton {'
                     + 'height: 35px; '
                     + 'position: absolute; '
                     + 'top: 85px; '
                     + 'right: 15px; '
                     + 'filter: drop-shadow(0px 0px 5px white);}'
                    );

    sheet.insertRule('.hhsTooltip {'
                     + 'font-size: 12px; '
                     + 'text-align: left; '
                     + 'z-index: 99; '
                     + 'padding: 3px 5px 3px 5px; '
                     + 'border: 2px solid #905312; '
                     + 'border-radius: 6px; '
                     + 'background-color: rgba(32,3,7,.9); '
                     + 'position: absolute; right: 55px; top: 85px;}'
                    );

    sheet.insertRule('.switch {'
                     + 'position: relative; '
                     + 'display: inline-block; '
                     + 'width: 34px; '
                     + 'height: 17px;}'
                    );

    sheet.insertRule('.slider {'
                     + 'position: absolute; '
                     + 'cursor: pointer; '
                     + 'top: 0; '
                     + 'left: 0; '
                     + 'right: 0; '
                     + 'bottom: 0; '
                     + 'background-color: #CCCCCC; '
                     + '-webkit-transition: .4s; '
                     + 'transition: .4s; '
                     + 'border-radius: 17px; '
                     + 'margin-right: 4px;}'
                    );

    sheet.insertRule('.slider:before {'
                     + 'position: absolute; '
                     + 'content: \'\'; '
                     + 'height: 13px; '
                     + 'width: 13px; '
                     + 'left: 2px; '
                     + 'bottom: 2px; '
                     + 'background-color: white; '
                     + '-webkit-transition: .4s; '
                     + 'transition: .4s; '
                     + 'border-radius: 50%;}'
                    );

    sheet.insertRule('input:checked + .slider {'
                     + 'background-color: #F11F64;}'
                    );

    sheet.insertRule('input:checked + .slider:before {'
                     + '-webkit-transform: translateX(13px); '
                     + '-ms-transform: translateX(13px); '
                     + 'transform: translateX(13px);}'
                    );
}

/* =====================
    HOME SCREEN REFRESH
   ===================== */

function moduleRefresh() {
    setInterval(function() {
        window.location.reload();
    }, 600000);
}

/* ======================
    FIGHT A VILLAIN MENU
   ====================== */

function moduleVillain() {
    //Create localStorage if it doesn't exist yet
    if (localStorage.getItem('eventTrolls') === null) {
        localStorage.setItem('eventTrolls', '[]');
    }
    if (localStorage.getItem('mythicEventTrolls') === null) {
        localStorage.setItem('mythicEventTrolls', '[]');
    }
    if (localStorage.getItem('tierGirlsOwned') === null) {
        localStorage.setItem('tierGirlsOwned', '[[], [], [], [], [], [], [], [], [], [], [], [], [], []]');
    }

    let eventTrolls = JSON.parse(localStorage.getItem('eventTrolls'));
    let mythicEventTrolls = JSON.parse(localStorage.getItem('mythicEventTrolls'));
    let tierGirlsOwned = JSON.parse(localStorage.getItem('tierGirlsOwned'));
    const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    let includeTiers = false;
    let eventEndTime = localStorage.getItem('eventTime') || 0;
    let mythicEventEndTime = localStorage.getItem('mythicEventTime') || 0;

    if (loadSetting('tiers'))
        includeTiers = true;

    if (Math.floor(new Date().getTime()/1000) > eventEndTime)
        localStorage.removeItem('eventTrolls');

    if (Math.floor(new Date().getTime()/1000) > mythicEventEndTime)
        localStorage.removeItem('mythicEventTrolls');

    if (window.location.search.includes("tab=event")) {
        let eventRemainingTime = parseInt($('#contains_all #events .nc-panel-header .nc-pull-right #timer').attr("data-seconds-until-event-end"), 10);
        eventEndTime = Math.floor(new Date().getTime()/1000) + eventRemainingTime;
        localStorage.setItem('eventTime', eventEndTime);

        eventTrolls = [];

        eventGirls.forEach(girl => {
            const {id_girl: id, source, rarity} = girl
            if (source.name !== 'event_troll') {
                return
            }
            const sourceUrl = source.anchor_source.url
            const matches = sourceUrl.match(/id_opponent=([0-9]+)/)
            if (matches) {
                const troll = matches[1]
                eventTrolls.push({id, troll, rarity})
            }
        })
        localStorage.setItem('eventTrolls', JSON.stringify(eventTrolls));
    }

    if (window.location.search.includes("tab=mythic_event")) {
        let eventRemainingTime = parseInt($('#contains_all #events .nc-panel-header .nc-pull-right #timer').attr("data-seconds-until-event-end"), 10);
        mythicEventEndTime = Math.floor(new Date().getTime()/1000) + eventRemainingTime;
        localStorage.setItem('mythicEventTime', mythicEventEndTime);

        mythicEventTrolls = [];

        eventGirls.forEach(girl => {
            const {id_girl: id, source, rarity} = girl
            if (source.name !== 'event_troll') {
                return
            }
            const sourceUrl = source.anchor_source.url
            const matches = sourceUrl.match(/id_opponent=([0-9]+)/)
            if (matches) {
                const troll = matches[1]
                eventTrolls.push({id, troll, rarity})
            }
        })
        localStorage.setItem('mythicEventTrolls', JSON.stringify(mythicEventTrolls));
    }

    if (CurrentPage.indexOf('home') != -1) {
        if (includeTiers) {
            //Check if villain tier girls have been collected
            tierGirlsOwned = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

            for (var tIdx = 0; tIdx < tierGirlsID.length; tIdx++) {
                for (var gIdx = 0; gIdx < tierGirlsID[tIdx].length; gIdx++) {
                    var idGirl = tierGirlsID[tIdx][gIdx];
                    if (idGirl == "0") {
                        tierGirlsOwned[tIdx][gIdx] = true;
                    }
                    else if (girlDictionary.get(idGirl) == undefined) {
                        tierGirlsOwned[tIdx][gIdx] = false;
                    }
                    else {
                        if (girlDictionary.get(idGirl).shards == 100) {
                            tierGirlsOwned[tIdx][gIdx] = true;
                        }
                        else {
                            tierGirlsOwned[tIdx][gIdx] = false;
                        }
                    }
                }

            }
            localStorage.setItem('tierGirlsOwned', JSON.stringify(tierGirlsOwned));
        }
}

    //Add the actual menu
    var trolls;
    if (isHH) {
        trolls = ['Dark Lord', 'Ninja Spy', 'Gruntt', 'Edwarda', 'Donatien', 'Silvanus', 'Bremen', 'Finalmecia', 'Roko Senseï', 'Karole', 'Jackson&#8217;s Crew', 'Pandora Witch', 'Nike', 'Sake'];
        if (lang == 'fr') {
            trolls[1] = 'Espion Ninja';
            trolls[10] = 'Éq. de Jackson';
            trolls[11] = 'Sorcière Pandora';
        }
        if (lang == 'es') {
            trolls[0] = 'Señor Oscuro';
            trolls[1] = 'Ninja espía';
        }
        if (lang == 'it') {
            trolls[0] = 'Signore Oscuro';
            trolls[1] = 'Spia Ninja';
            trolls[10] ='Ciurma di Jackson';
            trolls[11] ='Strega Pandora';
        }
        if (lang == 'de') {
            trolls[0] = 'Dunkler Lord';
            trolls[1] = 'Ninja Spion';
            trolls[10] = 'Jacksons Crew';
            trolls[11] = 'Pandora Hexe';
        }
    }
    else if (isCxH) {
        trolls = ['BodyHack', 'Grey Golem', 'The Nymph', 'Athicus Ho’ole'];
    }
    else if (isGH) {
        trolls = ['Dark Lord', 'Ninja Spy', 'Gruntt', 'Edward', 'Donatien', 'Silvanus', 'Bremen', 'Edernas', 'Roko Senseï', 'Maro'];
        if (lang == 'fr') {
            trolls[1] = 'Espion Ninja';
        }
        if (lang == 'es') {
            trolls[0] = 'Señor Oscuro';
            trolls[1] = 'Ninja espía';
        }
        if (lang == 'it') {
            trolls[0] = 'Signore Oscuro';
            trolls[1] = 'Spia Ninja';
        }
        if (lang == 'de') {
            trolls[0] = 'Dunkler Lord';
            trolls[1] = 'Ninja Spion';
        }
    }

    var currentWorld = Hero.infos.questing.id_world,
        trollName = '',
        trollNameTiers = '',
        trollsMenu = '';

    for (var i = 0; i < (currentWorld-1); i++) {
        if (typeof trolls[i] !== typeof undefined && trolls[i] !== false) {
            trollName = trolls[i];
            if (includeTiers) {
                trollNameTiers = ' ';

                // assume all but the last 2 are on Tier 1
                if (tierGirlsOwned[i].slice(0, tierGirlsOwned[i].length - 2).some(owned => !owned)) {
                    trollNameTiers = trollNameTiers + '&#185;';
                }
                if (!(tierGirlsOwned[i][tierGirlsOwned[i].length - 2])) {
                    trollNameTiers = trollNameTiers + '&#178;';
                }
                if (!(tierGirlsOwned[i][tierGirlsOwned[i].length - 1])) {
                    trollNameTiers = trollNameTiers + '&#179;';
                }
            }
        }
        else trollName = texts[lang].world + ' ' + (i + 2) + ' ' + texts[lang].villain;
        var type = 'regular';
        for (var j = 0, len = eventTrolls.length; j < len; j++) {
            let shards = (girlDictionary.get(eventTrolls[j].id) != undefined) ? girlDictionary.get(eventTrolls[j].id).shards : 0;
            if (eventTrolls[j].troll == (i + 1) && shards != 100) {
                type = 'eventTroll ' + eventTrolls[j].rarity;
            }
        }
        for (var k = 0, l = mythicEventTrolls.length; k < l; k++) {
            let shards = (girlDictionary.get(mythicEventTrolls[k].id) != undefined) ? girlDictionary.get(mythicEventTrolls[k].id).shards : 0;
            if (mythicEventTrolls[k].troll == (i + 1) && shards != 100) {
                type = 'mythicEventTroll';
            }
        }
        trollsMenu += '<a class="' + type + '" href="/troll-pre-battle.html?id_opponent=' + (i + 1) + '">' + trollName + trollNameTiers + '</a>';
    }

    $('#contains_all > header').children('[type=fight]').append('<div class="TrollsMenu" id="TrollsID">' + trollsMenu + '</div>');

    //CSS
    sheet.insertRule(`
        .TrollsMenu {
            position: absolute;
            z-index: 35;
            display: none;
            border-radius: 0px 0px 8px 8px;
            background-color: rgba(0,0,0,.8);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.73);
            font-weight: ${gameConfig.trollMenuFontWeight};
            letter-spacing: .22px;
            color: #fff;
            text-align: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 400ms, visibility 400ms;
        }
    `);

    sheet.insertRule(`
        ${mediaDesktop} {
            .TrollsMenu {
                width: 88%;
                margin: 34px 0 0 34px;
                font-size: 14px;
                line-height: 22px;
            }
        }
    `);

    sheet.insertRule(`
        ${mediaMobile} {
            .TrollsMenu {
                width: 200%;
                margin: 64px 0 0 -79px;
                font-size: 16px;
                line-height: 45px;
                grid-template-columns: 1fr 1fr;
                grid-auto-flow: row;
            }
        }
    `);

    sheet.insertRule(`
        .energy_counter:hover > .TrollsMenu {
            opacity: 1;
            display: grid;
            visibility: visible;
        }
    `);

    sheet.insertRule('#TrollsID a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#TrollsID a:hover {'
                     + 'color: rgb(255, 247, 204); '
                     + 'text-decoration: underline;}'
                    );

    sheet.insertRule('.TrollsMenu a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('.eventTroll {'
                     + 'color: #f70 !important;}'
                    );

    sheet.insertRule('.eventTroll:hover {'
                     + 'color: #fa0 !important;}'
                    );

    sheet.insertRule('.eventTroll.common {'
                     + 'color: #8d8e9f !important;}'
                    );

    sheet.insertRule('.eventTroll.common:hover {'
                     + 'color: #b4b5c9 !important;}'
                    );

    sheet.insertRule('.eventTroll.rare {'
                     + 'color: #23b56b !important;}'
                    );

    sheet.insertRule('.eventTroll.rare:hover {'
                     + 'color: #2bdf84 !important;}'
                    );

    sheet.insertRule('.eventTroll.epic {'
                     + 'color: #ffb244 !important;}'
                    );

    sheet.insertRule('.eventTroll.epic:hover {'
                     + 'color: #ffc97b !important;}'
                    );

    sheet.insertRule('.eventTroll.legendary {'
                     + 'color: #9370db !important;}'
                    );

    sheet.insertRule('.eventTroll.legendary:hover {'
                     + 'color: #b19cd9 !important;}'
                    );

    sheet.insertRule('.mythicEventTroll {'
                     + 'color: #ec0039 !important;}'
                    );

    sheet.insertRule('.mythicEventTroll:hover {'
                     + 'color: #ff003e !important;}'
                    );
}

/* ===========
    BETTER XP
   =========== */

function moduleXP() {
    function betterXP() {
        $('span[hero="xp"]').empty().append('Next: ');
        $('span[hero="xp_sep"]').empty().append(nThousand(Hero.infos.Xp.left));
        $('span[hero="xp_max"]').empty().append(' XP');
    };

    betterXP();

    $('.button_glow').click(function() {
        setInterval(function() {
            betterXP();
        }, 3000)
    });
}

/* ==============
    BETTER MONEY
   ============== */

function moduleMoney() {
    function betterMoney() {
        if (Hero.infos.soft_currency >= 1000000) {
            $('div[hero="soft_currency"]').empty().append(nRounding(Hero.infos.soft_currency, 3, -1));
        }
    };

    betterMoney();

    $('.button_glow').click(function() {
        setInterval(function() {
            betterMoney();
        }, 3000)
    });

    $('#collect_all').click(function() {
        setInterval(function() {
            betterMoney();
        }, 3000)
    });

    $('.collect_money').click(function() {
        setInterval(function() {
            betterMoney();
        }, 3000)
    });
}

/* ====================
    MARKET INFORMATION
   ==================== */

function moduleMarket() {
    var loc2 = $('.hero_stats').children();
    loc2.each(function() {
        var stat = $(this).attr('hero');
        if (stat == 'carac1' || stat == 'carac2' || stat == 'carac3') {
            $(this).append('<span class="CustomStats"></span><div id="CustomStats' + stat + '" class="StatsTooltip"></div>');
        }
    });

    updateStats();

    function updateStats() {
        var loc2 = $('.hero_stats').children();
        var last_cost = 0,
            levelMoney = 0,
            levelPoints = Hero.infos.level * 30;
        levelMoney = calculateTotalPrice(levelPoints);
        loc2.each(function() {
            var stat = $(this).attr('hero');
            $('.CustomStats').html('');
            if (stat == 'carac1' || stat == 'carac2' || stat == 'carac3') {
                var boughtPoints = Hero.infos[stat],
                    remainingPoints = levelPoints - boughtPoints,
                    spentMoney = calculateTotalPrice(boughtPoints),
                    remainingMoney = levelMoney - spentMoney;

                var totalPoints = Hero.infos.caracs[stat];

                let perLevelBase = 9;
                const caracNum = parseInt(stat.substr(5), 10);
                switch(caracNum) {
                    case classRelationships[Hero.infos.class].s:
                        perLevelBase = 7;
                        break;
                    case classRelationships[Hero.infos.class].t:
                        perLevelBase = 5;
                        break;
                }
                var skillPoints = Hero.infos.level * perLevelBase;

                var equipmentsData = $('.armor#equiped .armor').children(),
                    itemPoints = 0;
                equipmentsData.each(function() {
                    if ($(this).attr('class') != 'slot empty') {
                        var equipmentsStats = $(this).attr('data-d'),
                            statPosStart = equipmentsStats.indexOf(stat + '_equip') + 15,
                            statPosEnd = equipmentsStats.substr(statPosStart).indexOf(',');
                        itemPoints = itemPoints + parseInt(equipmentsStats.substr(statPosStart, statPosEnd - 1), 10);
                    }});

                var boostersData = $('.armor#equiped .sub_block .booster').children(),
                    ginsengPoints = 0,
                    ginsengLegendary = 0;
                boostersData.each(function() {
                    if ($(this).attr('class') != 'slot empty') {
                        if ($(this).attr('id_item') == '7') {
                            ginsengPoints = ginsengPoints + 100;
                        }
                        else if ($(this).attr('id_item') == '8') {
                            ginsengPoints = ginsengPoints + 350;
                        }
                        else if ($(this).attr('id_item') == '9') {
                            ginsengPoints = ginsengPoints + 1225;
                        }
                        else if ($(this).attr('id_item') == '316') {
                            ginsengLegendary = ginsengLegendary + 1;
                        }
                    }
                });
                ginsengPoints = ginsengPoints + Math.ceil((skillPoints + boughtPoints + itemPoints + ginsengPoints) * 0.06 * ginsengLegendary);

                var clubPoints = totalPoints - skillPoints - boughtPoints - itemPoints - ginsengPoints;

                $('#CustomStats' + stat).html(
                    '<b>' + texts[lang].stat_points_need + ':</b> ' + nThousand(remainingPoints) + '<br />' +
                    '<b>' + texts[lang].money_need + ':</b> ' + nThousand(remainingMoney) + '<br />' +
                    '<b>' + texts[lang].money_spent + ':</b> ' + nThousand(spentMoney) + '<br /><br />' +
                    '<b>' + texts[lang].points_from_level + ':</b> ' + nThousand(skillPoints) + '<br />' +
                    '<b>' + texts[lang].bought_points + ':</b> ' + nThousand(boughtPoints) + '<br />' +
                    '<b>' + texts[lang].equipment_points + ':</b> ' + nThousand(itemPoints) + '<br />' +
                    '<b>' + texts[lang].ginseng_points + ':</b> ' + nThousand(ginsengPoints) + '<br />' +
                    '<b>' + texts[lang].club_points + ':</b> ' + nThousand(clubPoints) + '<br />'
                );
            }
        });
    }

    function calculateTotalPrice(points) {
        var last_price = calculateStatPrice(points);
        var price = 0;
        if (points < 2000) {
            price = (7 + last_price) / 2 * points;
        }
        else if (points < 4000) {
            price = 4012000 + (4009 + last_price) / 2 * (points - 2000);
        }
        else if (points < 6000) {
            price = 20026000 + (12011 + last_price) / 2 * (points - 4000);
        }
        else if (points < 8000) {
            price = 56042000 + (24013 + last_price) / 2 * (points - 6000);
        }
        else if (points < 10000) {
            price = 120060000 + (40015 + last_price) / 2 * (points - 8000);
        }
        else if (points < 12000) {
            price = 220080000 + (60017 + last_price) / 2 * (points - 10000);
        }
        else if (points < 14000) {
            price = 364102000 + (84019 + last_price) / 2 * (points - 12000);
        }
        else if (points < 16000) {
            price = 560126000 + (112021 + last_price) / 2 * (points - 14000);
        }
        return price;
    }

    function calculateStatPrice(points) {
        var cost = 0;
        if (points < 2000) {
            cost = 5 + points * 2;
        }
        else if (points < 4000) {
            cost = 4005 + (points - 2000) * 4;
        }
        else if (points < 6000) {
            cost = 12005 + (points - 4000) * 6;
        }
        else if (points < 8000) {
            cost = 24005 + (points - 6000) * 8;
        }
        else if (points < 10000) {
            cost = 40005 + (points - 8000) * 10;
        }
        else if (points < 12000) {
            cost = 60005 + (points - 10000) * 12;
        }
        else if (points < 14000) {
            cost = 84005 + (points - 12000) * 14;
        }
        else if (points < 16000) {
            cost = 112005 + (points - 14000) * 16;
        }
        return cost;
    }

    var lsMarket = {};
    lsMarket.buyable = {};
    lsMarket.stocks = {};
    lsMarket.restock = {};

    setTimeout(function() {
        var restocktime = 0;
        var time = $('#shop > .shop_count > span').text();
        if (time.indexOf('h') > -1) {
            restocktime = parseInt(time.substring(0, time.indexOf('h')), 10) * 3600;
            time = time.substring(time.indexOf('h') + 1);
        }
        if (time.indexOf('m') > -1) {
            restocktime += parseInt(time.substring(0, time.indexOf('m')), 10) * 60;
            time = time.substring(time.indexOf('h') + 1);
        }
        if (time.indexOf('s') > -1) {
            restocktime += parseInt(time.substring(0, time.indexOf('s')), 10);
        }

        lsMarket.restock.herolvl = Hero.infos.level;
        lsMarket.restock.time = (new Date()).getTime() + restocktime * 1000;

        get_buyableStocks('potion');
        get_buyableStocks('gift');
        equipments_shop(0);
        boosters_shop(0);
        books_shop(0);
        gifts_shop(0);
    }, 500);

    var timer;
    $('#shop > button, #inventory > button').click(function() {
        var clickedButton = $(this).attr('rel'),
            opened_shop = $('#shop').children('.selected');
        clearTimeout(timer);
        timer = setTimeout(function() {
            if (opened_shop.hasClass('armor')) {
                equipments_shop(1);
            }
            else if (opened_shop.hasClass('booster')) {
                boosters_shop(1);
            }
            else if (opened_shop.hasClass('potion')) {
                if (clickedButton == 'buy' || clickedButton == 'shop_reload') get_buyableStocks('potion');
                books_shop(1);
            }
            else if (opened_shop.hasClass('gift')) {
                if (clickedButton == 'buy' || clickedButton == 'shop_reload') get_buyableStocks('gift');
                gifts_shop(1);
            }
        }, 500);
    });

    function get_buyableStocks(loc_class) {
        var itemsNb = 0,
            itemsXp = 0,
            itemsPrice = 0,
            loc = $('#shop').children('.' + loc_class);
        loc.find('.slot').each(function() {
            if ($(this).hasClass('empty')) return false;
            var item = $(this).data('d');
            itemsNb++;
            itemsXp += parseInt(item.value, 10);
            itemsPrice += parseInt(item.price, 10);
        });
        lsMarket.buyable[loc_class] = {'Nb':itemsNb, 'Xp':itemsXp, 'Value':itemsPrice};
    }

    function equipments_shop(update) {
        tt_create(update, 'armor', 'EquipmentsTooltip', 'equipments', '');
    }
    function boosters_shop(update) {
        tt_create(update, 'booster', 'BoostersTooltip', 'boosters', '');
    }
    function books_shop(update) {
        tt_create(update, 'potion', 'BooksTooltip', 'books', 'Xp');
    }
    function gifts_shop(update) {
        tt_create(update, 'gift', 'GiftsTooltip', 'gifts', 'affection');
    }

    function tt_create(update, loc_class, tt_class, itemName, itemUnit) {
        var itemsNb = 0,
            itemsXp = (itemUnit === '') ? -1 : 0,
            itemsSell = 0,
            loc = $('#inventory').children('.' + loc_class);

        loc.find('.slot').each(function() {
            if ($(this).hasClass('empty')) return false;
            var item = $(this).data('d'),
                Nb = parseInt(item.count, 10);
            itemsNb += Nb;
            itemsSell += Nb * parseInt(item.price_sell, 10);
            if (itemsXp != -1) itemsXp += Nb * parseInt(item.value, 10);
        });

        var tooltip = texts[lang].you_own + ' <b>' + nThousand(itemsNb) + '</b> ' + texts[lang][itemName] + '.<br />' +
            (itemsXp == -1 ? '' : texts[lang].you_can_give + ' <b>' + nThousand(itemsXp) + '</b> ' + texts[lang][itemUnit] + '.<br />') +
            texts[lang].you_can_sell + ' <b>' + nThousand(itemsSell) + '</b> <span class="imgMoney"></span>.';

        lsMarket.stocks[loc_class] = (loc_class == 'potion' || loc_class == 'gift') ? {'Nb':itemsNb, 'Xp':itemsXp} : {'Nb':itemsNb};
        localStorage.setItem('lsMarket', JSON.stringify(lsMarket));

        if (update === 0) {
            loc.prepend('<span class="CustomTT"></span><div class="' + tt_class + '">' + tooltip + '</div>');
        }
        else {
            loc.children('.' + tt_class).html(tooltip);
        }
    }
    $('plus').on('click', function (event) {
        var stat = 'carac' + $(this).attr('for_carac');
        var amount = parseInt($('[rel=buy-stats-multiplier]').text().replace(/[^0-9]/g, ''), 10);
        if ((Hero.infos[stat]+amount)<=Hero.infos.level*30){
            Hero.infos[stat] += amount;
        }
        timer = setTimeout(function() {
            updateStats();
        }, 400);
    });

    const displayGirlCounts = () => {
        const thresholds = Object.keys(girls_requirement_amount)

        const currentThreshold = thresholds.find(threshold => girls_requirement_amount[threshold] > high_level_girl_owned[threshold])

        if (currentThreshold) {
            const levelText = `${GT.design.Lvl} ${currentThreshold} : ${high_level_girl_owned[currentThreshold]} / ${girls_requirement_amount[currentThreshold]} ${GT.design.Girls}`
            $('#girls_list .level_target').attr('hh_title', levelText)
        }
    }

    displayGirlCounts()

    //CSS
    sheet.insertRule('#inventory .CustomTT {'
                     + 'float: right; '
                     + 'margin: 11px 1px 0 0; '
                     + 'background-image: url("https://i.postimg.cc/qBDt6yHV/icon-question.png"); '
                     + 'background-size: 20px 20px; '
                     + 'width: 20px; '
                     + 'height: 20px;}'
                    );

    sheet.insertRule('#inventory .CustomTT:hover {'
                     + 'cursor: help;}'
                    );

    sheet.insertRule('#inventory .CustomTT:hover + div {'
                     + 'opacity: 1; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#inventory .EquipmentsTooltip, #inventory .BoostersTooltip, #inventory .BooksTooltip, #inventory .GiftsTooltip {'
                     + 'position: absolute; '
                     + 'z-index: 99; '
                     + 'width: 240px; '
                     + 'border: 1px solid rgb(162, 195, 215); '
                     + 'border-radius: 8px; '
                     + 'box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1); '
                     + 'padding: 3px 7px 4px 7px; '
                     + 'background-color: #F2F2F2; '
                     + 'font: normal 10px/17px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'color: #057; '
                     + 'opacity: 0; '
                     + 'visibility: hidden; '
                     + 'transition: opacity 400ms, visibility 400ms;}'
                    );

    sheet.insertRule('#inventory .EquipmentsTooltip, #inventory .BoostersTooltip {'
                     + 'margin: -33px 0 0 210px; '
                     + 'height: 43px;}'
                    );

    sheet.insertRule('#inventory .BooksTooltip, #inventory .GiftsTooltip {'
                     + 'margin: -50px 0 0 210px; '
                     + 'height: 60px;}'
                    );

    sheet.insertRule('#inventory .EquipmentsTooltip b, #inventory .BoostersTooltip b, #inventory .BooksTooltip b, #inventory .GiftsTooltip b {'
                     + 'font-weight: bold;}'
                    );

    sheet.insertRule('#inventory .imgMoney {'
                     + 'background-size: 12px 12px; '
                     + 'background-repeat: no-repeat; '
                     + 'width: 12px; '
                     + 'height: 14px; '
                     + 'vertical-align: text-bottom; '
                     + 'background-image: url("https://i.postimg.cc/wv01VstN/icon-currency-ymen.png"); '
                     + 'display: inline-block;}'
                    );

    sheet.insertRule('.hero_stats .CustomStats:hover {'
                     + 'cursor: help;}'
                    );

    sheet.insertRule('.hero_stats .CustomStats {'
                     + 'float: left; '
                     + 'margin-left: -20px; '
                     + 'margin-top: 0px; '
                     + 'background-image: url("https://i.postimg.cc/qBDt6yHV/icon-question.png"); '
                     + 'background-size: 18px 18px; '
                     + 'background-position: center; '
                     + 'background-repeat: no-repeat; '
                     + 'width: 18px; '
                     + 'height: 100%; '
                     + 'font-size: 0;}'
                    );

    sheet.insertRule('.hero_stats .CustomStats:hover + div {'
                     + 'opacity: 1; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.hero_stats .StatsTooltip {'
                     + 'position: absolute; '
                     + 'z-index: 99; '
                     + 'margin: -50px 0 0 -50px; '
                     + 'border: 1px solid rgb(162, 195, 215); '
                     + 'border-radius: 8px; '
                     + 'box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1); '
                     + 'padding: 2px 17px 2px 7px; '
                     + 'background-color: #F2F2F2; '
                     + 'font: normal 10px/17px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'text-align: left; '
                     + 'white-space: nowrap; '
                     + 'opacity: 0; '
                     + 'visibility: hidden; '
                     + 'transition: opacity 400ms, visibility 400ms;}'
                    );

    sheet.insertRule('.hero_stats .StatsTooltip b {'
                     + 'font-weight: bold;}'
                    );

    sheet.insertRule('#hh_comix #inventory .imgMoney {'
                     + 'background-size: 11px 11px; '
                     + 'width: 11px; '
                     + 'height: 11px; '
                     + 'background-image: url("https://ch.hh-content.com/pictures/design/ic_topbar_soft_currency.png");}'
                     );
}

/* =========================================
    MARKET GIRLS' FILTER (Credit: test_anon)
   ========================================= */

function moduleMarketFilter() {
    if (CurrentPage.includes('shop')) {
        const FILTER_LS_KEY = 'HHSActiveMarketGirlFilter'
        const DEFAULT_FILTER = {
            carac: 0,
            rarity: 'all',
            element: 'all',
            affCategory: 'all',
            affLvl: 'all',
            name: '',
            range: '',
            team: null,
        }
        const clearFilter = () => {
            saveFilter(DEFAULT_FILTER)
        }
        const saveFilter = (filter) => {
            localStorage.setItem(FILTER_LS_KEY, JSON.stringify(filter))
        }
        const saveBasicFilter = (form) => {
            const filter = {
                carac: form.find("#sort_class").prop('selectedIndex'),
                rarity: form.find("#sort_rarity").val(),
                element: form.find("#sort_element").val(),
                affCategory: form.find("#sort_aff_category").val(),
                affLvl: form.find("#sort_aff_lvl").val(),
                name: form.find("#sort_name").val(),
                range: form.find("#sort_level").val(),
            }
            saveFilter(filter)
        }
        const saveTeamFilter = (team) => {
            const filter = {
                ...DEFAULT_FILTER,
                team
            }
            saveFilter(filter)
        }
        const loadFilter = () => {
            return JSON.parse(localStorage.getItem(FILTER_LS_KEY)) || DEFAULT_FILTER
        }

        let container = $('.g1>div');

        let cur_id = parseInt(container.find('.number.selected').text().split('/')[0]);
        container.find('.number').remove();

        let allGirls = Array.from( container.find('.girl-ico').toArray(), e => $(e) );

        let nb_girls = container.children().length;
        let nav = $(`<span class="number selected">/</span>`);
        container.append(nav);

        let max_girl = $(`<span>${nb_girls}</span>`);
        nav.append(max_girl);

        function updateNavMax() {
            nb_girls = container.children().length - 1;
            max_girl.text(nb_girls);
        }

        let num_girl = $(`<span contenteditable>${cur_id}</span>`);
        nav.prepend(num_girl);

        num_girl.on('input', (ev) => {

            let dst_num = parseInt(num_girl.text());

            if(dst_num <= 0 || dst_num > nb_girls || ! Number.isFinite(dst_num) )
                return;

            goto_girl(dst_num, false);
        });

        function next_girl_id(id = cur_id) {
            return ((id - 1 + 1)%nb_girls) + 1;
        }
        function prev_girl_id(id = cur_id) {
            return ((id - 1 + nb_girls - 1)%nb_girls) + 1;
        }

        function girl_at(id = cur_id) {
            return container.children().eq(id - 1);
        }

        function hideCurrentGirl() {
            let cur_girl = girl_at();
            cur_girl.addClass('not-selected');

            girl_at(prev_girl_id()).css('left', '-145px');
            cur_girl.css('left', '-145px');
            girl_at(next_girl_id()).css('left', '-145px');
        }

        function goto_girl(id_girl, override_nav = true, hide_current = true) {
            if(hide_current)
                hideCurrentGirl();

            let dst_girl = girl_at(id_girl);
            dst_girl.removeClass('not-selected');

            girl_at(prev_girl_id(id_girl)).css('left', '0px');
            girl_at(next_girl_id(id_girl)).css('left', '290px');
            dst_girl.css('left', '145px');

            window.$girl = dst_girl;

            if( override_nav )
                num_girl.text(id_girl);

            cur_id = id_girl;

            update_header();

            if (loadSetting('market_XP_Aff'))
                moduleMarket_XP_Aff();
        }

        function update_header() {
            let $girl = window.$girl;

            if ($girl.attr('class').indexOf('girl') != -1) {
                const girlData = $girl.data('g')
                const { level, Name, name, elementData, element_data, class: girlClass } = girlData
                $("#girls_list>.level_target_squared>div>div").attr("chars", level.length);
                $("#girls_list>.level_target_squared>div>div").text(level);
                $("#girls_list>h3").text(Name || name);
                if (elementData) {
                    $("#girls_list>.icon").attr("src", `${IMAGES_URL}/pictures/girls_elements/${ELEMENTS_ICON_NAMES[elementData.type]}.png`);
                } else if (element_data) {
                    $("#girls_list>.icon").attr("src", `${IMAGES_URL}/pictures/girls_elements/${ELEMENTS_ICON_NAMES[element_data.type]}.png`);
                } else {
                    $("#girls_list>.icon").attr("carac", girlClass);
                }
            }
        }

        let lnav = container.parent().find('span[nav="left"]');
        lnav.off('click');
        lnav.on('click', (ev) => { goto_girl( prev_girl_id() ); });

        let rnav = container.parent().find('span[nav="right"]');
        rnav.off('click');
        rnav.on('click', (ev) => { goto_girl( next_girl_id() ); });

        function addGirlFilter() {

            function getGirlData() {
                return Array.from(allGirls, girl => ({id: $(girl).attr('id_girl'), ...JSON.parse($(girl).attr("data-new-girl-tooltip") || $(girl).attr("new-girl-tooltip-data")) }));
            }

            function createFilterBox() {
                const buildTextInput = ({id, label, placeholder, value}) => `
                    <div class="form-control">
                        <div class="input-group">
                            <label class="head-group" for="${id}">${label}</label>
                            <input type="text" autocomplete="off" id="${id}" placeholder="${placeholder}" icon="search" value="${value}">
                        </div>
                    </div>
                `
                const buildSelectInput = ({id, label, options, value, selectedIndex}) => `
                    <div class="form-control">
                        <div class="select-group">
                            <label class="head-group" for="${id}">${label}</label>
                            <select name="${id}" id="${id}" icon="down-arrow">
                                <option value="all" ${value === 'all' || selectedIndex === 0 ? 'selected="selected"' : ''}>${labels.all}</option>
                                ${options.map(({label, value: optValue}, i) => `<option value="${optValue}" ${value === optValue || selectedIndex === i+1 ? 'selected="selected"' : ''}>${label}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                `

                const {carac, rarity, element, name, range, affCategory, affLvl} = loadFilter()

                var totalHTML = `
                    <div style="position:relative">
                        <div id="arena_filter_box" class="form-wrapper" style="position: absolute; left: -215px; top: -224px; width: 200px; height: -moz-fit-content; height: fit-content; z-index: 3; border-radius: 8px 10px 10px 8px; background-color: #1e261e; box-shadow: rgba(255, 255, 255, 0.73) 0px 0px; padding: 5px; border: 1px solid #ffa23e; display: none;">
                            ${buildTextInput({id: 'sort_name', label: labels.searched_name, placeholder: labels.girl_name, value: name})}
                            ${buildSelectInput({
                                id: 'sort_class',
                                label: labels.searched_class,
                                options: ['hardcore', 'charm', 'knowhow'].map(option => ({label: labels[option], value: option})),
                                selectedIndex: carac
                            })}
                            ${buildSelectInput({
                                id: 'sort_element',
                                label: label('searched_element'),
                                options: ['fire', 'nature', 'stone', 'sun', 'water', 'darkness', 'light', 'psychic'].map(option => ({label: GT.design[`${option}_flavor_element`], value: option})),
                                value: element
                            })}
                            ${buildSelectInput({
                                id: 'sort_rarity',
                                label: labels.searched_rarity,
                                options: ['starting', 'common', 'rare', 'epic', 'legendary', 'mythic'].map(option => ({label: labels[option], value: option})),
                                value: rarity
                            })}
                            ${buildTextInput({id: 'sort_level', label: labels.level_range, placeholder: '1-500', value: range})}
                            ${buildSelectInput({
                                id: 'sort_aff_category',
                                label: labels.searched_aff_category,
                                options: [
                                    {label: labels.one_star, value: '1'},
                                    {label: labels.three_stars, value: '3'},
                                    {label: labels.five_stars, value: '5'},
                                    {label: labels.six_stars, value: '6'}
                                ],
                                value: affCategory
                            })}
                            ${buildSelectInput({
                                id: 'sort_aff_lvl',
                                label: labels.searched_aff_lvl,
                                options: [
                                    {label: labels.zero_star, value: '0'},
                                    {label: labels.one_star, value: '1'},
                                    {label: labels.two_stars, value: '2'},
                                    {label: labels.three_stars, value: '3'},
                                    {label: labels.four_stars, value: '4'},
                                    {label: labels.five_stars, value: '5'},
                                    {label: labels.six_stars, value: '6'}
                                ],
                                value: affLvl
                            })}
                            <input type="button" class="blue_button_L" rel="select-team" value="${labels.team}" />
                        </div>
                    </div>`.replace(/\n/g, '').replace(/    /g, '');

                return $(totalHTML);
            }

            function createTeamsBox() {
                const bdsmTeamsJson = localStorage.getItem('bdsmTeams')
                if (!bdsmTeamsJson) {
                    return $(`
                    <div style="position:relative">
                        <div class="team-selection" style="display: none;">
                            <span class="close-team-selection" />
                            ${labels.visit_teams}
                        </div>
                    </div>`.replace(/\n/g, '').replace(/    /g, ''))
                }
                const {teamIds, teamsDict} = JSON.parse(bdsmTeamsJson)
                return $(`
                <div style="position:relative">
                    <div class="team-selection" style="display: none;">
                        <span class="close-team-selection" />
                        <div class="teams-grid-container rarity-background">
                            ${teamIds.map(teamId => teamsDict[teamId]).map(team => `
                                <div class="team-slot-container ${team.iconRarity}" data-id-team="${team.teamId}" data-girl-ids='${JSON.stringify(team.girls)}'>
                                    <img src="${team.icon}" />
                                    ${team.themeIcons ? `
                                        <div class="theme-icons">
                                            ${team.themeIcons.map(icon=>`<img class="theme-icon" src="${icon}"/>`).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                `.replace(/\n/g, '').replace(/    /g, ''))
            }

            function createFilterBtn() {
                let btn = $('<input type="button" class="blue_button_L girl_filter" value="' + texts[lang].filter + '" />');
                return btn;
            }

            function filterGirls(girlsData, additionalGirlId) {
                const {carac, rarity, element, affCategory, affLvl, name, range, team: useTeam} = loadFilter()
                let sorterClass = carac;
                let sorterRarity = rarity;
                let sorterElement = element;
                let sorterAffCategory = affCategory;
                let sorterAffLvl = affLvl;
                let sorterName = name;
                let sorterRange = range.split('-');
                let nameRegex = new RegExp(sorterName, "i");

                hideCurrentGirl();

                for(let i = 0; i < girlsData.length; ++i) {

                    let girl = girlsData[i];

                    if (additionalGirlId && additionalGirlId === girl.id) {
                        nav.before(allGirls[i]);
                    } else if (useTeam) {
                        if(useTeam.includes(girl.id)) {
                            nav.before(allGirls[i]);
                        } else {
                            allGirls[i].detach();
                        }
                    } else {
                        let affectionStr = girl.Graded2 || girl.graded2;
                        let affectionCategoryStr = affectionStr.split('</g>');
                        let affectionCategory = affectionCategoryStr.length-1;
                        let affectionLvlStr = affectionStr.split('<g >');
                        let affectionLvl = affectionLvlStr.length-1;

                        let matchesClass = (girl.class == sorterClass) || (sorterClass == 0);
                        const {elementData, element_data} = girl
                        let matchesElement = ((elementData || element_data).type === sorterElement) || (sorterElement === 'all')
                        let matchesRarity = (girl.rarity == sorterRarity) || (sorterRarity == 'all');
                        let matchesAffCategory = (affectionCategory == sorterAffCategory) || (sorterAffCategory == 'all');
                        let matchesAffLvl = (affectionLvl == sorterAffLvl) || (sorterAffLvl == 'all');
                        const {Name, name} = girl
                        let matchesName = ((Name || name).search(nameRegex) > -1);
                        let matchesLevel =  (sorterRange[0] == '' || girl.level >= parseInt(sorterRange[0]) )
                        && (sorterRange[1] == '' || sorterRange[1] === undefined || girl.level <= parseInt(sorterRange[1]) );

                        if(matchesClass && matchesElement && matchesRarity && matchesName && matchesLevel && matchesAffCategory && matchesAffLvl) {
                            nav.before(allGirls[i]);
                        } else {
                            allGirls[i].detach();
                        }
                    }

                }

                updateNavMax();
                goto_girl(1, true, false);
            }

            function createFilter(target, girlsData) {
                let filterBox = createFilterBox();
                let teamsBox = createTeamsBox();
                let btn = createFilterBtn();

                target.append(btn);
                target.append(filterBox);
                target.append(teamsBox);

                btn.on('click', function() {
                    $('#arena_filter_box').css('display', $('#arena_filter_box').css('display')=='block'?'none':'block');
                });

                let sortGirls = () => {
                    saveBasicFilter(filterBox)
                    filterGirls(girlsData);
                };
                const filterGirlsWithTeam = (team) => {
                    saveTeamFilter(team)
                    filterGirls(girlsData)
                }

                filterBox.find("#sort_class") .on('change', sortGirls);
                filterBox.find("#sort_element").on('change', sortGirls);
                filterBox.find("#sort_rarity").on('change', sortGirls);
                filterBox.find("#sort_aff_category").on('change', sortGirls);
                filterBox.find("#sort_aff_lvl").on('change', sortGirls);
                filterBox.find("#sort_name")  .on('input' , sortGirls );
                filterBox.find("#sort_level") .on('input' , sortGirls );
                filterBox.find('[rel=select-team]').click(() => $('.team-selection').css('display', $('.team-selection').css('display')=='block'?'none':'block'))
                teamsBox.find('.team-slot-container').click(function () {
                    filterGirlsWithTeam($(this).data('girl-ids'))
                    $('.team-selection').css('display', 'none')
                })
                teamsBox.find('.close-team-selection').click(() => $('.team-selection').css('display', 'none'))
            }

            let girlsData = getGirlData();
            createFilter( $('#girls_list'), girlsData );

            const searchParams = new URL(window.location.href).searchParams
            if (searchParams.has('girl')) {
                const girlId = searchParams.get('girl')
                filterGirls(girlsData, girlId)
                let index = $(`[id_girl=${girlId}]`).index()
                if (index > 0) {
                    goto_girl(index + 1)
                }
            } else {
                filterGirls(girlsData)
            }
        }

        addGirlFilter();

        //CSS
        sheet.insertRule(`
            #arena_filter_box label.head-group {
                display: block;
                position: relative;
                left: -5px;
                z-index: 15;
                margin-bottom: -8px;
                margin-top: -3px !important;
                padding-left: 7px;
                font-size: 14px;
                font-weight: 400;
                letter-spacing: .22px;
                text-align: left !important;
                color: #ffb827;
                background:transparent;
                text-shadow: -1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,-2px -2px 5px rgba(255,159,0,.4),2px -2px 5px rgba(255,159,0,.4),-2px 2px 5px rgba(255,159,0,.4),2px 2px 5px rgba(255,159,0,.4),0 0 10px rgba(255,159,0,.4);
            }
        `);

        sheet.insertRule(`
            #shops #girls_list .g1 > div > .number {
                left: 0 !important;
            }
        `);

        sheet.insertRule(`
            ${mediaMobile} {
                input.blue_button_L.girl_filter {
                    position: absolute;
                    left: -2px;
                    top: 0px;
                }
            }
        `);

        sheet.insertRule(`
            ${mediaDesktop} {
                input.blue_button_L.girl_filter {
                    position: absolute;
                    left: -2px;
                    top: -30px;
                }
            }
        `);

        sheet.insertRule(`
            ${mediaMobile} {
                #arena_filter_box {
                    bottom: 76px;
                }
            }
        `);

        sheet.insertRule(`
            ${mediaDesktop} {
                #arena_filter_box {
                    bottom: 95px;
                }
            }
        `);
        sheet.insertRule(`
            .team-selection {
                position: absolute;
                left: 0px;
                bottom: -208px;
                width: 400px;
                height: fit-content;
                border-radius: 8px 10px 10px 8px;
                background-color: #1e261e;
                box-shadow: rgba(255, 255, 255, 0.73) 0px 0px;
                padding: 5px; border: 1px solid #ffa23e;
                z-index:10;
                padding-bottom: 16px;
            }
        `)
        sheet.insertRule(`
            .teams-grid-container {
                display: grid;
                grid-template-columns: auto auto auto auto;
                grid-row-gap: 1rem;
                padding: .4rem .9rem .4rem .9rem;
                margin-right: -1rem;
            }
        `)
        sheet.insertRule(`
            .team-slot-container>img {
                border-radius: 0.4rem;
            }
        `)
        sheet.insertRule(`
            .close-team-selection {
                position: absolute;
                display: block;
                background: url(https://${cdnHost}/clubs/ic_xCross.png);
                background-size: cover;
                height: 32px;
                width: 35px;
                top:-16px;
                right:-17px;
                cursor: pointer;
            }
        `)
        sheet.insertRule(`
            [rel=select-team] {
                width: 100%;
                height: 36px;
                padding-top: 5px;
            }
        `)
        sheet.insertRule(`
            .theme-icons {
                position: absolute;
                bottom: -10px;
            }
        `)
        sheet.insertRule(`
            .theme-icon {
                width: 26px;
            }
        `)
    } else if (CurrentPage.includes('teams')) {
        // Load teams into localstorage
        const teamsDict = {}
        const teamIds = []

        $('.team-slot-container[data-is-empty=]').each((i, slot) => {
            const teamId = $(slot).data('id-team')
            const icon = $(slot).children('img').attr('src')
            const themeIcons = $(slot).find('.team-slot-themes-container img').map((i,el)=>$(el).attr('src')).toArray()

            const classes = $(slot).attr('class').replace(/\s+/g, ' ').split(' ')
            const iconRarity = ['mythic', 'legendary', 'epic', 'rare', 'common', 'starting'].find(rarity => classes.includes(rarity))

            teamsDict[teamId] = {
                teamId,
                icon,
                iconRarity,
                themeIcons
            }
            teamIds.push(teamId)
        })

        teamIds.forEach(teamId => {
            const $teamGirlContainer = $(`.team-info-girls-container[data-id-team=${teamId}]`)
            const girls = []
            $teamGirlContainer.find('.team-member-container').each((i, girl) => {
                girlId = $(girl).data('girl-id')
                if (girlId) {
                    girls.push(`${girlId}`)
                }
            })
            teamsDict[teamId].girls = girls
        })

        const teams = {
            teamsDict,
            teamIds
        }
        localStorage.setItem('bdsmTeams', JSON.stringify(teams))
    }
}

/* =====================================
    MARKET XP AND AFFECTION INFORMATION
   ===================================== */

function moduleMarket_XP_Aff() {
    const timeout = 250;
    var nbItem = 0;

    function updateGirlXP(girl) {
        if (!girl.length) {return}
        const {rarity} = girl.data('new-girl-tooltip');
        const {Xp, level_cap} = girl.data('g')
        var girl_rarity = rarity;
        var lvl_max = level_cap || Hero.infos.level;
        var xp_total = GIRLS_EXP_LEVELS[girl_rarity][lvl_max-2];

        var xp_total_remaining = xp_total - Xp.cur;
        var xp_next_remaining = Xp.max - Xp.cur

        girl.find('.bar-wrap[rel="xp"] #xpTool').remove();
        girl.find('.bar-wrap[rel="xp"]').append('<span id="xpTool" class="infoTooltip xpTooltip">XP: ' + nThousand(girl.data("g").Xp.cur) + '</span>');

        if( xp_total_remaining > 0)
            girl.find('.bar-wrap[rel="xp"] .over').text('->' + nThousand(xp_next_remaining) + '; Max: ' + nThousand(xp_total_remaining));
    }

    function updateGirlAff(girl) {
        if (!girl.length) {return}
        var aff_remaining = girl.data("g").Affection.max - girl.data("g").Affection.cur;
        girl.find('.bar-wrap[rel="aff"] .over span').text('Next: ' + nThousand(aff_remaining));
    }

    var girl = $('div.girl-ico:not(.not-selected)');
    updateGirlXP(girl);
    updateGirlAff(girl);

    $('#type_item > div:nth-child(3)').click(function(event) {
        var girl = $('div.girl-ico:not(.not-selected)');
        updateGirlXP(girl);
        updateGirlAff(girl);
    });

    $('#type_item > div:nth-child(4)').click(function(event) {
        var girl = $('div.girl-ico:not(.not-selected)');
        updateGirlXP(girl);
        updateGirlAff(girl);
    });

    $('.g1 > span:nth-child(1)').click(function(event) {
        var girl = $('div.girl-ico:not(.not-selected)');
        updateGirlXP(girl);
        updateGirlAff(girl);
    });

    $('.g1 > span:nth-child(2)').click(function(event) {
        var girl = $('div.girl-ico:not(.not-selected)');
        updateGirlXP(girl);
        updateGirlAff(girl);
    });

    let button = document.querySelector('#inventory button[rel=use]');
    button.addEventListener('click', function(){
        var girl = $('div.girl-ico:not(.not-selected)');
        if ($('#type_item [type="gift"]')[0].className == "selected") {
            setTimeout(function(){updateGirlAff(girl);}, 500);
            setTimeout(function(){updateGirlAff(girl);}, 3000);
        }
        else if ($('#type_item [type="potion"]')[0].className == "selected") {
            setTimeout(function(){updateGirlXP(girl);}, 500);
            setTimeout(function(){updateGirlXP(girl);}, 3000);
        }
    });

    //CSS
    sheet.insertRule('.xpTooltip {'
                     + 'margin-top: 23px;'
                     + 'margin-left: 20px;}'
                    );

    sheet.insertRule('.bar-wrap[rel="xp"]:hover .xpTooltip {'
                     + 'visibility: visible;}'
                    );
}

//Sort equipment items at the market by rarity
function moduleSortArmorItems() {
    function sortArmorItems() {
        let target =  $('#shops_right #inventory .armor .inventory_slots .ui-droppable');
        let items = {};

        for (let rarity of ['legendary', 'epic', 'rare', 'common'])
            items[rarity] = target.find('.slot.' + rarity);

        for (let rarity in items)
            items[rarity].detach();
        target.append(Object.values(items));
    }

    $('#shops_right #inventory .armor').prepend('<div id="sortArmorItems" class="blue_button_L" style="position:absolute; top:-15px; height:30px; width:80px; right:25px; text-align:center;">'
                                                + '<span style="position:relative; top:-7px;">'+ texts[lang].sort + '</span>'
                                                + '</div>');

    let buttonSortArmorItems = document.querySelector("#shops_right #inventory .armor #sortArmorItems");
    buttonSortArmorItems.addEventListener('click', function(){
        sortArmorItems();
    });
}

//Hide sell button at the market
function moduleHideSellButton() {
    function hideSellButton() {
        $('#shops_right #inventory button[rel="sell"]')[0].style.display="none";
    }

    function displaySellButton() {
        $('#shops_right #inventory button[rel="sell"]')[0].style.display="";
    }

    $('#shops_right #inventory').append('<div id="hideSellButton" class="blue_button_L" style="position:absolute; top:-15px; height:30px; width:80px; left:25px; text-align:center;">'
                                         + '<span id="hideText" style="position:relative; top:-7px; right:14px;"></span>'
                                         + '</div>');

    let hidden = loadSetting('hideSellButton');

    if (hidden == 1) {
        hideSellButton();
        $('#hideText').html(texts[lang].display);
    }
    else {
        $('#hideText').html(texts[lang].hide);
    }

    let buttonHideSellButton = document.querySelector("#hideSellButton");
    buttonHideSellButton.addEventListener('click', function(){
        if (hidden == 0) {
            hideSellButton();
            hidden = 1;
            localStorage.setItem('HHS.hideSellButton', 1);
            $('#hideText').html(texts[lang].display);
        }
        else {
            displaySellButton();
            hidden = 0;
            localStorage.setItem('HHS.hideSellButton', 0);
            $('#hideText').html(texts[lang].hide);
        }
    });

    let shops = $('#shops_left #type_item div');
    for (var i=0; i<shops.length; i++) {
        shops[i].addEventListener('click', function(){
            if (hidden == 0)
                displaySellButton();
            else
                hideSellButton();
        });
    }
}

/* ===================
    HAREM INFORMATION
   =================== */

function moduleHarem() {
    // is localstorage available?
    function lsTest() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch(e) {
            return false;
        }
    }

    // verify localstorage
    var lsAvailable = (lsTest() === true) ? 'yes' : 'no';

    var stats = [];
    var girlsList = [];
    var haremRight = $('#harem_right');

    stats.girls = 0;
    stats.hourlyMoney = 0;
    stats.allCollect = 0;
    stats.unlockedScenes = 0;
    stats.allScenes = 0;
    stats.rarities = {starting: 0, common: 0, rare: 0, epic: 0, legendary: 0, mythic: 0};
    stats.caracs = {1: 0, 2: 0, 3: 0};
    stats.stars = {affection: 0, money: 0, kobans: 0};
    stats.xp = 0;
    stats.affection = 0;
    stats.money = 0;
    stats.kobans = 0;

    var EvoReq = [];

    var starting = [];
    starting.push({affection: 90, money: 36000, kobans: 36, taffection: 90, tmoney: 36000, tkobans: 36});
    starting.push({affection: 225, money: 90000, kobans: 60, taffection: 315, tmoney: 126000, tkobans: 96});
    starting.push({affection: 563, money: 225000, kobans: 114, taffection: 878, tmoney: 351000, tkobans: 210});
    starting.push({affection: 1125, money: 450000, kobans: 180, taffection: 2003, tmoney: 801000, tkobans: 390});
    starting.push({affection: 2250, money: 900000, kobans: 300, taffection: 4253, tmoney: 1701000, tkobans: 690});
    EvoReq.starting = starting;

    var commonGirls = [];
    commonGirls.push({affection: 180, money: 72000, kobans: 72, taffection: 180, tmoney: 72000, tkobans: 72});
    commonGirls.push({affection: 450, money: 180000, kobans: 120, taffection: 630, tmoney: 252000, tkobans: 192});
    commonGirls.push({affection: 1125, money: 450000, kobans: 228, taffection: 1755, tmoney: 702000, tkobans: 420});
    commonGirls.push({affection: 2250, money: 900000, kobans: 360, taffection: 4005, tmoney: 1602000, tkobans: 780});
    commonGirls.push({affection: 4500, money: 1800000, kobans: 600, taffection: 8505, tmoney: 3402000, tkobans: 1380});
    EvoReq.common = commonGirls;

    var rareGirls = [];
    rareGirls.push({affection: 540, money: 216000, kobans: 216, taffection: 540, tmoney: 216000, tkobans: 216});
    rareGirls.push({affection: 1350, money: 540000, kobans: 360, taffection: 1890, tmoney: 756000, tkobans: 576});
    rareGirls.push({affection: 3375, money: 1350000, kobans: 678, taffection: 5265, tmoney: 2106000, tkobans: 1254});
    rareGirls.push({affection: 6750, money: 2700000, kobans: 1080, taffection: 12015, tmoney: 4806000, tkobans: 2334});
    rareGirls.push({affection: 13500, money: 5400000, kobans: 1800, taffection: 25515, tmoney: 10206000, tkobans: 4134});
    EvoReq.rare = rareGirls;

    var epicGirls = [];
    epicGirls.push({affection: 1260, money: 504000, kobans: 504, taffection: 1260, tmoney: 504000, tkobans: 504});
    epicGirls.push({affection: 3150, money: 1260000, kobans: 840, taffection: 4410, tmoney: 1764000, tkobans: 1344});
    epicGirls.push({affection: 7875, money: 3150000, kobans: 1578, taffection: 12285, tmoney: 4914000, tkobans: 2922});
    epicGirls.push({affection: 15750, money: 6300000, kobans: 2520, taffection: 28035, tmoney: 11214000, tkobans: 5442});
    epicGirls.push({affection: 31500, money: 12600000, kobans: 4200, taffection: 59535, tmoney: 23814000, tkobans: 9642});
    EvoReq.epic = epicGirls;

    var legendGirls = [];
    legendGirls.push({affection: 1800, money: 720000, kobans: 720, taffection: 1800, tmoney: 720000, tkobans: 720});
    legendGirls.push({affection: 4500, money: 1800000, kobans: 1200, taffection: 6300, tmoney: 2520000, tkobans: 1920});
    legendGirls.push({affection: 11250, money: 4500000, kobans: 2250, taffection: 17550, tmoney: 7020000, tkobans: 4170});
    legendGirls.push({affection: 22500, money: 9000000, kobans: 3600, taffection: 40050, tmoney: 16020000, tkobans: 7770});
    legendGirls.push({affection: 45000, money: 18000000, kobans: 6000, taffection: 85050, tmoney: 34020000, tkobans: 13770});
    EvoReq.legendary = legendGirls;

    var mythicGirls = [];
    mythicGirls.push({affection: 4500, money: 1800000, kobans: 1800, taffection: 4500, tmoney: 1800000, tkobans: 1800});
    mythicGirls.push({affection: 11250, money: 4500000, kobans: 3000, taffection: 15750, tmoney: 6300000, tkobans: 4800});
    mythicGirls.push({affection: 28125, money: 11250000, kobans: 5628, taffection: 43875, tmoney: 17550000, tkobans: 10428});
    mythicGirls.push({affection: 56250 , money: 22500000, kobans: 9000, taffection: 100125, tmoney: 40050000, tkobans: 19428});
    mythicGirls.push({affection: 112500, money: 45000000, kobans: 15000, taffection: 212625, tmoney: 85050000, tkobans: 34428});
    mythicGirls.push({affection: 225000, money: 90000000, kobans: 18000, taffection: 437625, tmoney: 175050000, tkobans: 52428});
    EvoReq.mythic = mythicGirls;

    for (var id in girlsDataList) {
        var girl = jQuery.extend(true, {}, girlsDataList[id]);
        if (girl.own) {
            stats.allCollect += girl.salary;
            stats.rarities[girl.rarity]++;
            stats.caracs[girl.class]++;
            stats.girls++;
            stats.hourlyMoney += Math.round(girl.salary_per_hour);
            stats.unlockedScenes += girl.graded;
            stats.allScenes += parseInt(girl.nb_grades, 10);
            var nbgrades = parseInt(girl.nb_grades, 10);
            if (girl.graded != nbgrades) {
                stats.affection += EvoReq[girl.rarity][nbgrades - 1].taffection - girl.Affection.cur;
                var currentLevelMoney = 0,
                    currentLevelKobans = 0;
                if (girl.graded != 0) {
                    currentLevelMoney = EvoReq[girl.rarity][girl.graded - 1].tmoney;
                    currentLevelKobans = EvoReq[girl.rarity][girl.graded - 1].tkobans;
                }
                stats.money += EvoReq[girl.rarity][nbgrades - 1].tmoney - currentLevelMoney;
                if (IS_NUTAKU_KOBANS) {
                    stats.kobans += Math.ceil((EvoReq[girl.rarity][nbgrades - 1].tkobans - currentLevelKobans) / 6);
                }
                else {
                    stats.kobans += EvoReq[girl.rarity][nbgrades - 1].tkobans - currentLevelKobans;
                }
            }
            const lvl_max = window.GIRL_MAX_LEVEL || Hero.infos.level
            var expToMax = (GIRLS_EXP_LEVELS[girl.rarity][lvl_max - 2] - girl.Xp.cur);
            if (expToMax < 0) expToMax = 0;
            stats.xp += expToMax;
        }
    }

    try {
        var lsMarket = JSON.parse(localStorage.getItem('lsMarket')),
            d = new Date(lsMarket.restock.time),
            RestockInfo;

        if (new Date() > lsMarket.restock.time || Hero.infos.level > lsMarket.restock.herolvl) {

            RestockInfo = '> The <a href="../shop.html">Market</a> restocked since your last visit.';
        }
        else {
            var marketBookTxt = lsMarket.buyable.potion.Nb + ' ' + texts[lang].books + ' (' + nThousand(lsMarket.buyable.potion.Xp) + ' ' + texts[lang].Xp + ')',
                marketGiftTxt = lsMarket.buyable.gift.Nb + ' ' + texts[lang].gifts + ' (' + nThousand(lsMarket.buyable.gift.Xp) + ' ' + texts[lang].affection + ')';
            RestockInfo = '- ' + marketBookTxt + ' = ' + nThousand(lsMarket.buyable.potion.Value) + ' <span class="imgMoney"></span>'
                + '<br />- ' + marketGiftTxt + ' = ' + nThousand(lsMarket.buyable.gift.Value) + ' <span class="imgMoney"></span>'
                + '<br /><font style="color: gray;">' + texts[lang].restock + ': ' + d.toLocaleString() + ' (' + texts[lang].or_level + ' ' + (Hero.infos.level+1) + ')</font>';
        }

        var myArmorTxt = nThousand(lsMarket.stocks.armor.Nb) + (lsMarket.stocks.armor.Nb > 99 ? '+ ' : ' ') + ' ' + texts[lang].equipments,
            myBoosterTxt = nThousand(lsMarket.stocks.booster.Nb) + ' ' + texts[lang].boosters,
            myBookTxt = nThousand(lsMarket.stocks.potion.Nb) + ' ' + texts[lang].books + ' (' + nThousand(lsMarket.stocks.potion.Xp) + ' ' + texts[lang].Xp + ')',
            myGiftTxt = nThousand(lsMarket.stocks.gift.Nb) + ' ' + texts[lang].gifts + ' (' + nThousand(lsMarket.stocks.gift.Xp) + ' ' + texts[lang].affection + ')',
            MarketStocks = '- ' + myArmorTxt + ', ' + myBoosterTxt
        + '<br />- ' + myBookTxt
        + '<br />- ' + myGiftTxt
        + '<span class="subTitle">' + texts[lang].currently_buyable + ':</span>'
        + RestockInfo;
    } catch(e) {
        MarketStocks = (lsAvailable == 'yes') ? '> ' + texts[lang].visit_the : '> ' + texts[lang].not_compatible;
    }

    var StatsString = '<div class="StatsContent"><span class="Title">' + texts[lang].harem_stats + ':</span>' +
        '<span class="subTitle" style="margin-top: -10px;">' + stats.girls + ' ' + texts[lang].haremettes + ':</span>' +
        '- ' + stats.caracs[1] + ' ' + texts[lang].hardcore + ', ' + stats.caracs[2] + ' ' + texts[lang].charm + ', ' + stats.caracs[3] + ' ' + texts[lang].knowhow + '<br />- '
    + (stats.rarities.starting + stats.rarities.common) + ' ' + texts[lang].common + ', ' + stats.rarities.rare + ' ' + texts[lang].rare + ', ' + stats.rarities.epic + ' ' + texts[lang].epic + ', ' + stats.rarities.legendary + ' ' + texts[lang].legendary + ', ' + stats.rarities.mythic + ' ' + texts[lang].mythic + ' <br />- '
    + nThousand(parseInt(document.getElementsByClassName('focus_text')[0].innerHTML.replace(/\D/g, ''), 10)) + '/' + nThousand(Hero.infos.level * stats.girls) + ' ' + texts[lang].harem_level + ' (' + nThousand(Hero.infos.level * stats.girls - parseInt(document.getElementsByClassName('focus_text')[0].innerHTML.replace(/\D/g, ''), 10)) + ' ' + texts[lang].to_go + ')<br />- '
    + stats.unlockedScenes + '/' + stats.allScenes + ' ' + texts[lang].unlocked_scenes + ' (' + nThousand(stats.allScenes - stats.unlockedScenes) + ' ' + texts[lang].to_go + ')'
    + '<span class="subTitle">' + texts[lang].money_income + ':</span>'
    + '~' + nThousand(stats.hourlyMoney) + ' <span class="imgMoney"></span> ' + texts[lang].per_hour
    + '<br />' + nThousand(stats.allCollect) + ' <span class="imgMoney"></span> ' + texts[lang].when_all_collectable
    + '<span class="subTitle">' + texts[lang].required_to_unlock + ':</span>'
    + addPriceRow('', stats.affection, stats.money, stats.kobans)
    + '<span class="subTitle">' + texts[lang].required_to_get_max_level + ':</span>'
    + nThousand(stats.xp) + ' ' + texts[lang].Xp + ' (' + nThousand(stats.xp * 200) + ' <span class="imgMoney"></span>) <br />'
    + '<span class="subTitle">' + texts[lang].my_stocks + ':</span>'
    + MarketStocks
    + '</div>';

    $('#harem_left').append('<div id="CustomBar">'
                            + '<img f="stats" src="https://i.postimg.cc/8cYj8QmP/icon-info.png">'
                            + '</div>'
                            + '<div id="TabsContainer">' + StatsString + '</div>');

    var TabsContainer = $('#TabsContainer');
    var Stats = TabsContainer.children('.StatsContent');

    $('body').click(function(e) {
        var clickOn = e.target.getAttribute('f');
        switch (clickOn) {
            case 'stats':
                toggleTabs(Stats);
                break;
            default:
                var clickedContainer = $(e.target).closest('[id]').attr('id');
                if (clickedContainer == 'TabsContainer') return;
                TabsContainer.fadeOut(400);
        }
    });

    function toggleTabs(tabIn) {
        if (TabsContainer.css('display') == 'block') {
            setTimeout(function() { tabIn.fadeIn(300); }, 205);
            TabsContainer.fadeOut(400);
        }
        else {
            tabIn.toggle(true);
            TabsContainer.fadeIn(400);
        }
    }

    function addPriceRow(rowName, affection, money, kobans) {
        return '<b>' + rowName + '</b> ' +
            nThousand(affection) + ' ' + texts[lang].affection + ' (' + nThousand(affection * 417) + ' <span class="imgMoney"></span>) ' + texts[lang].and + ' <br />' +
            nThousand(money) + ' <span class="imgMoney"></span> ' + texts[lang].or + ' ' +
            nThousand(kobans) + ' <span class="imgKobans"></span><br />';
    }

    function addPriceRowGirl(rowName, affection, money, kobans) {
        return '<b>' + rowName + ':</b> ' +
            nThousand(affection) + ' ' + texts[lang].affection + ' (' + nThousand(affection * 417) + ' <span class="imgMoney"></span>) ' + texts[lang].and + ' ' +
            nThousand(money) + ' <span class="imgMoney"></span> ' + texts[lang].or + ' ' +
            nThousand(kobans) + ' <span class="imgKobans"></span><br />';
    }

    function setupListeners () {
        $('.girls_list div[id_girl]').click(function() {
            updateInfo();
        });

        updateInfo();
    }

    var observer = new MutationObserver(function() {
        setTimeout(setupListeners, 100);
    });
    observer.observe($('.girls_list')[0], {
        childList: true
    })

    setupListeners();

    function updateInfo() {
        setTimeout(function () {
            haremRight.children('[girl]').each(function() {
                var girl = girlsDataList[$(this).attr('girl')];
                const {Name, name} = girl
                let girlName = (Name || name).replaceAll("/", "-");

                if (lang === 'fr') {
                    //for Wiki FR
                    girlName = girlName.replaceAll("’", "-");
                } else {
                    girlName = girlName.replaceAll("’", "");
                }

                if (!isCxH) {
                    let wikiLink

                    if (isGH) {
                        wikiLink = `https://harem-battle.club/wiki/Gay-Harem/GH:${Name || name}`
                    } else if (lang === 'fr') {
                        wikiLink = `http://hentaiheroes.wikidot.com/${girlName}`
                    } else {
                        wikiLink = `https://harem-battle.club/wiki/Harem-Heroes/HH:${girlName}`
                    }

                    if (!girl.own) {
                        const $existingLink = $(this).find('.WikiLinkDialogbox > a')
                        if ($existingLink.length) {
                            $existingLink.attr('href', wikiLink)
                        } else {
                            $(this).find('.middle_part.missing_girl .dialog-box').append(`<div class="WikiLinkDialogbox"><a href="${wikiLink}" target="_blank">${Name || name}${texts[lang].wiki}</a></div>`);
                        }
                    }
                    if (girl.own) {
                        const $existingLink = $(this).find('.WikiLink a')
                        if ($existingLink.length) {
                            $existingLink.attr('href', wikiLink)
                        } else {
                            $(this).find('.middle_part h3').wrap(`<div class="WikiLink"><a href="${wikiLink}" target="_blank"></a></div>`)
                        }
                    }
                }
                var j = 0,
                    FirstLockedScene = 1,
                    AffectionTT = texts[lang].evolution_costs + ':<br />',
                    ScenesLink = '',
                    girl_quests = $(this).find('.girl_quests');
                girl_quests.find('g').each(function() {

                    j++;
                    var aff = 0,
                        money = 0,
                        kobans = 0;
                    var currentLevelMoney = 0,
                        currentLevelKobans = 0;
                    if (girl.graded != 0) {
                        currentLevelMoney = EvoReq[girl.rarity][girl.graded - 1].tmoney;
                        currentLevelKobans = EvoReq[girl.rarity][girl.graded - 1].tkobans;
                    }
                    if (girl.graded >= j) {
                    }
                    else if ((girl.graded + 1) == j && girl.Affection.level == j) {
                        money = EvoReq[girl.rarity][j - 1].tmoney - currentLevelMoney;
                        if (IS_NUTAKU_KOBANS) {
                            kobans = Math.ceil((EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans) / 6);
                        }
                        else {
                            kobans = EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans;
                        }
                    }
                    else {
                        aff = EvoReq[girl.rarity][j - 1].taffection - girl.Affection.cur;
                        money = EvoReq[girl.rarity][j - 1].tmoney - currentLevelMoney;
                        if (IS_NUTAKU_KOBANS) {
                            kobans = Math.ceil((EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans) / 6);
                        }
                        else {
                            kobans = EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans;
                        }
                    }
                    AffectionTT += addPriceRowGirl(j + '</b><span class="imgStar"></span>', aff, money, kobans);
                    ScenesLink += (ScenesLink === '') ? 'hh_scenes=' : ',';
                    var SceneHref = $(this).parent().attr('href');
                    if ($(this).hasClass('grey') || $(this).hasClass('green')) {
                        if (FirstLockedScene === 0) {
                            ScenesLink += '0';
                        }
                        else {
                            FirstLockedScene = 0;
                            var XpLeft = girl_quests.parent().parent().children('.girl_exp_left');
                            var isUpgradable = girl_quests.parent().children('.green_text_button');
                            ScenesLink += (isUpgradable.length) ? '0.' + isUpgradable.attr('href').substr(7) : '0';
                        }
                    }
                    else {
                        var attrHref = $(this).parent().attr('href');
                        if (typeof attrHref != 'undefined') {
                            ScenesLink += attrHref.substr(7);
                        }
                    }
                });

                girl_quests.children('a').each(function() {
                    var attr = $(this).attr('href');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        $(this).attr('href', attr + '?' + ScenesLink);
                    }
                });
                ScenesLink = '';

                girl_quests.parent().children('h4').prepend('<span class="CustomTT"></span><div class="AffectionTooltip">' + AffectionTT + '</div>');

            });
        }, 50);
    }

    //CSS
    sheet.insertRule('#harem_left .HaremetteNb {'
                     + 'float: right; '
                     + 'line-height: 14px; '
                     + 'font-size: 12px;}'
                    );

    sheet.insertRule('#CustomBar {'
                     + 'z-index: 99; '
                     + 'width: 100%; '
                     + 'padding: 3px 10px 0 3px; '
                     + 'font: bold 10px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'position: absolute; bottom: 3px; left: 0px;}'
                    );

    sheet.insertRule('#CustomBar img {'
                     + 'width: 20px; '
                     + 'height: 20px; '
                     + 'margin-right: 3px; '
                     + 'margin-bottom: 3px; '
                     + 'opacity: 0.5;}'
                    );

    sheet.insertRule('#CustomBar img:hover {'
                     + 'opacity: 1; '
                     + 'cursor: pointer;}'
                    );

    sheet.insertRule('#CustomBar .TopBottomLinks {'
                     + 'float: right; '
                     + 'margin-top: 2px;}'
                    );

    sheet.insertRule('#CustomBar a, #TabsContainer a {'
                     + 'color: #008; '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#harem_whole .WikiLink a {'
                     + 'color: #87CEFA; '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#CustomBar a:hover, #TabsContainer a:hover, #harem_right .WikiLink a:hover {'
                     + 'color: #B14; '
                     + 'text-decoration: underline;}'
                    );

    sheet.insertRule('#TabsContainer {'
                     + 'z-index: 99; '
                     + 'position: absolute; '
                     + 'bottom: 30px; '
                     + 'left: 12px; '
                     + 'box-sizing: content-box; '
                     + 'border: 1px solid rgb(156, 182, 213); '
                     + 'box-shadow: 1px -1px 1px 0px rgba(0,0,0,0.3); '
                     + 'font: normal 10px/16px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'color: #000000; '
                     + 'background-color: #ffffff; '
                     + 'display: none;}'
                    );

    sheet.insertRule('#TabsContainer > div {'
                     + 'padding: 1px 10px 8px 10px;}'
                    );

    sheet.insertRule('#TabsContainer .Title {'
                     + 'margin-left: -5px; '
                     + 'font: bold 12px/22px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'color: #B14;}'
                    );

    sheet.insertRule('#TabsContainer .subTitle {'
                     + 'padding-top: 10px; '
                     + 'font-weight: bold; '
                     + 'display: block;}'
                    );

    sheet.insertRule('#TabsContainer img {'
                     + 'width: 14px; '
                     + 'height: 14px; '
                     + 'vertical-align: text-bottom;}'
                    );

    sheet.insertRule('.StatsContent, #TabsContainer span, #TabsContainer img, #TabsContainer a, #TabsContainer b, #TabsContainer br {'
                     + 'box-sizing: content-box;}'
                    );

    sheet.insertRule('#harem_whole .CustomTT {'
                     + 'float: right; '
                     + 'margin-left: -25px; '
                     + 'margin-top: -5px; '
                     + 'background-image: url("https://i.postimg.cc/qBDt6yHV/icon-question.png"); '
                     + 'background-size: 18px 18px; '
                     + 'width: 18px; '
                     + 'height: 18px; '
                     + 'visibility: none;}'
                    );

    sheet.insertRule('#harem_whole .CustomTT:hover {'
                     + 'cursor: help;}'
                    );

    sheet.insertRule('#harem_whole .CustomTT:hover + div {'
                     + 'opacity: 1; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#harem_whole .AffectionTooltip {'
                     + 'position: absolute; '
                     + 'z-index: 99; '
                     + 'margin: 20px 0 0 0; '
                     + 'display: block; overflow: auto; '
                     + 'border: 1px solid rgb(162, 195, 215); '
                     + 'border-radius: 8px; '
                     + 'box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1); '
                     + 'padding: 3px 7px 4px 7px; '
                     + 'background-color: #F2F2F2; '
                     + 'color: #1E90FF; '
                     + 'font: normal 9px/17px Tahoma, Helvetica, Arial, sans-serif; '
                     + 'text-align: left; '
                     + 'text-shadow: none; '
                     + 'opacity: 0; '
                     + 'visibility: hidden; '
                     + 'transition: opacity 400ms, visibility 400ms;}'
                    );

    sheet.insertRule('#collect_all_container {'
                     + 'margin-top: 0px !important;}'
                    );

    sheet.insertRule('#harem_whole .AffectionTooltip b {'
                     + 'font-weight: bold;}'
                    );

    sheet.insertRule('#harem_whole .WikiLink {'
                     + 'font-size: 12px;}'
                    );

    sheet.insertRule('#harem_whole .WikiLinkDialogbox a {'
                     + 'text-decoration: none; '
                     + 'color: #24a0ff !important;}'
                    );

    sheet.insertRule('#harem_whole .imgStar, #harem_whole .imgMoney, #harem_whole .imgKobans, #haremwhole .imgStar, #harem_whole .imgMoney, #harem_whole .imgKobans {'
                     + 'background-size: 10px 10px; '
                     + 'background-repeat: no-repeat; '
                     + 'width: 10px; '
                     + 'height: 14px; '
                     + 'display: inline-block;}'
                    );

    sheet.insertRule('#harem_whole .imgStar, #harem_left .imgStar {'
                     + 'background-image: url("https://hh.hh-content.com/design_v2/affstar_S.png");}'
                    );

    sheet.insertRule('#harem_whole .imgMoney, #harem_left .imgMoney {'
                     + 'background-image: url("https://hh.hh-content.com/pictures/design/ic_topbar_soft_currency.png");}'
                    );

    sheet.insertRule('#harem_whole .imgKobans, #harem_left .imgKobans {'
                     + 'background-image: url("https://hh.hh-content.com/pictures/design/ic_topbar_hard_currency.png");}'
                    );

    sheet.insertRule('#hh_comix #harem_whole .imgMoney, #hh_comix #harem_left .imgMoney {'
                     + 'height: 12px; '
                     + 'background-image: url("https://ch.hh-content.com/pictures/design/ic_topbar_soft_currency.png");}'
                     );

    sheet.insertRule('#hh_comix #harem_whole .imgKobans, #hh_comix #harem_left .imgKobans {'
                     + 'background-size: 12px 12px; '
                     + 'width: 12px; '
                     + 'height: 14px; '
                     + 'background-image: url("https://ch.hh-content.com/pictures/design/ic_topbar_hard_currency.png");}'
                     );
}

/* ====================
    LEAGUE INFORMATION
   ==================== */

function moduleLeague() {
    if (CurrentPage.includes('tower-of-fame')) {

        let challengesDone = 0
        let playerCurrentPos
        let playerCurrentPoints
        let textDemote
        let textStagnate
        const topPoints = {}
        const levels = []

        const includeBoard = loadSetting('leagueBoard')

        const challengesPossibleMinutes = parseInt(Math.floor(season_end_at/60), 10)
        const challengesPossible = (Hero.energies.challenge.amount != Hero.energies.challenge.max_amount)? Math.floor((challengesPossibleMinutes + (35 - Hero.energies.challenge.next_refresh_ts / 60))/35) + parseInt(Hero.energies.challenge.amount, 10) : Math.floor(challengesPossibleMinutes/35) + parseInt(Hero.energies.challenge.amount, 10)

        const $tableRows = $('.leagues_table .lead_table_view tbody.leadTable tr')
        const playersTotal = $tableRows.length;
        const challengesTotal = 3*(playersTotal-1)
        const demoteThreshold = playersTotal-14
        const nonDemoteThreshold = playersTotal-15

        const tops = [4, 15, 30]
        const thresholds = [...tops, ...tops.map(top => top+1), demoteThreshold, nonDemoteThreshold]
        const tableData = {}

        for(var i=0; i<playersTotal; i++) {
            const $playerData = $tableRows.eq(i)

            let pos
            let points
            let playerChallengesDone = 0

            if ($playerData.hasClass('selected-player-leagues')) {
                // Mobile selected row has completely different layout and is missing data, thankfully the player is highlighted so we can use playerLeagesData instead.
                playerChallengesDone = playerLeaguesData.match_history.reduce((sum, match) => match ? sum+1: sum, 0)
                pos = parseInt(playerLeaguesData.rank, 10)
                points = parseLocaleRoundedInt(playerLeaguesData.points)
                levels.push(parseInt(playerLeaguesData.level, 10))
            } else {
                const $columns = $playerData.find('td')
                const fightsStr = $columns.eq(3).text()
                pos = parseInt($columns.eq(0).text(), 10)
                points = parseLocaleRoundedInt($columns.eq(4).text())
                levels.push(parseInt($columns.eq(2).text(), 10))

                if ($playerData.hasClass('personal_highlight')) {
                    playerCurrentPos = pos
                    playerCurrentPoints = points
                } else {
                    playerChallengesDone = parseInt(fightsStr.substring(0,1), 10)
                }
            }

            tableData[pos] = {
                points
            }

            if (thresholds.includes(pos)) {
                topPoints[pos] = points
            }

            challengesDone += playerChallengesDone
            tableData[pos].challengesDone = playerChallengesDone
        }

        thresholds.forEach(pos => topPoints[pos] = (tableData[pos] && tableData[pos].points || 0))

        const challengesLeft = challengesTotal-challengesDone

        const avgScore = (challengesDone !== 0) ? playerCurrentPoints/challengesDone : 0
        const avgRounded = Math.round(avgScore*100)/100
        const scoreExpected = Math.floor(avgScore*challengesTotal);

        const leagueScore = {
            points: playerCurrentPoints,
            avg: avgRounded
        }
        const oldScore = JSON.parse(localStorage.getItem('leagueScore')) || {points: 0, avg: 0}
        const {points: oldPoints} = oldScore
        if (playerCurrentPoints > oldPoints) {
            localStorage.setItem('leagueScore', JSON.stringify(leagueScore))
        }

        const canDemote = league_tag > 1
        const canPromote = league_tag < 9
        const showPromotionInformation = loadSetting('leaguePromo')
        const showDemotion = canDemote && showPromotionInformation
        const showStagnation = canPromote && showPromotionInformation
        const playerAtZeroPoints = playerCurrentPoints === 0
        const playerWouldDemote = canDemote && (playerAtZeroPoints || playerCurrentPos >= demoteThreshold)
        const playerIsTop15 = playerCurrentPos <= 15
        const playerWouldStagnate = !playerWouldDemote || !playerIsTop15

        if (showDemotion) {
            const maxDemotePoints = playerWouldDemote ? topPoints[nonDemoteThreshold] : topPoints[demoteThreshold]
            const holdZero = playerAtZeroPoints && !maxDemotePoints
            textDemote = holdZero ? labels.demote_holdzero : playerWouldDemote ? labels.demote_up.replace('{{points}}', maxDemotePoints) : labels.demote_down.replace('{{players}}', demoteThreshold - playerCurrentPos)
        }

        if (showStagnation) {
            const maxStagnatePoints = playerWouldStagnate ? topPoints[15] : topPoints[16]
            textStagnate = playerAtZeroPoints ? labels.stagnate_atzero : playerWouldStagnate ? labels.stagnate_up.replace('{{points}}', maxStagnatePoints) : labels.stagnate_down.replace('{{players}}', 16 - playerCurrentPos)
        }

        const promotionInfoTooltip = `${showStagnation ? `<p>${textStagnate}</p>` : ''}${showDemotion ? `<p>${textDemote}</p>` : ''}`

        const topDisplays = {}
        const topTooltips = {}

        if (includeBoard) {
            tops.forEach(top => {
                const playerIsInTop = playerCurrentPos <= top
                const minPoints = playerIsInTop ? topPoints[top + 1] : topPoints[top] + 1
                const diff = minPoints - playerCurrentPoints
                const diffSymbol = playerIsInTop ? diff ? '' : '-' : '+'
                topDisplays[top] = `${diffSymbol}${nThousand(diff)}`
                const label = labels[`top${top}_${playerIsInTop ? 'hold' : 'up'}`]
                topTooltips[top] = label.replace('{{points}}', nThousand(minPoints))
            })
        }

        const possibleChallengesTooltip = `${labels.challenges_regen}<em>${challengesPossible}</em>${labels.challenges_left}<em>${challengesLeft}</em>`

        const scriptLeagueInfo = `
            <div class="scriptLeagueInfo">
                <span class="averageScore" hh_title="${labels.averageScore}<em>${nThousand(avgRounded)}</em><br/>${labels.scoreExpected}<em>${nThousand(scoreExpected)}</em>"><img src="${MEAN_ICON_URI}" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 0px;">${nThousand(avgRounded)}</span>
                <span class="possibleChallenges" hh_title="${possibleChallengesTooltip}"><img src="https://${cdnHost}/league_points.png" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 0px;">${challengesPossible}/${challengesLeft}</span>
                ${includeBoard ?
                    tops.map(top => `
                        <span class="minTop${top}" hh_title="${topTooltips[top]}"><span class="scriptLeagueInfoIcon top${top}" />${topDisplays[top]}</span>
                    `).join('') : ''}
                ${showPromotionInformation ? `
                    <span class="promotionInfo" hh_title="${promotionInfoTooltip}"><img src="https://${cdnHost}/leagues/ic_rankup.png" style="height: 15px; width: 12px; margin-left: 6px; margin-bottom: 0px;"></span>
                ` : ''}
            </div>
        `

        $('div.league_end_in').append(scriptLeagueInfo)

        //CSS
        sheet.insertRule(`
            #leagues_middle .league_end_in {
                line-height: 16px;
            }
        `)

        sheet.insertRule(`
            .scriptLeagueInfo {
                display: block;
                float: right;
                margin-right: 9px;
            }
        `)

        sheet.insertRule(`
            ${mediaDesktop} {
                .scriptLeagueInfo {
                    font-size: 13px;
                }
            }
        `)

        sheet.insertRule(`
            ${mediaMobile} {
                .scriptLeagueInfo {
                    position: absolute;
                    right: 300px;
                    top: -20px;
                    font-size: 14px;
                }
            }
        `)

        sheet.insertRule(`
            .scriptLeagueInfoIcon {
                display: inline-block;
                height: 16px;
                width: 16px;
                font-size: 10px;
                border-radius: 5px;
                margin-left: 6px;
                margin-right: 2px;
            }
        `)

        sheet.insertRule(`
            .scriptLeagueInfoIcon:after {
                display: block;
                position: relative;
            }
        `)

        sheet.insertRule(`
            .scriptLeagueInfoIcon.top4 {
                background: url('https://${cdnHost}/legendary.png');
                background-size: cover;
            }
        `)
        sheet.insertRule(`
            .scriptLeagueInfoIcon.top4:after {
                content: '4';
                top: 2px;
                left: 4px;
            }
        `)
        sheet.insertRule(`
            .scriptLeagueInfoIcon.top15 {
                background-color: #ffb244;
            }
        `)
        sheet.insertRule(`
            .scriptLeagueInfoIcon.top15:after {
                content: '15';
                top: 2px;
                left: 3px;
            }
        `)
        sheet.insertRule(`
            .scriptLeagueInfoIcon.top30 {
                background-color: #23b56b;
            }
        `)
        sheet.insertRule(`
            .scriptLeagueInfoIcon.top30:after {
                content: '30';
                top: 2px;
                left: 1px;
            }
        `)

        sheet.insertRule(`
            .hh_tooltip_new em {
                color: white;
            }
        `)

        sheet.insertRule(`
            #leagues_middle .leagues_middle_header .leagues_girl_reward_container {
                right: 9px;
                top: -35px;
            }
        `)

        function removeBeatenOpponents() {
            var board = document.getElementsByClassName("leadTable")[0];
            if(!board)
                return;
            var opponents = board.getElementsByTagName("tr");
            for (var i=0; i<opponents.length; i++) {
                try {
                    const playerId = $(opponents[i]).attr('sorting_id')
                    if(leagues_list.find(({id_player}) => id_player === playerId).nb_challenges_played === "3"){
                        opponents[i].style.display="none"
                    }
                } catch(e) {}
            }
        }

        function displayBeatenOpponents() {
            var board = document.getElementsByClassName("leadTable")[0];
            if(!board)
                return;
            var opponents = board.getElementsByTagName("tr");
            for (var i=0; i<opponents.length; i++) {
                try {
                    const playerId = $(opponents[i]).attr('sorting_id')
                    if(leagues_list.find(({id_player}) => id_player === playerId).nb_challenges_played === "3"){
                        opponents[i].style.display=""
                    }
                } catch(e) {}
            }
        }

        let hidden = loadSetting('hide_beaten');
        $(".league_end_in").append('<button id="beaten_opponents" class=""><span id="hide_beaten"></span></button>');

        const setButtonDisplay = () => {
            $('#hide_beaten').html(`<img alt="${labels.display}" title="${labels.display}" src="https://${cdnHost}/quest/ic_eyeopen.svg">`);
        }
        const setButtonHide = () => {
            $('#hide_beaten').html(`<img alt="${labels.hide}" title="${labels.hide}" src="https://${cdnHost}/quest/ic_eyeclosed.svg">`);
        }

        if (hidden == 1) {
            removeBeatenOpponents();
            setButtonDisplay();
        }
        else {
            setButtonHide();
        }

        let button = document.querySelector('#beaten_opponents');
        button.addEventListener('click', function(){
            if (hidden == 0) {
                removeBeatenOpponents();
                hidden = 1;
                localStorage.setItem('HHS.hide_beaten', 1);
                setButtonDisplay();
            }
            else {
                displayBeatenOpponents();
                hidden = 0;
                localStorage.setItem('HHS.hide_beaten', 0);
                setButtonHide();
            }
        });

        let sort_by = document.querySelectorAll('span[sort_by]');
        for (var sort of sort_by) {
            sort.addEventListener('click', function(){
                if (hidden == 1)
                    removeBeatenOpponents();
                    displayLeaguePlayersInfo();
            });
        }

        sheet.insertRule(`
            #beaten_opponents {
                position: absolute;
                padding-left: 5px;
                padding-right: 5px;
                background: none;
                border: none;
                cursor: pointer;
            }
        `)
        sheet.insertRule(`
            ${mediaMobile} {
                #beaten_opponents {
                    height: 32px;
                    z-index: 1;
                    right: 517px;
                }
            }
        `);
        sheet.insertRule(`
            ${mediaDesktop} {
                #beaten_opponents {
                    height: 28px;
                    top: -40px;
                    left: 10px;
                }
            }
        `);
        sheet.insertRule(`
            #hide_beaten {
                position: relative;
            }
        `);
        sheet.insertRule(`
            #hide_beaten img, #hide_beaten_mobile img {
                width: auto;
            }
        `);
        sheet.insertRule(`
            ${mediaMobile} {
                #hide_beaten img, #hide_beaten_mobile img {
                    height: 26px;
                }
            }
        `);
        sheet.insertRule(`
            ${mediaDesktop} {
                #hide_beaten img, #hide_beaten_mobile img {
                    height: 20px;
                }
            }
        `);

        function resolveScoreConflicts(scores) {
            console.log('resolving scores', scores)
            const resolutionIndices = {
                4: [0,1,3],
                5: [0,3,4],
                6: [3,4,5]
            }
            const resolved = scores.filter((_,i) => resolutionIndices[scores.length].includes(i))
            console.log('resolved to:', resolved)
            return resolved
        }

        function displayLeaguePlayersInfo() {
            if (localStorage.getItem('newLeagueResults') == null) {
                localStorage.removeItem('leagueResults');
                localStorage.removeItem('pointHistory');
                localStorage.setItem('newLeagueResults', 1)
            }

            let player=playerLeaguesData.id_member;
            let points;
            try{
                points=JSON.parse(localStorage.getItem('pointHistory'))[player].points;
            }catch(e){
                points=[];
            }
            for(let i=0;i<3;i++){
                let result=$('.result')[i];
                if(result.innerText!=""){
                    result.innerText=points[i] || '?';
                }
            }

            const data = JSON.parse(localStorage.getItem('leagueResults')) || {};
            const pointHistory = JSON.parse(localStorage.getItem('pointHistory')) || {};
            let pointHistoryChanged = false
            for(let i=0; i<playersTotal; i++) {
                let playerData = $('.leagues_table .lead_table_view tbody.leadTable tr:nth-child(' + (i+1) + ')');
                let playerId = playerData.attr('sorting_id');
                let player = data[playerId];
                if (player) {
                    if (playerData.find('.classLeague').length===0) {
                        playerData.find('.square-avatar-wrapper').append($(`<div class="classLeague"></div>`));
                    }
                    if (player.themeIcons) {
                        const $classLeague = playerData.find('.classLeague')
                        $classLeague.empty()
                        player.themeIcons.forEach(icon => {
                            $classLeague.append(`<img class="theme-icon" src="${icon}"/>`)
                        })
                    }
                }
                if (!playerData.hasClass('personal_highlight')){
                    let points;
                    const leaguesListPlayer = leagues_list.find(({id_player}) => id_player===playerId)
                    try{
                        points=pointHistory[playerId].points;
                        if (leaguesListPlayer.nb_challenges_played === '3' && points.length > 3) {
                            points = resolveScoreConflicts(points)
                            pointHistory[playerId].points = points
                            pointHistoryChanged = true
                        }
                    }catch{
                        points=[];
                    }
                    let pointsText='';
                    const showIndividualPoints = localStorage.getItem('leagueTableShowIndividual') === "1"
                    if (showIndividualPoints) {
                        pointsText = [0,1,2].map(j => {
                            if(j<parseInt(leaguesListPlayer.nb_challenges_played)){
                                return points[j] || '?';
                            }
                            return '-';
                        }).join('/')
                    } else {
                        pointsText = `${leaguesListPlayer.nb_challenges_played}/3`
                    }
                    if (!playerData.hasClass('selected-player-leagues')) {
                        playerData[0].children[3].innerText=pointsText
                    }
                }
            }
            if (pointHistoryChanged) {
                localStorage.setItem('pointHistory', JSON.stringify(pointHistory))
            }
        }
        sheet.insertRule(`
            .square-avatar-wrapper .classLeague {
                position: absolute;
                display: flex;
                left: -38px;
                top: 6px;
                width: 100%;
                justify-content: flex-end;
            }
        `)
        sheet.insertRule(`
            .square-avatar-wrapper .classLeague img.theme-icon {
                flex: 0 1 0%;
                height: 17px;
                width: 17px;
                border: none;
                position: initial;
            }
        `)
        sheet.insertRule(`
            ${mediaMobile} {
                #leagues_middle>.leagues_table.lead_table>.lead_table_view table .square-avatar-wrapper .classLeague {
                    left: -66px;
                    top: 17px;
                }
            }
        `)
        sheet.insertRule(`
            ${mediaMobile} {
                #leagues_middle>.leagues_table.lead_table>.lead_table_view table .square-avatar-wrapper .classLeague img.theme-icon {
                    height: 25px;
                    width: 25px;
                }
            }
        `)

        function saveVictories() {
            let date_end_league = server_now_ts + season_end_at;

            let time_results = localStorage.getItem('leagueTime');
            if (time_results == null) {
                time_results = date_end_league;
                localStorage.setItem('leagueTime', time_results);
                localStorage.setItem('leagueResults', null);
            }

            if (server_now_ts > time_results) {
                localStorage.setItem('oldLeagueResults', localStorage.getItem('leagueResults'));
                localStorage.setItem('oldLeagueTime', localStorage.getItem('leagueTime'));
                localStorage.setItem('oldLeaguePlayers', localStorage.getItem('leaguePlayers'));
                localStorage.setItem('oldLeagueScore', localStorage.getItem('leagueScore'));
                localStorage.setItem('oldLeagueUnknown', localStorage.getItem('leagueUnknown'));
                localStorage.setItem('oldPointHistory', localStorage.getItem('pointHistory'));
                localStorage.removeItem('leagueResults');
                localStorage.setItem('leagueTime', date_end_league);
                localStorage.removeItem('leagueScore');
                localStorage.removeItem('leagueUnknown');
                localStorage.removeItem('pointHistory');
            }

            let data = JSON.parse(localStorage.getItem('leagueResults')) || {};
            let player = `${playerLeaguesData.id_member}`
            let spec = playerLeaguesData.class
            let $themeIcons = $('#leagues_middle .selected-player-leagues .theme-container img')
            if (!$themeIcons.length) {
                $themeIcons = $('#leagues_right .team-theme')
            }
            const themeIcons = $themeIcons.map((i,el)=>$(el).attr('src')).toArray()
            let results = playerLeaguesData.match_history
            const nb_victories = results.filter(match => match === 'won').length;
            const nb_defeats = results.filter(match => match === 'lost').length;

            data[player] = {
                victories: nb_victories,
                defeats: nb_defeats,
                class: spec,
                themeIcons
            };

            localStorage.setItem('leagueResults', JSON.stringify(data));

            calculateVictories();
        }

        function calculateVictories() {
            let data = JSON.parse(localStorage.getItem('leagueResults')) || {};
            let players = $('#leagues_middle .leadTable tr');
            let nb_players = players.length;
            let nb_opponents = nb_players-1;
            localStorage.setItem('leaguePlayers', nb_opponents);

            let fightsPlayed = 0;
            for (var i=0; i<nb_players; i++) {
                fightsPlayed += parseInt(leagues_list[i].nb_challenges_played);
            }

            let tot_victory = 0;
            let tot_defeat = 0;
            for(let key in data) {
                tot_victory += data[key].victories;
                tot_defeat += data[key].defeats;
            }

            let tot_notPlayed = 3*nb_opponents - fightsPlayed;
            let nb_unknown = fightsPlayed - tot_victory - tot_defeat;
            localStorage.setItem('leagueUnknown', nb_unknown);

            const maxLevel = Math.max(...levels)
            const minLevel = Math.min(...levels)
            levels.sort((a,b) => a-b)
            const midpoint = Math.floor(levels.length / 2);
            const medianLevel = levels.length % 2 ? levels[midpoint] : (levels[midpoint - 1] + levels[midpoint]) / 2.0

            const leagueStatsText = `
                <hr/>
                <span id="leagueStats"><u>${labels.current_league}</u>
                <table>
                    <tbody>
                        <tr><td>${labels.victories} :</td><td><em>${tot_victory}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${labels.defeats} :</td><td><em>${tot_defeat}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${labels.unknown} :</td><td><em>${nb_unknown}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${labels.notPlayed} :</td><td><em>${tot_notPlayed}</em>/<em>${3*nb_opponents}</em></td></tr>
                        <tr><td>${label('levelRange')} :</td><td><em>${minLevel}</em>…<em>${medianLevel}</em>…<em>${maxLevel}</em></td></tr>
                    </tbody>
                </table>
                </span>`

            let old_data = JSON.parse(localStorage.getItem('oldLeagueResults')) || {};
            let old_nb_opponents = JSON.parse(localStorage.getItem('oldLeaguePlayers')) || 0;
            let old_nb_unknown = localStorage.getItem('oldLeagueUnknown');
            let old_score = JSON.parse(localStorage.getItem('oldLeagueScore')) || {};

            let old_tot_victory = 0;
            let old_tot_defeat = 0;

            let old_points = old_score.points || 0;
            let old_avg = old_score.avg || 0;

            for(let old_key in old_data) {
                old_tot_victory += old_data[old_key].victories;
                old_tot_defeat += old_data[old_key].defeats;
            }

            let old_tot_notPlayed = 3*old_nb_opponents - old_tot_victory - old_tot_defeat - old_nb_unknown;

            const options = {year: 'numeric', month: 'short', day: 'numeric'};
            let old_date_end_league = new Date(localStorage.getItem('oldLeagueTime')*1000).toLocaleDateString(undefined, options);

            let oldLeagueStatsText
            if (localStorage.getItem('oldLeagueTime') != null) {
                oldLeagueStatsText = `
                    <hr/>
                    <span id="oldLeagueStats">
                        ${labels.league_finished}<em>${old_date_end_league}</em>
                        <table>
                            <tbody>
                                <tr><td>${labels.victories} :</td><td><em>${old_tot_victory}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${labels.defeats} :</td><td><em>${old_tot_defeat}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${labels.notPlayed} :</td><td><em>${old_tot_notPlayed}</em>/<em>${3*old_nb_opponents}</em></td></tr>
                                <tr><td>${labels.opponents} :</td><td><em>${old_nb_opponents}</em></td></tr>
                                <tr><td>${labels.leaguePoints} :</td><td><em>${nThousand(old_points)}</em></td></tr>
                                <tr><td>${labels.avg} :</td><td><em>${nThousand(old_avg)}</em></td></tr>
                            </tbody>
                        </table>
                    </span>`
            }

            const allLeagueStatsText = `${possibleChallengesTooltip}${leagueStatsText}${oldLeagueStatsText}`
            $('.possibleChallenges').attr('hh_title', allLeagueStatsText)
        }

        saveVictories();
        displayLeaguePlayersInfo();

        var observeCallback = function() {
            saveVictories();
            displayLeaguePlayersInfo();
        }

        const leagueTableShowIndividualCurrent = localStorage.getItem('leagueTableShowIndividual')
        const individualDisplaySwitchOptions = [
            {label: '22/21/-', value: "1"},
            {label: '2/3', value: "0"}
        ].map(option => $(`
            <label>
                <input type="radio" name="leagueTableShowIndividual" value="${option.value}" ${option.value === leagueTableShowIndividualCurrent ? 'checked' : ''} />
                <span>${option.label}</span>
            </label>
        `.replace(/(\n|    )/g, '')).change((e) => {
            localStorage.setItem('leagueTableShowIndividual', e.target.value)
            displayLeaguePlayersInfo()
        }))
        const individualDisplaySwitch = $('<div class="individualDisplaySwitch"></div>')
        individualDisplaySwitchOptions.forEach((option, i) => {
            if (i > 0) {
                individualDisplaySwitch.append('&middot;')
            }
            individualDisplaySwitch.append(option)
        })

        $('.league_end_in').append(individualDisplaySwitch)

        var observer = new MutationObserver(observeCallback);
        var test = document.getElementById('leagues_right');
        observer.observe(test, {attributes: false, childList: true, subtree: false});

        sheet.insertRule(`
            #leagueStats table,
            #oldLeagueStats table {
                margin-left: auto;
                margin-right: auto;
            }
        `)
        sheet.insertRule(`
            #leagueStats table tr td:first-child,
            #oldLeagueStats table tr td:first-child {
                text-align: right;
            }
        `)
        sheet.insertRule(`
            #leagueStats table tr td:last-child,
            #oldLeagueStats table tr td:last-child {
                text-align: left;
            }
        `)
        sheet.insertRule(`
            .individualDisplaySwitch {
                position: absolute;
            }
        `)
        sheet.insertRule(`
            .individualDisplaySwitch input {
                display: none;
            }
        `)
        sheet.insertRule(`
            .individualDisplaySwitch input+span {
                color: #d08467;
                padding: 5px;
                cursor: pointer;
            }
        `)
        sheet.insertRule(`
            .individualDisplaySwitch input:checked+span,
            .individualDisplaySwitch input:hover+span {
                color: #fff;
            }
        `)
        sheet.insertRule(`
            ${mediaDesktop} {
                .individualDisplaySwitch {
                    top: -33px;
                    left: 90px;
                }
            }
        `)
        sheet.insertRule(`
            ${mediaMobile} {
                .individualDisplaySwitch {
                    top: 10px;
                    left: 335px;
                    font-size: 16px;
                }
            }
        `)
    }

    if (CurrentPage.includes('battle') && !CurrentPage.includes('pre-battle')) {
        $(document).ajaxComplete(function(evt, xhr, opt) {
            const searchParams = new URLSearchParams(opt.data)
            if(searchParams.get('action') === 'do_league_battles') {
                const response = JSON.parse(xhr.responseText)

                const player = searchParams.get('id_opponent')
                const points = response.rewards.heroChangesUpdate.league_points

                const pointHist = JSON.parse(localStorage.getItem('pointHistory')) || {}
                try{
                    pointHist[player].points.push(points)
                } catch(e) {
                    pointHist[player]={points:[points]}
                }
                localStorage.setItem('pointHistory', JSON.stringify(pointHist))
            }
        })
    }
}

/* ============
    LEAGUE SIM
   ============ */

function moduleSim() {
    function calculatePower() {
        // INIT
        const {
            chance: playerCrit,
            damage: playerAtk,
            defense: playerDef,
            totalEgo: playerTotalEgo,
            total_ego: player_total_ego,
            team: playerTeam
        } = heroLeaguesData
        const playerEgo = playerTotalEgo || player_total_ego
        let normalisedElements = playerTeam.theme_elements
        let normalisedSynergies = playerTeam.synergies

        if (!normalisedElements) {
            normalisedElements = []
            const teamElementCounts = countElementsInTeam([0,1,2,3,4,5,6].map(key => playerTeam[key].element_data.type))
            Object.entries(teamElementCounts).forEach(([type, count]) => {
                if (count >= 3) {
                    normalisedElements.push({type})
                }
            })
        }

        if (!normalisedSynergies) {
            normalisedSynergies = JSON.parse($('#leagues_left .hexa .icon-area').attr('synergy-data'))
        }

        const playerElements = normalisedElements.map(({type}) => type)
        const playerSynergies = normalisedSynergies
        const playerBonuses = {
            critDamage: findBonusFromSynergies(playerSynergies, 'fire'),
            critChance: findBonusFromSynergies(playerSynergies, 'stone'),
            defReduce: findBonusFromSynergies(playerSynergies, 'sun'),
            healOnHit: findBonusFromSynergies(playerSynergies, 'water'),
        }

        const {
            chance: opponentCrit,
            damage: opponentAtk,
            defense: opponentDef,
            ego: opponentEgo,
        } = playerLeaguesData.caracs
        const {
            team: opponentTeam
        } = playerLeaguesData
        const opponentTeamMemberElements = [];
        [0,1,2,3,4,5,6].forEach(key => {
            const teamMember = opponentTeam[key]
            if (teamMember && teamMember.element) {
                opponentTeamMemberElements.push(teamMember.element)
            }
        })
        const opponentElements = (opponentTeam.themeElements || opponentTeam.theme_elements).map(({type}) => type)
        const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements)

        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo * (1 + dominanceBonuses.player.ego),
            dmg: (playerAtk * (1 + dominanceBonuses.player.attack)) - (opponentDef * (1 - playerBonuses.defReduce)),
            critchance: calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: playerBonuses
        };
        const opponent = {
            hp: opponentEgo * (1 + dominanceBonuses.opponent.ego),
            dmg: (opponentAtk * (1 + dominanceBonuses.opponent.attack)) - (playerDef * (1 - opponentBonuses.defReduce)),
            critchance: calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name: $('#leagues_right .player_block .title').text(),
            bonuses: opponentBonuses
        };

        const {points: calc, win, scoreClass} = calculateBattleProbabilities(player, opponent)
        let probabilityTooltip = `<table class='probabilityTable'>`;
        let expectedValue = 0;
        const pointGrade=['#fff','#fff','#fff','#ff2f2f','#fe3c25','#fb4719','#f95107','#f65b00','#f26400','#ed6c00','#e97400','#e37c00','#de8400','#d88b00','#d19100','#ca9800','#c39e00','#bba400','#b3aa00','#aab000','#a1b500','#97ba00','#8cbf00','#81c400','#74c900','#66cd00'];
        for (let i=25; i>=3; i--) {
            if (calc[i]) {
                const isW = i>=15
                probabilityTooltip += `<tr style='color:${isW?pointGrade[25]:pointGrade[3]};' data-tint='${isW?'w':'l'}'><td>${i}</td><td>${(100*calc[i]).toFixed(2)}%</td></tr>`;
                expectedValue += i*calc[i];
            }
        }
        probabilityTooltip += `<tr class='${scoreClass}'><td>${GT.design.leagues_won_letter}</td><td>${(100*win).toFixed(2)}%</td></tr>`
        probabilityTooltip += '</table>'

        $('.matchRating').remove();

        const $rating = $(`<div class="matchRating" style="color:${pointGrade[Math.round(expectedValue)]};" hh_title="${probabilityTooltip}">E[X]: ${expectedValue.toFixed(1)}</div>`)
        $('#leagues_right .average-lvl').wrap('<div class="gridWrapper"></div>').after($rating);
        $('.lead_table_default > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) .level').append($rating);
    }

    calculatePower();

    // Refresh sim on new opponent selection (Credit: BenBrazke)
    var opntName;
    $('.leadTable').click(function() {
        opntName=''
    })

    function waitOpnt() {
        setTimeout(function() {
            if (JSON.parse($('#leagues_right .team-hexagon div:nth-child(2) div:nth-child(2) .team-member img').attr('data-new-girl-tooltip'))) {
                sessionStorage.setItem('opntName', opntName);
                calculatePower();
            }
            else {
                waitOpnt()
            }
        }, 50);
    }

    var observeCallback = function() {
        var opntNameNew = $('#leagues_right .player_block .title')[0].innerHTML
        if (opntName !== opntNameNew) {
            opntName = opntNameNew;
            waitOpnt();
        }
    }

    var observer = new MutationObserver(observeCallback);
    var test = document.getElementById('leagues_right');
    observer.observe(test, {attributes: false, childList: true, subtree: false});

    //CSS
    /*sheet.insertRule('#leagues_right .player_block .lead_player_profile .level_wrapper {'
                     + 'top: -8px !important;}'
                    );

    sheet.insertRule('#leagues_right .player_block .lead_player_profile .icon {'
                     + 'top: 5px !important;}'
                    );*/

    sheet.insertRule(`
        ${mediaDesktop} {
            .matchRating {
                text-align: center;
                text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000;
                line-height: 25px;
                font-size: 18px;
            }
        }
    `);

    sheet.insertRule(`
        ${mediaMobile} {
            .matchRating {
                margin-left: 75px;
                text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000;
                line-height: 0px;
                font-size: 18px;
            }
        }
    `);

    sheet.insertRule(`
        .average-lvl {
            text-align: center;
        }
    `);
    sheet.insertRule(`
        .probabilityTable tr {
            line-height: 16px;
            color: #fff;
        }
    `)
    sheet.insertRule(`
        .probabilityTable tr:nth-of-type(odd) {
            background-color: rgba(0,0,0,0.2);
        }
    `)
    sheet.insertRule(`
        .probabilityTable tr:nth-of-type(even)[data-tint=w] {
            background-color: #66cd0028;
        }
    `)
    sheet.insertRule(`
        .probabilityTable tr:nth-of-type(even)[data-tint=l] {
            background-color: #ff2f2f28;
        }
    `)
    sheet.insertRule('.probabilityTable .plus {'
                     + 'color: #66CD00;}'
                    );

    sheet.insertRule('.probabilityTable .minus {'
                     + 'color: #FF2F2F;}'
                    );

    sheet.insertRule('.probabilityTable .close {'
                     + 'color: #FFA500;}'
                    );
    sheet.insertRule(`
        .gridWrapper {
            margin-top: -42px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 24px;
            z-index: 0;
        }
    `)
    sheet.insertRule(`
        #leagues_right .player_block .team-hexagon-container .icon {
            z-index: 1;
        }
    `)
}

// == Helper functions for probability calculations ==
// Calculate the chance to get a sequence with given amount of crits and non-crits at a given critchance
function calculateChance(crits, hits, critchance) {
    // returns (crits+hits)!/(crits!*hits!) * critchance^crits * (1-critchance)^hits
    let binCoeffNumerator = 1;
    for(let i = crits+hits; i>crits; i--) {
        binCoeffNumerator *= i;
    }

    let binCoeffDenominator = 1;
    for(let j = 1; j<=hits; j++) {
        binCoeffDenominator *= j;
    }

    return binCoeffNumerator/binCoeffDenominator * Math.pow(critchance, crits) * Math.pow(1-critchance, hits);
}
// Calculate the chance to finish a match with a crit even though a normal hit would have been enough
function calculateOverkillChance(crits, hits, critchance) {
    if (hits==0) return 0;
    return calculateChance(crits, hits-1, critchance)*critchance;
}
function calculateDominationBonuses(playerElements, opponentElements) {
    const bonuses = {
        player: {
            ego: 0,
            attack: 0,
            chance: 0
        },
        opponent: {
            ego: 0,
            attack: 0,
            chance: 0
        }
    };

    [
        {a: playerElements, b: opponentElements, k: 'player'},
        {a: opponentElements, b: playerElements, k: 'opponent'}
    ].forEach(({a,b,k})=>{
        a.forEach(element => {
            if (ELEMENTS.egoDamage[element] && b.includes(ELEMENTS.egoDamage[element])) {
                bonuses[k].ego += 0.1
                bonuses[k].attack += 0.1
            }
            if (ELEMENTS.chance[element] && b.includes(ELEMENTS.chance[element])) {
                bonuses[k].chance += 0.2
            }
        })
    })

    return bonuses
}

function countElementsInTeam(elements) {
    return elements.reduce((a,b)=>{a[b]++;return a}, {
        fire: 0,
        stone: 0,
        sun: 0,
        water: 0,
        nature: 0,
        darkness: 0,
        light: 0,
        psychic: 0
    })
}

function findBonusFromSynergies(synergies, element) {
    const {bonusMultiplier, bonus_multiplier} = synergies.find(({element: {type}})=>type===element)
    return (bonusMultiplier || bonus_multiplier)
}

function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    const girlCount = girlDictionary.size || 800
    const girlsPerElement = Math.min(girlCount / 8, 100)

    return {
        critDamage: (0.0035 * girlsPerElement) + (0.1  * counts.fire),
        critChance: (0.0007 * girlsPerElement) + (0.02 * counts.stone),
        defReduce:  (0.0007 * girlsPerElement) + (0.02 * counts.sun),
        healOnHit:  (0.001  * girlsPerElement) + (0.03 * counts.water)
    }
}

function calculateThemeFromElements(elements) {
    const counts = countElementsInTeam(elements)

    const theme = []
    Object.entries(counts).forEach(([element, count]) => {
        if (count >= 3) {
            theme.push(element)
        }
    })
    return theme
}

function calculateCritChanceShare(ownHarmony, otherHarmony) {
    return 0.3*ownHarmony/(ownHarmony+otherHarmony)
}

// Calculate the chance to win the fight
function calcWinProbability(player, opponent) {
    const logging = loadSetting("logSimFight");
    // check edge cases and shortcuts
    if (player.dmg <= 0) {
        return {
            scoreStr: "0%",
            scoreClass: "minus"
        };
    } else if (opponent.dmg <= 0) {
        return {
            scoreStr: "100%",
            scoreClass: "plus"
        };
    } else if (Math.floor(1+player.hp/opponent.dmg)*2*player.dmg < opponent.hp) {
        // guaranteed loss
        return {
            scoreStr: "0%",
            scoreClass: "minus"
        };
    } else if (Math.ceil(opponent.hp/player.dmg-1)*2*opponent.dmg < player.hp) {
        // guaranteed win
        return {
            scoreStr: "100%",
            scoreClass: "plus"
        };
    }

    // Amount of non-crit hits we can take without losing
    const tolerableHits = Math.ceil(player.hp/opponent.dmg)-1;

    let winChance = 0;
    let loseChance = 0;
    let playerCrits = 0;
    let playerNormalHits = Math.ceil(opponent.hp/player.dmg);

    if(logging) console.log('Probability calculation log for: ' + opponent.name);
    do {
        if(logging) console.log(' Scenario: ' + playerCrits + ' crits and ' + playerNormalHits + ' hits');
        let scenarioLikelihood = calculateChance(playerCrits, playerNormalHits, player.critchance);
        let overkillChance = calculateOverkillChance(playerCrits, playerNormalHits, player.critchance);
        if(logging) console.log('  Scenario likelihood: ' + 100*scenarioLikelihood + ' % + ' + 100*overkillChance + ' % chance for overkill');
        scenarioLikelihood += overkillChance;

        let rounds = playerCrits + playerNormalHits;
        let tolerableCrits = tolerableHits-rounds+1;
        if(logging) console.log('  Opponent is allowed to crit ' + tolerableCrits + ' times');

        if (tolerableCrits < 0) {
            if(logging) console.log('  => impossible, we lose');
            loseChance += scenarioLikelihood;
        } else if (tolerableCrits >= rounds-1) {
            if(logging) console.log ('  => guaranteed, we win');
            winChance += scenarioLikelihood;
        } else {
            let opponentLikelihood = 0;
            for(let i=0; i<=tolerableCrits; i++) {
                let tmp = calculateChance(i, rounds-i-1, opponent.critchance);
                if(logging) console.log('   probability for ' + i + ' crits and ' + (rounds-i-1) + ' hits: ' + 100*tmp + ' %');
                opponentLikelihood += tmp;
            }
            if(logging) console.log('  ' + 100*opponentLikelihood + ' % chance that this condition is fulfilled');
            if(logging) console.log('  => ' + 100*opponentLikelihood*scenarioLikelihood + ' % to win through this scenario');
            winChance += opponentLikelihood*scenarioLikelihood;
            loseChance += (1-opponentLikelihood)*scenarioLikelihood;
        }

        playerCrits++;
        playerNormalHits-=2;
    } while (playerNormalHits >= 0);

    if(logging) console.log(100*winChance+ ' % chance to win vs. ' + 100*loseChance + ' % chance to lose => ' + 100*(winChance+loseChance) + ' % total coverage.');

    return {
        scoreStr: nRounding(100*winChance, 2, -1) + '%',
        scoreClass: winChance>0.9?"plus":winChance<0.5?"minus":"close"
    };
}

function calcLeagueProbabilities(player, opponent) {
    const logging = loadSetting("logSimFight");
    let ret = new Array(26); // Array with probabilities, key = points

    if (player.dmg <= 0) {
        ret[3]=1;
        return ret;
    } else if (opponent.dmg <= 0) {
        ret[25]=1;
        return ret;
    }

    const requiredHitsForPlayerDeath = Math.ceil(player.hp/opponent.dmg);
    const requiredHitsForOpponentDeath = Math.ceil(opponent.hp/player.dmg);

    if(logging) console.log('Probability calculation log for: ' + opponent.name);
    // Lose scenarios
    let opponentCrits = Math.floor(requiredHitsForPlayerDeath/2);
    let opponentHits = requiredHitsForPlayerDeath%2;
    do {
        let scenarioLikelihood = calculateChance(opponentCrits, opponentHits, opponent.critchance)
            + calculateOverkillChance(opponentCrits, opponentHits, opponent.critchance);
        let rounds = opponentCrits+opponentHits;
        let tolerablePlayerCrits = Math.min(rounds, requiredHitsForOpponentDeath-rounds-1);
        if(logging) {
            console.log(' Scenario: Opponent crits ' + opponentCrits + ' and hits ' + opponentHits + ' times (' + 100*scenarioLikelihood + ' %)');
            console.log('  Opponent wins if player crits ' + tolerablePlayerCrits + ' times or less');
        }
        if(tolerablePlayerCrits < 0) {
            if(logging) console.log('   => impossible');
            break; // less crits won't make it better
        }
        for(let playerCrits=0; playerCrits <= tolerablePlayerCrits; playerCrits++) {
            let playerHits = rounds-playerCrits;
            let opponentHpLeft = opponent.hp-player.dmg*(playerHits+2*playerCrits);
            let points = 3 + Math.ceil(10-10*opponentHpLeft/opponent.hp);
            let totalResultChance = scenarioLikelihood * calculateChance(playerCrits, playerHits, player.critchance);
            if(logging) {
                console.log('   If player crits ' + playerCrits + ' and hits ' + playerHits + ' times, opponent has ' + opponentHpLeft +
                    ' Hp left (' + (100*opponentHpLeft/opponent.hp).toFixed(2) + ' %) => ' + points +
                    ' points (Probability for this outcome: ' + 100*totalResultChance + ' %)');
            }
            ret[points] = (ret[points]||0) + totalResultChance;
        }

        opponentCrits--;
        opponentHits+=2;
    } while (opponentCrits >= 0);

    // Win scenarios
    let playerCrits = Math.floor(requiredHitsForOpponentDeath/2);
    let playerHits = requiredHitsForOpponentDeath%2;
    do {
        let scenarioLikelihood = calculateChance(playerCrits, playerHits, player.critchance)
            + calculateOverkillChance(playerCrits, playerHits, player.critchance);
        let rounds = playerCrits+playerHits;
        let tolerableOpponentCrits = Math.min(rounds-1, requiredHitsForPlayerDeath-rounds);
        if(logging) {
            console.log(' Scenario: Player crits ' + playerCrits + ' and hits ' + playerHits + ' times (' + 100*scenarioLikelihood + ' %)');
            console.log('  Player wins if opponent crits ' + tolerableOpponentCrits + ' times or less');
        }
        if(tolerableOpponentCrits < 0) {
            if(logging) console.log('   => impossible');
            break; // less crits won't make it better
        }
        for(opponentCrits=0; opponentCrits <= tolerableOpponentCrits; opponentCrits++) {
            opponentHits = rounds-opponentCrits-1;
            let playerHpLeft = player.hp-opponent.dmg*(opponentHits+2*opponentCrits);
            let points = 15 + Math.ceil(10*playerHpLeft/player.hp);
            let totalResultChance = scenarioLikelihood * calculateChance(opponentCrits, opponentHits, opponent.critchance);
            if(logging) {
                console.log('   If opponent crits ' + opponentCrits + ' and hits ' + opponentHits + ' times, player has ' + playerHpLeft +
                    ' Hp left (' + (100*playerHpLeft/player.hp).toFixed(2) + ' %) => ' + points +
                    ' points (Probability for this outcome: ' + 100*totalResultChance + ' %)');
            }
            ret[points] = (ret[points]||0) + totalResultChance;
        }

        playerCrits--;
        playerHits+=2;
    } while (playerCrits >= 0);
    if(logging) console.log(`If you win: opponent ego at end [${nThousand(opponent.hp - (requiredHitsForOpponentDeath * player.dmg))}]; ego just before loss [${nThousand(opponent.hp - ((requiredHitsForOpponentDeath - 1) * player.dmg))}]`)
    if(logging) console.log('Total % covered (should be 100): ' + 100*ret.reduce((a,b)=>a+b,0));
    return ret;
}

function calculateBattleProbabilities (player, opponent) {
    const logging = loadSetting("logSimFight");
    const ret = {
        points: {},
        win: 0,
        loss: 0,
        avgTurns: 0,
        scoreClass: ''
    }

    player.critMultiplier = 2 + player.bonuses.critDamage
    opponent.critMultiplier = 2 + opponent.bonuses.critDamage

    let runs = 0
    let wins = 0
    let losses = 0
    const pointsCollector = {}
    let totalTurns = 0

    while (runs < STOCHASTIC_SIM_RUNS) {
        const {points, turns} = simulateBattle({...player}, {...opponent})

        pointsCollector[points] = (pointsCollector[points] || 0) + 1
        if (points >= 15) {
            wins++
        } else {
            losses++
        }

        totalTurns += turns
        runs++
    }

    ret.points = Object.entries(pointsCollector).map(([points, occurrences]) => ({[points]: occurrences/runs})).reduce((a,b)=>Object.assign(a,b), {})

    ret.win = wins/runs
    ret.loss = losses/runs
    ret.avgTurns = totalTurns/runs
    ret.scoreClass = ret.win>0.9?"plus":ret.win<0.5?"minus":"close"

    if (logging) {console.log(`Ran ${runs} simulations against ${opponent.name}, won ${ret.win * 100}% of simulated fights, average turns: ${ret.avgTurns}`)}

    return ret
}

function simulateBattle (player, opponent) {
    let points

    const playerStartHP = player.hp
    const opponentStartHP = opponent.hp

    let turns = 0
    const maxAllowedTurns = 50

    while (turns < maxAllowedTurns) {
        turns++
        //your turn
        let damageAmount = player.dmg
        if (Math.random() < player.critchance) {
            damageAmount = player.dmg * player.critMultiplier
        }
        let healAmount = Math.min(playerStartHP - player.hp, damageAmount * player.bonuses.healOnHit)
        opponent.hp -= damageAmount;
        player.hp += healAmount;

        //check win
        if(opponent.hp<=0){
            //count score
            points = 15+Math.ceil(player.hp/playerStartHP * 10);
            break;
        }

        //opp's turn
        damageAmount = opponent.dmg
        if (Math.random() < opponent.critchance) {
            damageAmount = opponent.dmg * opponent.critMultiplier
        }
        healAmount = Math.min(opponentStartHP - opponent.hp, damageAmount * opponent.bonuses.healOnHit)
        player.hp -= damageAmount;
        opponent.hp += healAmount;

        //check loss
        if(player.hp<=0){
            //count score
            points = 3+Math.ceil((opponentStartHP - opponent.hp)/opponentStartHP * 10);
            break;
        }
    }

    return {points, turns}
}

/* =========================================
    CHAMPIONS INFORMATION (Credit: Entwine)
   ========================================= */

function moduleChampions() {
    if (sessionStorage.getItem('championsCallBack') && $('.page-shop').length) {
        const championsCallBack = JSON.parse(sessionStorage.getItem('championsCallBack'));
        $('#breadcrumbs .back').after('<span>&gt;</span><a class="back" href="/champions-map.html" >'
                                      + $('nav [rel="content"] a[href="/champions-map.html"]').text().trim()
                                      + '<span class="mapArrowBack_flat_icn"></span></a><span>&gt;</span><a class="back" href="'
                                      + championsCallBack.location + '">'
                                      + championsCallBack.name + '<span class="mapArrowBack_flat_icn"></span></a>');
        sessionStorage.removeItem('championsCallBack');
    }
    else if ($('.page-champions').length || $('.page-club_champion').length) {
        const DEFAULT_CHAMPIONS_DATA = '{"attempts": {}, "config" : {}, "positions" : {}, "statistics" : {}}';
        const personalKey = Hero.infos.id + '/' + championData.champion.id;
        let championsData = ($('.page-champions').length == 1) ? JSON.parse(localStorage.getItem('championsData') || DEFAULT_CHAMPIONS_DATA) : JSON.parse(localStorage.getItem('clubChampionsData') || DEFAULT_CHAMPIONS_DATA);
        let positions = championsData.positions[personalKey];
        let positions2 = championData.champion.poses;
        let statistics = championsData.statistics[championData.champion.id];
        let attempts = championsData.attempts[personalKey];
        let config = championsData.config[Hero.infos.id] || {};
        let page = ($('.page-champions').length == 1) ? $('.page-champions') : $('.page-club_champion');
        let isSkipButtonClicked;
        markMatchedPositions();
        if ($('.page-champions').length) showAdditionalInformation();
        showNumberOfTicketsWhileTeamResting();
        page
            .on('click', '.champions-bottom__draft-box > button', () => {setTimeout(markMatchedPositions, 1000)})
            .on('click', '.champions-bottom__confirm-team', showNumberOfTicketsWhileTeamResting)
            .on('click', '.champions-bottom__skip-champion-cooldown', () => {isSkipButtonClicked = true});
        $('.page-club_champion')
            .on('click', '.champions-bottom__draft-box > button', () => {setTimeout(markMatchedPositions, 1000)})
            .on('click', '.champions-bottom__confirm-team', showNumberOfTicketsWhileTeamResting)
            .on('click', '.champions-bottom__skip-champion-cooldown', () => {isSkipButtonClicked = true});
        $(window).on('beforeunload', () => {
            championsData = ($('.page-champions').length == 1) ? JSON.parse(localStorage.getItem('championsData') || DEFAULT_CHAMPIONS_DATA) : JSON.parse(localStorage.getItem('clubChampionsData') || DEFAULT_CHAMPIONS_DATA);
            championsData.positions[personalKey] = positions;
            championsData.attempts[personalKey] = attempts;
            championsData.statistics[championData.champion.id] = statistics;
            championsData.config[Hero.infos.id] = Object.keys(config).length? config : undefined;
            if ($('.page-champions').length) localStorage.setItem('championsData', JSON.stringify(championsData));
            else localStorage.setItem('clubChampionsData', JSON.stringify(championsData));
        });
        $(document).ajaxComplete(function(event, xhr, options) {
            const response = JSON.parse(xhr.responseText);
            if (response.positions) {
                if (!positions) {
                    if (!statistics) {
                        statistics = Array(positionImages.length).fill(0);
                    }
                    response.positions.forEach((e) => statistics[e]++);
                    attempts = 0;
                }
                if (response.final.attacker_ego > 0 || response.final.winner.type == 'hero') {
                    positions = undefined;
                }
                else {
                    positions = response.positions;
                }
                attempts++;
            }
            else {
                markMatchedPositions();
            }
            if (isSkipButtonClicked) {
                showAdditionalInformation();
                isSkipButtonClicked = false;
            }
        });
        const restTimer = $('.champions-bottom__rest [timer], .champions-middle__champion-resting[timer]');
        if (restTimer.is(':visible')) {
            const delayTime = Math.ceil(restTimer.attr('timer') * 1000 - Date.now());
            setTimeout(markMatchedPositions, delayTime + 400);
        }

        function showAdditionalInformation() {
            if ($('.champions-middle__champion-resting').is(':visible') && positions) {
                positions = undefined;
            }
            if ($('#additionalInformation').is(':visible')) {
                return;
            }
            if (positions) {
                createCurrentPositionsInfo();
            }
            else if (statistics) {
                createStatisticsInfo();
            }
            if (positions || statistics) {
                configureInfoBox();
            }
        }

        function markMatchedPositions() {
            $('.girl-selection__girl-box').each(function(index) {
                const currentGirlsPose = $(this).find('.girl-box__pose');
                if (currentGirlsPose.next().size() === 0) {
                    //currentGirlsPose.parent().append('<span style="margin-left: 35px; filter: hue-rotate(-45deg);" />');
                    currentGirlsPose.parent().append('<span style="margin-left: 35px;" />');
                }
                if (positions2) {
                    if (currentGirlsPose.attr('src').indexOf(preparePositionImage(positions2[index % positions2.length])) >= 0) {
                        currentGirlsPose.next().removeClass('empty');
                        currentGirlsPose.next().addClass('green-tick-icon');
                        currentGirlsPose.next().css('filter', 'hue-rotate(-45deg)');
                    }
                    else if (positions2.some((e) => (preparePositionImage(e) === currentGirlsPose.attr('src')))) {
                        currentGirlsPose.next().addClass('green-tick-icon empty');
                        currentGirlsPose.next().css('filter', 'hue-rotate(-45deg)');
                    }
                    else {
                        currentGirlsPose.next().removeClass('green-tick-icon');
                    }
                }
                else if (statistics) {
                    currentGirlsPose.next().css({'filter': 'invert'});
                    if (statistics.some((elem, idx) => (elem > 0 && preparePositionImage(idx) === currentGirlsPose.attr('src')))) {
                        currentGirlsPose.next().addClass('green-tick-icon empty');
                        currentGirlsPose.next().css('filter', 'hue-rotate(-45deg)');
                    }
                    else {
                        currentGirlsPose.next().removeClass('green-tick-icon');
                    }
                }
            });
        }

        function showNumberOfTicketsWhileTeamResting() {
            if ($('.champions-bottom__ticket-amount').is(':visible') == false) {
                $('.champions-bottom__rest').css({'width': '280px'})
                    .before('<div class="champions-bottom__ticket-amount"><span cur="ticket">x ' + championData.champion.currentTickets + '</span></div>');
            }
        }

        function preparePositionImage(positionID) {
            return IMAGES_URL + '/pictures/design/battle_positions/' + positionImages[positionID];
        }

        function createCurrentPositionsInfo() {
            let positionsBox = ('<div id="additionalInformation" style="position: absolute; top:' + (config.top || 165) + 'px; right:' + (config.right || -165)
                                + 'px;"><div style="border: 2px solid #ffa23e; background-color: rgba(60,20,30,.8); border-radius: 7px; width: max-content;">&nbsp;Current positions:<div>');
            positions.forEach((e) => {
                positionsBox += '<img style="height: 48px; width: 48px; cursor: pointer;" src="' + preparePositionImage(e) + '" hh_title="' + GT.figures[e]+ '">';
            });
            positionsBox += '</div>&nbsp;Current stage: ' + attempts + ' attempt' + (attempts == 1 ? '':'s') + '&nbsp;</div></div>';
            $('.champions-over__champion-wrapper').append(positionsBox);
            $('#additionalInformation #ascrail2000-hr').remove();
        }

        function createStatisticsInfo() {
            let statisticsBox = ('<div id="additionalInformation" style="position: absolute; top:' + (config.top || 165) + 'px; right:' + (config.right || -165)
                                 + 'px;"><div style="border: 2px solid #ffa23e; background-color: rgba(0,0,0,.8); border-radius: 7px; width: max-content;">&nbsp;Statistics:'
                                 + '<div class="scroll-area" style="font-size: 14px; max-width: 208px;"><div>');
            let total = statistics.reduce((a, b) => a + b);
            let positionList = (statistics.map((elem, idx) => ({'index': idx, 'value': elem}))
                                .filter((e) => e.index > 0 && e.value > 0)
                                .sort((a, b) => (a.value == b.value)? a.index - b.index : b.value - a.value));
            positionList.forEach((p) => {
                statisticsBox += '<div style="display: inline-block; width: 52px; text-align: center;">'
                    + '<img style="height: 48px; width: 48px; margin-bottom: -6px; cursor: pointer;" src="'
                    + preparePositionImage(p.index) + '" hh_title="' + GT.figures[p.index] + '" ><span>'
                    + Math.round(p.value / total * 1000) / 10 + '%</span></div>';
            });
            statisticsBox += '</div></div>' + (attempts? ('&nbsp;Prev stage: ' + attempts + ' attempt' + (attempts == 1 ? '':'s') + '&nbsp;') : '') + '</div></div>';
            $('.champions-over__champion-wrapper').append(statisticsBox);
            $('.champions-over__champion-wrapper').find('.scroll-area > div').css({'width': positionList.length * 52 + 'px'});
            if (positionList.length > 4) {
                if (is_mobile_size()) {
                    $('.champions-over__champion-wrapper').find('.scroll-area').css({'padding-bottom': '10px', 'margin-bottom': '-5px'});
                }
                else {
                    $('.champions-over__champion-wrapper').find('.scroll-area').css({'padding-bottom': '', 'margin-bottom': '5px'});
                }
                $('.champions-over__champion-wrapper').find('.scroll-area').niceScroll().resize();
            }
            $('#additionalInformation #ascrail2000-hr').remove();
        }

        function configureInfoBox() {
            $('.girl-box__draggable').droppable('option', 'accept', (e) => e.hasClass('girl-box__draggable'));
            $('#additionalInformation').on('click', '.eye', (e) => {
                config.visible = config.visible == undefined? false : undefined;
                $(e.currentTarget).next().toggle('slow');
                $(e.currentTarget).children().toggle('fast');
            }).draggable({
                cursor: 'move',
                start: function () {
                    $(this).css({'right': ''});
                },
                drag: function (event, ui) {
                    ui.position.top /= FullSize.scale;
                    ui.position.left /= FullSize.scale;
                },
                stop: function (event, ui) {
                    config.right = Math.round($(this).parent().width() - ui.position.left - $(this).width());
                    config.top = Math.round(ui.position.top);
                    $(this).css({'left': '', 'right': config.right + 'px'});
                    $(event.originalEvent.target).one('click', (e) => e.stopImmediatePropagation());
                }
            }).prepend('<a class="eye" style="top: 3px; right: 3px; position: absolute; cursor: pointer;">'
                       + '<img src="https://hh2.hh-content.com/quest/ic_eyeclosed.svg" style="width: 30px; display: block;">'
                       + '<img src="https://hh2.hh-content.com/quest/ic_eyeopen.svg" style="width: 50px; display: none;">'
                       + '</div></a>');
            if (config.visible == false) {
                $('#additionalInformation .eye').children().toggle();
                $('#additionalInformation .eye').next().toggle();
            }
        }

        sheet.insertRule('.champions-bottom__ticket-amount {'
                         + 'width: 145px;}'
                        );

        sheet.insertRule('.champions-bottom__ticket-amount.right {'
                         + 'text-align: left !important;}'
                        );
    }
}


/* =======
    LINKS
   ======= */

function moduleLinks() {
    var time_now = server_now_ts;
    const options = {hour: '2-digit', minute: '2-digit'};

    if (CurrentPage.indexOf('home') != -1) home();               // Current page: Homepage
    else if (CurrentPage.indexOf('log_in') != -1) home();        // Current page: Homepage
    else if (CurrentPage.indexOf('pachinko') != -1) pachinko();  // Current page: Pachinko
    else if (CurrentPage.indexOf('activities') != -1){           // Current page: Activities
        if ($('.tabs .pop').length > 0)
            pop();
        setInterval(function(){contests();}, 1000);
    }
    else if (CurrentPage.indexOf('champions') != -1)             // Current page: Champions
        setInterval(function(){champions();}, 1000);
    else if (CurrentPage.indexOf('shop') != -1){                 // Current page: Market
        setInterval(function(){market();}, 1000);
        booster();
    }
    else if ((CurrentPage.indexOf('map') != -1) || (CurrentPage.indexOf('world') != -1) || (CurrentPage.indexOf('quest') != -1)) questTitle();
    else if (CurrentPage.indexOf('tower-of-fame') != -1) leagueInfo();
    else if (CurrentPage.indexOf('club') != -1) clubChampion();

    function calculateTime(deadline) {
        var currentTime = new Date();
        var remaining = Math.floor((deadline - currentTime.getTime())/1000);
        return convertToTimeFormat(remaining);
    }

    function convertToTimeFormat(remainingTime) {
        var remM = Math.floor(remainingTime / 60);
        var remS = remainingTime - remM*60;
        if(remainingTime < 0){
            remM = 0;
            remS = 0;
        }
        if(remM > 59){
            var remH = Math.floor(remM / 60);
            var remD = Math.floor(remH / 24);
            remM -= remH * 60;
            remH -= remD * 24;
            if (remD > 0)
                return remD + texts[lang].day + " " + remH + texts[lang].hour + " " + remM + texts[lang].minute + " ";
            return remH + texts[lang].hour + " " + remM + texts[lang].minute + " ";
        }
        else if(remM > 0){
            if (remS > 9)
                return remM + texts[lang].minute + " " + remS + texts[lang].second;
            else
                return remM + texts[lang].minute + " 0" + remS + texts[lang].second;
        }
        if (remS > 9 || remS < 1)
            return remS + texts[lang].second;
        else
            return "0" + remS + texts[lang].second;
    }

    function convertToTimeFormatMinutes(remainingTime) {
        var remM = Math.floor(remainingTime /60);
        var remS = remainingTime - remM*60;
        if(remainingTime < 0){
            remM = 0;
            remS = 0;
        }
        if(remM > 59){
            var remH = Math.floor(remM / 60);
            remM -= remH * 60;
            return remH + texts[lang].hour + " " + remM + texts[lang].minute + " "
        }
        else if(remM > 0)
            return remM + texts[lang].minute;
        else if(remS < 10 & remS > 0)
            return "0" + remS + texts[lang].second;
        return remS + texts[lang].second;
    }

    function parseTime(remainingTimeStr) {
        var indexDay = remainingTimeStr.indexOf(texts[lang].day);
        var indexHour = remainingTimeStr.indexOf(texts[lang].hour);
        var indexMinute = remainingTimeStr.indexOf(texts[lang].minute);
        var indexSecond = remainingTimeStr.indexOf(texts[lang].second);
        var day = indexDay == -1 ? 0 : parseInt(remainingTimeStr.substring(0, indexDay).trim());
        var hour = indexHour == -1 ? 0 : parseInt(remainingTimeStr.substring(indexDay+1, indexHour).trim());
        var minute = indexMinute == -1 ? 0 : parseInt(remainingTimeStr.substring(indexHour+1, indexMinute).trim());
        var second = indexSecond == -1 ? 0 : parseInt(remainingTimeStr.substring(indexMinute+1, indexSecond).trim());
        return (day*24*3600 + hour*3600 + minute*60 + second);
    }


    scriptTimers();
    $('#contains_all > header').children('[type=quest]').append('<div class="scriptSeasonInfo" id="FightSeason">'
                                                                + '<span class="season_icn">'
                                                                + '<span id="seasonTool" class="infoTooltip seasonTooltip"></span></span>'
                                                                + '<a href="/season-arena.html">'
                                                                + '<div id="kisses_bar" class="tier_bar_season"></div>'
                                                                + '<div class="white_text centered_s" style="width: 100%;">'
                                                                + '<div id="kisses_data" style="width: 100%;">'
                                                                + '<span id="scriptSeasonAttempts">0</span>/<span rel="max">10</span>'
                                                                + '<span id="scriptSeasonTimer" rel="season_count_txt" timeforsinglepoint="3600" timeonload="24"></span>'
                                                                + '</a></div></div></div>');

    if (localStorage.getItem("LeagueExists") == 1)
        $('#contains_all > header').children('[type=quest]').append('<div class="league_counter" id="LeagueTimer">'
                                                                    + '<span class="league_icn">'
                                                                    + '<span id="leagueTool" class="infoTooltip leagueTooltip"></span></span>'
                                                                    + '<a href="/tower-of-fame.html">'
                                                                    + '<div id="league_bar" class="tier_bar_league"></div>'
                                                                    + '<div class="white_text centered_s" style="width: 100%;">'
                                                                    + '<div id="league_data" style="width: 100%;">'
                                                                    + '<span id="scriptLeagueAttempts">0</span>/<span rel="max">15</span>'
                                                                    + '<span id="scriptLeagueTimer" rel="league_count_txt" timeforsinglepoint="2100" timeonload="24"></span>'
                                                                    + '</a></div></div></div>');

    if (localStorage.getItem("nb_Pop") > 0)
        $('#contains_all > header').children('[type=quest]').append('<div class="pop_timer" id="PoPTimer">'
                                                                    + '<a href="/activities.html?tab=pop">'
                                                                    + '<div id="pop_bar" class="tier_bar_pop"></div>'
                                                                    + '<div class="white_text centered_s" style="width: 100%;">'
                                                                    + '<div id="pop_data" style="width: 100%;">' + texts[lang].pop
                                                                    + '<span id="scriptPoPTimer" rel="pop_count_txt"></span>'
                                                                    + '<span id="popTool" class="infoTooltip popTooltip"></span>'
                                                                    + '</a></div></div></div>');

    $('#contains_all > header').children('[type=quest]').append('<div class="booster_timer" id="BoosterTimer">'
                                                                + '<a href="/shop.html?type=booster">'
                                                                + '<div id="booster_bar" class="tier_bar_booster"></div>'
                                                                + '<div class="white_text centered_s" style="width: 100%;">'
                                                                + '<div id="booster_data" style="width: 100%;">' + texts[lang].boosters_end
                                                                + '<span id="scriptBoosterTimer" rel="booster_count_txt"></span>'
                                                                + '<span id="boosterTool" class="infoTooltip boosterTooltip"></span>'
                                                                + '</a></div></div></div>');

    $('#canvas_fight_energy .energy_counter_bar .bar-wrapper .over span[rel="count_txt"] span[rel="count"]').remove();
    $('#canvas_fight_energy .energy_counter_bar .bar-wrapper .over span[rel="count_txt"]').append('<span id="trollTimer" rel="count"></span>');

    $('#canvas_fight_energy .hudBattlePts_mix_icn')[0].className = "trollPts_icn";
    $('#canvas_fight_energy .trollPts_icn').append('<span id="trollTool" class="infoTooltip trollTooltip"></span>');

    $('#canvas_quest_energy .hudEnergy_mix_icn')[0].className = "energy_icn";
    $('#canvas_quest_energy .energy_icn').append('<span id="energyTool" class="infoTooltip energyTooltip"></span>');


    function questTitle(){
        $('#breadcrumbs').css('z-index', '99');
        $('#breadcrumbs').css('top', '63px');
    }

    function scriptTimers(){
        setInterval(function(){leagueBattles();
                               seasonBattles();
                               popTimer();
                               boosterTimer();
                               questInfo();
                               trollTimer();
                              }, 1000);
    }


    function questInfo(){
        var time = Math.floor(new Date().getTime()/1000);
        var current_quest_energy = parseInt(Hero.energies.quest.amount, 10);
        var max_quest_energy = parseInt(Hero.energies.quest.max_amount, 10);
        var time_for_new_quest = parseInt(Hero.energies.quest.seconds_per_point, 10);
        var remaining_quest_time = parseInt(Hero.energies.quest.next_refresh_ts, 10);
        var full_remaining_quest_time = remaining_quest_time + Math.max(0, (max_quest_energy-current_quest_energy-1))*time_for_new_quest;
        var full_quest_date = time_now + full_remaining_quest_time;
        remaining_quest_time = (full_quest_date - time)%time_for_new_quest;
        var quest_link = Hero.infos.questing.current_url;
        if (quest_link.includes('quest') == false)
            quest_link = "/champions-help.html";

        $('#canvas_quest_energy .energy_counter_bar .bar-wrapper .over').empty().append('<a href="' + quest_link + '" style="text-decoration: none; text-align: center;">'
                                                                                        + '<span energy="">' + current_quest_energy + '</span>'
                                                                                        + '<span rel="max">/' + max_quest_energy + '</span>'
                                                                                        + '<span rel="count_txt" timeforsinglepoint="450" timeonload="440">'
                                                                                        + '+1 ' + texts[lang].in + ' <span rel="count">' + convertToTimeFormat(remaining_quest_time) + '</span>'
                                                                                        + '</span>'
                                                                                        + '<div rel="count_txt_mobile" timeforsinglepoint="450" timeonload="440">'
                                                                                        + '+1 ' + texts[lang].in + ' <span rel="count_mobile">' + convertToTimeFormat(remaining_quest_time) + '</span>'
                                                                                        + '</div>'
                                                                                        + '</a>');

        if (current_quest_energy >= max_quest_energy) {
            $('#canvas_quest_energy .energy_counter_bar .bar-wrapper .over span[rel="count_txt"]').css('visibility', 'hidden');
            $('#canvas_quest_energy .energy_counter_bar .bar-wrapper .over div[rel="count_txt_mobile"]').css('visibility', 'hidden');
            $('#energyTool').html("<span id=energy_title>" + texts[lang].energy + "<BR></span>" + texts[lang].full);
        }
        else
            $('#energyTool').html("<span id=energy_title>" + texts[lang].energy + "<BR></span>" + texts[lang].full_in + " <span id=energy_time_remaining>" + calculateTime(full_quest_date*1000) + "</span><BR>" + texts[lang].ends_at + ' ' + new Date(full_quest_date*1000).toLocaleTimeString(undefined, options));
    }

    function trollTimer(){
        var time = Math.floor(new Date().getTime()/1000);
        var current_troll_energy = parseInt(Hero.energies.fight.amount, 10);
        var max_troll_energy = parseInt(Hero.energies.fight.max_amount, 10);
        var time_for_new_troll = parseInt(Hero.energies.fight.seconds_per_point, 10);
        var remaining_troll_time = parseInt(Hero.energies.fight.next_refresh_ts, 10);
        var full_remaining_troll_time = remaining_troll_time + Math.max(0, (max_troll_energy-current_troll_energy-1))*time_for_new_troll;
        var full_troll_date = time_now + full_remaining_troll_time;
        remaining_troll_time = (full_troll_date - time)%time_for_new_troll;

        $('#trollTimer').html(convertToTimeFormat(remaining_troll_time));

        if (current_troll_energy >= max_troll_energy)
            $('#trollTool').html("<span id=troll_title>" + texts[lang].combativity + "<BR></span>" + texts[lang].full);
        else
            $('#trollTool').html("<span id=troll_title>" + texts[lang].combativity + "<BR></span>" + texts[lang].full_in + " <span id=troll_time_remaining>" + calculateTime(full_troll_date*1000) + "</span><BR>" + texts[lang].ends_at + ' ' + new Date(full_troll_date*1000).toLocaleTimeString(undefined, options));
    }

    function pop(){
        var current_date_sec = Math.floor(new Date().getTime()/1000);
        var popDate = current_date_sec;
        var popTime = 0;
        var popRemainingTime = 0;
        var popList = [];
        var popId = 0;
        var popAll = document.getElementsByClassName("pop_thumb");
        for (var k=0; k<popAll.length; k++) {
            var className = popAll[k].className;
            if (!className.includes('greyed')) {
                popList.push(popAll[k]);

                var id = parseInt(popAll[k].attributes.pop_id.nodeValue, 10);
                if ((id >= 7 && id <= 9) || (id >= 13 && id <= 15))
                    $('div.pop_thumb_container:nth-child(3)').after($('div.pop_thumb_container:nth-child(' + (k+1) + ')'));
            }
        }
        var nb_Pop = popList.length
        localStorage.setItem("nb_Pop", nb_Pop);
        update();

        function update() {
            for (var j=0; j<popList.length; j++) {
                if (popList[j].className.includes('pop_thumb_selected'))
                    popId = (j+1);
                if (popList[j].attributes[2].value == "pending_reward") {
                    popDate = current_date_sec;
                    popTime = 0;
                }
                else if (popList[j].attributes[2].value == "can_start") {
                    localStorage.setItem("pop_" + (j+1) + "_can_start", "true");
                }
                else {
                    popRemainingTime = ($('.pop_list').css('display') != "none") ? parseTime(popList[j].children[2].children[0].firstElementChild.firstChild.data) : parseInt(popList[j].children[2].children[0].firstElementChild.firstChild.data);
                    var widthStr = ($('.pop_list').css('display') != "none") ? popList[j].children[2].children[1].children[0].children[0].style.cssText : document.querySelector('#pop_info div.pop_central_part.dark_subpanel_box div.hh_bar div.backbar div.frontbar').style.cssText;
                    widthStr = widthStr.substring(widthStr.indexOf(':')+1, widthStr.indexOf('%')).trim();
                    var width = parseFloat(widthStr);
                    popDate = current_date_sec + popRemainingTime;
                    var popTime = popRemainingTime/(1-width/100);
                    localStorage.setItem("pop_" + (j+1) + "_can_start", "false");
                }
                if (current_date_sec > localStorage.getItem("popDate" + (j+1))) {
                    localStorage.setItem("popDate" + (j+1), popDate);
                    localStorage.setItem("popTime" + (j+1), popTime);
                }
            }
        }

        let button = document.querySelector('#pop_info .pop_central_part.dark_subpanel_box button[rel=pop_action]');
        button.addEventListener('click', function(){
            popRemainingTime = parseTime($('.pop_remaining > span:nth-child(1)')[0].innerText);
            popDate = current_date_sec + popRemainingTime;
            popTime = popRemainingTime;
            localStorage.setItem("pop_" + popId + "_can_start", "false");
            localStorage.setItem("popDate" + popId, popDate);
            localStorage.setItem("popTime" + popId, popTime);
        });

        displayClassGirl();

        function displayClassGirl() {
            const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
            let girls = $('#pop #pop_info .pop_right_part .grid_view')[0].children;
            for (var m=0; m<girls.length; m++) {
                if (girls[m].attributes.girl != undefined) {
                    let girl_id = girls[m].attributes.girl.value;
                    let girl_class = (girlDictionary.get(girl_id.toString()) != undefined) ? girlDictionary.get(girl_id.toString()).class : 0;
                    switch (girl_class) {
                        case 1:
                            $('#pop #pop_info .pop_right_part .grid_view div:nth-child(' + (m+1) + ')').find('.girl_action').append($('<img class="classGirl" src="https://hh2.hh-content.com/caracs/hardcore.png">'));
                            break;

                        case 2:
                            $('#pop #pop_info .pop_right_part .grid_view div:nth-child(' + (m+1) + ')').find('.girl_action').append($('<img class="classGirl" src="https://hh2.hh-content.com/caracs/charm.png">'));
                            break;

                        case 3:
                            $('#pop #pop_info .pop_right_part .grid_view div:nth-child(' + (m+1) + ')').find('.girl_action').append($('<img class="classGirl" src="https://hh2.hh-content.com/caracs/knowhow.png">'));
                            break;
                    }
                }
            }
            sheet.insertRule('.classGirl {'
                             + 'position: relative;'
                             + 'height: 17px !important;'
                             + 'width: 17px !important;'
                             + 'top: -91px;'
                             + 'left: 45px;'
                             + 'display: block;'
                             + 'border: none;}'
                            );
        }

        let button2 = document.querySelector('#rewards_popup .popup_buttons button[confirm_blue_button]');
        button2.addEventListener('click', function(){
            displayClassGirl();
        });
    }

    function popTimer(){
        var current_date_sec = Math.floor(new Date().getTime()/1000);
        var nb_Pop = localStorage.getItem("nb_Pop") || 0;
        let popDate = [];
        let popTime = [];
        var time_remaining = 0;
        var pop_percent = 100;
        var pop_can_start = false;

        if (nb_Pop > 0) {
            for (var i=0; i<nb_Pop; i++){
                if (localStorage.getItem("pop_" + (i+1) + "_can_start") == "true") {
                    pop_can_start = true;
                }
                else {
                    var popDate_i = parseInt(localStorage.getItem("popDate" + (i+1)), 10) || 0;
                    popDate.push(popDate_i);
                    var popTime_i = parseInt(localStorage.getItem("popTime" + (i+1)), 10) || 0;
                    popTime.push(popTime_i);
                    if (popDate_i == 0)
                        localStorage.setItem("popDate" + (i+1), popDate_i);
                }
            }
            var popDateMin = Math.min(...popDate);
            if (popDateMin == Infinity)
                popDateMin = current_date_sec;
            time_remaining = popDateMin - current_date_sec || 0;
            var index = popDate.indexOf(popDateMin);
            pop_percent = Math.min(100, ((popTime[index]-(popDate[index]-current_date_sec))/popTime[index])*100);
        }

        $('#scriptPoPTimer').html(" " + texts[lang].in + " <span rel=\"pop_count\">" + convertToTimeFormat(time_remaining) + "</span>");
        $('#pop_bar').css('width', pop_percent + '%');

        if (time_remaining > 0) {
            $('.tier_bar_pop').css('background-image', 'linear-gradient(90deg,#780049,#c80053)');
            $('#popTool').html(texts[lang].ends_at + ' ' + new Date(popDateMin*1000).toLocaleTimeString(undefined, options));
            if (pop_can_start == true)
                $('#scriptPoPTimer').css('color', 'orange');
            else
                $('#scriptPoPTimer').css('color', '#8ec3ff');
        }
        else {
            $('.tier_bar_pop').css('background-image', 'linear-gradient(to top,#008ed5 0,#05719c 100%)');
            $('#popTool').css('display', 'none');
        }
    }

    function booster(){
        var current_date_sec = Math.floor(new Date().getTime()/1000);
        var boosters_date = [];
        var i = 0;
        $("#equiped .booster .slot").not(".empty").not('.mythic').each(function(){
            var now = Date.now();
            var $booster = $(this);
            var time = parseInt($booster.data("d").lifetime, 10);
            boosters_date[i] = time;
            i++;
        })
        var date_min;
        if (boosters_date.length > 0)
            date_min = Math.min(...boosters_date);
        else
            date_min = current_date_sec;
        localStorage.setItem("booster_date", date_min);

        let button = document.querySelector('#inventory button[rel=use]');
        button.addEventListener('click', function(){
            if ($('#inventory .booster')[0].className == "booster selected" && $('#shops_right .sub_block .booster > div:nth-child(1)')[0].classList[1] == "empty") {
                var boosterTime = parseInt($('#inventory .booster .inventory_slots .ui-droppable .selected').data("d").duration, 10);
                var boosterDate = Math.floor(new Date().getTime()/1000) + boosterTime;
                localStorage.setItem("booster_date", boosterDate);
            }
        });
    }

    function boosterTimer(){
        var current_date = Math.floor(new Date().getTime()/1000);
        var booster_date = (localStorage.getItem("booster_date") != null) ? parseInt(localStorage.getItem("booster_date"), 10) : 0;
        var remainingTime = Math.max(0, (booster_date - current_date));

        var booster_percent = 100-(remainingTime/(24*3600))*100;

        $('#booster_bar').css('width', booster_percent + '%');

        if (remainingTime > 0){
            $('#scriptBoosterTimer').html(" " + texts[lang].in + " <span rel=\"booster_count\">" + convertToTimeFormat(remainingTime) + "</span>");
            $('#boosterTool').html(texts[lang].ends_at + ' ' + new Date(booster_date*1000).toLocaleTimeString(undefined, options));
            $('.tier_bar_booster').css('background-image', 'linear-gradient(90deg,#780049,#c80053)');
        }
        else {
            $('#scriptBoosterTimer').empty();
            $('.tier_bar_booster').css('background-image', 'linear-gradient(to top,#008ed5 0,#05719c 100%)');
            $('#boosterTool').css('display', 'none');
        }
    }

    function leagueBattles(){
        var time = Math.floor(new Date().getTime()/1000);
        var attempts = parseInt(Hero.energies.challenge.amount, 10);
        var max_attempts = parseInt(Hero.energies.challenge.max_amount, 10);
        var time_for_new_battle = parseInt(Hero.energies.challenge.seconds_per_point, 10);
        var league_next_battle_in = parseInt(Hero.energies.challenge.next_refresh_ts, 10);
        var league_time_full = time_now + league_next_battle_in + Math.max(0, (max_attempts-attempts-1))*time_for_new_battle;
        var remaining_full_time = league_time_full-time;
        var remaining_next_battle = remaining_full_time%time_for_new_battle;

        if ((attempts < max_attempts) && (CurrentPage.indexOf('tower-of-fame') == -1))
            attempts = max_attempts - Math.max(0, Math.ceil(remaining_full_time/time_for_new_battle));
        var league_percent = (Math.min(attempts, max_attempts)/max_attempts)*100;
        $('#league_bar').css('width', league_percent + '%');
        $('#scriptLeagueAttempts').text(attempts);

        if(attempts < 15) {
            $('#scriptLeagueTimer').html(" +1 " + texts[lang].in + " <span rel=\"count\">" + convertToTimeFormat(remaining_next_battle) + "</span>");
            $('#leagueTool').html("<span id=league_title>" + texts[lang].league + "<BR></span>" + texts[lang].full_in + " <span id=league_time_remaining>" + convertToTimeFormat(remaining_full_time) + "</span><BR>" + texts[lang].ends_at + ' ' + new Date(league_time_full*1000).toLocaleTimeString(undefined, options));
            $('.tier_bar_league').css('background-image', 'linear-gradient(90deg,#780049,#c80053)');
        }
        else {
            $('#scriptLeagueTimer').empty();
            $('#leagueTool').html("<span id=league_title>" + texts[lang].league + "<BR></span>" + texts[lang].full);
            $('.tier_bar_league').css('background-image', 'linear-gradient(to top,#008ed5 0,#05719c 100%)');
        }
    }

    function leagueInfo(){
        var date = time_now + season_end_at;
        $('div.league_end_in span span[rel="timer"]').remove();
        $('.league_end_in > span:nth-child(2)').append('<span rel="timer">' + calculateTime(date*1000) + '</span>');

        var attempts = parseInt(Hero.energies.challenge.amount, 10);
        var max_attempts = parseInt(Hero.energies.challenge.max_amount, 10);
        var time_for_new_battle = parseInt(Hero.energies.challenge.seconds_per_point, 10);
        var league_next_battle_in = Hero.energies.challenge.next_refresh_ts;
        var league_date_full = time_now + league_next_battle_in + Math.max(0, (max_attempts-attempts-1))*time_for_new_battle;
        var time = Math.floor(new Date().getTime()/1000);
        var remaining_full_time = league_date_full - time;
        var remaining_next_battle = remaining_full_time%time_for_new_battle;
        $('div.bar-wrap:nth-child(2) > div:nth-child(2) > span:nth-child(3) > span:nth-child(1)').remove();
        $('div.bar-wrap:nth-child(2) > div:nth-child(2) > span:nth-child(3)').append('<span rel="count">' + convertToTimeFormat(remaining_next_battle) + '</span>');

        setInterval(function(){
            $('.league_end_in > span:nth-child(2) > span[rel="timer"]').text(calculateTime(date*1000));
            time = Math.floor(new Date().getTime()/1000);
            remaining_full_time = league_date_full - time;
            remaining_next_battle = remaining_full_time%2100;
            $('div.bar-wrap:nth-child(2) > div:nth-child(2) > span:nth-child(3) > span:nth-child(1)').text(convertToTimeFormat(remaining_next_battle));
        }, 1000);
    }

    function seasonBattles(){
        var time = Math.floor(new Date().getTime()/1000);
        var timestamp_last_kiss = parseInt(Hero.energies.kiss.update_ts, 10);
        var current_kisses = parseInt(Hero.energies.kiss.amount, 10);
        var max_kisses_number = parseInt(Hero.energies.kiss.max_amount, 10);
        var time_for_new_kiss = parseInt(Hero.energies.kiss.seconds_per_point, 10);
        var new_kiss_in = parseInt(Hero.energies.kiss.next_refresh_ts, 10);
        var full_time_remaining = new_kiss_in + Math.max(0, (max_kisses_number-current_kisses-1))*time_for_new_kiss;
        var season_date_full = time_now + full_time_remaining;
        var season_time_remaining = season_date_full - time;
        var current_date = Math.floor(new Date().getTime()/1000);
        var all_kisses = current_kisses;
        var time_passed_sec = current_date - timestamp_last_kiss;

        if (current_kisses < max_kisses_number)
            all_kisses = max_kisses_number - Math.max(0, Math.ceil((season_date_full - current_date)/time_for_new_kiss));

        var kisses_percent = (Math.min(all_kisses, max_kisses_number)/max_kisses_number)*100;
        $('#kisses_bar').css('width', kisses_percent + '%');

        $('#scriptSeasonAttempts').text(all_kisses);

        if (all_kisses < max_kisses_number) {
            $('#scriptSeasonTimer').html(" +1 " + texts[lang].in + " <span rel=\"season_count\">" + convertToTimeFormat(Math.floor(time_for_new_kiss - (time_passed_sec%time_for_new_kiss))) + "</span>");
            $('#seasonTool').html("<span id=season_title>" + texts[lang].season + "<BR></span>" + texts[lang].full_in + " <span id=season_time_remaining>" + convertToTimeFormat(season_time_remaining) + "</span><BR>" + texts[lang].ends_at + ' ' + new Date((time_now + full_time_remaining)*1000).toLocaleTimeString(undefined, options));
            $('.tier_bar_season').css('background-image', 'linear-gradient(90deg,#780049,#c80053)');
        }
        else {
            $('#scriptSeasonTimer').empty();
            $('#seasonTool').html("<span id=season_title>" + texts[lang].season + "<BR></span>" + texts[lang].full);
            $('.tier_bar_season').css('background-image', 'linear-gradient(to top,#008ed5 0,#05719c 100%)');
        }
    }

    function pachinko(){
        var pachinkoTime = server_now_ts*1000 + pachinkoVar.next_game*1000;
        localStorage.setItem("pachinkoTime", pachinkoTime);

        if ($('#playzone-replace-info > div.btns-section > button[play]:nth-child(1)').length && $('.playing-zone')[0].attributes[1].value == "great") {
            let button = document.querySelector('#playzone-replace-info > div.btns-section > button[play]:nth-child(1)');
            button.addEventListener('click', function(){
                pachinkoTime = new Date().getTime() + (24*3600)*1000;
                localStorage.setItem("pachinkoTime", pachinkoTime);
            });
        }


        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if ($('.playing-zone')[0].attributes[1].value != "great")
                    return;

                if ($('#playzone-replace-info > div.btns-section > button[play]:nth-child(1)').length) {
                    let button = document.querySelector('#playzone-replace-info > div.btns-section > button[play]:nth-child(1)');
                    button.addEventListener('click', function(){
                        pachinkoTime = new Date().getTime() + (24*3600)*1000;
                        localStorage.setItem("pachinkoTime", pachinkoTime);
                    });
                }
            })
        })

        observer.observe($('.playing-zone')[0], {
            childList: false
            , subtree: false
            , attributes: true
        })
    }

    function market(){
        var time = Math.floor(new Date().getTime());
        var remainingTime = parseInt($('#shop .shop_count span').attr( "time" ), 10);
        var marketTime = server_now_ts*1000 + remainingTime*1000;
        var storedMarketTime = (localStorage.getItem("marketTime") != undefined) ? localStorage.getItem("marketTime") : 0;
        if (marketTime > storedMarketTime)
            localStorage.setItem("marketTime", marketTime);

        var timeToNewMarket = marketTime - time;

        $('#shop .shop_count span').remove();
        $('#shop .shop_count').append('<span rel="count" time="' + remainingTime + '">' + convertToTimeFormat(Math.floor(timeToNewMarket/1000)) + '</span>');
    }

    function champions(){
        if (CurrentPage == "/champions-map.html") {
            var time_min_champions = time_now + 15*60 + 1;
            for (var i = 0; i < 6; i++){
                var time_champion = $('a.champion-lair[href$="champions/' + (i+1) + '"] > div.champion-lair-name.map-label-link > div').attr('timer') || time_min_champions;
                time_min_champions = Math.min(time_min_champions, parseInt(time_champion, 10));
                var timer = $('a.champion-lair[href$="champions/' + (i+1) + '"] > div.champion-lair-name.map-label-link > div').attr('timer') || 0;
                if (timer != 0) {
                    $('a.champion-lair[href$="champions/' + (i+1) + '"] > div.champion-lair-name.map-label-link > div').remove();
                    $('a.champion-lair[href$="champions/' + (i+1) + '"] > div.champion-lair-name.map-label-link').append('<div id="championTimer" timer="' + timer + '" style="margin-top: -7px; color: #999;">' + calculateTime(timer*1000) + '</div>');
                }
            }
            if (time_min_champions == time_now + 15*60 + 1)
                localStorage.setItem("championsTime", time_now*1000);
            else
                localStorage.setItem("championsTime", time_min_champions*1000);
        }
        else {
            var current_timer = parseInt($('.champions-bottom__rest > span:nth-child(1)').attr('timer'), 10);
            var current_min = parseInt(localStorage.getItem("championsTime"), 10);
            $('.champions-bottom__rest > span:nth-child(1)').remove();
            $('.champions-bottom__rest').append('<span timer="' + current_timer + '" property="teamRest" rel="timer" style="color: #8ec3ff;">' + calculateTime(current_timer*1000) + '</span>');
            if (current_min < time_now*1000)
                current_min = (time_now + 15*60 + 1)*1000;
            if ((current_timer*1000) < current_min)
                localStorage.setItem("championsTime", current_timer*1000);

            if ($('champions-bottom__start-battle').length > 0) {
                let button = document.querySelector('.champions-bottom__wrapper .champoions-bottom__footer .champions-bottom__buttons-wrapper button.champions-bottom__start-battle');
                button.addEventListener('click', function(){
                    let champion_timer = new Date().getTime() + (15*60)*1000;
                    let champion_min = parseInt(localStorage.getItem("championsTime"), 10);
                    if (champion_timer < champion_min || champion_min < new Date().getTime())
                        localStorage.setItem("championsTime", champion_timer);
                });
            }
        }
    }

    function clubChampion(){
        if (CurrentPage == "/club-champion.html") {
            let date_club_champion = parseInt($('.champions-bottom__rest span').attr('timer'), 10) || parseInt($('.champions-middle__champion-resting').attr('timer'), 10);
            localStorage.setItem("clubChampionTime", date_club_champion*1000);
            setInterval(function(){$('.champions-bottom__rest > span:nth-child(1)').remove();
                                   $('.champions-bottom__rest').append('<span timer="' + date_club_champion + '" property="teamRest" rel="timer" style="color: #8ec3ff;">' + calculateTime(date_club_champion*1000) + '</span>');
                                  }, 1000);
            if ($('button.champions-bottom__start-battle').length > 0) {
                let button = document.querySelector('button.champions-bottom__start-battle');
                button.addEventListener('click', function(){
                    let club_champion_timer = new Date().getTime() + (15*60)*1000;
                    localStorage.setItem("clubChampionTime", club_champion_timer);
                });
            }
        }

        if (CurrentPage == "/clubs.html" && $('.club_champions_details_container').length) {
            let date_club_champion = parseInt($('.club_champions_buttons_container .finish_in_bar').attr('data-rest-timer'), 10);
            let time_to_finish = parseInt($('.club_champions_timer_fight span').attr('timer'), 10);
            localStorage.setItem("clubChampionTime", date_club_champion*1000);

            setInterval(function(){$('.club_champions_buttons_container .finish_in_bar .text span').remove();
                                   $('.club_champions_buttons_container .finish_in_bar .text').append('<span>' + calculateTime(date_club_champion*1000) + '</span>');
                                  }, 1000);
        }
    }

    function contests() {
        var next_contest_time = parseInt($('.next_contest .hh_bar.contest_timer').attr('data-remaining_time'), 10);
        var next_contest_date = (time_now + next_contest_time)*1000;
        $('.next_contest .hh_bar.contest_timer .text > span').remove();
        $('.next_contest .hh_bar.contest_timer .text').append('<span>' + calculateTime(next_contest_date) + '</span>');

        var end_legendary_contest_time = parseInt($('.contest.is_legendary .contest_header.in_progress.contest_header_active .personal_rewards .hh_bar.contest_timer').attr('data-remaining_time'), 10);
        var end_legendary_contest_date = (time_now + end_legendary_contest_time)*1000;
        $('.contest.is_legendary .contest_header.in_progress.contest_header_active .personal_rewards .hh_bar.contest_timer .text > span').remove();
        $('.contest.is_legendary .contest_header.in_progress.contest_header_active .personal_rewards .hh_bar.contest_timer .text').append('<span>' + calculateTime(end_legendary_contest_date) + '</span>');

        var end_regular_contest_time = parseInt($('.contest .contest_header.in_progress .personal_rewards .hh_bar.contest_timer').attr('data-remaining_time'), 10);
        var end_regular_contest_date = (time_now + end_regular_contest_time)*1000;
        $('.contest .contest_header.in_progress .personal_rewards .hh_bar.contest_timer .text > span').remove();
        $('.contest .contest_header.in_progress .personal_rewards .hh_bar.contest_timer .text').append('<span>' + calculateTime(end_regular_contest_date) + '</span>');
    }

    function home() {
        var marketTime = localStorage.getItem("marketTime");
        let market = $('a[href$="shop.html"]>.position>span').css('height', 'auto');
        market.append('<BR><span id="scriptMarketTimer">' + calculateTime(marketTime) + '</span>');

        var pachinkoTime = localStorage.getItem("pachinkoTime");
        let pachinko = $('a[href$="pachinko.html"]>.position>span').css('height', 'auto');
        pachinko.append('<BR><span id="scriptPachinkoTimer">' + calculateTime(pachinkoTime) + '</span>');

        var championsTime = (localStorage.getItem("championsTime") > time_now*1000) ? localStorage.getItem("championsTime") : (parseInt($('.champion-timer').attr('timer'), 10)*1000 || parseInt($('#champion-timer').attr('timer'), 10)*1000 || 0);
        if (championsTime > time_now*1000){
            let champions = $('a[rel="sex-god-path"]>.position>span');
            $('.champion-timer').remove();

            //new on test server
            $('#champion-timer').remove();

            champions.css('height', 'auto');
            champions.append('<BR><span id="scriptChampionsTimer">' + calculateTime(championsTime) + '</span>');
        }

        $('a[rel="clubs"]').append('<a class="round_blue_button" href="/club-champion.html" hh_title="Club Champion">'
                                                  + '<span class="champions_icn"></span></a>');

        if ($('a[href$="tower-of-fame.html"]').length === 0)
            localStorage.setItem("LeagueExists", 0);
        else
            localStorage.setItem("LeagueExists", 1);

        var mission_remaining_time = missions_datas.remaining_time || missions_datas.next_missions || 0;
        var mission_remaining_date = (time_now + parseInt(mission_remaining_time, 10))*1000;
        $('#home_missions_bar1 .hh_bar.finish_in_bar .text span').remove();
        $('#home_missions_bar1 .hh_bar.finish_in_bar .text').append('<span id="missionsTimer1">' + calculateTime(mission_remaining_date) + '</span>');
        $('#home_missions_bar2 .hh_bar.finish_in_bar .text span').remove();
        $('#home_missions_bar2 .hh_bar.finish_in_bar .text').append('<span id="missionsTimer2">' + calculateTime(mission_remaining_date) + '</span>');

        let clubChampionTime = (localStorage.getItem("clubChampionTime") == "NaN") ? 0 : localStorage.getItem("clubChampionTime");
        let club = $('a[rel="clubs"]>.position>span').css('height', 'auto');
        if (clubChampionTime > time_now*1000)
            club.append('<BR><span id="scriptClubChampionTimer">' + calculateTime(clubChampionTime) + '</span>');

        setInterval(function(){$('#scriptMarketTimer').text(calculateTime(marketTime));
                               $('#scriptPachinkoTimer').text(calculateTime(pachinkoTime));
                               $('#scriptChampionsTimer').text(calculateTime(championsTime));
                               $('#missionsTimer1').text(calculateTime(mission_remaining_date));
                               $('#missionsTimer2').text(calculateTime(mission_remaining_date));
                               $('#scriptClubChampionTimer').text(calculateTime(clubChampionTime));
                              }, 1000);
    }


    //CSS
    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.scriptSeasonInfo {'
                     + 'display: block; '
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 40px 0 0 220px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.scriptSeasonInfo {'
                     + 'display: block; '
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 75px 0 0 190px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('.scriptSeasonInfo a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#FightSeason {'
                     + 'width: 90%; '
                     + 'left: 20px;}'
                    );

    sheet.insertRule('#hh_comix #FightSeason {'
                     + 'font-weight: 800 !important;}'
                    );

    sheet.insertRule('#FightSeason a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#FightSeason a:hover {'
                     //+ 'text-decoration: underline; '
                     + 'color: rgb(255, 247, 204);} '
                    );

    sheet.insertRule ('#scriptSeasonTimer {'
                      + 'font-size: 11px; '
                      + 'color: #8ec3ff;}'
                     );

    sheet.insertRule('#kisses_bar {'
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'width: 100%; '
                     + 'height: 100%;} '
                    );

    sheet.insertRule('.season_icn{'
                     + 'display:block;'
                     + 'width:29px;'
                     + 'height:31px;'
                     + 'background-image:url(https://hh2.hh-content.com/pictures/design/ic_kiss.png);'
                     + 'background-size:25px;'
                     + 'background-position:center;'
                     + 'background-repeat:no-repeat;'
                     + 'margin:0;'
                     + 'padding:0;'
                     + 'position:absolute;'
                     + 'margin: -5px 0 0 -20px; '
                     + 'z-index: 36}');

    sheet.insertRule('.seasonTooltip {'
                     + 'width: 180px; '
                     + 'top: 30px; '
                     + 'margin-left: -90px;}'
                    );

    sheet.insertRule('.season_icn:hover .seasonTooltip {'
                     + 'z-index: 99; '
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.season_icn:hover #season_title {'
                     + 'color: white; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.season_icn:hover #season_time_remaining {'
                     + 'color: orange; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.league_counter {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 75%; '
                     + 'height: 20px; '
                     + 'margin: 40px 0 0 10px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'border: 3px; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.league_counter {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 75%; '
                     + 'height: 20px; '
                     + 'margin: 75px 0 0 10px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'border: 3px; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('.league_counter a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#LeagueTimer {'
                     + 'width: 85%; '
                     + 'left: 35px;}'
                    );

    sheet.insertRule('#hh_comix #LeagueTimer {'
                     + 'font-weight: 800 !important;}'
                    );

    sheet.insertRule('#LeagueTimer a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#LeagueTimer a:hover {'
                     //+ 'text-decoration: underline; '
                     + 'color: rgb(255, 247, 204);} '
                    );

    sheet.insertRule ('#scriptLeagueTimer {'
                      + 'font-size: 11px; '
                      + 'color: #8ec3ff;}'
                     );

    sheet.insertRule('#league_bar {'
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'width: 100%; '
                     + 'height: 100%;} '
                    );

    sheet.insertRule('.league_icn{'
                     + 'display:block;'
                     + 'width:29px;'
                     + 'height:31px;'
                     + 'background-image:url(https://hh2.hh-content.com/league_points.png);'
                     + 'background-size:25px;'
                     + 'background-position:center;'
                     + 'background-repeat:no-repeat;'
                     + 'margin:0;'
                     + 'padding:0;'
                     + 'position:absolute;'
                     + 'margin: -5px 0 0 -24px; '
                     + 'z-index:36}');

    sheet.insertRule('.leagueTooltip {'
                     + 'width: 180px; '
                     + 'top: 30px; '
                     + 'margin-left: -90px;}'
                    );

    sheet.insertRule('.league_icn:hover .leagueTooltip {'
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.league_icn:hover #league_title {'
                     + 'color: white; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.league_icn:hover #league_time_remaining {'
                     + 'color: orange; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule ('#scriptMarketTimer, #scriptPachinkoTimer, #scriptChampionsTimer, #scriptClubChampionTimer{'
                      + 'overflow:hidden;'
                      + 'display: block;'
                      + 'margin-top: -5px;'
                      + 'color: gray;}'
                     );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.pop_timer {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 40px 0 0 400px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.pop_timer {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 75px 0 0 350px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );


    sheet.insertRule('.pop_timer a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#PoPTimer {'
                     + 'width: 100%; '
                     + 'left: 20px;}'
                    );

    sheet.insertRule('#hh_comix #PoPTimer {'
                     + 'font-weight: 800 !important;}'
                    );

    sheet.insertRule('#PoPTimer a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#PoPTimer a:hover {'
                     + 'color: rgb(255, 247, 204);} '
                    );

    sheet.insertRule ('#scriptPoPTimer {'
                      + 'font-size: 11px;}'
                     );

    sheet.insertRule('#pop_bar {'
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'width: 100%; '
                     + 'height: 100%;} '
                    );

    sheet.insertRule('.popTooltip {'
                     + 'width: 120px; '
                     + 'top: 25px; '
                     + 'margin-left: -120px;}'
                    );

    sheet.insertRule('#PoPTimer a:hover .popTooltip {'
                     + 'z-index:99; '
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.infoTooltip {'
                     + 'visibility: hidden; '
                     + 'font-size: 12px; '
                     + 'background-color: black; '
                     + 'color: #fff; '
                     + 'text-align: center; '
                     + 'padding: 3px 5px 3px 5px; '
                     + 'border: 2px solid #905312; '
                     + 'border-radius: 6px; '
                     + 'background-color: rgba(32,3,7,.9); '
                     + 'position: absolute; '
                     + 'margin-top: 5px; '
                     + 'z-index: 100;}'
                    );

    sheet.insertRule('.infoTooltip::after {'
                     + 'content: " "; '
                     + 'position: absolute; '
                     + 'bottom: 100%; '
                     + 'left: 50%; '
                     + 'margin-left: -10px; '
                     + 'border-width: 10px; '
                     + 'border-style: solid; '
                     + 'border-color: transparent transparent #905312 transparent;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.booster_timer {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 40px 0 0 -210px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.booster_timer {'
                     + 'position: absolute; '
                     + 'z-index: 4; '
                     + 'width: 90%; '
                     + 'height: 20px; '
                     + 'margin: 75px 0 0 -210px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 14px; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('.booster_timer a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#BoosterTimer {'
                     + 'width: 200px; '
                     + 'left: 20px;}'
                    );

    sheet.insertRule('#hh_comix #BoosterTimer {'
                     + 'font-weight: 800 !important;}'
                    );

    sheet.insertRule('#BoosterTimer a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#BoosterTimer a:hover {'
                     + 'color: rgb(255, 247, 204);} '
                    );

    sheet.insertRule ('#scriptBoosterTimer {'
                      + 'font-size: 11px; '
                      + 'color: #8ec3ff;}'
                     );

    sheet.insertRule('#booster_bar {'
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'width: 100%; '
                     + 'height: 100%;} '
                    );

    sheet.insertRule('.boosterTooltip {'
                     + 'width: 120px; '
                     + 'top: 25px; '
                     + 'margin-left: -140px;}'
                    );

    sheet.insertRule('#BoosterTimer a:hover .boosterTooltip {'
                     + 'z-index:99; '
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#canvas_quest_energy .energy_counter_bar .bar-wrapper .over [rel="count_txt"] {'
                     + 'margin-left: 3px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#canvas_quest_energy .energy_counter_bar .bar-wrapper .over [rel="count_txt_mobile"] {'
                     + 'display: none;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#canvas_quest_energy .energy_counter_bar .bar-wrapper .over [rel="count_txt"] {'
                     + 'display: none;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#canvas_quest_energy .energy_counter_bar .bar-wrapper .over [rel="count_txt_mobile"] {'
                     + 'position: relative;'
                     + 'left: -3px;'
                     + 'font-size: 10px;'
                     + 'font-weight: 400;'
                     + 'letter-spacing: .1px;'
                     + 'color: #8ec3ff;'
                     + 'text-shadow: 1px 1px 0 #000,-1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#canvas_quest_energy .energy_counter_bar .bar-wrapper .over [rel="count_txt_mobile"] [rel="count_mobile"] {'
                     + 'font-size: 10px;'
                     + 'font-weight: 400;'
                     + 'letter-spacing: .1px;'
                     + 'color: #8ec3ff;'
                     + 'text-shadow: 1px 1px 0 #000,-1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000;}}'
                    );

    sheet.insertRule('.club-wrapper span[sort_by] {'
                     + 'display: block;}'
                    );

    sheet.insertRule('.club-wrapper > .club-container .club_champions_panel .club_champions_participants_container table tbody tr td:nth-child(2), '
                     + '.club-wrapper > .club-container .club_champions_panel .club_champions_participants_container table thead th:nth-child(2) {'
                     + 'width: 40%;}'
                    );

    sheet.insertRule('.club-wrapper > .club-container .club_champions_panel .club_champions_participants_container table tbody tr td:nth-child(4), '
                     + '.club-wrapper > .club-container .club_champions_panel .club_champions_participants_container table thead th:nth-child(4) {'
                     + 'width: 30%;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + 'a[href$="pachinko.html"]>.position>span {'
                     + 'width: 140px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + 'a[href$="pachinko.html"]>.position>span {'
                     + 'width: 110px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + 'a[href$="shop.html"]>.position>span {'
                     + 'width: 130px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + 'a[href$="shop.html"]>.position>span {'
                     + 'width: 100px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + 'a[rel="clubs"]>.position>span {'
                     + 'width: 130px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + 'a[rel="clubs"]>.position>span {'
                     + 'width: 100px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.page-champions .personal-bars__attacker, .page-champions .personal-bars__defender {'
                     + 'top: -20px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.page-club_champion .personal-bars__attacker, .page-club_champion .personal-bars__defender {'
                     + 'top: -15px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.champions-top__inner-wrapper {'
                     + 'top: 4px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.section__battle-header {'
                     + 'top: 15px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.section__battle-header {'
                     + 'top: 25px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.special-ability-pending {'
                     + 'top: 75px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.special-ability-pending {'
                     + 'top: 100px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.trollPts_icn {'
                     + 'position: absolute;'
                     + 'top: 9px;'
                     + 'left: 10px;'
                     + 'z-index: 99;'
                     + 'display: block;'
                     + 'width: 29px;'
                     + 'height: 31px;'
                     + 'background-image: url(https://hh.hh-content.com/design/ic_BattlePts.png);'
                     + 'background-size: 25px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;'
                     + 'margin: 0;'
                     + 'padding: 0;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.trollPts_icn {'
                     + 'position: absolute;'
                     + 'top: 28px;'
                     + 'left: 10px;'
                     + 'z-index: 99;'
                     + 'display: block;'
                     + 'width: 30px;'
                     + 'height: 33px;'
                     + 'background-image: url(https://hh.hh-content.com/design/ic_BattlePts.png);'
                     + 'background-size: 25px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;'
                     + 'margin: 0;'
                     + 'padding: 0;}'
                    );

    sheet.insertRule('#canvas_fight_energy .trollTooltip {'
                     + 'width: 180px; '
                     + 'top: 36px; '
                     + 'margin-left: -75px;}'
                    );

    sheet.insertRule('#canvas_fight_energy .trollPts_icn:hover .trollTooltip {'
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#canvas_fight_energy .trollPts_icn:hover #troll_title {'
                     + 'color: white; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#canvas_fight_energy .trollPts_icn:hover #troll_time_remaining {'
                     + 'color: orange; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.energy_icn {'
                     + 'position: absolute;'
                     + 'top: 9px;'
                     + 'left: 21px;'
                     + 'z-index: 36;'
                     + 'display: block;'
                     + 'width: 21px;'
                     + 'height: 30px;'
                     + 'background-image: url(https://hh2.hh-content.com/design/ic_Energy.png);'
                     + 'background-size: 21px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;'
                     + 'margin: 0;'
                     + 'padding: 0;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.energy_icn {'
                     + 'position: absolute;'
                     + 'top: 28px;'
                     + 'left: 13px;'
                     + 'z-index: 36;'
                     + 'display: block;'
                     + 'width: 19px;'
                     + 'height: 31px;'
                     + 'background-image: url(https://hh2.hh-content.com/design/ic_Energy.png);'
                     + 'background-size: 19px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;'
                     + 'margin: 0;'
                     + 'padding: 0;}'
                    );

    sheet.insertRule('#canvas_quest_energy .energyTooltip {'
                     + 'width: 175px; '
                     + 'top: 36px; '
                     + 'margin-left: -75px;}'
                    );

    sheet.insertRule('#canvas_quest_energy .energy_icn:hover .energyTooltip {'
                     + 'color: gray; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#canvas_quest_energy .energy_icn:hover #energy_title {'
                     + 'color: white; '
                     + 'font-size: 14px; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#canvas_quest_energy .energy_icn:hover #energy_time_remaining {'
                     + 'color: orange; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#club_whole .club-wrapper > .club-container.club_dashboard > h2 {'
                     + 'top: 5px !important;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#club_whole .club-wrapper > .club-container.club_dashboard > h2 {'
                     + 'top: 15px !important;}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.page-pachinko #content-unscaled {'
                     + 'top: 95px !important;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.page-pachinko #content-unscaled {'
                     + 'top: 75px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#tower_of_fame .base_block.lead_wrapper > h3 {'
                     + 'top: 8px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#canvas_fight_energy span[rel="count_txt"] {'
                     + 'position: relative;'
                     + 'left: -10px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#canvas_fight_energy span[rel="count_txt"] {'
                     + 'position: relative;'
                     + 'left: -3px !important;}'
                    );

    sheet.insertRule('#hh_comix div[rel="count_txt_mobile"], #hh_comix div[rel="count_txt"], #hh_comix #trollTool, #hh_comix #energyTool {'
                     + 'font-weight: 800 !important;}'
                     );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#homepage a[href="/club-champion.html"] {'
                     + 'position: absolute;'
                     + 'width:30px;'
                     + 'height:30px;'
                     + 'top:11px;'
                     + 'left: 61px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#homepage a[href="/club-champion.html"] {'
                     + 'position: absolute;'
                     + 'top:46px;'
                     + 'left: 154px;}}'
                     );

    sheet.insertRule('#homepage a[href="/club-champion.html"] .champions_icn {'
                    + 'background-position: center;'
                    + 'background-repeat: no-repeat;'
                    + 'background-image: url(https://hh.hh-content.com/design/menu/ic_champions.svg);}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                    + '#homepage a[href="/club-champion.html"] .champions_icn {'
                    + 'width:20px;'
                    + 'height:20px;'
                    + 'background-size: 14px;}}'
                   );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#homepage a[href="/club-champion.html"] .champions_icn {'
                     + 'position: absolute;'
                     + 'width:40px;'
                     + 'height:40px;'
                     + 'background-size:19px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#season-arena .opponents_choose_text_container {'
                     + 'margin-top:10px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#season-arena .season_arena_opponent_container {'
                     + 'margin-top: -15px !important;'
                     + 'height:400px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#season-arena .opponent_perform_button_container {'
                     + 'margin-top:-15px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#new_battle .new-battle-hero-container.new-battle-player>div:nth-child(1) {'
                     + 'margin-top: 35px !important;}}'
                    );

    // Move clubs button out of the way of seasons
    sheet.insertRule(`
        #homepage>a[rel=clubs] {
            top: 148px;
            left: 151px;
        }
    `)
    sheet.insertRule(`
        #homepage>a[rel=leaderboard] {
            height: 167px;
        }
    `)
}


/* ============
    SEASON SIM
   ============ */

function moduleSeasonSim() {
    var playerEgo;
    var playerAtk;
    var playerDef;
    var playerCrit;

    var opponentEgo;
    var opponentAtk;
    var opponentDef;
    var opponentCrit;

    function calculateSeasonPower(idOpponent) {
        // INIT
        const $playerData = $('#season-arena .battle_hero')
        playerEgo = parseInt($playerData.find('.hero_stats .hero_stats_row:nth-child(2) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        playerAtk = parseInt($playerData.find('.hero_stats .hero_stats_row:nth-child(1) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        playerDef = parseInt($playerData.find('.hero_stats .hero_stats_row:nth-child(1) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        playerCrit = parseInt($playerData.find('.hero_stats .hero_stats_row:nth-child(2) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        const playerSynergyDataJSON = $playerData.find('.hero_team .icon-area').attr('synergy-data')
        const playerSynergies = JSON.parse(playerSynergyDataJSON)
        const playerTeam = $playerData.find('.hero_team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const playerTeamMemberElements = playerTeam.map(({elementData, element_data})=>(elementData || element_data).type)
        const playerElements = calculateThemeFromElements(playerTeamMemberElements)
        const playerBonuses = {
            critDamage: findBonusFromSynergies(playerSynergies, 'fire'),
            critChance: findBonusFromSynergies(playerSynergies, 'stone'),
            defReduce: findBonusFromSynergies(playerSynergies, 'sun'),
            healOnHit: findBonusFromSynergies(playerSynergies, 'water'),
        }

        let $opponentData = $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ')');
        opponentEgo = parseInt($opponentData.find('.hero_stats div:nth-child(2) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentDef = parseInt($opponentData.find('.hero_stats div:nth-child(1) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentAtk = parseInt($opponentData.find('.hero_stats div:nth-child(1) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentCrit = parseInt($opponentData.find('.hero_stats div:nth-child(2) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        const opponentTeam = $opponentData.find('.hero_team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray()
        const opponentTeamMemberElements = opponentTeam.map(({element})=>element)
        const opponentElements = calculateThemeFromElements(opponentTeamMemberElements)
        const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements)

        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo * (1 + dominanceBonuses.player.ego),
            dmg: (playerAtk * (1 + dominanceBonuses.player.attack)) - (opponentDef * (1 - playerBonuses.defReduce)),
            critchance: calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: playerBonuses
        };
        const opponent = {
            hp: opponentEgo * (1 + dominanceBonuses.opponent.ego),
            dmg: (opponentAtk * (1 + dominanceBonuses.opponent.attack)) - (playerDef * (1 - opponentBonuses.defReduce)),
            critchance: calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name: $('.season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ') > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').text(),
            bonuses: opponentBonuses
        };

        const simu = calculateBattleProbabilities(player, opponent)

        $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ') .team-total-power').append(`<span class="matchRating ${simu.scoreClass}">${nRounding(100*simu.win, 2, -1)}%</span>`);
    }

    calculateSeasonPower(1);
    calculateSeasonPower(2);
    calculateSeasonPower(3);

    let button = document.querySelector('#refresh_villains');
    button.addEventListener('click', function(){
        setTimeout(function(){
            $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(3) .average-lvl .matchRating').remove();
            calculateSeasonPower(1);
            $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(5) .average-lvl .matchRating').remove();
            calculateSeasonPower(2);
            $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(7) .average-lvl .matchRating').remove();
            calculateSeasonPower(3);
        }, 5000);
    });


    //CSS
    sheet.insertRule('.matchRating {'
                     + 'text-align: center; '
                     + 'margin-left: 10px; '
                     + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                     + 'line-height: 17px; '
                     + 'font-size: 16px;}'
                    );

    sheet.insertRule('.plus {'
                     + 'color: #66CD00;}'
                    );

    sheet.insertRule('.minus {'
                     + 'color: #FF2F2F;}'
                    );

    sheet.insertRule('.close {'
                     + 'color: #FFA500;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#season-arena .average-lvl {'
                     + 'margin-left: -15px;}}'
                    );
}

/* ==============
    SEASON STATS
   ============== */

function moduleSeasonStats() {
    const DEFAULT_STATS = {
        fights: 0,
        victories: 0,
        losses: 0,
        won_mojo: 0,
        lost_mojo: 0,
        won_mojo_avg: 0, lost_mojo_avg: 0, mojo_avg: 0
    }
    const lsKeys = {
        SEASON_STATS: 'SeasonStats',
        OLD_SEASON_STATS: 'oldSeasonStats',
        SEASON_END_TIME: 'SeasonEndTime'
    }

    if (!CurrentPage.includes('season-arena')) {
        // Rollover
        const now = server_now_ts
        let seasonEndTime = parseInt(localStorage.getItem(lsKeys.SEASON_END_TIME) || '0', 10)
    
        if (now > seasonEndTime) {
            localStorage.setItem(lsKeys.OLD_SEASON_STATS, localStorage.getItem(lsKeys.SEASON_STATS))
            localStorage.setItem(lsKeys.SEASON_STATS, JSON.stringify(DEFAULT_STATS))
            seasonEndTime = now + season_sec_untill_event_end
            localStorage.setItem(lsKeys.SEASON_END_TIME, seasonEndTime)
        }
    }

    var seasonStatsData = localStorage.getItem(lsKeys.SEASON_STATS);
    var seasonStats = JSON.parse(seasonStatsData) || DEFAULT_STATS;
    localStorage.setItem(lsKeys.SEASON_STATS, JSON.stringify(seasonStats));
    var fights = seasonStats.fights;
    var victories = seasonStats.victories;
    var losses = seasonStats.losses;
    var won_mojo = seasonStats.won_mojo;
    var lost_mojo = seasonStats.lost_mojo;
    var won_mojo_avg = seasonStats.won_mojo_avg;
    var lost_mojo_avg = seasonStats.lost_mojo_avg;
    var mojo_avg = seasonStats.mojo_avg;
    var i=0;

    // Extract from battle
    if (CurrentPage.indexOf('season-battle') != -1) {
        onAjaxResponse(/action=do_season_battles/i, (response) => {
            const {rewards} = response
            if (rewards && rewards.data && rewards.data.rewards) {
                const mojoReward = rewards.data.rewards.find(({type}) => type === 'victory_points')
                if (mojoReward) {

                    // <p>26</p>
                    const mojoAmount = parseInt($(mojoReward.value).text(), 10)

                    fights +=1;
                    if (mojoAmount > 0) {
                        victories += 1;
                        won_mojo += mojoAmount
                        won_mojo_avg = Math.floor(won_mojo/victories*100)/100;
                    } else {
                        losses += 1;
                        lost_mojo += mojoAmount
                        lost_mojo_avg = Math.floor(lost_mojo/losses*100)/100;
                    }
                    mojo_avg = Math.floor((won_mojo-lost_mojo)/fights*100)/100;
                    seasonStats.fights = fights;
                    seasonStats.victories = victories;
                    seasonStats.won_mojo = won_mojo;
                    seasonStats.won_mojo_avg = won_mojo_avg;
                    seasonStats.losses = losses;
                    seasonStats.lost_mojo = lost_mojo;
                    seasonStats.lost_mojo_avg = lost_mojo_avg;
                    seasonStats.mojo_avg = mojo_avg;
                    localStorage.setItem(lsKeys.SEASON_STATS, JSON.stringify(seasonStats));
                }
            }
        })
    }

    if (CurrentPage.indexOf('season-arena') == -1) {
        $('div#seasons_tab_title').append('<span class="scriptSeasonStats" style="color: #8ec3ff; margin-left: 54px; font-size: 16px">Stats'
                                          + '<span class="scriptSeasonStatsTooltip">' + texts[lang].fights + ' : ' + fights
                                          + '<BR>' + texts[lang].victories + ' : ' + victories
                                          + '<BR>' + texts[lang].defeats + ' : ' + losses
                                          + '<BR><BR>' + texts[lang].won_mojo + ' : ' + won_mojo
                                          + '<BR>' + texts[lang].lost_mojo + ' : ' + lost_mojo
                                          + '<BR><BR>' + texts[lang].won_mojo_avg + ' : ' + won_mojo_avg
                                          + '<BR>' + texts[lang].lost_mojo_avg + ' : ' + lost_mojo_avg
                                          + '<BR>' + texts[lang].mojo_avg + ' : ' + mojo_avg + '</span>'
                                          + '</span>');
    }

    if (CurrentPage.indexOf('season-arena') != -1) {
        $('div#season-arena > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').append('<span class="scriptSeasonStatsArena" style="color: #8ec3ff; margin-left: 15px; font-size: 16px">Stats'
                                                                                                                 + '<span class="scriptSeasonStatsTooltipArena">' + texts[lang].fights + ' : ' + fights
                                                                                                                 + '<BR>' + texts[lang].victories + ' : ' + victories
                                                                                                                 + '<BR>' + texts[lang].defeats + ' : ' + losses
                                                                                                                 + '<BR><BR>' + texts[lang].won_mojo + ' : ' + won_mojo
                                                                                                                 + '<BR>' + texts[lang].lost_mojo + ' : ' + lost_mojo
                                                                                                                 + '<BR><BR>' + texts[lang].won_mojo_avg + ' : ' + won_mojo_avg
                                                                                                                 + '<BR>' + texts[lang].lost_mojo_avg + ' : ' + lost_mojo_avg
                                                                                                                 + '<BR>' + texts[lang].mojo_avg + ' : ' + mojo_avg + '</span>'
                                                                                                                 + '</span>');
    }

    //CSS
    sheet.insertRule('.scriptSeasonStatsTooltip {'
                     + 'visibility: hidden; '
                     + 'font-size: 12px; '
                     + 'background-color: black; '
                     + 'color: #fff; '
                     + 'text-align: center; '
                     + 'padding: 3px 5px 3px 5px; '
                     + 'border: 2px solid #905312; '
                     + 'border-radius: 6px; '
                     + 'background-color: rgba(32,3,7,.9); '
                     + 'position: absolute; '
                     + 'margin-top: 35px; '
                     + 'margin-left: -112px; '
                     + 'width: 75%; '
                     + 'z-index: 100;}'
                    );

    sheet.insertRule('.scriptSeasonStatsTooltip::after {'
                     + 'content: " "; '
                     + 'position: absolute; '
                     + 'bottom: 100%; '
                     + 'left: 50%; '
                     + 'margin-top:  3px; '
                     + 'margin-left:  -10px; '
                     + 'border-width: 10px; '
                     + 'border-style: solid; '
                     + 'border-color: transparent transparent #905312 transparent;}'
                    );

    sheet.insertRule('.scriptSeasonStats:hover .scriptSeasonStatsTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.scriptSeasonStatsTooltipArena {'
                     + 'visibility: hidden; '
                     + 'font-size: 12px; '
                     + 'background-color: black; '
                     + 'color: #fff; '
                     + 'text-align: center; '
                     + 'padding: 3px 5px 3px 5px; '
                     + 'border: 2px solid #905312; '
                     + 'border-radius: 6px; '
                     + 'background-color: rgba(32,3,7,.9); '
                     + 'position: absolute; '
                     + 'margin-top: 30px; '
                     + 'margin-left: -112px; '
                     + 'width: 75%; '
                     + 'z-index: 100;}'
                    );

    sheet.insertRule('.scriptSeasonStatsTooltipArena::after {'
                     + 'content: " "; '
                     + 'position: absolute; '
                     + 'bottom: 100%; '
                     + 'left: 50%; '
                     //+ 'margin-top:  3px; '
                     + 'margin-left:  -10px; '
                     + 'border-width: 10px; '
                     + 'border-style: solid; '
                     + 'border-color: transparent transparent #905312 transparent;}'
                    );

    sheet.insertRule('.scriptSeasonStatsArena:hover .scriptSeasonStatsTooltipArena {'
                     + 'visibility: visible;}'
                    );
}

/* ==================================
    PACHINKO NAMES (Credit : Shinya)
   ================================== */

function modulePachinkoNames() {
    if ($('#pachinko_whole').length){
        const jsonMapData = localStorage.HHPNMap;
        if (typeof(jsonMapData) == "undefined"){
            return
        }
        const localizationMap = new Map(JSON.parse(jsonMapData));
        const targetNode = document.getElementById('pachinko_whole');
        const config = { attributes: true, childList: true, subtree: true };

        const callback = function(mutationsList, observer){
            var text = $('#playzone-replace-info');
            if (text.find('.HHMI-INFO').length != 0){
                return
            } else if ($('#playzone-replace-info').find('.girl_shards').length) {
                const rewards = $('#playzone-replace-info').find('.girl_shards').attr('data-rewards')
                const regex = /id_girl":"\d+/g;
                const found = rewards.match(regex);

                var girls = "";
                for (var i = 0, l = found.length; i < l; i++){
                    const raw = found[i];
                    const id = raw.match(/\d+/g);
                    const name = (localizationMap.get(id.toString()) != undefined) ? localizationMap.get(id.toString()).name : 'Unknown';
                    let girlName = name.replaceAll("’", "-").replaceAll("/", "-");
                    var element;

                    if (HH_UNIVERSE == 'gay') {
                        element = (girlName != 'Unknown') ? '<a href="https://harem-battle.club/wiki/Gay-Harem/GH:' + name + '" target="_blank"> ' + name + ' </a>' : name;
                    }
                    else if (lang == 'fr' && $('#hh_hentai').length > 0) {
                        element = (girlName != 'Unknown') ? '<a href="http://hentaiheroes.wikidot.com/' + girlName + '" target="_blank"> ' + name + ' </a>' : name;
                    }
                    else if ($('#hh_hentai').length > 0) {
                        element = (girlName != 'Unknown') ? '<a href="https://harem-battle.club/wiki/Harem-Heroes/HH:' + girlName + '" target="_blank"> ' + name + ' </a>' : name;
                    }
                    else {
                        element = name;
                    }

                    if (girls != ""){
                        girls += ", " + element;
                    } else {
                        girls += element;
                    }
                }

                //if ((found.length > 12) && loadSetting('hhsPachinkoNamesMulti')){
                if (found.length > 12){
                    text = text.find('.game-rewards');
                    text.css("fontSize", "11px");
                    text.css("line-height", "13px");
                    text.css("margin-top", "61px");

                    text.append('<div class="HHMI-INFO">' + texts[lang].available_girls + girls + '</div>');

                    text = text.find('.HHMI-INFO');
                    text.css("height", "52px");
                    text.css("width", "410px");
                    text.css("position", "relative");
                    text.css("top", "-96px");
                    text.css("left", "-60px");
                    text.css("text-align", "center");
                    text.css("overflow-y", "scroll");
                }
                /*else if (found.length > 12){
                    return
                }*/

                else if (found.length > 3){
                    text = text.find('.game-rewards');
                    text.css("fontSize", "11px");
                    text.css("line-height", "15px");
                    text.css("margin-top", "55px");

                    text.append('<div class="HHMI-INFO">' + texts[lang].available_girls + girls + '</div>');

                    text = text.find('.HHMI-INFO');
                    text.css("height", "60px");
                    text.css("width", "390px");
                    text.css("position", "relative");
                    text.css("top", "-90px");
                    text.css("left", "-55px");
                    text.css("text-align", "center");
                }

                else {
                    text = text.find('.game-rewards');
                    text.css("fontSize", "11.5px");
                    text.css("margin-top", "55px");

                    text.append('<div class="HHMI-INFO">' + texts[lang].available_girls + girls + '</div>');

                    text = text.find('.HHMI-INFO');
                    text.css("width", "390px");
                    text.css("position", "relative");
                    text.css("top", "-85px");
                    text.css("left", "-55px");
                    text.css("text-align", "center");
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

    }

    //CSS
    sheet.insertRule('a {'
                     + 'text-decoration: none;'
                     + 'color: #fa8072;}'
                    );

    sheet.insertRule('#playzone-replace-info .cover, #playzone-replace-info .cover .pachinko_img img {'
                     + 'height: 275px !important;}'
                     );

    sheet.insertRule('#playzone-replace-info .cover h2 {'
                     + 'top: -10px !important;}'
                     );

    sheet.insertRule('#playzone-replace-info .cover h3.shadow-text {'
                     + 'top: 193px !important;}'
                     );

    if ($('#hh_comix').length == 1) {
        sheet.insertRule('#playzone-replace-info .cover p {'
                         + 'position: relative;'
                         + 'top: -18px !important;}'
                        );
    }
    else {
        sheet.insertRule('#playzone-replace-info .cover p {'
                         + 'position: relative;'
                         + 'top: -10px !important;}'
                        );
    }

    sheet.insertRule('#playzone-replace-info .game-rewards {'
                     + 'height: 40px !important;}'
                     );

    sheet.insertRule('#playzone-replace-info .graduation {'
                     + 'font-size: 10px !important;}'
                     );
}

/* ====================
    BATTLE SIMULATION
   ==================== */

function moduleBattleSim() {
    var playerEgo;
    var playerAtk;
    var playerDef;
    var playerHarmony;

    var opponentEgo;
    var opponentAtk;
    var opponentDef;
    var opponentHarmony;

    function calculatePower() {
        // INIT
        const playerStats = $('#pre-battle #player-panel .stat');
        playerAtk = parseLocaleRoundedInt(playerStats[0].innerText);
        playerEgo = parseLocaleRoundedInt(playerStats[1].innerText);
        playerDef = parseLocaleRoundedInt(playerStats[2].innerText);
        playerHarmony = parseLocaleRoundedInt(playerStats[3].innerText);

        const opponentStats = $('#pre-battle #opponent-panel .stat');
        opponentAtk = parseLocaleRoundedInt(opponentStats[0].innerText);
        opponentEgo = parseLocaleRoundedInt(opponentStats[1].innerText);
        opponentDef = parseLocaleRoundedInt(opponentStats[2].innerText);
        opponentHarmony = parseLocaleRoundedInt(opponentStats[3].innerText);

        const player = {
            hp: playerEgo,
            dmg: playerAtk - opponentDef,
            critchance: 0.3*playerHarmony/(playerHarmony+opponentHarmony)
        };
        const opponent = {
            hp: opponentEgo,
            dmg: opponentAtk - playerDef,
            critchance: 0.3-player.critchance,
            name: $('#opponent-panel .hero-name-container').text()
        };

        const simu = calcWinProbability(player, opponent);

        $('#opponent-panel .average-lvl')
            .wrap('<div class="gridWrapper"></div>')
            .after('<div class="matchRating ' + simu.scoreClass + '">' + simu.scoreStr + '</div>');
    }

    calculatePower();

    //CSS
    sheet.insertRule('.plus {'
                     + 'color: #66CD00;}'
                    );

    sheet.insertRule('.minus {'
                     + 'color: #FF2F2F;}'
                    );

    sheet.insertRule('.close {'
                     + 'color: #FFA500;}'
                    );

    sheet.insertRule(`
        .gridWrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
        }
    `)
    sheet.insertRule(`
        .matchRating {
            text-align: center;
            font-size: 16px;
        }
    `)
    sheet.insertRule(`
        #pre-battle .fighter-team .team-hexagon-container .average-lvl {
            text-align: center;
            margin-top: 0px;
            line-height: 26px;
        }
    `)
}

/* ========================================
    TEAMS FILTER (Credit : randomfapper34)
   ======================================== */

function moduleTeamsFilter() {
    var storage = window.localStorage;
    var arenaGirls = undefined;
    var girlsData = undefined;
    var totalTooltips = 80;

    $(document).ready(function() {
        if (CurrentPage.indexOf('edit-team') != -1) {
            updateFilterGirlData("seasons");
            $("h3.panel-title").after('<button id="arena_filter" class="blue_button_L">' + texts[lang].filter + '</button>');
            $("h3.panel-title").after(createFilterBox("default"));
            createFilterEvents();
        }

        sheet.insertRule('.personal_info.hero {'
                         + 'margin-top: 5px; }');
        sheet.insertRule('#season-arena .season_arena_block.battle_hero .hero_stats div {'
                         + 'margin: 0; }');

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '.change-team-panel #arena_filter {'
                         + 'position: absolute;'
                         + 'top: 99px;'
                         + 'right: 98px;}}'
                        );

        sheet.insertRule('@media only screen and (min-width: 1026px) {'
                         + '.change-team-panel #arena_filter {'
                         + 'position: absolute;'
                         + 'top: 76px;'
                         + 'right: 98px;}}'
                        );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '#edit-team-page .change-team-panel.team-panel {'
                         + 'margin-top: 20px;}}'
                        );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '#edit-team-page .change-team-panel.harem-panel {'
                         + 'margin-top: 17px;}}'
                        );
    });

    function updateFilterGirlData(type) {
        arenaGirls = $('.harem-panel-girls div.harem-girl-container');

        girlsData = $.map(arenaGirls, function(girl, index) {
            // CxH still uses 'new-girl-tooltip-data' and is broken in the UI
            return JSON.parse($(girl).attr("data-new-girl-tooltip") || $(girl).attr("new-girl-tooltip-data"));
        });
    }

    function createFilterEvents() {
        $("#arena_filter").on('click', function() {
            if (typeof arenaGirls === 'undefined' || typeof girlsData === 'undefined') return;
            var currentBoxDisplay = $("#arena_filter_box").css('display');
            $("#arena_filter_box").css('display', currentBoxDisplay == "none" ? 'block' : 'none');
        });
        $("#filter_class").on('change', filterGirls);
        if (ELEMENTS_ENABLED) {
            $("#filter_element").on('change', filterGirls)
        }
        $("#filter_rarity").on('change', filterGirls);
        $("#filter_name").get(0).oninput = filterGirls;
        $("#filter_blessed_attributes").on('change', filterGirls);
        $("#filter_aff_category").on('change', filterGirls);
        $("#filter_aff_lvl").on('change', filterGirls);
    }

    function filterGirls() {
        var filterClass = $("#filter_class").get(0).selectedIndex;
        var filterElement = 'all'
        if (ELEMENTS_ENABLED) {
            filterElement = $("#filter_element").get(0).value;
        }
        var filterRarity = $("#filter_rarity").get(0).value;
        var filterName = $("#filter_name").get(0).value;
        var nameRegex = new RegExp(filterName, "i");
        var filterBlessedAttributes = $("#filter_blessed_attributes").get(0).value;
        let filterAffCategory = $("#filter_aff_category").get(0).value;
        let filterAffLvl = $("#filter_aff_lvl").get(0).value;

        var girlsFiltered = $.map(girlsData, function(girl, index) {
            var matchesClass = (girl.class == filterClass) || (filterClass == 0);
            const {elementData, element_data} = girl
            var matchesElement = ((elementData || element_data).type === filterElement) || filterElement === 'all'
            var matchesRarity = (girl.rarity == filterRarity) || (filterRarity == 'all');
            const {Name, name} = girl
            var matchesName = ((Name || name).search(nameRegex) > -1);
            var matchesBlessedAttributes;
            switch (filterBlessedAttributes) {
                case 'blessed_attributes':
                    matchesBlessedAttributes = (girl.blessed_attributes != undefined);
                    break;
                case 'non_blessed_attributes':
                    matchesBlessedAttributes = (girl.blessed_attributes == undefined);
                    break;
                case 'all':
                    matchesBlessedAttributes = (filterBlessedAttributes == 'all');
                    break;
            }

            let affectionStr = girl.Graded2 || girl.graded2;
            let affectionCategoryStr = affectionStr.split('</g>');
            let affectionCategory = affectionCategoryStr.length-1;
            let affectionLvlStr = affectionStr.split('<g >');
            let affectionLvl = affectionLvlStr.length-1;
            let matchesAffCategory = (affectionCategory == filterAffCategory) || (filterAffCategory == 'all');
            let matchesAffLvl = (affectionLvl == filterAffLvl) || (filterAffLvl == 'all');

            return (matchesClass && matchesElement && matchesRarity && matchesName && matchesBlessedAttributes && matchesAffCategory && matchesAffLvl) ? index : null;
        });

        $.each(arenaGirls, function(index, girlElem) {
            $(girlElem).css('display', $.inArray(index, girlsFiltered) > -1 ? 'flex' : 'none');
        });

        //update scroll display
        $(".harem-panel-girls").css('overflow', '');
        $(".harem-panel-girls").css('overflow', 'hidden');
    }

    function createFilterBox() {
        totalHTML = '<div id="arena_filter_box" class="form-wrapper" style="'
            + 'position: absolute; width: 275px; right: 408px; z-index: 99; border-radius: 8px 10px 10px 8px; background-color: #1e261e; box-shadow: rgba(255, 255, 255, 0.73) 0px 0px; padding: 5px; border: 1px solid #ffa23e; display: none;">';

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '#arena_filter_box {'
                         + 'top: 98px;}}'
                        );

        sheet.insertRule('@media only screen and (min-width: 1026px) {'
                         + '#arena_filter_box {'
                         + 'top: 66px;}}'
                        );

        totalHTML += '<div class="form-control"><div class="input-group">'
            + '<label class="head-group" for="filter_name">' + texts[lang].searched_name + '</label>'
            + '<input type="text" autocomplete="off" id="filter_name" placeholder="' + texts[lang].girl_name + '" icon="search">'
            + '</div></div>';

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_class">' + texts[lang].searched_class + '</label>'
            + '<select name="filter_class" id="filter_class" icon="down-arrow">'
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="hardcore">' + texts[lang].hardcore + '</option><option value="charm">' + texts[lang].charm + '</option><option value="knowhow">' + texts[lang].knowhow + '</option>'
            + '</select></div></div>';

        if (ELEMENTS_ENABLED) {
            totalHTML += '<div class="form-control"><div class="select-group">'
                + '<label class="head-group" for="filter_element">' + label('searched_element') + '</label>'
                + '<select name="filter_element" id="filter_element" icon="down-arrow">'
                + '<option value="all" selected="selected">' + texts[lang].all + '</option>'
                + ['fire', 'nature', 'stone', 'sun', 'water', 'darkness', 'light', 'psychic'].map(option => `<option value="${option}">${GT.design[`${option}_flavor_element`]}</option>`).join('')
                + '</select></div></div>';
        }

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_rarity">' + texts[lang].searched_rarity + '</label>'
            + '<select name="filter_rarity" id="filter_rarity" icon="down-arrow">'
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="starting">' + texts[lang].starting + '</option><option value="common">' + texts[lang].common + '</option><option value="rare">' + texts[lang].rare + '</option><option value="epic">' + texts[lang].epic + '</option><option value="legendary">' + texts[lang].legendary + '</option><option value="mythic">' + texts[lang].mythic + '</option>'
            + '</select></div></div>';

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_aff_category">' + texts[lang].searched_aff_category + '</label>'
            + '<select name="filter_aff_category" id="filter_aff_category" icon="down-arrow">'
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="1">' + texts[lang].one_star + '</option><option value="3">' + texts[lang].three_stars + '</option><option value="5">' + texts[lang].five_stars + '</option><option value="6">' + texts[lang].six_stars + '</option>'
            + '</select></div></div>';

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_aff_lvl">' + texts[lang].searched_aff_lvl + '</label>'
            + '<select name="filter_aff_lvl" id="filter_aff_lvl" icon="down-arrow">'
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="0">' + texts[lang].zero_star + '</option><option value="1">' + texts[lang].one_star + '</option><option value="2">' + texts[lang].two_stars + '</option><option value="3">' + texts[lang].three_stars + '</option><option value="4">' + texts[lang].four_stars + '</option><option value="5">' + texts[lang].five_stars + '</option><option value="6">' + texts[lang].six_stars + '</option>'
            + '</select></div></div>';

        totalHTML += '<div class="form-control"><div class="select-group">'
            + '<label class="head-group" for="filter_blessed_attributes">' + texts[lang].searched_blessed_attributes + '</label>'
            + '<select name="filter_blessed_attributes" id="filter_blessed_attributes" icon="down-arrow">'
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="blessed_attributes">' + texts[lang].blessed_attributes + '</option><option value="non_blessed_attributes">' + texts[lang].non_blessed_attributes + '</option>'
            + '</select></div></div>';

        totalHTML += '</div>';

        return totalHTML;
    }
}

//Display your ranking at the bottom of the screen if you are in the top 1000
let isLeaderBoardRowCloned = false
function cloneOwnLeaderboardRow () {
    if (isLeaderBoardRowCloned) {return}
    let i=1;
    while((($(`div.leaderboard_row:nth-child(${i})`).css('color') != "rgb(34, 150, 228)") && ($(`div.leaderboard_row:nth-child(${i})`).css('color') != "rgb(55, 160, 231)")) && (i < 1000)){
        i++;
    }
    if (($(`div.leaderboard_row:nth-child(${i})`).css('color') == "rgb(34, 150, 228)") || ($(`div.leaderboard_row:nth-child(${i})`).css('color') == "rgb(55, 160, 231)")) {
        let player_row = $('div.leaderboard_row:nth-child(' + i + '').clone();
        player_row.css('position', 'fixed');
        player_row.css('width', '904px');
        player_row.addClass('player_row');
        $('#leaderboard_list').append(player_row);
        isLeaderBoardRowCloned = true
    }

    $('div.leaderboard_row:last-child').css('bottom', '')
}
if (CurrentPage == '/season.html' || CurrentPage.includes('pantheon') || CurrentPage.includes('path-of-valor')) {
    if (CurrentPage === '/season.html') {
        cloneOwnLeaderboardRow()

        sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.leaderboard_row:nth-child(1001) {'
                     + 'bottom: 20px;}}'
                    );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.leaderboard_row:nth-child(1001) {'
                     + 'bottom: -5px;}}'
                    );
    }
    if (CurrentPage === '/pantheon.html' || CurrentPage.includes('path-of-valor')) {
        new MutationObserver(cloneOwnLeaderboardRow).observe($('#leaderboard_list')[0], {childList: true})

        sheet.insertRule('@media only screen and (min-width: 1026px) {'
                        + '.player_row {'
                        + 'bottom: 10px;}}'
                    );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                        + '.player_row {'
                        + 'bottom: -5px;}}'
                    );
    }
}


//Stop background switching during Orgy Days event (Credit: Finderkeeper)
if ($("body[ page ]").attr("page") != "map") {
    $("#bg_all").replaceWith( $("#bg_all").clone() );
    $("#bg_all > div > img").not($("#bg_all > div > img")[Math.floor(Math.random()*$("#bg_all > div > img").length)]).remove();
    $("#bg_all > div > img").css("opacity","1");
    $("#bg_all > div > img").css("display","block");
}


//Get girls data in the harem
if ($('#harem_whole').length){
    if (typeof(localStorage.HHPNMap) != "undefined")
        if(JSON.parse(localStorage.HHPNMap)[0].length == 2)
            localStorage.removeItem('HHPNMap');
    const jsonMapData = localStorage.HHPNMap;
    const localizationMap = typeof(jsonMapData) == "undefined"? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    let keys = Object.keys(girlsDataList);

    var girlNameDictionary = new Map()
    for (let j = 0, l = keys.length; j < l; j++){
        let key = keys[j];
        let girl = girlsDataList[key];
        let name = girl["Name"] || girl.name;
        let shards = (girl["shards"] != undefined) ? parseInt(girl["shards"]) : 100;
        let girl_class = parseInt(girl["class"], 10);
        let girlData = {name: name,
                        shards: shards,
                        class: girl_class}
        if (typeof(name) != "undefined")
            girlNameDictionary.set(key, girlData);
    }
    if (girlNameDictionary.size > 0){
        let json = JSON.stringify(Array.from(girlNameDictionary.entries()));
        localStorage.HHPNMap = json;
    }
}

//Display the number of shards for girls on villains
if (CurrentPage.indexOf('battle') != -1 || CurrentPage.indexOf('clubs') != -1 || CurrentPage.indexOf('pachinko') != -1 || CurrentPage.indexOf('season-arena') != -1 || CurrentPage.indexOf('tower-of-fame') != -1) {
    const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));

    if (CurrentPage.indexOf('battle') != -1 || CurrentPage.indexOf('pachinko') != -1 || CurrentPage.indexOf('season-arena') != -1) {
        displayTrollGirlsShards();
        updateTrollGirlsShards();
    }
    else if (CurrentPage.indexOf('club') != -1) {
        displayClubChampionGirlsShards();
        setTimeout(function(){updateClubChampionGirlsShards();}, 2000);
    }
    else if (CurrentPage.indexOf('tower-of-fame') != -1 || CurrentPage.indexOf('season-battle') != -1) {
        if (CurrentPage.includes('tower-of-fame')) {
            displayLeaguesGirlsShards()
            updateLeagueGirlShards()
        }
        updateTrollGirlsShards();
    }

    function displayTrollGirlsShards() {
        if(($('.girls_reward').attr('data-rewards') != undefined) && (CurrentPage.indexOf('troll-pre-battle') != -1)) {
            let girlsData = JSON.parse($('.girls_reward').attr('data-rewards'));
            for (let j=0; j < girlsData.length; j++) {
                let girlId = girlsData[j].id_girl;
                let shards = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).shards : 0;
                let name = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).name : '';
                $('.slot_girl_shards:nth-child(' + (j+1) + ') .girl_ico').append('<div class="shards_troll" shards="' + shards + '" name="' + name + '">'
                                                                                 + '<span class="shard_troll"></span>'
                                                                                 + '<p id="shard_number">' + shards + '</p>'
                                                                                 + '</div>');

                sheet.insertRule('.page-troll-pre-battle #shard_number {'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'left: -5px;'
                                 + 'color: #80058b;'
                                 + 'text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;'
                                 + 'width: 28px;'
                                 + 'text-align: right;'
                                 + 'font-size: 12px !important;}'
                                );

                sheet.insertRule('.page-troll-pre-battle .shards_troll .shard_troll {'
                                 + 'background-image: url(https://hh2.hh-content.com/shards.png);'
                                 + 'background-repeat: no-repeat;'
                                 + 'background-size: contain;'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'width: 20px;'
                                 + 'height: 20px;}'
                                );

                if (girlsData.length > 1) {
                    sheet.insertRule('.page-troll-pre-battle #shard_number {'
                                     + 'margin-left: -1px;'
                                     + 'margin-top: -10px;}'
                                    );

                    sheet.insertRule('.page-troll-pre-battle .shards_troll .shard_troll {'
                                     + 'margin-left: 2px;'
                                     + 'margin-top: -11px;}'
                                    );
                }
                else {
                    sheet.insertRule('.page-troll-pre-battle #shard_number {'
                                     + 'margin-left: -1px;'
                                     + 'margin-top: -14px;}'
                                    );

                    sheet.insertRule('.page-troll-pre-battle .shards_troll .shard_troll {'
                                     + 'margin-left: 2px;'
                                     + 'margin-top: -15px;}'
                                    );
                }
            }
        }
        else if (($('.girls_reward .animate > div').attr('data-reward-display') != undefined) && ((window.location.href.indexOf('league_battle') != -1) || (CurrentPage.indexOf('season-arena') != -1))) {
            let girlsData = JSON.parse($('.girls_reward .animate > div').attr('data-reward-display'));
            for (let j=0; j < girlsData.length; j++) {
                let girlId = girlsData[j].id_girl;
                let shards = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).shards : 0;
                let name = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).name : '';
                $('.slot_girl_shards:nth-child(' + (j+1) + ') .girl_ico').append('<div class="shards_troll" shards="' + shards + '" name="' + name + '">'
                                                                                 + '<span class="shard_troll" style="background-image: url(https://hh2.hh-content.com/shards.png); background-repeat: no-repeat; background-size: contain; position: absolute; margin-top: -15px; margin-left: 2px; width: 20px; height: 20px;"></span>'
                                                                                 + '<p id="shard_number">' + shards + '</p></div>');

                //CSS
                sheet.insertRule('.page-troll-pre-battle #shard_number {'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'left: -5px;'
                                 + 'color: #80058b;'
                                 + 'text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;'
                                 + 'width: 28px;'
                                 + 'text-align: right;'
                                 + 'margin-top: -14px;'
                                 + 'font-size: 12px;}'
                                );

                sheet.insertRule('.page-season_arena #shard_number {'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'padding-left: 10px;'
                                 + 'color: #80058b;'
                                 + 'text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;'
                                 + 'width: 24px;'
                                 + 'text-align: right;'
                                 + 'margin-top: -13px;'
                                 + 'margin-left: -2px;'
                                 + 'font-size: 11px;}'
                                );
            }
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if ($('.hh_tooltip_new .slot_girl').length == 0)
                    return;

                else if($('.hh_tooltip_new .slot_girl:nth-child(1) .girl_ico .shards_troll').length != 0)
                    return;

                else {
                    if ($('.hh_tooltip_new .slot_girl:nth-child(1) img').attr('src').indexOf('girls/') == -1)
                        return;

                    else {
                        for (var l=1; l <= $('.hh_tooltip_new')[0].children.length; l++) {
                            let idGirlStr = $('.hh_tooltip_new .slot_girl:nth-child(' + l + ') img').attr('src');
                            let indexStart = idGirlStr.indexOf('girls/') + 'girls/'.length;
                            let indexEnd = idGirlStr.indexOf('/ico');
                            let girlId = idGirlStr.substring(indexStart, indexEnd);
                            let shards = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).shards : 0;
                            let name = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).name : '';
                            $('.hh_tooltip_new .slot_girl:nth-child(' + l + ') .girl_ico .shards_troll').remove();
                            $('.hh_tooltip_new .slot_girl:nth-child(' + l + ') .girl_ico').append('<div class="shards_troll" shards="' + shards + '" name="' + name + '">'
                                                                                                  + '<span class="shard_troll_tooltip" style="background-image: url(https://hh2.hh-content.com/shards.png); background-repeat: no-repeat; background-size: contain; position: absolute; bottom: -0.25em; top: 27px; margin-left: 2px; width: 15px; height: 15px;"></span>'
                                                                                                  + '<p id="shard_number_tooltip" style="position: absolute; bottom: -0.25em; padding-left: 10px; color: #80058b; text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff; width: 28px; text-align: right; margin-top: -10px; margin-left: -6px; font-size: 9px;">'
                                                                                                  + '<span>' + shards + '</span>'
                                                                                                  + '</p></div>');
                        }

                        sheet.insertRule('#hh_comix .hh_tooltip_new .slot_girl .girl_ico {'
                                         + 'font-weight : bold !important;}'
                                         );
                    }
                }
            })
        })

        if (CurrentPage.indexOf('troll-pre-battle') != -1) {
            observer.observe($('.page-pre_battle, .page-troll-pre-battle')[0], {
                childList: true
                , subtree: true
                , attributes: false
                , characterData: false
            });
        }

        else if (CurrentPage.indexOf('pachinko') != -1) {
            observer.observe($('.page-pachinko')[0], {
                childList: true
                , subtree: true
                , attributes: false
                , characterData: false
            });
        }

        else if (CurrentPage.indexOf('tower-of-fame') != -1) {
            observer.observe($('.page-leaderboard')[0], {
                childList: true
                , subtree: true
                , attributes: false
                , characterData: false
            });
        }
    }


    function displayClubChampionGirlsShards() {
        if(!$('.girl-shards-reward-wrapper').length)
            return;

        let girls = $('.girl-shards-reward-wrapper');
        for (let k=0; k < girls.length; k++) {
            let idGirlStr = $('.girl-shards-reward-wrapper:nth-child(' + (k+1) + ') .shards_girl_ico img').attr('src');
            let indexStart = idGirlStr.indexOf('girls/') + 'girls/'.length;
            let indexEnd = idGirlStr.indexOf('/ico');
            let girlId = idGirlStr.substring(indexStart, indexEnd);

            let shards = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).shards : 0;
            let name = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).name : '';
            $('.girl-shards-reward-wrapper:nth-child(' + (k+1) + ') .shards_girl_ico').append('<div class="club_shards" shards="' + shards + '" name="' + name + '">'
                                                                                              + '<p id="club_shard_number" style="position: relative; bottom: 5.9em; padding-left: 10px; color: #80058b; text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;; width: 28px; text-align: right; margin-left: -11px; font-size: 12px;">'
                                                                                              + '<span>' + shards + '</span>'
                                                                                              + '<span class="club_shard" style="background-image: url(https://hh2.hh-content.com/shards.png); background-repeat: no-repeat; background-size: contain; display: block; position: relative; bottom: 1.75em; margin-left: 15px; width: 25px; height: 25px;"></span>'
                                                                                              + '</p></div>');
        }
    }

    function displayLeaguesGirlsShards() {
        const $leaguesGirlRewardContainer = $('.leagues_girl_reward_container')
        if(!$leaguesGirlRewardContainer.length)
            return;


            let idGirlStr = $leaguesGirlRewardContainer.find('.girl_ico img').attr('src');
            let indexStart = idGirlStr.indexOf('girls/') + 'girls/'.length;
            let indexEnd = idGirlStr.indexOf('/ico');
            let girlId = idGirlStr.substring(indexStart, indexEnd);

            let shards = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).shards : 0;
            let name = (girlDictionary.get(girlId.toString()) != undefined) ? girlDictionary.get(girlId.toString()).name : '';
            $leaguesGirlRewardContainer.find('.girl_ico').append('<div class="league_shards" shards="' + shards + '" name="' + name + '">'
                                                                + '<p id="league_shard_number" style="position: relative; bottom: 2.3em; padding-left: 10px; color: #80058b; text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;; width: 28px; text-align: right; margin-left: -11px; font-size: 8px;">'
                                                                + '<span>' + shards + '</span>'
                                                                + `<span class="league_shard" style="background-image: url(${IMAGES_URL}/shards.png); background-repeat: no-repeat; background-size: contain; display: block; position: relative; bottom: 2em; margin-left: 15px; width: 20px; height: 20px;"></span>`
                                                                + '</p></div>');

    }

    function updateTrollGirlsShards() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if ($('.shards_wrapper').length == 0)
                    return;

                for (var l=2; l <= $('.shards_wrapper')[0].children.length; l++) {
                    let idGirlStr = $('.shards_girl_ico:nth-child(' + l + ') img').attr('src');
                    let indexStart = idGirlStr.indexOf('girls/') + 'girls/'.length;
                    let indexEnd = idGirlStr.indexOf('/ico');
                    let idGirl = idGirlStr.substring(indexStart, indexEnd);
                    let name = (girlDictionary.get(idGirl) == undefined) ? '' : girlDictionary.get(idGirl).name;
                    let newShards = parseInt($('.shards_girl_ico:nth-child(' + l + ') .shards').attr('shards'));
                    let girlData = {name: name,
                                    shards: Math.min(newShards, 100)}
                    girlDictionary.set(idGirl, girlData);
                }
                localStorage.HHPNMap = JSON.stringify(Array.from(girlDictionary.entries()));
            })
        })

        observer.observe($('#reward_holder .container .scrolling_area')[0], {
            childList: true
            , subtree: true
            , attributes: false
            , characterData: false
        });
    }

    function collectFromLeagueClaimAjaxResponse (response) {
        const {rewards} = response
        if (!rewards) {
            return
        }
        const {list} = rewards
        if (!list) {
            return
        }
        list.forEach(({data}) => {
            if (data && data.shards) {
                data.shards.forEach(({id_girl, value}) => {
                    const girlId = `${id_girl}`
                    const girl = girlDictionary.get(girlId) || {}
                    girl.shards = Math.min(value, 100)
                    girlDictionary.set(girlId, girl)
                })
                localStorage.HHPNMap = JSON.stringify(Array.from(girlDictionary.entries()));
            }
        })
    }

    function updateLeagueGirlShards() {
        onAjaxResponse(/action=claim_rewards/, collectFromLeagueClaimAjaxResponse)
    }

    function updateClubChampionGirlsShards() {
        if ($('.shards_wrapper').length == 0)
            return;

        for (var l=2; l <= $('.shards_wrapper')[0].children.length; l++) {
            let idGirlStr = $('.shards_girl_ico:nth-child(' + l + ') img').attr('src');
            let indexStart = idGirlStr.indexOf('girls/') + 'girls/'.length;
            let indexEnd = idGirlStr.indexOf('/ico');
            let idGirl = idGirlStr.substring(indexStart, indexEnd);
            let name = (girlDictionary.get(idGirl) == undefined) ? '' : girlDictionary.get(idGirl).name;
            let newShards = parseInt($('.shards_girl_ico:nth-child(' + l + ') .shards').attr('shards'));
            let girlData = {name: name,
                            shards: Math.min(newShards, 100)}
            girlDictionary.set(idGirl, girlData);
        }
        localStorage.HHPNMap = JSON.stringify(Array.from(girlDictionary.entries()));

        $('.club_shards').remove();
        displayClubChampionGirlsShards();
    }
}

//Remove button to access to club champion's positions during cooldown + add some datas about participation of club members
if (CurrentPage == "/clubs.html" && $('.club_champions_details_container').length) {
    $('button.orange_button_L.btn_skip_team_cooldown').css('display', 'none');
    if (!$('button.orange_button_L.btn_skip_champion_cooldown').length)
        $('.challenge_container').css('display', 'block');

    let participants = $('#club_champions_body_table > tbody:nth-child(1)')[0].children.length;
    let club_members = $('#members > tbody:nth-child(1)')[0].children.length;
    $('.club_champions_body_table').prepend('<div style="display: block;position: absolute;top: 15px;left: 500px;">Participants: '
                                                                          + participants + '/' + club_members + '</div>');

    function calculateParticipation() {
        let championImpress = parseInt((JSON.parse($('.club_champions_bar_container').attr('champion-healing-tooltip')).impression_info).split('/')[1].trim().replace(/[^0-9]/gi, ''), 10);
        let list = $('#club_champions_body_table .impression')
        for (let i=0; i<list.length; i++) {
            let impress = parseInt(list[i].attributes[1].value.replace(/[^-0-9]/gi, ''), 10);
            let percentage = Math.floor((impress/championImpress)*10000)/100;
            $('#club_champions_body_table tbody tr:nth-child(' + (i+1) + ') > td:nth-child(4)').append('<span> / ' + nThousand(percentage) + '%</span>');
        }
    }

    function highlightMembersParticipation() {
        let clubMembers = $('#members > tbody > tr').toArray();
        let championPartipants = $('#club_champions_body_table > tbody > tr').toArray();
        let listChampionParticipantsId = [];
        championPartipants.forEach((participant) => {
            listChampionParticipantsId.push(participant.attributes.sorting_id.value);
        });
        clubMembers.forEach((member) => {
            if (!listChampionParticipantsId.includes(member.attributes.sorting_id.value)) {
                member.children[0].style.color = '#ffa07a';
                member.children[2].style.color = '#ffa07a';
                member.children[3].style.color = '#ffa07a';
                member.children[4].style.color = '#ffa07a';
                member.children[5].style.color = '#ffa07a';
            }
        });
    }

    calculateParticipation();

    if ($('.club_champions_timer_fight span').length)
        highlightMembersParticipation();

    let sortImpression = document.querySelector('.club_champions_head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(4) > span:nth-child(1)');
    sortImpression.addEventListener('click', function(){
        calculateParticipation();
    });

    let sortChallenges = document.querySelector('.club_champions_head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(3) > span:nth-child(1)');
    sortChallenges.addEventListener('click', function(){
        calculateParticipation();
    });

    let sortName = document.querySelector('.club_champions_head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(2) > span:nth-child(1)');
    sortName.addEventListener('click', function(){
        calculateParticipation();
    });

    let sortLevel = document.querySelector('.club_champions_head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > span:nth-child(1)');
    sortLevel.addEventListener('click', function(){
        calculateParticipation();
    });

    let sortClubLevel = document.querySelector('.head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > span:nth-child(1)');
    sortClubLevel.addEventListener('click', function(){
        if ($('.club_champions_timer_fight span').length)
            highlightMembersParticipation();
    });

    let sortClubNames = document.querySelector('.head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(4) > span:nth-child(1)');
    sortClubNames.addEventListener('click', function(){
        if ($('.club_champions_timer_fight span').length)
            highlightMembersParticipation();
    });

    let sortClubMojo = document.querySelector('.head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(5) > span:nth-child(1)');
    sortClubMojo.addEventListener('click', function(){
        if ($('.club_champions_timer_fight span').length)
            highlightMembersParticipation();
    });

    let sortClubContribution = document.querySelector('.head_table > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(6) > span:nth-child(1)');
    sortClubContribution.addEventListener('click', function(){
        if ($('.club_champions_timer_fight span').length)
            highlightMembersParticipation();
    });

    function addTimeSinceStart () {
        const $timerFight = $('.club_champions_timer_fight')
        if (!$timerFight.length || !clubChampionsData.fight.active) {
            return
        }

        const duration = calculateTime(
            clubChampionsData.fight.start_time * 1e3,
            server_now_ts * 1e3
        )

        const durationString = `${duration.daysLeft > 0 ? `${duration.daysLeft}${GT.time.d} ` : ''}${duration.hoursLeft > 0 ? `${duration.hoursLeft}${GT.time.h} ` : ''}${duration.minutesLeft > 0 ? `${duration.minutesLeft}${GT.time.m}` : ''}`.trim()

        $timerFight.append('<br/>').append(`<span>${label('clubChampDuration').replace('{{duration}}', durationString)}</span>`)
    }

    addTimeSinceStart()

    function fixTimerBar () {
        const $clubChampionsBar = $('.club_champions_bar')
        // Fix silly code putting a localised decimal separator as a CSS rule value
        $clubChampionsBar.attr('style', $clubChampionsBar.attr('style').replace(',','.'))
    }
    fixTimerBar()
}

//Add previous/next arrows in Places of Power to navigate easily between them
if (window.location.href.includes('activities.html?tab=pop&index')) {
    let currentPop = $('.pop_thumb_selected')[0].attributes.pop_id.nodeValue;
    let popList = [];
    let popAll = document.getElementsByClassName("pop_thumb");
    for (var i=0; i<popAll.length; i++) {
        var className = popAll[i].className;
        if (!className.includes('greyed'))
            popList.push(popAll[i].attributes.pop_id.nodeValue);
    }
    let currentIndex = popList.indexOf(currentPop);
    let previousPop = (currentIndex == 0) ? popList[popList.length - 1] : popList[currentIndex-1];
    let nextPop = (currentIndex == popList.length - 1) ? popList[0] : popList[currentIndex+1];

    $('.pop_right_part').prepend('<a href="/activities.html?tab=pop&index=' + previousPop + '" class="back_button" id="previous_pop"><span id="previous_pop_img"></span></a>');

    $('.pop_right_part a:nth-child(1)').after('<a href="/activities.html?tab=pop&index=' + nextPop + '" class="back_button" id="next_pop"><span id="next_pop_img"></span></a>');


    //CSS
    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#previous_pop {'
                     + 'position: absolute;'
                     + 'bottom: 11px;'
                     + 'right: 273px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#previous_pop {'
                     + 'position: absolute;'
                     + 'bottom: 21px;'
                     + 'right: 280px;}}'
                    );

    sheet.insertRule('#previous_pop_img {'
                     + 'display: block;'
                     + 'width: 40px;'
                     + 'height: 40px;'
                     + 'margin: 0;'
                     + 'padding: 0;'
                     + 'background-image: url(https://hh.hh-content.com/design/menu/forward.svg);'
                     + 'background-size: 20px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;'
                     + 'transform: scaleX(-1);}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#next_pop {'
                     + 'position: absolute;'
                     + 'bottom: 11px;'
                     + 'right: 15px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#next_pop {'
                     + 'position: absolute;'
                     + 'bottom: 21px;'
                     + 'right: 8px;}}'
                    );

    sheet.insertRule('#next_pop_img {'
                     + 'display: block;'
                     + 'width: 40px;'
                     + 'height: 40px;'
                     + 'margin: 0;'
                     + 'padding: 0;'
                     + 'background-image: url(https://hh.hh-content.com/design/menu/forward.svg);'
                     + 'background-size: 20px;'
                     + 'background-position: center;'
                     + 'background-repeat: no-repeat;}'
                    );
}

function moduleContestRewards() {
    let $rewardsDisplay
    if (CurrentPage.includes('activities')) {
        const $contestPanel = $(".over_bunny.over_panel")
        let contestPanel=$contestPanel[0];
        const savedPanel=contestPanel.innerHTML;

        function displayRewardSums(){
            const rewards=$(".contest_header.ended .slot, .contest_header.ended .shards_girl_ico");
            let rewardList={};
            function getAmount(reward){
                try{
                    return parseLocaleRoundedInt(reward.getElementsByTagName("p")[0].innerText);
                }catch(e){
                    return 1;
                }
            }
            for(let i=0;i<rewards.length;i++) {
                const imgSrcAttr = rewards[i].children[0].attributes.getNamedItem('src')
                const key = `${rewards[i].className}${rewards[i].children[0].className}${imgSrcAttr ? imgSrcAttr.value : ''}`
                try{
                    rewardList[key].amount+=getAmount(rewards[i]);
                }catch(e){
                    rewardList[key]={
                        div: rewards[i].cloneNode(true),
                        amount: getAmount(rewards[i])
                    };
                }
            }

            if (!$rewardsDisplay) {
                $rewardsDisplay = $('<div class="scriptRewardsDisplay"></div>')
                $contestPanel.append($rewardsDisplay)
            }
            $rewardsDisplay.html('')

            $rewardsDisplay.append(`<h3>${label('total_rewards').replace('{{contests}}', $(".contest .contest_header.ended").length)}</h3>`);
            for (const reward in rewardList) {
                let rewardDiv=rewardList[reward].div;
                try{rewardDiv.getElementsByTagName("p")[0].remove()}catch(e){}
                rewardDiv.innerHTML+=`<p>${(!rewardDiv.className.includes("slot"))?'X':''}${nRounding(rewardList[reward].amount,1,-1)}</p>`;
                rewardDiv.className+=" reward_sum";
                if(!rewardDiv.className.includes("slot")){
                    rewardDiv.children[1].setAttribute("shards",`${nRounding(rewardList[reward].amount,1,-1)}`);
                }
                $rewardsDisplay.append(rewardList[reward].div);
            }
            $rewardsDisplay.append(`<br><br>${label('contests_warning')}`);
        }

        displayRewardSums();

        const observer = new MutationObserver(function(mutations) {
            for(const mutation of mutations) {
                if (mutation.type === 'childList') {
                    displayRewardSums();
                }
            }
        });

        observer.observe($('.left_part .scroll_area')[0],{attributes: false, childList: true, subtree: false});

        sheet.insertRule(`
                .slot.reward_sum {
                    margin-right: 5px;
                    border: 2px solid #fff;
                }
            `)

        sheet.insertRule(`
                .slot.reward_sum img {
                    display: inline;
                    width: 60%;
                    height: 60%!important;
                    margin: 0px!important;
                }
            `)

        sheet.insertRule(`
                .shards_girl_ico.reward_sum {
                    position: relative;
                    float: none;
                    width: 40px;
                    height: 40px;
                    margin-right: 5px;
                }
            `)

        sheet.insertRule(`
                .shards_girl_ico.reward_sum img {
                    width: 100%;
                    height: 100%!important;
                    margin: 0px!important;
                }
            `)

        sheet.insertRule(`
                .shards_girl_ico.reward_sum .shards {
                    display: -webkit-box;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-flex-direction: row;
                    -moz-flex-direction: row;
                    -ms-flex-direction: row;
                    flex-direction: row;
                    -webkit-flex-wrap: wrap;
                    -moz-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    -webkit-justify-content: unset;
                    -moz-justify-content: unset;
                    -ms-justify-content: unset;
                    justify-content: unset;
                    -ms-flex-pack: unset;
                    -webkit-align-content: unset;
                    -moz-align-content: unset;
                    -ms-align-content: unset;
                    align-content: unset;
                    -webkit-align-items: center;
                    -moz-align-items: center;
                    -ms-align-items: center;
                    align-items: center;
                    -webkit-align-self: unset;
                    -moz-align-self: unset;
                    -ms-align-self: unset;
                    align-self: unset;
                    width: 100%;
                    height: 20px;
                    margin: -36px 0 0;
                }
            `)

        sheet.insertRule(`
                .shards_girl_ico.reward_sum span.shard {
                    top: 45px;
                    left: 5px;
                    width: 20px;
                    height: 20px;
                }
            `)

        sheet.insertRule(`
                .shards_girl_ico.reward_sum p {
                    position: absolute;
                    padding-left: 20px;
                    color: #80058b;
                    text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff;
                    top: -18px;
                    font-size: 8px;
                    line-height: 2;
                    margin: 40px 0 0 -4px;
                }
            `)
    }
}

//CSS
if ($('#BoosterTimer').length == 1) {
    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.promo_profile_discount_text {'
                     + 'margin-left: 88px !important; '
                     + 'margin-top: -64px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.promo_profile_discount_text {'
                     + 'position : absolute !important;'
                     + 'top: -3px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.promo_quest_discount_text {'
                     + 'margin-left: 22px !important; '
                     + 'margin-top: -64px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.promo_quest_discount_text {'
                     + 'position : absolute !important;'
                     + 'top: -3px !important;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.promo_fight_discount_text {'
                     + 'margin-left: 22px !important; '
                     + 'margin-top: -64px !important;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.promo_fight_discount_text {'
                     + 'position : absolute !important;'
                     + 'top: -3px !important;}}'
                    );
}

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '#canvas_fight_energy .energy_counter_bar .energy_counter_icon .hudBattlePts_mix_icn {'
                 + 'left: 14px;}}'
                );

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '#tower_of_fame {'
                 + 'background: #222;}}'
                );

sheet.insertRule('@media only screen and (min-width: 1026px) {'
                 + 'body > div > header > .currency {'
                 + 'width: 192px !important;}}'
                );

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '.rotate_device {'
                 + 'display: none !important;}}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(1) {'
                 + 'width: 13% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table tbody tr td:nth-child(1) {'
                 + 'width: 9% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(2) {'
                 + 'width: 0% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(3) {'
                 + 'width: 29% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table tbody tr td:nth-child(3) {'
                 + 'width: 31% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(4), .club_dashboard .members_requests_tables table tbody tr td:nth-child(4) {'
                 + 'width: 15% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(5), .club_dashboard .members_requests_tables table tbody tr td:nth-child(5) {'
                 + 'width: 16% !important;}'
                );

sheet.insertRule('.club_dashboard .members_requests_tables table thead th:nth-child(6), .club_dashboard .members_requests_tables table tbody tr td:nth-child(6) {'
                 + 'width: 21% !important;}'
                );

sheet.insertRule('#hh_comix #harem_left .girls_list.grid_view div[girl] .right .salary .loading .over.count {'
                 + 'font-weight: bold;}'
                 );

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '.redirect.comix {'
                 + 'position: absolute; '
                 + 'top : 50px; '
                 + 'margin-left: 0px !important;}}'
                 );

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '.rewards_list .slot_victory_points p, .rewards_list .slot_season_xp_girl p:nth-child(3), .rewards_list .slot_season_affection_girl p:nth-child(3) {'
                 + 'font-size: 13px !important;}}'
                 );


//CSS rule to not display the collect money animation
function moduleCollectMoneyAnimation() {
    sheet.insertRule('.collect_img {'
                     + 'display: none !important;}'
                    );
}


//CSS rules to improve the display of the missions
function moduleMissionsBackground() {
    sheet.insertRule('#missions .missions_wrap .mission_object.mission_entry.common {'
                     + 'background: #ffffff20;}'
                    );

    sheet.insertRule('#missions .missions_wrap .mission_object.mission_entry.rare {'
                     + 'background: #32bc4f30;}'
                    );

    sheet.insertRule('#missions .missions_wrap .mission_object.mission_entry.epic {'
                     + 'background: #ffb24440;}'
                    );

    sheet.insertRule('#missions .missions_wrap .mission_object.mission_entry.legendary {'
                     + 'background: #6ebeff40;}'
                    );
}

// Show final values when skipping battle
function moduleBattleEndstate() {
    if(CurrentPage.includes("battle")) {
        $(document).ajaxComplete(function(evt, xhr, opt) {
            if(~opt.data.search(/action=do_(league|season|troll|pantheon)_battles/i)) {
                if(!xhr.responseText.length)
                    return;
                const respBattleData = JSON.parse(xhr.responseText);
                if(!respBattleData || !respBattleData.success)
                    return;

                //We already spent some combativity, let's show this to the player:
                if(CurrentPage.includes("troll-battle") && ~location.search.search(/number_of_battles=\d+/i)) {
                    const nBattlesCount = parseInt(location.search.match(/number_of_battles=(\d+)/i)[1], 10);
                    if($.isNumeric(nBattlesCount))
                        Hero.update("energy_fight", -1 * nBattlesCount, true);
                }

                const arrRounds = respBattleData.rounds;

                const nPlayerInitialEgo = $('.new-battle-player .new-battle-hero-ego-value').data("initialEgo");
                const nOpponentInitialEgo = $('.new-battle-opponent .new-battle-hero-ego-value').data("initialEgo");
                let nPlayerFinalEgo = 0;
                let nOpponentFinalEgo = 0;

                const nRoundsLen = arrRounds.length;
                if(nRoundsLen >= 2) {
                    var arrLastRounds = [arrRounds[nRoundsLen - 2], arrRounds[nRoundsLen - 1]];
                    if(!arrLastRounds[1].opponent_hit) {
                        nPlayerFinalEgo = arrLastRounds[0].opponent_hit.defender.remaining_ego;
                        nOpponentFinalEgo = arrLastRounds[1].hero_hit.defender.remaining_ego;
                    }
                    else if(!arrLastRounds[1].hero_hit) {
                        nPlayerFinalEgo = arrLastRounds[1].opponent_hit.defender.remaining_ego;
                        nOpponentFinalEgo = arrLastRounds[0].hero_hit.defender.remaining_ego;
                    }
                    else {
                        nPlayerFinalEgo = arrRounds[nRoundsLen - 1].opponent_hit.defender.remaining_ego;
                        nOpponentFinalEgo = arrRounds[nRoundsLen - 1].hero_hit.defender.remaining_ego;
                    }
                }
                else {
                    if(nRoundsLen == 1) {
                        if(!arrRounds[0].opponent_hit) {
                            nPlayerFinalEgo = nPlayerInitialEgo;
                            nOpponentFinalEgo = arrRounds[0].hero_hit.defender.remaining_ego;
                        }
                        else if(!arrRounds[0].hero_hit) {
                            nPlayerFinalEgo = arrRounds[0].opponent_hit.defender.remaining_ego;
                            nOpponentFinalEgo = nOpponentInitialEgo;
                        }
                        else {
                            nPlayerFinalEgo = arrRounds[0].opponent_hit.defender.remaining_ego;
                            nOpponentFinalEgo = arrRounds[0].hero_hit.defender.remaining_ego;
                        }
                    }
                    else {
                        throw new Error("incorrect amount of rounds");
                    }
                }

                $('#new-battle-skip-btn').on("click", function() {
                    const $playerBar = $('.new-battle-player .new-battle-hero-ego-initial-bar');
                    const $playerDamageBar = $('.new-battle-player .new-battle-hero-ego-damage-bar');
                    const $opponentBar = $('.new-battle-opponent .new-battle-hero-ego-initial-bar');
                    const $opponentDamageBar = $('.new-battle-opponent .new-battle-hero-ego-damage-bar');

                    const $playerEgo = $('.new-battle-player .new-battle-hero-ego-value');
                    const $opponentEgo = $('.new-battle-opponent .new-battle-hero-ego-value');
                    const $playerDamageDone = $('.new-battle-opponent .new-battle-hero-damage-taken-text');
                    const $opponentDamageDone = $('.new-battle-player .new-battle-hero-damage-taken-text');
                    const $criticalDamageIndicator = $('.new-battle-hero-container .new-battle-hero-critical-text');

                    $playerDamageDone.css("opacity", "0");
                    $opponentDamageDone.css("opacity", "0");
                    $criticalDamageIndicator.css("opacity", "0");

                    const strPlayerCurEgo = $playerEgo.text().split(GT.ego)[1].replace(/[, ]/g, "");
                    let nPlayerCurEgo = nPlayerInitialEgo;
                    if($.isNumeric(strPlayerCurEgo))
                        nPlayerCurEgo = parseInt(strPlayerCurEgo);
                    const strOpponentCurEgo = $opponentEgo.text().split(GT.ego)[1].replace(/[, ]/g, "");
                    let nOpponentCurEgo = nOpponentInitialEgo;
                    if($.isNumeric(strOpponentCurEgo))
                        nOpponentCurEgo = parseInt(strOpponentCurEgo);

                    const nPlayerCompleteAtk = nOpponentCurEgo - nOpponentFinalEgo;
                    const nOpponentCompleteAtk = nPlayerCurEgo - nPlayerFinalEgo;
                    $playerDamageDone.text(nPlayerCompleteAtk.toString());
                    $opponentDamageDone.text(nOpponentCompleteAtk.toString());

                    const fPlayerEgoBarWidth = nPlayerFinalEgo <= 0 ? 0 : nPlayerFinalEgo / nPlayerInitialEgo * 100.0;
                    const fOpponentEgoBarWidth = nOpponentFinalEgo <= 0 ? 0 : nOpponentFinalEgo / nOpponentInitialEgo * 100.0;

                    const arrPlayerAnimationSequence = [
                        { e: $playerBar, p: { width: fPlayerEgoBarWidth.toFixed(2) + "%" }, o: { duration: 200 } },
                        { e: $playerDamageBar, p: { width: fPlayerEgoBarWidth.toFixed(2) + "%" }, o: { duration: 200 } },
                        { e: $playerDamageDone, p: { opacity: [0, 1], translateY: -20, translateZ: 0 }, o: {
                            duration: 300,
                            sequenceQueue: false,
                            complete: function(elm) {
                                    $playerEgo.text(GT.ego + " " + nPlayerFinalEgo.toString());
                                    $(elm).velocity({ translateY: 0 }, 0)
                                }
                            }
                        }
                    ];
                    const arrOpponentAnimationSequence = [
                        { e: $opponentBar, p: { width: fOpponentEgoBarWidth.toFixed(2) + "%" }, o: { duration: 200 } },
                        { e: $opponentDamageBar, p: { width: fOpponentEgoBarWidth.toFixed(2) + "%" }, o: { duration: 200 } },
                        { e: $opponentDamageDone, p: { opacity: [0, 1], translateY: -20, translateZ: 0 }, o: {
                            duration: 300,
                            sequenceQueue: false,
                            complete: function(elm) {
                                    $opponentEgo.text(GT.ego + " " + nOpponentFinalEgo.toString());
                                    $(elm).velocity({ translateY: 0 }, 0)
                                }
                            }
                        }
                    ];

                    $('.velocity-animating').velocity("stop", true);
                    newBattles.setRounds([]);
                    $.Velocity.RunSequence(arrPlayerAnimationSequence);
                    $.Velocity.RunSequence(arrOpponentAnimationSequence);
                });
                $('#new-battle-skip-btn').show()
            }
        });
    }
}

function moduleGemStock() {
    const elements = Object.keys(ELEMENTS_ICON_NAMES)

    const displayGemStock = () => {
        const $gemStock = $('<div class="gemStock"></div>')
        const stockTable = `
            <table class="gemStockTable">
                <tbody>
                    ${elements.map(element => `
                        <tr>
                            <td><img src="${IMAGES_URL}/pictures/design/gems/${element}.png"></td>
                            <td>${nThousand(+player_gems_amount[element].amount)}</td>
                        </tr>
                    `).join('')}
                </tody>
            </table>
        `.replace(/(\n| {4})/g, '')
        $gemStock.attr('hh_title', stockTable)
        $('#contains_all').append($gemStock)
    }

    const injectCSS = () => {
        const randomElement = elements[Math.floor(Math.random() * elements.length)]
        sheet.insertRule(`
            .gemStock {
                display: block;
                position: absolute;
                background-image: url(${IMAGES_URL}/pictures/design/gems/${randomElement}.png);
                background-size: contain;
                height: 30px;
                width: 30px;
                z-index: 30;
            }
        `)

        if (CurrentPage.includes('shop')) {
            sheet.insertRule(`
                .gemStock {
                    top: 54px;
                    right: 58px;
                }
            `)
        }
        if (CurrentPage.includes('harem')) {
            sheet.insertRule(`
                .gemStock {
                    top: 72px;
                    right: 200px;
                }
            `)
        }


        sheet.insertRule(`
            .gemStockTable img {
                height: 25px;
                width: 25px;
            }
        `)
    }

    if (CurrentPage.includes('shop') || CurrentPage.includes('harem')) {
        injectCSS()
        displayGemStock()
    }
}
