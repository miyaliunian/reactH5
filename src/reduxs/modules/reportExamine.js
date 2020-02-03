import URL from '@utils/httpUrl'
import {FETCH_DATA} from "@reduxs/middleware/api";
import {post} from "@utils/httpUtil";
import {Toast} from "antd-mobile";

const initialState = {
    isFetching: false,//标识请求是否进行中
    examineresult: '',//检查报告信息
    examinepic: '',//检查图片
}


const actionTypes = {

    //检查报告信息
    FETCH_REPORTEXAMINE_REQUEST: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_REQUEST',
    FETCH_REPORTEXAMINE_SUCCESS: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_SUCCESS',
    FETCH_REPORTEXAMINE_FAILURE: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_FAILURE',

    //检查图片
    FETCH_REPORTEXAMINE_PIC_REQUEST: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_PIC_REQUEST',
    FETCH_REPORTEXAMINE_PIC_SUCCESS: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_PIC_SUCCESS',
    FETCH_REPORTEXAMINE_PIC_FAILURE: 'REPORTEXAMINE/FETCH_REPORTEXAMINE_PIC_FAILURE',

    RESET: 'REPORTEXAMINE/RESET',
}


export const actions = {

    loadReportExamine: (hosId, reportData) => {
        return (dispatch, getstate) => {
            const target = URL.API_QUERY_REPORT_EXAMINE(hosId,
                (reportData.LisNo === null ? "null" : reportData.LisNo))
            dispatch(fetchRequest())
            return post(target)
                .then(data => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(fetchReportExamineData(data.data))
                    } else {
                        dispatch(fetchReportExamineDataFail())
                        Toast.fail(data.infomessage, 2)
                    }
                })
                .catch()
        }
    },

    loadReportExaminePic: (hosId, reportData) => {
        return (dispatch, getstate) => {
            const target = URL.API_QUERY_EXAMINE_PIC(hosId,
                (reportData.LisNo === null ? "null" : reportData.LisNo))
            dispatch(fetchPicRequest())
            return post(target)
                .then(data => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(fetchReportExaminePic(data.data))
                        //TODO: open pic
                    } else {
                        dispatch(fetchReportExaminePicFail())
                        Toast.fail(data.infomessage, 2)
                    }
                })
                .catch()
        }
    },

    //清空
    reset: () => ({
        type: actionTypes.RESET,
    })
}

const fetchRequest = () => ({
    type: actionTypes.FETCH_REPORTEXAMINE_REQUEST
})


const fetchReportExamineData = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_REPORTEXAMINE_REQUEST,
            actionTypes.FETCH_REPORTEXAMINE_SUCCESS,
            actionTypes.FETCH_REPORTEXAMINE_FAILURE,
        ],
        targetURL,
    },
})


const fetchReportExamineDataFail = (data) => ({
        type: actionTypes.FETCH_REPORTEXAMINE_FAILURE,
        data
    }
)

const fetchPicRequest = () => ({
    type: actionTypes.FETCH_REPORTEXAMINE_PIC_REQUEST
})


const fetchReportExaminePic = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_REPORTEXAMINE_PIC_REQUEST,
            actionTypes.FETCH_REPORTEXAMINE_PIC_SUCCESS,
            actionTypes.FETCH_REPORTEXAMINE_PIC_FAILURE,
        ],
        targetURL,
    },
})


const fetchReportExaminePicFail = (data) => ({
        type: actionTypes.FETCH_REPORTEXAMINE_PIC_FAILURE,
        data
    }
)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORTEXAMINE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_REPORTEXAMINE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                examineresult: action.data
            }
        case actionTypes.FETCH_REPORTEXAMINE_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.FETCH_REPORTEXAMINE_PIC_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_REPORTEXAMINE_PIC_SUCCESS:
            return {
                ...state,
                isFetching: false,
                examinepic: action.data
            }
        case actionTypes.FETCH_REPORTEXAMINE_PIC_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.RESET:
            return {
                ...state,
                isFetching: false,//标识请求是否进行中
                examineresult: '',//检查报告信息
                examinepic: '',//检查图片
            }
        default:
            return state
    }
}
export default reducer


export const getFetchingStatus = (state) => {
    return state.reportExamine.isFetching
}

export const getReportExamineData = (state) => {
    return state.reportExamine.examineresult
}

export const getReportExaminePic = (state) => {
    return state.reportExamine.examinepic
}
