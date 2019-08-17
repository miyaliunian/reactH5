import {cityID} from "@assets/static/DictionaryConstant";
import url from "../../utils/httpUrl";
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";
import Axios from 'axios'

/**
 * Class:
 * Author: wufei
 * Date: 2019/8/17
 * Description:
 *   住院管理 选择医院
 */



const initialState = {
    isFetching: false,
    hospitalizationReservation: [],
    hospitalizationAll: [],
}


// action types
const actionTypes = {

    //医院列表
    FETCH_REQUEST: 'CHOOSE_CATEGORY_HOS/FETCH_REQUEST',
    CHOOSE_CATEGORY_HOS_SUCCESS: 'CHOOSE_CATEGORY_HOS/CHOOSE_CATEGORY_HOS_SUCCESS',
    RESERVATION_HOSPITALS_SUCCESS: 'CHOOSE_CATEGORY_HOS/RESERVATION_HOSPITALS_SUCCESS',
    ALL_HOSPITALS_SUCCESS: 'CHOOSE_CATEGORY_HOS/ALL_HOSPITALS_SUCCESS',
    FETCH_FAILURE: 'CHOOSE_CATEGORY_HOS/FETCH_FAILURE',

    //下拉刷新
    PULLDOWN_REFRESH_HOS: 'CHOOSE_CATEGORY_HOS/PULLDOWN_REFRESH_HOS',

    //上拉加载更多
    PULLUP_MORE_HOS: 'CHOOSE_CATEGORY_HOS/PULLUP_MORE_HOS'

}


// action creators
export const actions = {


    //点击医院列表 加载所有医院数据
    initCategaryHospitalList: (type, perObj, pageNu) => {
        return (dispatch, getstate) => {
            dispatch(fetchRequest())
            Axios.all([getAllHospitalList(url.API_QUERY_ALL_HOSPASTIENT(cityID, type, pageNu), dispatch), getReserHospitalList(url.API_GET_REGED_LIST_BY_OPEN_TYPE(type, perObj.id), dispatch)])
                .then(Axios.spread((reserHosResp, allHosResp) => {
                    dispatch(fetchSuccess())
                }));
        }
    },


    //下拉刷新
    pullDownRefresh: (type, perObj) => {
        return (dispatch, getstate) => {
        }
    },


    //上拉加载更多
    loadMoreAction: (type, hosObj, perObj) => {
        return (dispatch, getstate) => {
            //将选中的医院信息 刷新到页面
            // dispatch(setSelHospitalization(hosObj))
            let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosObj.id, perObj.id)
            return post(queryUrl).then(
                (data) => {
                    if (data.infocode && data.infocode === 1) {
                        // dispatch(hospitalDetail(data.data))
                    } else {
                        // dispatch(hospitalDetailNUll())
                        Toast.fail(data.infomessage, 2);
                    }
                }
            ).catch()
        }
    },

}

//获取:最近预约医院列表
function getReserHospitalList(targetURL, dispatch) {
    return post(targetURL)
        .then((data) => {
                if (data.infocode && data.infocode === 1) {
                    dispatch(loadReservationHospitals(data.data))
                }
            }
        ).catch()
}

//获取:全部医院
function getAllHospitalList(targetURL, dispatch) {
    let params = {
        "areaId": null,
        "hosCategory": null,
        "hosGrade": null
    }
    return post(targetURL, params)
        .then((data) => {
                if (data.infocode && data.infocode === 1) {
                    dispatch(loadAllHospitals(data.data.list))
                }
            }
        ).catch()
}


const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST
})


const fetchSuccess = () => ({
    type: actionTypes.CHOOSE_CATEGORY_HOS_SUCCESS
})

const pullDownRefreshHospitals = (data) => ({
    type: actionTypes.PULLDOWN_REFRESH_HOS,
    response: data
})

const loadReservationHospitals = (data) => ({
    type: actionTypes.RESERVATION_HOSPITALS_SUCCESS,
    response: data
})

const loadAllHospitals = (data) => ({
    type: actionTypes.ALL_HOSPITALS_SUCCESS,
    response: data
})

const pullUpMoreHospitals = (data) => ({
    type: actionTypes.PULLUP_MORE_HOS,
    response: data
})

const fetchFail = () => ({
    type: actionTypes.FETCH_FAILURE
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case actionTypes.CHOOSE_CATEGORY_HOS_SUCCESS:
            return {
                ...state,
                isFetching: true
            }

        case actionTypes.PULLDOWN_REFRESH_HOS:
            return {
                ...state,
                hospitalizationReservation: action.response,
            }

        case actionTypes.RESERVATION_HOSPITALS_SUCCESS:
            return {
                ...state,
                hospitalizationReservation: action.response,
            }
        case actionTypes.ALL_HOSPITALS_SUCCESS:
            return {
                ...state,
                hospitalizationAll: action.response,
            }

        case actionTypes.PULLUP_MORE_HOS:
            return {
                ...state,
                hospitalizationAll: state.hospitalizationAll.concat(action.response),
            }
        case actionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: true
            }

        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.chooseCategoryHospList.isFetching
}

export const getReservationHospitalizationList = (state) => {
    return state.chooseCategoryHospList.hospitalizationReservation
}


export const getAllHospitalizationList = (state) => {
    return state.chooseCategoryHospList.hospitalizationAll
}

