/**
 * Class: DoctorTabs
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *   门诊医生列表Tabs-过滤条件
 */
import React, { Component } from "react";
import Reservaes from "@containers/DoctorList/Components/Reserva/Reservaes";
import { DOCTORTABKAY } from "@api/Constant";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as doctorTabActions, getTabs, getActionTabKey } from "@reduxs/modules/doctorTabs";
//样式
import "./style.less";


class DoctorTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  /**
   * 点击切换Tab
   * @param key
   */
  onChangeTab(key) {
    const { doctorTabActions: { changeTab } ,doChangeTab} = this.props;
    changeTab(key,()=>{
        doChangeTab(key)
    })
  }


  /**
   * 渲染顶部tab
   */
  renderTabs() {
    const { tabs, actionTabKey } = this.props;
    let aray = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + " item";
      if (item.key === actionTabKey) {
        cls += " current";
      }

      aray.push(
        <div className={cls} key={item.key} onClick={() => this.onChangeTab(item.key)}>
          {item.text}
        </div>);
    }

    return aray;
  }


  /**
   * 渲染日期过滤条件tab
   */
  renderFilterTab() {
    const { filters, actionTabKey,filterItemClick,CalendarPaneliShow,filterMoreItem} = this.props;
    let cls = "reservaes";
    if (actionTabKey === DOCTORTABKAY.date) {
      cls += " current";
    }
    return (
      <div className={cls}>
        <Reservaes
          reservations={filters}
          filterItemClick={filterItemClick}
          filterMoreClick={CalendarPaneliShow}
          filterMore={filterMoreItem}/>
      </div>
    );
  }


  render() {
    return (
      <div className={"doctorTabs"}>
        <div className={"tab_header border-bottom"}>
          {this.renderTabs()}
        </div>
        {this.renderFilterTab()}
      </div>
    );
  }


  componentWillUnmount(){
    const {doctorTabActions:{iniActionKey}} = this.props
    iniActionKey()
  }

}


const mapStateToProps = state => {
  return {
    tabs: getTabs(state),
    actionTabKey: getActionTabKey(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doctorTabActions: bindActionCreators(doctorTabActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorTabs);