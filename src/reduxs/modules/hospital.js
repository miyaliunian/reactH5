
import { cityID } from "@api/Constant";
import url from "@api/httpUrl";
import { FETCH_DATA } from "../middleware/api";

const initialState = {
  sort: "register", //综合排序:第二个tab默认传综合排序
  isFetching: false,
  isLastPage: false,
  pageNo: 0, //翻页
  data: [] //列表数据
};

// action types
const actionTypes = {
  FETCH_HOSPITAL_REQUEST: "HOSPITAL/FETCH_HOSPITAL_REQUEST",
  FETCH_HOSPITAL_SUCCESS: "HOSPITAL/FETCH_HOSPITAL_SUCCESS",
  FETCH_HOSPITAL_FAILURE: "HOSPITAL/FETCH_HOSPITAL_FAILURE",
  LOAD_MORE_HOSPITAL_SUCCESS: "HOSPITAL/LOAD_MORE_HOSPITAL_SUCCESS",
  FILTER_HOSPITAL_SUCCESS: "HOSPITAL/FILTER_HOSPITAL_SUCCESS",
  RESET: "HOSPITAL/RESET"
};

export const actions = {

  iniHosiList: () => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, 1);
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
  refreshHosiList: (callBack) => {
    return (dispatch, getstate) => {
      const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, 1);
      console.log(
        targetURL
      )
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
        const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, getstate().hospital.pageNo);
        console.log(
          targetURL
        )
        let param = {
          areaId:  null,
          hosCategory: null,
          hosGrade: null
        };
        return dispatch(mroeHosipitalList(targetURL, param,cbf));
      };
    },



  //tab过滤数据
  filterHosiContentList: (filter) => {
    return (dispatch, getstate) => {
      const { AREA, SORT, FILTER } = filter;
      const targetURL = url.API_HOSPITAL_LIST(cityID, typeof (SORT.obj.value) === "undefined" ? "register" : SORT.obj.value, "1");
      let param = {
        areaId: AREA.obj.code || null,
        hosCategory: FILTER.obj[0].value || null,
        hosGrade: FILTER.obj[1].value || null
      };
      return dispatch(filterHosListBy(targetURL, param))
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


const mroeHosipitalList = (targetURL, param,callBack='') => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_HOSPITAL_REQUEST,
      actionTypes.LOAD_MORE_HOSPITAL_SUCCESS,
      actionTypes.FETCH_HOSPITAL_FAILURE
    ],
    targetURL
  },
  param,
  callBack
});



const filterHosListBy = (targetURL, param) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_HOSPITAL_REQUEST,
      actionTypes.FILTER_HOSPITAL_SUCCESS,
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
        pageNo: action.response.data.pageNo += 1,
        data: action.response.data.list
      };
    case actionTypes.LOAD_MORE_HOSPITAL_SUCCESS:
      console.table(state)
      console.table(action)
      return {
        ...state,
        isFetching: false,
        isLastPage: action.response.data.lastPage,
        pageNo: action.response.data.pageNo += 1,
        data: state.data.concat(action.response.data.list)
      };
    case actionTypes.FILTER_HOSPITAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLastPage: action.response.data.lastPage,
        pageNo: 1,
        data: action.response.data.list
      };
    case actionTypes.FETCH_HOSPITAL_FAILURE:
      return { ...state, isFetching: false };
    case actionTypes.RESET:
      return {
        ...state,
        sort: "register",
        isFetching: false,
        isLastPage: false,
        pageNo: 1,
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
