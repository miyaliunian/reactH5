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
        return (
            <li className="outpatientPayment-item border-topbottom">
                <div className={'outpatientPayment-item-part1'}>
                    <img src={ico_clinic_pay_item} className={'outpatientPayment-item-part1-img'}/>
                    <div className={'outpatientPayment-item-part1-content'}>
                        <div className={'outpatientPayment-item-part1-content-txt'}>门诊费用</div>
                        <div className={'outpatientPayment-item-part1-content-date'}>01-09 14:02</div>
                    </div>
                </div>
                <div className={'outpatientPayment-item-part2'}>
                    <div className={'outpatientPayment-item-part2-cost'}>￥ 35.00</div>
                    <div className={'outpatientPayment-item-part2-txt border-bottom'}>呼吸内科门诊|谭雪贤</div>
                </div>
                <div className={'outpatientPayment-item-part3'}>
                    <div className={'outpatientPayment-item-part3-btn'}>立即缴费</div>
                </div>
                <div className={'outpatientPayment-item-distance'}></div>
                {/*<div className="hospitalsItem__title">{itemData.name}</div>*/}
                {/*<div className="hospitalsItem__middle">*/}
                {/*  <div className={"hospitalsItem__middle__item"}>*/}
                {/*    <img src={icon_sj} alt="" className={"hospitalsItem__middle__icon"}/>*/}
                {/*    <span className={"hospitalsItem__middle__innerTxt"}>{itemData.hosGradeShortName}</span>*/}
                {/*  </div>*/}
                {/*  <div className={"hospitalsItem__middle__item"}>*/}
                {/*    <img src={icon_zh} alt="" className={"hospitalsItem__middle__icon"}/>*/}
                {/*    <span className={"hospitalsItem__middle__innerTxt"}>{itemData.hosCategory}</span>*/}
                {/*  </div>*/}
                {/*  {itemData.regOpened ? (*/}
                {/*    <div className={"hospitalsItem__middle__item"}>*/}
                {/*      <img src={icon_yy} alt="/" className={"hospitalsItem__middle__icon"}/>*/}
                {/*      <span className={"hospitalsItem__middle__innerTxt"}>可预约</span>*/}
                {/*    </div>*/}
                {/*  ) : null}*/}
                {/*  {itemData.reportOpened ? (*/}
                {/*    <div className={"hospitalsItem__middle__item"}>*/}
                {/*      <img src={icon_bg} className={"hospitalsItem__middle__icon"} alt=""/>*/}
                {/*      <span className={"hospitalsItem__middle__innerTxt"}>查报告</span>*/}
                {/*    </div>*/}
                {/*  ) : null}*/}
                {/*</div>*/}
                {/*<div className="hospitalsItem__address">地址：{itemData.address}</div>*/}
            </li>
        );
    }


}


export default withRouter(OutpatientPaymentItem);
