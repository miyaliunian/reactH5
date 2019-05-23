/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  通用基础状态：登录状态、错误状态
 *
 */
const initialState = {
    error: null

}

//定义action type
export const types = {
    CLEAR_ERROR: "APP/CLEAR_ERROR"
}

//创建 action creators
export const actions = {
    clearError: () => ({
        type: types.CLEAR_ERROR
    })
}

const reducer = (state = initialState, action) => {
    const {type, error} = action
    if (type === types.CLEAR_ERROR) {
        return {...state, error: null}
    } else if (error) {
        return {...state, error: error}
    }
    return state
}


export default reducer

// selectors
export const getError = (state) => {
    return state.app.error
}