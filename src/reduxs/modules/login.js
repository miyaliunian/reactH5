/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description: login-redux
 *
 */
import url from "../../utils/httpUrl"
import {post} from '@utils/httpUtil'
import {PUBLIC_LEY} from "../../assets/static";


const initialState = {
    username: '',
    password: '',
    isFetching: false,
    status: false // 登录标识  表示之前是否登录过
}


const actionTypes = {
    LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
    SET_USERNAME: 'LOGIN/SET_USERNAME',
    SET_PASSWORD: 'LOGIN/SET_PASSWORD',

    LOGOUT: 'LOGIN/LOGOUT',
}


export const actions = {
    login: (props) => {
        return (dispatch, getstate) => {
            const {username, password} = getstate().login
            if (!(username && username.length > 0 && password && password.length > 0)) {
                return dispatch(loginFailure('用户名密码不能为空'))
            }
            //RAS:处理加密
            let encrypt = new window.JSEncrypt()
            encrypt.setPublicKey(PUBLIC_LEY);
            let pwdencry = encrypt.encrypt(password);
            const targetURL = url.API_LOGIN(username, pwdencry)
            return post(targetURL).then(
                data => {
                    if (data.infocode === -1) {
                        dispatch(loginFailure(data.infomessage))
                    } else {
                        let token = {}
                        token.access_token = data.data.loginData.access_token
                        token.refresh_token = data.data.loginData.refresh_token
                        localStorage.setItem('token', JSON.stringify(token))
                        props.history.goBack()
                    }
                },
                error => {
                    console.log(error)
                }
            )
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


const loginSuccess = ()=>({
    type:actions.LOGIN_SUCCESS,

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


export const getUserName = (state) => {
    return state.login.username
}


export const getPassword = (state) => {
    return state.login.password
}


export const isLogin = (state) => {
    return state.login.status;
}

