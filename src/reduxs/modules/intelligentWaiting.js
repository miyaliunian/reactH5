import url from '../../utils/httpUrl'
import { FETCH_DATA } from '../middleware/api'

/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/20
 * Description:
 *    智能候诊 reduce
 *
 */

const initialState = {
  personid: '', //家庭成员id
  isFetching: false,
  data: [] //列表数据
}

const actionTypes = {
  FETCH_INTELLIGENT_WAITING_REQUEST: 'INTELLIGENTWAITING/FETCH_INTELLIGENT_WAITING_REQUEST',
  FETCH_INTELLIGENT_WAITING_SUCCESS: 'INTELLIGENTWAITING/FETCH_INTELLIGENT_WAITING_SUCCESS',
  FETCH_INTELLIGENT_WAITING_FAILURE: 'INTELLIGENTWAITING/FETCH_INTELLIGENT_WAITING_FAILURE',

  SET_PERSONID: 'INTELLIGENTWAITING/SET_PERSONID' //家庭成员id
  // SET_INTELLIGENTWAITING_ITEM: 'INTELLIGENTWAITING/SET_INTELLIGENTWAITING_ITEM',
  // RESET_INTELLIGENTWAITING_ITEM: 'INTELLIGENTWAITING/RESET_INTELLIGENTWAITING_ITEM'
}

export const actions = {
  loadList: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API__INTELLIGENT_WAITING_LIST(getstate().intelligentWaiting.personid)
      return dispatch(loadIntelligentWaitingList(targetURL))
    }
  },

  //状态初始值
  setPersonid: id => ({
    type: actionTypes.SET_PERSONID,
    id
  })
}

const loadIntelligentWaitingList = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_INTELLIGENT_WAITING_REQUEST,
      actionTypes.FETCH_INTELLIGENT_WAITING_SUCCESS,
      actionTypes.FETCH_INTELLIGENT_WAITING_FAILURE
    ],
    targetURL
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PERSONID:
      return {
        ...state,
        personid: action.id
      }
    case actionTypes.FETCH_INTELLIGENT_WAITING_REQUEST:
      return { ...state, isFetching: true }
    case actionTypes.FETCH_INTELLIGENT_WAITING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.response.data
      }
    case actionTypes.FETCH_INTELLIGENT_WAITING_FAILURE:
      return { ...state, isFetching: false }
    case actionTypes.SET_INTELLIGENTWAITING_ITEM:
      return {
        ...state,
        isFetching: false,
        data: action.item
      }
    case actionTypes.RESET_INTELLIGENTWAITING_ITEM:
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
export const getIntelligentWaitingList = state => {
  return state.intelligentWaitingList.data
}

export const getFetchingStatus = state => {
  return state.intelligentWaitingList.isFetching
}
