/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description: 提供用Reducer
 *
 */

const createReducer = (name) => {
    return (state = {}, action) => {
        if (action.response && action.response[name]) {
            return {...state, ...action.response[name]}
        }
        return state
    }
}

export default  createReducer