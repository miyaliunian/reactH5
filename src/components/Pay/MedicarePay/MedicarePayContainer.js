/**
 * Class: MedicarePayContainer
 * Author: wufei
 * Date: 2019/8/16
 * Description:
 *  医保支付(结算)
 *
 *    账户支付：siPayAmt + pubPayAmt
 *    账户余额:prePayBalance
 *    待支付：siPayAmt + pubPayAmt
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import PopUP from "@components/PopUp/PopUpContainer";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as popUpActions, getPopupState} from "@reduxs/modules/popUp";
import {actions as medicarePayActions, getFetchingStatus, getVerifyEntity} from "@reduxs/modules/medicarePay";
import icon_ybzf from '@images/Pay/ico_ybk_png.png';
import './style.less'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";


class MedicarePayContainer extends Component {

    render() {
        const {popUpActions, fetchStatus} = this.props
        const {orderPayment, ObjEntity, reservationName} = this.props.location.state
        return (
            <div className={'medicarePay'} style={{height: '100vh', width: '100%', position: 'fixed'}}>
                <SafeAreaView showBar={true} title={'医保支付'} isRight={false} handleBack={this.handleBack}>
                    <div className={'payComponent_info'}>
                        <div className={'payComponent_info_row'}>
                            <span>订单号</span>
                            <span>{ObjEntity.sn}</span>
                        </div>
                        <div className={'payComponent_info_row'}>
                            <span>商品名称</span>
                            <span>{reservationName}</span>
                        </div>
                        <div className={'payComponent_info_row'}>
                            <span>账户支付</span>
                            <span
                                style={{color: 'orange'}}>￥{(orderPayment.siPayAmt + orderPayment.pubPayAmt).toFixed(2)}</span>
                        </div>
                    </div>
                    <div style={{height: '10px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <div className={'payComponent_payType'}>
                        <p style={{height: '50px', lineHeight: '50px', paddingLeft: '10px'}}>请选择支付方式</p>
                        <div className={'payComponent_payBtn_row border-top '}>
                            <img src={icon_ybzf} alt='' style={{width: '40px', height: '40px', paddingRight: '10px'}}/>
                            <div className={'payComponent_payBtn_row_right'}>
                                <span>医保支付</span>
                                <span style={{
                                    color: 'rgb(126,126,126)',
                                    fontSize: '13px',
                                    marginTop: '2px'
                                }}>账户金额：￥{(orderPayment.prePayBalance.toFixed(2))}</span>
                            </div>
                        </div>
                    </div>
                    <div className={'payComponent_bottomBtn'}>
                        <span
                            className={'payComponent_desc'}
                        >待支付：￥{(orderPayment.siPayAmt + orderPayment.pubPayAmt).toFixed(2)}</span>
                        <span className={'payComponent_btn'} onClick={() => popUpActions.showPopup()}>支  付</span>
                    </div>
                    <PopUP price={orderPayment} title={reservationName} callBack={(e) => this.handleInputValus(e)}/>
                </SafeAreaView>
                {fetchStatus ? <LoadingMask/> : ''}
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    handleInputValus(e) {
        const {reservationCode: orderType, ObjEntity, reservationName, orderPayment} = this.props.location.state
        this.props.medicarePayActions.pay(e, orderType, ObjEntity, reservationName, orderPayment, {...this.props.history}, (data) => this.popGoback(data))
    }


    popGoback(data) {
        this.props.location.callBack(data)
        setTimeout(() => {
            this.props.history.goBack()
        }, 200)
    }

    componentDidMount() {
        const {history} = this.props
        if (history.action === 'PUSH') {
            const {person} = this.props.location.state
            this.props.medicarePayActions.loadVerifyInfo(person)
        }
    }


    componentWillUnmount(){
        this.props.popUpActions.hidePopup()
    }
}


const mapStateToProps = (state) => {
    return {
        popupState: getPopupState(state),
        fetchStatus: getFetchingStatus(state),
        verify: getVerifyEntity(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        popUpActions: bindActionCreators(popUpActions, dispatch),
        medicarePayActions: bindActionCreators(medicarePayActions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicarePayContainer))
