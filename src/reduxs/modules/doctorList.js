/**
 * Class: doctorList
 * Author: wufei
 * Date: 2019-06-18
 * Description:
 *   医生列表
 */

import { PlatformType, DoctorOrderType } from '@api/Constant'
import url from '@api/httpUrl'
import { FETCH_DATA } from '@reduxs/middleware/api'

const initialState = {
  tabSel: 1,
  seeDate: null,
  doctorTitle: null,
  hosGrade: null,
  isFetching: false,
  page: 1,
  data: [], //医生列表
  dataReservation: [] //预约日历
}

const actionTypes = {
  FETCH_DOCTOR_LIST_REQUEST: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_REQUEST',
  FETCH_DOCTOR_LIST_SUCCESS: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_SUCCESS',
  FETCH_DOCTOR_LIST_FAILURE: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_FAILURE',
  FETCH_RESERVATION_LIST_SUCCESS: 'DOCTOR_LIST/FETCH_RESERVATION_LIST_SUCCESS',
  FETCH_RESERVATION_LIST_FAILURE: 'DOCTOR_LIST/FETCH_RESERVATION_LIST_FAILURE',

  TAB_SEL: 'DOCTOR_LIST/TAB_SEL',

  SET_SEEDATE: 'DOCTOR_LIST/SET_SEEDATE',
  //如果选中日历中的任何一个日期，则将服务器返回的日期信息选中状态，全部置为选中状态
  RESET_RESERVATION: 'DOCTOR_LIST/RESET_RESERVATION',
  //退出页面时，清空已经加载的数据
  CLEAR_ALL_ITEMS: 'DOCTOR_LIST/CLEAR_ALL_ITEMS'
}

/**
 * 医生列表、可预约日历列表
 * @type {{loadDoctorList: function(*=), loadReservationList: function(*=)}}
 */
export const actions = {

  loadDoctorList: (id, seeDate = '') => {
    return (dispatch, getstate) => {
      let param = {
        doctorTitle: null,
        hosGrade: null,
        seeDate: null
      }
      if (seeDate !== '') {
        param.seeDate = seeDate
      }
      const targetURL = url.API_DOCTOR_LIST(
        PlatformType.HospitalDepartments,
        id,
        DoctorOrderType.title,
        getstate().doctorList.page
      )
      return dispatch(fetchDoctorList(targetURL, param))
    }
  },

  loadFilterTabList: id => {
    return (dispatch, getstate) => {
      const targetURL = url.API_DOCTOR_RESERVATION_LIST(PlatformType.HospitalDepartments, id, 7)
      return dispatch(fetchReservationList(targetURL))
    }
  },



  //退出页面时，重置数据状态
  clearAllItems: callBack => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CLEAR_ALL_ITEMS })
      callBack()
    }
  },


}

const fetchDoctorList = (targetURL, param) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_DOCTOR_LIST_REQUEST,
      actionTypes.FETCH_DOCTOR_LIST_SUCCESS,
      actionTypes.FETCH_DOCTOR_LIST_FAILURE
    ],
    targetURL
  },
  param
})

const fetchReservationList = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_DOCTOR_LIST_REQUEST,
      actionTypes.FETCH_RESERVATION_LIST_SUCCESS,
      actionTypes.FETCH_RESERVATION_LIST_FAILURE
    ],
    targetURL
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DOCTOR_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_DOCTOR_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.response.data.list
      }
    case actionTypes.FETCH_DOCTOR_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.FETCH_RESERVATION_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataReservation: action.response.data
      }
    case actionTypes.FETCH_RESERVATION_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case actionTypes.TAB_SEL:
      return {
        ...state,
        tabSel: action.response
      }
    case actionTypes.SET_SEEDATE:
      return { ...state, seeDate: action.value }
    case actionTypes.CLEAR_ALL_ITEMS:
      return {
        ...state,
        tabSel: 1,
        seeDate: null,
        doctorTitle: null,
        hosGrade: null,
        isFetching: false,
        page: 1,
        data: [], //医生列表
        dataReservation: [] //预约日历
      }
    default:
      return state
  }
}
export default reducer

//Selectors
export const getFetchStatus = state => {
  return state.doctorList.isFetching
}

export const getSeeDate = state => {
  return state.doctorList.seeDate
}

export const getDoctorList = state => {
  return state.doctorList.data
}

export const getReservationList = state => {
  return state.doctorList.dataReservation
}


