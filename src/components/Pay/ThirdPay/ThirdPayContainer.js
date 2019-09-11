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
//图标
import icon_ybzf from '@images/Pay/ico_ybk_png.png'; //医保卡支付
import icon_zfb from '@images/Pay/ico_zfb_png.png';// 支付宝
import icon_wechat from '@images/Pay/logo_wechat(07-12-09-01-07).png';// 微信
import icon_ylzf from '@images/Pay/logo_unionpay.png';// 银联
import icon_gsyh from '@images/Pay/工商银行.png';// 工商银行
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
                                style={{color: 'orange'}}>￥{(orderPayment.ownPayAmt).toFixed(2)}</span>
                        </div>
                    </OrderTypeWrapper>
                    <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <PayTypeList>
                        <p style={{height: '35px', lineHeight: '35px'}} className={'border-bottom'}>请选择支付方式</p>
                        <ul>
                            {
                                payItems.map((item, index) => {
                                    let iconName = ''
                                    let title = ''
                                    switch (item.id) {
                                        case 1: //去医院支付
                                            break
                                        case 2: //医保支付
                                            iconName = ''
                                            break
                                        case 3: //支付宝支付
                                            iconName = icon_zfb
                                            break
                                        case 4: //工商银行支付
                                            iconName = icon_gsyh
                                            title = '中国工商银行'
                                            break
                                        case 5: //银联支付
                                            iconName = icon_ylzf
                                            title = '银联在线支付'
                                            break
                                        case 6: //微信支付
                                            iconName = icon_wechat
                                            title = '微信支付'
                                            break
                                        case 7: //银联支付(无跳转)
                                            iconName = icon_ylzf
                                            title = '银联在线支付'
                                            break
                                        case 8: //江南银行微信支付
                                            iconName = icon_wechat
                                            title = '微信支付'
                                            break
                                        case 9: //江南银行支付宝
                                            iconName = icon_zfb
                                            title = '支付宝'
                                            break
                                        case 14: //江南银行银联支付
                                            iconName = icon_ylzf
                                            title = '云闪付'
                                            break
                                        default:
                                            break

                                    }
                                    return (
                                        <li className={'payComponent_payBtn_row border-top '} key={index}>
                                            <img src={iconName}
                                                 style={{width: '30px', height: '30px', paddingRight: '10px'}}/>
                                            <span style={{fontSize: '17px'}}>{title}</span>
                                        </li>
                                    )
                                })
                            }
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
        debugger
        const {orderPayment, ObjEntity, reservationCode, reservationName} = this.props.location.state
        window['J2C'].H5WXPay({body: {'orderType': reservationCode, 'orderId': ObjEntity.unifiedOrderId}})
    }


    componentDidMount() {
        /**
         *   paymentMethod === 2   ?(纯自费) 直接获取支付方式 : (自费金额 ===  总金额  &&  paymentStatus === 0   空炮一遍医保支付)
         */
        if (this.props.history.action === 'PUSH') {
            const {ObjEntity, reservationCode, paymentMethod, orderPayment} = this.props.location.state
            debugger
            if (paymentMethod === 1 && orderPayment.ownPayAmt === orderPayment.totalAmt && ObjEntity.paymentStatus === 0) {
                this.props.thirdPayActions.reMedicarePayAndReLoadPayTypeItems(reservationCode, ObjEntity, orderPayment)
            } else {
                this.props.thirdPayActions.loadPayTypeItems(reservationCode, ObjEntity)
            }
        }
    }


    componentWillUnmount() {
        this.props.thirdPayActions.clearPayTypeItems()
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
