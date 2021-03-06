/**
 * Class: DoctorItem
 * Author: wufei
 * Date: 2019/6/18
 * Description:
 *  医生列表->每一个单元格
 */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Bscroll from "better-scroll";
import ico_doctor_status from "@assets/images/Home/ico_doctor_status.png";
import ico_doctor_status_h from "@assets/images/Home/ico_doctor_status_h.png";
import { DOCTORTABKAY } from "@api/Constant";
//样式
import "./style.less";

class DoctorItem extends Component {
  render() {
    const { data, actionTabKey,reservations } = this.props;
    let cls = "doctor-content border-bottom";
    if (actionTabKey === DOCTORTABKAY.date && reservations.length !== 0) {
      cls += " current";
    }
    return (
      <ul className={cls} ref={"doctorItem"}>
        <div>
          {data.map(item => {
            return (
              <li key={item.id} className={"doctorItem__item border-bottom"} onClick={() => this.handelPageNav(item)}>
                <div className={"doctorItem__avator"}>{this.drawReact(item.name)}</div>
                <div className={"doctorItem__info"}>
                  <div className={"doctorItem__name_title"}>
                    <div className={"doctorItem__name"}>{item.name}</div>
                    <div className={"doctorItem__title"}>{item.title}</div>
                  </div>
                  <div className={"doctorItem__skills"}>擅长: {item.skills ? item.skills : "暂无"}</div>
                </div>
                {item.appoint ? (
                  <div className={"doctorItem__right__icon"}>
                    <img className={"doctorItem__icon"} src={ico_doctor_status_h}/>
                  </div>
                ) : (
                  <div className={"doctorItem__right__icon"}>
                    <img className={"doctorItem__icon"} src={ico_doctor_status}/>
                  </div>
                )}
              </li>
            );
          })}
        </div>
      </ul>
    );
  }

  /**
   * 画头像
   * @param data
   * @returns {*}
   */
  drawReact(data) {
    let str = data[data.length - 1];
    return <div className={"avatar_txt"}>{str}</div>;
  }

  /**
   * 跳转页面:
   * @param data
   */
  handelPageNav(data) {
    let {params:{type}} =  this.props.match
    let path = {
      pathname: `/doctor/${type}`,
      state: {
        doctorInfo: data,
        seeDate: this.props.seeDate,
        deptInfo: { ...this.props.match.params }
      }
    };
    this.props.history.push(path);
  }

  componentDidMount() {
    this.bscroll = new Bscroll(this.refs.doctorItem, {
      mouseWheel: true,
      probeType: 3,
      click: true,
      tap: true,
      bounce: {
        top: true,
        bottom: true
      }
    });
  }
}

export default withRouter(DoctorItem);
