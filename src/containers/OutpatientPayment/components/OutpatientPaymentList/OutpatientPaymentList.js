/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 * scrollTop + clientHeight >= scrollHeight(当页面没有滚动时scrollheight是不存在当 只有body的高度超过clientHeight时才会出现)
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
//没封装之前

import { withRouter } from "react-router-dom";
//图标
import icon_sj from "@assets/images/Home/三甲图标IOS.png";
import icon_bg from "@assets/images/Home/报告图标IOS.png";
import icon_zh from "@assets/images/Home/综合图标IOS.png";
import icon_yy from "@assets/images/Home/预约图标IOS.png";
//样式
import "./style.less";

class OutpatientPaymentList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isend: false//标示页面是否可以滚动
    // };
    //记录当前页码
    this.page = 0;
  }


  render() {
    const { data } = this.props;
    if(data){

    }else{
      return (
        <div className={'outpatientPaymentList_content'}>
          <div className={'outpatientPaymentList_zero_title'}>代缴费列表</div>
          <div className={'outpatientPaymentList_zero_content'}>
            <img className={'outpatientPaymentList_zero_content_img'} src={''}/>
            <div className={'outpatientPaymentList_zero_content_txt'}>未查到您的缴费信息</div>
          </div>
        </div>
      );
    }
    return (
      <div className={"hospitalsItem_wrapper"}>
        <div className={"scroll-wrapper"}>
          {data.map((item, index) => {
            return (
              <Link to={`/division/${item.id}/${item.name}`} key={index}>
                <li className="hospitalsItem__con border-topbottom">
                  <div className="hospitalsItem__title">{item.name}</div>
                  <div className="hospitalsItem__middle">
                    <div className={"hospitalsItem__middle__item"}>
                      <img src={icon_sj} alt="" className={"hospitalsItem__middle__icon"}/>
                      <span className={"hospitalsItem__middle__innerTxt"}>{item.hosGradeShortName}</span>
                    </div>
                    <div className={"hospitalsItem__middle__item"}>
                      <img src={icon_zh} alt="" className={"hospitalsItem__middle__icon"}/>
                      <span className={"hospitalsItem__middle__innerTxt"}>{item.hosCategory}</span>
                    </div>
                    {item.regOpened ? (
                      <div className={"hospitalsItem__middle__item"}>
                        <img src={icon_yy} alt="/" className={"hospitalsItem__middle__icon"}/>
                        <span className={"hospitalsItem__middle__innerTxt"}>可预约</span>
                      </div>
                    ) : null}
                    {item.reportOpened ? (
                      <div className={"hospitalsItem__middle__item"}>
                        <img src={icon_bg} className={"hospitalsItem__middle__icon"} alt=""/>
                        <span className={"hospitalsItem__middle__innerTxt"}>查报告</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="hospitalsItem__address">地址：{item.address}</div>
                </li>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.body.scrollHeight;
      let scrollTop = document.documentElement.scrollTop;
      let proLoadDis = 80;
      if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
        this.page++;
        if (this.page > 1) {
          this.setState({
            isend: true
          });
        } else {
          this.props.pullingUpHandler();
        }


      }
    }


  componentDidMount() {
    window.addEventListener("scroll", () => this.onLoadPage());
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.onLoadPage());
  }

}

export default withRouter(OutpatientPaymentList);
