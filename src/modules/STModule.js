import Helpers from '../common/Helpers'
import HHModule from './HHModule'

class STModule extends HHModule {
    constructor (props) {
        super({group: 'st', ...props})

        this.insertedRuleIndexes = []
        this.sheet = Helpers.getSheet()
    }

    run () {
        if (!this.shouldRun() || this.hasRun) {
            return
        }

        this.injectCss()

        this.hasRun = true
    }

    insertRule (rule) {
        this.insertedRuleIndexes.push(this.sheet.insertRule(rule))
    }

    tearDown () {
        this.insertedRuleIndexes.sort((a, b) => b-a).forEach(index => {
            this.sheet.deleteRule(index)
        })

        this.insertedRuleIndexes = []
        this.hasRun = false
    }
}

export default STModule
