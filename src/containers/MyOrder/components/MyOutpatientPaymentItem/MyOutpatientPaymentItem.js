/**
 * 我的订单-门诊缴费项
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
//样式
import "./style.less";


class MyOutpatientPaymentItem extends Component {

    render() {
        const {itemData} = this.props;
        // console.log("000000000000000000000000")
        // console.group(this.props)
        return (
            <li className="my-my-outpatientPayment-item border-topbottom" onClick={()=>this.gotoDetailPage(itemData)}>
                <div className={'my-outpatientPayment-item-distance'}></div>
                <div className={'my-outpatientPayment-item-part1 border-topbottom'}>
                    <div className={'my-outpatientPayment-item-part1-left'}>
                        <div className={'my-outpatientPayment-item-part1-left-hos'}>解放军联勤保障部队第九0四医院</div>
                        <div className={'my-outpatientPayment-item-part1-left-date'}>2020-01-09 14:50:32</div>
                    </div>
                    <div className={'my-outpatientPayment-item-part1-right'}>
                        <div className={'my-outpatientPayment-item-part1-right-status'}>已退款</div>
                    </div>
                </div>
                <div className={'my-outpatientPayment-item-part2 border-bottom'}>
                    <div className={'my-outpatientPayment-item-part2-item1'}>
                        <div className={'my-outpatientPayment-item-part2-item-key'}>就诊人</div>
                        <div className={'my-outpatientPayment-item-part2-item-value'}>收费项目</div>
                    </div>
                    <div className={'my-outpatientPayment-item-part2-item2'}>
                        <div className={'my-outpatientPayment-item-part2-item-key'}>耿昌健</div>
                        <div className={'my-outpatientPayment-item-part2-item-value'}>红外线治疗</div>
                    </div>
                </div>
                <div className={'my-outpatientPayment-item-part3 border-bottom'} >
                    <div className={'my-outpatientPayment-item-part3-cost'}>合计：￥6.50</div>
                </div>
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


export default withRouter(MyOutpatientPaymentItem);
