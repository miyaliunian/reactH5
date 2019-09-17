/**
 * Class:
 * Author: wufei
 * Date: 2019/8/14
 * Description:
 *    住院管理 reduce
 *
 */
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
const initialState = {
    isFetching: false,
    data: []
}


// action types
const actionTypes = {
    FETCH_HISTORYADVANCEPAYMENT_REQUEST: 'HISTORYADVANCEPAYMENT/FETCH_HISTORYADVANCEPAYMENT_REQUEST',
    FETCH_HISTORYADVANCEPAYMENT_SUCCESS: 'HISTORYADVANCEPAYMENT/FETCH_HISTORYADVANCEPAYMENT_SUCCESS',
    FETCH_HISTORYADVANCEPAYMENT_FAILURE: 'HISTORYADVANCEPAYMENT/FETCH_HISTORYADVANCEPAYMENT_FAILURE',
}


// action creators
export const actions = {
    loadData: (type, hosId, inHosNo) => {
        return (dispatch, getstate) => {
            const targetURL = url.API_QUERY_IN_PAY_LIST(type, hosId, inHosNo)
            return dispatch(fetchHistoryItems(targetURL))
        }
    },
}


const fetchHistoryItems = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HISTORYADVANCEPAYMENT_REQUEST,
            actionTypes.FETCH_HISTORYADVANCEPAYMENT_SUCCESS,
            actionTypes.FETCH_HISTORYADVANCEPAYMENT_FAILURE,
        ],
        targetURL,
    }
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HISTORYADVANCEPAYMENT_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_HISTORYADVANCEPAYMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response,
            }
        case actionTypes.FETCH_HISTORYADVANCEPAYMENT_FAILURE:
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
    return state.historyAdvancePayment.isFetching
}

export const getHistoryList = (state) => {
    return state.historyAdvancePayment.data
}

