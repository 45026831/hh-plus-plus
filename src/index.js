import {
    BoosterStatusCollector,
    ClubStatusCollector,
    EventVillainsCollector,
    GirlDictionaryCollector,
    LeagueInfoCollector,
    MarketInfoCollector,
    SeasonStatsCollector,
    SidequestStatusCollector,
    TeamsCollector,
    TimerCollector
} from './collectors'
import Helpers from './common/Helpers'
import Config from './config'
import {
    BattleEndstateModule,
    BetterXPAndMoneyModule,
    ChampionsModule,
    ContestRewardsModule,
    FightAVillainModule,
    GemStockModule,
    HaremInfoModule,
    HomeScreenModule,
    LeagueInfoModule,
    MarketEquipsFilterModule,
    MarketGirlsFilterModule,
    MarketHideSellButtonModule,
    MarketInfoModule,
    MarketXPAffModule,
    MissionsBackgroundStyleTweak,
    MobileBattleStyleTweak,
    MoneyAnimationStyleTweak,
    PachinkoNamesModule,
    PopNavSortModule,
    ResourceBarsModule,
    SeasonStatsModule,
    TeamsFilterModule
} from './modules'

const runScript = () => {
    const config = new Config()

    // base modules
    GirlDictionaryCollector.collect()
    TeamsCollector.collect()
    EventVillainsCollector.collect()
    SeasonStatsCollector.collect()
    MarketInfoCollector.collect()
    LeagueInfoCollector.collect()
    TimerCollector.collect()
    BoosterStatusCollector.collect()
    ClubStatusCollector.collect()
    SidequestStatusCollector.collect()

    // configurable modules

    // core
    config.registerGroup({
        key: 'core',
        name: `${Helpers.getGameKey()}++ Core`
    })
    config.registerModule(new FightAVillainModule())
    config.registerModule(new BetterXPAndMoneyModule())
    config.registerModule(new MarketInfoModule())
    config.registerModule(new MarketGirlsFilterModule())
    config.registerModule(new MarketEquipsFilterModule())
    config.registerModule(new MarketXPAffModule())
    config.registerModule(new MarketHideSellButtonModule())
    config.registerModule(new HaremInfoModule())
    config.registerModule(new LeagueInfoModule())

    config.registerModule(new TeamsFilterModule())
    config.registerModule(new ChampionsModule())
    config.registerModule(new ResourceBarsModule())
    config.registerModule(new HomeScreenModule())
    if (!Helpers.isCxH()) {
        config.registerModule(new PopNavSortModule())
    }
    config.registerModule(new SeasonStatsModule())
    config.registerModule(new PachinkoNamesModule())
    config.registerModule(new ContestRewardsModule())
    config.registerModule(new BattleEndstateModule())
    config.registerModule(new GemStockModule())

    // style tweaks
    config.registerGroup({
        key: 'st',
        name: 'Style Tweaks',
        iconEl: '<div></div>'
    })
    config.registerModule(new MissionsBackgroundStyleTweak())
    config.registerModule(new MoneyAnimationStyleTweak())
    config.registerModule(new MobileBattleStyleTweak())

    config.loadConfig()

    config.runModules()

    Helpers.runDeferred()

    // expose config for other scripts to register their own modules
    window.hhPlusPlusConfig = {
        registerGroup: config.registerGroup.bind(config),
        registerModule: config.registerModule.bind(config),
        runModules: config.runModules.bind(config),
        loadConfig: config.loadConfig.bind(config),
    }
}

if (!$) {
    console.log('HH++ WARNING: No jQuery found. Probably an error page. Ending the script here')
} else if (location.pathname === '/' && location.hostname.includes('www')) {
    // iframe container, do nothing.
} else if (location.pathname === '/integrations/' && location.hostname.includes('nutaku')) {
    // nutaku post-login home screen, redirect.
    location.replace(`${location.origin}/home.html`)
} else {
    runScript()
}
