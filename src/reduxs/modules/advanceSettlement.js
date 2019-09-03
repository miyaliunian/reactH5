/**
 * Class: advanceSettlement
 * Author: wufei
 * Date: 2019/9/3
 * Description:
 *  订单预结算
 */

import URL from '@utils/httpUrl';
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";

const initialState = {
    isFetching: false,
    entity: ''
}

const actionTypes = {
    FETCH_ADVANCE_SETTLE_REQUEST: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_REQUEST',
    FETCH_ADVANCE_SETTLE_SUCCESS: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_SUCCESS',
    FETCH_ADVANCE_SETTLE_FAILURE: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_FAILURE',
}

export const actions = {
    loadAdvanceSettleInfo: (ordertype, orderid) => {
        return (dispatch, getstate) => {
            const targetUrl = URL.API_ADVANCE_SETTLE(ordertype, orderid)
            dispatch(fetchRequest())
            return post(targetUrl)
                .then(data => {
                    if (data.infocode === 1) {
                        dispatch(fetchSuccess(data.data))
                    } else {
                        Toast.fail(data.infomessage, 2);
                    }
                })
                .catch(err => {
                    dispatch(fetchFailure())
                })
        }
    }
}


const fetchRequest = () => ({
    type: actionTypes.FETCH_ADVANCE_SETTLE_REQUEST,
})


const fetchSuccess = (data) => ({
    type: actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS,
    response: data
})


const fetchFailure = () => ({
    type: actionTypes.FETCH_ADVANCE_SETTLE_FAILURE,
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ADVANCE_SETTLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                entity:action.response
            }
        case actionTypes.FETCH_ADVANCE_SETTLE_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.advanceSettlement.isFetching
}


export const getAdvanceSttle = (state) => {
    return state.advanceSettlement.entity
}