/**
 * 订单：门诊缴费列表
 */
import React, {Component} from "react";
import {
    actions as myOrderTabsActions,
} from "@reduxs/modules/myOrderTabs";
//样式
import "./style.less";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//完成图标
import icon_done from '@assets/images/Order/pic_ywc.png'

class MyOutpatientPaymentItem extends Component {
    render() {
        const {realList} = this.props;
        return realList.map((item, index) => {
            return (
                <li className="my-my-outpatientPayment-item border-topbottom" onClick={() => this.gotoDetailPage(item)}
                    key={item.id}>
                    <div className={'my-outpatientPayment-item-distance'}></div>
                    <div className={'my-outpatientPayment-item-part1 border-topbottom'}>
                        <div className={'my-outpatientPayment-item-part1-left'}>
                            <div className={'my-outpatientPayment-item-part1-left-hos'}>{item.hospitalName}</div>
                            <div
                                className={'my-outpatientPayment-item-part1-left-date'}>{this.timeChanger(item.seenDate)}</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part1-right'}>
                            {this.packagePaymentStatusDiv(item)}
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part2 border-bottom'}>
                        <div className={'my-outpatientPayment-item-part2-item1'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>就诊人</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>收费项目</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part2-item2'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>{item.patientName}</div>
                            <div
                                className={'my-outpatientPayment-item-part2-item-value'}>{this.packageRecipeInfo(item.hisRecipeDetailList)}</div>
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part3 border-bottom'}>
                        <div className={'my-outpatientPayment-item-part3-txt'}>合计：</div>
                        <div className={'my-outpatientPayment-item-part3-cost'}>￥{item.totCost}</div>
                        {this.packagePaymentButtonDiv(item)}
                    </div>
                </li>
            );
        });
    }

    /**
     * 将毫秒时间改为 yyyy-MM-dd HH:mm:ss的形式
     * @param mil
     * @returns {string}
     */
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

    packageRecipeInfo(recipeList) {
        if (recipeList) {
            if (recipeList.length > 1) {
                return recipeList[0].itemName + " 等" + recipeList.length + "项";
            } else {
                return recipeList[0].itemName;
            }
        } else {
            return "无";
        }
    }

    packagePaymentStatusDiv(balanceItem) {
        let statusLabel = ''
        let showPayBtn = false
        let statusStyle = {color: '#0084ff'}
        let showDoneIcon = false
        switch (balanceItem.balStatus) { //  getBalStatus 订单状态
            case 0:
                //支付状态：0未支付，1部分支付(混合情况)，2已支付待确认(支付宝)，3已支付，4部分退款(医保已退，支付宝未退) 5已退款
                if (balanceItem.paymentMethod == 0) {
                    //线下支付
                    statusLabel = '支付成功'
                } else {
                    //线上支付
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (balanceItem.paymentStatus) {
                        case 0:
                        case 1:
                            statusLabel = '待支付'
                            showPayBtn = true
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
                            break
                        default:
                            break
                    }
                }
                break
            case 1:
                //支付完成
                statusLabel = '已完成'
                showDoneIcon = true
                break
            case 2:
                //取消、超期
                statusStyle = {color: '#686868'}
                statusLabel = '已取消'
                //线上支付
                //支付状态为：0未支付、1部分支付；显示支付按钮
                switch (balanceItem.paymentStatus) {
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

        if (showDoneIcon) {
            return (<img src={icon_done} alt="" style={{ position: 'absolute',
                right: 10,
                top: 3,
                overflow: 'hidden',
                width: 80,
                height: 65,
                tintColor: '#0084ff'}}/>);
        } else {
            return (<div style={statusStyle}>
                {statusLabel}
            </div>);
        }

    }

    packagePaymentButtonDiv(item) {
        let statusLabel = '';
        let showPayBtn = false;
        let statusStyle = {color: '#0084ff'}
        let showDoneIcon = false
        switch (item.balStatus) { //  getBalStatus 订单状态
            case 0:
                //支付状态：0未支付，1部分支付(混合情况)，2已支付待确认(支付宝)，3已支付，4部分退款(医保已退，支付宝未退) 5已退款
                if (item.paymentMethod == 0) {
                    //线下支付
                    statusLabel = '支付成功'
                } else {
                    //线上支付
                    //支付状态为：0未支付、1部分支付；显示支付按钮
                    switch (item.paymentStatus) {
                        case 0:
                        case 1:
                            statusLabel = '待支付'
                            showPayBtn = true
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
                            break
                        default:
                            break
                    }
                }
                break
            case 1:
                //支付完成
                statusLabel = '已完成'
                showDoneIcon = true
                break
            case 2:
                //取消、超期
                statusStyle = {color: '#686868'}
                statusLabel = '已取消'
                //线上支付
                //支付状态为：0未支付、1部分支付；显示支付按钮
                switch (item.paymentStatus) {
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
        if (showPayBtn) {
            return <div className={'my-outpatientPayment-item-part3-btn-div'}>
                <div className={'my-outpatientPayment-item-part3-btn blue'}>去支付</div>
            </div>
        } else {
            return <div></div>
        }
    }

    gotoDetailPage(item) {
        const {history, defaultPerson, selHospital} = this.props;
        let path = {
            pathname: "/outpatientPaymentDetail",
            state: {
                detail: item,
                defaultPerson: defaultPerson,
                selHospital: selHospital
            }
        };
        history.push(path);
    }


    componentDidMount() {
        const {myOrderTabsActions: {loadOutpatientByPage}} = this.props
        loadOutpatientByPage(1)
    }

}

const mapStateToProps = state => {
    return {
        // outpatientList: getOutpatientList(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        myOrderTabsActions: bindActionCreators(myOrderTabsActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOutpatientPaymentItem);
