import url from '@api/httpUrl'
import { Toast } from 'antd-mobile'
import { post } from '@api/httpUtil'

/**
 * Class:
 * Author: wufei
 * Date: 2019/8/14
 * Description:
 *    住院管理 reduce
 */

const initialState = {
  isFetching: false,
  hospitalizationSel: '', //选中的医院
  HospitalDetails: '' //住院详情
}

// action types
const actionTypes = {
  //住院服务
  FETCH_HOSPITALIZATION_REQUEST: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_REQUEST',
  FETCH_HOSPITALIZATION_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITAL_SUCCESS',
  FETCH_HOSPITALIZATION_FAILURE: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_FAILURE',
  REFSET_HOSPITALIZATION: 'HOSPITALIZATION_MANAGEMENT/REFSET_HOSPITALIZATION',

  HOSPITAL_INFO_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/HOSPITAL_INFO_SUCCESS',
  HOSPITAL_INFO_NULL: 'HOSPITALIZATION_MANAGEMENT/HOSPITAL_INFO_NULL'
}

// action creators
export const actions = {
  //加载医院
  getRegedListByOpenType: (type, perObj) => {
    return (dispatch, getstate) => {
      dispatch(fetchRequest())
      const targetURL = url.API_GET_REGED_LIST_BY_OPEN_TYPE(type, perObj.id)
      return post(targetURL)
        .then(data => {
          if (data.infocode && data.infocode === 1) {
            dispatch(fetchHospitalizationSuccess(data.data))
            //请求住院信息(默认的)
            let hosDef = data.data[0]
            let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosDef.id, perObj.id)
            return post(queryUrl)
              .then(data => {
                if (data.infocode && data.infocode === 1) {
                  dispatch(hospitalDetail(data.data))
                } else {
                  dispatch(fetchEnd())
                  Toast.fail(data.infomessage, 2)
                }
              })
              .catch()
          }
        })
        .catch()
    }
  },

  //切换家庭成员、医院 重新刷新住院信息
  refreshRegedListByOpenType: (type, hosObj, perObj) => {
    return (dispatch, getstate) => {
      //将选中的医院信息 刷新到页面
      dispatch(setSelHospitalization(hosObj))
      let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosObj.id, perObj.id)
      return post(queryUrl)
        .then(data => {
          if (data.infocode && data.infocode === 1) {
            dispatch(hospitalDetail(data.data))
          } else {
            dispatch(hospitalDetailNUll())
            Toast.fail(data.infomessage, 2)
          }
        })
        .catch()
    }
  },

  //回退页面时 清空选中的 医院
  setHospNUll: () => {
    return (dispatch, getstate) => {
      dispatch(hospitalDetailNUll())
    }
  }
}

const fetchRequest = () => ({
  type: actionTypes.FETCH_HOSPITALIZATION_REQUEST
})

const fetchEnd = () => ({
  type: actionTypes.FETCH_HOSPITALIZATION_FAILURE
})
const fetchHospitalizationSuccess = data => ({
  type: actionTypes.FETCH_HOSPITALIZATION_SUCCESS,
  response: data
})
const setSelHospitalization = data => ({
  type: actionTypes.REFSET_HOSPITALIZATION,
  response: data
})

const hospitalDetail = data => ({
  type: actionTypes.HOSPITAL_INFO_SUCCESS,
  response: data
})
const hospitalDetailNUll = () => ({
  type: actionTypes.HOSPITAL_INFO_NULL
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOSPITALIZATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_HOSPITALIZATION_SUCCESS:
      return {
        ...state,
        hospitalizationSel: action.response[0]
      }
    case actionTypes.FETCH_HOSPITALIZATION_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    //    住院信息
    case actionTypes.REFSET_HOSPITALIZATION:
      return {
        ...state,
        hospitalizationSel: action.response,
        isFetching: true
      }
    case actionTypes.HOSPITAL_INFO_SUCCESS:
      return {
        ...state,
        HospitalDetails: action.response,
        isFetching: false
      }
    case actionTypes.HOSPITAL_INFO_NULL:
      return {
        ...state,
        HospitalDetails: '',
        isFetching: false
      }

    default:
      return state
  }
}
export default reducer

//selectors
export const getFetchingStatus = state => {
  return state.hospitalizationManagement.isFetching
}

export const getSelHospitalization = state => {
  return state.hospitalizationManagement.hospitalizationSel
}

export const getHospitalDetails = state => {
  return state.hospitalizationManagement.HospitalDetails
}
