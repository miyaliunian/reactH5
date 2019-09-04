/**
 * Class: advanceSettlement
 * Author: wufei
 * Date: 2019/9/3
 * Description:
 *  订单预结算
 */

import URL from '@utils/httpUrl';
import Axios from 'axios'
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";

const initialState = {
    isFetching: false,
    paymentStatus: '',
    personEntity: '',
    settleEntity: ''
}

const actionTypes = {
    SET_PAYMENT: 'ADVANCE_SETTLE/SET_PAYMENT',
    FETCH_REQUEST: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_REQUEST',
    FETCH_PERSON_SUCCESS: 'ADVANCE_SETTLE/FETCH_PERSON_SUCCESS',
    FETCH_ADVANCE_SETTLE_SUCCESS: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_SUCCESS',
    FETCH_FAILURE: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_FAILURE',
}

export const actions = {
    loadPersonAndAdvanceSettleInfo: (ordertype, orderid, patientId) => {
        return (dispatch, getstate) => {
            dispatch(fetchRequest())
            Axios.all([loadPerson(URL.API_PERSON(patientId), dispatch), loadAdvanceSettleInfo(URL.API_ADVANCE_SETTLE(ordertype, orderid), dispatch)])
                .then(Axios.spread((personResp, advanceSettleResp) => {
                    // console.log('成功')
                }))
                .catch(Axios.spread((personResp, advanceSettleResp) => {
                    // console.log('失败')
                }))
        }
    },


    setPaymentStatus: (value) => {
        return (dispatch, getstate) => {
            dispatch(setPaymentStatus(value))
        }
    }
}


//加载人员信息
function loadPerson(targetUrl, dispatch) {

    return post(targetUrl)
        .then((data) => {
                if (data.infocode && data.infocode === 1) {
                    dispatch(fetchPersonSuccess(data.data))
                } else {
                    Toast.fail(data.infomessage, 2);
                }
            }
        )
        .catch(err => {
            dispatch(fetchFailure())
        })

}


//加载预结算信息
function loadAdvanceSettleInfo(targetUrl, dispatch) {

    return post(targetUrl)
        .then(data => {
            if (data.infocode === 1) {
                dispatch(fetchSettleSuccess(data.data))
            } else {
                Toast.fail(data.infomessage, 2);
            }
        })
        .catch(err => {
            dispatch(fetchFailure())
        })
}


const setPaymentStatus = (data) => ({
    type: actionTypes.SET_PAYMENT,
    response: data
})

const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST,
})

const fetchPersonSuccess = (data) => ({
    type: actionTypes.FETCH_PERSON_SUCCESS,
    response: data
})


const fetchSettleSuccess = (data) => ({
    type: actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS,
    response: data
})


const fetchFailure = () => ({
    type: actionTypes.FETCH_FAILURE,
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAYMENT:
            return {
                ...state,
                paymentStatus: action.response
            }
        case actionTypes.FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_PERSON_SUCCESS:

            return {
                ...state,
                isFetching: false,
                personEntity: action.response
            }
        case actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS:

            return {
                ...state,
                isFetching: false,
                settleEntity: action.response
            }
        case actionTypes.FETCH_FAILURE:
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
export const getPaymentStatus = (state) => {
    return state.advanceSettlement.paymentStatus
}

export const getFetchingStatus = (state) => {
    return state.advanceSettlement.isFetching
}

export const getPerInfo = (state) => {
    return state.advanceSettlement.personEntity
}

export const getAdvanceSttle = (state) => {
    return state.advanceSettlement.settleEntity
}