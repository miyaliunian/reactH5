/**
 * 门诊缴费待缴费列表
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import ico_clinic_pay_item from '@assets/images/OutpatientPayment/ico_clinic_pay_item.png'
//样式
import "./style.less";


class OutpatientPaymentItem extends Component {
    render() {
        const {itemData} = this.props;
        console.log("000000000000000000000000")
        console.group(this.props)
        return (
            <li className="outpatientPayment-item border-topbottom">
                <div className={'outpatientPayment-item-part1'}>
                    <img src={ico_clinic_pay_item} className={'outpatientPayment-item-part1-img'}/>
                    <div className={'outpatientPayment-item-part1-content'}>
                        <div className={'outpatientPayment-item-part1-content-txt'}>门诊费用</div>
                        <div className={'outpatientPayment-item-part1-content-date'}>{itemData.seeDate}</div>
                    </div>
                </div>
                <div className={'outpatientPayment-item-part2'}>
                    <div className={'outpatientPayment-item-part2-cost'}>{'￥'+itemData.totCost}</div>
                    <div className={'outpatientPayment-item-part2-txt border-bottom'}>{itemData.deptName+'|'+itemData.doctName}</div>
                </div>
                <div className={'outpatientPayment-item-part3'} onClick={()=>this.gotoDetailPage(itemData)}>
                    <div className={'outpatientPayment-item-part3-btn'}>立即缴费</div>
                </div>
                <div className={'outpatientPayment-item-distance'}></div>
            </li>
        );
    }


    gotoDetailPage(item) {
        const {history,defaultPerson,selHospital} = this.props;
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

}


export default withRouter(OutpatientPaymentItem);
