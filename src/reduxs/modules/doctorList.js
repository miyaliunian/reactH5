import url from "@utils/httpUrl";

/**
 * Class: doctorList
 * Author: wufei
 * Date: 2019-06-18
 * Description:
 *   医生列表
 */

import {PlatformType, DoctorOrderType, cityID} from '@assets/static/DictionaryConstant'
import {FETCH_DATA} from "@reduxs/middleware/api";

const initialState = {
    deptid: '',
    seeDate: '',
    doctorTitle: null,
    hosGrade: null,
    isFetching: false,
    page: 1,
    data: [],
}

const actionTypes = {
    FETCH_DOCTOR_LIST_REQUEST: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_REQUEST',
    FETCH_DOCTOR_LIST_SUCCESS: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_SUCCESS',
    FETCH_DOCTOR_LIST_FAILURE: 'DOCTOR_LIST/FETCH_DOCTOR_LIST_FAILURE',
}


export const actions = {
    loadDoctorList: (id) => {
        return (dispatch, getstate) => {
            let param = {
                doctorTitle: null,
                hosGrade: null,
            }
            if (getstate().doctorList.seeDate) {
                param.seeDate = getstate().doctorList.seeDate
            } else {
                param.seeDate = "2019-06-18"
            }
            const targetURL = url.API_DOCTOR_LIST(PlatformType.HospitalDepartments, id, DoctorOrderType.title, getstate().doctorList.page)
            return dispatch(fetchDoctorList(targetURL, param))
        }
    }
}


const fetchDoctorList = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DOCTOR_LIST_REQUEST,
            actionTypes.FETCH_DOCTOR_LIST_SUCCESS,
            actionTypes.FETCH_DOCTOR_LIST_FAILURE,
        ],
        targetURL,
    },
    param
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTOR_LIST_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_DOCTOR_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.data.list
            }
        case actionTypes.FETCH_DOCTOR_LIST_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}


export default reducer


export const getFetchStatus = (state) => {
    return state.doctorList.isFetching
}
export const getDoctorList = (state) => {
    return state.doctorList.data
}