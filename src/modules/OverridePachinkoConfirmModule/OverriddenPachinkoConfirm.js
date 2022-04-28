class OverriddenPachinkoConfirm {
    constructor(name, options, callback) {
        this.name = name
        this.isConfirm = true
        callback()
        setTimeout(() => {
            window.HHPopupManager.closeLastOpenedPopup()
        }, 1)
    }

    show () {
        // NO-OP
    }

    open () {
        // NO-OP
    }

    close () {
        delete window.HHPopupManager.listOpenedPopups[this.name]
    }
}

export default OverriddenPachinkoConfirm
