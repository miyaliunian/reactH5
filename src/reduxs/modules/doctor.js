/**
 * Class: doctor
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情-reducer
 */

import URL from '@api/httpUrl'
import {FETCH_DATA} from '@reduxs/middleware/api'
import {post} from '@api/httpUtil'
import {Toast} from "antd-mobile";

const dayJS = require('dayjs')
const initialState = {
    isFetching: false, //标识请求是否进行中
    page: 1, //翻页
    isLastPage: false, //是否存在翻页
    clinics: [], //门诊
    reservations: [], //可以预约的数据
    timeInterval: [] //可以预约的数据对应的时间段
}

const actionTypes = {
    FETCH_DOCTOR_REQUEST: 'DOCTOR/FETCH_DOCTOR_REQUEST',
    FETCH_DOCTOR_CLINICS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_CLINICS_SUCCESS',
    FETCH_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/FETCH_DOCTOR_RESERVATIONS_SUCCESS',
    LOAD_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/LOAD_DOCTOR_RESERVATIONS_SUCCESS',
    RELOAD_DOCTOR_RESERVATIONS_SUCCESS: 'DOCTOR/RELOAD_DOCTOR_RESERVATIONS_SUCCESS',
    FETCH_DOCTOR_FAILURE: 'DOCTOR/FETCH_DOCTOR_FAILURE',

    //预约时间段Picker
    FETCH_DOCTOR_SCHEDULE_TIME_REQUEST: 'DOCTOR/DOCTOR_SCHEDULE_TIME_REQUEST',
    FETCH_DOCTOR_SCHEDULE_TIME_SUCCESS: 'DOCTOR/FETCH_DOCTOR_SCHEDULE_TIME_SUCCESS',
    FETCH_DOCTOR_SCHEDULE_TIME_FAILURE: 'DOCTOR/FETCH_DOCTOR_SCHEDULE_TIME_FAILURE',

    RESET: 'DOCTOR/RESET'
}

export const actions = {
    //获取科室
    loadClinicList: (hosId, doctid, deptName, type, seeDate) => {
        return (dispatch, getstate) => {
            const target = URL.API_DOCTOR_CLINIC_LIST(doctid)
            dispatch(fetchRequest())
            return post(target).then(
                data => {
                    if (data.data && data.data.length >= 2) {
                        for (let i = 0; i < data.data.length; i++) {
                            if (data.data[i].name === deptName) {
                                ;[data.data[0], data.data[i]] = [data.data[i], data.data[0]]
                                break
                            }
                        }
                    }
                    dispatch(loadClinicListSuccess(data.data))
                    const target = URL.API_DOCTOR_VISITING_LIST(hosId, data.data[0].id, doctid, seeDate === null ? null : dayJS(seeDate).format('YYYYMMDD'), getstate().doctor.page)
                    return dispatch(loadReservationList(target, type))
                },
                error => {
                    Toast.info(error.message)
                }
            )
        }
    },

    //点击科室下拉列表，获取(可预约)数据
    fetchReservationList: (hosId, deptId, doctid, type, seeDate) => {
        return (dispatch, getstate) => {
            const target = URL.API_DOCTOR_VISITING_LIST(hosId, deptId, doctid, seeDate === null ? null : dayJS(seeDate).format('YYYYMMDD'), 1)
            console.log(target)
            return dispatch(reLoadReservationList(target, type))
        }
    },

    //点击预约数据，获取预约时间段(返回数据只有一条数据，则直接跳转页面、返回多条数据则弹出PickerModal)
    loadTimeInterval: (doctorInfo, reservationInfo, type, target) => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_DOCTOR_SCHEDULE_TIME(reservationInfo.id)
            dispatch(fetchTimeIntervalRequest(true))
            return post(targetURL)
                .then(data => {
                    return data
                })
                .then(data => {
                        // 返回多条数据则弹出PickerModal
                        if (data.data.length >= 2) {
                            dispatch(fetchTimeIntervalSuccess(data.data))
                            target.setState({
                                timeIntervalShow: true
                            })
                        } else {
                            //返回数据只有一条数据，则直接跳转页面
                            let path = {
                                pathname: '/reservation',
                                state: {
                                    doctorInfo: doctorInfo,
                                    reservationInfo: reservationInfo,
                                    timeInterval: data.data[0]
                                }
                            }
                            target.props.history.push(path)
                        }
                    }
                )
                .catch(err => {
                    dispatch(fetchTimeIntervalFail(false))
                })
        }
    },

    //清空
    reset: () => ({
        type: actionTypes.RESET
    })
}

const fetchRequest = () => ({
    type: actionTypes.FETCH_DOCTOR_REQUEST
})

const loadClinicListSuccess = data => ({
    type: actionTypes.FETCH_DOCTOR_CLINICS_SUCCESS,
    data
})

const loadReservationList = (targetURL, type) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DOCTOR_REQUEST,
            actionTypes.LOAD_DOCTOR_RESERVATIONS_SUCCESS,
            actionTypes.FETCH_DOCTOR_FAILURE
        ],
        targetURL,
        schema: {name: 'reservationFilter', type}
    }
})

const reLoadReservationList = (targetURL, type) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DOCTOR_REQUEST,
            actionTypes.RELOAD_DOCTOR_RESERVATIONS_SUCCESS,
            actionTypes.FETCH_DOCTOR_FAILURE
        ],
        targetURL,
        schema: {name: 'reservationFilter', type}
    }
})

const fetchTimeIntervalRequest = data => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_REQUEST,
    data
})

const fetchTimeIntervalSuccess = data => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_SUCCESS,
    data
})

const fetchTimeIntervalFail = data => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_FAILURE,
    data
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
                page: action.response.data.lastPage ? state.page : (state.page += 1),
                reservations: state.reservations.concat(action.response.data.list)
            }
        case actionTypes.RELOAD_DOCTOR_RESERVATIONS_SUCCESS:  // 医生排版列表 切换科室时 用这个接受
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: action.response.data.lastPage ? state.page : (state.page += 1),
                reservations: action.response.data.list
            }
        case actionTypes.FETCH_DOCTOR_RESERVATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: action.response.data.lastPage ? state.page : (state.page += 1),
                reservations: action.response.data.list
            }
        case actionTypes.FETCH_DOCTOR_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_REQUEST:
            return {
                ...state,
                isFetching: action.data
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                timeInterval: action.data
            }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_TIME_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.RESET:
            return {
                ...state,
                isFetching: false, //标识请求是否进行中
                page: 1, //翻页
                isLastPage: false, //是否存在翻页
                clinics: [], //门诊
                reservations: [], //可以预约的数据
                timeInterval: [] //可以预约的数据对应的时间段
            }
        default:
            return state
    }
}
export default reducer

//selectors
export const getFetchingStatus = state => {
    return state.doctor.isFetching
}

export const getIsLastPage = state => {
    return state.doctor.isLastPage
}

export const getClinicsData = state => {
    return state.doctor.clinics
}

export const getReservationsData = state => {
    return state.doctor.reservations
}

export const getTimeInterval = state => {
    return state.doctor.timeInterval
}
