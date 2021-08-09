// ==UserScript==
// @name			Hentai Heroes++ (OCD) Season version
// @description		Adding things here and there in the Hentai Heroes game.
// @version			0.31.10
// @match			https://www.hentaiheroes.com/*
// @match			https://nutaku.haremheroes.com/*
// @match			https://eroges.hentaiheroes.com/*
// @match			https://thrix.hentaiheroes.com/*
// @match			https://www.gayharem.com/*
// @match			https://nutaku.gayharem.com/*
// @match			https://www.comixharem.com/*
// @match			https://nutaku.comixharem.com/*
// @run-at			document-end
// @updateURL		https://raw.githubusercontent.com/45026831/hh-plus-plus/main/hh-plus-plus.js
// @downloadURL		https://raw.githubusercontent.com/45026831/hh-plus-plus/main/hh-plus-plus.js
// @grant			none
// @author			Raphael, 1121, Sluimerstand, shal, Tom208, test_anon
// ==/UserScript==

/*	===========
	 CHANGELOG
	=========== */
// 0.31.10: Fixing DRYed locale number parse to match what the HH UI is doing
// 0.31.9: Fixing DRYed locale number parser for all locales
// 0.31.8: Tidying up locale number parsing for girl stat sum
// 0.31.7: Making a start on replacing unnecessarily external icons with icons already in the game.
// 0.31.6: Fixing harem info details panel hooks disconnecting when sorting.
// 0.31.5: Fixing team filter and market filter on CxH
// 0.31.4: Merge 0.30.2: Fixed minor bugs. Also, fixed locale-specific number-parsing on girl stat sum.
// 0.31.3: Moving all script-added buttons to the new-style button class. Changing all button selectors to use the functional attributes instead of the style class.
// 0.31.2: Fixing typo in opponent selection in league
// 0.31.1: Fixing CSS for market filter button after changing it to new-style
// 0.31.0: Merge Tom-0.30.0: Refactored code of options menu (thanks to BenBrazke). Fixed issues following server-side code change. Fixed minor bugs. Added girl stats sum on tooltip window on change team page.
// 0.30.7: Fixing typo in event tab parsing for fight-a-villain
// 0.30.6: Merge 0.29.6: Fixed minor bug. Added an option in the script menu to enable/disable old PoA event window.
// 0.30.5: Merge 0.29.5: Fixed minor issues. Plus making old PoA screen override configurable.
// 0.30.4: Merge 0.29.4: Fixed minor bug in league info on mobile devices.
// 0.30.3: Merge 0.29.3: Fixed minor issues.
// 0.30.2: Merge 0.29.2: Fixed an issue with load and save buttons in the fight team filter. Added affection filter to the fight team filter.
// 0.30.1: Reinstating market and team filters after formal approval from Kinkoid. Merging in minor fixes from old script 0.29.1.
// 0.30.0: Removing market and teams filters to bring script back in line with HH Terms of Use after official ruling from Kinkoid.
// 0.29.0: New battle system.
// 0.28.8: Removed support of test server for this script. A dedicated script for this test server is online. Fixed minor display issues.
// 0.28.7: Fixed event trolls display following server-side code change.
// 0.28.6: Fixed minor bug.
// 0.28.5: Fixed villain tier girls display following server-side code change.
// 0.28.4: Minor improvements.
// 0.28.3: Minor improvements. Added class girls in Places of Power selection list.
// 0.28.2: Removed fix about the check marks in to the champions after Kinkoid's fix. Added a shortcut to Club Champion.
// 0.28.1: Improved display feature into the champions.
// 0.28.0: Improved display feature into the champions.
// 0.27.9: Fixed minor display issues.
// 0.27.8: Fixed minor bugs.
// 0.27.7: Added support to Comix Harem for Nutaku platform.
// 0.27.6: Taken into account the next Hentai Heroes update.
// 0.27.5: Fixed the access to event data following server-side code change on test server.
// 0.27.4: Improved support to Comix Harem.
// 0.27.3: Added Comix Harem's support with this script. Changed the display of the check mark into the champions.
// 0.27.2: Fixed minor bug.
// 0.27.1: Fixed display bug from Kinkoid about the check mark into the champions.
// 0.27.0: Fixed minor bugs.
// 0.26.9: Fixed a bug in ID opponents in tower of fame. Added opponents' class display in middle panel.
// 0.26.8: Fixed minor bugs.
// 0.26.7: Fixed minor bug.
// 0.26.6: Improved shards display.
// 0.26.5: Fixed minor shards display issue.
// 0.26.4: Fixed minor display issues.
// 0.26.3: Fixed minor bugs.
// 0.26.2: Fixed display bug with promo discount.
// 0.26.1: Fixed minor bugs.
// 0.26.0: Fixed minor bugs.
// 0.25.9: Support for new world 15 villain Sake and her tier 1 girls.
// 0.25.8: Fixed minor bugs.
// 0.25.7: Fixed minor bugs.
// 0.25.6: Fixed minor bugs.
// 0.25.5: Added a button at the market to hide/display the "Sell" button
// 0.25.4: Fixed minor bugs.
// 0.25.3: Fixed minor bugs.
// 0.25.2: Fixed minor bugs. Minor improvements.
// 0.25.1: Fixed minor bugs.
// 0.25.0: Added a button at the market to sort the equipment items by rarity (from legendary to common).
// 0.24.9: Fixed minor bugs.
// 0.24.8: Minor improvements.
// 0.24.7: Minor improvements.
// 0.24.6: Fixed minor bugs. DST time for league stats. Added a button to hide/display players already beaten in league.
// 0.24.5: Minor improvements.
// 0.24.4: Fixed minor bugs.
// 0.24.3: Minor improvements.
// 0.24.2: Added shards display to girls' tooltip for trolls and pachinko.
// 0.24.1: Fixed minor bugs.
// 0.24.0: Minor improvements.
// 0.23.9: Minor improvements.
// 0.23.8: Minor improvements. Fixed minor bugs.
// 0.23.7: Change the display on mobile of the links for the next/previous place of power.
// 0.23.6: Added an option to enable or disable the collect money animation in the harem. Added shortcuts to go directly to the next/previous place of power.
// 0.23.5: Fixed minor bugs.
// 0.23.4: Fixed minor bugs.
// 0.23.3: Fixed minor bugs.
// 0.23.2: Minor improvements. Fixed minor bugs.
// 0.23.1: Fixed minor bugs.
// 0.23.0: During events, the villains in villains menu have the same color as the event girl's rarity.
// 0.22.9: Minor improvements.
// 0.22.9: Minor improvements.
// 0.22.7: Fixed minor bugs.
// 0.22.6: Minor improvements.
// 0.22.5: Fixed minor bugs on mobile device.
// 0.22.4: Minor improvements.
// 0.22.3: Minor improvements.
// 0.22.2: Fixed minor bugs.
// 0.22.1: Minor improvements.
// 0.22.0: Minor improvements.
// 0.21.9: Minor improvements. Fixed minor bugs.
// 0.21.8: Fixed girls' filter at the market on Android device.
// 0.21.7: Minor improvements.
// 0.21.6: Added affection in the filter at the market.
// 0.21.5: Added the update of the shards number for girls on Great Pachinko.
// 0.21.4: Minor improvements.
// 0.21.3: Fixed minor bugs.
// 0.21.2: Fixed minor bugs. Changed display for PoP timer : display the lowest timer even if a PoP is not started but in that case, the timer is in orange.
// 0.21.1: Minor improvements.
// 0.21.0: Minor improvements.
// 0.20.9: Added shards display for club champion. Display button to access to club champion's positions during cooldown.
// 0.20.8: Fixed a bug in champions statistics.
// 0.20.7: Fixed minor bugs.
// 0.20.6: Minor improvements. Fixed minor bugs.
// 0.20.5: Minor improvements.
// 0.20.4: Added a girls' filter at the market (credit: test_anon)
// 0.20.3: Fixed a bug in market gifts for mythic girls.
// 0.20.2: Added the management of the club champion. Displayed the mythic event villain. Fixed fight simulation against Charm class.
// 0.20.1: Improved fight simulation against Charm class.
// 0.20.0: Minor improvements.
// 0.19.9: Integrated an estimation of the Charm skill bug in the fight simulation. Added teams filter feature (credit: randomfapper34).
// 0.19.8: Minor improvements.
// 0.19.7: Added simulation on battle page.
// 0.19.6: Minor improvements. Fixed minor bugs.
// 0.19.5: Fixed a minor bug in battle league points when no damage was done by one of the fighters. Fixed a bug in Gay Harem for Season stats.
// 0.19.4: Fixed a bug in fight simulation. Added an option to disable CSS background for missions. Improved the display of XP and affection in the market.
// 0.19.3: Added CSS background for missions.
// 0.19.2: Fixed bugs after Kinkoid's update.
// 0.19.1: Improved the display of XP and affection in the market.
// 0.19.0: Fixed minor bugs. Minor improvements.
// 0.18.9: Fixed minor bugs. Minor improvements.
// 0.18.8: Minor improvements.
// 0.18.7: Minor improvements.
// 0.18.6: Fixed bugs in the display of the timers after Kinkoid's update. Removed the Charm skill bug from the fight simulation.
// 0.18.5: Minor improvements.
// 0.18.4: Added the display of the shards number for girls on villains.
// 0.18.3: Fixed minor bugs.
// 0.18.2: Minor improvements. Fixed minor bugs.
// 0.18.2: Minor improvements.
// 0.18.1: Minor improvements.
// 0.18.0: Fixed minor bugs. Minor improvements.
// 0.17.9: Minor improvements.
// 0.17.8: Fixed minor bugs. Changed timer of places of power in prevision of the next places to come.
// 0.17.7: Fixed minor bugs.
// 0.17.6: Fixed minor bugs. Minor improvements. Added score points in league simulation.
// 0.17.5: Fixed minor bugs. Refactored fight simulation code (thanks to test_anon) and taken into account the Charm skill bug.
// 0.17.4: Added stats for season fights.
// 0.17.3: Fixed minor bugs.
// 0.17.2: Fixed minor bugs. Minor improvements.
// 0.17.1: Fixed minor bugs.
// 0.17.0: Fixed minor bugs.
// 0.16.9: Minor improvements. Fixed a bug in the display of XP in the market.
// 0.16.8: Fixed minor bugs. Fixed a bug in the display of XP in the market when XP girl was at Max.
// 0.16.7: Fixed minor bugs.
// 0.16.6: Fixed minor bugs.
// 0.16.5: Fixed minor bugs.
// 0.16.4: Fixed other Kinkoid's bugged timers.
// 0.16.3: Fixed a bug in the display of the expected score in League Information
// 0.16.2: Fixed a bug in the display of Affection in the market when gifts are given too quickly
// 0.16.1: Fixed minor bugs.
// 0.16.0: Fixed minor bugs. Fixed a bug in the display of XP in the market when books are given. Fixed other Kinkoid's bugged timers.
// 0.15.9: Fixed Kinkoid's bugs about timers on Champions map and in troll fights bar.
// 0.15.8: Fixed a bug in "league info" display on small screens. Fixed minor bugs.
// 0.15.7: Fixed minor bugs. Fixed a bug in the display of the remaining XP and affection in the market.
// 0.15.6: Fixed minor bugs.
// 0.15.5: Fixed a bug in league results display.
// 0.15.4: Added the display of Epic pachinko available girls names + the link to the wiki website (thanks to Shinya).
// 0.15.3: Fixed a minor bug in champions timer.
// 0.15.2: Added the display of Event and Mythic pachinko available girls' names + the link to the wiki website (thanks to Shinya).
// 0.15.1: Added mythic rarity in list of Harem girls in Harem info. Fixed a bug and improved the display of XP and affection in the market (thanks to test_anon).
// 0.15.0: Fixed minor bugs. Added mythic girl XP and affection in Harem info. Improved the display of XP and affection in the market.
// 0.14.9: Fixed a bug on champions timer.
// 0.14.8: Improved champions timer.
// 0.14.7: Fixed minor bugs. Added a timer for Champions on home page as soon as it exists a timer less than 15 minutes on any champion. Added a row at the bottom of the season leaderboard to display the current rank of top 200 player.
// 0.14.6: Fixed minor bugs. The link to the current quest in energy quest bar leads to the Champions reception desk when the adventure is over.
// 0.14.5: Fixed a bug about number of victories/defeats for current league and the previous one. Added a new module to show in the market the remaining XP and affection of the girl to her next level/star instead of her total XP and affection.
// 0.14.4: Fixed minor bugs. Added an option to display some tops in the league info.
// 0.14.3: Added the average score per fight in league information and the expected score at the end of the league with this average in tooltip. Fixed minor bugs.
// 0.14.2: Replaced "’" by "-" in Harem links to Wiki FR.
// 0.14.1: Fixed minor bugs.
// 0.14.0: Fixed minor bugs. Added display of "league info" tooltips on small screens. Added number of victories/defeats for current league and the previous one in a "league info" tooltip.
// 0.13.9: Fixed minor bugs.
// 0.13.8: Fixed a display bug in league info tooltip
// 0.13.7: Added on energy bar a shortcut to current quest. Added display of league info on small screens.
// 0.13.6: Minor changes for display.
// 0.13.5: Changed color when timer bar is full.
// 0.13.4: Added support for test server
// 0.13.3: Fixed timers and villains shortcut after server-side code changes 2020/11/25
// 0.13.2: Minor fixes.
// 0.13.1: Added a timer for boosters. Merged the "Fight villains" bar with "Energy fight" bar. Changed position of the timers.
// 0.13.0: Added a timer and a shortcut for Places of power. Added a popup with full time remaining on Season and League timer.
// 0.12.9: Fixed some translations. Support for Pandara's witch tier 2 and 3 girls. Added a fill bar for every timer. Fixed market timer with module market disabled.
// 0.12.8: Fixed the timer for the Season. Improved the display of the timers for Pachinko and market.
// 0.12.7: Added shortcuts for league. Changed the display for the Season shortcut. Added a timer for market, pachinko, season fights and league fights.
// 0.12.6: Added a separate option for the Season link.
// 0.12.5: Minor changes for display.
// 0.12.4: Added a link to Season opponents.
// 0.12.3: Added module for the new feature "Season of the Rose". Added support of the module "League sim" on small screens (smartphones, tablets, ...). Improve display for small screens.
// 0.12.2: Added support for German language. Cleaned up some old unused text strings in all languages.
// 0.12.1: Fixed recognition of villain event girl presence (again) after server-side code changes 2020/08/19.
// 0.12.0: Support for new world 14 villain Nike and her tier 1 girls.
// 0.11.9: Changed exponentiation operator from ** to Math.pow() after reports of it breaking on (very) old browsers.
// 0.11.8: Added support for Italian language (translation courtesy of Godius). Options menu now available in French (Tom208) and Spanish (Marcezeq), completing these localizations.
// 0.11.7: Minor changes to rounding logic for money and battle excitement displays.
// 0.11.6: Fixed an issue with non-promotion points targets in league information when league brackets have 115+ players.
// 0.11.5: Support for Karole tier 2 / 3 and Jackson's Crew tier 3 girls.
// 0.11.4: Cleaned up and improved calculations for demotion and non-promotion points targets in league information. (Additional es/fr info texts contributed by Marcezeq and Tom208.)
// 0.11.3: Fixed some number display issues in harem and league information when the game is played in languages other than English. (With thanks to Tom208.)
// 0.11.2: Support for Finalmecia and Roko Senseï tier 3 girls.
// 0.11.1: Replaced image links on imgur with Postimage after files were removed. Minor changes to affection tooltip display in harem.
// 0.11.0: Re-added support for automatic script updating.
// 0.10.9: Fixed recognition of villain event girl presence after server-side code changes 2020/05/14.
// 0.10.8: Extended villain menu to show which tiers still have world girls to get; can be toggled in options menu. (Note: Will require script update when new tier girls are released.)
// 0.10.7: Fixed market stats cost formulas; cost is now 7 rather than 5 for first stat purchase, 1999 increases from first to second price level rather than 2000.
// 0.10.6: Tweaked league sim to account for recently buffed charm proc, changed how procs are included in the sim, fixed omega girl effects, and generally cleaned up sim code.
// 0.10.5: Moved the market stats tooltip buttons from right to left to account for Kinkoid's new multi-buy button. Tweaked tooltip texts and display.
// 0.10.4: Added name of World 13 villain. Added localized villain names in fr/es language versions. Minor text tweaks in en version.
// 0.10.3: Now supporting girl XP level calculations up to new level 500 cap (with thanks to piturda for the reminder).
// 0.10.2: Incorporated piturda's Market fix (for server-side change 16/10/19) and Champion update. Added display of Club bonuses and Ginseng boosters to Market stats. Lots and lots of code clean-up.
// 0.10.1: Fixed calculation of demotion and non-promotion points >1000 and remaining tokens in League info. Disabled display of highest obtainable League reward. Some League info code clean-up.
// 0.10.0: Updated and expanded stats formula to reflect Patch of 14/08/19. (Contributed by Hare.)
// 0.9.9: Fixed a bug in the Champions information caused by server-side changes to the code. (Last update by Sluimerstand.)
// 0.9.8: Added Champions information (credit: Entwine). Fixed no longer working icons.
// 0.9.7: Fixed League rewards calculating badly when it involves usernames with spaces. Fixed League rewards at 0 challenges left.
// 0.9.6: Changed money abbreviations from K,M,G,T to K,M,B,T. Player values in Leagues are now exact. Sim result is orange if it's a close call.
// 0.9.5: Fixed an issue for the Villain menu when the localStorage does not exist yet or anymore.
// 0.9.4: Fixed a rare error in which the script would crash for trying to pull non-existent numbers to add thousand spacing to.
// 0.9.3: Fixed League rewards not properly calculating for point values higher than 999.
// 0.9.2: Added an options menu. Removed modifyScenes. Tweaked sim refresh. Tweaked League info. Tweaked better XP and money. Tweaked harem info.
// 0.9.1: Fixed sims not refreshing anymore because I wanted to wrap up the previous version so I could watch the new Game of Thrones.
// 0.9.0: Expanded on the extra League info. Added some missing translations for Spanish.
// 0.8.9: Fixed player beta/omega stats not calculating properly for girls with spëcìál characters in their names. I'm a professional, I swear.
// 0.8.8: Added Jackson's Crew villain name. Fixed Charm and Know-How defence in sim results. Added extra League info.
// 0.8.7: Fixed Charm proc not occurring in sim results. Fixed Know-How proc not calculating correctly. Added opponent name in the console logs.
// 0.8.6: Fixed wrong class defence stats for beta/omega girls. Fixed new line creation for wide sim results.
// 0.8.5: Fixed wrong class Harmony procs for League sims.
// 0.8.4: More tweaks to League sims.
// 0.8.3: Fixed excitement for League sims (formerly known as match rating formerly known as power levels).
// 0.8.2: Fixed an oopsie I made when calculating worst-case scenario. Console log (F12) is now also available.
// 0.8.1: Fixed League numbers for French and Spanish localisations. Changed League ratings to show a worst-case scenario.
// 0.8.0: Fixed the event villains issue.
// 0.7.9: Properly fixed the button displacement. Match rating is now even more accurate.
// 0.7.8: Fixed the collect all button displacement. Fixed Excitement stat in Leagues. Match rating is now more accurate.
// 0.7.7: Replaced the League power levels with a match rating.
// 0.7.6: Added better XP and better money.
// 0.7.5: Added the @downloadURL, so the script can be updated directly from Tampermonkey.
// 0.7.4: Removed the added mission and arena timers and the extra quest button. Added an auto refresh for the home screen.
// 0.7.3: Cleaned up the code and prepared the file for "public launch." Added power levels to Leagues.
// 0.7.2: Updated the harem info pane to be more pleasing to the eyes.


/* =========
	GENERAL
   ========= */

// Define jQuery
var $ = window.jQuery;

// Define CSS
var sheet = (function() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
})();

var CurrentPage = window.location.pathname;

// Numbers: thousand spacing
function nThousand(x) {
    if (typeof x != 'number') {
        x = 0;
    }
    return x.toLocaleString();
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
        return (Math.ceil(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == 0) {
        return (Math.round(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == -1) {
        return (Math.floor(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
}

const HC = 1;
const CH = 2;
const KH = 3;

const DST = true;


/* ==============
	TRANSLATIONS
   ============== */

var lang = 'en';

if ($('html')[0].lang === 'en') {
    lang = 'en';
}
else if ($('html')[0].lang === 'fr') {
    lang = 'fr';
}
else if ($('html')[0].lang === 'es_ES') {
    lang = 'es';
}
else if ($('html')[0].lang === 'it_IT') {
    lang = 'it';
}
else if ($('html')[0].lang === 'de_DE') {
    lang = 'de';
}

var texts = [];

texts.en = {
    optionsRefresh: 'Home screen refresh',
    optionsVillain: 'Fight a villain menu',
    optionsTiers: 'Show tiers with girls',
    optionsXPMoney : 'Better XP / Money',
    optionsMarket: 'Market information',
    optionsMarketFilter: 'Girls\' filter at the market',
    optionsMarket_XP_Aff: 'XP and affection at the market',
    optionsSortArmorItems: 'Button to sort armor items by rarity',
    optionsHideSellButton: 'Button to hide "Sell" button',
    optionsHarem: 'Harem information',
    optionsLeague: 'League information',
    optionsLeagueBoard: 'Show the league tops',
    optionsSimFight : 'League / Season / Villains sim',
    optionsTeamsFilter: 'Teams filter',
    optionsChampions: 'Champions information',
    optionsLinks: 'Shortcuts/Timers',
    optionsSeasonStats: 'Season stats',
    optionsPachinkoNames: 'Show names in Pachinko',
    //optionsEpicPachinkoNames: 'Show names in Epic Pachinko',
    optionsMissionsBackground: 'Change missions background',
    optionsCollectMoneyAnimation: 'Delete the collect money animation',
    optionsOldPoAWindow: 'Old PoA window',
    and: 'and',
    or: 'or',
    affection: 'affection',
    harem_stats: 'Harem Stats',
    haremettes: 'haremettes',
    hardcore: 'Hardcore',
    charm: 'Charm',
    know_how: 'Know-how',
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
    required_to_unlock: 'Required to upgrade all haremettes',
    required_to_get_max_level: 'Required to level all haremettes',
    my_stocks: 'My stock',
    equipments: 'equipments',
    boosters: 'boosters',
    books: 'books',
    gifts: 'gifts',
    currently_buyable: 'Currently buyable stock',
    visit_the: 'Visit the <a href="../shop.html">Market</a> first.',
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
    demote_up: 'To <u>demote</u> you can have a maximum of ',
    demote_down: 'To <u>demote</u> you must be passed by players with as few as ',
    demote_holdzero: 'To <u>demote</u> you must remain at ',
    stagnate_up: 'To <u>not promote</u> you can have a maximum of ',
    stagnate_down: 'To <u>not promote</u> you must be passed by players with as few as ',
    stagnate_holdzero: 'To <u>not promote</u> you must remain at ',
    top4_up: 'To <u>be in the top 4</u> you must have a minimum of ',
    top4_hold: 'To <u>stay in the top 4</u> you must have a minimum of ',
    top15_up: 'To <u>be in the top 15</u> you must have a minimum of ',
    top15_hold: 'To <u>stay in the top 15</u> you must have a minimum of ',
    top30_up: 'To <u>be in the top 30</u> you must have a minimum of ',
    top30_hold: 'To <u>stay in the top 30</u> you must have a minimum of ',
    points: 'points',
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
    league_ending: 'League ending on ',
    league_finished: 'League finished on ',
    current_league: 'Current league',
    averageScore: 'Average score per fight: ',
    scoreExpected: 'Score expected: ',
    available_girls: 'Available girls: ',
    fights: 'Fights',
    won_mojo: 'Won mojo',
    lost_mojo: 'Lost mojo',
    won_mojo_avg: 'Won mojo average',
    lost_mojo_avg: 'Lost mojo average',
    mojo_avg: 'Global mojo average',
    filter: 'Filter',
    searched_name : 'Searched name',
    girl_name: 'Girl name',
    searched_class: 'Searched class',
    searched_rarity: 'Searched rarity',
    team_number: 'Team number',
    all: 'All',
    team: 'Team',
    save_as: 'Save as',
    load_from: 'Load from',
    level_range: 'Level range',
    searched_aff_category: 'Searched affection category',
    searched_aff_lvl: 'Searched affection <BR>level',
    zero_star: '0 star',
    one_star: '1 star',
    two_stars: '2 stars',
    three_stars: '3 stars',
    four_stars: '4 stars',
    five_stars: '5 stars',
    six_stars: '6 stars',
    time_passed: 'time has passed',
    combativity: 'Combativity',
    energy: 'Energy',
    sort: 'Sort',
    hide: 'Hide',
    display: 'Display',
    searched_blessed_attributes: 'Searched blessed girls',
    blessed_attributes: 'Blessed girls',
    non_blessed_attributes: 'Non-blessed girls'
};

texts.fr = {
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
    optionsSimFight: 'Simu ligue / saison / combats de troll',
    optionsTeamsFilter: 'Filtre d\'équipes',
    optionsChampions: 'Infos champions',
    optionsLinks: 'Raccourcis/Timers',
    optionsSeasonStats: 'Stats de la saison',
    optionsPachinkoNames: 'Montrer les noms au Pachinko',
    //optionsEpicPachinkoNames: 'Montrer noms au PE',
    optionsMissionsBackground: 'Change l\'arrière-plan des missions',
    optionsCollectMoneyAnimation: 'Désactive l\'animation de récolte d\'argent',
    optionsOldPoAWindow: 'Ancienne fenêtre du chemin d\'affection',
    and: 'et',
    or: 'ou',
    affection: 'affection',
    harem_stats: 'Stats du harem',
    haremettes: 'haremettes',
    hardcore: 'Hardcore',
    charm: 'Charme',
    know_how: 'Savoir-faire',
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
    visit_the: 'Visite le <a href="../shop.html">marché</a> first.',
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
    demote_up: 'Pour <u>être rétrogradé</u> vous pouvez avoir un maximum de ',
    demote_down: 'Pour <u>être rétrogradé</u> vous devez être dépassé par les joueurs qui ont ',
    demote_holdzero: 'Pour <u>être rétrogradé</u> vous devez rester avec ',
    stagnate_up: 'Pour <u>ne pas être promu</u> vous pouvez avoir un maximum de ',
    stagnate_down: 'Pour <u>ne pas être promu</u> vous devez être dépassé par les joueurs qui ont ',
    stagnate_holdzero: 'Pour <u>ne pas être promu</u> vous devez rester avec ',
    top4_up: 'Pour <u>être dans le top 4</u> vous devez avoir un minimum de ',
    top4_hold: 'Pour <u>rester dans le top 4</u> vous devez avoir un minimum de ',
    top15_up: 'Pour <u>être dans le top 15</u> vous devez avoir un minimum de ',
    top15_hold: 'Pour <u>rester dans le top 15</u> vous devez avoir un minimum de ',
    top30_up: 'Pour <u>être dans le top 30</u> vous devez avoir un minimum de ',
    top30_hold: 'Pour <u>rester dans le top 30</u> vous devez avoir un minimum de ',
    points: 'points',
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
    time_passed: 'du temps a passé',
    combativity: 'Combativité',
    energy: 'Énergie',
    sort: 'Trier',
    hide: 'Masquer',
    display: 'Afficher',
    searched_blessed_attributes: 'Filles bénies recherchées',
    blessed_attributes: 'Filles bénies',
    non_blessed_attributes: 'Filles non bénies'
};

texts.es = {
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
    optionsSimFight: 'Simulacion de Liga / Temporada / Villano',
    optionsTeamsFilter: 'Filtro de equipos',
    optionsChampions: 'Informacion de Campeones',
    optionsLinks: 'Atajos/Temporizadores',
    optionsSeasonStats: 'Season stats',
    optionsPachinkoNames: 'Mostrar nombres en Pachinko',
    //optionsEpicPachinkoNames: 'Mostrar nombres en Epic Pachinko',
    optionsMissionsBackground: 'Cambiar el fondo de las misiones',
    optionsCollectMoneyAnimation: 'Desactivar la animación de recogida de dinero',
    optionsOldPoAWindow: 'Antigua ventana Camino de atracción',
    and: 'y',
    or: 'o',
    in: 'en',
    affection: 'afecto',
    harem_stats: 'Estatus del Harén',
    haremettes: 'haremettes',
    hardcore: 'Folladas',
    charm: 'Encanto',
    know_how: 'Saber-hacer',
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
    demote_up: 'Para <u>degradar</u> puedes tener un máximo de ',
    demote_down: 'Para <u>degradar</u> debes ser superado por jugadores con tan solo ',
    demote_holdzero: 'Para <u>degradar</u> debes mantenerte en ',
    stagnate_up: 'Para <u>no promocionar</u> puedes tener un máximo de ',
    stagnate_down: 'Para <u>no promocionar</u> debes ser superado por jugadores con tan solo ',
    stagnate_holdzero: 'Para <u>no promocionar</u> debes mantenerte en ',
    top4_up: 'Para <u>estar entre los 4 primeros</u> debes tener un mínimo de  ',
    top4_hold: 'Para <u>quedar entre los 4 primeros</u> debes tener un mínimo de  ',
    top15_up: 'Para <u>estar entre los 15 primeros</u> debes tener un mínimo de  ',
    top15_hold: 'Para <u>quedar entre los 15 primeros</u> debes tener un mínimo de  ',
    top30_up: 'Para <u>estar entre los 30 primeros</u> debes tener un mínimo de  ',
    top30_hold: 'Para <u>quedar entre los 30 primeros</u> debes tener un mínimo de  ',
    points: 'puntos',
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
    time_passed: 'del tiempo ha pasado',
    combativity: 'Combatividad',
    energy: 'Energía',
    sort: 'Ordenar',
    hide: 'Ocultar',
    display: 'Mostrar',
    searched_blessed_attributes: 'Buscar chicas bendecidas',
    blessed_attributes: 'Benditas chicas',
    non_blessed_attributes: 'Chicas no bendecidas'
};

texts.it = {
    optionsRefresh: 'Refresh pagina Home',
    optionsVillain: 'Menù battaglia Troll',
    optionsTiers: 'Mostra battaglie con ragazze',
    optionsXPMoney : 'Migliora XP / soldi',
    optionsMarket: 'Informazioni negozio',
    optionsMarketFilter: 'Filtro per ragazze al mercato',
    optionsMarket_XP_Aff: 'XP e affetto nel mercato',
    optionsSortArmorItems: 'Pulsante per ordinare gli oggetti dell\'armatura per rarità',
    optionsHideSellButton: 'Pulsante per nascondere il pulsante "Vendi"',
    optionsHarem: 'Informazioni Harem',
    optionsLeague: 'Informazioni sulle Leghe',
    optionsLeagueBoard: 'Mostra i top della lega',
    optionsSimFight: 'Simulazione Leghe / Stagione / Troll',
    optionsTeamsFilter: 'Filtro delle squadre',
    optionsChampions: 'Informazioni sui Campioni',
    optionsLinks: 'Scorciatoie/Timer',
    optionsSeasonStats: 'Season stats',
    optionsPachinkoNames: 'Mostra i nomi in Pachinko',
    //optionsEpicPachinkoNames: 'Mostra i nomi in Epic Pachinko',
    optionsMissionsBackground: 'Cambiare lo sfondo delle missioni',
    optionsCollectMoneyAnimation: 'Disattivare l\'animazione di raccolta dei soldi',
    optionsOldPoAWindow: 'Vecchia finestra Sentiero dell\'Attrazione',
    and: 'e',
    or: 'o',
    in: 'in',
    affection: 'affetto',
    harem_stats: 'Stato dell Harem',
    haremettes: 'ragazze dell harem',
    hardcore: 'Prono',
    charm: 'Fascino',
    know_how: 'Competenza',
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
    currently_buyable: 'Correntemente acquistabili',
    visit_the: 'Visita il <a href="../shop.html">negozio</a> prima.',
    not_compatible: 'Il tuo browser non è compatibile.',
    or_level: 'o livello',
    restock: 'Rifornimento',
    wiki: ' -> wiki',
    evolution_costs: 'Il costo del potenziamento è',
    world: 'Mondo ',
    villain: ' nemico',
    fight_villain: 'Combattimenti',
    you_own: 'Possiedi',
    you_can_give: 'Puoi dare il massimo a',
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
    mythic: 'Mitica',
    day: 'g',
    hour: 'h',
    minute: 'm',
    second: 's',
    demote_up: 'Per <u>il degrado</u> devi avere al massimo ',
    demote_down: 'Per <u>il degrado</u> devi essere sorpassato da giocatori con ',
    demote_holdzero: 'Per <u>il degrado</u> devi rimanere a ',
    stagnate_up: 'Per <u>restare</u> devi avere al massimo ',
    stagnate_down: 'Per <u>restare</u> devi essere sorpassato da giocatori con ',
    stagnate_holdzero: 'Per <u>restare</u> devi rimanere a ',
    top4_up: 'Per <u>essere tra i primi 4</u> devi avere un minimo di ',
    top4_hold: 'Per <u>rimanere tra i primi 4</u> devi avere un minimo di ',
    top15_up: 'Per <u>essere tra i primi 15</u> devi avere un minimo di ',
    top15_hold: 'Per <u>rimanere tra i primi 15</u> devi avere un minimo di ',
    top30_up: 'Per <u>essere tra i primi 30</u> devi avere un minimo di ',
    top30_hold: 'Per <u>rimanere tra i primi 30</u> devi avere un minimo di ',
    points: 'punti',
    challenges_regen: 'Rigenerazione naturale: ',
    challenges_left: '<br />Combattimenti mancanti: ',
    pop: 'Luoghi',
    season: 'Stagione',
    full_in: 'Piena tra',
    ends_at: 'Fine a',
    full: 'Piena',
    league: 'Leghe',
    boosters_end: 'Fine potenz.',
    victories: 'Vittorie',
    defeats: 'Sconfitte',
    unknown: 'Sconosciuto',
    opponents: 'Avversari',
    notPlayed: 'Non giocato',
    leaguePoints: 'Punti',
    avg: 'Medio',
    league_ending: 'Fine della lega il ',
    league_finished: 'Lega finita il ',
    current_league: 'Lega attuale',
    averageScore: 'Punteggio medio per combattimento: ',
    scoreExpected: 'Punteggio previsto: ',
    available_girls: 'Ragazze disponibili: ',
    fights: 'Fights',
    won_mojo: 'Won mojo',
    lost_mojo: 'Lost mojo',
    won_mojo_avg: 'Won mojo average',
    lost_mojo_avg: 'Lost mojo average',
    mojo_avg: 'Global mojo average',
    filter: 'Filtro',
    searched_name : 'Nome ricercato',
    girl_name: 'Nome della ragazza',
    searched_class: 'Classe ricercata',
    searched_rarity: 'Rarità ricercata',
    team_number: 'Squadra #',
    all: 'Tutti',
    team: 'Squadra',
    save_as: 'Salvare come',
    load_from: 'Caricare',
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
    time_passed: 'del tempo è passato',
    combativity: 'Combattività',
    energy: 'Energia',
    sort: 'Ordinare',
    hide: 'Nascondere',
    display: 'Visualizzare',
    searched_blessed_attributes: 'Cercato ragazze benedette',
    blessed_attributes: 'Ragazze benedette',
    non_blessed_attributes: 'Ragazze non benedette'
};

texts.de = {
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
    optionsSimFight: 'Liga/Saison/Widersacher-Simulation',
    optionsTeamsFilter: 'Mannschaften filtern',
    optionsChampions: 'Champion-Informationen',
    optionsLinks: 'Abkürzungen/Zeitgeber',
    optionsSeasonStats: 'Season stats',
    optionsPachinkoNames: 'Namen in Pachinko anzeigen',
    //optionsEpicPachinkoNames: 'Namen in Episch Pachinko anzeigen',
    optionsMissionsBackground: 'Missionshintergrund ändern',
    optionsCollectMoneyAnimation: 'Deaktivieren Sie die Animation "Geld sammeln"',
    optionsOldPoAWindow: 'Altes Fenster Pfad der Anziehung',
    and: 'und',
    or: 'oder',
    in: 'in',
    affection: 'Zuneigung',
    harem_stats: 'Harem-Statistiken',
    haremettes: 'Harem-Mädchen',
    hardcore: 'Hardcore',
    charm: 'Charme',
    know_how: 'Wissen',
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
    currently_buyable: 'Aktuelle Bestände am Marktplatz',
    visit_the: 'Besuche zuerst den <a href="../shop.html">Marktplatz</a>.',
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
    stat_points_need: 'bis Maximum käufliche Statpunkte',
    money_need: 'zum Maximieren nötiges Geld',
    money_spent: 'bisher ausgegebenes Geld',
    points_from_level: 'Statpunkte durch Heldenlevel',
    bought_points: 'Statpunkte durch Markt-Käufe',
    equipment_points: 'Statpunkte durch Ausrüstungen',
    ginseng_points: 'Statpunkte durch Booster',
    club_points: 'Statpunkte durch Club-Boni',
    Xp: 'XP',
    starting: 'Starting',
    common: 'Gemeinsame',
    rare: 'Seltene',
    epic: 'Epische',
    legendary: 'Legendäre',
    mythic: 'Mythische',
    day: 'd',
    hour: 'h',
    minute: 'm',
    second: 'z',
    demote_up: 'Für den <u>Abstieg</u> maximal möglich: ',
    demote_down: 'Für den <u>Abstieg</u> musst du überholt werden von Spielern mit höchstens ',
    demote_holdzero: 'Für den <u>Abstieg</u> musst du verbleiben bei ',
    stagnate_up: 'Für den <u>Nichtaufstieg</u> maximal möglich: ',
    stagnate_down: 'Für den <u>Nichtaufstieg</u> musst du überholt werden von Spielern mit höchstens ',
    stagnate_holdzero: 'Für den <u>Nichtaufstieg</u> musst du verbleiben bei ',
    top4_up: 'Um <u>in den Top 4 zu kommen</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    top4_hold: 'Um <u>in den Top 4 zu bleiben</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    top15_up: 'Um <u>in den Top 15 zu kommen</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    top15_hold: 'Um <u>in den Top 15 zu bleiben</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    top30_up: 'Um <u>in den Top 30 zu kommen</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    top30_hold: 'Um <u>in den Top 30 zu bleiben</u>, musst du mindestens folgende Voraussetzungen erfüllen  ',
    points: 'Punkte',
    challenges_regen: 'Natürliche Regeneration: ',
    challenges_left: '<br />verbleibende Kämpfe: ',
    pop: 'Orte',
    season: 'Saison',
    full_in: 'Voll in',
    ends_at: 'Endet um',
    full: 'Voll',
    league: 'Liga',
    boosters_end: 'Ende boosters',
    victories: 'Siegen',
    defeats: 'Niederlagen',
    unknown: 'Unbekannt',
    opponents: 'Gegenspieler',
    notPlayed: 'Nicht gespielt',
    leaguePoints: 'Punkte',
    avg: 'Mittelwert',
    league_ending: 'Liga Ende ',
    league_finished: 'Liga endete am',
    current_league: 'Aktuelle Liga',
    averageScore: 'Durchschnittsnote pro Kampf: ',
    scoreExpected: 'Erwartetes Ergebnis: ',
    available_girls: 'Freie Mädchen: ',
    fights: 'Fights',
    won_mojo: 'Won mojo',
    lost_mojo: 'Lost mojo',
    won_mojo_avg: 'Won mojo average',
    lost_mojo_avg: 'Lost mojo average',
    mojo_avg: 'Global mojo average',
    filter: 'Filter',
    searched_name : 'Gesuchter Name',
    girl_name: 'Mädchen Name',
    searched_class: 'Gesuchte Klasse',
    searched_rarity: 'Gesuchte Seltenheit',
    team_number: 'Team #',
    all: 'Alle',
    team: 'Team',
    save_as: 'Speichern unter',
    load_from: 'Laden',
    level_range: 'Pegelbereich',
    searched_aff_category: 'Gesuchte Zuneigungskategorie',
    searched_aff_lvl: 'Gesuchtes Zuneigungslevel',
    zero_star: '0 Stern',
    one_star: '1 Stern',
    two_stars: '2 Sterne',
    three_stars: '3 Sterne',
    four_stars: '4 Sterne',
    five_stars: '5 Sterne',
    six_stars: '6 Sterne',
    time_passed: 'Zeit ist vergangen',
    combativity: 'Kampflust',
    energy: 'Energie',
    sort: 'Sortieren',
    hide: 'Ausblenden',
    display: 'Anzeigen',
    searched_blessed_attributes: 'Gesuchte Selige Mädchen',
    blessed_attributes: 'Gesegnete Mädchen',
    non_blessed_attributes: 'Nicht-gesegnete Mädchen'
};

var tierGirlsID;

let locale = 'fr';
if (lang === 'en') {
    locale = 'en'
}
const localeDecimalSep = Number(1.1).toLocaleString(locale).replace(/[0-9]/g, '');
const parseLocaleFloat = (numStr) => parseFloat(numStr.split(localeDecimalSep).map(part => part.replace(/[^0-9]/g, '')).join('.'), 10);

if ($('#hh_comix').length == 0) {
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
        ['612527302', '167231135', '560979916', 0, 0]
    ];
}
else {
    tierGirlsID = [
        ['830009523', '907801218', '943323021', 0, 0],
        ['271746999', '303805209', '701946373', 0, 0]
    ];
}

var GIRLS_EXP_LEVELS = [];

GIRLS_EXP_LEVELS.starting = [10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];

GIRLS_EXP_LEVELS.common = [10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];

GIRLS_EXP_LEVELS.rare = [12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142, 156, 170, 184, 198, 212, 226, 240, 254, 268, 282, 297, 312, 327, 342, 357, 372, 387, 402, 417, 433, 449, 465, 481, 497, 513, 529, 545, 561, 578, 595, 612, 629, 646, 663, 680, 697, 715, 733, 751, 769, 787, 805, 823, 841, 860, 879, 898, 917, 936, 955, 974, 994, 1014, 1034, 1054, 1074, 1094, 1114, 1135, 1156, 1177, 1198, 1219, 1240, 1262, 1284, 1306, 1328, 1350, 1372, 1394, 1417, 1440, 1463, 1486, 1509, 1532, 1556, 1580, 1604, 1628, 1652, 1677, 1702, 1727, 1752, 1777, 1802, 1828, 1854, 1880, 1906, 1932, 1959, 1986, 2013, 2040, 2067, 2095, 2123, 2151, 2179, 2207, 2236, 2265, 2294, 2323, 2352, 2382, 2412, 2442, 2472, 2503, 2534, 2565, 2596, 2627, 2659, 2691, 2723, 2755, 2788, 2821, 2854, 2887, 2921, 2955, 2989, 3023, 3058, 3093, 3128, 3163, 3199, 3235, 3271, 3307, 3344, 3381, 3418, 3456, 3494, 3532, 3570, 3609, 3648, 3687, 3727, 3767, 3807, 3847, 3888, 3929, 3970, 4012, 4054, 4096, 4139, 4182, 4225, 4269, 4313, 4357, 4402, 4447, 4492, 4538, 4584, 4630, 4677, 4724, 4771, 4819, 4867, 4915, 4964, 5013, 5062, 5112, 5162, 5213, 5264, 5315, 5367, 5419, 5471, 5524, 5577, 5631, 5685, 5739, 5794, 5849, 5905, 5961, 6017, 6074, 6131, 6189, 6247, 6306, 6365, 6424, 6484, 6544, 6605, 6666, 6728, 6790, 6853, 6916, 6980, 7044, 7108, 7173, 7238, 7304, 7370, 7437, 7504, 7572, 7640, 7709, 7778, 7848, 7918, 7989, 8061, 8133, 8206, 8279, 8353, 8427, 8502, 8577, 8653, 8729, 8806, 8884, 8962, 9041, 9120, 9200, 9281, 9362, 9444, 9526, 9609, 9693, 9777, 9862, 9947, 10033, 10120, 10207, 10295, 10384, 10473, 10563, 10654, 10745, 10837, 10930, 11023, 11117, 11212, 11308, 11404, 11501, 11599, 11697, 11796, 11896, 11997, 12098, 12200, 12303, 12407, 12511, 12616, 12722, 12829, 12937, 13045, 13154, 13264, 13375, 13487, 13600, 13713, 13827, 13942, 14058, 14175, 14293, 14412, 14531, 14651, 14772, 14894, 15017, 15141, 15266, 15392, 15519, 15647, 15776, 15906, 16037, 16169, 16302, 16436, 16571, 16707, 16844, 16982, 17121, 17261, 17402, 17544, 17687, 17831, 17976, 18122, 18269, 18417, 18566, 18716, 18868, 19021, 19175, 19330, 19486, 19643, 19802, 19962, 20123, 20285, 20448, 20613, 20779, 20946, 21114, 21284, 21455, 21627, 21800, 21975, 22151, 22328, 22507, 22687, 22868, 23051, 23235, 23420, 23607, 23795, 23985, 24176, 24368, 24562, 24757, 24954, 25152, 25352, 25553, 25756, 25960, 26166, 26373, 26582, 26792, 27004, 27218, 27433, 27650, 27868, 28088, 28310, 28533, 28758, 28985, 29213, 29443, 29675, 29909, 30144, 30381, 30620, 30861, 31103, 31347, 31593, 31841, 32091, 32343, 32597, 32852, 33109, 33368, 33629, 33892, 34157, 34424, 34693, 34964, 35237, 35512, 35789, 36068, 36349, 36633, 36919, 37207, 37497, 37789, 38083, 38380, 38679, 38980, 39283, 39588, 39896, 40206, 40518, 40833, 41150, 41469, 41791, 42115, 42442, 42771, 43103, 43437, 43774, 44113, 44455, 44799, 45146, 45495, 45847, 46202, 46559, 46919, 47282, 47647, 48015, 48386, 48760, 49136, 49515, 49897, 50282, 50670, 51061, 51455, 51852, 52252, 52655, 53061, 53470, 53882, 54297, 54715, 55136, 55560, 55987, 56418, 56852, 57289, 57729, 58173, 58620, 59070, 59524, 59981, 60442, 60906, 61373, 61844, 62318, 62796, 63278, 63763, 64252, 64745, 65241, 65741];

GIRLS_EXP_LEVELS.epic = [14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 165, 181, 197, 213, 229, 245, 261, 277, 294, 311, 328, 345, 362, 379, 396, 413, 431, 449, 467, 485, 503, 521, 539, 557, 576, 595, 614, 633, 652, 671, 690, 710, 730, 750, 770, 790, 810, 830, 851, 872, 893, 914, 935, 956, 977, 999, 1021, 1043, 1065, 1087, 1109, 1132, 1155, 1178, 1201, 1224, 1247, 1271, 1295, 1319, 1343, 1367, 1391, 1416, 1441, 1466, 1491, 1516, 1542, 1568, 1594, 1620, 1646, 1673, 1700, 1727, 1754, 1781, 1809, 1837, 1865, 1893, 1921, 1950, 1979, 2008, 2037, 2066, 2096, 2126, 2156, 2186, 2217, 2248, 2279, 2310, 2341, 2373, 2405, 2437, 2469, 2502, 2535, 2568, 2601, 2635, 2669, 2703, 2737, 2772, 2807, 2842, 2877, 2913, 2949, 2985, 3021, 3058, 3095, 3132, 3169, 3207, 3245, 3283, 3322, 3361, 3400, 3439, 3479, 3519, 3559, 3600, 3641, 3682, 3724, 3766, 3808, 3850, 3893, 3936, 3979, 4023, 4067, 4111, 4156, 4201, 4246, 4292, 4338, 4384, 4431, 4478, 4525, 4573, 4621, 4670, 4719, 4768, 4818, 4868, 4918, 4969, 5020, 5071, 5123, 5175, 5228, 5281, 5334, 5388, 5442, 5497, 5552, 5607, 5663, 5719, 5776, 5833, 5891, 5949, 6007, 6066, 6125, 6185, 6245, 6306, 6367, 6429, 6491, 6553, 6616, 6679, 6743, 6807, 6872, 6937, 7003, 7069, 7136, 7203, 7271, 7339, 7408, 7477, 7547, 7617, 7688, 7759, 7831, 7903, 7976, 8049, 8123, 8198, 8273, 8349, 8425, 8502, 8579, 8657, 8736, 8815, 8895, 8975, 9056, 9138, 9220, 9303, 9386, 9470, 9555, 9640, 9726, 9813, 9900, 9988, 10076, 10165, 10255, 10345, 10436, 10528, 10621, 10714, 10808, 10903, 10998, 11094, 11191, 11288, 11386, 11485, 11585, 11685, 11786, 11888, 11991, 12094, 12198, 12303, 12409, 12516, 12623, 12731, 12840, 12950, 13061, 13172, 13284, 13397, 13511, 13626, 13742, 13859, 13976, 14094, 14213, 14333, 14454, 14576, 14699, 14823, 14948, 15074, 15200, 15327, 15455, 15584, 15714, 15845, 15977, 16110, 16244, 16379, 16515, 16652, 16790, 16929, 17069, 17210, 17352, 17496, 17641, 17787, 17934, 18082, 18231, 18381, 18532, 18684, 18837, 18992, 19148, 19305, 19463, 19622, 19782, 19944, 20107, 20271, 20436, 20603, 20771, 20940, 21110, 21282, 21455, 21629, 21804, 21981, 22159, 22338, 22519, 22701, 22884, 23069, 23255, 23443, 23632, 23822, 24014, 24207, 24402, 24598, 24796, 24995, 25196, 25398, 25602, 25807, 26014, 26222, 26432, 26643, 26856, 27071, 27287, 27505, 27724, 27945, 28168, 28392, 28618, 28846, 29075, 29306, 29539, 29774, 30010, 30248, 30488, 30730, 30974, 31219, 31466, 31715, 31966, 32219, 32474, 32731, 32990, 33250, 33512, 33776, 34042, 34310, 34580, 34852, 35126, 35402, 35681, 35962, 36245, 36530, 36817, 37106, 37397, 37690, 37986, 38284, 38584, 38886, 39191, 39498, 39807, 40119, 40433, 40749, 41068, 41389, 41712, 42038, 42366, 42697, 43030, 43366, 43704, 44045, 44388, 44734, 45082, 45433, 45787, 46143, 46502, 46864, 47228, 47595, 47965, 48338, 48713, 49091, 49472, 49856, 50243, 50633, 51026, 51422, 51821, 52223, 52628, 53036, 53447, 53861, 54278, 54698, 55121, 55547, 55976, 56409, 56845, 57284, 57726, 58172, 58621, 59073, 59529, 59988, 60451, 60917, 61387, 61860, 62337, 62817, 63301, 63789, 64280, 64775, 65274, 65776, 66282, 66792, 67306, 67823, 68344, 68869, 69398, 69931, 70468, 71009, 71554, 72103, 72656, 73214, 73776, 74342, 74912, 75487, 76066, 76649];

GIRLS_EXP_LEVELS.legendary = [16, 33, 50, 67, 84, 101, 118, 135, 152, 170, 188, 206, 224, 242, 260, 278, 297, 316, 335, 354, 373, 392, 411, 431, 451, 471, 491, 511, 531, 551, 572, 593, 614, 635, 656, 677, 698, 720, 742, 764, 786, 808, 830, 853, 876, 899, 922, 945, 968, 992, 1016, 1040, 1064, 1088, 1112, 1137, 1162, 1187, 1212, 1237, 1263, 1289, 1315, 1341, 1367, 1394, 1421, 1448, 1475, 1502, 1529, 1557, 1585, 1613, 1641, 1670, 1699, 1728, 1757, 1786, 1816, 1846, 1876, 1906, 1936, 1967, 1998, 2029, 2060, 2092, 2124, 2156, 2188, 2221, 2254, 2287, 2320, 2354, 2388, 2422, 2456, 2491, 2526, 2561, 2596, 2632, 2668, 2704, 2740, 2777, 2814, 2851, 2888, 2926, 2964, 3002, 3041, 3080, 3119, 3158, 3198, 3238, 3278, 3319, 3360, 3401, 3443, 3485, 3527, 3569, 3612, 3655, 3698, 3742, 3786, 3830, 3875, 3920, 3965, 4011, 4057, 4103, 4150, 4197, 4244, 4292, 4340, 4388, 4437, 4486, 4536, 4586, 4636, 4687, 4738, 4789, 4841, 4893, 4946, 4999, 5052, 5106, 5160, 5215, 5270, 5325, 5381, 5437, 5494, 5551, 5608, 5666, 5724, 5783, 5842, 5902, 5962, 6023, 6084, 6145, 6207, 6269, 6332, 6395, 6459, 6523, 6588, 6653, 6719, 6785, 6852, 6919, 6987, 7055, 7124, 7193, 7263, 7333, 7404, 7475, 7547, 7619, 7692, 7765, 7839, 7914, 7989, 8065, 8141, 8218, 8295, 8373, 8451, 8530, 8610, 8690, 8771, 8852, 8934, 9017, 9100, 9184, 9269, 9354, 9440, 9526, 9613, 9701, 9789, 9878, 9968, 10058, 10149, 10241, 10333, 10426, 10520, 10615, 10710, 10806, 10903, 11000, 11098, 11197, 11297, 11397, 11498, 11600, 11703, 11806, 11910, 12015, 12121, 12227, 12334, 12442, 12551, 12661, 12771, 12882, 12994, 13107, 13221, 13336, 13452, 13568, 13685, 13803, 13922, 14042, 14163, 14285, 14408, 14532, 14656, 14781, 14907, 15034, 15162, 15291, 15421, 15552, 15684, 15817, 15951, 16086, 16222, 16359, 16497, 16636, 16776, 16917, 17059, 17202, 17346, 17492, 17639, 17787, 17936, 18086, 18237, 18389, 18542, 18696, 18852, 19009, 19167, 19326, 19486, 19648, 19811, 19975, 20140, 20306, 20474, 20643, 20813, 20984, 21157, 21331, 21506, 21683, 21861, 22040, 22221, 22403, 22586, 22771, 22957, 23144, 23333, 23523, 23715, 23908, 24103, 24299, 24496, 24695, 24895, 25097, 25300, 25505, 25712, 25920, 26130, 26341, 26554, 26768, 26984, 27202, 27421, 27642, 27865, 28089, 28315, 28543, 28772, 29003, 29236, 29470, 29706, 29944, 30184, 30426, 30669, 30914, 31161, 31410, 31661, 31914, 32168, 32424, 32682, 32942, 33204, 33468, 33734, 34002, 34272, 34544, 34818, 35094, 35372, 35652, 35934, 36219, 36506, 36795, 37086, 37379, 37674, 37972, 38272, 38574, 38878, 39185, 39494, 39805, 40119, 40435, 40753, 41074, 41397, 41722, 42050, 42380, 42713, 43048, 43386, 43726, 44069, 44415, 44763, 45114, 45467, 45823, 46182, 46543, 46907, 47274, 47644, 48016, 48391, 48769, 49150, 49534, 49920, 50309, 50701, 51096, 51494, 51895, 52299, 52706, 53116, 53529, 53945, 54364, 54787, 55213, 55642, 56074, 56509, 56948, 57390, 57835, 58284, 58736, 59191, 59650, 60112, 60578, 61047, 61520, 61996, 62476, 62959, 63446, 63937, 64431, 64929, 65431, 65937, 66446, 66959, 67476, 67997, 68522, 69051, 69584, 70121, 70662, 71207, 71756, 72309, 72866, 73427, 73992, 74562, 75136, 75714, 76297, 76884, 77475, 78071, 78671, 79276, 79885, 80499, 81117, 81740, 82368, 83000, 83637, 84279, 84926, 85578, 86235, 86896, 87562];

GIRLS_EXP_LEVELS.mythic = [40, 81, 122, 163, 205, 247, 289, 332, 375, 418, 462, 506, 550, 595, 640, 685, 731, 777, 823, 870, 917, 964, 1012, 1060, 1108, 1157, 1206, 1255, 1305, 1355, 1406, 1457, 1508, 1560, 1612, 1664, 1717, 1770, 1824, 1878, 1932, 1987, 2042, 2098, 2154, 2210, 2267, 2324, 2382, 2440, 2499, 2558, 2617, 2677, 2737, 2798, 2859, 2921, 2983, 3046, 3109, 3173, 3237, 3302, 3367, 3433, 3499, 3565, 3632, 3699, 3767, 3835, 3904, 3974, 4044, 4115, 4186, 4258, 4330, 4403, 4476, 4550, 4624, 4699, 4774, 4850, 4927, 5004, 5082, 5160, 5239, 5318, 5398, 5479, 5560, 5642, 5724, 5807, 5891, 5975, 6060, 6146, 6232, 6319, 6407, 6495, 6584, 6673, 6763, 6854, 6945, 7037, 7130, 7224, 7318, 7413, 7509, 7605, 7702, 7800, 7899, 7998, 8098, 8199, 8301, 8403, 8506, 8610, 8715, 8820, 8926, 9033, 9141, 9250, 9359, 9469, 9580, 9692, 9805, 9919, 10033, 10148, 10264, 10381, 10499, 10618, 10738, 10858, 10979, 11101, 11224, 11348, 11473, 11599, 11726, 11854, 11983, 12113, 12244, 12376, 12509, 12643, 12778, 12914, 13051, 13189, 13328, 13468, 13609, 13751, 13894, 14038, 14183, 14329, 14476, 14624, 14774, 14925, 15077, 15230, 15384, 15539, 15695, 15853, 16012, 16172, 16333, 16495, 16658, 16823, 16989, 17156, 17324, 17494, 17665, 17837, 18011, 18186, 18362, 18539, 18718, 18898, 19079, 19262, 19446, 19632, 19819, 20007, 20197, 20388, 20581, 20775, 20970, 21167, 21365, 21565, 21766, 21969, 22173, 22379, 22587, 22796, 23007, 23219, 23433, 23648, 23865, 24084, 24304, 24526, 24750, 24975, 25202, 25431, 25661, 25893, 26127, 26363, 26600, 26839, 27080, 27323, 27567, 27813, 28061, 28311, 28563, 28817, 29073, 29331, 29591, 29852, 30115, 30380, 30647, 30916, 31187, 31460, 31735, 32013, 32293, 32575, 32859, 33145, 33433, 33723, 34015, 34310, 34607, 34906, 35207, 35511, 35817, 36125, 36435, 36748, 37063, 37380, 37700, 38022, 38347, 38674, 39003, 39335, 39669, 40006, 40345, 40687, 41032, 41379, 41729, 42081, 42436, 42794, 43154, 43517, 43883, 44251, 44622, 44996, 45373, 45753, 46136, 46521, 46909, 47300, 47694, 48091, 48491, 48894, 49300, 49709, 50121, 50536, 50954, 51375, 51800, 52228, 52659, 53093, 53530, 53971, 54415, 54862, 55313, 55767, 56225, 56686, 57150, 57618, 58089, 58564, 59042, 59524, 60010, 60499, 60992, 61489, 61989, 62493, 63001, 63513, 64029, 64548, 65071, 65598, 66129, 66664, 67203, 67746, 68293, 68844, 69400, 69960, 70524, 71092, 71664, 72241, 72822, 73407, 73997, 74591, 75190, 75793, 76401, 77013, 77630, 78251, 78877, 79508, 80143, 80783, 81428, 82078, 82733, 83393, 84058, 84728, 85403, 86083, 86768, 87458, 88153, 88853, 89558, 90269, 90985, 91706, 92433, 93165, 93903, 94646, 95395, 96149, 96909, 97675, 98447, 99224, 100007, 100796, 101591, 102392, 103199, 104012, 104831, 105656, 106487, 107325, 108169, 109019, 109876, 110739, 111609, 112485, 113368, 114257, 115153, 116056, 116965, 117881, 118804, 119734, 120671, 121615, 122566, 123524, 124489, 125462, 126442, 127429, 128424, 129426, 130436, 131453, 132478, 133510, 134550, 135598, 136654, 137718, 138790, 139870, 140958, 142054, 143158, 144271, 145392, 146521, 147659, 148805, 149960, 151123, 152295, 153476, 154666, 155865, 157073, 158290, 159516, 160751, 161995, 163249, 164512, 165785, 167067, 168359, 169660, 170971, 172292, 173623, 174964, 176315, 177676, 179047, 180429, 181821, 183223, 184636, 186059, 187493, 188938, 190394, 191861, 193339, 194828, 196328, 197839, 199361, 200895, 202440, 203997, 205566, 207146, 208738, 210342, 211958, 213586, 215227, 216880];

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
			||e=='simFight'
			||e=='teamsFilter'
			||e=='champions'
			||e=='links'
			||e=='seasonStats'
			||e=='pachinkoNames'
			//||e=='pachinkoNamesMulti'
			||e=='missionsBackground'
			||e=='collectMoneyAnimation'
			||e=='oldPoAWindow'
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
    if (CurrentPage.indexOf('shop') != -1) {
        moduleMarketFilter();
    }
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
    if (CurrentPage.indexOf('harem') != -1) {
        moduleHarem();
    }
}
if (loadSetting('league')) {
    if (CurrentPage.indexOf('tower-of-fame') != -1) {
        moduleLeague();
    }
}
if (loadSetting('simFight')) {
    if (CurrentPage.indexOf('tower-of-fame') != -1)
        moduleSim();
    if (CurrentPage.indexOf('season-arena') != -1)
        moduleSeasonSim();
    if (window.location.href.indexOf('/troll-pre-battle') != -1)
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
                                 + '<label class="switch"><input type="checkbox" hhs="simFight"><span class="slider"></span></label>' + texts[lang].optionsSimFight + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="teamsFilter"><span class="slider"></span></label>' + texts[lang].optionsTeamsFilter + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="champions"><span class="slider"></span></label>' + texts[lang].optionsChampions + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="links"><span class="slider"></span></label>' + texts[lang].optionsLinks + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="seasonStats"><span class="slider"></span></label>' + texts[lang].optionsSeasonStats + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="pachinkoNames"><span class="slider"></span></label>' + texts[lang].optionsPachinkoNames + '<br />'
                                 //+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="switch"><input type="checkbox" hhs="pachinkoNamesMulti"><span class="slider"></span></label>' + texts[lang].optionsEpicPachinkoNames + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="missionsBackground"><span class="slider"></span></label>' + texts[lang].optionsMissionsBackground + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="collectMoneyAnimation"><span class="slider"></span></label>' + texts[lang].optionsCollectMoneyAnimation + '<br />'
                                 + '<label class="switch"><input type="checkbox" hhs="oldPoAWindow"><span class="slider"></span></label>' + texts[lang].optionsOldPoAWindow
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
        }
    });
    $('[hhs=leagueBoard]').click(function() {
        if ($(this).is(':checked')) {
            $('[hhs=league]').prop('checked', true);
            localStorage.setItem('HHS.league', true)
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
    let	includeTiers = false;
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

        let totalGirls = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container').length;
        for (var i=0; i<totalGirls; i++) {
            let girlId = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ')').attr('data-reward-girl-id');
            let girlLocation = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-events-prize-locations-buttons-container .nc-events-prize-locations-buttons-container a').attr('href');
            let index = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').indexOf('-text');
            let girlRarity = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').substring(0, index);
            if (girlLocation.includes('troll-pre-battle')) {
                eventTrolls.push({id: girlId, troll: girlLocation.substring(35), rarity: girlRarity});
            }
        }
        localStorage.setItem('eventTrolls', JSON.stringify(eventTrolls));
    }

    if (window.location.search.includes("tab=mythic_event")) {
        let eventRemainingTime = parseInt($('#contains_all #events .nc-panel-header .nc-pull-right #timer').attr("data-seconds-until-event-end"), 10);
        mythicEventEndTime = Math.floor(new Date().getTime()/1000) + eventRemainingTime;
        localStorage.setItem('mythicEventTime', mythicEventEndTime);

        mythicEventTrolls = [];

        let totalGirls = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container').length;
        for (var i=0; i<totalGirls; i++) {
            let girlId = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ')').attr('data-reward-girl-id');
            let girlLocation = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-events-prize-locations-buttons-container .nc-events-prize-locations-buttons-container a').attr('href');
            let index = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').indexOf('-text');
            let girlRarity = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container:nth-child(' + (i+1) + ') .nc-event-reward-info .new_girl_info h5').attr('class').substring(0, index);
            if (girlLocation.includes('troll-pre-battle'))
                mythicEventTrolls.push({id: girlId, troll: girlLocation.substring(35), rarity: girlRarity});
        }
        localStorage.setItem('mythicEventTrolls', JSON.stringify(mythicEventTrolls));
    }

    if (CurrentPage.indexOf('home') != -1) {
        if (includeTiers) {
            //Check if villain tier girls have been collected
            tierGirlsOwned = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

            for (var tIdx = 0; tIdx < tierGirlsID.length; tIdx++) {
                for (var gIdx = 0; gIdx < 5; gIdx++) {
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
    if ($('#hh_comix').length == 0) {
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
        }
    }
    else {
        trolls = ['BodyHack', 'Grey Golem'];
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
                if (!(tierGirlsOwned[i][0] && tierGirlsOwned[i][1] && tierGirlsOwned[i][2])) {
                    trollNameTiers = trollNameTiers + '&#185;';
                }
                if (!(tierGirlsOwned[i][3])) {
                    trollNameTiers = trollNameTiers + '&#178;';
                }
                if (!(tierGirlsOwned[i][4])) {
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
        trollsMenu += '<a class="' + type + '" href="/troll-pre-battle.html?id_opponent=' + (i + 1) + '">' + trollName + trollNameTiers + '</a><br />';
    }

    $('#contains_all > header').children('[type=fight]').append('<div class="TrollsMenu" id="TrollsID">' + trollsMenu + '</div>');

    //CSS
    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.TrollsMenu {'
                     + 'position: absolute; '
                     + 'z-index: 35; '
                     + 'display: none; '
                     + 'margin: 0 0 0 13px; '
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
                     + '.TrollsMenu {'
                     + 'position: absolute; '
                     + 'z-index: 35; '
                     + 'display: none; '
                     + 'margin: 0 0 0 13px; '
                     + 'border-radius: 8px 10px 10px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73); '
                     + 'font-size: 16px !important; '
                     + 'font-weight: 400; '
                     + 'letter-spacing: .22px; '
                     + 'color: #fff; '
                     + 'text-align: center;}}'
                    );

    sheet.insertRule('#hh_comix .TrollsMenu {'
                     + 'font-weight: 800 !important;}'
                    );

    sheet.insertRule('.TrollsMenu a {'
                     + 'font-family: \'Carter One\', \'Alegreya Sans\', cursive !important; '
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

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.energy_counter > .TrollsMenu {'
                     + 'position: absolute; '
                     + 'width: 105%; '
                     + 'margin: 64px 0 0 17px; '
                     + 'border-radius: 0px 0 8px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'line-height: 40px !important; '
                     + 'opacity: 0; '
                     + 'visibility: hidden;'
                     + 'transition: opacity 400ms, visibility 400ms;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.energy_counter > .TrollsMenu {'
                     + 'position: absolute; '
                     + 'width: 88%; '
                     + 'margin: 34px 0 0 34px; '
                     + 'border-radius: 0px 0 8px 8px; '
                     + 'background-color: rgba(0,0,0,.8); '
                     + 'line-height: 22px; '
                     + 'opacity: 0; '
                     + 'visibility: hidden;'
                     + 'transition: opacity 400ms, visibility 400ms;}}'
                    );

    sheet.insertRule('.energy_counter:hover > .TrollsMenu {'
                     + 'opacity: 1; '
                     + 'display: block; '
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('#TrollsID a {'
                     + 'color: rgb(255, 255, 255); '
                     + 'text-decoration: none;}'
                    );

    sheet.insertRule('#TrollsID a:hover {'
                     + 'color: rgb(255, 247, 204); '
                     + 'text-decoration: underline;}'
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
        $('div[hero="soft_currency"]').empty().append(nRounding(Hero.infos.soft_currency, 3, -1));
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

                var totalPoints = Hero.infos.caracs[stat],
                    skillPoints = Hero.infos.caracs['stat' + stat.substr(5)] - boughtPoints;

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
        Hero.infos[stat]++;
        timer = setTimeout(function() {
            updateStats();
        }, 400);
    });

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
                     + 'visibility: none;}'
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
            $("#girls_list>.level_target_squared>div>div").attr("chars", $girl.data("g")["level"].length);
            $("#girls_list>.level_target_squared>div>div").text($girl.data("g")["level"]);
            $("#girls_list>h3").text($girl.data("g")["Name"]);
            $("#girls_list>.icon").attr("carac", $girl.data("g")["class"]);
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
            return Array.from(allGirls, girl => JSON.parse($(girl).attr("data-new-girl-tooltip") || $(girl).attr("new-girl-tooltip-data")) );
        }

        function createFilterBox() {
			var totalHTML = '<div style="position:relative"><div id="arena_filter_box" class="form-wrapper" style="'
			+ 'position: absolute; left: -215px; bottom: -150px; width: 200px; heigth: fit-content; z-index: 3; border-radius: 8px 10px 10px 8px; background-color: #1e261e; box-shadow: rgba(255, 255, 255, 0.73) 0px 0px; padding: 5px; border: 1px solid #ffa23e; display: none;">';
            totalHTML += '<div class="form-control"><div class="input-group">'
                + '<label class="head-group" for="sort_name">' + texts[lang].searched_name + '</label>'
                + '<input type="text" autocomplete="off" id="sort_name" placeholder="' + texts[lang].girl_name + '" icon="search">'
                + '</div></div>';

            totalHTML += '<div class="form-control"><div class="select-group">'
                + '<label class="head-group" for="sort_class">' + texts[lang].searched_class + '</label>'
                + '<select name="sort_class" id="sort_class" icon="down-arrow">'
                + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="hardcore">' + texts[lang].hardcore + '</option><option value="charm">' + texts[lang].charm + '</option><option value="knowhow">' + texts[lang].know_how + '</option>'
                + '</select></div></div>';

            totalHTML += '<div class="form-control"><div class="select-group">'
                + '<label class="head-group" for="sort_rarity">' + texts[lang].searched_rarity + '</label>'
                + '<select name="sort_rarity" id="sort_rarity" icon="down-arrow">'
                + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="starting">' + texts[lang].starting + '</option><option value="common">' + texts[lang].common + '</option><option value="rare">' + texts[lang].rare + '</option><option value="epic">' + texts[lang].epic + '</option><option value="legendary">' + texts[lang].legendary + '</option><option value="mythic">' + texts[lang].mythic + '</option>'
                + '</select></div></div>';

            totalHTML += '<div class="form-control"><div class="input-group">'
                + '<label class="head-group" for="sort_level">' + texts[lang].level_range + '</label>'
                + '<input type="text" autocomplete="off" id="sort_level" placeholder="1-500" icon="search">'
                + '</div></div>';

            totalHTML += '<div class="form-control"><div class="select-group">'
                + '<label class="head-group" for="sort_aff_category">' + texts[lang].searched_aff_category + '</label>'
                + '<select name="sort_aff_category" id="sort_aff_category" icon="down-arrow">'
                + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="1">' + texts[lang].one_star + '</option><option value="3">' + texts[lang].three_stars + '</option><option value="5">' + texts[lang].five_stars + '</option><option value="6">' + texts[lang].six_stars + '</option>'
                + '</select></div></div>';

            totalHTML += '<div class="form-control"><div class="select-group">'
                + '<label class="head-group" for="sort_aff_lvl">' + texts[lang].searched_aff_lvl + '</label>'
                + '<select name="sort_aff_lvl" id="sort_aff_lvl" icon="down-arrow">'
                + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="0">' + texts[lang].zero_star + '</option><option value="1">' + texts[lang].one_star + '</option><option value="2">' + texts[lang].two_stars + '</option><option value="3">' + texts[lang].three_stars + '</option><option value="4">' + texts[lang].four_stars + '</option><option value="5">' + texts[lang].five_stars + '</option><option value="6">' + texts[lang].six_stars + '</option>'
                + '</select></div></div>';

            totalHTML += '</div></div>';

            return $(totalHTML);
        }

        function createFilterBtn() {
            let btn = $('<input type="button" class="blue_button_L girl_filter" value="' + texts[lang].filter + '" />');
            return btn;
        }

        function filterGirls(form, girlsData) {
            let sorterClass = form.find("#sort_class").prop('selectedIndex');
            let sorterRarity = form.find("#sort_rarity").val();
            let sorterAffCategory = form.find("#sort_aff_category").val();
            let sorterAffLvl = form.find("#sort_aff_lvl").val();
            let sorterName = form.find("#sort_name").val();
            let sorterRange = form.find("#sort_level").val().split('-');
            let nameRegex = new RegExp(sorterName, "i");

            hideCurrentGirl();

            for(let i = 0; i < girlsData.length; ++i) {

                let girl = girlsData[i];

                let affectionStr = girl.Graded2;
                let affectionCategoryStr = affectionStr.split('</g>');
                let affectionCategory = affectionCategoryStr.length-1;
                let affectionLvlStr = affectionStr.split('<g >');
                let affectionLvl = affectionLvlStr.length-1;

                let matchesClass = (girl.class == sorterClass) || (sorterClass == 0);
                let matchesRarity = (girl.rarity == sorterRarity) || (sorterRarity == 'all');
                let matchesAffCategory = (affectionCategory == sorterAffCategory) || (sorterAffCategory == 'all');
                let matchesAffLvl = (affectionLvl == sorterAffLvl) || (sorterAffLvl == 'all');
                let matchesName = (girl.Name.search(nameRegex) > -1);
                let matchesLevel =  (sorterRange[0] == '' || girl.level >= parseInt(sorterRange[0]) )
                && (sorterRange[1] == '' || sorterRange[1] === undefined || girl.level <= parseInt(sorterRange[1]) );
                let matches

                if(matchesClass && matchesRarity && matchesName && matchesLevel && matchesAffCategory && matchesAffLvl) {
                    nav.before(allGirls[i]);
                } else {
                    allGirls[i].detach();
                }
            }

            updateNavMax();
            goto_girl(1, true, false);
        }

        function createFilter(target, girlsData) {
            let filterBox = createFilterBox();
            let btn = createFilterBtn();

            target.append(btn);
            target.append(filterBox);

            btn.on('click', function() {
                $('#arena_filter_box').css('display', $('#arena_filter_box').css('display')=='block'?'none':'block');
            });

            let sortGirls = () => {
                filterGirls(filterBox, girlsData);
            };

            filterBox.find("#sort_class") .on('change', sortGirls);
            filterBox.find("#sort_rarity").on('change', sortGirls);
            filterBox.find("#sort_aff_category").on('change', sortGirls);
            filterBox.find("#sort_aff_lvl").on('change', sortGirls);
            filterBox.find("#sort_name")  .on('input' , sortGirls );
            filterBox.find("#sort_level") .on('input' , sortGirls );
        }

        let girlsData = getGirlData();
		createFilter( $('#girls_list'), girlsData );
    }

    addGirlFilter();

    //CSS
    sheet.insertRule('#arena_filter_box label.head-group {'
                     + 'display: block;'
                     + 'position: relative;'
                     + 'left: -5px;'
                     + 'z-index: 15;'
                     + 'margin-bottom: -8px;'
                     + 'margin-top: -3px !important;'
                     + 'padding-left: 7px;'
                     + 'font-size: 14px;'
                     + 'font-weight: 400;'
                     + 'letter-spacing: .22px;'
                     + 'text-align: left !important;'
                     + 'color: #ffb827;'
                     + 'background:transparent;'
                     + 'text-shadow: -1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,-2px -2px 5px rgba(255,159,0,.4),2px -2px 5px rgba(255,159,0,.4),-2px 2px 5px rgba(255,159,0,.4),2px 2px 5px rgba(255,159,0,.4),0 0 10px rgba(255,159,0,.4);}'
                    );

    sheet.insertRule('#shops #girls_list .g1 > div > .number {'
                     + 'left: 0 !important;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + 'input.blue_button_L.girl_filter {'
                     + 'position: absolute;'
                     + 'left: -2px;'
                     + 'top: 0px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + 'input.blue_button_L.girl_filter {'
                     + 'position: absolute;'
                     + 'left: -2px;'
                     + 'top: -30px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#arena_filter_box {'
                     + 'bottom: 76px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#arena_filter_box {'
                     + 'bottom: 95px;}}'
                    );
}

/* =====================================
	MARKET XP AND AFFECTION INFORMATION
   ===================================== */

function moduleMarket_XP_Aff() {
    const timeout = 250;
    var nbItem = 0;

    function updateGirlXP(girl) {
        var girl_data = JSON.parse(girl.attr('new-girl-tooltip-data') || girl.attr('data-new-girl-tooltip'));
        var girl_rarity = girl_data.rarity;
        var lvl_max = Hero.infos.level;
        var xp_total = 0;
        switch (girl_rarity) {
            case "starting":
                xp_total = GIRLS_EXP_LEVELS.starting[lvl_max-2];
                break;
            case "common":
                xp_total = GIRLS_EXP_LEVELS.common[lvl_max-2];
                break;
            case "rare":
                xp_total = GIRLS_EXP_LEVELS.rare[lvl_max-2];
                break;
            case "epic":
                xp_total = GIRLS_EXP_LEVELS.epic[lvl_max-2];
                break;
            case "legendary":
                xp_total = GIRLS_EXP_LEVELS.legendary[lvl_max-2];
                break;
            case "mythic":
                xp_total = GIRLS_EXP_LEVELS.mythic[lvl_max-2];
                break;
        }

        var xp_total_remaining = xp_total - girl.data("g").Xp.cur;
        var xp_next_remaining = girl.data("g").Xp.max - girl.data("g").Xp.cur

        girl.find('.bar-wrap[rel="xp"] #xpTool').remove();
        girl.find('.bar-wrap[rel="xp"]').append('<span id="xpTool" class="infoTooltip xpTooltip">XP: ' + nThousand(girl.data("g").Xp.cur) + '</span>');

        if( xp_total_remaining > 0)
            girl.find('.bar-wrap[rel="xp"] .over').text('->' + nThousand(xp_next_remaining) + '; Max: ' + nThousand(xp_total_remaining));
    }

    function updateGirlAff(girl) {
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
    mythicGirls.push({affection: 28125, money: 11300000, kobans: 5628, taffection: 43875, tmoney: 17600000, tkobans: 10428});
    mythicGirls.push({affection: 56250 , money: 22500000, kobans: 9000, taffection: 100125, tmoney: 40100000, tkobans: 19428});
    mythicGirls.push({affection: 112500, money: 45000000, kobans: 15000, taffection: 212625, tmoney: 85100000, tkobans: 34428});
    mythicGirls.push({affection: 225000, money: 90000000, kobans: 18000, taffection: 437625, tmoney: 175100000, tkobans: 52428});
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
                if (hh_nutaku) {
                    stats.kobans += Math.ceil((EvoReq[girl.rarity][nbgrades - 1].tkobans - currentLevelKobans) / 6);
                }
                else {
                    stats.kobans += EvoReq[girl.rarity][nbgrades - 1].tkobans - currentLevelKobans;
                }
            }

            var expToMax = (GIRLS_EXP_LEVELS[girl.rarity][Hero.infos.level - 2] - girl.Xp.cur);
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
            var	marketBookTxt = lsMarket.buyable.potion.Nb + ' ' + texts[lang].books + ' (' + nThousand(lsMarket.buyable.potion.Xp) + ' ' + texts[lang].Xp + ')',
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
        '- ' + stats.caracs[1] + ' ' + texts[lang].hardcore + ', ' + stats.caracs[2] + ' ' + texts[lang].charm + ', ' + stats.caracs[3] + ' ' + texts[lang].know_how + '<br />- '
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
                //for Wiki FR
                var girlName = girl.Name.replaceAll("’", "-").replaceAll("/", "-");
                if (girl.id_girl == 145462484)
                    girlName = girlName.concat('-', 'Usagi');

                if ($('#hh_comix').length == 0) {
                    if (!girl.own) {
                        if (HH_UNIVERSE == 'gay') {
                            $(this).find('.middle_part.missing_girl .dialog-box p').after('<div class="WikiLinkDialogbox"><a href="https://harem-battle.club/wiki/Gay-Harem/GH:' + girl.Name + '" target="_blank"> ' + girl.Name + texts[lang].wiki + ' </a></div>');
                        }
                        else if (lang == 'fr') {
                            $(this).find('.middle_part.missing_girl .dialog-box p').after('<div class="WikiLinkDialogbox"><a href="http://hentaiheroes.wikidot.com/' + girlName + '" target="_blank"> ' + texts[lang].wiki + girl.Name + ' </a></div>');
                        }
                        else {
                            $(this).find('.middle_part.missing_girl .dialog-box p').after('<div class="WikiLinkDialogbox"><a href="https://harem-battle.club/wiki/Harem-Heroes/HH:' + girlName + '" target="_blank"> ' + girl.Name + texts[lang].wiki + ' </a></div>');
                        }
                    }
                    if (girl.own) {
                        if (HH_UNIVERSE == 'gay') {
                            $(this).find('.middle_part h3').after('<div class="WikiLink"><a href="https://harem-battle.club/wiki/Gay-Harem/GH:' + girl.Name + '" target="_blank"> ' + girl.Name + texts[lang].wiki + ' </a></div>');
                        }
                        else if (lang == 'fr') {
                            $(this).find('.middle_part h3').after('<div class="WikiLink"><a href="http://hentaiheroes.wikidot.com/' + girlName + '" target="_blank"> ' + texts[lang].wiki + girl.Name + ' </a></div>');
                        }
                        else {
                            $(this).find('.middle_part h3').after('<div class="WikiLink"><a href="https://harem-battle.club/wiki/Harem-Heroes/HH:' + girlName + '" target="_blank"> ' + girl.Name + texts[lang].wiki + ' </a></div>');
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
                        if (hh_nutaku) {
                            kobans = Math.ceil((EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans) / 6);
                        }
                        else {
                            kobans = EvoReq[girl.rarity][j - 1].tkobans - currentLevelKobans;
                        }
                    }
                    else {
                        aff = EvoReq[girl.rarity][j - 1].taffection - girl.Affection.cur;
                        money = EvoReq[girl.rarity][j - 1].tmoney - currentLevelMoney;
                        if (hh_nutaku) {
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
    var playersTotal;
    var challengesLeft;
    var challengesPossibleMinutes;
    var challengesPossible;
    var challengesDone = 0;
    var playerCurrentParse;
    var playerCurrentPos;
    var playerCurrentPoints;
    var maxDemoteParse;
    var maxDemotePoints;
    var maxDemoteDiff;
    var maxDemoteDisplay;
    var textDemote;
    var maxStagnateParse;
    var maxStagnatePoints;
    var maxStagnateDiff;
    var maxStagnateDisplay;
    var textStagnate;
    var minTop4Parse;
    var minTop4Points;
    var minTop4Diff;
    var minTop4Display;
    var textTop4;
    var minTop15Points;
    var textTop15;
    var minTop15Display;
    var minTop30Parse;
    var minTop30Points;
    var minTop30Diff;
    var minTop30Display;
    var textTop30;
    var avgScore;
    var scoreExpected;
    var playerSelectedPos;
    var playerSelectedPoints;
    var top4Points;
    var top5Points;
    var top15Points;
    var top16Points;
    var top30Points;
    var top31Points;
    var topDemotePoints;
    var topNonDemotePoints;

    var	includeBoard = false;

    if (loadSetting('leagueBoard')) {
        includeBoard = true;
    }

    challengesPossibleMinutes = parseInt(Math.floor(season_end_at/60), 10);
    challengesPossible = (Hero.energies.challenge.amount != Hero.energies.challenge.max_amount)? Math.floor((challengesPossibleMinutes + (35 - Hero.energies.challenge.next_refresh_ts / 60))/35) + parseInt(Hero.energies.challenge.amount, 10) : Math.floor(challengesPossibleMinutes/35) + parseInt(Hero.energies.challenge.amount, 10);

    playersTotal = $('.leagues_table .lead_table_view tbody.leadTable')[0].children.length;

    for(var i=0; i<playersTotal; i++) {
        var playerData = $('.leagues_table .lead_table_view tbody.leadTable')[0].children[i];
        var fightsDone = 0;
        if (playerData.className.indexOf('selected-player-leagues') != -1) {
            var fightsData = playerData.childNodes[7].childNodes[1].childNodes[3].childNodes[5].childNodes
            for (var j=0; j<fightsData.length; j++){
                if (fightsData[j].className != 'result')
                    fightsDone ++;
            }
            playerSelectedPos = parseInt(playerLeaguesData.rank, 10);
            playerSelectedPoints = parseInt(playerLeaguesData.points.replace(/\D/g, ''), 10);

            switch (playerSelectedPos) {
                case 4:
                    top4Points = playerSelectedPoints;
                    break;
                case 5:
                    top5Points = playerSelectedPoints;
                    break;
                case 15:
                    top15Points = playerSelectedPoints;
                    break;
                case 16:
                    top16Points = playerSelectedPoints;
                    break;
                case 30:
                    top30Points = playerSelectedPoints;
                    break;
                case 31:
                    top31Points = playerSelectedPoints;
                    break;
                case (playersTotal-14):
                    topDemotePoints = playerSelectedPoints;
                    break;
                case (playersTotal-15):
                    topNonDemotePoints = playerSelectedPoints;
                    break;
            }
        }
        else {
            var fightsStr = playerData.children[3].innerText;
            var pos = parseInt(playerData.children[0].innerText, 10);
            var points = parseInt(playerData.children[4].innerText.replace(/\D/g, ''), 10);

            switch (pos) {
                case 4:
                    top4Points = points;
                    break;
                case 5:
                    top5Points = points;
                    break;
                case 15:
                    top15Points = points;
                    break;
                case 16:
                    top16Points = points;
                    break;
                case 30:
                    top30Points = points;
                    break;
                case 31:
                    top31Points = points;
                    break;
                case (playersTotal-14):
                    topDemotePoints = points;
                    break;
                case (playersTotal-15):
                    topNonDemotePoints = points;
                    break;
            }

            if (fightsStr == '-') {
                fightsDone = 0;
                playerCurrentParse = playerData;
            }
            else
                fightsDone = parseInt(fightsStr.substring(0,1), 10);
        }
        challengesDone += fightsDone;
    }

    challengesLeft = 3*(playersTotal-1)-challengesDone;

    playerCurrentPos = parseInt(playerCurrentParse.children[0].innerText, 10);
    playerCurrentPoints = parseInt(playerCurrentParse.children[4].innerText.replace(/\D/g, ''), 10);

    avgScore = (challengesDone != 0) ? playerCurrentPoints/challengesDone : 0;
    scoreExpected = Math.floor(avgScore*3*(playersTotal-1));

    var leagueScore = {
        points: playerCurrentPoints,
        avg: Math.round(avgScore*100)/100
    }
    var oldScore = JSON.parse(localStorage.getItem('leagueScore')) || {points: 0, avg: 0};
    var oldPoints = oldScore.points;
    if (playerCurrentPoints > oldPoints) {
        localStorage.setItem('leagueScore', JSON.stringify(leagueScore));
    }

    if (playerCurrentPos > (playersTotal - 15)) {
        maxDemotePoints = topNonDemotePoints;
        maxDemoteDiff = maxDemotePoints - playerCurrentPoints;
        if (playerCurrentPoints == 0 && maxDemotePoints == 0) {
            maxDemoteDisplay = '±' + nThousand(maxDemoteDiff);
            textDemote = texts[lang].demote_holdzero;
        }
        else {
            maxDemoteDisplay = '+' + nThousand(maxDemoteDiff);
            textDemote = texts[lang].demote_up;
        }
    }
    else {
        maxDemotePoints = topDemotePoints
        maxDemoteDiff = maxDemotePoints - playerCurrentPoints;
        if (playerCurrentPoints == 0 && maxDemotePoints == 0) {
            maxDemoteDisplay = '±' + nThousand(maxDemoteDiff);
            textDemote = texts[lang].demote_holdzero;
        }
        else {
            if (maxDemoteDiff == 0) {
                maxDemoteDisplay = '-' + nThousand(maxDemoteDiff);
            }
            else {
                maxDemoteDisplay = nThousand(maxDemoteDiff);
            }
            textDemote = texts[lang].demote_down;
        }
    }

    if (playerCurrentPos > 15) {
        maxStagnatePoints = top15Points;
        maxStagnateDiff = maxStagnatePoints - playerCurrentPoints;
        minTop15Points = maxStagnatePoints + 1;
        if (playerCurrentPoints == 0 && maxStagnatePoints == 0) {
            maxStagnateDisplay = '±' + nThousand(maxStagnateDiff);
            minTop15Display = '±' + nThousand(maxStagnateDiff+1);
            textStagnate = texts[lang].stagnate_holdzero;
            textTop15 = texts[lang].top15_up;
        }
        else {
            maxStagnateDisplay = '+' + nThousand(maxStagnateDiff);
            minTop15Display = '+' + nThousand(maxStagnateDiff+1);
            textStagnate = texts[lang].stagnate_up;
            textTop15 = texts[lang].top15_up;
        }
    }
    else {
        maxStagnatePoints = top16Points;
        maxStagnateDiff = maxStagnatePoints - playerCurrentPoints;
        minTop15Points = top16Points;
        if (playerCurrentPoints == 0 && maxStagnatePoints == 0) {
            maxStagnateDisplay = '±' + nThousand(maxStagnateDiff);
            minTop15Display = '±' + nThousand(maxStagnateDiff);
            textStagnate = texts[lang].stagnate_holdzero;
            textTop15 = texts[lang].top15_hold;
        }
        else {
            if (maxStagnateDiff == 0) {
                maxStagnateDisplay = '-' + nThousand(maxStagnateDiff);
                minTop15Display = '-' + nThousand(maxStagnateDiff);
            }
            else {
                maxStagnateDisplay = nThousand(maxStagnateDiff);
                minTop15Display = nThousand(maxStagnateDiff);
            }
            textStagnate = texts[lang].stagnate_down;
            textTop15 = texts[lang].top15_hold;
        }
    }

    if (playerCurrentPos > 30) {
        minTop30Points = top30Points + 1;
        minTop30Diff = minTop30Points - playerCurrentPoints;
        if (minTop30Diff > 0) {
            minTop30Display = '+' + (nThousand(minTop30Diff));
            textTop30 = texts[lang].top30_up;
        }
        else {
            minTop30Display = nThousand(minTop30Diff);
            textTop30 = texts[lang].top30_hold;
        }
    }
    else {
        minTop30Points = top31Points;
        minTop30Diff = minTop30Points - playerCurrentPoints;
        if (minTop30Diff < 0) {
            minTop30Display = nThousand(minTop30Diff);
            textTop30 = texts[lang].top30_hold;
        }
        else {
            minTop30Display = '+' + (nThousand(minTop30Diff));
            textTop30 = texts[lang].top30_hold;
        }
    }

    if (playerCurrentPos > 4) {
        minTop4Points = top4Points + 1;
        minTop4Diff = minTop4Points - playerCurrentPoints;
        if (minTop4Diff > 0) {
            minTop4Display = '+' + (nThousand(minTop4Diff));
            textTop4 = texts[lang].top4_up;
        }
        else {
            minTop4Display = nThousand(minTop4Diff);
            textTop4 = texts[lang].top4_hold;
        }
    }
    else {
        minTop4Points = top5Points;
        minTop4Diff = minTop4Points - playerCurrentPoints;
        if (minTop4Diff > 0) {
            minTop4Display = '+' + (nThousand(minTop4Diff));
            textTop4 = texts[lang].top4_hold;
        }
        else {
            minTop4Display = nThousand(minTop4Diff);
            textTop4 = texts[lang].top4_hold;
        }
    }

    if (league_tag == 9) {
        $('div.league_end_in').append('<div class="scriptLeagueInfo">'
                                      + '<span class="averageScore"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 2px;">' + nThousand(Math.round(avgScore*100)/100)
                                      + '<span class="scriptLeagueInfoTooltip averageScoreTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                      + '<span class="possibleChallenges"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + challengesPossible + '/' + challengesLeft
                                      + '<span class="scriptLeagueInfoTooltip possibleChallengesTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                      + '<span class="minTop4"><img src="https://www.flaticon.com/premium-icon/icons/svg/3840/3840753.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + minTop4Display
                                      + '<span class="scriptLeagueInfoTooltip minTop4Tooltip">' + textTop4 + nThousand(minTop4Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="minTop15"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/France_road_sign_B14_%2815%29.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + minTop15Display
                                      + '<span class="scriptLeagueInfoTooltip minTop15Tooltip">' + textTop15 + nThousand(minTop15Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="minTop30"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + minTop30Display
                                      + '<span class="scriptLeagueInfoTooltip minTop30Tooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="maxDemote"><img src="https://www.flaticon.com/svg/static/icons/svg/212/212020.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + maxDemoteDisplay
                                      + '<span class="scriptLeagueInfoTooltip maxDemoteTooltip">' + textDemote + nThousand(maxDemotePoints) + ' ' + texts[lang].points + '.</span></span>'
                                      + '</div>');



        $('#tower_of_fame .border-gradient .lead_wrapper .leagues-btn-mobile-refill-multi').append('<span class="scriptMobileLeagueInfo">'
                                                                                                   + '<span class="averageScoreMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 5px;"> ' + nThousand(Math.round(avgScore*100)/100)
                                                                                                   + '<span class="scriptLeagueInfoTooltip averageScoreMobileTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                                                                                   + '<span class="possibleChallengesMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + challengesPossible + '/' + challengesLeft
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip possibleChallengesMobileTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                                                                                   + '<span class="minTop4Mobile"><img src="https://www.flaticon.com/premium-icon/icons/svg/3840/3840753.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + minTop4Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop4MobileTooltip">' + textTop4 + nThousand(minTop4Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="minTop15Mobile"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/France_road_sign_B14_%2815%29.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + minTop15Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop15MobileTooltip">' + textTop15 + nThousand(minTop15Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="minTop30Mobile"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + minTop30Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop30MobileTooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="maxDemoteMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/212/212020.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + maxDemoteDisplay
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip maxDemoteMobileTooltip">' + textDemote + nThousand(maxDemotePoints) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '</span>');

        if (includeBoard == false) {
            $('.minTop4').empty();
            $('.minTop15').empty();
            $('.minTop30').empty();
            $('.minTop4Mobile').empty();
            $('.minTop15Mobile').empty();
            $('.minTop30Mobile').empty();
        }
    }
    else if (league_tag == 1) {
        $('div.league_end_in').append('<span class="scriptLeagueInfo">'
                                      + '<span class="averageScore"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 2px;"> ' + nThousand(Math.round(avgScore*100)/100)
                                      + '<span class="scriptLeagueInfoTooltip averageScoreTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                      + '<span class="possibleChallenges"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 7px; margin-bottom: 2px;"> ' + challengesPossible + '/' + challengesLeft
                                      + '<span class="scriptLeagueInfoTooltip possibleChallengesTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                      + '<span class="maxStagnate"><img src="https://i.postimg.cc/HnkyDtG3/icon-league-hold.png" style="margin-left: 7px; margin-bottom: 2px;"> ' + maxStagnateDisplay
                                      + '<span class="scriptLeagueInfoTooltip maxStagnateTooltip">' + textStagnate + nThousand(maxStagnatePoints) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="minTop30"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 7px; margin-bottom: 2px;"> ' + minTop30Display
                                      + '<span class="scriptLeagueInfoTooltip minTop30Tooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '</span>');

        $('#tower_of_fame .border-gradient .lead_wrapper .leagues-btn-mobile-refill-multi').append('<span class="scriptMobileLeagueInfo">'
                                                                                                   + '<span class="averageScoreMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 5px;"> ' + nThousand(Math.round(avgScore*100)/100)
                                                                                                   + '<span class="scriptLeagueInfoTooltip averageScoreMobileTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                                                                                   + '<span class="possibleChallengesMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 7px; margin-bottom: 2px;"> ' + challengesPossible + '/' + challengesLeft
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip possibleChallengesMobileTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                                                                                   + '<span class="maxStagnateMobile"><img src="https://i.postimg.cc/HnkyDtG3/icon-league-hold.png" style="margin-left: 7px; margin-bottom: 5px;"> ' + maxStagnateDisplay
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip maxStagnateMobileTooltip">' + textStagnate + nThousand(maxStagnatePoints) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="minTop30Mobile"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 7px; margin-bottom: 5px;"> ' + minTop30Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop30MobileTooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '</span>');

        if (includeBoard == false) {
            $('.minTop30').empty();
            $('.minTop30Mobile').empty();
        }
    }
    else {
        $('div.league_end_in').append('<span class="scriptLeagueInfo">'
                                      + '<span class="averageScore"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 2px;"> ' + nThousand(Math.round(avgScore*100)/100)
                                      + '<span class="scriptLeagueInfoTooltip averageScoreTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                      + '<span class="possibleChallenges"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + challengesPossible + '/' + challengesLeft
                                      + '<span class="scriptLeagueInfoTooltip possibleChallengesTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                      + '<span class="minTop4"><img src="https://www.flaticon.com/premium-icon/icons/svg/3840/3840753.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;">' + minTop4Display
                                      + '<span class="scriptLeagueInfoTooltip minTop4Tooltip">' + textTop4 + nThousand(minTop4Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="maxStagnate"><img src="https://i.postimg.cc/HnkyDtG3/icon-league-hold.png" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + maxStagnateDisplay
                                      + '<span class="scriptLeagueInfoTooltip maxStagnateTooltip">' + textStagnate + nThousand(maxStagnatePoints) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="minTop30"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + minTop30Display
                                      + '<span class="scriptLeagueInfoTooltip minTop30Tooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                      + '<span class="maxDemote"><img src="https://www.flaticon.com/svg/static/icons/svg/212/212020.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + maxDemoteDisplay
                                      + '<span class="scriptLeagueInfoTooltip maxDemoteTooltip">' + textDemote + nThousand(maxDemotePoints) + ' ' + texts[lang].points + '.</span></span>'
                                      + '</span>');

        $('#tower_of_fame .border-gradient .lead_wrapper .leagues-btn-mobile-refill-multi').append('<span class="scriptMobileLeagueInfo">'
                                                                                                   + '<span class="averageScoreMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/1753/1753830.svg" style="height: 15px; width: 16px; margin-left: 2px; margin-bottom: 5px;"> ' + nThousand(Math.round(avgScore*100)/100)
                                                                                                   + '<span class="scriptLeagueInfoTooltip averageScoreMobileTooltip">' + texts[lang].averageScore + nThousand(Math.round(avgScore*100)/100) + '<BR>' + texts[lang].scoreExpected + nThousand(scoreExpected) + '</span></span>'
                                                                                                   + '<span class="possibleChallengesMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/551/551227.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + challengesPossible + '/' + challengesLeft
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip possibleChallengesMobileTooltip">' + texts[lang].challenges_regen + challengesPossible + texts[lang].challenges_left + challengesLeft + '</span></span>'
                                                                                                   + '<span class="minTop4Mobile"><img src="https://www.flaticon.com/premium-icon/icons/svg/3840/3840753.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + minTop4Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop4MobileTooltip">' + textTop4 + nThousand(minTop4Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="maxStagnateMobile"><img src="https://i.postimg.cc/HnkyDtG3/icon-league-hold.png" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + maxStagnateDisplay
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip maxStagnateMobileTooltip">' + textStagnate + nThousand(maxStagnatePoints) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="minTop30Mobile"><img src="https://www.flaticon.com/premium-icon/icons/svg/2773/2773307.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 5px;"> ' + minTop30Display
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip minTop30MobileTooltip">' + textTop30 + nThousand(minTop30Points) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '<span class="maxDemoteMobile"><img src="https://www.flaticon.com/svg/static/icons/svg/212/212020.svg" style="height: 15px; width: 16px; margin-left: 6px; margin-bottom: 2px;"> ' + maxDemoteDisplay
                                                                                                   + '<span class="scriptMobileLeagueInfoTooltip maxDemoteMobileTooltip">' + textDemote + nThousand(maxDemotePoints) + ' ' + texts[lang].points + '.</span></span>'
                                                                                                   + '</span>');

        if (includeBoard == false) {
            $('.minTop4').empty();
            $('.minTop4Mobile').empty();
            $('.minTop30').empty();
            $('.minTop30Mobile').empty();
        }
    }

    //CSS
    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#leagues_middle .league_end_in {'
                     + 'line-height: 16px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.scriptLeagueInfo {'
                     + 'font-size: 13px; '
                     + 'display: block; '
                     + 'float: right; '
                     + 'margin-right: 3px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.scriptLeagueInfo {'
                     + 'display: none;}}'
                    );

    sheet.insertRule('.scriptLeagueInfoTooltip {'
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
                     + 'z-index: 9;}'
                    );

    sheet.insertRule('.scriptLeagueInfoTooltip::after {'
                     + 'content: " "; '
                     + 'position: absolute; '
                     + 'bottom: 100%; '
                     + 'left: 50%; '
                     + 'margin-left: -10px; '
                     + 'border-width: 10px; '
                     + 'border-style: solid; '
                     + 'border-color: transparent transparent #905312 transparent;}'
                    );

    sheet.insertRule('.kobanWinningsTooltip {'
                     + 'top: 65px; '
                     + 'margin-left: -95px;}'
                    );

    sheet.insertRule('.kobanWinnings:hover .kobanWinningsTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.averageScoreTooltip {'
                     + 'top: 65px; '
                     + 'margin-left: -135px;}'
                    );

    sheet.insertRule('.averageScore:hover .averageScoreTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.possibleChallengesTooltip {'
                     + 'top: 65px; '
                     + 'margin-left: -110px;}'
                    );

    sheet.insertRule('.possibleChallenges:hover .possibleChallengesTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.maxStagnateTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 65px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.maxStagnate:hover .maxStagnateTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop4Tooltip {'
                     + 'max-width: 190px; '
                     + 'top: 65px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop4:hover .minTop4Tooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop15Tooltip {'
                     + 'max-width: 190px; '
                     + 'top: 65px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop15:hover .minTop15Tooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop30Tooltip {'
                     + 'max-width: 190px; '
                     + 'top: 65px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop30:hover .minTop30Tooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop45Tooltip {'
                     + 'max-width: 190px; '
                     + 'top: 65px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop45:hover .minTop45Tooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.maxDemoteTooltip {'
                     + 'max-width: 170px; '
                     + 'top: 65px; '
                     + 'margin-left: -100px;}'
                    );

    sheet.insertRule('.maxDemote:hover .maxDemoteTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.scriptMobileLeagueInfo {'
                     + 'position : absolute; '
                     + 'width : 400px; '
                     + 'left : -430px; '
                     + 'top : 25px; '
                     + 'font-size: 14px; '
                     + 'display: block; '
                     + 'float: right; '
                     + 'margin-right: 10px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.scriptMobileLeagueInfo {'
                     + 'display: none;}}'
                    );

    sheet.insertRule('.scriptMobileLeagueInfoTooltip {'
                     + 'visibility: hidden; '
                     + 'font-size: 14px; '
                     + 'background-color: black; '
                     + 'color: #fff; '
                     + 'text-align: center; '
                     + 'padding: 3px 5px 3px 5px; '
                     + 'border: 2px solid #905312; '
                     + 'border-radius: 6px; '
                     + 'background-color: rgba(32,3,7,.9); '
                     + 'position: absolute; '
                     + 'margin-top: 5px; '
                     + 'z-index: 9;}'
                    );

    sheet.insertRule('.scriptMobileLeagueInfoTooltip::after {'
                     + 'content: " "; '
                     + 'position: absolute; '
                     + 'bottom: 100%; '
                     + 'left: 50%; '
                     + 'margin-left: -10px; '
                     + 'border-width: 10px; '
                     + 'border-style: solid; '
                     + 'border-color: transparent transparent #905312 transparent;}'
                    );

    sheet.insertRule('.averageScoreMobileTooltip {'
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.averageScoreMobile:hover .averageScoreMobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.possibleChallengesMobileTooltip {'
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.possibleChallengesMobile:hover .possibleChallengesMobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.maxStagnateMobileTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.maxStagnateMobile:hover .maxStagnateMobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop4MobileTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop4Mobile:hover .minTop4MobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop15MobileTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop15Mobile:hover .minTop15MobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop30MobileTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop30Mobile:hover .minTop30MobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.minTop45MobileTooltip {'
                     + 'max-width: 190px; '
                     + 'top: 25px; '
                     + 'margin-left: -115px;}'
                    );

    sheet.insertRule('.minTop45Mobile:hover .minTop45MobileTooltip {'
                     + 'visibility: visible;}'
                    );

    sheet.insertRule('.maxDemoteMobileTooltip {'
                     + 'max-width: 170px; '
                     + 'top: 25px; '
                     + 'margin-left: -100px;}'
                    );

    sheet.insertRule('.maxDemoteMobile:hover .maxDemoteMobileTooltip {'
                     + 'visibility: visible;}'
                    );

    function removeBeatenOpponents() {
        var board = document.getElementsByClassName("leadTable")[0];
        if(!board)
            return;
        var opponents = board.getElementsByTagName("tr");
        for (var i=0; i<opponents.length; i++) {
            try {
                if(opponents[i].getElementsByTagName("td")[3].innerHTML === "3/3"){
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
                if(opponents[i].getElementsByTagName("td")[3].innerHTML === "3/3"){
                    opponents[i].style.display=""
                }
            } catch(e) {}
        }
    }

    let hidden = loadSetting('hide_beaten');
    $(".league_end_in").append('<button id="beaten_opponents" class="blue_button_L"><span id="hide_beaten"></span></button>');
    $('div.leagues-btn-mobile-refill-multi').append('<button id="beaten_opponents_mobile" class="blue_button_L"><span id="hide_beaten_mobile"></span></button>');

    if (hidden == 1) {
        removeBeatenOpponents();
        $('#hide_beaten').html(texts[lang].display);
        $('#hide_beaten_mobile').html(texts[lang].display);
    }
    else {
        $('#hide_beaten').html(texts[lang].hide);
        $('#hide_beaten_mobile').html(texts[lang].hide);
    }

    let button = document.querySelector('#beaten_opponents');
    button.addEventListener('click', function(){
        if (hidden == 0) {
            removeBeatenOpponents();
            hidden = 1;
            localStorage.setItem('HHS.hide_beaten', 1);
            $('#hide_beaten').html(texts[lang].display);
            $('#hide_beaten_mobile').html(texts[lang].display);
        }
        else {
            displayBeatenOpponents();
            hidden = 0;
            localStorage.setItem('HHS.hide_beaten', 0);
            $('#hide_beaten').html(texts[lang].hide);
            $('#hide_beaten_mobile').html(texts[lang].hide);
        }
    });

    let buttonMobile = document.querySelector('#beaten_opponents_mobile');
    buttonMobile.addEventListener('click', function(){
        if (hidden == 0) {
            removeBeatenOpponents();
            hidden = 1;
            localStorage.setItem('HHS.hide_beaten', 1);
            $('#hide_beaten').html(texts[lang].display);
            $('#hide_beaten_mobile').html(texts[lang].display);
        }
        else {
            displayBeatenOpponents();
            hidden = 0;
            localStorage.setItem('HHS.hide_beaten', 0);
            $('#hide_beaten').html(texts[lang].hide);
            $('#hide_beaten_mobile').html(texts[lang].hide);
        }
    });

    let sort_by = document.querySelectorAll('span[sort_by]');
    for (var sort of sort_by) {
        sort.addEventListener('click', function(){
            if (hidden == 1)
                removeBeatenOpponents();
            displayLeaguePlayersClass();
        });
    }

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#beaten_opponents_mobile {'
                     + 'position: absolute;'
                     + 'height: 32px;'
                     + 'top: 50px;'
                     + 'right: 517px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#beaten_opponents_mobile {'
                     + 'display: none;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#hide_beaten_mobile {'
                     + 'position: relative;'
                     + 'top: -8px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#beaten_opponents {'
                     + 'position: absolute;'
                     + 'height: 28px;'
                     + 'top: 7px;'
                     + 'right: 696px;}}'
                    );

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '#hide_beaten {'
                     + 'position: relative;'
                     + 'top: -5px;}}'
                    );

    function displayLeaguePlayersClass() {
        if (localStorage.getItem('newLeagueResults') == null) {
            localStorage.removeItem('leagueResults');
            localStorage.setItem('newLeagueResults', 1)
        }

        for(var i=0; i<playersTotal; i++) {
            var playerData = $('.leagues_table .lead_table_view tbody.leadTable tr:nth-child(' + (i+1) + ')');
            var playerId = playerData.attr('sorting_id');
            var leaguePlayers = localStorage.getItem('leagueResults');
            if (leaguePlayers != null) {
                var data = JSON.parse(leaguePlayers)
                var player = data[playerId]
                if (player != undefined) {
                    var playerClass = player.class;

                    switch (playerClass) {
                        case 1:
                        playerData.find('.square-avatar-wrapper').append($('<img class="classLeague" src="https://hh2.hh-content.com/caracs/hardcore.png">'));
                        break;

                        case 2:
                        playerData.find('.square-avatar-wrapper').append($('<img class="classLeague" src="https://hh2.hh-content.com/caracs/charm.png">'));
                        break;

                        case 3:
                        playerData.find('.square-avatar-wrapper').append($('<img class="classLeague" src="https://hh2.hh-content.com/caracs/knowhow.png">'));
                        break;
                    }
                }
            }
        }
        sheet.insertRule('@media only screen and (min-width: 1026px) {'
                         + '.classLeague {'
                         + 'position: relative !important;'
                         + 'height: 17px !important;'
                         + 'width: 17px !important;'
                         + 'left: 25px !important;'
                         + 'border: none !important;}}'
                        );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '.classLeague {'
                         + 'position: relative !important;'
                         + 'height: 25px !important;'
                         + 'width: 25px !important;'
                         + 'left: 45px !important;'
                         + 'border: none !important;}}'
                        );
    }

    displayLeaguePlayersClass();
}

/* ============
	LEAGUE SIM
   ============ */

function moduleSim() {
    var playerEgo;
    //var playerEgoCheck;
    var playerDef;
    var playerAtk;
    var playerDef;
    var playerClass;
    /*var playerGirl1;
    var playerGirl2;
    var playerGirl3;
    var playerGirl4;
    var playerGirl5;
    var playerGirl6;
    var playerGirl7;*/

    var opponentEgo;
    var opponentEgoStr;
    var opponentOriginEgo;
    var opponentDef;
    var opponentDefStr;
    var opponentAtk;
    var opponentAtkStr;
    var opponentClass;
    /*var opponentAlpha;
    var opponentBeta;
    var opponentOmega;*/

    var matchRating;

    function calculatePower() {
        // INIT
        playerClass = $('#leagues_left .icon').attr('carac');
        playerEgo = Math.round(Hero.infos.caracs.ego);
        playerAtk = Math.round(Hero.infos.caracs.damage);
        playerDef = Math.round(Hero.infos.caracs.defense);
        /*playerAlpha = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=1]').attr('data-new-girl-tooltip'));
        playerBeta = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=2]').attr('data-new-girl-tooltip'));
        playerOmega = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=3]').attr('data-new-girl-tooltip'));*/

        opponentClass = $('#leagues_right .icon').attr('carac');
        opponentEgoStr = $('#leagues_right .stat')[1].innerText;
        opponentEgo = (opponentEgoStr.includes('.') || opponentEgoStr.includes(',')) ? parseInt(opponentEgoStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentEgoStr.includes('K')) ? parseInt(opponentEgoStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentEgoStr.replace(/[^0-9]/gi, ''), 10);
        opponentOriginEgo = (opponentEgoStr.includes('.') || opponentEgoStr.includes(',')) ? parseInt(opponentEgoStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentEgoStr.includes('K')) ? parseInt(opponentEgoStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentEgoStr.replace(/[^0-9]/gi, ''), 10);
        opponentAtkStr = $('#leagues_right .stat')[0].innerText;
        opponentAtk = (opponentAtkStr.includes('.') || opponentAtkStr.includes(',')) ? parseInt(opponentAtkStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentAtkStr.includes('K')) ? parseInt(opponentAtkStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentAtkStr.replace(/[^0-9]/gi, ''), 10);
        opponentDefStr = $('#leagues_right .stat')[2].innerText;
        opponentDef = (opponentDefStr.includes('.') || opponentDefStr.includes(',')) ? parseInt(opponentDefStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentDefStr.includes('K')) ? parseInt(opponentDefStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentDefStr.replace(/[^0-9]/gi, ''), 10);

        /*opponentAlpha = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=1]').attr('data-new-girl-tooltip'));
        opponentBeta = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=2]').attr('data-new-girl-tooltip'));
        opponentOmega = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=3]').attr('data-new-girl-tooltip'));

        let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
        let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];*/

        let player = {
            ego: playerEgo,
            originEgo: Math.round(Hero.infos.caracs.ego),
            atk: playerAtk,
            def: playerDef,

            /*alpha: playerAlpha,
            beta: playerBeta,
            omega: playerOmega,
            team: playerTeam,*/

            text: 'Player',
        };

        let opponent = {
            ego: opponentEgo,
            originEgo: opponentOriginEgo,
            atk: opponentAtk,
            def: opponentDef,

            /*alpha: opponentAlpha,
            beta: opponentBeta,
            omega: opponentOmega,
            team: opponentTeam,*/

            text: 'Opponent',
            name: $('#leagues_right .player_block .title').text()
        };

        let simu = simuFight(player, opponent);

        $('.matchRating').remove();

        $('#leagues_right .average-lvl').append('<div class="matchRating ' + simu.scoreClass + '">' + simu.scoreStr + ' / ' + simu.pointsStr + '</div>');
        $('.lead_table_default > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) .level').append('<span class="matchRating ' + simu.scoreClass + '">' + simu.scoreStr + ' / ' + simu.pointsStr + '</span>');

        saveVictories();
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

    function saveVictories() {
        let leagueDateInit = (DST == true) ? 11*3600 : 12*3600;

        let current_date_ts = Math.floor(new Date().getTime()/1000);
        let date_end_league = leagueDateInit + Math.ceil((current_date_ts - leagueDateInit)/604800)*604800;

        let time_results = localStorage.getItem('leagueTime');
        if (time_results == null) {
            time_results = date_end_league;
            localStorage.setItem('leagueTime', time_results);
            localStorage.setItem('leagueResults', null);
        }
        //Next Thursday after non-DST at 12:00 UTC
        if (time_results == 1636023600) {
            time_results = 1636027200
            localStorage.setItem('leagueTime', time_results);
        }

        if (current_date_ts > time_results) {
            localStorage.setItem('oldLeagueResults', localStorage.getItem('leagueResults'));
            localStorage.setItem('oldLeagueTime', localStorage.getItem('leagueTime'));
            localStorage.setItem('oldLeaguePlayers', localStorage.getItem('leaguePlayers'));
            localStorage.setItem('oldLeagueScore', localStorage.getItem('leagueScore'));
            localStorage.setItem('oldLeagueUnknown', localStorage.getItem('leagueUnknown'));
            localStorage.removeItem('leagueResults');
            localStorage.setItem('leagueTime', date_end_league);
            localStorage.removeItem('leagueScore');
            localStorage.removeItem('leagueUnknown');
        }

        let data = JSON.parse(localStorage.getItem('leagueResults')) || {};
        let player = $('#leagues_right .player_block .avatar_border > img').attr('onclick').slice(22,-3);
        let spec = $('#leagues_right .player_block .icon').attr('carac').slice(5);
        let results = $('#leagues_right .challenge .result');
        let nb_victories = 0;
        let nb_defeats = 0;

        for(let i = 0; i < results.length; ++i) {
            let result = results.eq(i);

            if( ((result.text() == 'V') && (($('html')[0].lang === 'fr') || ($('html')[0].lang === 'it_IT'))) || (result.text() == 'W') || (result.text() == 'S') || (result.text() == '勝'))
                ++nb_victories;
            if( (result.text() == 'D') || (result.text() == 'L') || (result.text() == 'P') || ((result.text() == 'V') && ($('html')[0].lang === 'de_DE')) || (result.text() == '負'))
                ++nb_defeats;
        }

        data[player] = {
            victories: nb_victories,
            defeats: nb_defeats,
            class: parseInt(spec, 10),
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
            var played = 0;
            if (players[i].className.indexOf('lead_table_default') != -1) {
                if ($('.lead_table_default .result').length != 0)
                    played = parseInt($('.lead_table_default .won').length + $('.lead_table_default .lost').length, 10);
                else
                    played = parseInt(players[i].children[3].innerText.split('/')[0], 10) || 0;
            }
            else {
                played = parseInt(players[i].children[3].innerText.split('/')[0], 10) || 0;
            }
            fightsPlayed += played;
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

        $('span.possibleChallenges span.scriptLeagueInfoTooltip.possibleChallengesTooltip span#leagueStats').empty();
        $('span.scriptLeagueInfoTooltip.possibleChallengesTooltip').append('<span id="leagueStats"><BR><BR><u>' + texts[lang].current_league + '</u>'
                                                                           + '<BR>' + texts[lang].victories + ' : ' + tot_victory + '/' + 3*nb_opponents
                                                                           + '<BR>' + texts[lang].defeats + ' : ' + tot_defeat + '/' + 3*nb_opponents
                                                                           + '<BR>' + texts[lang].unknown + ' : ' + nb_unknown + '/' + 3*nb_opponents
                                                                           + '<BR>' + texts[lang].notPlayed + ' : ' + tot_notPlayed + '/' + 3*nb_opponents
                                                                           + '</span>');

        $('span.possibleChallengesMobile span.scriptMobileLeagueInfoTooltip.possibleChallengesMobileTooltip span#leagueStatsMobile').empty();
        $('span.scriptMobileLeagueInfoTooltip.possibleChallengesMobileTooltip').append('<span id="leagueStatsMobile"><BR><BR><u>' + texts[lang].current_league + '</u>'
                                                                                       + '<BR>' + texts[lang].victories + ' : ' + tot_victory + '/' + 3*nb_opponents
                                                                                       + '<BR>' + texts[lang].defeats + ' : ' + tot_defeat + '/' + 3*nb_opponents
                                                                                       + '<BR>' + texts[lang].unknown + ' : ' + nb_unknown + '/' + 3*nb_opponents
                                                                                       + '<BR>' + texts[lang].notPlayed + ' : ' + tot_notPlayed + '/' + 3*nb_opponents
                                                                                       + '</span>');


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

        if (localStorage.getItem('oldLeagueTime') != null) {
            $('span.possibleChallenges span.scriptLeagueInfoTooltip.possibleChallengesTooltip span#oldLeagueStats').empty();
            $('span.scriptLeagueInfoTooltip.possibleChallengesTooltip').append('<span id="oldLeagueStats"><BR>_______________________'
                                                                               + '<BR><BR>' + texts[lang].league_finished + old_date_end_league
                                                                               + '<BR>' + texts[lang].victories + ' : ' + old_tot_victory + '/' + 3*old_nb_opponents
                                                                               + '<BR>' + texts[lang].defeats + ' : ' + old_tot_defeat + '/' + 3*old_nb_opponents
                                                                               + '<BR>' + texts[lang].notPlayed + ' : ' + old_tot_notPlayed + '/' + 3*old_nb_opponents
                                                                               + '<BR>' + texts[lang].opponents + ' : ' + old_nb_opponents
                                                                               + '<BR>' + texts[lang].leaguePoints + ' : ' + old_points
                                                                               + '<BR>' + texts[lang].avg + ' : ' + nThousand(old_avg)
                                                                               + '</span>');

            $('span.possibleChallengesMobile span.scriptMobileLeagueInfoTooltip.possibleChallengesMobileTooltip span#oldLeagueStatsMobile').empty();
            $('span.scriptMobileLeagueInfoTooltip.possibleChallengesMobileTooltip').append('<span id="oldLeagueStatsMobile"><BR>_______________________'
                                                                                           + '<BR><BR>' + texts[lang].league_finished + old_date_end_league
                                                                                           + '<BR>' + texts[lang].victories + ' : ' + old_tot_victory + '/' + 3*old_nb_opponents
                                                                                           + '<BR>' + texts[lang].defeats + ' : ' + old_tot_defeat + '/' + 3*old_nb_opponents
                                                                                           + '<BR>' + texts[lang].notPlayed + ' : ' + old_tot_notPlayed + '/' + 3*old_nb_opponents
                                                                                           + '<BR>' + texts[lang].opponents + ' : ' + old_nb_opponents
                                                                                           + '<BR>' + texts[lang].leaguePoints + ' : ' + old_points
                                                                                           + '<BR>' + texts[lang].avg + ' : ' + nThousand(old_avg)
                                                                                           + '</span>');
        }
    }

    //CSS
    /*sheet.insertRule('#leagues_right .player_block .lead_player_profile .level_wrapper {'
                     + 'top: -8px !important;}'
                    );

    sheet.insertRule('#leagues_right .player_block .lead_player_profile .icon {'
                     + 'top: 5px !important;}'
                    );*/

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.matchRating {'
                     + 'text-align: center; '
                     + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                     + 'line-height: 17px; '
                     + 'font-size: 15px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.matchRating {'
                     + 'margin-left: 20px; '
                     + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                     + 'line-height: 17px; '
                     + 'font-size: 18px;}}'
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
}

//Battle simulation
function simuFight(player, opponent) {
    let playerEgoCheck = 0;
    let opponentEgoCheck = 0;

    //Calculate opponent proc values, determine applicable alpha class and adjust starting ego values for proc
    /*let opponentProcHCAddOrgasm = [
        0,
        Math.floor(opponent.atk * 0.25),
        Math.floor(opponent.team[2] * 1.3 * 0.75),
        Math.floor(opponent.team[3] * 1.3 * 0.75)
    ];

    let opponentAlphaClass = parseInt(opponent.alpha.class);

    // crit.
    if (opponentAlphaClass == HC) {
        player.ego -= Math.floor(opponent.atk * 0.5);
    }
    if (opponentAlphaClass == CH) {
        //opponent.ego += opponent.def * 2;

        //CH bug
        opponent.ego += 2 * Math.floor(opponent.atk/2);
    }
    if (opponentAlphaClass == KH) {
        opponent.ego += Math.floor(opponent.ego * 0.1);
    }*/

    //crit.
    player.ego -= Math.max(0, opponent.atk - player.def);

    //Log opponent name and starting egos for sim
    console.log('Simulation log for: ' + opponent.name);
    console.log('Starting Egos adjusted for the case proc scenario (0 for you and 1 for the opponent):');
    console.log('Player Ego: ' + player.ego);
    console.log('Opponent Ego: ' + opponent.ego);

    function play_turn(cur) {
        let o = cur === player ? opponent : player;

        o.ego -= Math.max(0, cur.atk - o.def);
        console.log('Round ' + (turns + 1) + ': ' + cur.text + ' hit! -' + Math.max(0, (cur.atk - o.def)));

        //Log results
        console.log('after Round ' + (turns + 1) + ': ' + o.text + ' ego: ' + o.ego);
    }

    //Simulate challenge
    for (var turns = 0; turns < 99; turns++) {

        if( player.ego <= 0) {
            //Check if defeat stands with 1 critical hit for the player
            opponentEgoCheck = opponent.ego;
            opponentEgoCheck -= player.atk - opponent.def;

            if (opponentEgoCheck <= 0)
                console.log('Victory! With 1 critical hit for player, Opponent ego: ' + opponentEgoCheck);

            player.ego = 0;
            break;
        }
        play_turn(player);

        if (opponent.ego <= 0) {
            //Check if victory stands with 2 critical hits for the opponent
            playerEgoCheck = player.ego;
            playerEgoCheck -= opponent.atk - player.def;

            if (playerEgoCheck <= 0)
                console.log('Defeat! With 1 more critical hit for opponent, Player ego: ' + playerEgoCheck);

            opponent.ego = 0;
            break;
        }

        play_turn(opponent);
    }

    let matchRating = player.ego - opponent.ego;
    let matchRatingStr = (matchRating >= 0 ? '+' : '') + nThousand(Math.floor(matchRating));
    let matchRatingClass;
    if (matchRating < 0 && opponentEgoCheck <= 0)
        matchRatingClass = 'close';
    else if (matchRating < 0 && opponentEgoCheck > 0)
        matchRatingClass = 'minus';
    else if (matchRating > 0 && playerEgoCheck <= 0)
        matchRatingClass = 'close';
    else if (matchRating > 0 && playerEgoCheck > 0)
        matchRatingClass = 'plus';

    /*let points = matchRating >= 0 ? Math.min(25, 15+player.ego/player.originEgo*10) : Math.max(3, 3+(opponent.originEgo-opponent.ego)/opponent.originEgo*10);
    let pointsInt = Math.floor( points * 10 )/10;
    if( Math.floor( points ) == points )
        pointsInt -= 1/10;
    pointsInt += 1;
    pointsInt = Math.floor(pointsInt);*/

    let pointsInt;
    if (matchRating >= 0)
        pointsInt = (player.ego/player.originEgo) > 0.5 ? 25 : 15;
    else
        pointsInt = ((opponent.originEgo-opponent.ego)/opponent.originEgo) > 0.5 ? 13 : 3;

    let pointsStr = '+' + pointsInt;

    return {
        score: Math.floor(matchRating),
        scoreStr: matchRatingStr,
        scoreClass: matchRatingClass,
        playerEgoCheck: playerEgoCheck,
        points: pointsInt,
        pointsStr: pointsStr
    };
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
                        currentGirlsPose.next().css('filter', 'none');
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

        /*sheet.insertRule('.girl-box__draggable .green-tick-icon.empty {'
                         + 'background-image: url(https://zupimages.net/up/21/25/t9f4.png);}'
                        );*/
    }
}


/* =======
    LINKS
   ======= */

function moduleLinks() {
    var time_now = server_now_ts;
    const options = {hour: '2-digit', minute: '2-digit'};

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
    if (CurrentPage.indexOf('home') != -1) home();               // Current page: Homepage
    else if (CurrentPage.indexOf('log_in') != -1) home();        // Current page: Homepage
    else if (CurrentPage.indexOf('pachinko') != -1) pachinko();	 // Current page: Pachinko
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
                             + 'top: -98px;'
                             + 'left: 25px;'
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
        $("#equiped .booster .slot").not(".empty").each(function(){
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
            let champions = $('a[href$="champions-map.html"]>.position>span');
            $('.champion-timer').remove();

            //new on test server
            $('#champion-timer').remove();

            champions.css('height', 'auto');
            champions.append('<BR><span id="scriptChampionsTimer">' + calculateTime(championsTime) + '</span>');
        }

        $('a[rel="clubs"]').append('<a class="round_blue_button" href="/club-champion.html" hh_title="Club Champion">'
                                                  + '<span class="townForward_flat_icn"></span></a>');

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
                     + 'font-family: \'Carter One\', \'Alegreya Sans\', cursive !important; '
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
                     + 'font-family: \'Carter One\', \'Alegreya Sans\', cursive !important; '
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
                     + 'font-family: \'Carter One\', \'Alegreya Sans\', cursive !important; '
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
                     + 'font-family: \'Carter One\', \'Alegreya Sans\', cursive !important; '
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

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#tower_of_fame .tabs {'
                     + 'top: 15px !important;}}'
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

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#homepage a[href="/club-champion.html"] .townForward_flat_icn {'
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
}


/* ============
	SEASON SIM
   ============ */

function moduleSeasonSim() {
    var playerEgo;
    //var playerEgoCheck;
    var playerAtk;
    var playerDef;
    var playerClass;
    /*var playerAlpha;
    var playerBeta;
    var playerOmega;*/

    var opponentEgo;
    var opponentAtk;
    var opponentDef;
    var opponentClass;
    /*var opponentAlpha;
    var opponentBeta;
    var opponentOmega;*/

    var matchRating;

    var turns;

    function calculateSeasonPower(idOpponent) {
        // INIT
        playerClass = $('#season-arena .battle_hero .class_change_btn').attr('carac');
        playerEgo = Math.round(Hero.infos.caracs.ego);
        playerAtk = Math.round(Hero.infos.caracs.damage);
        playerDef = Math.round(Hero.infos.caracs.defense);
        /*let playerData = $('#season-arena .battle_hero .hero_team .team_girl');
        playerAlpha = JSON.parse(playerData.find('.change_team_girls[rel=g1]').attr('data-new-girl-tooltip'));
        playerBeta = JSON.parse(playerData.find('.change_team_girls[rel=g2]').attr('data-new-girl-tooltip'));
        playerOmega = JSON.parse(playerData.find('.change_team_girls[rel=g3]').attr('data-new-girl-tooltip'));*/

        let opponentData = $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ')');
        opponentClass = opponentData.find('div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(2) div:nth-child(2)').attr('carac');
        opponentEgo = parseInt(opponentData.find('.hero_stats div:nth-child(2) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentDef = parseInt(opponentData.find('.hero_stats div:nth-child(1) div:nth-child(2) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentAtk = parseInt(opponentData.find('.hero_stats div:nth-child(1) div:nth-child(1) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        /*opponentAlpha = JSON.parse(opponentData.find('.opponent .hero_team .change_team_girls[rel=g1]').attr('data-new-girl-tooltip'));
        opponentBeta = JSON.parse(opponentData.find('.opponent .hero_team .change_team_girls[rel=g2]').attr('data-new-girl-tooltip'));
        opponentOmega = JSON.parse(opponentData.find('.opponent .hero_team .change_team_girls[rel=g3]').attr('data-new-girl-tooltip'));*/

        //let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
        //let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

        let player = {
            ego: playerEgo,
            originEgo: Math.round(Hero.infos.caracs.ego),
            atk: playerAtk,
            def: playerDef,

            /*alpha: playerAlpha,
            beta: playerBeta,
            omega: playerOmega,
            team: playerTeam,*/

            text: 'Player',
        };

        let opponent = {
            ego: opponentEgo,
            originEgo: parseInt($('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ') div:nth-child(1) div:nth-child(4) div:nth-child(3) span:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10),
            atk: opponentAtk,
            def: opponentDef,

            /*alpha: opponentAlpha,
            beta: opponentBeta,
            omega: opponentOmega,
            team: opponentTeam,*/

            text: 'Opponent',
            name: $('.season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ') > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').text(),
        };

        let simu = simuFight(player, opponent);

        $('#season-arena .opponents_arena .season_arena_opponent_container:nth-child(' + (2*idOpponent+1) + ') .team-average-level').append('<span class="matchRating ' + simu.scoreClass + '">' + simu.scoreStr + '</span>');
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

    sheet.insertRule('#powerLevelScouter {'
                     + 'margin-left: 3px; '
                     + 'margin-right: 1px; '
                     + 'width: 30px;}'
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
    const resetUTCHour = 12;
    var seasonDateEndData = localStorage.getItem('SeasonDateEnd') || JSON.stringify({day: 0, month: 0, year: 0, hour: 0});
    var seasonDateEnd = JSON.parse(seasonDateEndData);
    var currentDay = new Date().getUTCDate();
    var currentMonth = new Date().getUTCMonth();
    var currentYear = new Date().getUTCFullYear();
    var currentHour = new Date().getUTCHours();
    if (seasonDateEnd.hour == 0) {
        seasonDateEnd.day = 1;
        if ((currentDay == 1) && (currentHour < 12))
            seasonDateEnd.month = currentMonth;
        else
            seasonDateEnd.month = (currentMonth + 1)%12;
        seasonDateEnd.year = currentYear;
        if (seasonDateEnd.month == 0)
            seasonDateEnd.year += 1;
        seasonDateEnd.hour = (seasonDateEnd.month > 2 && seasonDateEnd.month < 10) ? resetUTCHour-1 : resetUTCHour;
        localStorage.setItem('SeasonDateEnd', JSON.stringify(seasonDateEnd));
    }
    if ((currentMonth == seasonDateEnd.month) && (currentDay >= seasonDateEnd.day) && (currentHour >= seasonDateEnd.hour)) {
        localStorage.setItem('oldSeasonStats', localStorage.getItem('SeasonStats'));
        localStorage.removeItem('SeasonStats');
        seasonDateEnd.day = 1;
        seasonDateEnd.month = (currentMonth + 1)%12;
        seasonDateEnd.hour = (seasonDateEnd.month > 2 && seasonDateEnd.month < 10) ? resetUTCHour-1 : resetUTCHour;
        localStorage.setItem('SeasonDateEnd', JSON.stringify(seasonDateEnd));
    }
    else if ((currentMonth == seasonDateEnd.month) && (currentDay > seasonDateEnd.day)) {
        localStorage.setItem('oldSeasonStats', localStorage.getItem('SeasonStats'));
        localStorage.removeItem('SeasonStats');
        seasonDateEnd.day = 1;
        seasonDateEnd.month = (currentMonth + 1)%12;
        seasonDateEnd.hour = (seasonDateEnd.month > 2 && seasonDateEnd.month < 10) ? resetUTCHour-1 : resetUTCHour;
        localStorage.setItem('SeasonDateEnd', JSON.stringify(seasonDateEnd));
    }
    else if ((currentMonth > seasonDateEnd.month) && (currentYear == seasonDateEnd.year)) {
        localStorage.setItem('oldSeasonStats', localStorage.getItem('SeasonStats'));
        localStorage.removeItem('SeasonStats');
        seasonDateEnd.day = 1;
        seasonDateEnd.month = (currentMonth + 1)%12;
        seasonDateEnd.hour = (seasonDateEnd.month > 2 && seasonDateEnd.month < 10) ? resetUTCHour-1 : resetUTCHour;
        localStorage.setItem('SeasonDateEnd', JSON.stringify(seasonDateEnd));
    }
    else if (currentYear > seasonDateEnd.year) {
        localStorage.setItem('oldSeasonStats', localStorage.getItem('SeasonStats'));
        localStorage.removeItem('SeasonStats');
        seasonDateEnd.day = 1;
        seasonDateEnd.month = (currentMonth + 1)%12;
        seasonDateEnd.hour = (seasonDateEnd.month > 2 && seasonDateEnd.month < 10) ? resetUTCHour-1 : resetUTCHour;
        localStorage.setItem('SeasonDateEnd', JSON.stringify(seasonDateEnd));
    }

    var seasonStatsData = localStorage.getItem('SeasonStats') || JSON.stringify({fights: 0, victories: 0, losses: 0, won_mojo: 0, lost_mojo: 0, won_mojo_avg: 0, lost_mojo_avg: 0, mojo_avg: 0});
    var seasonStats = JSON.parse(seasonStatsData);
    localStorage.setItem('SeasonStats', JSON.stringify(seasonStats));
    var fights = seasonStats.fights;
    var victories = seasonStats.victories;
    var losses = seasonStats.losses;
    var won_mojo = seasonStats.won_mojo;
    var lost_mojo = seasonStats.lost_mojo;
    var won_mojo_avg = seasonStats.won_mojo_avg;
    var lost_mojo_avg = seasonStats.lost_mojo_avg;
    var mojo_avg = seasonStats.mojo_avg;
    var i=0;

    if (CurrentPage.indexOf('season-battle') != -1) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (($('#hh_hentai').attr('class') || $('#hh_gay').attr('class') || $('#hh_comix').attr('class')).includes('battle')) {
                    while (i<1) {
                        i++;
                        var fight_result = $('div.line.slide_left div.slot').attr('cur');
                        var fight_mojo = $('div.line.slide_left div.slot p').text();
                        if (fight_result == "victory_points") {
                            if (fight_mojo.indexOf('-') == -1) {
                                fights +=1;
                                victories += 1;
                                won_mojo += parseInt(fight_mojo.replace(/\D/g, ''), 10);
                                won_mojo_avg = Math.floor(won_mojo/victories*100)/100;
                                mojo_avg = Math.floor((won_mojo-lost_mojo)/fights*100)/100;
                            }
                            else {
                                fights +=1;
                                losses += 1;
                                lost_mojo += parseInt(fight_mojo.replace(/\D/g, ''), 10);
                                lost_mojo_avg = Math.floor(lost_mojo/losses*100)/100;
                                mojo_avg = Math.floor((won_mojo-lost_mojo)/fights*100)/100;
                            }
                            seasonStats.fights = fights;
                            seasonStats.victories = victories;
                            seasonStats.won_mojo = won_mojo;
                            seasonStats.won_mojo_avg = won_mojo_avg;
                            seasonStats.losses = losses;
                            seasonStats.lost_mojo = lost_mojo;
                            seasonStats.lost_mojo_avg = lost_mojo_avg;
                            seasonStats.mojo_avg = mojo_avg;
                            localStorage.setItem('SeasonStats', JSON.stringify(seasonStats));
                        }
                    }
                    observer.disconnect()
                }
            })
        })

        observer.observe($('#popups #rewards_popup #reward_holder')[0], {
            childList: true
            , subtree: true
            , attributes: false
            , characterData: false
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
                    if (id == 145462484)
                        girlName = girlName.concat('-', 'Usagi');
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
    var playerEgoCheck;
    var playerAtk;
    var playerDef;
    var playerClass;
    var playerGirl1;
    var playerGirl2;
    var playerGirl3;
    var playerGirl4;
    var playerGirl5;
    var playerGirl6;
    var playerGirl7;
    var playerAlphaAdd;
    var playerBetaAdd;
    var playerOmegaAdd;

    var opponentEgo;
    var opponentOriginEgo;
    var opponentEgoStr;
    var opponentAtk;
    var opponentAtkStr;
    var opponentDef;
    var opponentDefStr;
    var opponentClass;
    var opponentGirl1;
    var opponentGirl2;
    var opponentGirl3;
    var opponentAlphaAdd;
    var opponentBetaAdd;
    var opponentOmegaAdd;

    var matchRating;

    function calculatePower() {
        // INIT
        playerClass = $('#pre-battle #player-panel .hero-class-icon').attr('carac');
        playerEgo = Math.round(Hero.infos.caracs.ego);
        playerAtk = Math.round(Hero.infos.caracs.damage);
        playerDef = Math.round(Hero.infos.caracs.defense);

        /*playerGirl1 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[3].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl2 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[2].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl3 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[5].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl4 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[6].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl5 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[4].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl6 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[1].attributes["data-new-girl-tooltip"].nodeValue);
        playerGirl7 = JSON.parse($('#player-panel .team-member.base-hexagon a img')[0].attributes["data-new-girl-tooltip"].nodeValue);*/

        opponentClass = $('#pre-battle #opponent-panel .hero-class-icon').attr('carac');
        opponentEgoStr = $('#pre-battle #opponent-panel .fighter-stats .stat')[1].innerText;
        opponentEgo = (opponentEgoStr.includes('.') || opponentEgoStr.includes(',')) ? parseInt(opponentEgoStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentEgoStr.includes('K')) ? parseInt(opponentEgoStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentEgoStr.replace(/[^0-9]/gi, ''), 10);
        opponentOriginEgo = (opponentEgoStr.includes('.') || opponentEgoStr.includes(',')) ? parseInt(opponentEgoStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentEgoStr.includes('K')) ? parseInt(opponentEgoStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentEgoStr.replace(/[^0-9]/gi, ''), 10);
        opponentAtkStr = $('#pre-battle #opponent-panel .fighter-stats .stat')[0].innerText;
        opponentAtk = (opponentAtkStr.includes('.') || opponentAtkStr.includes(',')) ? parseInt(opponentAtkStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentAtkStr.includes('K')) ? parseInt(opponentAtkStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentAtkStr.replace(/[^0-9]/gi, ''), 10);
        opponentDefStr = $('#pre-battle #opponent-panel .fighter-stats .stat')[2].innerText;
        opponentDef = (opponentDefStr.includes('.') || opponentDefStr.includes(',')) ? parseInt(opponentDefStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : (opponentDefStr.includes('K')) ? parseInt(opponentDefStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentDefStr.replace(/[^0-9]/gi, ''), 10);

        /*opponentGirl1 = JSON.parse($('#opponent-panel .team-member img')[1].attributes["data-new-girl-tooltip"].nodeValue);
        opponentGirl2 = JSON.parse($('#opponent-panel .team-member img')[0].attributes["data-new-girl-tooltip"].nodeValue);
        opponentGirl3 = JSON.parse($('#opponent-panel .team-member img')[2].attributes["data-new-girl-tooltip"].nodeValue);

        let playerTeam = [0, playerGirl1, playerGirl2, playerGirl3, playerGirl4, playerGirl5, playerGirl6, playerGirl7];
        let opponentTeam = [0, opponentGirl1, opponentGirl2, opponentGirl3];*/

        let player = {
            ego: playerEgo,
            originEgo: Math.round(Hero.infos.caracs.ego),
            atk: playerAtk,
            def: playerDef,

            /*girl1: playerGirl1,
            girl2: playerGirl2,
            girl3: playerGirl3,
            girl4: playerGirl4,
            girl5: playerGirl5,
            girl6: playerGirl6,
            girl7: playerGirl7,
            team: playerTeam,*/

            text: 'Player',
        };

        let opponent = {
            ego: opponentEgo,
            originEgo: opponentOriginEgo,
            atk: opponentAtk,
            def: opponentDef,

            /*girl1: opponentGirl1,
            girl2: opponentGirl2,
            girl3: opponentGirl3,
            team: opponentTeam,*/

            text: 'Opponent',
            name: $('#opponent-panel .hero-name-container').text()
        };

        let simu = simuFight(player, opponent);

        $('#opponent-panel .average-lvl').append('<div style="text-align : center; font-size : 16px" class="matchRating ' + simu.scoreClass + '">' + simu.scoreStr + '</div>');
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
        if (CurrentPage.indexOf('change-team') != -1) {
            updateFilterGirlData("seasons");
            $("h3.panel-title").after('<button id="arena_filter" class="blue_text_button">' + texts[lang].filter + '</button>');
            $("h3.panel-title").after(createFilterBox("default"));
            createFilterEvents();
            displayGirlStatSum();
        }

        sheet.insertRule('a[rel="season"] {'
                         + 'top: 277px !important; }');
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
                         + '#change-team-page .change-team-panel.team-panel {'
                         + 'margin-top: 20px;}}'
                        );

        sheet.insertRule('@media only screen and (max-width: 1025px) {'
                         + '#change-team-page .change-team-panel.harem-panel {'
                         + 'margin-top: 17px;}}'
                        );
    });

    function displayGirlStatSum() {
        var observer = new MutationObserver(function(mutations) {
            let carac1Data = $('.hh_tooltip_new.new_girl_tooltip .caracs span[carac=carac1] span:nth-child(1)').text();
            let carac1 = parseLocaleFloat(carac1Data);
            let carac2Data = $('.hh_tooltip_new.new_girl_tooltip .caracs span[carac=carac2] span:nth-child(1)').text();
            let carac2 = parseLocaleFloat(carac2Data);
            let carac3Data = $('.hh_tooltip_new.new_girl_tooltip .caracs span[carac=carac3] span:nth-child(1)').text();
            let carac3 = parseLocaleFloat(carac3Data);
            let caracSum = Number(carac1 + carac2 + carac3).toLocaleString(locale).replace(' ', ' ');
            // Note: replacing any spaces with an NBSP to match HH UI

            $('.hh_tooltip_new.new_girl_tooltip').append('<span id="caracSum" style="position: relative; left: 45px; top: -115px; color: #fff; font-size: 16px; font-family: Tahoma,Helvetica,Arial,sans-serif; font-weight: 700;"> Total: <BR>' + caracSum + '</span>');
        });

        observer.observe($('.page-change-team')[0], {
            childList: true
            , subtree: false
            , attributes: false
        });
    }

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
        $("#filter_rarity").on('change', filterGirls);
        $("#filter_name").get(0).oninput = filterGirls;
        $("#save_teamFilter").on('click', saveTeam);
        $("#load_team").on('click', loadTeam);
        $("#filter_blessed_attributes").on('change', filterGirls);
        $("#filter_aff_category").on('change', filterGirls);
        $("#filter_aff_lvl").on('change', filterGirls);
    }

    function filterGirls() {
        var filterClass = $("#filter_class").get(0).selectedIndex;
        var filterRarity = $("#filter_rarity").get(0).value;
        var filterName = $("#filter_name").get(0).value;
        var nameRegex = new RegExp(filterName, "i");
        var filterBlessedAttributes = $("#filter_blessed_attributes").get(0).value;
        let filterAffCategory = $("#filter_aff_category").get(0).value;
        let filterAffLvl = $("#filter_aff_lvl").get(0).value;

        var girlsFiltered = $.map(girlsData, function(girl, index) {
            var matchesClass = (girl.class == filterClass) || (filterClass == 0);
            var matchesRarity = (girl.rarity == filterRarity) || (filterRarity == 'all');
            var matchesName = (girl.Name.search(nameRegex) > -1);
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

            let affectionStr = girl.Graded2;
            let affectionCategoryStr = affectionStr.split('</g>');
            let affectionCategory = affectionCategoryStr.length-1;
            let affectionLvlStr = affectionStr.split('<g >');
            let affectionLvl = affectionLvlStr.length-1;
            let matchesAffCategory = (affectionCategory == filterAffCategory) || (filterAffCategory == 'all');
            let matchesAffLvl = (affectionLvl == filterAffLvl) || (filterAffLvl == 'all');

            return (matchesClass && matchesRarity && matchesName && matchesBlessedAttributes && matchesAffCategory && matchesAffLvl) ? index : null;
        });

        $.each(arenaGirls, function(index, girlElem) {
            $(girlElem).css('display', $.inArray(index, girlsFiltered) > -1 ? 'block' : 'none');
        });

        //update scroll display
        $(".harem-panel-girls").css('overflow', '');
        $(".harem-panel-girls").css('overflow', 'hidden');
    }

    function saveTeam() {
        var selectedGirls = $('#change-team-page .change-team-panel .harem-panel-girls .selected');
        var selectedIds = $.map(selectedGirls, function(girl, index) {
            return $(girl).attr("id_girl");
        });
        var teamUsed = $("#save_team_select").get(0).selectedIndex;
        localStorage.setItem('arenaSavedTeam' + teamUsed, JSON.stringify(selectedIds));
    }

    function loadTeam() {
        var teamUsed = $("#load_team_select").get(0).selectedIndex;
        var teamSaved = localStorage.getItem('arenaSavedTeam' + teamUsed);
        if (teamSaved == null || typeof teamSaved == 'undefined') return;

        var selectedIds = JSON.parse(teamSaved);
        if (Array.isArray(selectedIds)) {
            $.each(arenaGirls, function(index, girlElem) {
                var girlId = $(girlElem).attr("id_girl");
                $(girlElem).css('display', $.inArray(girlId, selectedIds) > -1 ? 'block' : 'none');
            });

            //update scroll display
            $("#change-team-page .change-team-panel .harem-panel-girls").css('overflow', '');
            $("#change-team-page .change-team-panel .harem-panel-girls").css('overflow', 'hidden');
        }
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
            + '<option value="all" selected="selected">' + texts[lang].all + '</option><option value="hardcore">' + texts[lang].hardcore + '</option><option value="charm">' + texts[lang].charm + '</option><option value="knowhow">' + texts[lang].know_how + '</option>'
            + '</select></div></div>';

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

        totalHTML += '<div class="form-control"><button id="save_teamFilter" class="blue_button_L" style="margin-top: 10px; padding: 5px 20px; width: 51%;">' + texts[lang].save_as + '</button>'
            + '<div class="select-group" style="display: inline-block; float: right; width: 45%;">'
            + '<label class="head-group" for="save_team_select">' + texts[lang].team_number + '</label>'
            + '<select name="save_team_select" id="save_team_select" icon="down-arrow">'
            + '<option value="1" selected="selected">' + texts[lang].team + ' 1</option><option value="2">' + texts[lang].team + ' 2</option><option value="3">' + texts[lang].team + ' 3</option>'
            + '</select></div></div>';

        totalHTML += '<div class="form-control"><button id="load_team" class="blue_button_L" style="margin-top: 10px; padding: 5px 20px; width: 51%;">' + texts[lang].load_from + '</button>'
            + '<div class="select-group" style="display: inline-block; float: right; width: 45%;">'
            + '<label class="head-group" for="load_team_select">' + texts[lang].team_number + '</label>'
            + '<select name="load_team_select" id="load_team_select" icon="down-arrow">'
            + '<option value="1" selected="selected">' + texts[lang].team + ' 1</option><option value="2">' + texts[lang].team + ' 2</option><option value="3">' + texts[lang].team + ' 3</option>'
            + '</select></div></div>';

        totalHTML += '</div>';

        return totalHTML;
    }
}

//Display your ranking at the bottom of the screen if you are in the top 200
if (CurrentPage == '/season.html') {
    let i=1;
    while((($('div.leaderboard_row:nth-child(' + i + '').css('color') != "rgb(34, 150, 228)") && ($('div.leaderboard_row:nth-child(' + i + '').css('color') != "rgb(55, 160, 231)")) && (i < 200)){
        i++;
    }
    if (($('div.leaderboard_row:nth-child(' + i + '').css('color') == "rgb(34, 150, 228)") || ($('div.leaderboard_row:nth-child(' + i + '').css('color') == "rgb(55, 160, 231)")) {
        let player_row = $('div.leaderboard_row:nth-child(' + i + '').clone();
        player_row.css('position', 'fixed');
        player_row.css('width', '904px');
        $('#leaderboard_list').append(player_row);
    }

    //CSS
    $('#leaderboard_list')[0].children[200].style.removeProperty('bottom');

    sheet.insertRule('@media only screen and (min-width: 1026px) {'
                     + '.leaderboard_row:nth-child(201) {'
                     + 'bottom: 20px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '.leaderboard_row:nth-child(201) {'
                     + 'bottom: -5px;}}'
                    );
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
        let name = girl["Name"];
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

                sheet.insertRule('.page-pre_battle #shard_number {'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'left: -5px;'
                                 + 'color: #80058b;'
                                 + 'text-shadow: 1px 1px 0 #fff,-1px 1px 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff;'
                                 + 'width: 28px;'
                                 + 'text-align: right;'
                                 + 'font-size: 12px !important;}'
                                );

                sheet.insertRule('.page-pre_battle .shards_troll .shard_troll {'
                                 + 'background-image: url(https://hh2.hh-content.com/shards.png);'
                                 + 'background-repeat: no-repeat;'
                                 + 'background-size: contain;'
                                 + 'position: absolute;'
                                 + 'bottom: -0.25em;'
                                 + 'width: 20px;'
                                 + 'height: 20px;}'
                                );

                if (girlsData.length > 1) {
                    sheet.insertRule('.page-pre_battle #shard_number {'
                                     + 'margin-left: -1px;'
                                     + 'margin-top: -10px;}'
                                    );

                    sheet.insertRule('.page-pre_battle .shards_troll .shard_troll {'
                                     + 'margin-left: 2px;'
                                     + 'margin-top: -11px;}'
                                    );
                }
                else {
                    sheet.insertRule('.page-pre_battle #shard_number {'
                                     + 'margin-left: -1px;'
                                     + 'margin-top: -14px;}'
                                    );

                    sheet.insertRule('.page-pre_battle .shards_troll .shard_troll {'
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
                sheet.insertRule('.page-pre_battle #shard_number {'
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
            observer.observe($('.page-pre_battle')[0], {
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
                     + 'top: 63px;'
                     + 'left: 500px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#previous_pop {'
                     + 'position: absolute;'
                     + 'top: 80px;'
                     + 'left: 620px;}}'
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
                     + 'top: 63px;'
                     + 'left: 580px;}}'
                    );

    sheet.insertRule('@media only screen and (max-width: 1025px) {'
                     + '#next_pop {'
                     + 'position: absolute;'
                     + 'top: 80px;'
                     + 'left: 700px;}}'
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

sheet.insertRule('@media only screen and (min-width: 1026px) {'
                 + '#contains_all>nav>[rel=content]>div>a {'
                 + 'line-height: 26px; '
                 + 'height: 26px;}}'
                 );

sheet.insertRule('@media only screen and (max-width: 1025px) {'
                 + '.girl-box__draggable .green-tick-icon.empty {'
                 + '-webkit-mask: url(https://hh2.hh-content.com/design/ic_tick_white.svg) no-repeat 50% 50%;'
                 + '-webkit-mask-size: contain;'
                 + 'background-image: none;'
                 + 'background-color: snow !important;}}'
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

//Old Path of attraction event window
if (CurrentPage.indexOf('home') != -1 && $('.event-thumbnail [rel=path_event]').length > 0 && loadSetting('oldPoAWindow'))
    $('.event-thumbnail [rel=path_event]')[0].href="/path-of-attraction.html";