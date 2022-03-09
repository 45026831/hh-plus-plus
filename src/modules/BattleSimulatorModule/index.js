import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import Sheet from '../../common/Sheet'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'
import League from './League'
import Simulator from './Simulator'
import Season from './Season'
import BDSMPvE from './BDSMPvE'

const MODULE_KEY = 'simFight'

class BattleSimulatorModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true,
            subSettings: [
                {
                    key: 'logging',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_logging`),
                    default: false
                },
                {
                    key: 'highPrecisionMode',
                    label: I18n.getModuleLabel('config', `${MODULE_KEY}_highPrecisionMode`),
                    default: false
                }
            ]
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)

        this.simManagers = []
        this.logging = false
        this.highPrecisionMode = false
    }

    shouldRun () {
        return ['pre-battle', 'tower-of-fame', 'season-arena'].some(page=>Helpers.isCurrentPage(page))
    }

    run ({logging, highPrecisionMode}) {
        if (this.hasRun || !this.shouldRun()) {return}
        this.logging = logging
        this.highPrecisionMode = highPrecisionMode

        styles.use()

        Helpers.defer(() => {
            this.injectCSSVars()
            if (Helpers.isCurrentPage('tower-of-fame')) {
                this.simManagers = [new League({highPrecisionMode})]
            } else if (Helpers.isCurrentPage('season-arena')) {
                this.simManagers = [
                    new Season(1),
                    new Season(2),
                    new Season(3),
                ]
            } else if (Helpers.isCurrentPage('pre-battle')) {
                this.simManagers = [new BDSMPvE()]
            }

            this.runManagedSim()


            if (Helpers.isCurrentPage('tower-of-fame')) {
                new MutationObserver(() => this.runManagedSim()).observe(document.getElementById('leagues_right'), {childList: true})
            }
        })

        this.hasRun = true
    }

    injectCSSVars () {
        Sheet.registerVar('mojo-icon-s', `url(${Helpers.getCDNHost()}/pictures/design/ic_mojo_white.svg)`)
    }

    async runManagedSim () {
        await Promise.all(this.simManagers.map(async simManager => {
            const {player, opponent} = simManager.extract()
            const {logging, highPrecisionMode} = this

            const simulator = new Simulator({player, opponent, highPrecisionMode, logging})
            const result = await simulator.run()

            simManager.display(result)
        }))
    }
}

export default BattleSimulatorModule
