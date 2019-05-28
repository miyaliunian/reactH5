/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description: 登录
 *
 */
import React, {Component} from 'react'
import LoginHeader from "./components/LoginHeader/LoginHeader";
import LoginForm from "./components/LoginForm/LoginForm";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import {actions as loginActions, isLogin, getPassword, getUserName} from '../../reduxs/modules/login'




class LoginContainer extends Component {


    componentDidMount() {

    }

    render() {
        const {username, password, login} = this.props

        if (login) {
            return <Redirect to={'/user'}/>
        }

        return (
            <div>
                <LoginHeader/>
                <LoginForm
                    username={username}
                    password={password}
                    onChange={this.handleChange}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }

    handleChange = (e) => {
        if (e.target.name === "username") {
            this.props.loginActions.setUserName(e.target.value)
        } else if (e.target.name === "password") {
            this.props.loginActions.setPassword(e.target.value)
        }
    }

    onSubmit = () => {
        this.props.loginActions.login()
    }
}


const mapStateToProps = (state) => {
    return {
        username: getUserName(state),
        password: getPassword(state),
        login: isLogin(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)