import { cityID } from '@api/Constant'
import url from '@api/httpUrl'
import { FETCH_DATA } from '../middleware/api'
import React, { Component } from 'react'

/**
 * 医保信息 reduce
 * by WF 20191217
 */
const initialState = {
  isFetching: false,
  isLastPage: false,
  page: 1, //翻页
  data: [] //列表数据
}

// action types
const actionTypes = {
  FETCH_INFO_REQUEST: 'INFO/FETCH_INFO_REQUEST',
  FETCH_INFO_SUCCESS: 'INFO/FETCH_INFO_SUCCESS',
  FETCH_INFO_FAILURE: 'INFO/FETCH_INFO_FAILURE',
  RESET: 'INFO/RESET'
}

// action creators
export const actions = {
  //加载列表
  fetchSiDynamicInfoList: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOME_SCROLL_BANNER(cityID)
      console.log('2222: ' + targetURL)
      return dispatch(fetchSiDynamicInfoList(targetURL))
    }
  },

  //下拉刷新
  refreshSiDynamicInfoList: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOME_SCROLL_BANNER(cityID)
      return dispatch(refreshSiDynamicInfoList(targetURL))
    }
  },
  //清空
  reset: () => ({
    type: actionTypes.RESET
  })
}

// action creators：二
const fetchSiDynamicInfoList = targetURL => ({
  [FETCH_DATA]: {
    types: [actionTypes.FETCH_INFO_REQUEST, actionTypes.FETCH_INFO_SUCCESS, actionTypes.FETCH_INFO_FAILURE],
    targetURL
  }
})

const refreshSiDynamicInfoList = targetURL => ({
  [FETCH_DATA]: {
    types: [actionTypes.FETCH_INFO_REQUEST, actionTypes.FETCH_INFO_SUCCESS, actionTypes.FETCH_INFO_FAILURE],
    targetURL
  }
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INFO_REQUEST:
      return { ...state, isFetching: true }
    case actionTypes.FETCH_INFO_SUCCESS:
      const { ebDynamicList } = action.response.data
      return {
        ...state,
        isFetching: false,
        isLastPage: true,
        page: 1,
        data: ebDynamicList
      }
    case actionTypes.FETCH_INFO_FAILURE:
      return { ...state, isFetching: false }
    case actionTypes.RESET:
      return {
        ...state,
        isFetching: false,
        isLastPage: false,
        page: 1,
        data: []
      }
    default:
      return state
  }
}
export default reducer

//selectors
export const getSiDynamicInfoList = state => {
  return state.siDynamicInfo.data
}

export const getFetchingStatus = state => {
  return state.siDynamicInfo.isFetching
}

export const getIsLastPage = state => {
  return state.siDynamicInfo.isLastPage
}
