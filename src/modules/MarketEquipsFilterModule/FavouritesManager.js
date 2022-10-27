import { lsKeys } from '../../common/Constants'
import Helpers from '../../common/Helpers'

const favouriteUpdateCallbacks = []

class FavouritesManager {
    static getFavourites () {
        return Helpers.lsGet(lsKeys.EQUIP_FAVORITES) || []
    }
    static setFavourites (favorites) {
        Helpers.lsSet(lsKeys.EQUIP_FAVORITES, favorites)
    }
    static addToFavourites (id) {
        const favourites = FavouritesManager.getFavourites()
        if (favourites.includes(id)) {return}

        favourites.push(id)
        FavouritesManager.setFavourites(favourites)
        FavouritesManager.callUpdateCallbacks()
    }
    static removeFromFavourites (id) {
        const favourites = FavouritesManager.getFavourites()
        const index = favourites.indexOf(id)
        if (index < 0) {return}

        favourites.splice(index, 1)
        FavouritesManager.setFavourites(favourites)
        FavouritesManager.callUpdateCallbacks()
    }
    static isFavourite(id) {
        const favourites = FavouritesManager.getFavourites()
        return favourites.includes(id)
    }
    static areFavourites(ids) {
        const favourites = FavouritesManager.getFavourites()

        return ids.reduce((a,id) => {
            a[id] = favourites.includes(id)
            return a
        }, {})
    }

    static onUpdate(callback) {
        favouriteUpdateCallbacks.push(callback)
    }
    static callUpdateCallbacks() {
        favouriteUpdateCallbacks.forEach(callback => {
            callback()
        })
    }
}

export default FavouritesManager
