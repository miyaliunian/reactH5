/**
 * Class: bindCard
 * Author: wufei
 * Date: 2019/6/10
 * Description:
 *   卡绑定
 */

import { FETCH_DATA } from '@reduxs/middleware/api'
import URL from '@api/httpUrl'
import { post } from '@api/httpUtil'
import { Toast } from 'antd-mobile/lib/index'

const initialState = {
  isFetching: false,
  data: [], //列表数据
  waitingList: [] // 智能候诊列表数据
}

const actionTypes = {
  FETCH_BIND_CARD_REQUEST: 'BINDCARD/FETCH_BIND_CARD_REQUEST',
  FETCH_BIND_CARD_SUCCESS: 'BINDCARD/FETCH_BIND_CARD_SUCCESS',
  FETCH_BIND_CARD_FAILURE: 'BINDCARD/FETCH_BIND_CARD_FAILURE',

  //智能候诊获取列表
  FETCH_WAITING_SUCCESS: 'BINDCARD/FETCH_WAITING_SUCCESS',
  //智能候诊获取家庭成员
  FETCH_WAITING_BIND_CARD_SUCCESS: 'BINDCARD/FETCH_WAITING_BIND_CARD_SUCCESS',
  //重置智能候诊列表
  RESET_WAITING_ITEM: 'BINDCARD/RESET_WAITING_ITEM',

  SET_BINDCARD_ITEM: 'BINDCARD/SET_BINDCARD_ITEM',
  RESET_BINDCARD_ITEM: 'BINDCARD/RESET_BINDCARD_ITEM'
}

export const actions = {
  loadList: () => {
    return (dispatch, getstate) => {
      const targetURL = URL.API__BIND_CARD_LIST()
      return dispatch(loadBindCardList(targetURL))
    }
  },

  loadWaitingList: () => {
    let person
    return (dispatch, getstate) => {
      const targetURL = URL.API__BIND_CARD_LIST()
      return post(targetURL).then(data => {
        data.data.map((item, index) => {
          if (item.def) {
            person = item
          }
        })
        dispatch(fetchBindCardSuccess(data.data))
        if (person) {
          const targetURL = URL.API__INTELLIGENT_WAITING_LIST(person.id)
          return dispatch(loadIntelligentWaitingList(targetURL))
        }
      })
    }
  },
  loadingWaitingListByPersonId: personid => {
    return (dispatch, getstate) => {
      const targetURL = URL.API__INTELLIGENT_WAITING_LIST(personid)
      return dispatch(loadingWaitingListByPersonId(targetURL))
    }
  },
  //状态初始值
  setBindCard: item => ({
    type: actionTypes.SET_BINDCARD_ITEM,
    item
  }),

  //数据清空
  resetBindCard: () => ({
    type: actionTypes.RESET_BINDCARD_ITEM
  }),

  resetWaitingList: () => ({
    type: actionTypes.RESET_WAITING_ITEM
  })
}

const loadBindCardList = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_BIND_CARD_REQUEST,
      actionTypes.FETCH_BIND_CARD_SUCCESS,
      actionTypes.FETCH_BIND_CARD_FAILURE
    ],
    targetURL,
    schema: { name: 'bindCard' }
  }
})

const loadIntelligentWaitingList = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_BIND_CARD_REQUEST,
      actionTypes.FETCH_WAITING_SUCCESS,
      actionTypes.FETCH_BIND_CARD_FAILURE
    ],
    targetURL
  }
})

const loadingWaitingListByPersonId = targetURL => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_BIND_CARD_REQUEST,
      actionTypes.FETCH_WAITING_SUCCESS,
      actionTypes.FETCH_BIND_CARD_FAILURE
    ],
    targetURL
  }
})

const fetchBindCardSuccess = data => ({
  type: actionTypes.FETCH_WAITING_BIND_CARD_SUCCESS,
  data
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BIND_CARD_REQUEST:
      return { ...state, isFetching: true }
    case actionTypes.FETCH_BIND_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.response.data
      }
    case actionTypes.FETCH_WAITING_BIND_CARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case actionTypes.FETCH_WAITING_SUCCESS:
      if (action.response.infocode !== 1) {
        Toast.fail(action.response.infomessage, 2)
        return { ...state, isFetching: false }
      }
      return {
        ...state,
        isFetching: false,
        waitingList: action.response.data
      }
    case actionTypes.FETCH_BIND_CARD_FAILURE:
      return { ...state, isFetching: false }
    case actionTypes.SET_BINDCARD_ITEM:
      return {
        ...state,
        isFetching: false,
        data: action.item
      }
    case actionTypes.RESET_BINDCARD_ITEM:
      return {
        ...state,
        isFetching: false,
        data: []
      }
    case actionTypes.RESET_WAITING_ITEM:
      return {
        ...state,
        isFetching: false,
        waitingList: []
      }
    default:
      return state
  }
}
export default reducer

//selectors
export const getBindCardList = state => {
  return state.bindCard.data
}

export const getIntelligentWaitingList = state => {
  return state.bindCard.waitingList
}

export const getFetchingStatus = state => {
  return state.bindCard.isFetching
}
