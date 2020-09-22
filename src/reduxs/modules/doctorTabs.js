/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *  某个门诊 对应的医生列表
 */

import { cityID, DOCTORTABKAY } from "@api/Constant";


let tabs = {};
tabs[DOCTORTABKAY.expert] = {
  key: DOCTORTABKAY.expert,
  text: "按专家预约",
  obj: {}
};
tabs[DOCTORTABKAY.date] = {
  key: DOCTORTABKAY.date,
  text: "按日期预约",
  obj: {}
};

const initialState = {
  headerTabs: tabs,
  actionKey: DOCTORTABKAY.expert,
};

// action types
const actionTypes = {
  CHANGE_TAB_DOCTOR: "CHANGE_TAB_DOCTOR",
  INIT_TAB_DOCTOR: "INIT_TAB_DOCTOR",
  CHANGE_FILTER_DOCTOR: "CHANGE_FILTER_DOCTOR",
};

// action creators
export const actions = {

  //切换tab
  changeTab: (key,i) => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CHANGE_TAB_DOCTOR, actionKey: key});
      i()
    };
  },

  //初始化tab选中
  iniActionKey:()=>{
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.INIT_TAB_DOCTOR});
    }
  }

};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TAB_DOCTOR:
      return {
        ...state,
        actionKey: action.actionKey,
      };

    case actionTypes.INIT_TAB_DOCTOR:
      return {
        ...state,
        actionKey: DOCTORTABKAY.expert,
      };

    default:
      return state;
  }
};

export default reducer;


export const getTabs = state => {
  return state.doctorTabs.headerTabs;
};


export const getActionTabKey = state => {
  return state.doctorTabs.actionKey;
};

