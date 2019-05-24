/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  合并业务数据Reducer
 *
 */
import {combineReducers} from 'redux'
import products from './products'
import shops from './shops'
import orders from './orders'
import comments from './comments'

//合并业务数据状态
 const businessReducer = combineReducers({
    products,
    shops,
    orders,
    comments
})

export default businessReducer