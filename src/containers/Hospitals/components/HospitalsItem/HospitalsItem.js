/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 * scrollTop + clientHeight >= scrollHeight(当页面没有滚动时scrollheight是不存在当 只有body的高度超过clientHeight时才会出现)
 */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactPullLoad, { STATS } from "react-pullload";
//图标
import icon_sj from "@assets/images/Home/三甲图标IOS.png";
import icon_bg from "@assets/images/Home/报告图标IOS.png";
import icon_zh from "@assets/images/Home/综合图标IOS.png";
import icon_yy from "@assets/images/Home/预约图标IOS.png";
//样式
import "./style.less";
import "@assets/less/ReactPullLoad.less";


const loadMoreLimitNum = 2;

const cData = [
  "http://img1.gtimg.com/15/1580/158031/15803178_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803179_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803181_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803182_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803183_1200x1000_0.jpg"
];

class HospitalsItem extends Component {
  constructor() {
    super();
    this.state = {
      hasMore: true,
      data: cData,
      action: STATS.init,// 默认状态
      index: loadMoreLimitNum //loading more test time limit
    };
  }

  handleAction = (action) => {
    console.log(action)
    // console.info(action, this.state.action, action === this.state.action);
    if (action === this.state.action ||
      action === STATS.refreshing && this.state.action === STATS.loading ||
      action === STATS.loading && this.state.action === STATS.refreshing) {
      return false;
    }

    if (action === STATS.refreshing) {
      //下拉刷新手指松开时 执行
      console.log("刷新");
      // setTimeout(() => {
      //   //refreshing complete
      //   this.setState({
      //     data: cData,
      //     hasMore: true,
      //     action: STATS.refreshed,
      //     index: loadMoreLimitNum
      //   });
      // }, 500);
      this.handelDown()
    } else if (action === STATS.loading) {//加载更多
      console.log("加载更多");
      this.setState({
        hasMore: true
      });
      setTimeout(() => {
        if (this.state.index === 0) {
          this.setState({
            action: STATS.reset,
            hasMore: false
          });
        } else {
          this.setState({
            data: [...this.state.data, cData[0], cData[0]],
            action: STATS.reset,
            index: this.state.index - 1
          });
        }
      }, 3000);
    }

    //DO NOT modify below code
    this.setState({
      action: action
    });
  };



  handelDown(){
    setTimeout(() => {
      this.setState({
        hasMore: true,
        action: STATS.refreshed,
        index: loadMoreLimitNum
      });
    }, 1000);
  }


  render() {
    const {hasMore,action} = this.state;
    const { data } = this.props;
    return (
      <div>
        <ReactPullLoad
          downEnough={50}
          action={action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          style={{ paddingTop:40}}
          distanceBottom={1000}>
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
        </ReactPullLoad>
      </div>
    );
  }
}

export default withRouter(HospitalsItem);
