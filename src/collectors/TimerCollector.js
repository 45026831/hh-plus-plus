import { lsKeys } from '../common/Constants'
import Helpers from '../common/Helpers'

const defaultTimes = {
    pop: 0,
    popDuration: 0,
    champ: 0,
    clubChamp: 0,
    gp: 0,
}

const loadTimes = () => {
    return Helpers.lsGet(lsKeys.TRACKED_TIMES) || defaultTimes
}

const saveTimes = (times) => {
    Helpers.lsSet(lsKeys.TRACKED_TIMES, times)
}

class TimerCollector {
    static collect() {
        Helpers.defer(() => {
            if (Helpers.isCurrentPage('activities')) {
                TimerCollector.collectPoPTime()
            }

        })
    }

    static collectPoPTime() {
        const times = loadTimes()

        const {server_now_ts, pop_data} = window
        if (!pop_data) {return}

        const endingsIn = Object.values(pop_data)
            .map(({remaining_time, time_to_finish})=>({endAt: parseInt(remaining_time), duration: parseInt(time_to_finish)}))
            .filter(({endAt})=>endAt)
            .sort((a,b)=>a.endAt > b.endAt?1:-1)

        const soonest = endingsIn[0] || {endAt:0,duration:0}

        times.pop = server_now_ts + soonest.endAt
        times.popDuration = soonest.duration

        saveTimes(times)
    }
}

export default TimerCollector
