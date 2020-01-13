/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 * scrollTop + clientHeight >= scrollHeight(当页面没有滚动时scrollheight是不存在当 只有body的高度超过clientHeight时才会出现)
 */
import React, { Component } from "react";
import HospitalsItem from "../HospitalsItem/HospitalsItem";
import ScrollView from "@baseUI/ScrollView/scroll";
//Redux
import {
  actions as hospitalActions,
  getFetchingStatus,
  getHospitalList,
  getIsLastPage
} from "@reduxs/modules/hospital";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//样式
import "./hosiContentList.less";


class HosiContentList extends Component {

  /**
   * 下拉刷新
   */
  pullDownFresh = () => {
    const {
      hospitalActions: { pullDownFresh }
    } = this.props;

    return new Promise((resolve, reject) => {
      pullDownFresh().then(response => {
        resolve();
      });
    });
  };

  /**
   * 上啦加载更多
   */
  pullUpLoadMore = () => {
    const {
      iLastPage, hospitalActions: { pullUpLoadMore }
    } = this.props;

    return new Promise((resolve, reject) => {
      if (iLastPage) {
        resolve();
        return
      }
      pullUpLoadMore().then(response => {
        resolve();
      });
    });

  };

  renderItems() {
    const { hospitalList } = this.props;
    {
      return hospitalList.map((item, index) => {
        return <HospitalsItem itemData={item} key={index}/>;
      });
    }
  }

  render() {
    return (
      <div className={"hosi-content"}>
        <ScrollView
          pullDownRefresh
          doPullDownFresh={this.pullDownFresh}
          pullUpLoad
          pullUpLoadMoreData={this.pullUpLoadMore}
          click={true}
          isPullUpTipHide={false}>
          <ul>
            {this.renderItems()}
          </ul>
        </ScrollView>
      </div>
    );
  }

  componentDidMount() {
    const {
      hospitalActions: { iniHosiList, reset }
    } = this.props;
    reset();
    iniHosiList();
  }

  componentWillUnmount() {
  }
}

const mapStateToProps = state => {
  return {
    hospitalList: getHospitalList(state),
    fetchingStatus: getFetchingStatus(state),
    iLastPage: getIsLastPage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hospitalActions: bindActionCreators(hospitalActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HosiContentList);
