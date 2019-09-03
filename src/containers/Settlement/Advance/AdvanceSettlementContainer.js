/**
 * Class: AdvanceSettlementContainer
 * Author: wufei
 * Date: 2019/8/28
 * Description:
 *  订单预结算
 *   自费 从来不显示 已支付
 *  paymentStatus  === 1(医保已支付) 账号、统筹 均显示已支付  ： paymentStatus  === 0(医保未支付) 账号、统筹(不显示已支付)
 *  paymentStatus ===0   账户余额:prePayBalance
 *  paymentStatus ===1   账户余额:postPayBalance
 *  ownPayAmt  ==  总金额(纯自费)  账号、统筹 均显示已支付
 */
import React, {Component} from 'react'
import classNames from 'classnames'
import ico_user from '@images/Home/ico_user.png'
import Button from "@components/Button/Button";
import {PerContent, SettleInfoContent, InfoRow, Separation, PayInfoContent, BtnContent} from './style'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getFetchingStatus,
    getAdvanceSttle,
    actions as advanceSettlementActions
} from "@reduxs/modules/advanceSettlement";

class AdvanceSettlementContainer extends Component {
    render() {
        const {patientName, sn, regFee, paymentStatus} = this.props.location.state
        console.log(this.props.advanceSettleInfo)
        return (
            <div id={'AdvanceSettlementContainer'} style={{height: '100vh', width: '100%', position: 'fixed'}}>
                <SafeAreaView showBar={true} title={'订单预结算'} isRight={false} handleBack={this.handleBack}>
                    <PerContent>
                        <img src={ico_user} className={'bindCard__icon'} width={'35px'} height={'35px'}/>
                        <span style={{marginLeft: '10px', fontSize: '20px'}}>{patientName}</span>
                    </PerContent>
                    <SettleInfoContent>
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>订单号</span>
                            <span>{sn}</span>
                        </InfoRow>
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>商品名称</span>
                            <span>{this.props.location.from}</span>
                        </InfoRow>
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>总金额</span>
                            <span style={{
                                color: 'orange',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>￥{regFee.toFixed(2)}</span>
                        </InfoRow>
                    </SettleInfoContent>
                    <Separation/>
                    {paymentStatus === 1 ? this.renderSettleInfo1() : this.renderSettleInfo0()}
                    <BtnContent height={20}>
                        <Button txt={'自费支付'} onSubmit={() => alert('sss')}/>
                    </BtnContent>
                </SafeAreaView>
            </div>
        )
    }

    /**
     * 医保已经支付
     * @returns {*}
     */
    renderSettleInfo1() {
        const {pubPayAmt, siPayAmt, ownPayAmt, postPayBalance, totalAmt} = this.props.advanceSettleInfo
        return (
            <PayInfoContent>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>统筹支付</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(pubPayAmt) != 'undefined' ? pubPayAmt.toFixed(2) : ''}</span>
                        <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>账户支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(siPayAmt) != 'undefined' ? siPayAmt.toFixed(2) : ''}</span>
                        <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                        <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                        <span style={{
                            marginLeft: '10px',
                            fontSize: '10px',
                            color: '#737373'
                        }}>{(typeof(postPayBalance) != 'undefined' ? postPayBalance.toFixed(2) : '')}</span>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>自费支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(ownPayAmt) != 'undefined' ? ownPayAmt.toFixed(2) : ''}</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
            </PayInfoContent>
        )
    }

    /**
     * 医保未支付
     * @returns {*}
     */
    renderSettleInfo0() {
        const {pubPayAmt, siPayAmt, ownPayAmt, prePayBalance, totalAmt} = this.props.advanceSettleInfo
        let show = false
        if (typeof(ownPayAmt) != 'undefined' && typeof(totalAmt) != 'undefined' && ownPayAmt === totalAmt) {
            show = true
        }
        return (
            <PayInfoContent>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>统筹支付</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(pubPayAmt) != 'undefined' ? pubPayAmt.toFixed(2) : ''}</span>
                        {show ? <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span> : null}
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>账户支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(siPayAmt) != 'undefined' ? siPayAmt.toFixed(2) : ''}</span>
                        {show ? <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span> : null}
                    </div>
                    <div className={'infoRow_item_right'}>
                        <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                        <span style={{
                            marginLeft: '10px',
                            fontSize: '10px',
                            color: '#737373'
                        }}>{(typeof(prePayBalance) != 'undefined' ? prePayBalance.toFixed(2) : '')}</span>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>自费支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof(ownPayAmt) != 'undefined' ? ownPayAmt.toFixed(2) : ''}</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
            </PayInfoContent>
        )
    }

    componentDidMount() {
        /**
         *  显示条件：从我的订单、挂号详情
         * siPayf      = _hisRegister.payCost;//医保
         pubPayf     = _hisRegister.pubCost;//统筹
         ownPayf     = _hisRegister.ownCost;//自费
         totalPayf   = _hisRegister.regFee;//总金额
         */

        const {unifiedOrderId, paymentStatus} = this.props.location.state
        if (paymentStatus === 0) {
            //paymentStatus === 0 未支付
            //预结算
            this.props.advanceSettlementActions.loadAdvanceSettleInfo('register', unifiedOrderId)
        } else {
            //已支付
            //查询账户余额
            const {unifiedOrderId, payCost, ownCos, pubCost, regFee} = this.props.location.state
        }


        // document.getElementById('AdvanceSettlementContainer').addEventListener("touchstart", (event) => {
        //     event.preventDefault();
        // }, {
        //     passive: false //  禁止 passive 效果
        // })
    }

    handleBack = () => {
        this.props.history.goBack()
    }
}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        advanceSettleInfo: getAdvanceSttle(state),
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        advanceSettlementActions: bindActionCreators(advanceSettlementActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSettlementContainer)