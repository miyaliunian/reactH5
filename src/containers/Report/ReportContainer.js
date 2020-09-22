import React, { Component } from "react";
import { Link } from "react-router-dom";
import CategoryHosList from "@components/CategoryHosList/CategoryHosList";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import { Icon } from "antd-mobile";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as bindCardActions,
  getBindCardList
} from "@reduxs/modules/bindCard";
import {
  getFetchingStatus,
  getSelHospitalization,
  getReportList,
  actions as reportActions
} from "@reduxs/modules/report";

import "./style.less";
import LoadingMask from "@components/Loading/LoadingMask";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import ReportItem from "@containers/Report/components/ReportItem/ReportItem";

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalHospitalization: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bindCardList !== this.props.bindCardList) {
      let perObj = nextProps.bindCardList.filter(item => item.def);
      this.props.reportActions.getRegedListByOpenType("report", perObj[0]);
    }
  }

  render() {
    const {
      fetchingStatus,
      bindCardList,
      hospitalizationSel,
      reportList
    } = this.props;
    return (
      <div className={"report"}>
        <SafeAreaView
          showBar={true}
          title={"报告查询"}
          isRight={false}
          handleBack={this.handleBack}
        >
          {/*-------------------------选择成员信息*/}
          <BindCardItem
            data={bindCardList}
            isRefresh={this.refresh}
            callBack={data => this.refreshCallBack(data)}
          />
          {/*-------------------------选择医院*/}
          <div
            className={"report_hospitalization border-bottom"}
            onClick={() => {
              this.setState({ openModalHospitalization: true });
            }}
          >
            <span className={"report_hospitalization_text_Style"}>
              就诊医院
            </span>
            <div className={"hospitalization_right"}>
              <span className={"hospitalization_right_text_Style"}>
                {hospitalizationSel
                  ? hospitalizationSel.aliasName
                  : "请选择医院"}
              </span>
              <Icon className={"clinic__bar__icon"} type={"right"} />
            </div>
          </div>
          <Modal
            BackdropProps={{ "background-color": "red" }}
            open={this.state.openModalHospitalization}
          >
            <CategoryHosList
              bindCardList={bindCardList}
              onNavBack={() => this.handelModalHospitalization()}
              callBack={data => this.refreshReportList(data)}
            />
          </Modal>
          {/*是否显示报告信息*/}
          {reportList.length != 0 ? (
            <ReportItem
              data={reportList}
              fetchingStatus={fetchingStatus}
              pullingDownHandler={() => this.pullingDownHandler()}
              {...this.props}
            />
          ) : (
            <div className={"report_empty"}>
              <span className={"row_content"}>未查询到您的报告</span>
            </div>
          )}

          {/*是否显示LoadingMask*/}
          {fetchingStatus ? <LoadingMask /> : null}
        </SafeAreaView>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  handelModalHospitalization = () => {
    this.setState({ openModalHospitalization: false });
  };

  componentDidMount() {
    const { history } = this.props;
    if (history.action === "PUSH") {
      this.props.bindCardActions.loadList();
    }
  }

  componentWillUnmount() {
    const { history } = this.props;
    if (history.action !== "PUSH") {
      setTimeout(() => this.props.reportActions.setHospNUll(), 200);
    }
  }

  //下拉刷新
  pullingDownHandler() {
    this.refreshReportList(this.props.hospitalizationSel);
  }

  //重新选择家庭成员后刷新数据
  refreshCallBack(data) {
    const { hospitalizationSel } = this.props;
    this.props.reportActions.refreshReportListByOpenType(
      hospitalizationSel,
      data
    );
  }

  //重新选择医院后刷新数据
  refreshReportList(data) {
    const { bindCardList } = this.props;
    let bindCardObj = bindCardList.filter(item => item.def);
    this.props.reportActions.refreshReportListByOpenType(data, bindCardObj[0]);
    this.setState({
      openModalHospitalization: false
    });
  }
}

const mapStateToProps = state => {
  return {
    bindCardList: getBindCardList(state),
    fetchingStatus: getFetchingStatus(state),
    hospitalizationSel: getSelHospitalization(state),
    reportList: getReportList(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bindCardActions: bindActionCreators(bindCardActions, dispatch),
    reportActions: bindActionCreators(reportActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
