import {FETCH_DATA} from "@reduxs/middleware/api";

/**
 * Class:
 * Author: wufei
 * Date: 2019/9/18
 * Description: 支付成功
 *
 */

const initialState = {
    fetchStatus: false,
    registerData: []
}

const actionTypes = {
    FETCH_REQUEST: 'PAY_RESULT/FETCH_REQUEST',
    FETCH_SUCCESS: 'PAY_RESULT/FETCH_SUCCESS',
    FETCH_FAIL: 'PAY_RESULT/FETCH_FAIL'
}

export const actions = {
    fetchRegister: () => {
        return (dispatch, getstate) => {
            return dispatch(fetchRegister('', ''))
        }
    }
}


const fetchRegister = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_REQUEST,
            actionTypes.FETCH_SUCCESS,
            actionTypes.FETCH_FAIL,
        ],
        targetURL,
    },
    param
})

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {...state}
        default:
            return state
    }
}
export default reducer

export const getFetchStateus = (state) => {
    return state.payResult.fetchStatus
}