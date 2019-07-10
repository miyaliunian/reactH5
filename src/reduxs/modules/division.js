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
import {post} from '@utils/httpUtil'

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


    //加载左侧列表
    loadDivisionList: (hosid) => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_DIVSION_LIST(hosid)
            dispatch(fetchDivisionListRequest())
            return post(targetURL).then(
                data => {
                    data.data.map((item, index) => {
                        if (index === 0) {
                            item.isSel = true
                        } else {
                            item.isSel = false
                        }
                    })
                    dispatch(fetchDivisionListSuccess(data.data))
                    const targetURL = url.API_DIVSION__DEPARTMENT_LIST(hosid, data.data[0].id)
                    return dispatch(fetchDepartmentList(targetURL))
                },
                error => {

                }
            )
        }
    },


    //加载右侧列表
    loadDepartmentListByHostId: (hosid, divisionid) => {
        return (dispatch, getstate) => {
            const targetURL = url.API_DIVSION__DEPARTMENT_LIST(hosid, divisionid)
            return dispatch(fetchDepartmentList(targetURL))
        }
    },
}


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

const fetchDivisionListRequest = () => ({
    type: actionTypes.FETCH_DIVISION_REQUEST
})

const fetchDivisionListSuccess = (data) => ({
    type: actionTypes.FETCH_DIVISION_SUCCESS,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DIVISION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_DIVISION_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.FETCH_DIVISION_FAILURE:
            return {...state, isFetching: false}
        case actionTypes.FETCH_DEPARTMENT_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                departmentData: action.response.data
            }
        case actionTypes.FETCH_DEPARTMENT_FAILURE:
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
    return state.division.isFetching
}

export const getHostId = (state) => {
    return state.division.hosid
}

export const getDivisionList = (state) => {
    return state.division.data
}

export const getDepartmentList = (state) => {
    return state.division.departmentData
}