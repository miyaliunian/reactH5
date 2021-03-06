/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  合并所有页面的UI状态以及业务数据状态
 *
 */
import { combineReducers } from "redux";
//################################# 页面对应的UI状态
import app from "./app";
import login from "./login";
import detail from "./detail";
import home from "./home";
import tabs from "./tabs";
import hospital from "./hospital";
import siDynamicInfo from "./siDynamicInfo";
import division from "./division";
import bindCard from "./bindCard";
import bindCardIList from "./bindCardIList";
import doctorList from "./doctorList";
import doctorTabs from "./doctorTabs";
import doctor from "./doctor";
import reservation from "./reservation";
import register from "./register";
import report from "./report";
import reportDetail from "./reportDetail";
import reportExamine from "./reportExamine";
import intelligentWaiting from "./intelligentWaiting";
import hospitalizationManagement from "./hospitalizationManagement";
import historyAdvancePayment from "./historyAdvancePayment";
import categoryHospList from "./categoryHospList";
import dailyListQueryPayment from "./dailyListQueryPayment";
import advanceSettlement from "./advanceSettlement";
import medicarePay from "./medicarePay";
import thirdPay from "./thirdPay";
import payResult from "./payResult";
import popUp from "./popUp";
import orderPay from "./orderPay";
import outpatientPayment from "./outpatientPayment";
import outpatientPaymentDetail from "./outpatientPaymentDetail";
import myOrderTabs from "./myOrderTabs";
import registerDetail from "./registerDetail";

//合并成根Reducer
const rootReducer = combineReducers({
  login,
  app,
  detail,
  home,
  tabs,
  hospital,
  siDynamicInfo,
  division,
  bindCard,
  bindCardIList,
  doctorList,
  doctorTabs,
  doctor,
  reservation,
  register,
  report,
  reportDetail,
  reportExamine,
  intelligentWaiting,
  hospitalizationManagement,
  historyAdvancePayment,
  categoryHospList,
  dailyListQueryPayment,
  orderPay,
  advanceSettlement,
  medicarePay,
  thirdPay,
  payResult,
  popUp,
  outpatientPayment,
  outpatientPaymentDetail,
  myOrderTabs,
  registerDetail
});

export default rootReducer;
