import {cityID} from "@assets/static/DictionaryConstant";
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";
import Axios from 'axios'

/**
 * Class:
 * Author: wufei
 * Date: 2019/8/14
 * Description:
 *    住院管理 reduce
 */


const initialState = {
    isFetching: false,
    hospitalizationReservation: [],
    hospitalizationAll: [],
    hospitalizationSel: '',
    HospitalDetails: ''
}


// action types
const actionTypes = {

    //住院服务
    FETCH_HOSPITALIZATION_REQUEST: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_REQUEST',
    FETCH_HOSPITALIZATION_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITAL_SUCCESS',
    FETCH_HOSPITALIZATION_FAILURE: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_FAILURE',
    REFSET_HOSPITALIZATION: 'HOSPITALIZATION_MANAGEMENT/REFSET_HOSPITALIZATION',

    //选择医院
    LOAD_RESERVATION_HOSPITALS_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/LOAD_RESERVATION_HOSPITALS_SUCCESS',
    LOAD_ALL_HOSPITALS_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/LOAD_ALL_HOSPITALS_SUCCESS',

    //
    HOSPITAL_INFO_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/HOSPITAL_INFO_SUCCESS',
    HOSPITAL_INFO_NULL: 'HOSPITALIZATION_MANAGEMENT/HOSPITAL_INFO_NULL',


}


// action creators
export const actions = {
    //加载医院
    getRegedListByOpenType: (type, perObj) => {
        return (dispatch, getstate) => {
            dispatch(fetchRequest())
            const targetURL = url.API_GET_REGED_LIST_BY_OPEN_TYPE(type, perObj.id)
            return post(targetURL).then(
                (data) => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(fetchHospitalizationSuccess(data.data))
                        //请求住院信息(默认的)
                        let hosDef = data.data[0]
                        let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosDef.id, perObj.id)
                        return post(queryUrl).then(
                            (data) => {
                                if (data.infocode && data.infocode === 1) {
                                    dispatch(hospitalDetail(data.data))
                                } else {
                                    dispatch(fetchEnd())
                                    Toast.fail(data.infomessage, 2);
                                }
                            }
                        ).catch()
                    }
                }
            ).catch()
        }
    },


    //点击医院列表 加载所有医院数据
    fetchAllCategaryHospitalList: (type, perObj, pageNu) => {
        return (dispatch, getstate) => {
            Axios.all([getAllHospitalList(url.API_QUERY_ALL_HOSPASTIENT(cityID, type, pageNu), dispatch), getReserHospitalList(url.API_GET_REGED_LIST_BY_OPEN_TYPE(type, perObj.id), dispatch)])
                .then(Axios.spread((reserHosResp, allHosResp) => {

                }));
        }
    },


    //切换家庭成员、医院 重新刷新住院信息
    refreshRegedListByOpenType: (type, hosObj, perObj) => {
        return (dispatch, getstate) => {
            //将选中的医院信息 刷新到页面
            dispatch(setSelHospitalization(hosObj))
            let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosObj.id, perObj.id)
            return post(queryUrl).then(
                (data) => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(hospitalDetail(data.data))
                    } else {
                        dispatch(hospitalDetailNUll())
                        Toast.fail(data.infomessage, 2);
                    }
                }
            ).catch()
        }
    },
}

//最近预约信息
function getReserHospitalList(targetURL, dispatch) {
    return post(targetURL)
        .then((data) => {
                if (data.infocode && data.infocode === 1) {
                    dispatch(loadReservationHospitals(data.data))
                }
            }
        ).catch()
}

//全部医院
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
    type: actionTypes.FETCH_HOSPITALIZATION_REQUEST
})

const fetchEnd = () => ({
    type: actionTypes.FETCH_HOSPITALIZATION_FAILURE
})
const fetchHospitalizationSuccess = (data) => ({
    type: actionTypes.FETCH_HOSPITALIZATION_SUCCESS,
    response: data
})
const setSelHospitalization = (data) => ({
    type: actionTypes.REFSET_HOSPITALIZATION,
    response: data
})


const loadReservationHospitals = (data) => ({
    type: actionTypes.LOAD_RESERVATION_HOSPITALS_SUCCESS,
    response: data
})

const loadAllHospitals = (data) => ({
    type: actionTypes.LOAD_ALL_HOSPITALS_SUCCESS,
    response: data
})


const hospitalDetail = (data) => ({
    type: actionTypes.HOSPITAL_INFO_SUCCESS,
    response: data
})
const hospitalDetailNUll = () => ({
    type: actionTypes.HOSPITAL_INFO_NULL,
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOSPITALIZATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_HOSPITALIZATION_SUCCESS:
            return {
                ...state,
                hospitalizationSel: action.response[0],
            }
        case actionTypes.FETCH_HOSPITALIZATION_FAILURE:
            return {
                ...state,
                isFetching: false
            }

        //    住院信息
        case actionTypes.REFSET_HOSPITALIZATION:
            return {
                ...state,
                hospitalizationSel: action.response,
                isFetching: true
            }
        case actionTypes.HOSPITAL_INFO_SUCCESS:
            return {
                ...state,
                HospitalDetails: action.response,
                isFetching: false
            }
        case actionTypes.HOSPITAL_INFO_NULL:
            return {
                ...state,
                HospitalDetails: '',
                isFetching: false
            }

        //    选择医院
        case actionTypes.LOAD_RESERVATION_HOSPITALS_SUCCESS:
            return {
                ...state,
                hospitalizationReservation: action.response,
            }
        case actionTypes.LOAD_ALL_HOSPITALS_SUCCESS:
            return {
                ...state,
                hospitalizationAll: action.response,
            }

        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.hospitalizationManagement.isFetching
}

export const getReservationHospitalizationList = (state) => {
    return state.hospitalizationManagement.hospitalizationReservation
}


export const getAllHospitalizationList = (state) => {
    return state.hospitalizationManagement.hospitalizationAll
}

export const getSelHospitalization = (state) => {
    return state.hospitalizationManagement.hospitalizationSel
}


export const getHospitalDetails = (state) => {
    return state.hospitalizationManagement.HospitalDetails
}
