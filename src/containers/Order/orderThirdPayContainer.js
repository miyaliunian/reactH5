/**
 * Class: OrderMedicarePayContainer
 * Author: wufei
 * Date: 2019-10-22
 * Description:
 *  从订单查询-进入 纯自费
 */
import React, {Component} from 'react';
import {OrderType} from "@assets/static/DictionaryConstant";
import {withRouter} from 'react-router-dom'

class orderThirdPayContainer extends Component {

    render() {
        return (
            <div onClick={() => this.thirdPay()}>
                自费部分
            </div>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    //第三方支付
    thirdPay() {
        const {history} = this.props
        //混合支付
        window['J2C'].payReg("去支付", function (e) {
        })
        window['J2C']['payRegCallBack'] = function (response) {
            debugger
            let resObj = JSON.parse(response)
            let token = {},
                reservationEntity = resObj.reservationEntity
            token.access_token = resObj.access_token
            token.refresh_token = resObj.refresh_token
            let orderPaymentEntity = JSON.parse(JSON.stringify(reservationEntity).replace(/ownCost/g, "ownPayAmt").replace(/regFee/g, "totalPayAmt"));
            sessionStorage.setItem('token', JSON.stringify(token))

            let path = {
                pathname: '/thirdPayContainer',
                state: {
                    orderPayment: orderPaymentEntity, //拼接订单信息
                    reservationName: OrderType[0].register,
                    reservationCode: OrderType[0].status,
                    ObjEntity: reservationEntity,
                    paymentMethod: reservationEntity.paymentMethod,
                    from: resObj.fromTarget
                }
            }
            history.push(path)
        }
    }


}


export default withRouter(orderThirdPayContainer)
