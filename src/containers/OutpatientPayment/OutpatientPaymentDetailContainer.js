/**
 * 门诊缴费详情 By Cy 2020/01/13
 */
import React, {Component} from 'react'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IOSSwitch} from "@components/IOSSwitch/IOSSwitch";
import LoadingMask from '../../components/Loading/LoadingMask'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import {
    actions as outpatientPaymentDetailActions,
    getDetail
} from '@reduxs/modules/outpatientPaymentDetail'

const IntelligentWaitingRefreshTime = {
    time: 60000 // 刷新时间一分钟，单位为毫秒
}

class OutpatientPaymentDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnChecked: true,
            detail: {}
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
        const {detail} = this.props.location.state
        const {reservationEntity, reservationName, reservationCode} = this.props.location.state
        console.log('OutpatientPaymentDetailContainer render this.props')
        console.group(this.props)
        return (
            <SafeAreaView showBar={true} title={'门诊缴费详情'} isRight={false} handleBack={this.handleBack}>
                <div className={'outpatientPaymentDetail-distance'}></div>
                <div className={'outpatientPaymentDetail-content'}>
                    <div className={'outpatientPaymentDetail-part1'}>
                        <div className={'outpatientPaymentDetail-part1-header border-bottom'}>
                            <div className={'outpatientPaymentDetail-part1-header-name'}>{detail.patientName}</div>
                            <div
                                className={'outpatientPaymentDetail-part1-header-status'}>{this.paymentStatus2Str(detail.paymentStatus)}</div>
                        </div>
                        <div className={'outpatientPaymentDetail-part1-content border-topbottom'}>
                            <div className={'outpatientPaymentDetail-part1-content-item'}>
                                <div className={'outpatientPaymentDetail-part1-content-item-key'}>就诊医院</div>
                                <div
                                    className={'outpatientPaymentDetail-part1-content-item-value'}>{detail.hospitalName}
                                </div>
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
                        </div>
                    </div>
                    <div className={'outpatientPaymentDetail-distance'}></div>
                    <div className={'outpatientPaymentDetail-part2 border-topbottom'}>
                        <div className={'outpatientPaymentDetail-part2-header border-bottom'}>缴费项目</div>
                        {/*{this.generatePaymentUl(detail.hisRecipeDetailList)}*/}
                        <ul className={'outpatientPaymentDetail-part2-items'}>
                            {this.generatePaymentUl()}
                            {/*<li className={'outpatientPaymentDetail-part2-item border-bottom'}>*/}
                            {/*    <div className={'outpatientPaymentDetail-part2-item-txt'}>{'补水针x1'}</div>*/}
                            {/*    <div className={'outpatientPaymentDetail-part2-item-price'}>￥35.00</div>*/}
                            {/*</li>*/}
                        </ul>
                        <div className={'outpatientPaymentDetail-part2-footer border-top'}>
                            <div className={'outpatientPaymentDetail-part2-footer-txt'}>使用医保支付</div>
                            <div className={'outpatientPaymentDetail-part2-footer-btn'}>
                                <div
                                    style={{flex: 1, justifyContent: "flex-end", display: "flex"}}
                                >
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
                                {/*<List>*/}
                                {/*<Switch*/}
                                {/*        checked={this.state.btnChecked}*/}
                                {/*        onClick={() => {*/}
                                {/*            // set new value*/}
                                {/*            this.setState({*/}
                                {/*                btnChecked: !this.state.btnChecked*/}
                                {/*            })*/}
                                {/*        }}*/}
                                {/*/>*/}
                                {/*</List>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'outpatientPaymentDetail-part3'}>
                    <div className={'outpatientPaymentDetail-part3-fee'}>
                        <div className={'outpatientPaymentDetail-part3-fee-txt'}>费用总额：</div>
                        <div className={'outpatientPaymentDetail-part3-fee-cost'}>{'￥' + detail.totCost}</div>
                    </div>
                    <div onClick={()=>this.onSubmit()} className={'outpatientPaymentDetail-part3-btn'}>去结算</div>
                </div>
                <LoadingMask/>
            </SafeAreaView>
        )
    }


    onSubmit() {
        const {
            outpatientPaymentDetailActions: { onSubmit },
            history,
            detail
        } = this.props
        const {defaultPerson, selHospital} = this.props.location.state
        onSubmit(detail,defaultPerson,selHospital, { ...history })
    }

    // componentDidMount() {
    //   this.props.bindCardActions.loadWaitingList();
    //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
    //   this.timer = setInterval(
    //     () => this.timeToRefresh(),
    //     IntelligentWaitingRefreshTime.time
    //   );
    // }
    paymentStatus2Str(status) {
        switch (status) {
            case 0:
                return '未支付';
            case 1:
                return '部分支付';
            case 2:
                return '已支付';
            case 3:
                return '已支付';
            case 4:
                return '部分退款';
            case 5:
                return '已退款';
            case 6:
                return '已退款';
            default:
                return '未知';
        }
    }

    generatePaymentUl() {
        const {detail} = this.props.location.state
        if (detail && detail.hisRecipeDetailList) {
            let items = detail.hisRecipeDetailList;
            return (
                items.map(item => {
                    return this.generatePaymentDetailLi(item);
                })
            )
        }
    }

    generatePaymentDetailLi(item) {
        return (<li className={'outpatientPaymentDetail-part2-item'}>
            <div className={'outpatientPaymentDetail-part2-item-txt'}>
                {item.itemName + 'x' + item.qty}
            </div>
            <div className={'outpatientPaymentDetail-part2-item-price'}>
                {'￥' + item.totCost}
            </div>
        </li>);
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
        };
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
        detail: getDetail(state),
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
