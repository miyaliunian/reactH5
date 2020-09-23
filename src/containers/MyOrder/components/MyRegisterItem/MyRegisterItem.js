/**
 * 我的订单-预约挂号
 */
import React, {Component} from "react";

import {
    actions as myOrderTabActions
} from "@reduxs/modules/myOrderTabs";
//样式
import "./style.less";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


class MyRegisterItem extends Component {
    render() {
        const {realList} = this.props;
        return realList.map((item, index) => {
            return (
                <li className="my-my-outpatientPayment-item border-topbottom"
                    key={item.id}>
                    <div className={'my-outpatientPayment-item-distance'}></div>
                    <div className={'my-outpatientPayment-item-part1 border-topbottom'}
                         onClick={() => this.gotoDetailPage(item)}>
                        <div className={'my-outpatientPayment-item-part1-left'}>
                            <div className={'my-outpatientPayment-item-part1-left-hos'}>{item.hosName}</div>
                            <div
                                className={'my-outpatientPayment-item-part1-left-date'}>{this.timeChanger(item.regDate)}</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part1-right'}>
                            {this.packagePaymentStatusDiv(item)}
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part2 border-bottom'}
                         onClick={() => this.gotoDetailPage(item)}>
                        <div className={'my-outpatientPayment-item-part2-item1'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>医生</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>就诊人</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part2-item2'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>{item.doctName}</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>{item.patientName}</div>
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part3 border-bottom'}>
                        <div className={'my-outpatientPayment-item-part3-txt'}>合计：</div>
                        <div className={'my-outpatientPayment-item-part3-cost'}>￥{item.regFee}</div>
                        {this.packagePaymentButtonDiv(item)}
                    </div>
                </li>
            );
        });
    }

    timeChanger(mil) {
        let curTime = new Date(mil);
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

    packagePaymentStatusDiv(item) {
        let statusLabel = '';
        let divClassName = 'my-outpatientPayment-item-part1-right-status';
        switch (item.regStatus) {
            case 0:
                //线下支付
                if (item.paymentMethod == 0) {
                    divClassName = 'my-outpatientPayment-item-part1-right-status-blue';
                    statusLabel = '预约成功'
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (item.paymentStatus) {
                        case 0:
                        case 1:
                            statusLabel = '待支付';
                            divClassName='my-outpatientPayment-item-part1-right-status-blue';
                            break
                        case 2:
                            statusLabel = '支付确认中';
                            break
                        case 3:
                            statusLabel = '已支付';
                            divClassName='my-outpatientPayment-item-part1-right-status-blue';
                            break
                        case 4://部分退款
                        case 5://已退款待确认(第三方发送退费申请)
                            statusLabel = '退款中'
                            break
                        case 6:
                            // statusLabel = "已退款"
                            statusLabel = "已取消"
                            break
                    }
                }
                break
            case 1:
                statusLabel = '就诊完成'
                break
            case 2:
                //取消
                statusLabel = '已取消'
                break
            default:
                statusLabel = '预约超期'
                break
        }
        return (<div className={divClassName}>
            {statusLabel}
        </div>);
    }


    packagePaymentButtonDiv(item) {
        const {regStatus,paymentMethod,paymentStatus} = item
        let statusLabel = '';
        let divClassName = 'my-outpatientPayment-item-part1-right-status';
        switch (regStatus) {
            case 0:
                //线下支付
                if (paymentMethod == 0) {
                    return (<di></di>);
                } else {
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (paymentStatus) {
                        case 0:
                        case 1:
                            return (
                                <div className={'my-outpatientPayment-item-part3-btn-div'}>
                                    <div className={'my-outpatientPayment-item-part3-btn blue'}>去支付</div>
                                </div>
                            );
                        case 2:
                        case 3:
                            return (
                                <div className={'my-outpatientPayment-item-part3-btn-div'} onClick={()=>this.againRegistration(item)}>
                                    <div className={'my-outpatientPayment-item-part3-btn blue'}
                                         onClick={() => this.againRegistration(item)}>再次预约
                                    </div>
                                </div>
                            );
                        case 4://部分退款
                        case 5://已退款待确认(第三方发送退费申请)
                        case 6:
                            // statusLabel = "已退款"
                            return (<div></div>);
                    }
                }
                break
            case 1:
                //完成
                return (<div></div>);
            case 2:
                //作废
                return (<div></div>);
            default:
                return (<div></div>);
        }
        return (<div className={divClassName}>
            {statusLabel}
        </div>);
    }

    //---------------------------------订单详情
    gotoDetailPage(item) {
        const {history, defaultPerson, selHospital} = this.props;
        let path = {
            pathname: "/registerDetail",
            state: {
                detail: item,
                defaultPerson: defaultPerson,
                selHospital: selHospital
            }
        };
        history.push(path);
    }

    //---------------------------------再次预约
    againRegistration(item) {
        const {history} = this.props;
        const {doctId, doctName, doctTitle, deptId, deptName, hosId, hosName} = item
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
    cancelRegistration(item) {
        this.props.myOrderTabActions.cancelRegistration(item.id);
    }


    componentDidMount() {
        console.log('挂号')
        const {myOrderTabActions:{loadRegisterByPage}} = this.props
        loadRegisterByPage(1)
    }
}


const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        myOrderTabActions: bindActionCreators(myOrderTabActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyRegisterItem);
