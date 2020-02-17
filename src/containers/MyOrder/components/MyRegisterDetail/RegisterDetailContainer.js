/**
 * 预约挂号详情 By Cy 2020/02/07
 */
import React, {Component} from 'react'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoadingMask from '../../../../components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import {actions as registerDetailActions, getDetail} from '@reduxs/modules/registerDetail'
import ico_clinic_pay_item from '@assets/images/OutpatientPayment/ico_clinic_pay_item.png'
import classnames from 'classnames'

const IntelligentWaitingRefreshTime = {
    time: 60000 // 刷新时间一分钟，单位为毫秒
}

class RegisterDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnChecked: true,
            detail: {}
        }
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
        const {detail} = this.props.location.state
        console.log('RegisterDetailContainer render this.props')
        console.group(this.props)
        return (
            <SafeAreaView showBar={true} title={'预约详情'} isRight={false} handleBack={this.handleBack}>
                <div className={'registerDetail-part1 border-topbottom'}>
                    <div className={'registerDetail-part1-key'}>订单状态</div>
                    {this.generatePaymentStatusPart()}
                </div>
                <div className={'registerDetail-part2 border-bottom'}>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>就诊医院</div>
                        <div className={'registerDetail-part2-item-value'}>{detail.hosName}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>就诊科室</div>
                        <div className={'registerDetail-part2-item-value'}>{detail.deptName}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>就诊医生</div>
                        <div className={'registerDetail-part2-item-value'}>{detail.doctName}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>就诊时间</div>
                        <div className={'registerDetail-part2-item-value'}>{this.generateSeeDateStr1()}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}></div>
                        <div className={'registerDetail-part2-item-value'}>{this.generateSeeDateStr2()}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>就诊序号</div>
                        <div className={'registerDetail-part2-item-value'}>{detail.seeNo}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>门诊类型</div>
                        <div className={'registerDetail-part2-item-value'}>{detail.reglevlName}</div>
                    </div>
                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>挂号费用</div>
                        <div className={'registerDetail-part2-item-value-money'}>{'￥'+this.feeValuator(detail.regFee)}</div>
                    </div>
                </div>
                <div className={'registerDetail-distance'}></div>
                <div className={'registerDetail-part3 border-top'}>
                    <div className={'registerDetail-part3-item border-bottom'}>
                        <div className={'registerDetail-part3-item-key'}>就诊人</div>
                        <div className={'registerDetail-part3-item-value'}>{detail.patientName}</div>
                    </div>
                    <div className={'registerDetail-part3-item border-bottom'}>
                        <div className={'registerDetail-part3-item-key'}>初/复诊</div>
                        <div className={'registerDetail-part3-item-value'}>{this.first2Str(detail.first)}</div>
                    </div>
                    <div className={'registerDetail-part3-item border-bottom'}>
                        <div className={'registerDetail-part3-item-key'}>医疗类别</div>
                        <div className={'registerDetail-part3-item-value'}>{detail.reglevlName}</div>
                    </div>
                    <div className={'registerDetail-part3-item border-bottom'}>
                        <div className={'registerDetail-part3-item-key'}>疾病信息</div>
                        <div className={'registerDetail-part3-item-value'}>{this.diseaseValuator(detail.diagName)}</div>
                    </div>
                </div>
                <div className={'registerDetail-part4'}>
                    <div className={'registerDetail-part4-title'}>
                        <img src={ico_clinic_pay_item} className={'registerDetail-part4-title-img'}/>
                        <div className={'registerDetail-part4-title-txt'}>温馨提示 :</div>
                    </div>
                    <div className={'registerDetail-part4-content'}>
                        挂号过程中如遇特殊情况不能正常就医，请按医院的相关管理流程执行。
                    </div>
                    <div
                        className={classnames('registerDetail-part4-content', {hidden: (detail.hosResponse ? false : true)})}>
                        {detail.hosResponse}
                    </div>
                </div>
                {this.generatePart5()}
                <div className={'registerDetail-part6'}>
                    <div className={'registerDetail-part6-fee'}>
                        <div className={'registerDetail-part6-fee-txt'}>费用总额：</div>
                        <div className={'registerDetail-part6-fee-cost'}>{'￥' + this.feeValuator(detail.regFee)}</div>
                    </div>
                </div>
                <LoadingMask/>
            </SafeAreaView>
        )
    }

    /**
     * 去支付
     */
    register2Pay = () => {
        console.log("1111111111111111111111118")
        console.group(this.props)
        const {
            registerDetailActions: {register2SiPrePay},
            history,
            location
        } = this.props
        register2SiPrePay(location.state.detail, {...history})
        // register2SiPrePay()
    }

    /**
     * 取消预约
     */
    goCancelReg = () => {
        console.log("1111111111111111111111119")
        console.group(this.props)
        const {
            registerDetailActions: {cancelReg},
            history,
            location
        } = this.props
        cancelReg(location.state.detail.id, {...history})
    }

    /**
     * 根据detail的seenDate，生成指定格式的预约时间：XXXX年XX月XX日 星期X 上午 9:00-12:00
     * @param mis
     */
    generateSeeDateStr1() {
        const {detail} = this.props.location.state
        let tarTime = new Date(detail.seenDate);
        // let year = curTime.getFullYear();
        // let month = String(curTime.getMonth() + 1).padStart(2,"0");
        // let day = String(curTime.getDate()).padStart(2,"0");
        let year = tarTime.getFullYear();
        let month = tarTime.getMonth() + 1;
        let day = tarTime.getDate();
        let week = tarTime.getDay();
        month = month <= 9 ? "0" + month : month;
        day = day <= 9 ? "0" + day : day;
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return year + '年' + month + '月' + day + '日 ' + weekday[week] + ' '+detail.noon;
    }
    generateSeeDateStr2() {
        const {detail} = this.props.location.state
        return detail.beginTime + '-' + detail.endTime;
    }


    /**
     * 根据detail的seenDate，生成指定格式的预约时间：XXXX年XX月XX日9:00-12:00
     * @param mis
     */
    // generateSeeDateStr2() {
    //     const {detail} = this.props.location.state
    //     let tarTime = new Date(detail.seenDate);
    //     let year = tarTime.getFullYear();
    //     let month = tarTime.getMonth() + 1;
    //     let day = tarTime.getDate();
    //     month = month <= 9 ? "0" + month : month;
    //     day = day <= 9 ? "0" + day : day;
    //     return year + '年' + month + '月' + day + '日' + detail.beginTime + '-' + detail.endTime;
    // }

    /**
     * 生成缴费状态部分的元素
     * @returns {*}
     */
    generatePaymentStatusPart() {
        const {detail} = this.props.location.state
        let choice=3;//未知
        switch (detail.regStatus) {
            case 0:
                //线下支付
                if (detail.paymentMethod == 0) {
                    choice=1;//已支付
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (detail.paymentStatus) {
                        case 0:
                            choice=0;//待支付
                            break;
                        case 1:
                            choice=0;//待支付
                            break
                        case 2://支付确认中
                            choice=1;//已支付
                            break
                        case 3://已支付
                            choice=1;//已支付
                            break
                        case 4://部分退款
                            choice=2;//已退款
                        case 5://已退款待确认(第三方发送退费申请)
                            choice=2;//已退款
                            break
                        case 6:
                            choice=2;//已退款
                            break
                    }
                }
                break
            case 1:
                choice=1;//已支付
                break
            case 2:
                //取消
                choice=2;//已退款
                break
            default:
                break
        }

        // switch (detail.paymentStatus) {
        //     case 0:
        //         return <div className={'registerDetail-part1-value-blue'}>待支付{this.calDayInfo(detail.seenDate)}</div>;
        //     case 1:
        //         return <div className={'registerDetail-part1-value-blue'}>部分支付{this.calDayInfo(detail.seenDate)}</div>;
        //     case 2:
        //     case 3:
        //         return <div className={'registerDetail-part1-value-blue'}>已支付{this.calDayInfo(detail.seenDate)}</div>;
        //     case 4:
        //         return <div className={'registerDetail-part1-value'}>部分退款</div>;
        //     case 5:
        //     case 6:
        //         return <div className={'registerDetail-part1-value'}>已取消</div>;
        //     default:
        //         return <div className={'registerDetail-part1-value'}>未知</div>;
        // }
        switch (choice) {
            case 0:
                return <div className={'registerDetail-part1-value-blue'}>待支付{this.calDayInfo(detail.seenDate)}</div>;
            case 1:
                return <div className={'registerDetail-part1-value-blue'}>已支付{this.calDayInfo(detail.seenDate)}</div>;
            case 2:
                return <div className={'registerDetail-part1-value'}>已取消预约</div>;
            default:
                return <div className={'registerDetail-part1-value'}>未知</div>;
        }
    }

    /**
     * 根据传入的毫秒时间，计算当前日期到目标日期的天数之差，并返回对应信息: (今日就诊/3天后就诊)
     * @param mis
     */
    calDayInfo(mis) {
        let tarTime = new Date(mis);
        let curTime = new Date();
        let diff = (tarTime.getTime() - curTime.getTime())
        let result = parseInt(diff / (1000 * 60 * 60 * 24));
        if (result > 0) {
            return ' (' + result + '天后就诊)';
        } else if (result==0) {
            return ' (今天就诊)';
        } else{
            return '(已过期)';
        }
    }

    first2Str(isFirst) {
        if (typeof isFirst == 'undefined') return '未知'
        if (isFirst) return '初诊'
        else return '复诊'
    }

    diseaseValuator(diseaseName) {
        if (diseaseName) return diseaseName;
        else return '未知'
    }

    feeValuator(fee){
        if (fee) return fee.toFixed(2);
        else return '未知'

    }


    /**
     * 将毫秒时间改为 yyyy-MM-dd HH:mm:ss的形式
     * @param mil
     * @returns {string}
     */
    timeChanger1(mil) {
        let curTime = new Date(mil);
        // let year = curTime.getFullYear();
        // let month = String(curTime.getMonth() + 1).padStart(2,"0");
        // let day = String(curTime.getDate()).padStart(2,"0");
        let year = curTime.getFullYear();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();
        let hour = curTime.getHours();
        let minute = curTime.getMinutes();
        let second = curTime.getSeconds();
        month = month <= 9 ? "0" + month : month;
        day = day <= 9 ? "0" + day : day;
        hour = hour <= 9 ? "0" + hour : hour;
        minute = minute <= 9 ? "0" + minute : minute;
        second = second <= 9 ? "0" + second : second;
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }

    /**
     * 根据调解，生成part5按钮区域
     * @returns {*}
     */
    generatePart5() {
        console.log('generatePart5');
        const {detail} = this.props.location.state
        let showPay=false;
        let showCancel=false;
        switch (detail.regStatus) {
            case 0:
                //线下支付
                if (detail.paymentMethod == 0) {
                    showCancel = true;
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (detail.paymentStatus) {
                        case 0://未支付
                        case 1://部分支付
                            showPay = true;
                            break
                        case 2://已支付待确认
                            break
                        case 3://已支付
                            break
                        case 4://部分退款
                        case 5://已退款待确认(第三方发送退费申请)
                            break
                        case 6://已退款
                            break
                    }
                }
                break
            case 1://就诊完成
                break
            case 2:
                //已取
                break
            default://预约超期
                break
        }
        return (<div>
            <div className={'registerDetail-part5'}>
                {(showPay) ?
                    <div className={'registerDetail-part5-btn-box'} onClick={this.register2Pay.bind(this)}>
                        <div className={'registerDetail-part5-btn-core'}>支付</div>
                    </div> : ''
                }
                {(showCancel) ?
                    <div className={'registerDetail-part5-btn-box'} onClick={this.goCancelReg.bind(this)}>
                        <div className={'registerDetail-part5-btn-core'}>取消预约</div>
                    </div> : ''
                }
            </div>
        </div>);
        // switch (detail.paymentStatus) {
        //     case 0: //未支付
        //     case 1: //部分支付
        //         return (<div className={'registerDetail-part5'}>
        //             <div className={'registerDetail-part5-btn-box'} onClick={this.register2Pay.bind(this)}>
        //                 <div className={'registerDetail-part5-btn-core'}>支付</div>
        //             </div>
        //             <div className={'registerDetail-part5-btn-box'} onClick={()=>{alert('00000')}}>
        //             {/*<div className={'registerDetail-part5-btn-box'} onClick={this.goCancelReg.bind(this)}>*/}
        //                 <div className={'registerDetail-part5-btn-core'}>取消预约</div>
        //             </div>
        //         </div>);
        //     case 2://已支付待确认
        //     case 3://已支付
        //         return (<div className={'registerDetail-part5'}>
        //             <div className={'registerDetail-part5-btn-box'}>
        //                 <div className={'registerDetail-part5-btn-core'}>取消预约</div>
        //             </div>
        //         </div>);
        //     case 4:
        //     case 5:
        //     case 6://已退款
        //         return;
        // }
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
        registerDetailActions: bindActionCreators(registerDetailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDetailContainer)
