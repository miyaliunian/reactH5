/**
 * 订单列表:门诊缴费详情 By WF 2020/01/13
 *
 */
import React, {Component} from 'react'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IOSSwitch} from '@components/IOSSwitch/IOSSwitch'
import LoadingMask from '../../components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import {actions as outpatientPaymentDetailActions, getDetail} from '@reduxs/modules/outpatientPaymentDetail'

class OutpatientPaymentDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnChecked: true,
            detail: {}
        }
    }


    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {detail} = this.props.location.state
        const {reservationEntity, reservationName, reservationCode} = this.props.location.state
        let statusLabel = '';
        let showPayBtn = false //结算按钮是否显示
        let showPayItem = false // 是否显示医保支付滑块
        let statusStyle = {color: '#0084ff'}
        //订单状态：0.未完成  1.完成(通知医院支付成功) 2.取消(用户主动取消、超期）
        const {balStatus, paymentMethod, paymentStatus} = detail
        //switch 滑块状态
        let isChooseMedicare = false
        let useMedicarePay = false
        if (paymentMethod) {
            isChooseMedicare = true
            useMedicarePay = true
        }
        switch (balStatus) { //  getBalStatus 订单状态
            case 0:
                //支付状态：0未支付，1部分支付(混合情况)，2已支付待确认(支付宝)，3已支付，4部分退款(医保已退，支付宝未退) 5已退款
                if (paymentMethod == 0) {
                    //线下支付
                    statusLabel = '支付成功'
                } else {
                    //线上支付
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (paymentStatus) {
                        case 0:
                        case 1:
                            statusLabel = '待支付'
                            showPayBtn = true
                            showPayItem = true
                            break
                        case 2:
                            //支付确认中(第三方支付)
                            statusLabel = '支付确认中'
                            break
                        case 3:
                            //已支付
                            statusLabel = '已支付'
                            break
                        case 4://部分退款
                        case 5://已退款待确认(第三方发送退费申请)
                            statusLabel = '退款中'
                            statusStyle = {color: '#686868'}
                            break
                        case 6://已退款
                            statusLabel = '已退款'
                            statusStyle = {color: '#686868'}
                            showPayBtn = false
                            showPayItem = false
                            break
                        default:
                            break
                    }
                }
                break
            case 1:
                //支付完成
                statusLabel = '已完成'
                showPayBtn = false
                showPayItem = false
                break
            case 2:
                //取消、超期
                statusStyle = {color: '#686868'}
                statusLabel = '已取消'
                showPayBtn = false
                showPayItem = false
                //线上支付
                //支付状态为：0未支付、1部分支付；显示支付按钮
                switch (paymentStatus) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break
                    case 4://部分退款
                    case 5:
                        //已退款待确认(第三方发送退费申请)
                        statusLabel = '退款中'
                        break
                    case 6:
                        statusLabel = '已退款'
                        break
                    default:
                        break
                }
                break
            default:
                break
        }
        return (
            <SafeAreaView showBar={true} title={'门诊缴费详情'} isRight={false} handleBack={this.handleBack}>
                <div className={'outpatientPaymentDetail-distance'}></div>
                <div className={'outpatientPaymentDetail-content'}>
                    <div className={'outpatientPaymentDetail-part1 border-bottom'}>
                        <div className={'outpatientPaymentDetail-part1-header'}>
                            <div className={'outpatientPaymentDetail-part1-header-name'}>{detail.patientName}</div>
                            <div className={'outpatientPaymentDetail-part1-header-status'}>
                                {this.paymentStatus2Str(detail)}
                            </div>
                        </div>
                        <div className={'outpatientPaymentDetail-part1-content border-topbottom'}>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>单据号</div>
                                <div
                                    className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.siBillNo}</div>
                            </div>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>就诊医院</div>
                                <div
                                    className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.hospitalName}</div>
                            </div>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>科室</div>
                                <div
                                    className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.deptName}</div>
                            </div>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>医生</div>
                                <div
                                    className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.doctName}</div>
                            </div>
                            {/*订单取消状态下  不显示统筹、账户、现金支出*/}
                            {statusLabel == '已取消' ? <div/> :
                                <div>
                                    <div className={'outpatientPaymentDetail-part1-content-item'}>
                                        <div className={'outpatientPaymentDetail-part1-content-item-key'}>统筹</div>
                                        <div
                                            className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.pubCost !== '' || detail.pubCost !== null ? `￥${detail.pubCost.toFixed(2)}` : '0.00'}</div>
                                    </div>
                                    <div className={'outpatientPaymentDetail-part1-content-item'}>
                                        <div className={'outpatientPaymentDetail-part1-content-item-key'}>账户</div>
                                        <div
                                            className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.payCost !== '' || detail.payCost !== null ? `￥${detail.payCost.toFixed(2)}` : '0.00'}</div>
                                    </div>
                                    <div className={'outpatientPaymentDetail-part1-content-item'}>
                                        <div className={'outpatientPaymentDetail-part1-content-item-key'}>现金</div>
                                        <div
                                            className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.ownCost !== '' || detail.ownCost !== null ? `￥${detail.ownCost.toFixed(2)}` : '0.00'}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={'outpatientPaymentDetail-distance'}></div>
                    <div className={'outpatientPaymentDetail-part2 border-topbottom'}>
                        <div className={'outpatientPaymentDetail-part2-header border-bottom'}>缴费项目：</div>
                        <ul className={'outpatientPaymentDetail-part2-items'}>
                            {this.generatePaymentUl()}
                        </ul>
                        {/*是否显示医保支付 滑块*/}
                        {showPayItem ?
                            <div className={'outpatientPaymentDetail-part2-footer border-top'}>
                                <div className={'outpatientPaymentDetail-part2-footer-txt'}>使用医保支付</div>
                                <div className={'outpatientPaymentDetail-part2-footer-btn'}>
                                    <div style={{flex: 1, justifyContent: 'flex-end', display: 'flex'}}>
                                        <IOSSwitch
                                            // disabled = {true}
                                            checked={this.state.btnChecked}
                                            onChange={() => {
                                                this.setState({
                                                    btnChecked: !this.state.btnChecked
                                                })
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                            : <div/>
                        }
                    </div>
                </div>
                {this.generatePart3()}
                <LoadingMask/>
            </SafeAreaView>
        )
    }

    onSubmit() {
        const {
            outpatientPaymentDetailActions: {onSubmit},
            history
        } = this.props
        const {detail, defaultPerson, selHospital} = this.props.location.state
        onSubmit(detail, defaultPerson, selHospital, {...history})
    }

    // 订单状态
    paymentStatus2Str(balanceItem) {
        let statusLabel = '';
        let showPayBtn = false //结算按钮是否显示
        let showPayItem = false
        let statusStyle = {color: '#0084ff'}
        //订单状态：0.未完成  1.完成(通知医院支付成功) 2.取消(用户主动取消、超期）
        const {balStatus, paymentMethod, paymentStatus} = balanceItem
        //switch 滑块状态
        let isChooseMedicare = false
        let useMedicarePay = false
        if (paymentMethod) {
            isChooseMedicare = true
            useMedicarePay = true
        }
        switch (balStatus) { //  getBalStatus 订单状态
            case 0:
                //支付状态：0未支付，1部分支付(混合情况)，2已支付待确认(支付宝)，3已支付，4部分退款(医保已退，支付宝未退) 5已退款
                if (paymentMethod == 0) {
                    //线下支付
                    statusLabel = '支付成功'
                } else {
                    //线上支付
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (paymentStatus) {
                        case 0:
                        case 1:
                            statusLabel = '待支付'
                            showPayBtn = true
                            showPayItem = true
                            break
                        case 2:
                            //支付确认中(第三方支付)
                            statusLabel = '支付确认中'
                            break
                        case 3:
                            //已支付
                            statusLabel = '已支付'
                            break
                        case 4://部分退款
                        case 5://已退款待确认(第三方发送退费申请)
                            statusLabel = '退款中'
                            statusStyle = {color: '#686868'}
                            break
                        case 6://已退款
                            statusLabel = '已退款'
                            statusStyle = {color: '#686868'}
                            showPayBtn = false
                            showPayItem = false
                            break
                        default:
                            break
                    }
                }
                break
            case 1:
                //支付完成
                statusLabel = '已完成'
                showPayBtn = false
                showPayItem = false
                break
            case 2:
                //取消、超期
                statusStyle = {color: '#686868'}
                statusLabel = '已取消'
                showPayBtn = false
                showPayItem = false
                //线上支付
                //支付状态为：0未支付、1部分支付；显示支付按钮
                switch (paymentStatus) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break
                    case 4://部分退款
                    case 5:
                        //已退款待确认(第三方发送退费申请)
                        statusLabel = '退款中'
                        break
                    case 6:
                        statusLabel = '已退款'
                        break
                    default:
                        break
                }
                break
            default:
                break
        }
        return (
            <div style={statusStyle}>
                {statusLabel}
            </div>
        )
    }

    generatePaymentUl() {
        const {detail} = this.props.location.state
        if (detail && detail.hisRecipeDetailList) {
            let items = detail.hisRecipeDetailList
            return items.map(item => {
                return this.generatePaymentDetailLi(item)
            })
        }
    }

    generatePaymentDetailLi(item) {
        return (
            <li className={'outpatientPaymentDetail-part2-item'}>
                <div className={'outpatientPaymentDetail-part2-item-txt'}>{item.itemName + 'x' + item.qty}</div>
                <div
                    className={'outpatientPaymentDetail-part2-item-price'}>{item.totCost !== '' || item.totCost !== null ? '￥' + item.totCost.toFixed(2) : '0.00'}</div>
            </li>
        )
    }


    /**
     * 根据调解，生成part3金额和去结算按钮区域
     * @returns {*}
     */
    generatePart3() {
        const {detail} = this.props.location.state
        let showPay = false;
        //订单状态：0.未完成  1.完成(通知医院支付成功) 2.取消(用户主动取消、超期）
        switch (detail.balStatus) { //  getBalStatus 订单状态
            case 0:
                //支付状态：0未支付，1部分支付(混合情况)，2已支付待确认(支付宝)，3已支付，4部分退款(医保已退，支付宝未退) 5已退款
                if (detail.paymentMethod == 0) {
                    //线下支付
                    showPay = true;
                } else {
                    //线上支付
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (detail.paymentStatus) {
                        case 0:
                            showPay = true;
                            break;
                        case 1:
                            showPay = true;
                            break;
                        case 2:
                            break;
                        case 3:
                            break;
                        case 4://部分退款
                            break;
                        case 5://已退款待确认(第三方发送退费申请)
                            break;
                        case 6://已退款
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 1:
                //支付完成
                break;
            case 2:
                //取消、超期
                break;
            default:
                break;
        }
        return (
            <div className={'outpatientPaymentDetail-part3'}>
                        <div className={'outpatientPaymentDetail-part3-fee'}>
                            <div className={'outpatientPaymentDetail-part3-fee-txt'}>费用总额:</div>
                            <div
                                className={'outpatientPaymentDetail-part3-fee-cost'}>{detail.totCost !== '' || detail.totCost !== null ? '￥' + detail.totCost.toFixed(2) : '0.00'}</div>
                        </div>
                {
                    (showPay) ?
                        <div onClick={() => this.onSubmit()} className={'outpatientPaymentDetail-part3-btn'}>
                            去结算
                        </div> : ''
                }
            </div>);
    }

    /**
     * 转向预结算页
     */
    gotoPreSiPay() {
        let path = {
            // pathname: "/advanceSettlementContainer",
            // state: {
            //     reservationName: typeEntity.name, //确认预约
            //     reservationCode: typeEntity.code, //确认预约
            //     reservationEntity: reservationEntity, //预约实体
            //     paymentMethod: reservationEntity.paymentMethod, //支付方式
            //     from: resObj.fromTarget
            // }
        }
    }

    componentDidMount() {
        const {history} = this.props
        // if (history.action === 'PUSH') {
        //     this.props.outpatientPaymentDetailActions.loadDetailById(outpatientPaymentId)
        // }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer && clearTimeout(this.timer)
    }

    //下拉刷新
    pullingDownHandler() {
        // this.getWaitingListByPerson()
    }

    //定时执行刷新
    timeToRefresh() {
        // this.getWaitingListByPerson()
    }

    handleTouchMove(event) {
    }

    //
}

const mapStateToProps = state => {
    return {
        detail: getDetail(state)
        // hospitalList: getHospitalList(state),
        // fetchingStatus: getFetchingStatus(state),
        // defaultPerson: getDefaultPerson(state),
        // recentHopsitalList: getRecentHospitalList(state),
        // selHospital: getSelHospital(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        outpatientPaymentDetailActions: bindActionCreators(outpatientPaymentDetailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutpatientPaymentDetailContainer)
