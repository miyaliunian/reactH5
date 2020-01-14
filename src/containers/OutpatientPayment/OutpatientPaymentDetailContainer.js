/**
 * 门诊缴费详情 By Cy 2020/01/13
 */
import React, {Component} from 'react'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Switch} from 'antd-mobile'
import LoadingMask from '../../components/Loading/LoadingMask'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import {
    actions as outpatientPaymentDetailActions,
    getFetchingStatus,
    getDetail
} from '@reduxs/modules/outpatientPaymentDetail'

const IntelligentWaitingRefreshTime = {
    time: 60000 // 刷新时间一分钟，单位为毫秒
}

class OutpatientPaymentDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnChecked: false
        };
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.bindCardList !== this.props.bindCardList) {
        //   let perObj = nextProps.bindCardList.filter(item => item.isSel)
        //   this.props.bindCardActions.loadingWaitingListByPerson(perObj[0])
        // }
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        console.log('000000000000000000000')
        console.group(this.props)
        const {reservationEntity, reservationName, reservationCode} = this.props.location.state
        const {familyList, hospitalList, fetchingStatus, recentHopsitalList, selHospital} = this.props
        console.log('OutpatientPaymentContainer render this.props')
        console.group(this.props)
        return (
            <SafeAreaView showBar={true} title={'门诊缴费详情'} isRight={false} handleBack={this.handleBack}>
                <div className={'outpatientPaymentDetail-distance'}></div>
                <div className={'outpatientPaymentDetail-content'}>
                    <div className={'outpatientPaymentDetail-part1'}>
                        <div className={'outpatientPaymentDetail-part1-header border-bottom'}>
                            <div className={'outpatientPaymentDetail-part1-header-name'}>耿昌健</div>
                            <div className={'outpatientPaymentDetail-part1-header-status'}>待支付</div>
                        </div>
                        <div className={'outpatientPaymentDetail-part1-content border-topbottom'}>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>就诊医院</div>
                                <div className={'outpatientPaymentDetail-part1-content-item-value'}>解放军联勤保障部队第九零四医院
                                </div>
                            </div>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>科室</div>
                                <div className={'outpatientPaymentDetail-part1-content-item-value'}>呼吸内科门诊</div>
                            </div>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>医生</div>
                                <div className={'outpatientPaymentDetail-part1-content-item-value'}>谭雪贤</div>
                            </div>
                        </div>
                    </div>
                    <div className={'outpatientPaymentDetail-distance'}></div>
                    <div className={'outpatientPaymentDetail-part2 border-topbottom'}>
                        <div className={'outpatientPaymentDetail-part2-header border-bottom'}>缴费项目</div>
                        <ul className={'outpatientPaymentDetail-part2-items'}>
                            <li className={'outpatientPaymentDetail-part2-item border-bottom'}>
                                <div className={'outpatientPaymentDetail-part2-item-txt'}>高敏感C-反应蛋白测定×1</div>
                                <div className={'outpatientPaymentDetail-part2-item-price'}>￥35.00</div>
                            </li>
                        </ul>
                        <div className={'outpatientPaymentDetail-part2-footer'}>
                            <div className={'outpatientPaymentDetail-part2-footer-txt'}>使用医保支付</div>
                            <div className={'outpatientPaymentDetail-part2-footer-btn'}>
                                <Switch className={'outpatientPaymentDetail-part2-footer-btn-switch'}
                                        checked={this.state.btnChecked}
                                        onClick={() => {
                                            // set new value
                                            this.setState({
                                                btnChecked: !this.state.btnChecked
                                            })
                                        }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'outpatientPaymentDetail-part3'}>
                    <div className={'outpatientPaymentDetail-part3-fee'}>
                        <div className={'outpatientPaymentDetail-part3-fee-txt'}>费用总额：</div>
                        <div className={'outpatientPaymentDetail-part3-fee-cost'}>￥35.00</div>
                    </div>
                    <div className={'outpatientPaymentDetail-part3-btn'}>去结算</div>
                </div>
                <LoadingMask/>
            </SafeAreaView>
        )
    }


    // componentDidMount() {
    //   this.props.bindCardActions.loadWaitingList();
    //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
    //   this.timer = setInterval(
    //     () => this.timeToRefresh(),
    //     IntelligentWaitingRefreshTime.time
    //   );
    // }

    componentDidMount() {
        const {history} = this.props
        const {outpatientPaymentId} = this.props.location.state
        if (history.action === 'PUSH') {
            this.props.outpatientPaymentDetailActions.loadDetailById(outpatientPaymentId)
        }
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
        // familyList: getFamilyList(state),
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
