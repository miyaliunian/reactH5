/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首页UI状态管理
 *      不使用redux-thunk时，redux中的action creator 不能对action中的数据进行任何操作，只能将数据原封不动的传递给reducer
 *          写代码的步骤为 步骤一、步骤二、步骤三、步骤四 这几个步骤都是自动的
 *      使用了redux-thunk时，借助中间件函数特性 能对action中的数据进行操作
 *          写代码的步骤为 步骤一、步骤三、步骤五、步骤四 这几个步骤都是自动的
 */

//不需要中间件处理数据
import url from "../../utils/httpUrl"
// import {get} from '../../utils/httpUtil'

// 使用中间件处理数据
import {FETCH_DATA} from "../middleware/api";
import {schema} from './entities/products'

//步骤一 创建 type 常量
export const types = {
    // 获取请求
    FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
    // 请求成功
    FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
    // 请求失败
    FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
}

//步骤二 创建 action creator:如果不用中间件处理的话  action 只能做数据的传递而不能对数据进行处理
// const fetchLikesRequest = () => ({
//     type: types.FETCH_LIKES_REQUEST
// })
//
// const fetchLikesSuccess = (data) => ({
//     type: types.FETCH_LIKES_SUCCESS,
//     data
// })
//
// const fetchLikesFailure = (error) => ({
//     type: types.FETCH_LIKES_FAILURE,
//     error
// })


// 步骤三 actions creators 获取列表数据
export const actions = {
    /*
    // 不使用中间件的写法
    loadLikes: () => {
        return (dispatch, getState) => {
            dispatch(fetchLikesRequest())
            return get(url.getProductList(0, 10))
                .then(data => {
                    //网络请求处理成功
                    dispatch(fetchLikesSuccess())
                    //将请求回来的数据 放到的 业务状态管理的路径 redux->modules->xxx.js
                    // dispatch(action)

                }).catch(err => {
                    dispatch(fetchLikesFailure())
                })
        }
    }
    * */

    //使用中间件的写法
    loadLikes: () => {
        return (dispatch, getState) => {
            const endPoint = url.getProductList(0, 10)
            return dispatch(fetchLikes(endPoint))
        }
    }


}

// 步骤五 .
const fetchLikes = (endPoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endPoint,
        schema
    }
})

//步骤四 .处理最后的数据
const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            // toDos
            break
        case types.FETCH_LIKES_SUCCESS:
            // toDos
            break
        case types.FETCH_LIKES_FAILURE:
            // toDos
            break
        default:
            return state
    }
    return state
}

export default reducer