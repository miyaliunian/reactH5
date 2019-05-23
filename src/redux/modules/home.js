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
import {combineReducers} from 'redux'
// 使用中间件处理数据
import {FETCH_DATA} from "../middleware/api";
import {schema} from './entities/products'

//请求参数使用到的常量对象
export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNT: 'discount',
    PATH_SIZE_LIKES: 5,
    PATH_SIZE_DISCOUNT: 3,
}

//步骤一  创建 type 常量
export const types = {
    //################猜你喜欢
    // 获取请求
    FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
    // 请求成功
    FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
    // 请求失败
    FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",

    //################超值特惠
    // 获取请求
    FETCH_DISCOUNT_REQUEST: "HOME/FETCH_DISCOUNT_REQUEST",
    // 请求成功
    FETCH_DISCOUNT_SUCCESS: "HOME/FETCH_DISCOUNT_SUCCESS",
    // 请求失败
    FETCH_DISCOUNT_FAILURE: "HOME/FETCH_DISCOUNT_FAILURE",
}

//步骤一:2  创建初始的State
const initialState = {
    //猜你喜欢-数据
    likes: {
        isFetching: false, // 是否正在加载数据
        pageCount: 0, // 翻页
        ids: [] //每个产品的id
    },
    //超值特惠-数据
    discount: {
        isFetching: false, // 是否正在加载数据
        ids: [] // 每个商品的id
    }
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

//步骤二 action-creators
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
                    //将请求回来的数据 放到 业务状态管理的路径 redux->modules->xxx.js
                    // dispatch(action)

                }).catch(err => {
                    dispatch(fetchLikesFailure())
                })
        }
    }
    * */


    //使用中间件的写法->加载：猜你喜欢数据
    loadLikes: () => {
        return (dispatch, getState) => {
            const {pageCount} = getState().home.likes
            const rowIndex = pageCount * params.PATH_SIZE_LIKES
            const endPoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PATH_SIZE_LIKES)
            //派发action->store(自动的 中间件拦截了:api.js)->reducer:将请求回来的数据 放到 业务状态管理的路径 redux->modules->xxx.js
            return dispatch(fetchLikes(endPoint))
        }
    },

    // 加载:特惠商品数据
    loadDiscount: () => {
        return (dispatch, getState) => {
            const endPoint = url.getProductList(
                params.PATH_DISCOUNT,
                0,
                params.PATH_SIZE_DISCOUNT)
            return dispatch(fetchDiscounts(endPoint))
        }
    }


}


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


const fetchDiscounts = (endPoint) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNT_REQUEST,
            types.FETCH_DISCOUNT_SUCCESS,
            types.FETCH_DISCOUNT_FAILURE
        ],
        endPoint,
        schema
    }
})


// 创建reducer
const likes = (state = initialState.likes, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_LIKES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_LIKES_FAILURE:
            return {...state, isFetching: false}
        default:
            return state

    }
}


//超值特惠 reducer
const discounts = (state = initialState.discount, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_LIKES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                pageCount: state.pageCount + 1,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_LIKES_FAILURE:
            return {...state, isFetching: false}
        default:
            return state

    }
}


//selectors
// 获取猜你喜欢state
export const getLikes = state => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}

// 获取获取特惠商品state
export const getDiscounts = state => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
}

export const getPageCountOfLikes = state => {
    return state.home.likes.pageCount
}

const reducer = combineReducers({
    discounts,
    likes
})
export default reducer
