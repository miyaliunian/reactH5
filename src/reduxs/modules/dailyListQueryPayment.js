import url from "@utils/httpUrl";
import {cityID} from "@assets/static/DictionaryConstant";
import {FETCH_DATA} from "@reduxs/middleware/api";

const initialState = {
    isFetching: false,
    pageNo: 0,
    pageCount: 0,
    listInFeeDetail: []
}


// action types
const actionTypes = {


    FETCH_REQUEST: 'DAILYLIST_QUERY/FETCH_REQUEST',
    FETCH_DAILYLIST_QUERY_SUCCESS: 'DAILYLIST_QUERY/FETCH_DAILYLIST_QUERY_SUCCESS',
    FETCH_FAILURE: 'FETCH_REQUEST/FETCH_FAILURE',

    //下拉刷新
    PULLDOWN_REFRESH_HOS: 'DAILYLIST_QUERY/PULLDOWN_REFRESH',

    //上拉加载更多
    PULLUP_MORE_HOS: 'DAILYLIST_QUERY/PULLUP_MORE'

}


// action creators
export const actions = {


    initDailyQueryList: (type, hosId, inHosNo, startDate, endDate) => {
        return (dispatch, getstate) => {
            const targetUrl = url.API_QUERY_INHOSDETAIL(type)
            let param = {
                pageSize: '999',
                hosId: hosId,
                inHosNo: inHosNo,
                startDate: startDate,
                endDate: endDate,
                pageNo: '1'
            }
            dispatch(fetchData(targetUrl, param))
        }
    },


    queryDailyList: (type, hosId, inHosNo, startDate, endDate) => {
        return (dispatch, getstate) => {
            const targetUrl = url.API_QUERY_INHOSDETAIL(type)
            let param = {
                pageSize: '999',
                hosId: hosId,
                inHosNo: inHosNo,
                startDate: startDate,
                endDate: endDate,
                pageNo: '1'
            }
            dispatch(fetchData(targetUrl, param))
        }
    },
}

const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST
})


const fetchData = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_REQUEST,
            actionTypes.FETCH_DAILYLIST_QUERY_SUCCESS,
            actionTypes.FETCH_FAILURE,
        ],
        targetURL,
    },
    param
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case actionTypes.FETCH_DAILYLIST_QUERY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listInFeeDetail: action.response.data.listInFeeDetail === null ? [] : action.response.data.listInFeeDetail,
                pageNo: action.response.data.pageNo,
                pageCount: action.response.data.totPage
            }
        case actionTypes.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}
export default reducer


export const getFetchingStatus = (state) => {
    return state.dailyListQueryPayment.isFetching
}


export const getInHosDetail = (state) => {
    return state.dailyListQueryPayment.listInFeeDetail
}