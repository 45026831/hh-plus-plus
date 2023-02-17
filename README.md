# hh-plus-plus

## Installation instructions

### Desktop (Chrome, Firefox, Opera, Edge)
a) Install TamperMonkey or Violentmonkey  
b) Click the script URL: https://raw.githubusercontent.com/45026831/hh-plus-plus/main/dist/hh-plus-plus.user.js  
c) TamperMonkey should automatically prompt you to install/update the script. If it doesn't, open up the TM Dashboard, go to the Utilities tab, scroll down to "Install from URL" and paste the above URL in there.  

### iOS (Safari Only)
a) Install Userscripts from the App Store  
b) Set a location to save scripts  
c) Tap the script URL: https://raw.githubusercontent.com/45026831/hh-plus-plus/main/dist/hh-plus-plus.user.js  
d) Open up the Userscrips extension from the URL bar and install the script.  

### Android
a) Install a browser that supports userscripts, such as Firefox Nightly Build or Kiwi browser.  
b) Install TamperMonkey for your chosen browser (instructions of how to do so are available online)  
c) Follow the instructions for Desktop above.  

## Development

### Node js
This project is built on Node JS LTS Fermium (v14.x LTS). On macOS and Linux, you can install Node Version Manager (nvm) and run `nvm i` in the root of this project to install the correct version automatically. On Windows, you'll need to download and install Node 14 directly from the Node JS website.

### Getting started
This project has minimal dependencies, but there are a few, so run `npm install` in the root of the project to fetch these for the first time.

### Building
There are 2 scripts that get built by this project, a production version and a dev version that includes debug symbols.

To build the dev version only: `npm run build-dev`  
To build the prod version only: `npm run build`  
To build both at once: `npm run build-all`

### Devloader (Tampermonkey only)
To speed up development, you can use a mini script to load the main script, and therefore skips the need to copy and paste the contents of the script into TamperMonkey each change. With the devloader, it's ready to run as soon as you've done the build. To use it, you'll need to enable filesystem access in the Chrome extension settings for TamperMonkey

```js
// ==UserScript==
// @name         HH++ devloader
// @version      0.1
// @author       You
// @match           https://*.hentaiheroes.com/*
// @match           https://nutaku.haremheroes.com/*
// @match           https://*.gayharem.com/*
// @match           https://*.comixharem.com/*
// @match           https://*.hornyheroes.com/*
// @match           https://*.pornstarharem.com/*
// @run-at          document-body
// @grant        none
// @require file:///path/to/hh-plus-plus/dist/hh-plus-plus.dev.user.js
// ==/UserScript==
```

### Generating new modules
There are 2 helper scripts in this project to generate boilerplate code.

#### Core
`npm run generate-module core Example example` will generate a new module directory `ExampleModule` with an empty `styles.lazy.scss` and a pre-populated `index.js`:

```js
import CoreModule from '../CoreModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'example'

class ExampleModule extends CoreModule {
    constructor () {
        super({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('config', MODULE_KEY),
            default: true
        })
        this.label = I18n.getModuleLabel.bind(this, MODULE_KEY)
    }

    shouldRun () {
        return // TODO
    }

    run () {
        if (this.hasRun || !this.shouldRun()) {return}

        styles.use()

        Helpers.defer(() => {
            // TODO
        })

        this.hasRun = true
    }
}

export default ExampleModule
```

#### Style Tweaks
`npm run generate-module st Example example` will generate a new module directory `ExampleStyleTweak` with an empty `styles.lazy.scss` and a pre-populated `index.js`:

```js
import STModule from '../STModule'
import Helpers from '../../common/Helpers'
import I18n from '../../i18n'

import styles from './styles.lazy.scss'

const MODULE_KEY = 'example'

class ExampleStyleTweak extends STModule {
    constructor () {
        const configSchema = ({
            baseKey: MODULE_KEY,
            label: I18n.getModuleLabel('stConfig', MODULE_KEY),
            default: true
        })
        super({
            configSchema,
            styles
        })
    }

    shouldRun () {
        return // TODO
    }
}

export default ExampleStyleTweak
```
In most cases, a Style Tweak is purely SCSS, so the only thing to fill in in `index.js` is the `shouldRun` to indicate whether it should run on the current page.

### Publishing a new version
This project uses semantic versioning in the form of `major.minor.patch`, where a `major` change is one which affects the entire script, a `minor` change is a new module, and a `patch` is a change to an existing module. When publishing a new version, bump the version number in `package.json`, run `npm install` and `npm run build-all` to fully propagate the version number, then note down the version number with a summary of the changes in `CHANGELOG` before committing all files to the repository.
