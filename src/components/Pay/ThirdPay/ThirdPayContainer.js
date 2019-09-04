/**
 * Class: SelfPayContainer
 * Author: wufei
 * Date: 2019/8/16
 * Description:
 *  第三方支付
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getFetchingStatus, actions as thirdPayActions} from "@reduxs/modules/thirdPay";
import {OrderTypeWrapper, PayTypeList, ButtonWrapper} from './style'
import './style.less'


class ThirdPayContainer extends Component {
    render() {
        const {orderPayment, ObjEntity, fromName, from} = this.props.location.state
        const {fetchStatus} = this.props
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
                            <span>{fromName}</span>
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
                        <div className={'payComponent_payBtn_row border-top '}>
                            <span style={{fontSize: '17px'}}>e融支付</span>
                        </div>
                        <div className={'payComponent_payBtn_row border-top'}>
                            <span style={{fontSize: '17px'}}>一卡通银行卡支付</span>
                        </div>
                        <div className={'payComponent_payBtn_row border-top'}>
                            <span style={{fontSize: '17px'}}>微信支付</span>
                        </div>
                    </PayTypeList>
                    <ButtonWrapper>
                        <span className={'payComponent_desc'}>待支付：￥{(orderPayment.ownPayAmt).toFixed(2)}</span>
                        <span className={'payComponent_btn'}>支  付</span>
                    </ButtonWrapper>
                </SafeAreaView>
                {fetchStatus ? <LoadingMask/> : ''}
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentWillMount() {
        if (this.props.history.action === 'PUSH') {
        }
    }

    componentDidMount() {
        if (this.props.history.action === 'PUSH') {
        }
    }
}

const mapStateToProps = (state) => {
    return {
        fetchStatus: getFetchingStatus(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        thirdPayActions: bindActionCreators(thirdPayActions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThirdPayContainer))
