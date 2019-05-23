/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  合并所有页面的UI状态以及业务数据状态
 *
 */
import {combineReducers} from 'redux'
//业务数据状态
import entities from './entities'
// 页面对应的UI状态
import app from './app'
import detail from './detail'
import home from './home'

//合并根Reducer
const rootReducer = combineReducers({
    entities,
    app,
    detail,
    home
})

export default rootReducer