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
    settleEntity: '',
    btnDisable: true
}

const actionTypes = {
    SET_PAYMENT: 'ADVANCE_SETTLE/SET_PAYMENT',
    FETCH_REQUEST: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_REQUEST',
    FETCH_SUCCESS: 'ADVANCE_SETTLE/FETCH_SUCCESS',
    FETCH_PERSON_SUCCESS: 'ADVANCE_SETTLE/FETCH_PERSON_SUCCESS',
    FETCH_ADVANCE_SETTLE_SUCCESS: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_SUCCESS',
    FETCH_FAILURE: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_FAILURE',
    BTN_ABLE: 'ADVANCE_SETTLE/BTN_ABLE',
    BTN_DISABLE: 'ADVANCE_SETTLE/BTN_ABLE'
}

export const actions = {
    /**
     * // 不查账户余额，正常顺序进来
     * @param ordertype
     * @param orderid
     * @param patientId
     * @returns {Function}
     */
    loadPersonAndAdvanceSettleInfo: (ordertype, orderid, patientId) => {
        return (dispatch, getstate) => {
            dispatch(fetchRequest())
            Axios.all([loadPerson(URL.API_PERSON(patientId), dispatch), loadAdvanceSettleInfo(URL.API_ADVANCE_SETTLE(ordertype, orderid), dispatch)])
                .then(Axios.spread((personResp, advanceSettleResp) => {
                    dispatch(fetchSuccess())
                    dispatch({type: actionTypes.BTN_ABLE})
                }))
                .catch(Axios.spread((personResp, advanceSettleResp) => {
                    dispatch(fetchFailure())
                }))
        }
    },

    //线上预约->医保已经支付，自费还没有支付
    /**
     * 查账户余额，比如从订单管理列表进来，该订单为混合支付，医保已支付
     * @param reservation
     * @param patientId
     * @returns {Function}
     */
    setAdvanceSettleInfoANdLoadPerson: (reservation, patientId) => {
        return (dispatch, getstate) => {
            dispatch(fetchRequest())
            Axios.all([loadPerson(URL.API_PERSON_PAYED(patientId), dispatch), setAdvanceSettleInfo(reservation, dispatch)])
                .then(Axios.spread((personResp, advanceSettleResp) => {
                    dispatch(fetchSuccess())
                    dispatch({type: actionTypes.BTN_ABLE})
                }))
                .catch(Axios.spread((personResp, advanceSettleResp) => {
                    dispatch(fetchFailure())
                }))
        }
    },

    //刷新订单支付状态
    setPaymentStatus: (value) => {
        return (dispatch, getstate) => {
            dispatch(setPaymentStatus(value))
        }
    },

    //重置按钮状态
    resetBtnStatus: () => {
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.BTN_DISABLE})
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
            },
            error => {
                dispatch(fetchFailure())
                Toast.fail(error, 1)
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
            }, error => {
                dispatch(fetchFailure())
                Toast.fail(error, 1)
            }
        )
        .catch(err => {
            dispatch(fetchFailure())
        })
}


//加载预结算信息
function setAdvanceSettleInfo(param,dispatch) {
    let advanceSettleInfo = JSON.stringify(param).replace(/payCost/g, "siPayAmt").replace(/pubCost/g, "pubPayAmt").replace(/ownCost/g, "ownPayAmt").replace(/regFee/g, "totalAmt")
    console.log(JSON.parse(advanceSettleInfo))
    dispatch(fetchSettleSuccess(JSON.parse(advanceSettleInfo)))
}


const setPaymentStatus = (data) => ({
    type: actionTypes.SET_PAYMENT,
    response: data
})

const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST,
})

const fetchSuccess = () => ({
    type: actionTypes.FETCH_SUCCESS,
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
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.FETCH_PERSON_SUCCESS:

            return {
                ...state,
                personEntity: action.response
            }
        case actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS:

            return {
                ...state,
                settleEntity: action.response
            }
        case actionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.BTN_ABLE:
            return {
                ...state,
                btnDisable: false
            }
        case actionTypes.BTN_DISABLE:
            return {
                ...state,
                btnDisable: true
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

export const getBtnDisable = (state) => {
    return state.advanceSettlement.btnDisable
}
