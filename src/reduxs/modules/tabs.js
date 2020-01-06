/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *  tabs reducer
 */

import url from "@api/httpUrl";
import { cityID, TABKAY, SX } from "@api/Constant";
import { FETCH_DATA } from "../middleware/api";


let tabs = {};
tabs[TABKAY.AREA] = {
  key: TABKAY.AREA,
  text: "全部区域",
  obj: {}
};
tabs[TABKAY.SORT] = {
  key: TABKAY.SORT,
  text: "综合排序",
  obj: {}
};
tabs[TABKAY.FILTER] = {
  key: TABKAY.FILTER,
  text: "筛选",
  obj: {}
};
const initialState = {
  areas: [{ id: "", name: "全部区域" }],
  tabs: tabs,
  actionKey: TABKAY.AREA,
  closePanel: true // 标识panel div 是否显示
};

// action types
const actionTypes = {
  CHANGE_TAB: "CHANGE_TAB",
  CHANGE_FILTER: "CHANGE_FILTER",
  FETCH_AREAS_REQUEST: "TABS/FETCH__AREAS_REQUEST",
  FETCH_AREAS_SUCCESS: "TABS/FETCH__AREAS_SUCCESS",
  FETCH_AREAS_FAILURE: "TABS/FETCH__AREAS_FAILURE"
};

// action creators
export const actions = {

  //加载全部区域tab的列表数据
  loadAreas: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API_AREA_LIST(cityID);
      return dispatch(fetchAreasList(targetURL));
    };
  },

  //切换tab
  changeTab: (key, closePanel) => {
    return (dispatch, getstate) => {
      dispatch({ type: actionTypes.CHANGE_TAB, actionKey: key, closePanel: closePanel });
    };
  },

  //每个tab对应的列表 元素被点击时 调用这个方法
  changeFilter: (item, key) => {
    return (dispatch, getstate) => {
      if (key == TABKAY.FILTER) {

      } else {
        let newtabs = JSON.parse(JSON.stringify(getstate().tabs.tabs));
        newtabs[key] = {
          key: key,
          text: item.name,
          obj: item
        };

        dispatch({ type: actionTypes.CHANGE_FILTER, tab: newtabs,closePanel:true});
      }
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
    case actionTypes.CHANGE_TAB:
      return {
        ...state,
        actionKey: action.actionKey,
        closePanel: action.closePanel
      };
    case actionTypes.CHANGE_FILTER:
      return {
        ...state,
        tabs: action.tab,
        closePanel:action.closePanel
      };
    case actionTypes.FETCH_AREAS_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_AREAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        areas: state.areas.concat(action.response.data)
      };
    case actionTypes.FETCH_AREAS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default reducer;

//selectors
export const getAreasList = state => {
  return state.tabs.areas;
};


export const getTabs = state => {
  return state.tabs.tabs;
};

export const getActionKey = state => {
  return state.tabs.actionKey;
};

export const getClosePanel = state => {
  return state.tabs.closePanel;
};
