/**
 * Class:
 * Author: wufei
 * Date: 2019/5/26
 * Description:  tabs 选择器
 *  医院列表
 */
import React, { Component } from "react";
import { ZHPX, SX, TABKAY } from "@api/Constant";
//Util
import { fixedBody, looseBody } from "@utils/fixRollingPenetration";
//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as tabActions, getTabs, getAreasList, getActionKey, getClosePanel } from "@reduxs/modules/tabs";

//样式
import "./tabs.less";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  /**
   *  变化当前点击的item状态 同时filter 请求
   * @param item  当前选中的元素
   * @param key   哪个tab是选中状态
   */
  changeDoFilter(item, key, event) {
    const { tabActions: { changeFilter } } = this.props;
    changeFilter(item, key);
    event.stopPropagation()
  }

  /**
   * 点击切换Tab
   * @param key
   */
  onChangeTab(key) {
    const { actionKey } = this.props;
    let closePanel = false;
    //如果前后点击的是同一个tab 就关闭panel
    if (actionKey === key && !this.props.closePanel) {
      closePanel = true;
    }

    closePanel ? looseBody() : fixedBody();

    const { tabActions: { changeTab } } = this.props;
    changeTab(key, closePanel);
  }

  /**
   * 渲染顶部tab
   */
  renderTabs() {
    const { tabs, actionKey, closePanel } = this.props;
    //---------
    if (!closePanel) {
      fixedBody();
    } else {
      looseBody();
    }
    //---------

    let aray = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + " item";
      if (item.key === actionKey && !closePanel) {
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
   * 全部区域
   * @returns {*}
   */
  renderAreaContent() {
    const { areasList } = this.props;
    return areasList.map((item, index) => {
      let cls = item.active + " area-item";
      return (
        <li key={index} className={"area-item"} onClick={(e) => this.changeDoFilter(item, TABKAY.AREA, e)}>
          {item.name}
        </li>
      );
    });
  }


  /**
   * 全部排序
   * @returns {any[]}
   */
  renderSORTContent() {
    let sortList = ZHPX;
    return sortList.map((item, index) => {
      let cls = item.action ? "type-item active" : "type-item";

      return (
        <li key={index} className={cls} onClick={(e) => this.changeDoFilter(item, TABKAY.SORT,e)}>
          {item.name}
        </li>
      );
    });
  }


  /**
   * 筛选
   * @returns {*}
   */

  renderFilterInnerContent(items/*filterList*/) {
    return items.map((item, index) => {
      let cls = "cate-box-inner";
      if (item.action) {
        cls += " action";
      }

      return (
        <div key={index} className={"cate-box"} onClick={(e) => this.changeDoFilter(item, TABKAY.FILTER,e)}>
          <div className={cls}>
            {item.name}
          </div>
        </div>
      );
    });

  }

  renderFILTERContent() {
    let filterList = SX;
    return filterList.map((item, index) => {
      return (
        <li key={index} className={"filter-item"}>
          <p className={"filter-title"}>{index == 0 ? `医院类型: ${item.groupTitle}` : `医院等级: ${item.groupTitle}`}</p>
          <div className={"item-content"}>
            {this.renderFilterInnerContent(item.items, filterList)}
          </div>
        </li>
      );
    });
  }

  /**
   * 渲染过滤面板
   */
  renderContent() {
    const { tabs, actionKey } = this.props;
    let array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + "-panel";
      if (item.key === actionKey) {
        cls += " current";
      }

      // 全部区域
      if (item.key === TABKAY.AREA) {
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderAreaContent()}
          </ul>
        );
      } else if (item.key === TABKAY.SORT) {
        // 综合排序
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderSORTContent()}
          </ul>
        );
      } else if (item.key === TABKAY.FILTER) {
        // 筛选
        array.push(
          <ul key={item.key} className={cls}>
            {this.renderFILTERContent()}
          </ul>
        );
      }

    }

    return array;
  }


  render() {

    const { closePanel,} = this.props;
    let cls = "panel";


    if (!closePanel) {
      cls += " show";
    } else {
      cls = "panel";
    }

    return (
      <div className={"tab-header"}>
        <div className={"tab-header-top border-bottom"}>
          {this.renderTabs()}
        </div>
        <div className={cls} onClick={() => {

        }} id="panel">
          <div className={"panel-inner"}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }


  close() {
    this.setState({
      tabMaskIsSHow: false
    });
  }


  componentDidMount() {
    const { areasList, tabActions: { loadAreas } } = this.props;
    if (areasList && areasList.length !== 1) {
      return;
    }
    loadAreas();

  }
}

const mapStateToProps = state => {
  return {
    areasList: getAreasList(state),
    tabs: getTabs(state),
    actionKey: getActionKey(state),
    closePanel: getClosePanel(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tabActions: bindActionCreators(tabActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
