
import { cityID } from "@api/Constant";
import url from "@api/httpUrl";
import { FETCH_DATA } from "../middleware/api";

const initialState = {
  sort: "register", //综合排序:第二个tab默认传综合排序

  isFetching: false,
  isLastPage: false,
  refreshed:false,//下拉刷新动作是否完成
  reset:false,//上拉加载更多动作是否完成
  page: 1, //翻页
  data: [] //列表数据
};

// action types
const actionTypes = {
  FETCH_HOSPITAL_REQUEST: "HOSPITAL/FETCH_HOSPITAL_REQUEST",
  FETCH_HOSPITAL_SUCCESS: "HOSPITAL/FETCH_HOSPITAL_SUCCESS",
  FETCH_HOSPITAL_FAILURE: "HOSPITAL/FETCH_HOSPITAL_FAILURE",
  REFRESH_HOSPITAL_SUCCESS: "HOSPITAL/REFRESH_HOSPITAL_SUCCESS",
  FETCH_HOSPITAL_BY_SUCCESS: "HOSPITAL/REFRESH_HOSPITAL_BY_SUCCESS",
  SET_PAGE: "HOSPITAL/SET_PAGE",
  RESET: "HOSPITAL/RESET"
};

// action creators
export const actions = {

  //初始化
  iniHosipitalList: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, getstate().hospital.page);
      let param = {
        areaId:  null,
        hosCategory: null,
        hosGrade: null
      };
      return dispatch(fetchHosipitalList(targetURL, param));
    };
  },

  /**
   * 下拉刷新
   * @param cbf  回调函数
   * @returns {function(*, *): *}
   */
  refreshHosipitalList: (callBack) => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, getstate().hospital.page);
      let param = {
        areaId:  null,
        hosCategory: null,
        hosGrade: null
      };
      return dispatch(fetchHosipitalList(targetURL, param,callBack));
    };
  },


  /**
   * 加载更多
   * @param cbf  回调标识
   * @returns {function(*, *): *}
   */
    moreHosipitalList: (cbf) => {
      return (dispatch, getstate) => {
        const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, getstate().hospital.page);
        let param = {
          areaId:  null,
          hosCategory: null,
          hosGrade: null
        };
        return dispatch(fetchHosipitalList(targetURL, param,cbf));
      };
    },

  //tab过滤数据
  filterHosipitalList: (filter) => {
    return (dispatch, getstate) => {
      const { AREA, SORT, FILTER } = filter;
      const targetURL = url.API_HOSPITAL_LIST(cityID, typeof (SORT.obj.value) === "undefined" ? "register" : SORT.obj.value, "1");
      let param = {
        areaId: AREA.obj.code || null,
        hosCategory: FILTER.obj[0].value || null,
        hosGrade: FILTER.obj[1].value || null
      };
      return dispatch(fetchHosipitalListBy(targetURL, param))
    };
  },


  //清空
  reset: () => ({
    type: actionTypes.RESET
  })
};

const fetchHosipitalList = (targetURL, param,callBack='') => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_HOSPITAL_REQUEST,
      actionTypes.FETCH_HOSPITAL_SUCCESS,
      actionTypes.FETCH_HOSPITAL_FAILURE
    ],
    targetURL
  },
  param,
  callBack
});



const fetchHosipitalListBy = (targetURL, param) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_HOSPITAL_REQUEST,
      actionTypes.FETCH_HOSPITAL_BY_SUCCESS,
      actionTypes.FETCH_HOSPITAL_FAILURE
    ],
    targetURL
  },
  param
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOSPITAL_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_HOSPITAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLastPage: action.response.data.lastPage,
        page: (state.page += 1),
        data: state.data.concat(action.response.data.list)
      };
    case actionTypes.REFRESH_HOSPITAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLastPage: action.response.data.lastPage,
        page: 2,
        data: action.response.data.list
      };
    case actionTypes.FETCH_HOSPITAL_BY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLastPage: action.response.data.lastPage,
        page: 2,
        data: action.response.data.list
      };
    case actionTypes.FETCH_HOSPITAL_FAILURE:
      return { ...state, isFetching: false };
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: 1
      };

    case actionTypes.RESET:
      return {
        ...state,
        areaId: "",
        sort: "register",
        hosCategory: "",
        hosGrade: "",
        isFetching: false,
        isLastPage: false,
        page: 1,
        data: []
      };
    default:
      return state;
  }
};
export default reducer;

//selectors
export const getHospitalList = state => {
  return state.hospital.data;
};

export const getFetchingStatus = state => {
  return state.hospital.isFetching;
};

export const getIsLastPage = state => {
  return state.hospital.isLastPage;
};
