export const colors = {
    HH: {
        homeDark: 'rgba(32,3,7,.9)',
        homeBorder: '#ffb827',
        panelBorderGradient: 'linear-gradient(180deg, #ffa23e, #c41b53)',
        panelBackground: 'linear-gradient(to top,#572332 0,#572332 1%,#2c1e1c 100%)',
        panelInset: 'inset 0 0 40px 15px #662034'
    },
    GH: {
        homeDark: 'rgba(32,3,7,.9)',
        homeBorder: '#69daff',
        panelBorderGradient: 'linear-gradient(180deg,#6a8cff,#8966ff)',
        panelBackground: 'linear-gradient(to top,#84a 0,#2a2435 99%,#2a2435 100%)',
        panelInset: 'inset 0 0 40px 15px rgb(131 55 245 / 60%)'
    },
    CxH: {
        homeDark: '#0f0b1d',
        homeBorder: '#33a7ff',
        panelBorderGradient: 'linear-gradient(180deg, #33a7ff, #33a7ff)',
        panelBackground: 'linear-gradient(180deg,#0f0b1d 0,#0d5c9d 90%,#0d5c9d 100%)',
        panelInset: 'inset 0 0 40px 15px none'
    }
}

const lsBaseKey = 'HHPlusPlus'
const lsKey = (key) => `${lsBaseKey}${key}`
export const lsKeys = {
    CONFIG:                 lsKey('Config'),
    GIRL_DICTIONARY:        lsKey('GirlDictionary'),
    TEAMS_DICTIONARY:       lsKey('TeamsDictionary'),
    EVENT_VILLAINS:         lsKey('EventVillains'),
    EVENT_TIME:             lsKey('EventTime'),
    MYTHIC_EVENT_VILLAINS:  lsKey('MythicEventVillains'),
    MYTHIC_EVENT_TIME:      lsKey('MythicEventTime'),
    SEASON_END_TIME:        lsKey('SeasonEndTime'),
    SEASON_STATS:           lsKey('SeasonStats'),
    OLD_SEASON_STATS:       lsKey('OldSeasonStats'),
}
