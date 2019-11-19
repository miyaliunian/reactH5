/**
 * Class: AdvanceSettlementContainer
 * Author: wufei
 * Date: 2019/8/28
 * Description:
 *  订单预结算
 *   自费 从来不显示 [已支付]
 *  paymentStatus  === 1(医保已支付) 账号、统筹 均显示[已支付]  ： paymentStatus  === 0(医保未支付) 账号、统筹均不显示[已支付]
 *  paymentStatus ===0   账户余额:prePayBalance
 *  paymentStatus ===1   账户余额:postPayBalance
 *  ownPayAmt  ==  总金额(纯自费)  账号、统筹 均显示[已支付]
 *
 *  按钮显示
 *      totalAmt === 0  按钮标题：[医保支付 totalAmt元]  点击 跳转 ->医保支付页面
 *
 *    （ownPayAmt === totalAmt）  自费支付 totalAmt元  点击 跳转 -> 第三方支付页面
 *    （ownPayAmt != totalAmt）  （ paymentStatus === 0   医保支付 siPayAmt元  点击 跳转 -> 医保支付页面） ： （ paymentStatus === 1   自费支付 ownPayAmt元  点击 跳转 -> 第三方支付页面）
 *
 */
import React, {Component} from 'react'
import ico_user from '@images/Home/ico_user.png'
import ButtonWrapper from "@baseUI/Button/PrimaryButton";
import {PayStatusContent, PerContent, SettleInfoContent, InfoRow, Separation, PayInfoContent, BtnContent} from './style'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import SlideDownSnackBar from "@components/SlideDownSnackBar/SlideDownSnackBar";
import LoadingMask from "@components/Loading/LoadingMask";
//图标
import icon_pay from '@images/Pay/radio_b.png';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getPaymentStatus,
    getFetchingStatus,
    getAdvanceSttle,
    getPerInfo,
    getBtnDisable,
    actions as advanceSettlementActions
} from "@reduxs/modules/advanceSettlement";



class AdvanceSettlementContainer extends Component {

    state = {
        showBar: false
    }

    render() {
        const {reservationEntity, reservationName, reservationCode} = this.props.location.state
        const {paymentStatus, fetchingStatus} = this.props
        return (
            <div id={'AdvanceSettlementContainer'} style={{height: '100vh', width: '100%', position: 'fixed'}}>
                <SafeAreaView showBar={true} title={'订单预结算'} isRight={false} handleBack={() => this.handleBack()}>
                    <PayStatusContent show={paymentStatus === 1 ? true : false}>
                        <img src={icon_pay} alt='' className={'hospitalsItem__middle__icon'}/>
                        <span>医保支付成功,请继续完成自费支付</span>
                    </PayStatusContent>
                    <PerContent>
                        <img src={ico_user} className={'bindCard__icon'} width={'35px'} height={'35px'}/>
                        <span style={{marginLeft: '10px', fontSize: '20px'}}>{reservationEntity.patientName}</span>
                    </PerContent>
                    <SettleInfoContent>
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>订单号</span>
                            <span>{reservationEntity.sn}</span>
                        </InfoRow>
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>商品名称</span>
                            <span>{reservationName}</span>
                        </InfoRow>
                        {/*线上预约:regFree、门诊缴费:totCost*/}
                        <InfoRow showBorder={false}>
                            <span style={{color: '#737373', fontSize: '17px'}}>总金额</span>
                            <span style={{
                                color: 'orange',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>￥{reservationEntity.regFee.toFixed(2)}</span>
                        </InfoRow>
                    </SettleInfoContent>
                    <Separation/>
                    {paymentStatus === 1 ? this.renderSettleInfo1() : this.renderSettleInfo0()}
                    {this.renderBtnTitle()}
                </SafeAreaView>
                <LoadingMask/>
                <SlideDownSnackBar desc={'医保账户或个人自费费用尚未完成支付，系统将在20分钟后自动进行退费'} show={this.state.showBar}
                                   handleClose={() => {
                                       const {history} = this.props
                                       history.replace('/');
                                   }}/>
            </div>
        )
    }

    /**
     * 医保已经支付
     * @returns {*}
     */
    renderSettleInfo1() {
        const {pubPayAmt, siPayAmt, ownPayAmt, postPayBalance} = this.props.advanceSettleInfo
        const {person, location} = this.props
        /**
         * //从我的订单进入，并且医保已经支付 账户余额 则用查询回来的值显示,如果是正常走流程进入则用postPayBalance显示账户余额
         * @type {boolean}
         */
        let showPerAccount = false
        if (location.state.from) {
            if (person != '') {
                showPerAccount = true

            }
        }
        return (
            <PayInfoContent>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>统筹支付</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (pubPayAmt) !== 'undefined' ? pubPayAmt.toFixed(2) : ''}</span>
                        <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>账户支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (siPayAmt) !== 'undefined' ? siPayAmt.toFixed(2) : ''}</span>
                        <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                        <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                        {person ?
                            //
                            <span style={{
                                marginLeft: '10px',
                                fontSize: '10px',
                                color: '#737373'
                            }}>{parseInt(person.account).toFixed(2)}</span>
                            :
                            <span style={{
                                marginLeft: '10px',
                                fontSize: '10px',
                                color: '#737373'
                            }}>{(typeof (postPayBalance) !== 'undefined' ? postPayBalance.toFixed(2) : '')}</span>
                        }
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>自费支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (ownPayAmt) !== 'undefined' ? ownPayAmt.toFixed(2) : ''}</span>
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
        if (typeof (ownPayAmt) !== 'undefined' && typeof (totalAmt) !== 'undefined' && ownPayAmt === totalAmt) {
            show = true
        }
        return (
            <PayInfoContent>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>统筹支付</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (pubPayAmt) !== 'undefined' ? pubPayAmt.toFixed(2) : ''}</span>
                        {show ? <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span> : null}
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>账户支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (siPayAmt) !== 'undefined' ? siPayAmt.toFixed(2) : ''}</span>
                        {show ? <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span> : null}
                    </div>
                    <div className={'infoRow_item_right'}>
                        <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                        <span style={{
                            marginLeft: '10px',
                            fontSize: '10px',
                            color: '#737373'
                        }}>{(typeof (prePayBalance) !== 'undefined' ? prePayBalance.toFixed(2) : '')}</span>
                    </div>
                </InfoRow>
                <InfoRow showBorder={true}>
                    <span className={'infoRow_item_title'}>自费支出</span>
                    <div className={'infoRow_item_middle'}>
                        <span>￥{typeof (ownPayAmt) !== 'undefined' ? ownPayAmt.toFixed(2) : ''}</span>
                    </div>
                    <div className={'infoRow_item_right'}>
                    </div>
                </InfoRow>
            </PayInfoContent>
        )
    }

    /**
     按钮标题显示
     *   totalAmt === 0  按钮标题：[医保支付 totalAmt元]  点击 跳转 ->医保支付页面
     *  （ownPayAmt === totalAmt）  自费支付 totalAmt元  点击 跳转 -> 第三方支付页面
     *  （ownPayAmt != totalAmt） （ paymentStatus === 0   医保支付 siPayAmt元  点击 跳转 -> 医保支付页面） ： （ paymentStatus === 1   自费支付 ownPayAmt元  点击 跳转 -> 第三方支付页面）
     *
     * @returns {*}
     */
    renderBtnTitle() {
        const {paymentStatus, btnDisable} = this.props
        const {siPayAmt, ownPayAmt, totalAmt} = this.props.advanceSettleInfo
        let titleStr = ''
        let targetUrl = ''
        if (typeof (totalAmt) !== 'undefined' && totalAmt === 0) {
            titleStr = `医保支付 ${totalAmt.toFixed(2)}元`
            targetUrl = '/medicarePayContainer'
        } else {
            if (typeof (ownPayAmt) !== 'undefined' && typeof (totalAmt) !== 'undefined' && ownPayAmt === totalAmt) {
                titleStr = `自费支付 ${totalAmt.toFixed(2)}元`
                targetUrl = '/thirdPayContainer'
            } else if (typeof (ownPayAmt) !== 'undefined' && typeof (totalAmt) !== 'undefined' && ownPayAmt !== totalAmt) {
                if (paymentStatus === 0) {
                    titleStr = `医保支付 ${siPayAmt.toFixed(2)}元`
                    targetUrl = '/medicarePayContainer'
                } else if (paymentStatus === 1) {
                    titleStr = `自费支付 ${ownPayAmt.toFixed(2)}元`
                    targetUrl = '/thirdPayContainer'
                }
            }
        }
        return (
            <BtnContent height={20}>
                <ButtonWrapper txt={titleStr} onSubmit={() => this.navPage(targetUrl)} disabled={btnDisable}/>
            </BtnContent>
        )
    }


    componentWillMount() {
        const {history,location} = this.props
        if (history.action === 'PUSH') {
            const {reservationEntity} = location.state
            this.props.advanceSettlementActions.setPaymentStatus(reservationEntity.paymentStatus)
        }
    }

    componentDidMount() {
        /**
         *  显示条件：从我的订单、挂号详情
         * siPayf      = _hisRegister.payCost;//医保
         pubPayf     = _hisRegister.pubCost;//统筹
         ownPayf     = _hisRegister.ownCost;//自费
         totalPayf   = _hisRegister.regFee;//总金额
         */
        const {history, advanceSettlementActions: {loadPersonAndAdvanceSettleInfo, setAdvanceSettleInfoANdLoadPerson}} = this.props
        if (history.action === 'PUSH') {
            const {reservationEntity, reservationCode} = this.props.location.state
            if (reservationEntity.paymentStatus === 0) {
                //预结算(混合支付)
                loadPersonAndAdvanceSettleInfo(reservationCode, reservationEntity.unifiedOrderId, reservationEntity.patientId)
            } else {
                //医保已经支付
                setAdvanceSettleInfoANdLoadPerson(reservationEntity, reservationEntity.patientId)
            }
        }
    }

    componentWillUnmount() {
        //重置登录按钮状态
        this.props.advanceSettlementActions.resetBtnStatus()

    }

    handleBack() {
        // Toast.loading('医保账户或个人自费费用尚未完成支付，系统将在20分钟后自动进行退费', 3, () => {
        //     const {history} = this.props
        //     history.replace('/');
        // }, true);
        this.setState({
            showBar: true
        })
    }


    handleClose() {
        console.log('handleClose')
    }

    navPage(targetUrl) {
        let path = {
            pathname: targetUrl,
            state: {
                person: this.props.person,
                orderPayment: this.props.advanceSettleInfo,
                ObjEntity: this.props.location.state.reservationEntity,
                reservationName: this.props.location.state.reservationName,
                paymentMethod: this.props.location.state.paymentMethod,
                reservationCode: this.props.location.state.reservationCode,
            },
            callBack: (data) => this.callBack(data)
        }
        this.props.history.push(path)
    }

    callBack(data) {
        this.props.advanceSettlementActions.setPaymentStatus(data.paymentStatus)
    }

}


const
    mapStateToProps = (state) => {
        return {
            paymentStatus: getPaymentStatus(state),
            fetchingStatus: getFetchingStatus(state),
            advanceSettleInfo: getAdvanceSttle(state),
            person: getPerInfo(state),
            btnDisable: getBtnDisable(state)
        }
    }


const
    mapDispatchToProps = (dispatch) => {
        return {
            advanceSettlementActions: bindActionCreators(advanceSettlementActions, dispatch)
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)

(
    AdvanceSettlementContainer
)
