import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'

class ClubStatusCollector {
    static collect() {
        Helpers.defer(() => {
            if (Helpers.isCurrentPage('clubs') && window.membersList) {
                const {upgradesInformation: {upgrades}, membersList} = window
                const clubStatus = {
                    upgrades,
                    memberIds: membersList.map(({id_member}) => id_member)
                }

                Helpers.lsSet(lsKeys.CLUB_STATUS, clubStatus)
            }
        })
    }
}

export default ClubStatusCollector
