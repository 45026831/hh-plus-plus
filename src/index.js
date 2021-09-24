import Config from './config'
import {BattleEndstateModule, MissionsBackgroundStyleTweak} from './modules'

const config = new Config()

// base modules

// configurable modules
const battleEndstate = new BattleEndstateModule()
config.registerModule(battleEndstate)

const missionsBackground = new MissionsBackgroundStyleTweak()
config.registerModule(missionsBackground)

config.loadConfig()

config.runModules()
