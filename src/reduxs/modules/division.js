/**
 * Class: division
 * Author: wufei
 * Date: 2019/6/4
 * Description:
 *     医院列表->平台大科列表
 */

import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";

const initialState = {
    isFetching: false,
    page: 1,//翻页
    data: [] //列表数据
}


const actionTypes = {
    FETCH_DIVISION_REQUEST: 'DIVISION/FETCH_DIVISION_REQUEST',
    FETCH_DIVISION_SUCCESS: 'DIVISION/FETCH_DIVISION_SUCCESS',
    FETCH_DIVISION_FAILURE: 'DIVISION/FETCH_DIVISION_FAILURE',
}


// action creators
export const actions = {
    //加载左侧列表
    loadDivisionList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_DIVSION_LIST('485')
            return dispatch(fetchDivisionList(targetURL))
        }
    },

    //加载右侧列表

}


// action creators：二
const fetchDivisionList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DIVISION_REQUEST,
            actionTypes.FETCH_DIVISION_SUCCESS,
            actionTypes.FETCH_DIVISION_FAILURE,
        ],
        targetURL,
    },
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DIVISION_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_DIVISION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.data.list
            }
        case actionTypes.FETCH_DIVISION_FAILURE:
            return {...state, isFetching: false}
        default:
            return state

    }
}

export default reducer