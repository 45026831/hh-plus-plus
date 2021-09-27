import Helpers from './common/Helpers'
import Config from './config'
import {BattleEndstateModule, FightAVillainModule, MissionsBackgroundStyleTweak} from './modules'

const runScript = () => {
    const config = new Config()

    // base modules

    // configurable modules

    // core
    config.registerGroup({
        key: 'core',
        name: `${Helpers.getGameKey()}++ Core`
    })
    const fightAVillainModule = new FightAVillainModule()
    const battleEndstate = new BattleEndstateModule()
    config.registerModule(fightAVillainModule)
    config.registerModule(battleEndstate)

    // style tweaks
    config.registerGroup({
        key: 'st',
        name: 'Style Tweaks',
        iconEl: '<div></div>'
    })
    const missionsBackground = new MissionsBackgroundStyleTweak()
    config.registerModule(missionsBackground)

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
