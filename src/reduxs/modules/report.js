import url from "../../utils/httpUrl";
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";


const initialState = {
    isFetching: false,
    hospitalizationSel: '', //选中的医院
    reportList: [] //报告列表
}


// action types
const actionTypes = {

    //报告查询
    FETCH_HOSPITALIZATION_REQUEST: 'REPORT/FETCH_HOSPITALIZATION_REQUEST',
    FETCH_HOSPITALIZATION_SUCCESS: 'REPORT/FETCH_HOSPITAL_SUCCESS',
    FETCH_HOSPITALIZATION_FAILURE: 'REPORT/FETCH_HOSPITALIZATION_FAILURE',
    RESET_REPORT: 'REPORT/RESET_REPORT',
    REPORT_INFO_SUCCESS: 'REPORT/REPORT_INFO_SUCCESS',
    REPORT_INFO_NULL: 'REPORT/REPORT_INFO_NULL',


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
                        //请求报告查询(默认的)
                        let hosDef = data.data[0]
                        let queryUrl = url.API_QUERY_REPORT_LIST(hosDef.id, perObj.id, "null", "null")
                        return post(queryUrl).then(
                            (data) => {
                                if (data.infocode && data.infocode === 1) {
                                    dispatch(reportList(data.data))
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

    //切换家庭成员、医院 重新刷新报告列表
    refreshReportListByOpenType: (hosObj, perObj) => {
        return (dispatch, getstate) => {
            //将选中的医院信息 刷新到页面
            dispatch(setSelHospitalization(hosObj))
            let queryUrl = url.API_QUERY_REPORT_LIST(hosObj.id, perObj.id, "null", "null")
            return post(queryUrl).then(
                (data) => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(reportList(data.data))
                    } else {
                        dispatch(reportListNUll())
                        Toast.fail(data.infomessage, 2);
                    }
                }
            ).catch()
        }
    },


    //回退页面时 清空选中的 医院
    setHospNUll: () => {
        return (dispatch, getstate) => {
            dispatch(reportListNUll())
        }
    },
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
    type: actionTypes.RESET_REPORT,
    response: data
})

const reportList = (data) => ({
    type: actionTypes.REPORT_INFO_SUCCESS,
    response: data
})
const reportListNUll = () => ({
    type: actionTypes.REPORT_INFO_NULL,
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

        //报告查询
        case actionTypes.RESET_REPORT:
            return {
                ...state,
                hospitalizationSel: action.response,
                isFetching: true
            }
        case actionTypes.REPORT_INFO_SUCCESS:
            return {
                ...state,
                reportList: action.response,
                isFetching: false
            }
        case actionTypes.REPORT_INFO_NULL:
            return {
                ...state,
                reportList: '',
                isFetching: false
            }

        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.report.isFetching
}

export const getSelHospitalization = (state) => {
    return state.report.hospitalizationSel
}


export const getReportList = (state) => {
    return state.report.reportList
}
