/**
 * Class: bindCard
 * Author: wufei
 * Date: 2019/6/10
 * Description:
 *   卡绑定
 */
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "@reduxs/middleware/api";

const initialState = {
    isFetching: false,
    data: [], //列表数据
}

const actionTypes = {
    FETCH_BIND_CARD_REQUEST: 'BINDCARD/FETCH_BIND_CARD_REQUEST',
    FETCH_BIND_CARD_SUCCESS: 'BINDCARD/FETCH_BIND_CARD_SUCCESS',
    FETCH_BIND_CARD_FAILURE: 'BINDCARD/FETCH_BIND_CARD_FAILURE',


    SET_BINDCARD_ITEM: 'BINDCARD/SET_BINDCARD_ITEM',
    RESET_BINDCARD_ITEM: 'BINDCARD/RESET_BINDCARD_ITEM'
}


export const actions = {
    loadList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API__BIND_CARD_LIST()
            return dispatch(loadBindCardList(targetURL))
        }
    },

    //状态初始值
    setBindCard: (item) => ({
        type: actionTypes.SET_BINDCARD_ITEM,
        item
    }),

    //数据清空
    resetBindCard: () => ({
        type: actionTypes.RESET_BINDCARD_ITEM
    })
}


const loadBindCardList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_BIND_CARD_REQUEST,
            actionTypes.FETCH_BIND_CARD_SUCCESS,
            actionTypes.FETCH_BIND_CARD_FAILURE,
        ],
        targetURL
    }
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BIND_CARD_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_BIND_CARD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.data
            }
        case actionTypes.FETCH_BIND_CARD_FAILURE:
            return {...state, isFetching: false}
        case actionTypes.SET_BINDCARD_ITEM:
            return {
                ...state,
                isFetching: false,
                data: action.item
            }
        case actionTypes.RESET_BINDCARD_ITEM:
            return {
                ...state,
                isFetching: false,
                data: []
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getBindCardList = (state) => {
    return state.bindCard.data
}

export const getFetchingStatus = (state) => {
    return state.bindCard.isFetching
}