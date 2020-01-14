/**
 * 门诊缴费
 * By Cy 2020-01-03
 */
import URL from '@api/httpUrl'
import {post} from '@api/httpUtil'

const initialState = {
    isFetching: false,
    detail: {}
}

const actionTypes = {
    FETCH_DETAIL_REQUEST: 'OUTPATIENTDETAIL/FETCH_DETAIL_REQUEST',
    FETCH_DETAIL_SUCCESS: 'OUTPATIENTDETAIL/FETCH_DETAIL_SUCCESS',
    FETCH_DETAIL_FAILURE: 'OUTPATIENTDETAIL/FETCH_DETAIL_FAILURE'
}

export const actions = {
    /**
     * 根据id查询门诊缴费信息
     * @param outpatientPaymentId
     */
    loadDetailById: (outpatientPaymentId) => {
        console.log('11111111111111111111')
        console.log(outpatientPaymentId)
        return (dispatch, getstate) => {
            let url = URL.API_QUERY_BALANCEINFO_BY_ID(outpatientPaymentId)
            return post(url)
                .then(
                    data => {
                        dispatch(loadDetailSuccess(data))
                    }
                )
        }

    }
}


const loadDetailSuccess = data => ({
    type: actionTypes.FETCH_DETAIL_SUCCESS,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                detail: action.data
            }
        default:
            return state
    }
}
export default reducer
//selectors
export const getFetchingStatus = state => {
    return state.outpatientPaymentDetail.isFetching
}
export const getDetail = state => {
    return state.outpatientPaymentDetail.detail
}
