/**
 * Class: ClinicContainer
 * Author: wufei
 * Date: 2019/5/31
 * Description:
 *    首页->医院列表->科室选择
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingMask from "@components/Loading/LoadingMask";
import { Icon } from "antd-mobile";
import Bscroll from "better-scroll";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./DivisionContainer.less";
import {
  actions as divisionActions,
  getFetchingStatus,
  getHostId,
  getDivisionList,
  getDepartmentList
} from "@reduxs/modules/division";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

class DivisionContainer extends Component {

  render() {
    const { name } = this.props.match.params;
    const { divisionList, departmentList } = this.props;
    return (
      <SafeAreaView showBar={true} title={name} isRight={false} handleBack={this.handleBack}>
        <div className={"clinic"}>
          <div className={"clinic__bar "}>
            <div>进入医院主页</div>
            <Icon className={"clinic__bar__icon"} type={"right"}/>
          </div>
          <div className={"clinic__container"}>
            <ul className={"clinic__left"} ref={"clinic__left"}>
              <div>
                {divisionList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={item.isSel ? "clinic__left__item  item_sel" : "clinic__left__item border-bottom"}
                      onClick={() => this.leftItemClick(item)}>
                      {item.name}
                    </li>
                  );
                })}
              </div>
            </ul>
            <div className={"clinic__right"} ref={"clinic__right"}>
              <ul>
                <div>
                  {departmentList.map(item => {
                    return (
                      <Link to={`/doctorList/${item.id}/${item.name}`} key={item.id}>
                        <li className={"clinic__right__item"}>{item.name}</li>
                      </Link>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
          <LoadingMask/>
        </div>
      </SafeAreaView>

    );
  }

  componentDidMount() {
    const { history } = this.props;
    this.scroll = new Bscroll(this.refs.clinic__left, {
      scrollY: true,
      click: true
    });
    this.scroll = new Bscroll(this.refs.clinic__right, {
      scrollY: true,
      click: true
    });
    const { id } = this.props.match.params;
    this.props.divisionActions.loadDivisionList(id);
  }

  componentWillUnmount() {
    const {
      divisionActions: { reset }
    } = this.props;
    reset();
  }

  leftItemClick(item) {
    this.props.divisionList.map(oldItem => {
      if (oldItem.id === item.id) {
        oldItem.isSel = true;
      } else {
        oldItem.isSel = false;
      }
    });
    const { id } = this.props.match.params;
    this.props.divisionActions.loadDepartmentListByHostId(id, item.id);
  }

  handleBack = () => {
    this.props.history.goBack();
  };
}

const mapStateToProps = state => {
  return {
    hosid: getHostId(state),
    fetchingStatus: getFetchingStatus(state),
    divisionList: getDivisionList(state),
    departmentList: getDepartmentList(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    divisionActions: bindActionCreators(divisionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionContainer);
