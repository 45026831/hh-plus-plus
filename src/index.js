import EventVillainsCollector from './collectors/EventVillainsCollector'
import GirlDictionaryCollector from './collectors/GirlDictionaryCollector'
import TeamsCollector from './collectors/TeamsCollector'
import Helpers from './common/Helpers'
import Config from './config'
import {BattleEndstateModule, ContestRewardsModule, FightAVillainModule, MissionsBackgroundStyleTweak, MoneyAnimationStyleTweak} from './modules'

const runScript = () => {
    const config = new Config()

    // base modules
    GirlDictionaryCollector.collect()
    TeamsCollector.collect()
    EventVillainsCollector.collect()
    // TODO LeaguePointsCollector

    // configurable modules

    // core
    config.registerGroup({
        key: 'core',
        name: `${Helpers.getGameKey()}++ Core`
    })
    const fightAVillain = new FightAVillainModule()
    const contestRewards = new ContestRewardsModule()
    const battleEndstate = new BattleEndstateModule()
    config.registerModule(fightAVillain)
    config.registerModule(contestRewards)
    config.registerModule(battleEndstate)

    // style tweaks
    config.registerGroup({
        key: 'st',
        name: 'Style Tweaks',
        iconEl: '<div></div>'
    })
    const missionsBackground = new MissionsBackgroundStyleTweak()
    const moneyAnimation = new MoneyAnimationStyleTweak()
    config.registerModule(missionsBackground)
    config.registerModule(moneyAnimation)

    config.loadConfig()

    config.runModules()

    // expose config for other scripts to register their own modules
    // window.hhPlusPlusConfig = config
}

if (!$) {
    console.log('HH++ WARNING: No jQuery found. Probably an error page. Ending the script here')
} else {
    runScript()
}
