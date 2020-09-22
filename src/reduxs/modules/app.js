/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  通用基础状态：登录状态、错误状态,登录拦截处理
 *
 */

import { Toast} from 'antd-mobile';
const initialState = {
  error: '',
  token: null,
  fetStatus: false
}

export const actionTypes = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR', //清除错误
  APP_ERROR: 'APP/ERROR'
}

//action creators
export const actions = {
  clearError: () => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CLEAR_ERROR })
    }
  }
}

//reducer
const reducer = (state = initialState, action) => {
  const { type, error } = action
  if (type === actionTypes.CLEAR_ERROR) {
    return { error: '' }
  } else if (error) {
    Toast.info(error)
    return { ...state, error: error }
  }
  return state
}

export default reducer

// selectors
export const getError = state => {
  return state.app.error
}

