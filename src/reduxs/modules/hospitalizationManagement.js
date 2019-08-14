import {cityID} from "@assets/static/DictionaryConstant";
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";

/**
 * Class:
 * Author: wufei
 * Date: 2019/8/14
 * Description:
 *    住院管理 reduce
 *
 */


const initialState = {
    isFetching: false,
    hospitalizationList: [],
    isSelHospitalizationItem: '',
    HospitalDetails: ''
}


// action types
const actionTypes = {
    //标识当前页是否为上页面返回
    ISREFRESH: 'HOSPITALIZATION_MANAGEMENT/ISREFRESH',
    //家庭成员列表
    BIND_CARD_LIST: 'HOSPITALIZATION_MANAGEMENT/BIND_CARD_LIST',
    //请求医院列表
    FETCH_HOSPITALIZATION_REQUEST: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_REQUEST',
    FETCH_HOSPITALIZATION_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITAL_SUCCESS',
    HOSPITAL_INFO_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/HOSPITAL_INFO_SUCCESS',
    FETCH_HOSPITALIZATION_FAILURE: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_FAILURE',
}


// action creators
export const actions = {
    //加载医院
    getRegedListByOpenType: (type, perObj) => {
        return (dispatch, getstate) => {
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
                                    Toast.fail(data.infomessage, 2);
                                }
                            }
                        ).catch()
                    }
                }
            ).catch()
        }
    },


    refreshRegedListByOpenType: (type, hosId, perObj) => {
        return (dispatch, getstate) => {
            let queryUrl = url.API_QUERY_INHOSPASTIENT(type, hosId, perObj.id)
            return post(queryUrl).then(
                (data) => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(hospitalDetail(data.data))
                    } else {
                        Toast.fail(data.infomessage, 2);
                    }
                }
            ).catch()
        }
    },

}


const fetchRequest = () => ({
    type: actionTypes.FETCH_HOSPITALIZATION_REQUEST
})


const fetchHospitalizationSuccess = (data) => ({
    type: actionTypes.FETCH_HOSPITALIZATION_SUCCESS,
    response: data
})


const hospitalDetail = (data) => ({
    type: actionTypes.HOSPITAL_INFO_SUCCESS,
    response: data
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOSPITALIZATION_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_HOSPITALIZATION_SUCCESS:
            return {
                ...state,
                hospitalizationList: action.response,
                isSelHospitalizationItem: action.response[0]
            }
        case actionTypes.HOSPITAL_INFO_SUCCESS:
            return {
                ...state,
                HospitalDetails: action.response,
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


export const getHospitalizationList = (state) => {
    return state.hospitalizationManagement.hospitalizationList
}


export const getIsSelHospitalization = (state) => {
    return state.hospitalizationManagement.isSelHospitalizationItem
}


export const getHospitalDetails = (state) => {
    return state.hospitalizationManagement.HospitalDetails
}