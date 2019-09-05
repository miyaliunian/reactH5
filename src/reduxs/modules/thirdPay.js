/**
 * Class: thirdPay
 * Author: wufei
 * Date: 2019/9/4
 * Description:
 *  第三方支付
 */

import URL from '@utils/httpUrl';
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";
import {OrderType} from '@assets/static/DictionaryConstant'

const initialState = {
    isFetching: false,
    payList: [],
}

const actionTypes = {
    FETCH_REQUEST: 'THIRD_PAY/FETCH_THIRD_PAY_REQUEST',
    FETCH_PAY_SUCCESS: 'THIRD_PAY/FETCH_PAY_SUCCESS',
    FETCH_FAILURE: 'THIRD_PAY/FETCH_THIRD_PAY_FAILURE',
}

export const actions = {
    //获取支付方式列表
    loadPayList: (payType, objEntity) => {
        return (dispatch, getstate) => {
            //线上挂号、扫描购药 调用不同的Url
            const targetURL = payType === OrderType[0].status ? URL.API_THIRD_PAY_REGISTERED(objEntity.hosId) : URL.API_THIRD_PAY_PURCHASE_MEDICINE('sdfsdfs')
            dispatch(fetchRequest())
            return post(targetURL)
                .then((data) => {
                        if (data.infocode && data.infocode === 1) {
                            dispatch(fetchPaySuccess(data.data))
                        } else {
                            Toast.fail(data.infomessage, 2);
                        }
                    }
                )
                .catch(err => {
                    dispatch(fetchFailure())
                })
        }
    },

}


const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST,
})


const fetchPaySuccess = (data) => ({
    type: actionTypes.FETCH_PAY_SUCCESS,
    response: data
})


const fetchFailure = () => ({
    type: actionTypes.FETCH_FAILURE,
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_PAY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                payList: action.response
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


//selectors
export const getFetchingStatus = (state) => {
    return state.thirdPay.isFetching
}

export const getPayList = (state) => {
    return state.thirdPay.payList
}

