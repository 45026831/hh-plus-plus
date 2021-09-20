import Config from './config'
import {BattleEndstateModule} from './modules'

const config = new Config()

// base modules

// configurable modules
const battleEndstate = new BattleEndstateModule()
config.registerModule(battleEndstate)


config.loadConfig()

config.runModules()
