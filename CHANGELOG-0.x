0.37.52: Updating the sim now that domination ego is included in the stats
0.37.51: Commenting out leaderboard fix now that it is _sort of_ fixed in-game
0.37.50: Pre-empting league and season sim updates required for next update currently on test server.
0.37.49: Fixing bug in league sim for handling missing data in playerLeaguesData
0.37.48: Fixing bug where rounding didn't respect locale (#29)
0.37.47: Finally getting around to updating villains and pantheon sim for element bonuses. Removing now defunct sim.
0.37.46: Forcing Activities to open on the Missions tab
0.37.45: Post-patch league sim cleanup
0.37.44: Fixing bug in mobile leagues where the underlying data had moved
0.37.43: Adjusting spacing in seasons opponent blocks to fit sim result (also centers the team in the block)
0.37.42: Pre-empting changes to sim required for new dynamic stats
0.37.41: Fixing copy+paste error in backported Fight-a-villain code
0.37.40: Adding localisations for WereBunny Police.
0.37.39: Adding WereBunny Police to Fight-a-villain. Will add any localisations later.
0.37.38: Fixing bug in leaderboard own row where it would duplicate the row on top of itself
0.37.37: Updating girl counts display to deal with upcoming change in globals
0.37.36: Fixed a bug in Links module where it was changing the breadcrumbs z-index for no reason.
0.37.35: Backporting event girl collection for fight-a-villain from 1.0.0 to deal with the change in the event UI
0.37.34: Moving the clubs button out of the way of the seasons button to make room for the timer
0.37.33: Updating leaderboard fix to work with Path of Valor as well
0.37.32: Adding workaround for sim in mobile league as Kinkoid don't seem to want to fix it
0.37.31: Backporting season stats collection and rollover from 1.0.0 to fix infinite rollover bug. Plus a couple of minor visual fixes.
0.37.30: Updating leaderboard fix to work with Pantheon as well
0.37.29: Including deeplinked girl in first filter on load
0.37.28: Fixing another bug in filter persistence where aff level and category weren't restored onto the dropdowns. Fixing a bug in market xp/aff where an error would be thrown when no girl is present.
0.37.27: Fixing bugs in market filter persistence
0.37.26: Persistent market filter + awakening girl quotas in the market
0.37.25: Adding de and updating fr label for gem stock config.
0.37.24: Reordering gems stock table to match other script-added element lists.
0.37.23: Shrinking league girl shard display to avoid overflow. Adding gem stock display to harem and market (missing i18n: de, es, it).
0.37.22: Updates for awakenings
0.37.21: Various emergency fixes where required variables have been renamed from camelCase to snake_case
0.37.20: Adding safeguard to clean up point history where stale data is present. e.g. when there's a game rollback
0.37.19: Fixing some harem info calculations
0.37.18: fixing shard collection from leagues response.
0.37.17: Adding fr label for club champ elapsed time.
0.37.16: Adding an elapsed time label to club champs (missing i18n: fr, it), adding a fix for a game bug related to the club champion progress bar in non-English locales.
0.37.15: Adding girl shards display in leagues
0.37.14: Fixing market filter styles on Firefox
0.37.13: Adding CxH world 5 villain's name
0.37.12: Including overall win chance in league probability tooltip
0.37.11: Moving the shards reward display to not collide with league info.
0.37.10: Adding CxH world 5 villain girls, but no name for the villain yet. Adding coloured highlighting on the league probabilities tooltip.
0.37.9: Changing league tracking rollover mechanism to use globals provided by the game instead of trying to rebuild the end date.
0.37.8: Adding partial support for leagues of less than 30 participants to league info.
0.37.7: Fixing element icons in market filter
0.37.6: Fixing girl shards display on villains
0.37.5: Replacing class icons in league with current team theme
0.37.4: Adding theme icons to team selection in market girls filter
0.37.3: Re-adding champions timer to home screen as a stop-gap measure until we have a better means of showing champs and pantheon.
0.37.2: Re-capping synergy bonuses at 100 again.
0.37.1: Fixing bug with getting synergy data when game not in English. For some reason KK decided to loacalise the bonus identifiers...
0.37.0: Changing league and season sims to use a stochastic simulator in order to take all element bonuses into account.
0.36.5: Updating fix from 0.36.4 to include all element icons.
0.36.4: Fixing bug where league sim result was covering element icons, so tooltips couldn't receive hover events.
0.36.3: Adding battle sim to pantheon. Restyling sim result on battle and league.
0.36.2: Merging PoP nav button positions from Tom208's version of the script.
0.36.1: Fixing missing shards on troll pre-battle. Fixing bug that broke teams filter when elements not present.
0.36.0: Adding elements support for market and teams filters, adding pantheon support for battle endstate.
0.35.12: Removing now-defunct Old PoA view option as the page has been removed from the game.
0.35.11: Fixing the league point colour spectrum to include 3 point scores (#28) (courtesy of zoopokemon)
0.35.10: Adding the 3 new girls on Sake Tier 1
0.35.9: Preparing fight-a-villain for more than 3 girls on tier 1 (e.g. Sake)
0.35.8: Fixing missing margin on shards slot for contest summary
0.35.7: Adding LC rewards to contest summary (courtesy of zoopokemon)
0.35.6: Fixing a bug where the harem info module would attempt to run on the profile harem showcase page
0.35.5: Adding a switch to league table to toggle individual scores display
0.35.4: Updating German translation for level range
0.35.3: Updating the league summary and history tooltip with highlighting and a level range
0.35.2: Updating French config i18n for battle endstate
0.35.1: Folding faster skip button into battle endstate, updating i18n for config option
0.35.0: Adding feature to show endstate of battle after hitting the skip button by Ia1nn
0.34.0: Adding saved contest rewards summary by zoopokemon
0.33.11: Fixing bug (#18) where market stats werent tracking the final bought stats before maxing.
0.33.10: Adding signposting to teams filter in market if the user hasn't been to the teams page.
0.33.9: Adding filtering by saved teams to the market filter. Removing redundant team saving and loading, and redundant stat sum from teams filter.
0.33.8: Fixing bug (#23) where reordering the league table would cause the league info module to misbehave.
0.33.7: Final step of phasing out old sim from leagues (thanks to zoopokemon for finishing this chore)
0.33.6: Fixing a bug in the individual score tracking on mobile, where the selected row was not accounted for.
0.33.5: Adding individual score tracking by zoopokemon to the leagues info module. Fixing bug in market info where clicking the disabled plus buttons would cause the tooltip to show more stats had been bought.
0.33.4: Merging faster skip button by Ia1nn
0.33.3: Updating some English labels. Plus, cleaning up whitespace.
0.33.2: Updating Italian translations after review from Daniel/Danutaku
0.33.1: League sim: Removing old heroLeaguesData stats retrieval due to bad data on mobile.
0.33.0: Major refactor of the League info module. Adding CDN selection for in-game assets used. Starting to refactor i18n labels.
0.32.16: Fixing bug where script can't work out duration when mythic boosters are applied
0.32.15: Removing old sim from seasons, moving probability result to where old sim result was.
0.32.14: Fixing harem wiki link duplication bug (#16) and moving the wiki link to the name to be less obtrusive.
0.32.13: Fixing bug with duplicate wiki links on unobtained girls speech bubbles.
0.32.12: Swapping out villain battle sim for probabilistic sim.
0.32.11: Pre-empting next update to leagues background data
0.32.10: Updating German translations further after review from Bellanaris
0.32.9: Changing URLs of soon-to-be-removed flaticons
0.32.8: Swapping out stat scraping for making use of heroLeaguesData and playerLeaguesData now that they're symmetrical again.
0.32.7: Merging updated German translations from Tom208's version of the script.
0.32.6: Fixing styling on girls in Teams filter when loading team.
0.32.5: Adding slightly friendlier handling of error pages.
0.32.4: Code fixes for battle sims and teams filters after change in game UI code.
0.32.3: Adding line to probabilistic sim log to show opponent ego just before and after player victory.
0.32.2: Improving (and DRYing up) styling for Fight-a-villain menu on both desktop and mobile.
0.32.1: Fixing error handling in harem info module when visiting with a fresh session.
0.32.0: Adding probabilistic battle simulator by 0renge
0.31.32: Adding own player class icon in league to be consistent.
0.31.31: Fixing market stat summary to update correctly when buying stats in bulk.
0.31.30: Adding GH world 11 villain to the menu, and tier guys for world 10.
0.31.29: Changing show/hide button in league to icon from game. De-duping for mobile.
0.31.28: Adjusting league view on mobile now that league_end_in is visible
0.31.27: Hiding ghost stats in market info
0.31.26: Fixing Better Money to only apply when player has over 1M SC
0.31.25: Fixing market info tooltips after global var was removed by Kinkoid
0.31.24: Adding tier girl IDs for The Nymph (CxH)
0.31.23: Adding font family to gameConfig, so script-added text looks more consistent in CxH
0.31.22: Adding CxH world 4 villain to the menu
0.31.21: Fixing position of PoP girl class icons when girl power levels are low
0.31.20: Fixing positions of league info tooltips
0.31.19: Fixing position of hide beaten opponents button
0.31.18: Minor adjustments around handling of special characters in girl names for wiki links
0.31.17: Changing the club champion shortcut icon to use the Champions icon to make it more visually distinct
0.31.16: Making champion pose ticks consistent across the board
0.31.15: Some code tidy up and improved support for GH
0.31.14: Removing the other wiki page override for Alt. Superia
0.31.13: Removing override on menu now that menu has changed.
0.31.12: Restoring the old league points scoring to the sim.
0.31.11: Removing wiki page override for Alt. Superia now that the wiki page title is fixed
0.31.10: Fixing DRYed locale number parse to match what the HH UI is doing
0.31.9: Fixing DRYed locale number parser for all locales
0.31.8: Tidying up locale number parsing for girl stat sum
0.31.7: Making a start on replacing unnecessarily external icons with icons already in the game.
0.31.6: Fixing harem info details panel hooks disconnecting when sorting.
0.31.5: Fixing team filter and market filter on CxH
0.31.4: Merge 0.30.2: Fixed minor bugs. Also, fixed locale-specific number-parsing on girl stat sum.
0.31.3: Moving all script-added buttons to the new-style button class. Changing all button selectors to use the functional attributes instead of the style class.
0.31.2: Fixing typo in opponent selection in league
0.31.1: Fixing CSS for market filter button after changing it to new-style
0.31.0: Merge Tom-0.30.0: Refactored code of options menu (thanks to BenBrazke). Fixed issues following server-side code change. Fixed minor bugs. Added girl stats sum on tooltip window on change team page.
0.30.7: Fixing typo in event tab parsing for fight-a-villain
0.30.6: Merge 0.29.6: Fixed minor bug. Added an option in the script menu to enable/disable old PoA event window.
0.30.5: Merge 0.29.5: Fixed minor issues. Plus making old PoA screen override configurable.
0.30.4: Merge 0.29.4: Fixed minor bug in league info on mobile devices.
0.30.3: Merge 0.29.3: Fixed minor issues.
0.30.2: Merge 0.29.2: Fixed an issue with load and save buttons in the fight team filter. Added affection filter to the fight team filter.
0.30.1: Reinstating market and team filters after formal approval from Kinkoid. Merging in minor fixes from old script 0.29.1.
0.30.0: Removing market and teams filters to bring script back in line with HH Terms of Use after official ruling from Kinkoid.
0.29.0: New battle system.
0.28.8: Removed support of test server for this script. A dedicated script for this test server is online. Fixed minor display issues.
0.28.7: Fixed event trolls display following server-side code change.
0.28.6: Fixed minor bug.
0.28.5: Fixed villain tier girls display following server-side code change.
0.28.4: Minor improvements.
0.28.3: Minor improvements. Added class girls in Places of Power selection list.
0.28.2: Removed fix about the check marks in to the champions after Kinkoid's fix. Added a shortcut to Club Champion.
0.28.1: Improved display feature into the champions.
0.28.0: Improved display feature into the champions.
0.27.9: Fixed minor display issues.
0.27.8: Fixed minor bugs.
0.27.7: Added support to Comix Harem for Nutaku platform.
0.27.6: Taken into account the next Hentai Heroes update.
0.27.5: Fixed the access to event data following server-side code change on test server.
0.27.4: Improved support to Comix Harem.
0.27.3: Added Comix Harem's support with this script. Changed the display of the check mark into the champions.
0.27.2: Fixed minor bug.
0.27.1: Fixed display bug from Kinkoid about the check mark into the champions.
0.27.0: Fixed minor bugs.
0.26.9: Fixed a bug in ID opponents in tower of fame. Added opponents' class display in middle panel.
0.26.8: Fixed minor bugs.
0.26.7: Fixed minor bug.
0.26.6: Improved shards display.
0.26.5: Fixed minor shards display issue.
0.26.4: Fixed minor display issues.
0.26.3: Fixed minor bugs.
0.26.2: Fixed display bug with promo discount.
0.26.1: Fixed minor bugs.
0.26.0: Fixed minor bugs.
0.25.9: Support for new world 15 villain Sake and her tier 1 girls.
0.25.8: Fixed minor bugs.
0.25.7: Fixed minor bugs.
0.25.6: Fixed minor bugs.
0.25.5: Added a button at the market to hide/display the "Sell" button
0.25.4: Fixed minor bugs.
0.25.3: Fixed minor bugs.
0.25.2: Fixed minor bugs. Minor improvements.
0.25.1: Fixed minor bugs.
0.25.0: Added a button at the market to sort the equipment items by rarity (from legendary to common).
0.24.9: Fixed minor bugs.
0.24.8: Minor improvements.
0.24.7: Minor improvements.
0.24.6: Fixed minor bugs. DST time for league stats. Added a button to hide/display players already beaten in league.
0.24.5: Minor improvements.
0.24.4: Fixed minor bugs.
0.24.3: Minor improvements.
0.24.2: Added shards display to girls' tooltip for trolls and pachinko.
0.24.1: Fixed minor bugs.
0.24.0: Minor improvements.
0.23.9: Minor improvements.
0.23.8: Minor improvements. Fixed minor bugs.
0.23.7: Change the display on mobile of the links for the next/previous place of power.
0.23.6: Added an option to enable or disable the collect money animation in the harem. Added shortcuts to go directly to the next/previous place of power.
0.23.5: Fixed minor bugs.
0.23.4: Fixed minor bugs.
0.23.3: Fixed minor bugs.
0.23.2: Minor improvements. Fixed minor bugs.
0.23.1: Fixed minor bugs.
0.23.0: During events, the villains in villains menu have the same color as the event girl's rarity.
0.22.9: Minor improvements.
0.22.9: Minor improvements.
0.22.7: Fixed minor bugs.
0.22.6: Minor improvements.
0.22.5: Fixed minor bugs on mobile device.
0.22.4: Minor improvements.
0.22.3: Minor improvements.
0.22.2: Fixed minor bugs.
0.22.1: Minor improvements.
0.22.0: Minor improvements.
0.21.9: Minor improvements. Fixed minor bugs.
0.21.8: Fixed girls' filter at the market on Android device.
0.21.7: Minor improvements.
0.21.6: Added affection in the filter at the market.
0.21.5: Added the update of the shards number for girls on Great Pachinko.
0.21.4: Minor improvements.
0.21.3: Fixed minor bugs.
0.21.2: Fixed minor bugs. Changed display for PoP timer : display the lowest timer even if a PoP is not started but in that case, the timer is in orange.
0.21.1: Minor improvements.
0.21.0: Minor improvements.
0.20.9: Added shards display for club champion. Display button to access to club champion's positions during cooldown.
0.20.8: Fixed a bug in champions statistics.
0.20.7: Fixed minor bugs.
0.20.6: Minor improvements. Fixed minor bugs.
0.20.5: Minor improvements.
0.20.4: Added a girls' filter at the market (credit: test_anon)
0.20.3: Fixed a bug in market gifts for mythic girls.
0.20.2: Added the management of the club champion. Displayed the mythic event villain. Fixed fight simulation against Charm class.
0.20.1: Improved fight simulation against Charm class.
0.20.0: Minor improvements.
0.19.9: Integrated an estimation of the Charm skill bug in the fight simulation. Added teams filter feature (credit: randomfapper34).
0.19.8: Minor improvements.
0.19.7: Added simulation on battle page.
0.19.6: Minor improvements. Fixed minor bugs.
0.19.5: Fixed a minor bug in battle league points when no damage was done by one of the fighters. Fixed a bug in Gay Harem for Season stats.
0.19.4: Fixed a bug in fight simulation. Added an option to disable CSS background for missions. Improved the display of XP and affection in the market.
0.19.3: Added CSS background for missions.
0.19.2: Fixed bugs after Kinkoid's update.
0.19.1: Improved the display of XP and affection in the market.
0.19.0: Fixed minor bugs. Minor improvements.
0.18.9: Fixed minor bugs. Minor improvements.
0.18.8: Minor improvements.
0.18.7: Minor improvements.
0.18.6: Fixed bugs in the display of the timers after Kinkoid's update. Removed the Charm skill bug from the fight simulation.
0.18.5: Minor improvements.
0.18.4: Added the display of the shards number for girls on villains.
0.18.3: Fixed minor bugs.
0.18.2: Minor improvements. Fixed minor bugs.
0.18.2: Minor improvements.
0.18.1: Minor improvements.
0.18.0: Fixed minor bugs. Minor improvements.
0.17.9: Minor improvements.
0.17.8: Fixed minor bugs. Changed timer of places of power in prevision of the next places to come.
0.17.7: Fixed minor bugs.
0.17.6: Fixed minor bugs. Minor improvements. Added score points in league simulation.
0.17.5: Fixed minor bugs. Refactored fight simulation code (thanks to test_anon) and taken into account the Charm skill bug.
0.17.4: Added stats for season fights.
0.17.3: Fixed minor bugs.
0.17.2: Fixed minor bugs. Minor improvements.
0.17.1: Fixed minor bugs.
0.17.0: Fixed minor bugs.
0.16.9: Minor improvements. Fixed a bug in the display of XP in the market.
0.16.8: Fixed minor bugs. Fixed a bug in the display of XP in the market when XP girl was at Max.
0.16.7: Fixed minor bugs.
0.16.6: Fixed minor bugs.
0.16.5: Fixed minor bugs.
0.16.4: Fixed other Kinkoid's bugged timers.
0.16.3: Fixed a bug in the display of the expected score in League Information
0.16.2: Fixed a bug in the display of Affection in the market when gifts are given too quickly
0.16.1: Fixed minor bugs.
0.16.0: Fixed minor bugs. Fixed a bug in the display of XP in the market when books are given. Fixed other Kinkoid's bugged timers.
0.15.9: Fixed Kinkoid's bugs about timers on Champions map and in troll fights bar.
0.15.8: Fixed a bug in "league info" display on small screens. Fixed minor bugs.
0.15.7: Fixed minor bugs. Fixed a bug in the display of the remaining XP and affection in the market.
0.15.6: Fixed minor bugs.
0.15.5: Fixed a bug in league results display.
0.15.4: Added the display of Epic pachinko available girls names + the link to the wiki website (thanks to Shinya).
0.15.3: Fixed a minor bug in champions timer.
0.15.2: Added the display of Event and Mythic pachinko available girls' names + the link to the wiki website (thanks to Shinya).
0.15.1: Added mythic rarity in list of Harem girls in Harem info. Fixed a bug and improved the display of XP and affection in the market (thanks to test_anon).
0.15.0: Fixed minor bugs. Added mythic girl XP and affection in Harem info. Improved the display of XP and affection in the market.
0.14.9: Fixed a bug on champions timer.
0.14.8: Improved champions timer.
0.14.7: Fixed minor bugs. Added a timer for Champions on home page as soon as it exists a timer less than 15 minutes on any champion. Added a row at the bottom of the season leaderboard to display the current rank of top 200 player.
0.14.6: Fixed minor bugs. The link to the current quest in energy quest bar leads to the Champions reception desk when the adventure is over.
0.14.5: Fixed a bug about number of victories/defeats for current league and the previous one. Added a new module to show in the market the remaining XP and affection of the girl to her next level/star instead of her total XP and affection.
0.14.4: Fixed minor bugs. Added an option to display some tops in the league info.
0.14.3: Added the average score per fight in league information and the expected score at the end of the league with this average in tooltip. Fixed minor bugs.
0.14.2: Replaced "’" by "-" in Harem links to Wiki FR.
0.14.1: Fixed minor bugs.
0.14.0: Fixed minor bugs. Added display of "league info" tooltips on small screens. Added number of victories/defeats for current league and the previous one in a "league info" tooltip.
0.13.9: Fixed minor bugs.
0.13.8: Fixed a display bug in league info tooltip
0.13.7: Added on energy bar a shortcut to current quest. Added display of league info on small screens.
0.13.6: Minor changes for display.
0.13.5: Changed color when timer bar is full.
0.13.4: Added support for test server
0.13.3: Fixed timers and villains shortcut after server-side code changes 2020/11/25
0.13.2: Minor fixes.
0.13.1: Added a timer for boosters. Merged the "Fight villains" bar with "Energy fight" bar. Changed position of the timers.
0.13.0: Added a timer and a shortcut for Places of power. Added a popup with full time remaining on Season and League timer.
0.12.9: Fixed some translations. Support for Pandara's witch tier 2 and 3 girls. Added a fill bar for every timer. Fixed market timer with module market disabled.
0.12.8: Fixed the timer for the Season. Improved the display of the timers for Pachinko and market.
0.12.7: Added shortcuts for league. Changed the display for the Season shortcut. Added a timer for market, pachinko, season fights and league fights.
0.12.6: Added a separate option for the Season link.
0.12.5: Minor changes for display.
0.12.4: Added a link to Season opponents.
0.12.3: Added module for the new feature "Season of the Rose". Added support of the module "League sim" on small screens (smartphones, tablets, ...). Improve display for small screens.
0.12.2: Added support for German language. Cleaned up some old unused text strings in all languages.
0.12.1: Fixed recognition of villain event girl presence (again) after server-side code changes 2020/08/19.
0.12.0: Support for new world 14 villain Nike and her tier 1 girls.
0.11.9: Changed exponentiation operator from ** to Math.pow() after reports of it breaking on (very) old browsers.
0.11.8: Added support for Italian language (translation courtesy of Godius). Options menu now available in French (Tom208) and Spanish (Marcezeq), completing these localizations.
0.11.7: Minor changes to rounding logic for money and battle excitement displays.
0.11.6: Fixed an issue with non-promotion points targets in league information when league brackets have 115+ players.
0.11.5: Support for Karole tier 2 / 3 and Jackson's Crew tier 3 girls.
0.11.4: Cleaned up and improved calculations for demotion and non-promotion points targets in league information. (Additional es/fr info texts contributed by Marcezeq and Tom208.)
0.11.3: Fixed some number display issues in harem and league information when the game is played in languages other than English. (With thanks to Tom208.)
0.11.2: Support for Finalmecia and Roko Senseï tier 3 girls.
0.11.1: Replaced image links on imgur with Postimage after files were removed. Minor changes to affection tooltip display in harem.
0.11.0: Re-added support for automatic script updating.
0.10.9: Fixed recognition of villain event girl presence after server-side code changes 2020/05/14.
0.10.8: Extended villain menu to show which tiers still have world girls to get; can be toggled in options menu. (Note: Will require script update when new tier girls are released.)
0.10.7: Fixed market stats cost formulas; cost is now 7 rather than 5 for first stat purchase, 1999 increases from first to second price level rather than 2000.
0.10.6: Tweaked league sim to account for recently buffed charm proc, changed how procs are included in the sim, fixed omega girl effects, and generally cleaned up sim code.
0.10.5: Moved the market stats tooltip buttons from right to left to account for Kinkoid's new multi-buy button. Tweaked tooltip texts and display.
0.10.4: Added name of World 13 villain. Added localized villain names in fr/es language versions. Minor text tweaks in en version.
0.10.3: Now supporting girl XP level calculations up to new level 500 cap (with thanks to piturda for the reminder).
0.10.2: Incorporated piturda's Market fix (for server-side change 16/10/19) and Champion update. Added display of Club bonuses and Ginseng boosters to Market stats. Lots and lots of code clean-up.
0.10.1: Fixed calculation of demotion and non-promotion points >1000 and remaining tokens in League info. Disabled display of highest obtainable League reward. Some League info code clean-up.
0.10.0: Updated and expanded stats formula to reflect Patch of 14/08/19. (Contributed by Hare.)
0.9.9: Fixed a bug in the Champions information caused by server-side changes to the code. (Last update by Sluimerstand.)
0.9.8: Added Champions information (credit: Entwine). Fixed no longer working icons.
0.9.7: Fixed League rewards calculating badly when it involves usernames with spaces. Fixed League rewards at 0 challenges left.
0.9.6: Changed money abbreviations from K,M,G,T to K,M,B,T. Player values in Leagues are now exact. Sim result is orange if it's a close call.
0.9.5: Fixed an issue for the Villain menu when the localStorage does not exist yet or anymore.
0.9.4: Fixed a rare error in which the script would crash for trying to pull non-existent numbers to add thousand spacing to.
0.9.3: Fixed League rewards not properly calculating for point values higher than 999.
0.9.2: Added an options menu. Removed modifyScenes. Tweaked sim refresh. Tweaked League info. Tweaked better XP and money. Tweaked harem info.
0.9.1: Fixed sims not refreshing anymore because I wanted to wrap up the previous version so I could watch the new Game of Thrones.
0.9.0: Expanded on the extra League info. Added some missing translations for Spanish.
0.8.9: Fixed player beta/omega stats not calculating properly for girls with spëcìál characters in their names. I'm a professional, I swear.
0.8.8: Added Jackson's Crew villain name. Fixed Charm and Know-How defence in sim results. Added extra League info.
0.8.7: Fixed Charm proc not occurring in sim results. Fixed Know-How proc not calculating correctly. Added opponent name in the console logs.
0.8.6: Fixed wrong class defence stats for beta/omega girls. Fixed new line creation for wide sim results.
0.8.5: Fixed wrong class Harmony procs for League sims.
0.8.4: More tweaks to League sims.
0.8.3: Fixed excitement for League sims (formerly known as match rating formerly known as power levels).
0.8.2: Fixed an oopsie I made when calculating worst-case scenario. Console log (F12) is now also available.
0.8.1: Fixed League numbers for French and Spanish localisations. Changed League ratings to show a worst-case scenario.
0.8.0: Fixed the event villains issue.
0.7.9: Properly fixed the button displacement. Match rating is now even more accurate.
0.7.8: Fixed the collect all button displacement. Fixed Excitement stat in Leagues. Match rating is now more accurate.
0.7.7: Replaced the League power levels with a match rating.
0.7.6: Added better XP and better money.
0.7.5: Added the @downloadURL, so the script can be updated directly from Tampermonkey.
0.7.4: Removed the added mission and arena timers and the extra quest button. Added an auto refresh for the home screen.
0.7.3: Cleaned up the code and prepared the file for "public launch." Added power levels to Leagues.
0.7.2: Updated the harem info pane to be more pleasing to the eyes.