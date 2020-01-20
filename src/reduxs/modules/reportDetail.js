import URL from '@utils/httpUrl'
import {FETCH_DATA} from "@reduxs/middleware/api";
import {post} from "@utils/httpUtil";
import {Toast} from "antd-mobile";

const initialState = {
    isFetching: false,//标识请求是否进行中
    checkresult: [],//检验单列表
}


const actionTypes = {

    FETCH_REPORTDETAIL_REQUEST: 'REPORTDETAIL/FETCH_REPORTDETAIL_REQUEST',
    FETCH_REPORTDETAIL_SUCCESS: 'REPORTDETAIL/FETCH_REPORTDETAIL_SUCCESS',
    FETCH_REPORTDETAIL_FAILURE: 'REPORTDETAIL/FETCH_REPORTDETAIL_FAILURE',

    RESET: 'REPORTDETAIL/RESET',
}


export const actions = {

    loadReportDetail: (hosId, reportData ,perId) => {
        return (dispatch, getstate) => {
            const target = URL.API_QUERY_REPORT_DETAIL(hosId,
                (reportData.LisNo === null ? "null" : reportData.LisNo)
                (reportData.applyNo === null ? "null" : reportData.applyNo), perId)
            dispatch(fetchRequest())
            return post(target)
                .then(data => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(fetchReportDetailData(data.data))
                    } else {
                        dispatch(fetchReportDetailDataFail())
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
    type: actionTypes.FETCH_REPORTDETAIL_REQUEST
})


const fetchReportDetailData = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_REPORTDETAIL_REQUEST,
            actionTypes.FETCH_REPORTDETAIL_SUCCESS,
            actionTypes.FETCH_REPORTDETAIL_FAILURE,
        ],
        targetURL,
    },
})


const fetchReportDetailDataFail = (data) => ({
        type: actionTypes.FETCH_REPORTDETAIL_FAILURE,
        data
    }
)


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORTDETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_REPORTDETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                checkresult: action.data
            }
        case actionTypes.FETCH_REPORTDETAIL_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case actionTypes.RESET:
            return {
                ...state,
                isFetching: false,//标识请求是否进行中
                checkresult: [],//检验单列表
            }
        default:
            return state
    }
}
export default reducer


export const getFetchingStatus = (state) => {
    return state.reportDetail.isFetching
}

export const getReportDetailData = (state) => {
    return state.reportDetail.checkresult
}
