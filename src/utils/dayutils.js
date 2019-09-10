/**
 * 时间戳转日期
 * @param str
 * @returns {{oYear: number, oMonth: number, oDay: number, oweekDay: string, cDay: number}}
 */
export function getDate(str) {
    //创建星期数组
    let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oweekDay = weekDays[oDate.getDay()]
    let current = new Date(),
        cDay = current.getDate()
    return {oYear, oMonth, oDay, oweekDay, cDay}
};


/**
 * 格式化当前日期
 * @returns {string}  YYYY-MM-DD
 */
export function getcurrentDate() {
    let date = new Date(),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate();
    return Y + M + D
}

/**
 * 时间戳格式化成 YYYY-MM-DD
 * @param str
 * @returns {string}
 */
export function formateTimeStep(str) {
    let date = new Date(str),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    return Y + M + D
}


/**
 * 时间戳格式化 YYYY-MM-DD weekDay
 * @param str
 */
export function fromateTimeStepStr(str) {
    let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let date = new Date(str),
        Y = date.getFullYear() + '年',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
        D = date.getDate() < 10 ? '0' + date.getDate() + '日 ' : date.getDate() + '日 ',
        W = weekDays[date.getDay()] + ' '
    return Y + M + D + W
}

/**
 * 获取午别，入参为0、1、2，出参为上午、下午、晚上
 * @param str
 * @returns {string}
 */
export function getNoon(str) {
    let noon = '上午'
    if (str === '0') {
        noon = '上午'
    }
    if (str === '1') {
        noon = '下午'
    }
    if (str === '2') {
        noon = '晚上'
    }
    return noon
}


export function getStartDate(str = '') {
    if (str !== '') {
        let date = new Date(str),
            Y = date.getFullYear(),
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
            D = date.getDate();
        return Y + M + D
    } else {
        let date = new Date(),
            Y = date.getFullYear(),
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
            D = date.getDate();
        return Y + M + D
    }

}


export function getCurrentMMddWed(str = '') {
    let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    if (str !== '') {
        let date = new Date(str),
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
            D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日',
            W = weekDays[date.getDay()] + ''
        return M + D + W
    } else {
        let date = new Date(),
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
            D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日',
            W = weekDays[date.getDay()] + ''
        return M + D + W
    }
}


export function getPrevDate(str) {
    let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let date = new Date(str - 24 * 60 * 60 * 1000),
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
        D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日',
        W = weekDays[date.getDay()] + ''
    return M + D + W
}

export function getNexDate(str) {
    let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let date = new Date(str + 24 * 60 * 60 * 1000),
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
        D = date.getDate() < 10 ? '0' + date.getDate() + '日' : date.getDate() + '日',
        W = weekDays[date.getDay()] + ''
    return M + D + W
}


