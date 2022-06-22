import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'fixPopup'

class FixPopupModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return true
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {

            window.objectivePopup.show = function show(data) {
                let _this = this
                if (!data.objective_points)
                    return
                let objectivePoints = data.objective_points
                if (!Object.keys(this.pointsBox).length)
                    this.pointsBox = data.objective_points
                else {
                    for (let key in objectivePoints) {
                        if (!this.pointsBox[key])
                            this.pointsBox[key] = objectivePoints[key]
                        else if (this.pointsBox[key].name === objectivePoints[key].name)
                            this.pointsBox[key].points_gained += objectivePoints[key].points_gained
                    }
                }
                // eslint-disable-next-line no-prototype-builtins
                if (data.end && data.end.rewards && data.end.rewards.hasOwnProperty('lose'))
                    return
                window.clearTimeout(this.initTime)
                this.initTime = setTimeout(function() {
                    let _top = '8.5rem'
                    // eslint-disable-next-line eqeqeq
                    if (data.next_step || $('body').attr('page') == 'pachinko') {
                        _top = data.next_step ? '12rem' : '8.5rem'
                        if ($('#objective_popup').length) {
                            window.HHSlidingPopupManager.close({}, 'objective_popup')
                            if (!_this.objectiveStack)
                                _this.initTime = setTimeout(function() {
                                    _this.popOverlayPoints({
                                        top_position: _top
                                    })
                                    _this.objectiveStack = true
                                }, 1e3)
                        } else {
                            _this.objectiveStack = false
                            _this.popOverlayPoints({
                                top_position: _top
                            })
                        }
                    } else {
                        _this.popOverlayPoints({
                            top_position: _top
                        })
                    }
                }, data.next_step ? 200 : 1e3)
            }
        })

        this.hasRun = true
    }
}

export default FixPopupModule
