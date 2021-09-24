import Helpers from '../common/Helpers'
import HHModule from './HHModule'

class STModule extends HHModule {
    constructor (props) {
        super(props)

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
        const sheet = Helpers.getSheet()

        this.insertedRuleIndexes.sort((a, b) => b-a).forEach(index => {
            sheet.deleteRule(index)
        })

        this.insertedRuleIndexes = []
        this.hasRun = false
    }
}

export default STModule
