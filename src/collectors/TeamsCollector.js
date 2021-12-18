import Helpers from '../common/Helpers'

class TeamsCollector {
    static collect() {
        if (Helpers.isCurrentPage('teams')) {
            Helpers.defer(() => {
                const teamsDict = {}
                const teamIds = []

                $('.team-slot-container[data-is-empty=]').each((i, slot) => {
                    const teamId = $(slot).data('id-team')
                    const icon = $(slot).find('img').attr('src')
                    const themeIcons = $(slot).find('.team-slot-themes-container img').map((i,el)=>$(el).attr('src')).toArray()

                    const classes = $(slot).attr('class').replace(/\s+/g, ' ').split(' ')
                    const iconRarity = ['mythic', 'legendary', 'epic', 'rare', 'common', 'starting'].find(rarity => classes.includes(rarity))

                    teamsDict[teamId] = {
                        teamId,
                        icon,
                        iconRarity,
                        themeIcons
                    }
                    teamIds.push(teamId)
                })

                teamIds.forEach(teamId => {
                    const $teamGirlContainer = $(`.team-info-girls-container[data-id-team=${teamId}]`)
                    const girls = []
                    $teamGirlContainer.find('.team-member-container').each((i, girl) => {
                        const girlId = $(girl).data('girl-id')
                        if (girlId) {
                            girls.push(`${girlId}`)
                        }
                    })
                    teamsDict[teamId].girls = girls
                })

                const teams = {
                    teamsDict,
                    teamIds
                }
                Helpers.setTeamsDictionary(teams)
            })
        }
    }
}

export default TeamsCollector
