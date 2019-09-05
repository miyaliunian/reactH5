/**
 * Class: ThirdPayContainer
 * Author: wufei
 * Date: 2019/9/5
 * Description:
 *  第三方支付
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getFetchingStatus, getPayList, actions as thirdPayActions} from "@reduxs/modules/thirdPay";
import {OrderTypeWrapper, PayTypeList, ButtonWrapper} from './style'
import './style.less'


class ThirdPayContainer extends Component {
    render() {
        const {orderPayment, ObjEntity, reservationName} = this.props.location.state
        const {fetchStatus, payItems} = this.props
        return (
            <div className={'thirdPay'}>
                <SafeAreaView showBar={true} title={'选择支付方式'} isRight={false} handleBack={this.handleBack}>
                    <OrderTypeWrapper>
                        <div className={'payComponent_info_row'}>
                            <span>订单号</span>
                            <span>{ObjEntity.sn}</span>
                        </div>
                        <div className={'payComponent_info_row'}>
                            <span>商品名称</span>
                            <span>{reservationName}</span>
                        </div>
                        <div className={'payComponent_info_row'}>
                            <span>账户支出</span>
                            <span
                                style={{color: 'orange'}}>￥{(orderPayment.siPayAmt + orderPayment.pubPayAmt).toFixed(2)}</span>
                        </div>
                    </OrderTypeWrapper>
                    <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <PayTypeList>
                        <p style={{height: '30px', lineHeight: '30px'}}>请选择支付方式</p>
                        <ul>
                            {this.renderPayListItems(payItems)}
                        </ul>
                    </PayTypeList>
                    <ButtonWrapper>
                        <span className={'payComponent_desc'}>待支付：￥{(orderPayment.ownPayAmt).toFixed(2)}</span>
                        <span className={'payComponent_btn'} onClick={() => this.Pay()}>支  付</span>
                    </ButtonWrapper>
                </SafeAreaView>
                {fetchStatus ? <LoadingMask/> : ''}
            </div>
        )
    }

    renderPayListItems(payItems) {
        {
            payItems.map(item => {
                return (
                    <li className={'payComponent_payBtn_row border-top '}>
                        <span style={{fontSize: '17px'}}>{item.name}</span>
                    </li>
                )
            })

        }
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    Pay() {
        const {reservationCode} = this.props.location.state

    }


    componentWillMount() {
        if (this.props.history.action === 'PUSH') {

        }
    }

    componentDidMount() {
        if (this.props.history.action === 'PUSH') {
            const {ObjEntity, reservationCode} = this.props.location.state
            this.props.thirdPayActions.loadPayList(reservationCode, ObjEntity)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        fetchStatus: getFetchingStatus(state),
        payItems: getPayList(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        thirdPayActions: bindActionCreators(thirdPayActions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThirdPayContainer))
