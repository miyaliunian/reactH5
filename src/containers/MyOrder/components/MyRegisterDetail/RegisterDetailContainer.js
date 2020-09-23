/**
 * 订单：预约挂号详情 By WF 2020/02/07
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

const dayJS = require('dayjs')
class RegisterDetailContainer extends Component {
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
        let choice = 3;//未知
        switch (detail.regStatus) {
            case 0:
                //线下支付
                if (detail.paymentMethod == 0) {
                    choice = 1;//已支付
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (detail.paymentStatus) {
                        case 0:
                            choice = 0;//待支付
                            break;
                        case 1:
                            choice = 0;//待支付
                            break
                        case 2://支付确认中
                            choice = 1;//已支付
                            break
                        case 3://已支付
                            choice = 1;//已支付
                            break
                        case 4://部分退款
                            choice = 2;//已退款
                        case 5://已退款待确认(第三方发送退费申请)
                            choice = 2;//已退款
                            break
                        case 6:
                            choice = 2;//已退款
                            break
                    }
                }
                break
            case 1:
                choice = 1;//已支付
                break
            case 2:
                //取消
                choice = 2;//已退款
                break
            default:
                break
        }
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
                    {
                        choice === 2 ?
                            <div/> :
                            <div>
                                <div className={'registerDetail-part2-item'}>
                                    <div className={'registerDetail-part2-item-key'}>统筹支付</div>
                                    <div
                                        className={'registerDetail-part2-item-value'}>{detail.pubCost !== '' || detail.pubCost !== null ? detail.pubCost.toFixed(2) : '0.00'}</div>
                                </div>
                                <div className={'registerDetail-part2-item'}>
                                    <div className={'registerDetail-part2-item-key'}>账户支付</div>
                                    <div
                                        className={'registerDetail-part2-item-value'}>{detail.payCost !== '' || detail.payCost !== null ? detail.payCost.toFixed(2) : 0.00}</div>
                                </div>
                                <div className={'registerDetail-part2-item'}>
                                    <div className={'registerDetail-part2-item-key'}>现金支付</div>
                                    <div
                                        className={'registerDetail-part2-item-value'}>{detail.ownCost !== '' || detail.ownCost !== null ? detail.ownCost.toFixed(2) : 0.00}</div>
                                </div>
                            </div>
                    }

                    <div className={'registerDetail-part2-item'}>
                        <div className={'registerDetail-part2-item-key'}>挂号费用</div>
                        <div
                            className={'registerDetail-part2-item-value-money'}>{'￥' + this.feeValuator(detail.regFee)}</div>
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
                <LoadingMask/>
            </SafeAreaView>
        )
    }

    //---------------------------------去支付
    register2Pay = () => {
        const {
            registerDetailActions: {register2SiPrePay},
            history,
            location
        } = this.props
        register2SiPrePay(location.state.detail, {...history})
    }

    //---------------------------------再次预约
    againRegistration() {
        const {history,location:{state:{detail}}} = this.props;
        const {doctId, doctName, doctTitle, deptId, deptName, hosId, hosName} = detail
        let path = {
            pathname: "/doctor/reservation",
            state: {
                seeDate: null,
                doctorInfo: {
                    id: doctId,
                    name: doctName,
                    deptName: deptName,
                    title: doctTitle,
                    hosName: hosName,
                    hosId: hosId
                },
                deptInfo: {
                    name: deptName
                }
            }
        };
        history.push(path);
    }

    //---------------------------------取消预约
    goCancelReg = () => {
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
        let year = tarTime.getFullYear();
        let month = tarTime.getMonth() + 1;
        let day = tarTime.getDate();
        let week = tarTime.getDay();
        month = month <= 9 ? "0" + month : month;
        day = day <= 9 ? "0" + day : day;
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return year + '年' + month + '月' + day + '日 ' + weekday[week] + ' ' + detail.noon;
    }

    generateSeeDateStr2() {
        const {detail} = this.props.location.state
        return detail.beginTime + '-' + detail.endTime;
    }

    /**
     * 生成缴费状态部分的元素
     * @returns {*}
     */
    generatePaymentStatusPart() {
        const {detail} = this.props.location.state
        let choice = 3;//未知
        switch (detail.regStatus) {
            case 0:
                //线下支付
                if (detail.paymentMethod == 0) {
                    choice = 1;//已支付
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (detail.paymentStatus) {
                        case 0:
                            choice = 0;//待支付
                            break;
                        case 1:
                            choice = 0;//待支付
                            break
                        case 2://支付确认中
                            choice = 1;//已支付
                            break
                        case 3://已支付
                            choice = 1;//已支付
                            break
                        case 4://部分退款
                            choice = 2;//已退款
                        case 5://已退款待确认(第三方发送退费申请)
                            choice = 2;//已退款
                            break
                        case 6:
                            choice = 2;//已退款
                            break
                    }
                }
                break
            case 1:
                choice = 1;//已支付
                break
            case 2:
                //取消
                choice = 2;//已退款
                break
            default:
                break
        }

        switch (choice) {
            case 0:
                return <div className={'registerDetail-part1-value-blue'}>待支付{this.calDayInfo(detail.seenDate)}</div>;
            case 1:
                return <div className={'registerDetail-part1-value-blue'}>已支付{this.calDayInfo(detail.seenDate)}</div>;
            case 2:
                return <div className={'registerDetail-part1-value'}>已取消</div>;
            default:
                return <div className={'registerDetail-part1-value'}>未知</div>;
        }
    }

    /**
     * 根据传入的毫秒时间，计算当前日期到目标日期的天数之差，并返回对应信息: (今日就诊/3天后就诊)
     * @param mis
     */
    calDayInfo(mis) {
        let tarTime = dayJS(dayJS(mis).format('YYYY-MM-DD'))
        let curTime = dayJS(dayJS().format('YYYY-MM-DD'))
        let diff = (tarTime.diff(curTime))
        let result = parseInt(diff / (1000 * 60 * 60 * 24));
        if (result > 0) {
            return ' (' + result + '天后就诊)';
        } else if (result == 0) {
            return ' (今日就诊)';
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

    feeValuator(fee) {
        if (fee) return fee.toFixed(2);
        else return '未知'

    }

    /**
     * 根据调解，生成part5按钮区域
     * @returns {*}
     */
    generatePart5() {
        const {detail:{regStatus, paymentMethod,paymentStatus,hosResponse}} = this.props.location.state
        let showPayBtn = false; // 显示支付按钮
        let showAgainPayBtn = false; // 显示再次预约按钮
        let showCancelBtn = false; // 显示取消预约按钮
        let showHosResponse = false; // 显示显示免责声明
        if (regStatus == 0) {
            if ((paymentMethod == 0 || (paymentMethod == 1 && paymentStatus == 3)) && hosResponse.length > 0) {
                showHosResponse = true
            }
            //显示按钮
            if (paymentMethod != 0) {
                if (paymentStatus == 0 || paymentStatus == 1) {
                    showPayBtn = true
                } else if (paymentStatus == 3 || paymentStatus == 4 || paymentStatus == 5 || paymentStatus == 6) {
                    // 显示“再次预约“按钮
                    showAgainPayBtn = true
                }
            }
            if (paymentStatus == 0) {
                // 显示“取消预约“按钮
                showCancelBtn = true
            }
        } else if (regStatus == 1) {
            //添加免责声明
            showHosResponse = true
            showAgainPayBtn = true
        } else {
            showHosResponse = true
        }

        return (<div>
            <div className={'registerDetail-part5'}>
                {(showPayBtn) ?
                    <div className={'registerDetail-part5-btn-box'} onClick={this.register2Pay.bind(this)}>
                        <div className={'registerDetail-part5-btn-core'}>支付</div>
                    </div> : ''
                }
                {(showAgainPayBtn) ?
                    <div className={'registerDetail-part5-btn-box'} onClick={()=>this.againRegistration()}>
                        <div className={'registerDetail-part5-btn-core'}>再次预约</div>
                    </div> : ''
                }
                {(showCancelBtn) ?
                    <div className={'registerDetail-part5-btn-box'} onClick={this.goCancelReg.bind(this)}>
                        <div className={'registerDetail-part5-btn-core'}>取消预约</div>
                    </div> : ''
                }
            </div>
        </div>);
    }

}

const mapStateToProps = state => {
    return {
        detail: getDetail(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerDetailActions: bindActionCreators(registerDetailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDetailContainer)
