/**
 * Class: doctor
 * Author: wufei
 * Date: 2019/7/2
 * Description:
 *  预约信息
 */
import URL from '@utils/httpUrl'
import {post} from "@utils/httpUtil";


const initialState = {
    isFetching: false,
    isShowSwitch: false,
    payTypeData: [],
    bindCardData: [],
    medicalTypeData: []

}

const actionTypes = {
    //支付方式：（支付方式，当日挂号或预约挂号）
    FETCH_PAY_TYPE_REQUEST: 'RESERVATION/FETCH_PAY_TYPE_REQUEST',
    FETCH_PAY_TYPE_SUCCESS: 'RESERVATION/FETCH_PAY_TYPE_SUCCESS',
    FETCH_PAY_TYPE_FAILURE: 'RESERVATION/FETCH_PAY_TYPE_FAILURE',

    //家庭成员列表
    FETCH_RESERVATION_BIND_CARD_SUCCESS: 'RESERVATION/FETCH_RESERVATION_BIND_CARD_SUCCESS',

    //使用家庭成员的SiTypeCode获取医疗类别
    FETCH_MEDICAL_TYPE_SUCCESS: 'RESERVATION/FETCH_MEDICAL_TYPE_SUCCESS',
}


export const actions = {
    loadPayType: (hosid, scheduleid) => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_REGISTER_PAY_TYPE(hosid, scheduleid)
            dispatch(fetchPayTypeRequest(true))
            return post(targetURL).then(
                data => {
                    dispatch(fetchPayTypeSuccess(data.data))
                },
                error => {

                }
            )
        }
    },


    loadBindCardList: () => {
        return (dispatch, getstate) => {
            const targetURL = URL.API__BIND_CARD_LIST()
            return post(targetURL).then(
                data => {
                    data.data.map(item => {
                        if (item.def) {
                            dispatch(fetchBindCardSuccess(item))
                            const targetURL = URL.API_REGISTER_MEDICAL_TYPE(item.siTypeCode)
                            return post(targetURL).then(
                                data => {
                                    dispatch(fetchMedicalTypeSuccess(data.data))
                                },
                                error => {

                                }
                            )
                        }
                    })
                },
                error => {

                }
            )

        }
    },


}


const fetchPayTypeRequest = (data) => ({
    type: actionTypes.FETCH_PAY_TYPE_REQUEST,
    data
})


const fetchPayTypeSuccess = (data) => ({
    type: actionTypes.FETCH_PAY_TYPE_SUCCESS,
    data
})

const fetchBindCardSuccess = (data) => ({
    type: actionTypes.FETCH_RESERVATION_BIND_CARD_SUCCESS,
    data
})

const fetchMedicalTypeSuccess = (data) => ({
    type: actionTypes.FETCH_MEDICAL_TYPE_SUCCESS,
    data
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAY_TYPE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_PAY_TYPE_SUCCESS:
            return {
                ...state,
                payTypeData: action.data
            }
        case actionTypes.FETCH_RESERVATION_BIND_CARD_SUCCESS:
            return {
                ...state,
                bindCardData: action.data
            }
        case actionTypes.FETCH_MEDICAL_TYPE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                medicalTypeData: action.data
            }
        case actionTypes.FETCH_PAY_TYPE_FAILURE:
            return {
                ...state,
                isFetching: false,
                payTypeData: []
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.reservation.isFetching
}

export const getPayTypeData = (state) => {
    return state.reservation.payTypeData
}

export const getSwtichStatus = (state) => {
    return state.reservation.payTypeData[0]
}

export const getMedicalType = (state) => {
    return state.reservation.medicalTypeData
}