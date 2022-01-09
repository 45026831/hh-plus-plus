let sheet

const registeredVars = []

class Sheet {
    static get() {
        if (!sheet) {
            const style = document.createElement('style')
            document.head.appendChild(style);
            ({sheet} = style)
        }

        return sheet
    }

    static registerVar(name, val) {
        if (registeredVars.includes(name)) {return}

        Sheet.get().insertRule(`:root {--${name}: ${val};}`)

        registeredVars.push(name)
    }
}

export default Sheet
