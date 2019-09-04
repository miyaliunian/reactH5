/**
 * Class: medicarePay
 * Author: wufei
 * Date: 2019/9/4
 * Description:
 *  医保支付
 */

import URL from '@utils/httpUrl';
import Axios from 'axios'
import {Toast} from 'antd-mobile';
import {post} from "@utils/httpUtil";
import {PUBLIC_LEY} from "@assets/static";

const initialState = {
    isFetching: false,
    personEntity: '',
    settleEntity: ''
}

const actionTypes = {
    FETCH_REQUEST: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_REQUEST',
    FETCH_PERSON_SUCCESS: 'ADVANCE_SETTLE/FETCH_PERSON_SUCCESS',
    FETCH_ADVANCE_SETTLE_SUCCESS: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_SUCCESS',
    FETCH_FAILURE: 'ADVANCE_SETTLE/FETCH_ADVANCE_SETTLE_FAILURE',
}

export const actions = {
    pay: (pass) => {
        return (dispatch, getstate) => {
            //RAS:处理加密
            let encrypt = new window.JSEncrypt()
            encrypt.setPublicKey(PUBLIC_LEY);
            let pwdencry = encrypt.encrypt(pass);

        }
    }
}


//加载人员信息
function loadPerson(targetUrl, dispatch) {

    return post(targetUrl)
        .then((data) => {
                if (data.infocode && data.infocode === 1) {
                    dispatch(fetchPersonSuccess(data.data))
                } else {
                    Toast.fail(data.infomessage, 2);
                }
            }
        )
        .catch(err => {
            dispatch(fetchFailure())
        })

}


//加载预结算信息
function loadAdvanceSettleInfo(targetUrl, dispatch) {

    return post(targetUrl)
        .then(data => {
            if (data.infocode === 1) {
                dispatch(fetchSettleSuccess(data.data))
                console.log('预结算信息')
                console.log(data.data)
            } else {
                Toast.fail(data.infomessage, 2);
            }
        })
        .catch(err => {
            dispatch(fetchFailure())
        })
}


const fetchRequest = () => ({
    type: actionTypes.FETCH_REQUEST,
})

const fetchPersonSuccess = (data) => ({
    type: actionTypes.FETCH_PERSON_SUCCESS,
    response: data
})


const fetchSettleSuccess = (data) => ({
    type: actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS,
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
        case actionTypes.FETCH_PERSON_SUCCESS:

            return {
                ...state,
                isFetching: false,
                personEntity: action.response
            }
        case actionTypes.FETCH_ADVANCE_SETTLE_SUCCESS:

            return {
                ...state,
                isFetching: false,
                settleEntity: action.response
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
    return state.medicarePay.isFetching
}
