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