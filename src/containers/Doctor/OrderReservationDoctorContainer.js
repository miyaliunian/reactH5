/**
 * Class: OrderReservationDoctorContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  从订单查询-进入 医生详情
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class OrderReservationDoctorContainer extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render() {
        return (
            <div/>
        )
    }

    componentDidMount() {
        window.addEventListener('message', (e) => this.orderReservationRN(e))
    }

    orderReservationRN(e){
        let data = JSON.parse(e.data)
        sessionStorage.setItem('token', JSON.stringify(data.tokenObj))
        let path = {
            pathname: '/doctor',
            state: data.paramsObj
        }
        this.props.history.push(path)
    }
}

export  default withRouter(OrderReservationDoctorContainer)
