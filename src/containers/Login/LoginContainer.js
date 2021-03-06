/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description: 登录
 *
 */
import React, { Component } from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import LoadingMask from '@components/Loading/LoadingMask'

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { actions as loginActions, isLogin, getPassword, getUserName } from '../../reduxs/modules/login'
import './style.less'


class LoginContainer extends Component {
  render() {
    const { username, password, login } = this.props

    if (login) {
      return <Redirect to={'/user'} />
    }

    return (
      <SafeAreaView showBar={true} title={'账号密码登录'} isRight={false} handleBack={this.handleBack}>
        <div className={'login'}>
          <LoginForm username={username} password={password} onChange={this.handleChange} onSubmit={this.onSubmit} />
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  handleChange = e => {
    if (e.target.name === 'username') {
      this.props.loginActions.setUserName(e.target.value)
    } else if (e.target.name === 'password') {
      this.props.loginActions.setPassword(e.target.value)
    }
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  onSubmit = () => {
    this.props.loginActions.login(this.props)
  }
}

const mapStateToProps = state => {
  return {
    username: getUserName(state),
    password: getPassword(state),
    login: isLogin(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
