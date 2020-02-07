/**
 * 我的订单-门诊缴费项
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {
    actions as myOutpatientActions,
    getOutpatientList
} from "@reduxs/modules/myOutpatientPayment";
//样式
import "./style.less";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class MyOutpatientPaymentItem extends Component {

    render() {
        const {outpatientList} = this.props;
        console.log("000000000000000000000001")
        console.group(this.props)
        return outpatientList.map((item, index) => {
            return (
                <li className="my-my-outpatientPayment-item border-topbottom" onClick={()=>this.gotoDetailPage(item)}>
                    <div className={'my-outpatientPayment-item-distance'}></div>
                    <div className={'my-outpatientPayment-item-part1 border-topbottom'}>
                        <div className={'my-outpatientPayment-item-part1-left'}>
                            <div className={'my-outpatientPayment-item-part1-left-hos'}>{item.hospitalName}</div>
                            <div className={'my-outpatientPayment-item-part1-left-date'}>{this.timeChanger(item.seenDate)}</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part1-right'}>
                            {this.packagePaymentStatusDiv(item.paymentStatus)}
                            {/*<div className={'my-outpatientPayment-item-part1-right-status'}>{this.paymentStatus2Str(item.paymentStatus)}</div>*/}
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part2 border-bottom'}>
                        <div className={'my-outpatientPayment-item-part2-item1'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>就诊人</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>收费项目</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part2-item2'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>{item.patientName}</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>{this.packageRecipeInfo(item.hisRecipeDetailList)}</div>
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part3 border-bottom'} >
                        <div className={'my-outpatientPayment-item-part3-cost'}>合计：￥{item.totCost}</div>
                    </div>
                </li>
            );
        });
    }

    timeChanger(mil){
        let curTime = new Date(mil);
        // let year = curTime.getFullYear();
        // let month = String(curTime.getMonth() + 1).padStart(2,"0");
        // let day = String(curTime.getDate()).padStart(2,"0");
        let year = curTime.getFullYear();
        let month = curTime.getMonth()+1;
        let day = curTime.getDate();
        let hour=curTime.getHours();
        let minute=curTime.getMinutes();
        let second=curTime.getSeconds();
        month = month <= 9 ? "0"+month : month;
        day = day <= 9 ? "0"+day : day;
        hour = hour <= 9 ? "0"+hour : hour;
        minute = minute <= 9 ? "0"+minute : minute;
        second = second <= 9 ? "0"+second : second;
        return year + "-" + month + "-" + day+" "+hour+":"+minute+":"+second;
    }

    packageRecipeInfo(recipeList){
        if(recipeList){
            if(recipeList.length>1){
                return recipeList[0].itemName+" 等"+recipeList.length+"项";
            }else{
                return recipeList[0].itemName;
            }
        }else{
            return "无";
        }
    }

    packagePaymentStatusDiv(status){
        if(status==2||status==3){
            return (<div className={'my-outpatientPayment-item-part1-right-status-blue'}>
                {this.paymentStatus2Str(status)}
            </div>);
        }else{
            return (<div className={'my-outpatientPayment-item-part1-right-status'}>
                {this.paymentStatus2Str(status)}
            </div>);
        }
    }

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

    gotoDetailPage(item) {
        const {history, defaultPerson, selHospital} = this.props;
        // console.log("item: "+JSON.stringify(item));
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
        const {actionTabKey, registerList} = this.props
        console.log('5555555555555555555555555555')
        this.props.myOutpatientPaymentActions.loadOutpatientByPage(1)
    }

}

const mapStateToProps = state => {
    return {
        outpatientList: getOutpatientList(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        myOutpatientPaymentActions: bindActionCreators(myOutpatientActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOutpatientPaymentItem);
