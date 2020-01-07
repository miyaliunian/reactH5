/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *  某个门诊 对应的医生列表
 */

import url from "@api/httpUrl";
import { cityID, DOCTORTABKAY } from "@api/Constant";
import { FETCH_DATA } from "../middleware/api";


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
  CHANGE_FILTER_DOCTOR: "CHANGE_FILTER_DOCTOR",
};

// action creators
export const actions = {

  //切换tab
  changeTab: (key) => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CHANGE_TAB_DOCTOR, actionKey: key});
    };
  },




  // 遮罩空白区域事件
  closePanelAction: (i) => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CLOSE_PANEL });
      i()
    };
  }

};

// action creators：二
const fetchAreasList = targetURL => ({
  [FETCH_DATA]: {
    types: [actionTypes.FETCH_AREAS_REQUEST, actionTypes.FETCH_AREAS_SUCCESS, actionTypes.FETCH_AREAS_FAILURE],
    targetURL
  }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TAB_DOCTOR:
      return {
        ...state,
        actionKey: action.actionKey,
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

