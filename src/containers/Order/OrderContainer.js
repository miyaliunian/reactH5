/**
 * Class: OrderContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  订单查询-进入 预结算
 */
import React, {Component} from 'react';
import {OrderType} from "@assets/static/DictionaryConstant";
import {withRouter} from 'react-router-dom'

class OrderContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div/>
        );
    }

    componentDidMount() {
        console.log('componentDidMount')
        window.addEventListener('message', (e) => this.dataFromRN(e))
    }

    dataFromRN(e) {
        let data = JSON.parse(e.data),
            reservationEntity = data.Params
        sessionStorage.setItem('token', JSON.stringify(data.Token))
        let path = {
            pathname: '/advanceSettlementContainer',
            state: {
                reservationName: OrderType[0].register,
                reservationCode: OrderType[0].status,
                reservationEntity: reservationEntity,
                paymentMethod: reservationEntity.paymentMethod,
            }
        }
        this.props.history.push(path)

    }
}


export default withRouter(OrderContainer)
