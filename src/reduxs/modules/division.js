/**
 * Class: division
 * Author: wufei
 * Date: 2019/6/4
 * Description:
 *     医院列表->平台大科列表
 */

import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
import {dataConversionDic} from '../../assets/static'

export const schema = {
    name: dataConversionDic.divisionList,
}

const initialState = {
    hosid: '',//医院id
    divisionid: '',//平台大科id
    isFetching: false,
    page: 1,//翻页
    data: [], //列表数据
    departmentData: [] //列表数据
}

const actionTypes = {

    SET_HOSID: 'DIVISION/SET_HOSID',//医院id
    SET_DIVISIONID: 'DIVISION/SET_DIVISIONID',//平台大科id

    SET_DIVISION_NULL: 'DIVISION/SET_DIVISION_NULL',//清空右侧数据

    //左侧科室
    FETCH_DIVISION_REQUEST: 'DIVISION/FETCH_DIVISION_REQUEST',
    FETCH_DIVISION_SUCCESS: 'DIVISION/FETCH_DIVISION_SUCCESS',
    FETCH_DIVISION_FAILURE: 'DIVISION/FETCH_DIVISION_FAILURE',

    //右侧科室对应的门诊
    FETCH_DEPARTMENT_REQUEST: 'DIVISION/FETCH_DEPARTMENT_REQUEST',
    FETCH_DEPARTMENT_SUCCESS: 'DIVISION/FETCH_DEPARTMENT_SUCCESS',
    FETCH_DEPARTMENT_FAILURE: 'DIVISION/FETCH_DEPARTMENT_FAILURE',

}


// action creators
export const actions = {

    //状态初始值
    setHosid: (id) => ({
        type: actionTypes.SET_HOSID,
        id
    }),

    setDivisionid: (id) => ({
        type: actionTypes.SET_DIVISIONID,
        id
    }),

    //加载左侧列表
    loadDivisionList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_DIVSION_LIST(getstate().division.hosid)
            return dispatch(fetchDivisionList(targetURL))
        }
    },

    //加载右侧列表
    loadDepartmentListByHostId: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_DIVSION__DEPARTMENT_LIST(getstate().division.hosid, getstate().division.divisionid)
            return dispatch(fetchDepartmentList(targetURL))
        }
    },
}


const fetchDivisionList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DIVISION_REQUEST,
            actionTypes.FETCH_DIVISION_SUCCESS,
            actionTypes.FETCH_DIVISION_FAILURE,
        ],
        targetURL,
        schema
    },
})


const fetchDepartmentList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DEPARTMENT_REQUEST,
            actionTypes.FETCH_DEPARTMENT_SUCCESS,
            actionTypes.FETCH_DEPARTMENT_FAILURE,
        ],
        targetURL,
    },
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSID:
            return {
                ...state,
                hosid: action.id
            }
        case actionTypes.SET_DIVISIONID:
            return {
                ...state,
                divisionid: action.id
            }
        case actionTypes.FETCH_DIVISION_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_DIVISION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.data
            }
        case actionTypes.FETCH_DIVISION_FAILURE:
            return {...state, isFetching: false}
        case actionTypes.FETCH_DEPARTMENT_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                departmentData: action.response.data
            }
        case actionTypes.FETCH_DEPARTMENT_FAILURE:
            return {...state, isFetching: false}
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.division.isFetching
}
export const getDivisionList = (state) => {
    return state.division.data
}

export const getDepartmentList = (state) => {
    return state.division.departmentData
}