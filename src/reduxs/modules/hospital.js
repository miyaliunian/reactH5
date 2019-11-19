import {cityID} from "@assets/static/Constant";
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
import ErrorBoundary from "@baseUI/ErrorBoundary/ErrorBoundary";
import React, {Component} from 'react'

/**
 * Class:
 * Author: wufei
 * Date: 2019/5/28
 * Description:
 *    医院列表 reduce
 *
 */


const initialState = {
    areaId: '',//区域列表
    sort: 'register',//综合排序:第二个tab默认传综合排序
    hosCategory: '',//医院类型
    hosGrade: '',// 医院等级

    isFetching: false,
    isLastPage: false,
    page: 1,//翻页
    data: [] //列表数据
}


// action types
const actionTypes = {

    FETCH_HOSPITAL_REQUEST: 'HOSPITAL/FETCH_HOSPITAL_REQUEST',
    FETCH_HOSPITAL_SUCCESS: 'HOSPITAL/FETCH_HOSPITAL_SUCCESS',
    FETCH_HOSPITAL_FAILURE: 'HOSPITAL/FETCH_HOSPITAL_FAILURE',

    REFRESH_HOSPITAL_SUCCESS: 'HOSPITAL/REFRESH_HOSPITAL_SUCCESS',
    FETCH_HOSPITAL_BY_SUCCESS: 'HOSPITAL/REFRESH_HOSPITAL_BY_SUCCESS',

    SET_PAGE: 'HOSPITAL/SET_PAGE',
    SET_AREA: 'HOSPITAL/SET_AREA',
    SET_SORT: 'HOSPITAL/SET_SORT',
    SET_FILTER: 'HOSPITAL/SET_FILTER',
    RESET: 'HOSPITAL/RESET',
}


// action creators
export const actions = {

    //加载列表、上拉加载更多
    loadHosipitalList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, getstate().hospital.page)
            let param = {
                areaId: getstate().hospital.areaId || null,
                hosCategory: getstate().hospital.hosCategory || null,
                hosGrade: getstate().hospital.hosGrade || null
            }
            return dispatch(fetchHosipitalList(targetURL, param))
        }
    },

    //下拉刷新
    refreshHosipitalList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, '1')
            let param = {
                areaId: getstate().hospital.areaId || null,
                hosCategory: getstate().hospital.hosCategory || null,
                hosGrade: getstate().hospital.hosGrade || null
            }
            return dispatch(refreshHosipitalList(targetURL, param))
        }
    },


    fetchHosipitalListBy: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_LIST(cityID, getstate().hospital.sort, '1')
            let param = {
                areaId: getstate().hospital.areaId || null,
                hosCategory: getstate().hospital.hosCategory || null,
                hosGrade: getstate().hospital.hosGrade || null
            }
            return dispatch(fetchHosipitalListBy(targetURL, param))
        }
    },

    //区域
    setAreaId: (code) => ({
        type: actionTypes.SET_AREA,
        code
    }),

    //综合排序
    setSord: (value) => ({
        type: actionTypes.SET_SORT,
        value
    }),

    //医院类型、医院等级
    setCategoryGrade: (value) => ({
        type: actionTypes.SET_FILTER,
        value
    }),

    //清空
    reset: () => ({
        type: actionTypes.RESET,
    })

}


// action creators：二
const fetchHosipitalList = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HOSPITAL_REQUEST,
            actionTypes.FETCH_HOSPITAL_SUCCESS,
            actionTypes.FETCH_HOSPITAL_FAILURE,
        ],
        targetURL,
    },
    param
})

const refreshHosipitalList = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HOSPITAL_REQUEST,
            actionTypes.REFRESH_HOSPITAL_SUCCESS,
            actionTypes.FETCH_HOSPITAL_FAILURE,
        ],
        targetURL,
    },
    param
})

const fetchHosipitalListBy = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HOSPITAL_REQUEST,
            actionTypes.FETCH_HOSPITAL_BY_SUCCESS,
            actionTypes.FETCH_HOSPITAL_FAILURE,
        ],
        targetURL,
    },
    param
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOSPITAL_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_HOSPITAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: state.page += 1,
                data: state.data.concat(action.response.data.list)
            }
        case actionTypes.REFRESH_HOSPITAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: 2,
                data: action.response.data.list
            }
        case actionTypes.FETCH_HOSPITAL_BY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLastPage: action.response.data.lastPage,
                page: 2,
                data: action.response.data.list
            }
        case actionTypes.FETCH_HOSPITAL_FAILURE:
            return {...state, isFetching: false}
        case actionTypes.SET_PAGE:
            return {
                ...state,
                page: 1
            }
        case actionTypes.SET_AREA:
            return {
                ...state,
                areaId: action.code
            }
        case actionTypes.SET_SORT:
            return {
                ...state,
                sort: action.value
            }
        case actionTypes.SET_FILTER:
            return {
                ...state,
                hosCategory: action.value.yylx,
                hosGrade: action.value.yydj
            }
        case actionTypes.RESET:
            return {
                ...state,
                areaId: '',
                sort: 'register',
                hosCategory: '',
                hosGrade: '',
                isFetching: false,
                isLastPage: false,
                page: 1,
                data: []
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getHospitalList = (state) => {
    return state.hospital.data
}

export const getFetchingStatus = (state) => {
    return state.hospital.isFetching
}

export const getIsLastPage = (state) => {
    return state.hospital.isLastPage
}
