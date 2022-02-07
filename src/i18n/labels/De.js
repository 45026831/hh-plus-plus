import Helpers from '../../common/Helpers'

export const common = {
    all: 'Alle',
}

export const config = {
    villain: 'Schurken-Menü',
    villain_tiers: `Stufen mit ${Helpers.isGH() ? 'Kerlen' : 'Mädels'} anzeigen`,
    xpMoney : 'Bessere XP / Besseres Geld',
    market: 'Markt-Informationen',
    marketGirlsFilter: `${Helpers.isGH() ? 'Jungs' : 'Mädchen' }filter im Markt`,
    marketEquipsFilter: 'Ausrüstungsfilter im Markt',
    marketXPAff: 'XP und Zuneigung im Markt',
    marketHideSellButton: 'Umschaltbarer Verkaufs-Button im Markt',
    harem: 'Harem-Informationen',
    league: 'Liga-Informationen',
    league_board: 'Die Liga-Spitzen anzeigen',
    league_promo: 'Werbeinformationen anzeigen',
    simFight: 'Liga/Saison/Schurken-Simulation',
    simFight_logging: 'Detaillierte Protokollierung in der Browserkonsole',
    simFight_highPrecisionMode: 'Hochpräzisionsmodus (Warnung: langsam!)',
    teamsFilter: 'Teamfilter',
    champions: 'Champion-Informationen',
    homeScreen: 'Homepage Verknüpfungen & Timer',
    resourceBars: 'Ressourcen-Leisten / Booster Tracking',
    popSort: 'PoP-Sortierung und schnelle Navigation',
    seasonStats: 'Saison-Werte',
    pachinkoNames: 'Namen im Pachinko anzeigen',
    contestSummary: 'Zusammenfassung der gespeicherten Wettbewerbsprämien',
    battleEndstate: 'Endgültige Werte beim Überspringen des Kampfes anzeigen',
    gemStock: 'Juwelen-Vorrat im Markt/Harem',
    staticBackground: 'Verhindere Hintergrundveränderung währden Orgien Tagen',
    rewardShards: `Aktuelle Splitteranzahl für ${Helpers.isGH() ? 'Kerle' : 'Mädchen'} anzeigen`,
    leaderboardFix: 'Fix für Ranglisten von Saison und PoV',
}
export const stConfig = {
    missionsBackground: 'Missionshintergrund ändern',
    collectMoneyAnimation: 'Geldsammel-Animation deaktivieren',
    mobileBattle: 'Fix für den Kampfbildschirm am Handy',
    darkMobileLeague: 'Dunkler Liga-Hintergrund am Handy',
    hideRotateDevice: 'Gerät-drehen-Hinweis am Handy verbergen',
    salaryTimers: `Lesbarer Lohntimer der ${Helpers.isGH() ? 'Jungs' : 'Mädchen'}`,
}

export const villain = {
    darklord: 'Dunkler Lord',
    ninjaspy: 'Ninja Spion',
    jacksoncrew: 'Jacksons Crew',
    pandorawitch: 'Pandora Hexe',
    werebunnypolice: 'Wer-Kaninchen Polizei',
    fallback: 'Welt {{world}} Schurke',
}

export const xpMoney = {
    xp: 'Nächstes: {{xp}} XP',
}

export const market = {
    pointsUnbought: 'Kaufbare Statuspunkte bis Maximum',
    moneyUnspent: 'Nötiges Geld bis Maximum',
    moneySpent: 'Bisher ausgegebens Geld',
    pointsLevel: 'Levelbasierte Statuspunkte',
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
    levelRange: 'Level-Spanne',
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
    aff: 'Nächstes: {{remainNext}}',
}

export const marketHideSellButton = {
    hide: 'Verkaufs-Button verbergen',
}

export const harem = {
    marketRestocked: '> Der <a href="../shop.html">Markt</a> wurde seit deinem letzten Besuch aufgefüllt.',
    visitMarket: '> Besuche zuerst den <a href="../shop.html">Markt</a>, um hier eine Inventarzusammenfassung zu sehen',
    haremStats: 'Haremwerte',
    upgrades: 'Upgrades',
    levelsAwakening: 'Level & Erwachen',
    market: 'Inventar & Markt',
    wikiPage: '{{name}}s Wikiseite',
    haremLevel: 'Harem-Level',
    unlockedScenes: 'Freigeschaltete Szenen',
    income: 'Einkommen',
    or: '{{left}} oder {{right}}',
    toUpgrade: 'Um alle upzugraden',
    toLevelCap: 'Um bis zur Grenze zu leveln',
    toLevelMax: 'Um bis zum Maximum zu leveln ({{max}})',
    affectionScenes: 'Zuneigungsszenen',
    buyable: 'Im Markt zu kaufen',
    sellable: 'Im Inventar',
    gifts: 'Geschenke',
    books: 'Bücher',
    canBeSold: 'Kann für {{sc}} verkauft werden',
    canBeBought: '{{item}} für {{amount}}',
    marketRestock: 'Markt füllt sich um {{time}} oder bei Level {{level}} wieder auf',
}

export const league = {
    stayInTop: 'Um <em><u>in den Top {{top}} zu bleiben</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
    notInTop: 'Um <em><u>in die Top {{top}} zu kommen</u></em>, musst du mindestens <em>{{points}}</em> Punkte haben',
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
    hideFoughtOpponents: 'Bereits bekämpfte Gegner verbergen',
    showFoughtOpponents: 'Bereits bekämpfte Gegner anzeigen',
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
    searchedName: 'Suche',
    girlName: 'Name',
    searchedClass: 'Klasse',
    searchedRarity: 'Seltenheit',
    levelRange: 'Level-Spanne',
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
    blessedAttributes: `Gesegnete ${Helpers.isGH() ? 'Kerle' : 'Mädchen'}`,
    nonBlessedAttributes: `Nicht gesegnete ${Helpers.isGH() ? 'Kerle' : 'Mädchen'}`,
}

export const champions = {
    participants: 'Teilnehmer: {{participants}}/{{members}}',
    clubChampDuration: '{{duration}} seit Rundenbeginn',
}
export const resourceBars = {
    popsIn: 'PoPs in {{time}}',
    popsReady: 'PoPs bereit',
    readyAt: 'Bereit um {{time}}',
    endAt: 'Endet um {{time}}',
    fullAt: 'Voll um {{time}}',
}

export const homeScreen = {
    clubChamp: 'Club-Champion',
    completeIn: 'Beendet in ',
    newMissionsIn: 'Neue Missionen in ',
    missionsReady: 'Missionen bereit in ',
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
    availableGirls: `Verfügbare ${Helpers.isGH() ? 'Kerle' : 'Mädchen'}: `,
}

export const contestSummary = {
    totalRewards: 'Gesamtzahl der gespeicherten Belohnungen ({{contests}} Wettbewerbe):',
    contestsWarning: 'Wettbewerbe verfallen nach 21 Tagen!',
}
