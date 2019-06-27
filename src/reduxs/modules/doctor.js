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
    clinics: [],//门诊
    reservations: []//可以预约的时间
}


const actionTypes = {
    FETCH_DOCTOR_REQUEST: 'DOCTOR/FETCH_DOCTOR_REQUEST',
    FETCH_DOCTOR_CLINICS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_CLINICS_SUCCESS',
    FETCH_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_RESERVATIONS_SUCCESS',
    FETCH_DOCTOR_FAILURE: 'DOCTOR/FETCH_DOCTOR_FAILURE',
}


export const actions = {
    // loadClinicList: (doctid) => {
    //     return (dispatch, getstate) => {
    //         const target = URL.API_DOCTOR_CLINIC_LIST(doctid)
    //         return dispatch(fetchClinicList(target))
    //     }
    // },


    loadClinicList: (hosId,doctid) => {
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
                    dispatch(fetchClinicListSuccess(data.data))
                    const target = URL.API_DOCTOR_VISITING_LIST(hosId, data.data[0].id, doctid, null, getstate().doctor.page)
                    return dispatch(fetchReservationList(target))
                },
                error => {

                }
            )
        }
    },


    loadReservationList: (hosId, deptId, doctid, date) => {
        return (dispatch, getstate) => {
            const target = URL.API_DOCTOR_VISITING_LIST(hosId, deptId, doctid, date, getstate().doctor.page)
            return dispatch(fetchReservationList(target))
        }
    }
}

// const fetchClinicList = (targetURL) => ({
//     [FETCH_DATA]: {
//         types: [
//             actionTypes.FETCH_DOCTOR_REQUEST,
//             actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS,
//             actionTypes.FETCH_DOCTOR_FAILURE,
//         ],
//         targetURL,
//     },
// })

const fetchClinicListSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS,
    data
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
            return {...state, isFetching: true}
        case actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // clinics: action.response.data
                clinics: action.data
            }
        case actionTypes.FETCH_DOCTOR_RESERVATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                reservations: action.response.data.list
            }
        case actionTypes.FETCH_DOCTOR_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchStatus = (state) => {
    return state.doctor.isFetching
}


export const getClinicsData = (state) => {
    return state.doctor.clinics
}

export const getReservationsData = (state) => {
    return state.doctor.reservations
}