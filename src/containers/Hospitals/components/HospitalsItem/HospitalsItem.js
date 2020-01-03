/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
//没封装之前
import Bscroll from "better-scroll";

import { withRouter } from "react-router-dom";
//图标
import icon_sj from "@assets/images/Home/三甲图标IOS.png";
import icon_arr from "@assets/images/other/arr.png";
import icon_bg from "@assets/images/Home/报告图标IOS.png";
import icon_zh from "@assets/images/Home/综合图标IOS.png";
import icon_yy from "@assets/images/Home/预约图标IOS.png";
//样式
import "./style.less";
import { PullDownWrapper, IconWrapper } from "./style";
import { Icon } from "antd-mobile";

class HospitalsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulldownMsg: "下拉刷新",
      pulldownIsShow: false,
      showLoadingIcon:false
    };
  }

  componentDidMount() {
    this.bscroll = new Bscroll(this.refs.hospitalListWrapper, {
      mouseWheel: true,
      probeType: 3,
      click: true,
      tap: true,
      pullDownRefresh: {
        threshold: 50
        // stop: 40  // 默认40
      },
      pullUpLoad: {
        threshold: 80
      },
      bounce: {
        top: true,
        bottom: true
      }
    });
    this.bscroll.on("pullingDown", () => {
      console.log("pullingDown");
      setTimeout(() => {
        console.log("发送请求");
        setTimeout(() => {
          this.bscroll.finishPullDown();
          this.bscroll.refresh();
          setTimeout(()=>{
            this.setState({
              pulldownMsg: "下拉刷新",
              pulldownIsShow: false,
              showLoadingIcon: false
            });
          },500)
        }, 1500);
      }, 1500);
    });
    this.bscroll.on("scroll", pops => {
      // let top = Math.min(pops.y - 50 , 10)
      // this.refs.pulldownWrapper.style.display = "flex"
      // console.log("movingDirectionY",this.bscroll.movingDirectionY)
      // console.log("directionY",this.bscroll.directionY)



      if (pops.y > 50) {
        this.setState({
          pulldownMsg: "释放即可刷新...",
          showLoadingIcon: false
        });
      }



      if (this.bscroll.directionY == -1) {
        if (pops.y <=50) {
          this.setState({
            pulldownMsg: "加载中...",
            showLoadingIcon: true
          });
        }
      }
    });

    this.bscroll.on("touchEnd", (e)=>{
    });


    this.bscroll.on("pullingUp", this.props.pullingUpHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLastPage) {
      this.bscroll.refresh();
      this.bscroll.finishPullUp();
    }
    setTimeout(() => {
      if (!this.props.fetchingStatus) {
        this.setState({
          isShowRefreshHeader: false
        });
        this.bscroll.finishPullDown();
      }
    }, 200);
  }

  render() {
    const { data } = this.props;
    return (
      <div className={"hospitalsItem_wrapper"} ref={"hospitalListWrapper"}>
        <div className={"scroll-wrapper"}>
          <ul>
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
          </ul>
        </div>
        <PullDownWrapper isShow={this.state.pulldownIsShow}>
          <IconWrapper isShowLoadingIcon ={this.state.showLoadingIcon}>
            <Icon type={"loading"} size={"xs"}/>
          </IconWrapper>
          <span style={{ marginLeft: "5px", color: "#7b7b7b" }}>{this.state.pulldownMsg}</span>
        </PullDownWrapper>
      </div>
    );
  }

}

export default withRouter(HospitalsItem);
