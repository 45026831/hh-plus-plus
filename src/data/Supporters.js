import patrons from './patrons.json'

let supportersCache

class Supporters {
    static async getSupporters() {
        if (!supportersCache) {
            // TODO get from remote
            supportersCache = patrons
        }

        return supportersCache
    }
}

export default Supporters
