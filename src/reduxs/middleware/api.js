/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  中间件对网络请求 返回的数据 进行扁平化处理
 *  next 代表了当前中间件到下一个中间件所提供的方法
 *
 */
import {post} from "../../utils/httpUtil"
import {dataConversionDic} from '../../assets/static'

export const FETCH_DATA = 'FETCH DATA'
export default store => next => action => {

    let callAPI = action[FETCH_DATA]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {targetURL, schema, types} = callAPI

    if (typeof targetURL !== 'string') {
        throw new Error('endpoint必须为字符串类型的URL')
    }

    // if (!schema) {
    //     throw new Error('必须指定业务实体的schema')
    // }

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
    return fetchData(targetURL, action.param, schema).then(
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

const fetchData = (targetURL, param, schema) => {
    return post(targetURL, param).then(data => {
        return normalizeData(data, schema)
    })
}

const normalizeData = (data, schema) => {
    if (schema === '') {
        return data
    } else {
        const {name} = schema
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
            default:
                return
        }
    }
    // return data
}