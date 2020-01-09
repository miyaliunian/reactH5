
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
//图标
import icon_sj from "@assets/images/Home/三甲图标IOS.png";
import icon_bg from "@assets/images/Home/报告图标IOS.png";
import icon_zh from "@assets/images/Home/综合图标IOS.png";
import icon_yy from "@assets/images/Home/预约图标IOS.png";
//样式
import "./style.less";


class HospitalsItem extends Component {
  render() {
    const { itemData } = this.props;
    return (
      <Link to={`/division/${itemData.id}/${itemData.name}`} >
        <div className="hospitalsItem__con border-topbottom">
          <div className="hospitalsItem__title">{itemData.name}</div>
          <div className="hospitalsItem__middle">
            <div className={"hospitalsItem__middle__item"}>
              <img src={icon_sj} alt="" className={"hospitalsItem__middle__icon"}/>
              <span className={"hospitalsItem__middle__innerTxt"}>{itemData.hosGradeShortName}</span>
            </div>
            <div className={"hospitalsItem__middle__item"}>
              <img src={icon_zh} alt="" className={"hospitalsItem__middle__icon"}/>
              <span className={"hospitalsItem__middle__innerTxt"}>{itemData.hosCategory}</span>
            </div>
            {itemData.regOpened ? (
              <div className={"hospitalsItem__middle__item"}>
                <img src={icon_yy} alt="/" className={"hospitalsItem__middle__icon"}/>
                <span className={"hospitalsItem__middle__innerTxt"}>可预约</span>
              </div>
            ) : null}
            {itemData.reportOpened ? (
              <div className={"hospitalsItem__middle__item"}>
                <img src={icon_bg} className={"hospitalsItem__middle__icon"} alt=""/>
                <span className={"hospitalsItem__middle__innerTxt"}>查报告</span>
              </div>
            ) : null}
          </div>
          <div className="hospitalsItem__address">地址：{itemData.address}</div>
        </div>
      </Link>
    );
  }



}


export default withRouter(HospitalsItem);
