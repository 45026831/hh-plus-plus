export const HC = 1
export const CH = 2
export const KH = 3
export const relationships = {
    [HC]: {
        s: KH,
        t: CH
    },
    [CH]: {
        s: HC,
        t: KH
    },
    [KH]: {
        s: CH,
        t: HC
    }
}
