/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首页UI状态管理
 *   // Actions、Reducer、Action Creator
 *
 */

import url from "../../utils/httpUrl"
import {FETCH_DATA} from "../middleware/api"
import {schema} from "./entities/products"
import {combineReducers} from 'redux'


const types = {
    FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",// 发送请求
    FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS", // 请求成功
    FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",// 请求失败

    FETCH_DISCOUNT_REQUEST: "HOME/FETCH_DISCOUNT_REQUEST",// 发送请求
    FETCH_DISCOUNT_SUCCESS: "HOME/FETCH_DISCOUNT_SUCCESS", // 请求成功
    FETCH_DISCOUNT_FAILURE: "HOME/FETCH_DISCOUNT_FAILURE",// 请求失败
}

const initialState = {
    likes: {
        isFetching: false, // 标识是否正在获取数据
        pageCount: 0, //
        ids: []
    },

    discounts: {
        isFetching: false, // 标识是否正在获取数据
        pageCount: 0, //
        ids: []
    },
}

//Action
const fetchListRequest = () => ({
    type: types.FETCH_LIKES_REQUEST
})
const fetchListSuccess = (data) => ({
    type: types.FETCH_LIKES_SUCCESS,
    data
})
const fetchListFailure = (error) => ({
    type: types.FETCH_LIKES_FAILURE,
    error
})


//Action Creator 传入action 对象
export const actions = {


    loadLikes: () => {
        return (dispatch, getState) => {
            const {pageCount} = getState().home.likes
            const rowIndex = pageCount * 10
            const targetURL = url.getProductList('likes', rowIndex, 10)
            return dispatch(fetchLikes(targetURL))
        }
    },

    loadDiscounts: () => {
        return (dispatch, getState) => {
            const targetURL = url.getProductList('discounts', 0, 3)
            return dispatch(fetchDiscounts(targetURL))
        }
    }
}


const fetchLikes = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        targetURL,
        schema
    }
})


const fetchDiscounts = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNT_REQUEST,
            types.FETCH_DISCOUNT_SUCCESS,
            types.FETCH_DISCOUNT_FAILURE
        ],
        targetURL,
        schema
    }
})

//reducer
const likes = (state = initialState.likes, action) => {
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
            return {
                ...state,
                isFetching: false
            }
        default:
            return state

    }
}


//reducer
const discounts = (state = initialState.discounts, action) => {
    switch (action.type) {
        case types.FETCH_DISCOUNT_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_DISCOUNT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_LIKES_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state

    }
}

const reducer = combineReducers({
    discounts,
    likes
})

export default reducer




