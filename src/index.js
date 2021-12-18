import {
    EventVillainsCollector,
    GirlDictionaryCollector,
    MarketInfoCollector,
    SeasonStatsCollector,
    TeamsCollector
} from './collectors'
import Helpers from './common/Helpers'
import Config from './config'
import {
    BattleEndstateModule,
    BetterXPAndMoneyModule,
    ContestRewardsModule,
    FightAVillainModule,
    MarketEquipsFilterModule,
    MarketGirlsFilterModule,
    MarketInfoModule,
    MarketXPAffModule,
    MissionsBackgroundStyleTweak,
    MoneyAnimationStyleTweak,
    PachinkoNamesModule,
    SeasonStatsModule
} from './modules'

const runScript = () => {
    const config = new Config()

    // base modules
    GirlDictionaryCollector.collect()
    TeamsCollector.collect()
    EventVillainsCollector.collect()
    SeasonStatsCollector.collect()
    MarketInfoCollector.collect()

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
    config.registerModule(new SeasonStatsModule())
    config.registerModule(new PachinkoNamesModule())
    config.registerModule(new ContestRewardsModule())
    config.registerModule(new BattleEndstateModule())

    // style tweaks
    config.registerGroup({
        key: 'st',
        name: 'Style Tweaks',
        iconEl: '<div></div>'
    })
    config.registerModule(new MissionsBackgroundStyleTweak())
    config.registerModule(new MoneyAnimationStyleTweak())

    config.loadConfig()

    config.runModules()

    Helpers.runDeferred()

    // expose config for other scripts to register their own modules
    // window.hhPlusPlusConfig = config
}

if (!$) {
    console.log('HH++ WARNING: No jQuery found. Probably an error page. Ending the script here')
} else if (location.pathname === '/' && location.hostname.includes('www')) {
    // iframe container, do nothing.
} else {
    runScript()
}
