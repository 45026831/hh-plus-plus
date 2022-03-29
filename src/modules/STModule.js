import HHModule from './HHModule'

class STModule extends HHModule {
    constructor (props) {
        super({group: 'st', ...props})
        this.styles = props.styles
    }

    run () {
        if (!this.shouldRun() || this.hasRun) {
            return
        }

        this.styles.use()

        this.hasRun = true
    }

    tearDown () {
        this.styles.unuse()

        this.hasRun = false
    }
}

export default STModule
