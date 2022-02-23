import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

const MODULE_KEY = 'disableDragDrop'

class DisableDragDropModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return Helpers.isCurrentPage('shop')
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        Helpers.defer(() => {
            const destroy = () => {
                const $draggable = $('.ui-draggable')
                if ($draggable.length) {
                    $draggable.draggable('destroy')
                }
            }
            destroy()
            new MutationObserver(destroy).observe(document.getElementById('shops'), {attributes: true, attributeFilter:['class'], subtree: true})
        })

        this.hasRun = true
    }
}

export default DisableDragDropModule
