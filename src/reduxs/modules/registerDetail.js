/**
 * 我的挂号详情
 */
import URL from '@api/httpUrl'
import {post} from '@api/httpUtil'
import {OrderType} from '@api/Constant'

const initialState = {
    isFetching: false,
    detail: {}
}

const actionTypes = {
    FETCH_DETAIL_REQUEST: 'REGISTERDETAIL/FETCH_DETAIL_REQUEST',
    FETCH_DETAIL_SUCCESS: 'REGISTERDETAIL/FETCH_DETAIL_SUCCESS',
    FETCH_DETAIL_FAILURE: 'REGISTERDETAIL/FETCH_DETAIL_FAILURE',

    CANCEL_REGISTER_REQUEST:'REGISTERDETAIL/CANCEL_REGISTER_REQUEST',
    CANCEL_REGISTER_SUCCESS:'REGISTERDETAIL/CANCEL_REGISTER_SUCCESS',
    CANCEL_REGISTER_FAILURE:'REGISTERDETAIL/CANCEL_REGISTER_FAILURE'
}

export const actions = {
    /**
     * 根据id查询门诊缴费信息
     * @param outpatientPaymentId
     */
    loadDetailById: outpatientPaymentId => {
        console.log('11111111111111111111')
        console.log(outpatientPaymentId)
        return (dispatch, getstate) => {
            let url = URL.API_QUERY_BALANCEINFO_BY_ID(outpatientPaymentId)
            return post(url).then(data => {
                if (data && data.infocode) dispatch(loadDetailSuccess(data.data))
            })
        }
    },

    /**
     * 挂号’去结算‘按钮的提交，到预结算页
     * @param data
     * @param route
     * @returns {function(*, *): Promise<T | never>}
     */
    register2SiPrePay: (detail, route) => {
        console.log('挂号 去结算')
        console.log(detail)
        const {push} = route
        return (dispatch, getstate) => {
            //纯医保
            let path = {
                pathname: '/advanceSettlementContainer',
                state: {
                    reservationName: '线上挂号',
                    reservationCode: 'register',
                    reservationEntity: detail, //订单实体
                    paymentMethod: detail.paymentMethod
                }
            }
            push(path)
        }
    },
    cancelReg:(regId,route)=>{
        console.log('1234567890 cancelReg')
        console.log('regId: ' + regId)
        console.group(route)
        return (dispatch, getstate) => {
            const targetURL = URL.AIP_ORDER_CANCEL_REG(regId)
            dispatch(cancelRegRequest())
            return post(targetURL)
                .then(data => {
                    console.log('1234567890 cancelReg data: ')
                    console.group(data)
                    if (data.infocode && data.infocode == 1) {
                        //取消成功之后 重新刷新订单列表
                        route.goBack();
                    } else {
                        // dispatch({type: Types.FETCH_FAILURE})
                        // DeviceEventEmitter.emit(ToastResultType.TOAST_NAME, data.infomessage, ToastResultType.FAIL);
                    }
                })
                .catch(err => {
                    dispatch({type: actionTypes.CANCEL_REGISTER_FAILURE})
                    // isEventEmitter(err)
                })
        }
    }
}

const loadDetailSuccess = data => ({
    type: actionTypes.FETCH_DETAIL_SUCCESS,
    data
})
const cancelRegRequest = () => ({
    type: actionTypes.CANCEL_REGISTER_REQUEST
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
        case actionTypes.CANCEL_REGISTER_REQUEST:
            return {
                ...state,
                isFetching:true
            }
        default:
            return state
    }
}
export default reducer
//selectors
export const getFetchingStatus = state => {
    return state.registerDetail.isFetching
}
export const getDetail = state => {
    return state.registerDetail.detail
}
