/**
 * 我的门诊缴费
 */
import {MYORDERTABKAY} from "@api/Constant";
import URL from '@api/httpUrl'
import {post} from "@api/httpUtil";

const initialState = {
    outpatientList: []
};

// action types
const actionTypes = {

    FETCH_OUTPATIENT_BY_PAGE_REQUEST: 'MYOUTPATIENT/FETCH_OUTPATIENT_BY_PAGE_REQUEST',
    FETCH_OUTPATIENT_BY_PAGE_SUCCESS: 'MYOUTPATIENT/FETCH_OUTPATIENT_BY_PAGE_SUCCESS',
    FETCH_OUTPATIENT_BY_PAGE_FAILURE: 'MYOUTPATIENT/FETCH_OUTPATIENT_BY_PAGE_FAILURE'
};

// action creators
export const actions = {

    loadOutpatientByPage: (pageno) => {
        return (dispatch, getstate) => {
            if (!pageno)
                pageno = 1
            const targetURL = URL.API_QUERY_BALANCEINFO_IN_MY_ORDER(pageno)
            dispatch(loadOutpatientByPageRequest())
            return post(targetURL).then(data => {
                console.log("123456789")
                console.group(data)
                if (data && data.infocode) {
                    dispatch(loadOutpatientByPageSuccess(data.data.list))
                }
            })
        }
    }

};

const loadOutpatientByPageRequest = () => ({
    type: actionTypes.FETCH_OUTPATIENT_BY_PAGE_REQUEST
})

const loadOutpatientByPageSuccess = (data) => ({
    type: actionTypes.FETCH_OUTPATIENT_BY_PAGE_SUCCESS,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OUTPATIENT_BY_PAGE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_OUTPATIENT_BY_PAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                outpatientList:action.data
            };
        default:
            return state;
    }
};

export default reducer;

export const getOutpatientList = state => {
    return state.myOutpatientPayment.outpatientList;
};

