/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description: login-redux
 *
 */
import url from "../../utils/httpUrl"
import {PUBLIC_LEY} from "../../assets/static";
import {FETCH_DATA} from "../middleware/api";
import {dataConversionDic} from '../../assets/static'


export const schema = {
    name: dataConversionDic.token,
}

const initialState = {
    username: '',
    password: '',
    isFetching: false,
    status: false // 登录标识  表示之前是否登录过
}


// action types
const actionTypes = {
    LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
    SET_USERNAME: 'LOGIN/SET_USERNAME',
    SET_PASSWORD: 'LOGIN/SET_PASSWORD',

    LOGOUT: 'LOGIN/LOGOUT',
}

// action creators：一
export const actions = {
    login: () => {
        return (dispatch, getstate) => {
            const {username, password} = getstate().login
            if (!(username && username.length > 0 && password && password.length > 0)) {
                return dispatch(loginFailure('用户名密码不能为空'))
            }

            //RAS:处理加密
            let encrypt = new window.JSEncrypt()
            encrypt.setPublicKey(PUBLIC_LEY);
            let pwdencry = encrypt.encrypt(password);
            // console.log(pwdencry)
            const targetURL = url.API_LOGIN(username, pwdencry)
            return dispatch(fetchLogin(targetURL))
            /**
             *
             return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(loginSuccess())
                    resolve()
                }, 1000)
            })
             * */

        }
    },



    setUserName: (username) => ({
        type: actionTypes.SET_USERNAME,
        username
    }),
    setPassword: (password) => ({
        type: actionTypes.SET_PASSWORD,
        password
    })
}

// action creators：二
const fetchLogin = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.LOGIN_REQUEST,
            actionTypes.LOGIN_SUCCESS,
            actionTypes.LOGIN_FAILURE,
        ],
        targetURL,
        schema
    }
})

const loginFailure = error => ({
    type: actionTypes.LOGIN_FAILURE,
    error
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.LOGIN_SUCCESS:
            return {...state, isFetching: false}
        case actionTypes.LOGIN_FAILURE:
            return {...state, isFetching: false}
        case actionTypes.LOGOUT:
            return {...state, status: false, username: '', password: ''}
        case actionTypes.SET_USERNAME:
            return {...state, username: action.username}
        case actionTypes.SET_PASSWORD:
            return {...state, password: action.password}
        default:
            return state
    }
}

export default reducer

//selectors
export const getUserName = (state) => {
    return state.login.username
}


export const getPassword = (state) => {
    return state.login.password
}


export const isLogin = (state) => {
    return state.login.status;
}