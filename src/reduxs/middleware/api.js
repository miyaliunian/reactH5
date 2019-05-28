/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  中间件对网络请求 返回的数据 进行扁平化处理
 *  next 代表了当前中间件到下一个中间件所提供的方法
 *
 */
import {post} from "../../utils/httpUtil"
/*

store => next => action => {}
等同于
export default function (store) {
        //一级操作
    return function (next) {
        //当前的操作
        return function (action) {
        //三级操作
        }
    }
}
*
* */


//经过中间件处理的action所具有的标识
export const FETCH_DATA = 'FETCH DATA'

//next 代表了 中间件当中 当前这个中间件的下一个中间件所提供的 dispatch 方法
export default store => next => action => {


    const callAPI = action[FETCH_DATA]

    //类型判断 不是用来处理网络请求的action,如果不是则交给后边的中间件处理
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


    //对数据进行请求
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


//执行网络请求
const fetchData = (targetURL, param) => {
    return post(targetURL, param).then(data => {
        return data
    })
}


/**
 *
 *
 //根据schema, 将获取的数据扁平化处理
 const normalizeData = (data, schema) => {
    const {id, name} = schema
    let kvObj = {}
    let ids = []
    //登录特殊处理
    if (schema.name == "loginData") {
        let token = {}
        token.access_token = data.data.loginData.access_token
        token.refresh_token = data.data.loginData.refresh_token
        //token 信息
        localStorage.setItem('token', JSON.stringify(token))
        // 用户信息
        localStorage.setItem('user', JSON.stringify(data.data.loginData.user))
        return
    }

    if (Array.isArray(data)) {
        data.forEach(item => {
            kvObj[item[id]] = item
            ids.push(item[id])
        })
    } else {
        kvObj[data[id]] = data
        ids.push(data[id])
    }
    return {
        [name]: kvObj,
        ids
    }
}


 //执行网络请求
 const fetchData = (targetURL, schema) => {
    return post(targetURL, {}).then(data => {
        return normalizeData(data, schema)
    })
}

 *
 * */