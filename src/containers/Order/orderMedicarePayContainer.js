/**
 * Class: OrderMedicarePayContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  从订单查询-进入 预结算
 */
import React, {Component} from 'react';
import {OrderType} from "@assets/static/DictionaryConstant";
import {withRouter} from 'react-router-dom'

class OrderMedicarePayContainer extends Component {

    render() {
        return (
            <div/>
        );
    }

    componentDidMount() {
        //    J2C-WebView
        const {history} = this.props
        this.timer = setTimeout(() => {
            //混合支付
            window['J2C'].payReg("去支付", function (e) {
            })

            window['J2C']['payRegCallBack'] = function (response) {
                let resObj = JSON.parse(response)
                let token = {},
                    reservationEntity = resObj.reservationEntity
                token.access_token = resObj.access_token
                token.refresh_token = resObj.refresh_token
                sessionStorage.setItem('token', JSON.stringify(token))
                let path = {
                    pathname: '/advanceSettlementContainer',
                    state: {
                        reservationName: OrderType[0].register,
                        reservationCode: OrderType[0].status,
                        reservationEntity: reservationEntity,
                        paymentMethod: reservationEntity.paymentMethod,
                        from: resObj.fromTarget
                    }
                }
                history.push(path)
            }
        }, 100)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    //医保支付
    medicarePay(){
        const {history} = this.props
    }

    //第三方支付
    thirdPay(){

    }


}


export default withRouter(OrderMedicarePayContainer)
