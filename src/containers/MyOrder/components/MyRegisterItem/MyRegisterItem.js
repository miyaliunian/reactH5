/**
 * 我的订单-预约挂号
 */
import React, {Component} from "react";
import {
    actions as myRegisterActions,
    getRegisterList
} from "@reduxs/modules/myRegister";
//样式
import "./style.less";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


class MyRegisterItem extends Component {
    render() {
        const {registerList} = this.props;
        console.log("000000000000000000000000")
        console.group(this.props)
        return registerList.map((item, index) => {
            return (
                <li className="my-my-outpatientPayment-item border-topbottom" onClick={()=>this.gotoDetailPage(item)}>
                    <div className={'my-outpatientPayment-item-distance'}></div>
                    <div className={'my-outpatientPayment-item-part1 border-topbottom'}>
                        <div className={'my-outpatientPayment-item-part1-left'}>
                            <div className={'my-outpatientPayment-item-part1-left-hos'}>{item.hosName}</div>
                            <div className={'my-outpatientPayment-item-part1-left-date'}>{this.timeChanger(item.regDate)}</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part1-right'}>
                            {this.packagePaymentStatusDiv(item.regStatus)}
                            {/*<div className={'my-outpatientPayment-item-part1-right-status'}>{item.paymentStatus}</div>*/}
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part2 border-bottom'}>
                        <div className={'my-outpatientPayment-item-part2-item1'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>医生</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>就诊人</div>
                        </div>
                        <div className={'my-outpatientPayment-item-part2-item2'}>
                            <div className={'my-outpatientPayment-item-part2-item-key'}>{item.doctName}</div>
                            <div className={'my-outpatientPayment-item-part2-item-value'}>{item.patientName}</div>
                        </div>
                    </div>
                    <div className={'my-outpatientPayment-item-part3 border-bottom'} >
                        <div className={'my-outpatientPayment-item-part3-cost'}>合计：￥{item.regFee}</div>
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

    packagePaymentStatusDiv(status){
        if(status==0){
            return (<div className={'my-outpatientPayment-item-part1-right-status-blue'}>
                待支付
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
                return '待支付';
            case 1:
                return '已支付';
            case 2:
                return '已取消预约';
            default:
                return '未知';
        }
    }

    gotoDetailPage(item) {
        const {history,defaultPerson,selHospital} = this.props;
        console.log("item: "+JSON.stringify(item));
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



    componentDidMount() {
        const {actionTabKey, registerList} = this.props
        console.log('66666666666666666666666666666')
        this.props.registerActions.loadRegisterByPage(1)
    }
}


const mapStateToProps = state => {
    return {
        registerList: getRegisterList(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        registerActions: bindActionCreators(myRegisterActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyRegisterItem);
