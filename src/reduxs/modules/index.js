/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  合并所有页面的UI状态以及业务数据状态
 *
 */
import {combineReducers} from 'redux'
import entities from './entities' //业务数据状态
//################################# 页面对应的UI状态
import app from './app'
import login from './login'
import detail from './detail'
import home from './home'
import tabs from './tabs'
import hospital from './hospital'
import division from './division'
import bindCard from './bindCard'
import bindCardIList from './bindCardIList'
import doctorList from './doctorList'
import doctor from './doctor'
import reservation from './reservation'
import register from './register'
import intelligentWaiting from './intelligentWaiting'
import hospitalizationManagement from './hospitalizationManagement'
import historyAdvancePayment from './historyAdvancePayment'
import categoryHospList from './categoryHospList'
import dailyListQueryPayment from './dailyListQueryPayment'
import advanceSettlement from './advanceSettlement'
import medicarePay from './medicarePay'
import popUp from './popUp'

//合并成根Reducer
const rootReducer = combineReducers({
    entities,
    login,
    app,
    detail,
    home,
    tabs,
    hospital,
    division,
    bindCard,
    bindCardIList,
    doctorList,
    doctor,
    reservation,
    register,
    intelligentWaiting,
    hospitalizationManagement,
    historyAdvancePayment,
    categoryHospList,
    dailyListQueryPayment,
    advanceSettlement,
    medicarePay,
    popUp
})

export default rootReducer
