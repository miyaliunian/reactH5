/**
 * By Cuiyong 20190708
 * 用户注册
 */
import {Toast} from 'antd-mobile';
import url from "@utils/httpUrl";
import {FETCH_DATA} from "@reduxs/middleware/api";
import {PUBLIC_LEY} from "@assets/static";
import {cityID} from '@assets/static/DictionaryConstant'
import {post} from "@utils/httpUtil";

const initialState = {
    r_userName: '',
    r_userIdNumber: '',
    r_securityType: '320600',
    r_cellphoneNumber: '',
    r_securityCode: '',
    r_password: '',
    r_passwordRepeat: '',
    // siTypes: [{'name': '南通医保', 'code': '320600'}]
    siTypes: ['南通医保'],
    siMap: [["南通医保", "320600"]],
    loadStatus: false
}

const actionTypes = {
    REGISTER_SMS_REQUEST: 'REGISTER/SMS_REQUEST',
    REGISTER_SMS_SUCCESS: 'REGISTER/SMS_SUCCESS',
    REGISTER_SMS_FAILURE: 'REGISTER/SMS_FAILURE',
    REGISTER_REGISTER_REQUEST: 'REGISTER/REGISTER_REQUEST',
    REGISTER_REGISTER_SUCCESS: 'REGISTER/REGISTER_SUCCESS',
    REGISTER_REGISTER_FAILURE: 'REGISTER/REGISTER_FAILURE',
    REGISTER_SITYPE_REQUEST: 'REGISTER/SITYPE_REQUEST',
    REGISTER_SITYPE_SUCCESS: 'REGISTER/SITYPE_SUCCESS',
    REGISTER_SITYPE_FAILURE: 'REGISTER/SITYPE_FAILURE',

    SET_USER_NAME: 'REGISTER/SET_USER_NAME',
    SET_USER_ID: 'REGISTER/SET_USER_ID',
    SET_SECURITY_TYPE: 'REGISTER/SET_SECURITY_TYPE',
    SET_CELLPHONE_NUMBER: 'REGISTER/SET_CELLPHONE_NUMBER',
    SET_SECURITY_CODE: 'REGISTER/SET_SECURITY_CODE',
    SET_PASSWORD: 'REGISTER/SET_PASSWORD',
    SET_PASSWORD_REPEAT: 'REGISTER/SET_PASSWORD_REPEAT',
    SET_SITYPE: 'REGISTER/SET_SITYPE ',
    SET_LOAD_STATUS: 'REGISTER/SET_LOAD_STATUS'
}


export const actions = {
    /**
     * 检查手机号码格式。应该用于点击“发送手机验证码”时
     * @param cellphoneNumber
     * @returns {boolean}
     */
    checkCellphoneNumber: () => {
        return (dispatch, getstate) => {
            const {r_cellphoneNumber, r_userIdNumber} = getstate().register;
            if (!r_userIdNumber) {
                Toast.fail('请输入有效身份证号！', 1);
                return false;
            }
            let reg_id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg_id.test(r_userIdNumber) === false) {
                Toast.fail('请输入有效身份证号！', 1);
                return false;
            }
            if (!r_cellphoneNumber) {
                Toast.fail('请输入手机号码！', 1);
                return false;
            }
            let reg = /^1[0-9]{10}$/;
            if (reg.test(r_cellphoneNumber) === false) {
                Toast.fail('请输入正确的手机号码！', 1);
                return false;
            }
            return true;

        }
    },
    /**
     * 对表单值进行依次校验
     * @param userName
     * @param userIdNumber
     * @param securityType
     * @param cellphoneNumber
     * @param securityCode
     * @param password
     * @param passwordRepeat
     * @returns {{result: boolean, msg: string}}
     */
    checkPageParams: () => {
        return (dispatch, getstate) => {
            const {r_userName, r_userIdNumber, r_securityType, r_cellphoneNumber, r_securityCode, r_password, r_passwordRepeat} = getstate().register;
            if (!r_userName) {
                Toast.fail('请输入姓名！', 1);
                return false;
            }
            if (!r_userIdNumber) {
                Toast.fail('请输入有效身份证号！', 1);
                return false;
            }
            let reg_id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg_id.test(r_userIdNumber) === false) {
                Toast.fail('请输入有效身份证号！', 1);
                return false;
            }
            if (!r_cellphoneNumber) {
                Toast.fail('请输入手机号码！', 1);
                return false;
            }
            let reg_phone = /^1[0-9]{10}$/;
            if (reg_phone.test(r_cellphoneNumber) === false) {
                Toast.fail('请输入正确的手机号码！', 1);
                return false;
            }
            if (!r_securityCode) {
                Toast.fail('请输入手机验证码！', 1);
                return false;
            }
            if (!r_password) {
                Toast.fail('请输入登录密码！', 1);
                return false;
            }
            if (!r_passwordRepeat) {
                Toast.fail('再次输入登录密码！', 1);
                return false;
            }
            if (!r_password === r_passwordRepeat) {
                Toast.fail('两次输入的登录密码不一致！', 1);
                return false;
            }
            return true;
        }
    },
    sendSmsMessage: () => {
        return (dispatch, getstate) => {
            const {r_userIdNumber, r_cellphoneNumber} = getstate().register;
            const targetURL = url.API__USER_REGISTER_SMSMESSAGE_SEND();
            let param = {
                idNumber: r_userIdNumber || null,
                mobilenumber: r_cellphoneNumber || null
            }
            return dispatch(sendSMSMessage(targetURL, param));
        }
    },
    /**
     * 执行用户注册
     */
    registerUser: () => {
        return (dispatch, getstate) => {
            const {r_userName, r_userIdNumber, r_securityType, r_cellphoneNumber, r_securityCode, r_password} = getstate().register;
            const targetUrl = url.API__USER_REGISTER_REGISTER(r_securityCode);
            let encrypt = new window.JSEncrypt()
            encrypt.setPublicKey(PUBLIC_LEY);
            let password = encrypt.encrypt(r_password);
            let param = {
                username: r_userName || null,
                idNumber: r_userIdNumber || null,
                siTypeCode: r_securityType || null,
                phone: r_cellphoneNumber || null,
                password: password || null
            }
            console.log("params: " + JSON.stringify(param));
            return dispatch(doRegister(targetUrl, param));
        }
    },
    getSiType: () => {
        return (dispatch, getstate) => {
            const targetUrl = url.API__USER_REGISTER_SITYPE(cityID, 0);
            return post(targetUrl).then(
                data => {
                    dispatch(fetchSiTypesSuccess(data.data));
                },
                error => {

                }
            )
        }
    },
    setUserName: (r_userName) => ({
        type: actionTypes.SET_USER_NAME,
        r_userName
    }),
    setUserIdNumber: (r_userIdNumber) => ({
        type: actionTypes.SET_USER_ID,
        r_userIdNumber
    }),
    setSecurityType: (r_securityType) => ({
        type: actionTypes.SET_SECURITY_TYPE,
        r_securityType
    }),
    setCellphoneNumber: (r_cellphoneNumber) => ({
        type: actionTypes.SET_CELLPHONE_NUMBER,
        r_cellphoneNumber
    }),
    setSecurityCode: (r_securityCode) => ({
        type: actionTypes.SET_SECURITY_CODE,
        r_securityCode
    }),
    setPassword: (r_password) => ({
        type: actionTypes.SET_PASSWORD,
        r_password
    }),
    setPasswordRepeat: (r_passwordRepeat) => ({
        type: actionTypes.SET_PASSWORD_REPEAT,
        r_passwordRepeat
    }),
    setLoadStatus: (loadStatus) => ({
        type: actionTypes.SET_LOAD_STATUS,
        loadStatus
    })

}


const
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.SET_USER_NAME:
                return {...state, r_userName: action.r_userName}
            case actionTypes.SET_USER_ID:
                return {...state, r_userIdNumber: action.r_userIdNumber}
            case actionTypes.SET_SECURITY_TYPE:
                return {...state, r_securityType: action.r_securityType}
            case actionTypes.SET_CELLPHONE_NUMBER:
                return {...state, r_cellphoneNumber: action.r_cellphoneNumber}
            case actionTypes.SET_SECURITY_CODE:
                return {...state, r_securityCode: action.r_securityCode}
            case actionTypes.SET_PASSWORD:
                return {...state, r_password: action.r_password}
            case actionTypes.SET_PASSWORD_REPEAT:
                return {...state, r_passwordRepeat: action.r_passwordRepeat}
            case actionTypes.SET_LOAD_STATUS:
                return {...state, loadStatus: action.loadStatus}
            case actionTypes.REGISTER_REGISTER_REQUEST:
                return {
                    ...state,
                    loadStatus: true
                }
            case actionTypes.REGISTER_REGISTER_SUCCESS:
                if (action.response.infocode !== 1) {
                    Toast.fail(action.response.infomessage, 2);
                } else {
                    Toast.success("恭喜您注册成功！", 2);
                }
                return {
                    ...state,
                    loadStatus: false
                }
            case actionTypes.REGISTER_REGISTER_FAILURE:
                Toast.fail('注册失败！', 1);
                return {
                    ...state,
                    loadStatus: false
                }


            case actionTypes.REGISTER_SMS_REQUEST:
                return {
                    ...state,
                    loadStatus: true
                }
            case actionTypes.REGISTER_SMS_SUCCESS:
                Toast.success("验证码发送成功！", 2);
                return {
                    ...state,
                    loadStatus: false
                }
            case actionTypes.REGISTER_SMS_FAILURE:
                Toast.fail('验证码发送失败！', 1);
                return {
                    ...state,
                    loadStatus: false
                }


            case actionTypes.REGISTER_SITYPE_SUCCESS:
                let initData = action.data;
                console.log("initData: " + JSON.stringify(initData));
                let toData = [];
                let toMap = new Map();
                for (let i = 0; i < initData.length; i++) {
                    console.log("i: " + i);
                    toData.push(initData[i].name);
                    toMap.set(initData[i].name, initData[i].code);
                }
                console.log("toMap: " + toMap.get("南通医保"));
                toData.push("取消");
                return {
                    ...state,
                    siTypes: toData,
                    siMap: toMap
                }
            default:
                return state
        }
    }
const sendSMSMessage = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.REGISTER_SMS_REQUEST,
            actionTypes.REGISTER_SMS_SUCCESS,
            actionTypes.REGISTER_SMS_FAILURE,
        ],
        targetURL,
    },
    param
})
const doRegister = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.REGISTER_REGISTER_REQUEST,
            actionTypes.REGISTER_REGISTER_SUCCESS,
            actionTypes.REGISTER_REGISTER_FAILURE,
        ],
        targetURL,
    },
    param
})
const fetchSiTypesSuccess = (data) => ({
    type: actionTypes.REGISTER_SITYPE_SUCCESS,
    data
})
export default reducer


//selectors
export const getUserName = (state) => {
    return state.register.r_userName
}

export const getUserIdNumber = (state) => {
    return state.register.r_userIdNumber
}

export const getSecurityType = (state) => {
    return state.register.r_securityType
}

export const getCellphoneNumber = (state) => {
    return state.register.r_cellphoneNumber
}

export const getSecurityCode = (state) => {
    return state.register.r_securityCode
}
export const getPassword = (state) => {
    return state.register.r_password
}

export const getPasswordRepeat = (state) => {
    return state.register.r_passwordRepeat
}
export const getSiType = (state) => {
    return state.register.siTypes
}
export const getSiMap = (state) => {
    return state.register.siMap
}
export const getLoadStatus = (state) => {
    return state.register.loadStatus
}