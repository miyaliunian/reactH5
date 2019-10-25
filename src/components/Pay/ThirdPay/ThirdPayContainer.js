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

import {OrderTypeWrapper, PayTypeList, ButtonWrapper} from './style'
import {Toast} from 'antd-mobile'
import './style.less'
//图标
import icon_ybzf from '@images/Pay/ico_ybk_png.png'; //医保卡支付
import icon_zfb from '@images/Pay/ico_zfb_png.png';// 支付宝
import icon_wechat from '@images/Pay/logo_wechat(07-12-09-01-07).png';// 微信
import icon_ylzf from '@images/Pay/logo_unionpay.png';// 银联
import icon_gsyh from '@images/Pay/工商银行.png';// 工商银行
import icon_pay_n from '@images/Pay/icon_pay_radio_n.png';// 支付方式 正常状态
import icon_pay_radio_sel from '@images/Pay/icon_pay_radio_sel.png';// 支付方式 选中状态

//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPayMethodEntity, actions as thirdPayActions} from "@reduxs/modules/thirdPay";


class ThirdPayContainer extends Component {

    //选择哪种支付方式
    state = {
        selIndex: 0
    }

    render() {
        //from 用户标识 此页面是走正常流程进来的，还是通过我的订单进入的
        const {orderPayment, ObjEntity, reservationName,from} = this.props.location.state
        const {PayMethodEntityItems} = this.props
        // console.log(orderPayment)
        // console.log(PayMethodEntityItems)
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
                            {/*用户标识 此页面是走正常流程进来的，还是通过我的订单进入的  如果是存自费 ownPayAmt = totalPayAmt */}
                            {!from ?
                            <span
                                style={{color: 'orange'}}>￥{(orderPayment.ownPayAmt).toFixed(2)}</span>
                                :
                                <span
                                    style={{color: 'orange'}}>￥{(orderPayment.totalPayAmt).toFixed(2)}</span>
                            }

                        </div>
                    </OrderTypeWrapper>
                    <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <PayTypeList>
                        <p style={{height: '35px', lineHeight: '35px'}} className={'border-bottom'}>请选择支付方式</p>
                        <ul>
                            {
                                PayMethodEntityItems.map((item, index) => {
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
                                        case 10: //招商银行H5支付
                                            iconName = icon_zfb
                                            title = '一网通银行卡支付'
                                            break
                                        case 12: //江南银行
                                            iconName = icon_ylzf
                                            title = 'e融支付'
                                            break
                                        case 13: //招商银行微信支付
                                            iconName = icon_wechat
                                            title = '微信支付'
                                            break
                                        case 14: //江南银行银联支付
                                            iconName = icon_ylzf
                                            title = '云闪付'
                                            break
                                        default:
                                            break

                                    }
                                    return (
                                        <li className={'payComponent_payBtn_row border-bottom '} key={index}>
                                            <div onClick={()=>this.choosePayMethod(index)} className={'payComponent_payBtn_item'}>
                                                <img src={iconName}
                                                     style={{width: '30px', height: '30px', paddingRight: '10px'}}/>
                                                <span style={{fontSize: '17px'}}>{title}</span>
                                                <img src={index == this.state.selIndex ? icon_pay_radio_sel :icon_pay_n }
                                                     className={'payComponent_payMethod'}/>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </PayTypeList>
                    <ButtonWrapper>
                        {!from ?
                        <span className={'payComponent_desc'}>待支付：￥{(orderPayment.ownPayAmt).toFixed(2)}</span>
                            :
                            <span className={'payComponent_desc'}>待支付：￥{(orderPayment.totalPayAmt).toFixed(2)}</span>
                        }
                        <span className={'payComponent_btn'} onClick={() => this.Pay()}>支  付</span>
                    </ButtonWrapper>
                </SafeAreaView>
                <LoadingMask/>
            </div>
        )
    }

    renderPayListItems(PayMethodEntityItems) {
        {
            PayMethodEntityItems.map(item => {
                return (
                    <li className={'payComponent_payBtn_row border-top '}>
                        <span style={{fontSize: '17px'}}>{item.name}</span>
                    </li>
                )
            })

        }
    }

    choosePayMethod(index){
        this.setState({selIndex:index})
    }

    handleBack = () => {
        //返回上一个页面时 需要刷新预结算页面的订单支付状态
        this.props.history.goBack()
    }


    Pay() {
        const {history,thirdPayActions:{WXPay}} = this.props
        if (this.state.selIndex != 2) {
            Toast.info('只能选择微信支付')
            return
        }
        const {orderPayment, ObjEntity, reservationCode, reservationName,from} = this.props.location.state
        // //支付
        //1. 调动原生获取手机IP
        window['J2C'].H5WXPAyIP({type:'支付'}, (e) => {
        })
        //1.1 调动原生获取手机IP 回调
        window['J2C']['H5WXPAyIPCallBack'] = function (response) {
            let reParams = {
                'orderType': reservationCode,
                'orderId': ObjEntity.unifiedOrderId,
                ip:response
            }
            //2.调用后台接口
            WXPay(reParams,(e)=>{
                console.log(e)
                //2.1
                window['J2C'].H5WXPay({wxReq:e.data}, (e) => {})
                //2.2H5支付回调
                window['J2C']['H5WXPayCallBack'] = function (response) {
                    let resObj = JSON.parse(response)
                    console.log(resObj)
                    if (resObj.errCode === 0) {
                        let path = {
                            pathname: '/payCountdown',
                            state: {
                                sn: ObjEntity.sn,
                                reservationName: reservationName,
                                price: !from ? orderPayment.ownPayAmt :orderPayment.totalPayAmt  //用户标识 此页面是走正常流程进来的，还是通过我的订单进入的
                            }
                        }
                        history.push(path)
                    } else {
                        Toast.fail(resObj.errMsg, 1)
                    }
                };
            })
        }

    }


    componentDidMount() {

        /**
         *   paymentMethod === 2   ?(纯自费) 直接获取支付方式 : (自费金额 ===  总金额  &&  paymentStatus === 0   空跑一遍医保支付)
         */
        const {thirdPayActions:{reMedicarePayAndReLoadPayTypeItems,loadPayTypeItems,}} =this.props
        if (this.props.history.action === 'PUSH') {
            const {ObjEntity, reservationCode, paymentMethod, orderPayment,from} = this.props.location.state
            if (!from) {  // 走正常流程进入纯自费支付
                if (paymentMethod === 1 && orderPayment.ownPayAmt === orderPayment.totalAmt && ObjEntity.paymentStatus === 0) {
                    //空跑一遍医保支付
                    reMedicarePayAndReLoadPayTypeItems(reservationCode, ObjEntity, orderPayment)
                } else {
                    //存自费：获取支付方式
                    loadPayTypeItems(reservationCode, ObjEntity)
                }
            }else { // 从我的订单进入纯自费支付
                loadPayTypeItems(reservationCode, ObjEntity)
            }
        }
    }


    componentWillUnmount() {
        this.props.thirdPayActions.clearPayTypeItems()
    }
}

const mapStateToProps = (state) => {
    return {
        PayMethodEntityItems: getPayMethodEntity(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        thirdPayActions: bindActionCreators(thirdPayActions, dispatch),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThirdPayContainer))
