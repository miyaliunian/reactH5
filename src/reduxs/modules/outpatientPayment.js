/**
 * 门诊缴费
 * By Cy 2020-01-03
 */
import { FETCH_DATA } from '@reduxs/middleware/api'
import URL from '@api/httpUrl'
import { post } from '@api/httpUtil'

const initialState = {
  isFetching: false,
  data: [], //列表数据
  familyList: [], //家庭成员列表
  defaultPerson: {}, //默认人员
  hospitalList: [] //人员相关医院列表
}

const actionTypes = {
  FETCH_FAMILY_REQUEST: 'OUTPATIENT/FETCH_FAMILY_REQUEST',
  FETCH_FAMILY_SUCCESS: 'OUTPATIENT/FETCH_FAMILY_SUCCESS',
  FETCH_FAMILY_FAILURE: 'OUTPATIENT/FETCH_FAMILY_FAILURE',

  FETCH_HOSPITAL_BY_PERSON_REQUEST: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_REQUEST',
  FETCH_HOSPITAL_BY_PERSON_SUCCESS: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_SUCCESS',
  FETCH_HOSPITAL_BY_PERSON_FAILURE: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_FAILURE'
}

export const actions = {
  /**
   * 根据类型和用户id获取医院列表
   * @param type 'recipe'为诊间缴费
   * @param personId
   * @returns {function(*=, *): *}
   */
  loadingHospitalListByPersonId: () => {
    let person
    return (dispatch, getstate) => {
      const targetURL = URL.API__BIND_CARD_LIST()
      return post(targetURL).then(data => {
        console.log('1111111111111')
        console.group(data)
        person = getDefaultPersonFromList(data.data)
        dispatch(loadFamilySuccess(data.data))
        if (person) {
          const targetURL1 = URL.API__INTELLIGENT_WAITING_LIST(person.id)
          return dispatch(loadHospitalsByPersonId(targetURL1))
        }
      })
    }
  }
}

/**
 * 从家庭人员列表中筛选出默认人员
 * @param personList
 */
function getDefaultPersonFromList(personList) {
  let defaultPerson
  if (personList) {
    if (personList.length > 1) {
      personList.map((item, index) => {
        if (item.def) {
          defaultPerson = item
        }
      })
      if (!defaultPerson) {
        defaultPerson = personList[0]
      }
    } else {
      defaultPerson = personList[0]
    }
  }
  return defaultPerson
}
const loadFamilySuccess = data => ({
  type: actionTypes.FETCH_FAMILY_SUCCESS,
  data
})
const loadHospitalsByPersonId = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_HOSPITAL_BY_PERSON_REQUEST,
      actionTypes.FETCH_HOSPITAL_BY_PERSON_SUCCESS,
      actionTypes.FETCH_HOSPITAL_BY_PERSON_FAILURE
    ],
    targetURL
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FAMILY_REQUEST:
      return { ...state, isFetching: true }
    case actionTypes.FETCH_FAMILY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        familyList: action.data,
        defaultPerson: getDefaultPersonFromList(action.data)
      }
    case actionTypes.FETCH_HOSPITAL_BY_PERSON_SUCCESS:
      console.group(action.response)
      return {
        ...state,
        hospitalList: action.response
      }
    default:
      return state
  }
}
export default reducer

//selectors
export const getDefaultPerson = state => {
  return state.outpatientPayment.defaultPerson
}
export const getFamilyList = state => {
  return state.outpatientPayment.familyList
}

export const getHospitalList = state => {
  return state.outpatientPayment.hospitalList
}

export const getFetchingStatus = state => {
  return state.outpatientPayment.isFetching
}
