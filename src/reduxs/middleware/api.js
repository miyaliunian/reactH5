/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  中间件对网络请求 返回的数据 进行扁平化处理
 *  next 代表了当前中间件到下一个中间件所提供的方法
 *
 */
import {post} from '@api/httpUtil'
import {dataConversionDic} from '@assets/static'

const dayjs = require('dayjs')
export const FETCH_DATA = 'FETCH DATA'
export default store => next => action => {
    let callAPI = action[FETCH_DATA]

    let {callBack} = action
    if (typeof callBack === 'undefined') {
        callBack = ''
    }

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {targetURL, schema, types} = callAPI

    if (typeof targetURL !== 'string') {
        throw new Error('targetURL必须为字符串类型的URL')
    }

    if (typeof schema === 'undefined') {
        schema = ''
    }

    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error('需要指定一个包含了3个action.type的数组')
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('action.type必须为字符串类型')
    }

    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[FETCH_DATA]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))
    return fetchData(targetURL, action.param, schema, callBack)
        .then(
            response =>
                next(
                    actionWith({
                        type: successType,
                        response
                    })
                ),
            error =>
                next(
                    actionWith({
                        type: failureType,
                        error: `${error.message}`
                    })
                )
        )

    return fetchData(targetURL, action.param, schema, callBack)
        .then(
            response =>
                next(
                    actionWith({
                        type: successType,
                        response
                    })
                ),
            error =>
                next(
                    actionWith({
                        type: failureType,
                        // error: `${targetURL}:${error.message}` || `${targetURL}:获取数据失败`
                        error: `${error.message}` || `获取数据失败`
                    })
                )
        )
}

const fetchData = (targetURL, param, schema, callBack) => {
    return post(targetURL, param, callBack).then(data => {
        return normalizeData(data, schema, callBack)
    })
}

const normalizeData = (data, schema) => {
    if (schema === '') {
        return data.data === null ? {infocode: 1, infomessage: '', vfms: null, data: []} : data
    } else {
        const {name,type} = schema
        let currentDate = dayjs().format('YYYY-MM-DD')
        switch (name) {
            case dataConversionDic.divisionList:
                data.data.map((item, index) => {
                    if (index === 0) {
                        item.isSel = true
                    } else {
                        item.isSel = false
                    }
                })
                return data
            case 'bindCard':
                data.data.map((item, index) => {
                    if (index === 0) {
                        item.isSel = true
                    } else {
                        item.isSel = false
                    }
                })
                return data
            case 'dateFilter': // 医生列表 预约挂号 《按日期预约》 过滤掉当前日期
                if (data.data.length ==0 ) return   {data: null}

                // 过滤日期 最多显示6条
                if (data.data.length > 6) {
                    data.data.pop()
                }
                const newDates = data.data.filter(i => {
                    let indexDate = dayjs(i).format('YYYY-MM-DD')
                    return !dayjs(currentDate).isSame(dayjs(indexDate))
                })
                return {data: newDates}
            case 'reservationFilter': // 预约挂号时 需要过滤掉 当前日期下的医生排班
                if (data.data.list.length ==0 ) return   {data: null}
                if (type === 'theDay') return  data // 如果是当日挂号 不对数据进行处理 直接返回
                // 医生排班
                const resvations = data.data.list.filter(i => {
                    let indexDate = dayjs(i.seeDate).format('YYYY-MM-DD')
                    return !dayjs(currentDate).isSame(dayjs(indexDate))
                })
                data.data.list = resvations
                return data
            default:
                return
        }
    }
}
