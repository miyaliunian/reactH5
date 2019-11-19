/**
 * Class: doctor
 * Author: wufei
 * Date: 2019/7/2
 * Description:
 *  预约信息
 */
import URL from "@utils/httpUrl";
import {OrderType} from "@assets/static/Constant";
import {post} from "@utils/httpUtil";
import {Toast} from "antd-mobile";

const initialState = {
    payType: {},//包含是否显示滑块，滑块状态能不能切换
    diagnosis: "初诊",//初诊、复诊、取消
    bindCardData: [],
    medicalTypeData: [],
    diagName: "", //疾病信息
    switchInfo: {},
    btnDisable: true
};

const actionTypes = {
    //支付方式：（支付方式，当日挂号或预约挂号）
    FETCH_PAY_TYPE_SUCCESS: "RESERVATION/FETCH_PAY_TYPE_SUCCESS",

    //家庭成员列表
    FETCH_RESERVATION_BIND_CARD_SUCCESS: "RESERVATION/FETCH_RESERVATION_BIND_CARD_SUCCESS",

    //使用家庭成员的SiTypeCode获取医疗类别
    FETCH_MEDICAL_TYPE_SUCCESS: "RESERVATION/FETCH_MEDICAL_TYPE_SUCCESS",

    //切换家庭成员
    SET_BINDCARD_ITEM: "RESERVATION/SET_BINDCARD_ITEM",

    //切换(初诊、复诊、取消)
    SET_DIAGNOSIS_NAME: "RESERVATION/SET_DIAGNOSIS_NAME",

    //填写疾病信息
    SET_DIAGNAME_VALUE: "RESERVATION/SET_DIAGNAME_VALUE",

    //Switch 选中
    SET_SWITCH_CHECKED: "RESERVATION/SWITCH_CHECKED",

    //滑块组件是否显示，如果显示 是否为选中状态
    SET_SWITCH_INFO: "RESERVATION/SET_SWITCH_INFO",

    //按钮可以被点击
    BTN_ABLE: "RESERVATION/BTN_ABLE",
    BTN_DISABLE: "RESERVATION/BTN_DISABLE",

    //登录按钮
    BTN_SUBMIT_REQUEST: "RESERVATION/BTN_SUBMIT_REQUEST",
    BTN_SUBMIT_SUCCESS: "RESERVATION/BTN_SUBMIT_SUCCESS",
    BTN_SUBMIT_FAILURE: "RESERVATION/BTN_SUBMIT_FAILURE",


    RESET: "RESERVATION/RESET"
};


export const actions = {


    loadPayType: (hosid, scheduleid, cb) => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_REGISTER_PAY_TYPE(hosid, scheduleid);
            return post(targetURL)
                .then(
                    data => {
                        // 实际用的是列表的第0条数据。
                        if (data.data[0].id <= 1) {
                            //不显示Switch组件
                            dispatch(fetchPayTypeSuccess({
                                switchTxt: "去医院支付",  //线下支付
                                showSwitch: false, //是否显示switch组件
                                data: data.data[0]
                            }));
                            cb()
                        } else {
                            //显示Switch组件
                            dispatch(fetchPayTypeSuccess({
                                switchTxt: "使用医保支付", // 线上支付(医保支付、自费支付)
                                showSwitch: true,
                                data: data.data[0]
                            }));
                            cb()
                        }
                    },
                    error => {
                        console.log(error);
                        Toast.info(error.message, 1);
                    }
                );
        };
    },

    /**
     *  既能医保支付又能用自费
     * @returns {function(*=, *=): Promise<T | never>}
     */
    loadBindCardAndMedicalTypeList: () => {
        return (dispatch, getstate) => {
            const targetURL = URL.API__BIND_CARD_LIST();
            return post(targetURL).then(
                data => {
                    data.data.map(item => {
                        if (item.def) {
                            //家庭成员
                            dispatch(fetchBindCardSuccess(item));
                            //Switch组件 是否选中 是否可以切换状态
                            if (getstate().reservation.payType.showSwitch) {
                                if (item.sitype && item.auth) {
                                    dispatch(setSwitchInfo({
                                        showSwitch: true,
                                        checked: true,//switch是否为选中状态
                                        canChecked: true// switch组件能不能被滑动
                                    }));
                                } else {
                                    dispatch(setSwitchInfo({
                                        showSwitch: true,
                                        checked: false,//switch是否为选中状态
                                        canChecked: false // switch组件能不能被滑动
                                    }));
                                }
                            } else {
                                dispatch(setSwitchInfo({
                                    showSwitch: false,
                                    checked: false, // switch组件能不能被滑动
                                    canChecked: false// switch组件能不能被滑动
                                }));
                            }

                            const targetURL = URL.API_REGISTER_MEDICAL_TYPE(item.siTypeCode);
                            return post(targetURL).then(
                                data => {
                                    //使用家庭成员的SiTypeCode获取医疗类别
                                    dispatch(fetchMedicalTypeSuccess(data.data));
                                    dispatch({type: actionTypes.BTN_ABLE});
                                },
                                error => {

                                }
                            );
                        }
                    });
                },
                error => {
                    console.log(error);
                    Toast.info(error.message, 1);
                }
            );
        };
    },


    /**
     * 切换家庭成员之后 重新请求switch组件状态
     * @param data  家庭成员
     * @returns {Function}
     */
    loadMedicalTypeByBindCard: (item) => {
        return (dispatch, getstate) => {
            //修改家庭成员选中的数据
            dispatch(reSetBindCard(item));
            if (getstate().reservation.payType.showSwitch) {
                if (item.sitype && item.auth) {
                    dispatch(setSwitchInfo({
                        showSwitch: true,
                        checked: true,
                        canChecked: true
                    }));
                } else {
                    dispatch(setSwitchInfo({
                        showSwitch: true,
                        checked: true,
                        canChecked: false
                    }));
                }
            } else {
                dispatch(setSwitchInfo({
                    showSwitch: false,
                    checked: true,
                    canChecked: false
                }));
            }
            const targetURL = URL.API_REGISTER_MEDICAL_TYPE(item.siTypeCode);
            return post(targetURL).then(
                data => {
                    //使用家庭成员的SiTypeCode获取医疗类别
                    dispatch(fetchMedicalTypeSuccess(data.data));
                },
                error => {
                    console.log(error);
                    Toast.fail(error, 1);
                }
            );


        }
    },


    reset: () => {
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.RESET});
        };
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
     * 切换:初诊、复诊、取消
     * @param data
     * @returns {{}}
     */
    setDiagnosisName: (data) => ({
        type: actionTypes.SET_DIAGNOSIS_NAME,
        data
    }),


    /**
     * 设置疾病信息
     * @param data
     * @returns {{type: string, data: *}}
     */
    setDiagName: (data) => ({
        type: actionTypes.SET_DIAGNAME_VALUE,
        data
    }),

    /**
     * 确认预约:按钮点击
     * @param data
     * @param history
     * @returns {function(*, *)}
     */
    onSubmit: (data, route) => {
        return (dispatch, getstate) => {
            /**
             * 请求的Body
             * @type {{}}
             */
            const {doctorInfo, reservationInfo, timeInterval} = data
            const {push} =route
            let PARAM = {};
            PARAM.hosId = doctorInfo.hosId;//医院id
            PARAM.deptId = reservationInfo.deptId;//科室id(依排版信息为准)
            PARAM.doctorId = doctorInfo.id;//医生id
            PARAM.scheduleId = reservationInfo.id;//会诊id
            PARAM.timeintervalId = timeInterval.id;//会诊时间点id

            /**
             * 家庭成员对象
             * @type {T[]}
             */

            let bindCardObj = getstate().reservation.bindCardData

            if (bindCardObj) {
                //家庭成员id
                PARAM.personId = bindCardObj.id;
                //家庭成员mgwid
                PARAM.cardId = bindCardObj.mgwId;
            }

            /**
             * Switch对象
             * @type {{}|initialState.switchInfo|*}
             */
            let switchObj = getstate().reservation.switchInfo;


            /**
             * 支付方式
             */
            let payObj = getstate().reservation.payType.data;

            // 是否为初诊
            if (getstate().reservation.diagnosis === "初诊") {
                PARAM.isFirst = true;
            } else {
                PARAM.isFirst = false;
            }


            //诊断名称
            if (getstate().reservation.diagName.length > 0) {
                PARAM.diagName = getstate().reservation.diagName;
            } else {
                PARAM.diagName = "尚未确诊";
            }

            /**
             * 医疗列表
             */
            let medicalType = getstate().reservation.medicalTypeData[0];
            PARAM.mdicalType = medicalType.mdicaltype_code; //医疗类别

            if (payObj.id === 1) {
                PARAM.paymentMethod = 0;
                PARAM.paymentMethodName = "去医院支付";
            } else if (payObj.id === 2) {
                if (bindCardObj.auth) {
                    if (getstate().reservation.switchInfo.checked) {
                        PARAM.paymentMethod = 1; //混合支付
                        PARAM.paymentMethodName = "在线支付";
                    } else {
                        PARAM.paymentMethod = 2; // 存自费
                        PARAM.paymentMethodName = "在线支付";
                    }
                } else {
                    PARAM.paymentMethod = 2;
                    PARAM.paymentMethodName = "在线支付";
                }
            }
            const targetUrl = URL.API_REGISTER_UNION();
            return post(targetUrl, PARAM)
                .then(res => {
                    console.log('线上挂号')
                    console.log('请求成功')
                    console.log('请求成功的数据')
                    console.log(res)
                    if (res.infocode === 1) {
                        if (switchObj.checked) {
                            //纯医保
                            let path = {
                                pathname: "/advanceSettlementContainer",
                                state: {
                                    reservationName: OrderType[0].register,
                                    reservationCode: OrderType[0].status,
                                    reservationEntity: res.data,//订单实体
                                    paymentMethod: PARAM.paymentMethod
                                }
                            };
                            push(path);
                        } else {
                            //手动选择纯自费
                            let path = {
                                pathname: "/thirdPayContainer",
                                state: {
                                    reservationName: OrderType[0].register,
                                    reservationCode: OrderType[0].status,
                                    ObjEntity: res.data,
                                    orderPayment: {"ownPayAmt": reservationInfo.regFee},//挂号实体
                                    paymentMethod: PARAM.paymentMethod
                                }
                            };
                            push(path);
                        }
                    } else {
                        Toast.fail(res.infomessage, 2);
                    }
                })
                .catch(err => {
                    console.log('请求失败')
                    Toast.info(err.message, 1);
                });
        };
    },

};

const fetchPayTypeSuccess = (data) => ({
    type: actionTypes.FETCH_PAY_TYPE_SUCCESS,
    data
});


const fetchBindCardSuccess = (data) => ({
    type: actionTypes.FETCH_RESERVATION_BIND_CARD_SUCCESS,
    data
});

const fetchMedicalTypeSuccess = (data) => ({
    type: actionTypes.FETCH_MEDICAL_TYPE_SUCCESS,
    data
});


const reSetBindCard = (data) => ({
    type: actionTypes.SET_BINDCARD_ITEM,
    data
});

const setSwitchInfo = (data) => ({
    type: actionTypes.SET_SWITCH_INFO,
    data
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAY_TYPE_SUCCESS:
            return {
                ...state,
                payType: action.data
            };
        case actionTypes.FETCH_RESERVATION_BIND_CARD_SUCCESS:
            return {
                ...state,
                bindCardData: action.data
            };
        case actionTypes.FETCH_MEDICAL_TYPE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                medicalTypeData: action.data
            };

        case actionTypes.SET_BINDCARD_ITEM:
            return {
                ...state,
                bindCardData: action.data
            };
        case actionTypes.SET_DIAGNOSIS_NAME:
            return {
                ...state,
                diagnosis: action.data
            };
        case actionTypes.SET_DIAGNAME_VALUE:
            return {
                ...state,
                diagName: action.data
            };
        case actionTypes.SET_SWITCH_INFO:
            return {
                ...state,
                switchInfo: action.data
            };
        case actionTypes.SET_SWITCH_CHECKED:
            return {
                ...state,
                switchInfo: action.data
            };

        case actionTypes.BTN_ABLE:
            return {
                ...state,
                btnDisable: false
            };

        case actionTypes.RESET: {
            return {
                ...state,
                isFetching: false,
                isRefresh: true, // 只有第一次进入页面为true  其它条件都为false
                payType: {},
                diagnosis: "初诊",//初诊、复诊、取消
                bindCardData: [],
                medicalTypeData: [],
                diagName: "", //疾病信息
                switchInfo: {},
                btnDisable: true
            };
        }
        default:
            return state;
    }
};
export default reducer;


//selectors
export const getFetchingStatus = (state) => {
    return state.reservation.isFetching;
};

export const getPayTypeData = (state) => {
    return state.reservation.payType;
};

export const getBindCard = (state) => {
    return state.reservation.bindCardData;
};


export const getDiagnosis = (state) => {
    return state.reservation.diagnosis;
};

export const getMedicalType = (state) => {
    return state.reservation.medicalTypeData;
};

export const getSwitchInfo = (state) => {
    return state.reservation.switchInfo;
};

export const getBtnDisable = (state) => {
    return state.reservation.btnDisable;
};
