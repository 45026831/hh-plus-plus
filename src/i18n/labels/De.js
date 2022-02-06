export const common = {
    all: 'Alle',
}

export const config = {
    refresh: 'Homepage aktualisieren',
    villain: 'Widersacher-Menü',
    villain_tiers: 'Stufen mit Girls anzeigen', // TODO GH
    xpMoney : 'Migliora XP / soldi',
    market: 'Marktplatz-Informationen',
    marketGirlsFilter: 'Mädchenfilter auf dem Markt', // TODO GH
    marketEquipsFilter: false, // TODO
    marketXPAff: 'XP und Zuneigung auf dem Markt',
    marketHideSellButton: false, // TODO
    harem: 'Harem-Informationen',
    league: 'Liga-Informationen',
    league_board: 'Die Liga-Spitzen anzeigen',
    league_promo: 'Werbeinformationen anzeigen',
    simFight: 'Liga/Saison/Widersacher-Simulation',
    simFight_logging: 'Detaillierte Protokollierung in der Browserkonsole',
    simFight_highPrecisionMode: false, // TODO
    teamsFilter: 'Mannschaften filtern',
    champions: 'Champion-Informationen',
    homeScreen: false, // TODO
    resourceBars: false, // TODO
    popSort: false, // TODO
    seasonStats: false, // TODO
    pachinkoNames: 'Namen in Pachinko anzeigen',
    contestSummary: 'Zusammenfassung der gespeicherten Wettbewerbsprämien',
    battleEndstate: 'Endgültige Werte beim Überspringen des Kampfes anzeigen',
    gemStock: false, // TODO
    staticBackground: false, // TODO
    rewardShards: false, // TODO
    leaderboardFix: false, // TODO
}
export const stConfig = {
    missionsBackground: 'Missionshintergrund ändern',
    collectMoneyAnimation: 'Deaktivieren Sie die Animation "Geld sammeln"',
    mobileBattle: false, // TODO
    darkMobileLeague: false, // TODO
    hideRotateDevice: false, // TODO
    salaryTimers: false, // TODO
}

export const villain = {
    darklord: 'Dunkler Lord',
    ninjaspy: 'Ninja Spion',
    jacksoncrew: 'Jacksons Crew',
    pandorawitch: 'Pandora Hexe',
    werebunnypolice: 'Wer-Kaninchen Polizei',
    fallback: false, // TODO
}

export const market = {
    pointsUnbought: 'Benötigte Statuspunkte bis Maximum',
    moneyUnspent: 'Nötiges Geld bis Maximum',
    moneySpent: 'Bisher ausgegeben',
    pointsLevel: 'Statuspunkte durch Heldenlevel',
    pointsBought: 'Gekaufte Statuspunkte',
    pointsEquip: 'Statuspunkte durch Ausrüstung',
    pointsBooster: 'Statuspunkte durch Booster',
    pointsClub: 'Statuspunkte durch Club-Boni',
    boosterItem: 'Booster',
    xpItem: 'Bücher',
    xpCurrency: 'XP',
    affItem: 'Geschenke',
    affCurrency: 'Zuneigung',
    equips: 'Ausrüstungen',
    youOwn: 'Du besitzt <b>{{count}}</b> {{type}}.',
    youCanSell: 'Du kannst alles verkaufen für <b>{{cost}}</b> <span class="hudSC_mix_icn"></span>.',
    youCanGive: 'Du kannst ingesamt <b>{{value}}</b> {{currency}} vergeben.',
}

export const marketGirlsFilter = {
    searchedName: 'Name',
    girlName: 'Name',
    searchedClass: 'Klasse',
    searchedRarity: 'Seltenheit',
    levelRange: 'Level',
    searchedAffCategory: 'Maximale Zuneigung',
    searchedAffLevel: 'Aktuelle Zuneigung',
    grade0: '0 Sterne',
    grade1: '1 Stern',
    grade2: '2 Sterne',
    grade3: '3 Sterne',
    grade4: '4 Sterne',
    grade5: '5 Sterne',
    grade6: '6 Sterne',
    team: 'Team',
    visitTeams: 'Besuche zuerst die <a href="../teams.html">Teams</a>.',
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
    wikiPage: '{{name}}-Wikiseite',
    haremLevel: 'Harem-Level',
    unlockedScenes: false, // TODO
    income: 'Einkommen',
    or: '{{left}} oder {{right}}',
    toUpgrade: false, // TODO
    toLevelCap: false, // TODO
    toLevelMax: false, // TODO
    affectionScenes: false, // TODO
    buyable: false, // TODO
    sellable: false, // TODO
    gifts: 'Geschenke',
    books: 'Bücher',
    canBeSold: false, // TODO
    canBeBought: '{{item}} für {{amount}}',
    marketRestock: false, // TODO
}

export const league = {
    stayInTop: 'Um <em><u>in den Top {{top}} zu bleiben</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
    notInTop: 'Um <em><u>in die Top 4 zu kommen</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
    challengesRegen: 'Regeneration: <em>{{challenges}}</em>',
    challengesLeft: 'Verbleibende Kämpfe: <em>{{challenges}}</em>',
    averageScore: 'Durchschnitt pro Kampf: <em>{{average}}</em>',
    scoreExpected: 'Erwartetes Ergebnis: <em>{{score}}</em>',
    toDemote: 'Um <em><u>abzusteigen</u></em>, musst du von <em>{{players}}</em> Spielern überholt werden',
    willDemote: 'Um <em><u>abzusteigen</u></em>, darfst du maximal <em>{{points}}</em> Punkte haben',
    willDemoteZero: 'Um <em><u>abzusteigen</u></em>, musst du bei <em>0</em> Punkten bleiben',
    toNotDemote: 'Um <em><u>nicht abzusteigen</u></em>, musst du mehr als <em>0</em> Punkte',
    toStay: 'Um <em><u>nicht aufzusteigen</u></em>, musst du von <em>{{players}}</em> Spielern überholt werden',
    willStay: 'Um <em><u>nicht aufzusteigen</u></em>, darfst du maximal <em>{{points}}</em> Punkte haben',
    hideFoughtOpponents: false, // TODO
    showFoughtOpponents: false, // TODO
    currentLeague: 'Aktuelle Liga',
    victories: 'Siege',
    defeats: 'Niederlagen',
    unknown: 'Unbekannt',
    notPlayed: 'Nicht gespielt',
    levelRange: 'Level-Spanne',
    leagueFinished: 'Liga endete am {{date}}',
    opponents: 'Gegner',
    leaguePoints: 'Punkte',
    avg: 'Mittelwert',
}

export const teamsFilter = {
    searchedName: 'Name',
    girlName: 'Name',
    searchedClass: 'Klasse',
    searchedRarity: 'Seltenheit',
    levelRange: 'Level',
    searchedAffCategory: 'Maximale Zuneigung',
    searchedAffLevel: 'Aktuelle Zuneigung',
    grade0: '0 Sterne',
    grade1: '1 Stern',
    grade2: '2 Sterne',
    grade3: '3 Sterne',
    grade4: '4 Sterne',
    grade5: '5 Sterne',
    grade6: '6 Sterne',
    searchedBlessedAttributes: 'Segnungen',
    blessedAttributes: 'Gesegnet',
    nonBlessedAttributes: 'Nicht gesegnet',
}

export const champions = {
    participants: false, // TODO
    clubChampDuration: '{{duration}} seit Rundenbeginn'
}
export const resourceBars = {
    popsIn: false, // TODO
    popsReady: false, // TODO
    readyAt: false, // TODO
    endAt: false, // TODO
    fullAt: false, // TODO
}

export const homeScreen = {
    clubChamp: 'Club-Champion',
    completeIn: false, // TODO
    newMissionsIn: false, // TODO
    missionsReady: false, // TODO
}

export const seasonStats = {
    fights: 'Kämpfe',
    victories: 'Siege',
    defeats: 'Niederlagen',
    mojoWon: 'Gewonnenes Mojo',
    mojoLost: 'Verlorenes Mojo',
    mojoWonAvg: 'Durchschnittlich gewonnenes Mojo',
    mojoLostAvg: 'Durchschnittlich verlorenes Mojo',
    mojoAvg: 'Insgesamt durchschnittliches Mojo',
}

export const pachinkoNames = {
    availableGirls: 'Freie Mädchen: ' // TODO GH
}

export const contestSummary = {
    totalRewards: 'Gesamtzahl der gespeicherten Belohnungen ({{contests}} Wettbewerbe):',
    contestsWarning: 'Wettbewerbe verfallen nach 21 Tagen!'
}
