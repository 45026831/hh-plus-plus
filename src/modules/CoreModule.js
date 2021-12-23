import Helpers from '../common/Helpers'
import HHModule from './HHModule'

class CoreModule extends HHModule {
    constructor (configSchema) {
        super({group: 'core', configSchema})

        this.insertedRuleIndexes = []
        this.sheet = Helpers.getSheet()
    }

    insertRule (rule) {
        this.insertedRuleIndexes.push(this.sheet.insertRule(rule))
    }

    removeRules () {
        this.insertedRuleIndexes.sort((a, b) => b-a).forEach(index => {
            this.sheet.deleteRule(index)
        })

        this.insertedRuleIndexes = []
    }
}

export default CoreModule
