/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *
 */
import React, {Component} from 'react'
import {Link}from 'react-router-dom'
import './style.less'

export default class LoginHeader extends Component {
    render() {
        return (
            <div className={'loginHeader'}>
                <Link to={'/'} className={'loginHeader__back'}/>
                <div className={'loginHeader__title'}>账号密码登录</div>
            </div>
        )
    }
}    
