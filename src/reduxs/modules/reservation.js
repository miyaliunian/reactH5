/**
 * Class: doctor
 * Author: wufei
 * Date: 2019/7/2
 * Description:
 *  预约信息
 */
import URL from '@utils/httpUrl'
import {post} from "@utils/httpUtil";
import {FETCH_DATA} from "@reduxs/middleware/api";

import {Toast} from 'antd-mobile';


const initialState = {
    isFetching: false,
    isRefresh: true, // 只有第一次进入页面为true  其它条件都为false
    payType: {},
    bindCardData: [],
    medicalTypeData: [],
    switchInfo: {}
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

    //切换家庭成员
    SET_BINDCARD_ITEM: 'RESERVATION/SET_BINDCARD_ITEM',

    //componentDidMount 才会刷新页面,history.goBack()不会刷新页面
    SET_REFRESH_PAGE: 'RESERVATION/SET_REFRESH_PAGE',

    //Switch 选中
    SET_SWITCH_CHECKED: 'RESERVATION/SWITCH_CHECKED',

    //滑块组件是否显示，如果显示 是否为选中状态
    SET_SWITCH_INFO: 'RESERVATION/SET_SWITCH_INFO',

    //登录按钮
    BTN_SUBMIT_REQUEST: 'RESERVATION/BTN_SUBMIT_REQUEST',
    BTN_SUBMIT_SUCCESS: 'RESERVATION/BTN_SUBMIT_SUCCESS',
    BTN_SUBMIT_FAILURE: 'RESERVATION/BTN_SUBMIT_FAILURE',
}


export const actions = {


    loadPayType: (hosid, scheduleid) => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_REGISTER_PAY_TYPE(hosid, scheduleid)
            if (!getstate().reservation.isRefresh) {
                return
            }
            dispatch(fetchPayTypeRequest(true))
            return post(targetURL).then(
                data => {
                    // 实际用的是列表的第0条数据。
                    if (data.data[0].id === 1) {
                        //不显示Switch组件
                        dispatch(fetchPayTypeSuccess({
                            switchTxt: '去医院支付',
                            showSwitch: false,
                            data: data.data[0]
                        }))
                    } else {
                        //显示Switch组件
                        dispatch(fetchPayTypeSuccess({
                            switchTxt: '使用医保支付',
                            showSwitch: true,
                            data: data.data[0]
                        }))
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
                return
            }
            const targetURL = URL.API__BIND_CARD_LIST()
            return post(targetURL).then(
                data => {
                    //家庭成员
                    dispatch(fetchBindCardSuccess(data.data))
                    data.data.map(item => {

                        if (item.def) {
                            if (getstate().reservation.payType.showSwitch) {
                                if (item.sitype) {
                                    dispatch(setSwitchInfo({
                                        showSwitch: true,
                                        defChecked: true,
                                        checked: true
                                    }))
                                } else {
                                    dispatch(setSwitchInfo({
                                        showSwitch: true,
                                        defChecked: false,
                                        checked: false
                                    }))
                                }
                            } else {
                                dispatch(setSwitchInfo({
                                    showSwitch: false,
                                    defChecked: false,
                                    checked: false
                                }))
                            }

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
                    if (getstate().reservation.payType.showSwitch) {
                        if (item.sitype) {
                            dispatch(setSwitchInfo({
                                showSwitch: true,
                                defChecked: true,
                                checked: true
                            }))
                        } else {
                            dispatch(setSwitchInfo({
                                showSwitch: true,
                                defChecked: false,
                                checked: false
                            }))
                        }
                    } else {
                        dispatch(setSwitchInfo({
                            showSwitch: false,
                            defChecked: false,
                            checked: false
                        }))
                    }

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


    /**
     * Switch 切换
     * @param checked
     * @returns {{}}
     */
    setSwitchChecked: (data) => ({
        type: actionTypes.SET_SWITCH_CHECKED,
        data
    }),


    /**
     * 确认预约:按钮点击
     * @returns {function(*, *)}
     */
    onSubmit: (data) => {
        return (dispatch, getstate) => {

            /**
             * 请求的Body
             * @type {{}}
             */
            let PARAM = {}
            PARAM.hosId = data.doctorInfo.hosId//医院id
            PARAM.deptId = data.doctorInfo.deptId//科室id
            PARAM.doctorId = data.doctorInfo.id//医生id
            PARAM.scheduleId = data.reservationInfo.id//会诊id
            PARAM.timeintervalId = data.timeInterval.id//会诊时间点id


            /**
             * 家庭成员对象
             * @type {T[]}
             */
            let bindCardObj = getstate().reservation.bindCardData.filter(i =>
                i.def === true
            )


            /**
             * Switch对象
             * @type {{}|initialState.switchInfo|*}
             */
            let switchObj = getstate().reservation.switchInfo


            /**
             * 支付方式
             */
            let payObj = getstate().reservation.payType.data


            if (payObj.id === 1) {
                PARAM.paymentMethod = 0
                PARAM.paymentMethodName = '去医院支付'
            } else if (payObj.id === 2) {
                if (bindCardObj[0].auth) {
                    if (getstate().reservation.switchInfo.checked) {
                        PARAM.paymentMethod = 1
                        PARAM.paymentMethodName = '在线支付'
                    } else {
                        PARAM.paymentMethod = 2
                        PARAM.paymentMethodName = '在线支付'
                    }
                } else {
                    PARAM.paymentMethod = 2
                    PARAM.paymentMethodName = '在线支付'
                }
            }

            const targetUrl = URL.API_REGISTER_UNION()
            return dispatch(submitBtnClick(targetUrl, PARAM))
        }
    },

    /**
     * 刷新页面标识
     * @param status
     * @returns {{type: string, status: *}}
     */
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

const setSwitchInfo = (data) => ({
    type: actionTypes.SET_SWITCH_INFO,
    data
})


const submitBtnClick = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.BTN_SUBMIT_REQUEST,
            actionTypes.BTN_SUBMIT_SUCCESS,
            actionTypes.BTN_SUBMIT_FAILURE,
        ],
        targetURL,
    },
    param
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
            case actionTypes.SET_SWITCH_INFO:
                return {
                    ...state,
                    switchInfo: action.data
                }
            case actionTypes.SET_SWITCH_CHECKED:
                return {
                    ...state,
                    switchInfo: action.data
                }
            case actionTypes.SET_REFRESH_PAGE://componentDidMount 才会刷新页面,history.goBack()不会刷新页面
                return {
                    ...state,
                    isRefresh: action.status
                }
            case actionTypes.BTN_SUBMIT_REQUEST:
                return {
                    ...state,
                    isFetching: true
                }
            case actionTypes.BTN_SUBMIT_SUCCESS:
                if (action.response.infocode !== 1){
                    Toast.fail(action.response.infomessage, 1);
                }
                return {
                    ...state,
                    isFetching: false
                }
            case actionTypes.BTN_SUBMIT_FAILURE:
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
    return state.reservation.isFetching
}

export const getPayTypeData = (state) => {
    return state.reservation.payType
}

export const getBindCard = (state) => {
    return state.reservation.bindCardData
}

export const getSwitchInfo = (state) => {
    // console.log(state.reservation.switchInfo)
    return state.reservation.switchInfo
}

export const getMedicalType = (state) => {
    return state.reservation.medicalTypeData
}