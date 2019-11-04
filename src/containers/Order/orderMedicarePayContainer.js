/**
 * Class: OrderMedicarePayContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  从订单查询-进入 预结算
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as orderPayActions, getOrderType} from '../../reduxs/modules/orderPay'

class OrderMedicarePayContainer extends Component {

    render() {
        return (
            <div onClick={()=>this.medicarePay()}>
                去支付
            </div>
        );
    }

    componentDidMount() {
        return
        const {history,orderPayActions:{setOrderPayType}} = this.props
        this.timer = setTimeout(() => {
            //混合支付
            window['J2C'].payReg("去支付", function (e) {
            })

            window['J2C']['payRegCallBack'] = function (response) {
                let resObj = JSON.parse(response)
                //从哪个页面进入(预约挂号、门诊缴费、扫描购药)
                setOrderPayType(resObj.fromTarget)

                let typeEntity={}
                switch (resObj.fromTarget) {
                    case "register":
                        typeEntity={name:'线上挂号',status:'register'}
                        break
                    case "recipe":
                        typeEntity={name:'门诊缴费',status:'recipe'}
                        break
                    case "medicineScan":
                        typeEntity={name:'扫码购药',status:'medicineScan'}
                        break
                }
                //跳转页面
                let token = {},
                    reservationEntity = resObj.reservationEntity
                token.access_token = resObj.access_token
                token.refresh_token = resObj.refresh_token
                sessionStorage.setItem('token', JSON.stringify(token))
                let path = {
                    pathname: '/advanceSettlementContainer',
                    state: {
                        reservationName: typeEntity.name,
                        reservationCode: typeEntity.status,
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
    medicarePay() {
        const {history,orderPayActions:{setOrderPayType}} = this.props
        this.timer = setTimeout(() => {
            //混合支付
            window['J2C'].payReg("去支付", function (e) {
            })

            window['J2C']['payRegCallBack'] = function (response) {
                debugger
                let resObj = JSON.parse(response)
                //从哪个页面进入(预约挂号、门诊缴费、扫描购药)
                setOrderPayType(resObj.fromTarget)
                //跳转页面
                let token = {}
                let reservationEntity={}
                let typeEntity={}
                switch (resObj.fromTarget) {
                    case "register":
                        typeEntity={name:'线上挂号',code:'register'}
                        reservationEntity = resObj.reservationEntity
                        break
                    case "recipe":
                        typeEntity={name:'门诊缴费',code:'recipe'}
                        reservationEntity = JSON.parse(JSON.stringify(resObj.reservationEntity).replace(/totCost/g, "regFee"));
                        break
                    case "medicineScan":
                        typeEntity={name:'扫码购药',code:'medicineScan'}
                        break
                }

                token.access_token = resObj.access_token
                token.refresh_token = resObj.refresh_token
                sessionStorage.setItem('token', JSON.stringify(token))
                let path = {
                    pathname: '/advanceSettlementContainer',
                    state: {
                        reservationName: typeEntity.name,
                        reservationCode: typeEntity.code,
                        reservationEntity: reservationEntity,
                        paymentMethod: reservationEntity.paymentMethod,
                        from: resObj.fromTarget
                    }
                }
                history.push(path)
            }
        }, 100)
    }
}


const mapStateToProps = (state) => {
    return {
        payType: getOrderType(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderPayActions: bindActionCreators(orderPayActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderMedicarePayContainer))
