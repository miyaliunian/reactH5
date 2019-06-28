/**
 * Class: doctor
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情-reducer
 */

import URL from '@utils/httpUrl'
import {FETCH_DATA} from "@reduxs/middleware/api";
import {post} from "@utils/httpUtil";

const initialState = {
    isFetching: false,//标识请求是否进行中
    page: 1,//翻页
    isLastPage: false,//是否存在翻页
    clinics: [],//门诊
    reservations: []//可以预约的时间

}


const actionTypes = {
    FETCH_DOCTOR_REQUEST: 'DOCTOR/FETCH_DOCTOR_REQUEST',
    FETCH_DOCTOR_CLINICS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_CLINICS_SUCCESS',
    FETCH_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_RESERVATIONS_SUCCESS',
    LOAD_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/LOAD_DOCTOR_RESERVATIONS_SUCCESS',
    FETCH_DOCTOR_FAILURE: 'DOCTOR/FETCH_DOCTOR_FAILURE',
}


export const actions = {

    //获取科室
    loadClinicList: (hosId, doctid) => {
        return (dispatch, getstate) => {
            const target = URL.API_DOCTOR_CLINIC_LIST(doctid)
            return post(target).then(
                data => {
                    data.data.map((item, index) => {
                        if (index === 0) {
                            item.isSel = true
                        } else {
                            item.isSel = false
                        }
                    })
                    dispatch(loadClinicListSuccess(data.data))
                    const target = URL.API_DOCTOR_VISITING_LIST(hosId, data.data[0].id, doctid, null, getstate().doctor.page)
                    return dispatch(loadReservationList(target))
                },
                error => {

                }
            )
        }
    },

    //默认获取科室列表第一个对应的(可预约)信息
    loadReservationList: (hosId, deptId, doctid, date, isPage) => {
        let pageNu = 1
        return (dispatch, getstate) => {
            if (isPage) {
                pageNu = getstate().doctor.page
            }
            const target = URL.API_DOCTOR_VISITING_LIST(hosId, deptId, doctid, date, pageNu)
            return dispatch(loadReservationList(target))
        }
    },


    //点击科室下拉列表，获取(可预约)数据
    fetchReservationList: (hosId, deptId, doctid, date) => {
        return (dispatch, getstate) => {
            const target = URL.API_DOCTOR_VISITING_LIST(hosId, deptId, doctid, date, 1)
            return dispatch(fetchReservationList(target))
        }
    },
}


const loadClinicListSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS,
    data
})


const loadReservationList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DOCTOR_REQUEST,
            actionTypes.LOAD_DOCTOR_RESERVATIONS_SUCCESS,
            actionTypes.FETCH_DOCTOR_FAILURE,
        ],
        targetURL,
    },
})


const fetchReservationList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DOCTOR_REQUEST,
            actionTypes.FETCH_DOCTOR_RESERVATIONS_SUCCESS,
            actionTypes.FETCH_DOCTOR_FAILURE,
        ],
        targetURL,
    },
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTOR_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                clinics: action.data
            }
        case actionTypes.LOAD_DOCTOR_RESERVATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: action.response.data.lastPage ? state.page : state.page += 1,
                reservations: state.reservations.concat(action.response.data.list)
            }
        case actionTypes.FETCH_DOCTOR_RESERVATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: action.response.data.lastPage ? state.page : state.page += 1,
                reservations: action.response.data.list
            }
        case actionTypes.FETCH_DOCTOR_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.doctor.isFetching
}

export const getIsLastPage = (state) => {
    return state.doctor.isLastPage
}

export const getClinicsData = (state) => {
    return state.doctor.clinics
}

export const getReservationsData = (state) => {
    return state.doctor.reservations
}



