/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  中间件对网络请求 返回的数据 进行扁平化处理
 *  next 代表了当前中间件到下一个中间件所提供的方法
 *
 */
import {post} from "../../utils/httpUtil"
export const FETCH_DATA = 'FETCH DATA'
export default store => next => action => {
    const callAPI = action[FETCH_DATA]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const {targetURL, types} = callAPI

    if (typeof targetURL !== 'string') {
        throw new Error('endpoint必须为字符串类型的URL')
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
    return fetchData(targetURL, action.param).then(
        response => next(actionWith({
            type: successType,
            response
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '获取数据失败'
        }))
    )
}

const fetchData = (targetURL, param) => {
    return post(targetURL, param).then(data => {
        return data
    })
}
