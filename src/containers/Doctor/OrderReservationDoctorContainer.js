/**
 * Class: OrderReservationDoctorContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  从订单查询-进入 医生详情
 */

import React, {Component} from 'react';
import window from 'global/window'
import {withRouter} from 'react-router-dom'

class OrderReservationDoctorContainer extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div/>
        )
    }

    componentDidMount() {
        const {history} =this.props
        this.timer = setTimeout(() => {
            //H5调用取值
            window['J2C'].regAgain("2123", function (e) {
            })
            //回传值给H5
            window['J2C']['regAgainCallBack'] = function (response) {
                let resObj = JSON.parse(response)
                let token = {}
                token.access_token = resObj.access_token
                token.refresh_token = resObj.refresh_token
                sessionStorage.setItem('token', JSON.stringify(token))
                let path = {
                    pathname: '/doctor',
                    state: resObj.params
                }
                history.push(path)
            }
        }, 10)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    //测试
    getValue(){
        const {history} =this.props
        //H5调用取值
        window['J2C'].regAgain("2123", function (e) {
        })
        //回传值给H5
        window['J2C']['regAgainCallBack'] = function (response) {
            let resObj = JSON.parse(response)
            let token = {}
            token.access_token = resObj.access_token
            token.refresh_token = resObj.refresh_token
            sessionStorage.setItem('token', JSON.stringify(token))
            let path = {
                pathname: '/doctor',
                state: resObj.params
            }
            history.push(path)
        }
    }
}

export default withRouter(OrderReservationDoctorContainer)
