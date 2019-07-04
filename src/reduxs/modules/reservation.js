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
    isRefresh: true, // 只有第一次进入页面为true  其它条件都为false
    payType: {},
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


    SET_BINDCARD_ITEM: 'RESERVATION/SET_BINDCARD_ITEM',

    SET_REFRESH_PAGE: 'RESERVATION/SET_REFRESH_PAGE'
}


export const actions = {
    loadPayType: (hosid, scheduleid) => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_REGISTER_PAY_TYPE(hosid, scheduleid)
            if (!getstate().reservation.isRefresh) {
                console.log('loadPayType：从上一个页面回退')
                return
            }
            console.log('loadPayType：第一次请求')
            dispatch(fetchPayTypeRequest(true))
            return post(targetURL).then(
                data => {
                    // 实际用的是列表的第0条数据。
                    if (data.data[0].id === 1) {
                        //不显示Switch组件
                        dispatch(fetchPayTypeSuccess({switchTxt: '去医院支付', showSwitch: false, data: data.data[0]}))
                    } else {
                        //显示Switch组件
                        dispatch(fetchPayTypeSuccess({switchTxt: '使用医保支付', showSwitch: true, data: data.data[0]}))
                    }
                },
                error => {

                }
            )
        }
    },


    loadBindCardAndMedicalTypeList: () => {
        return (dispatch, getstate) => {
            if (!getstate().reservation.isRefresh) {
                console.log('loadBindCardAndMedicalTypeList：从上一个页面回退')
                return
            }
            console.log('loadBindCardAndMedicalTypeList：第一次请求')
            const targetURL = URL.API__BIND_CARD_LIST()
            return post(targetURL).then(
                data => {
                    //家庭成员
                    dispatch(fetchBindCardSuccess(data.data))
                    data.data.map(item => {
                        if (item.def) {
                            const targetURL = URL.API_REGISTER_MEDICAL_TYPE(item.siTypeCode)
                            return post(targetURL).then(
                                data => {
                                    //使用家庭成员的SiTypeCode获取医疗类别
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


    loadMedicalTypeByBindCard: (data) => {
        return (dispatch, getstate) => {
            //修改家庭成员选中的数据
            dispatch(setBindCard(data))
            data.map((item) => {
                if (item.def) {
                    const targetURL = URL.API_REGISTER_MEDICAL_TYPE(item.siTypeCode)
                    return post(targetURL).then(
                        data => {
                            //使用家庭成员的SiTypeCode获取医疗类别
                            dispatch(fetchMedicalTypeSuccess(data.data))
                        },
                        error => {
                        }
                    )
                }
            })
        }
    },


    setIsRefresh: (status) => ({
        type: actionTypes.SET_REFRESH_PAGE,
        status
    })


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


const setBindCard = (data) => ({
    type: actionTypes.SET_BINDCARD_ITEM,
    data
})


const
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.FETCH_PAY_TYPE_REQUEST:
                return {
                    ...state,
                    isFetching: true
                }
            case actionTypes.FETCH_PAY_TYPE_SUCCESS:
                return {
                    ...state,
                    payType: action.data
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
                }

            case actionTypes.SET_BINDCARD_ITEM:
                return {
                    ...state,
                    bindCardData: action.data
                }
            case actionTypes.SET_REFRESH_PAGE://componentDidMount 才会刷新页面,history.goBack()不会刷新页面
                return {
                    ...state,
                    isRefresh: action.status
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
    return state.reservation.payType
}

export const getBindCard = (state) => {
    return state.reservation.bindCardData
}

export const getSwitchInfo = (state) => {
    // console.log('getSwitchInfo')
    if (JSON.stringify(state.reservation.payType) !== '{}' && state.reservation.payType.data.id === 2) {
        if (typeof(state.reservation.bindCardData.sitype) !== "undefined" && state.reservation.bindCardData.sitype) {
            // console.log('显示Switch：选中')
        } else {
            // console.log('显示Switch：未选中')
        }
    } else {
        // console.log('不显示Switch')
    }
    return state.reservation.payType
}

export const getMedicalType = (state) => {
    return state.reservation.medicalTypeData
}