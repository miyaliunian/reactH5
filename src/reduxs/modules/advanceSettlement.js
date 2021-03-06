/**
 * Class: advanceSettlement
 * Author: wufei
 * Date: 2019/9/3
 * Description:
 *  订单预结算
 */

import URL from '@api/httpUrl'
import { post } from '@api/httpUtil'
import Axios from 'axios'
import { Toast } from 'antd-mobile'

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
      Axios.all([
        loadPerson(URL.API_PERSON(patientId)),
        loadAdvanceSettleInfo(URL.API_ADVANCE_SETTLE(ordertype, orderid))
      ])
        .then(
          Axios.spread((personResp, advanceSettleResp) => {
            let per = false
            let ad = false
            //家庭成员
            if (personResp.infocode === 1) {
              per = true
              dispatch(fetchPersonSuccess(personResp.data))
            } else {
              Toast.info(personResp.infomessage, 2)
              return Promise.reject({ message: personResp.infomessage })
            }
            //预约信息
            if (advanceSettleResp.infocode === 1) {
              ad = true
              dispatch(fetchSettleSuccess(advanceSettleResp.data))
            } else {
              Toast.info(advanceSettleResp.infomessage, 2)
              return Promise.reject({ message: advanceSettleResp.infomessage })
            }

            if (per && ad) {
              dispatch({ type: actionTypes.BTN_ABLE })
            }
          })
        )
        .catch(
          Axios.spread((personResp, advanceSettleResp) => {
            dispatch(fetchFailure())
          })
        )
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
      Axios.all([loadPerson(URL.API_PERSON_PAYED(patientId)), setAdvanceSettleInfo(reservation)])
        .then(
          Axios.spread((personResp, advanceSettleResp) => {
            let per = false
            //家庭成员
            if (personResp.infocode === 1) {
              per = true
              dispatch(fetchPersonSuccess(personResp.data))
            } else {
              Toast.info(personResp.infomessage, 2)
              return Promise.reject({ message: personResp.infomessage })
            }

            //预约信息 字段处理
            dispatch(fetchSettleSuccess(JSON.parse(advanceSettleResp)))

            if (per) {
              dispatch({ type: actionTypes.BTN_ABLE })
            }
          })
        )
        .catch(
          Axios.spread((personResp, advanceSettleResp) => {
            dispatch(fetchFailure())
          })
        )
    }
  },

  //刷新订单支付状态
  setPaymentStatus: value => {
    return (dispatch, getstate) => {
      dispatch(setPaymentStatus(value))
    }
  },

  //重置按钮状态
  resetBtnStatus: () => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.BTN_DISABLE })
    }
  }
}

//加载人员信息
function loadPerson(targetUrl) {
  return post(targetUrl).then(data => data)
}

//加载预结算信息
function loadAdvanceSettleInfo(targetUrl) {
  return post(targetUrl).then(data => data)
}

//加载预结算信息:字段处理
function setAdvanceSettleInfo(param) {
  let advanceSettleInfo = JSON.stringify(param)
    .replace(/payCost/g, 'siPayAmt')
    .replace(/pubCost/g, 'pubPayAmt')
    .replace(/ownCost/g, 'ownPayAmt')
    .replace(/regFee/g, 'totalAmt')
  return Promise.resolve(advanceSettleInfo)
}

const setPaymentStatus = data => ({
  type: actionTypes.SET_PAYMENT,
  response: data
})

const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
})

const fetchPersonSuccess = data => ({
  type: actionTypes.FETCH_PERSON_SUCCESS,
  response: data
})

const fetchSettleSuccess = data => ({
  type: actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS,
  response: data
})

const fetchFailure = () => ({
  type: actionTypes.FETCH_FAILURE
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
export const getPaymentStatus = state => {
  return state.advanceSettlement.paymentStatus
}

export const getFetchingStatus = state => {
  return state.advanceSettlement.isFetching
}

export const getPerInfo = state => {
  return state.advanceSettlement.personEntity
}

export const getAdvanceSttle = state => {
  return state.advanceSettlement.settleEntity
}

export const getBtnDisable = state => {
  return state.advanceSettlement.btnDisable
}
