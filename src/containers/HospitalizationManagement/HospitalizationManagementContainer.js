/**
 * Class: HospitalizationManagementContainer
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *  住院管理
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CategoryHosList from "@components/CategoryHosList/CategoryHosList";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import { Icon } from "antd-mobile";
import Modal from "@material-ui/core/Modal";

import "./style.less";
import LoadingMask from "@components/Loading/LoadingMask";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as bindCardActions,
  getBindCardList
} from "@reduxs/modules/bindCard";
import {
  getFetchingStatus,
  getSelHospitalization,
  getHospitalDetails,
  actions as hospitalizationManagementActions
} from "@reduxs/modules/hospitalizationManagement";

class HospitalizationManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalHospitalization: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bindCardList !== this.props.bindCardList) {
      let perObj = nextProps.bindCardList.filter(item => item.isSel);
      this.props.hospitalizationManagementActions.getRegedListByOpenType(
        "inPrePay",
        perObj[0]
      );
    }
  }

  render() {
    const { bindCardList, hospitalizationSel, hospitalDetails } = this.props;
    return (
      <div className={"hospitalizationManagement"}>
        <SafeAreaView
          showBar={true}
          title={"住院服务"}
          isRight={false}
          handleBack={this.handleBack}
        >
          {/*-------------------------选择成员信息*/}
          <BindCardItem
            data={bindCardList}
            isRefresh={this.refresh}
            callBack={this.refreshCallBack}
          />
          {/*-------------------------选择医院*/}
          <div
            className={
              "hospitalizationManagement_hospitalization border-bottom"
            }
            onClick={() => {
              this.setState({ openModalHospitalization: true });
            }}
          >
            <span
              className={"hospitalizationManagement_hospitalization_text_Style"}
            >
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
              callBack={data => this.refreshHospitalDetail(data)}
            />
          </Modal>

          {/*是否显示住院信息*/}
          {hospitalDetails && (hospitalDetails.totCost !== 0  && hospitalDetails.totCost !== '') ? (
            <div className={"hospitalizationManagement_hospitalization_info"}>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>住院号</span>
                <span className={"row_info_detail"}>
                  {hospitalDetails.inHosNo}
                </span>
              </div>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>入院时间</span>
                <span className={"row_info_detail"}>
                  {hospitalDetails.inHosDate}
                </span>
              </div>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>科室</span>
                <span className={"row_info_detail"}>
                  {hospitalDetails.deptName}
                </span>
              </div>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>床号</span>
                <span className={"row_info_detail"}>
                  {hospitalDetails.bedNo}
                </span>
              </div>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>总费用</span>
                <span className={"row_info_detail"} style={{ color: "orange" }}>
                  ￥{hospitalDetails.totCost}
                </span>
              </div>
              <div className={"hospitalization__row"}>
                <span className={"row_info_title"}>剩余预交金</span>
                <span className={"row_info_detail"}>
                  ￥{hospitalDetails.account}
                </span>
              </div>
            </div>
          ) : null}

          {/*是否显示：底部列表*/}
          {hospitalDetails &&   (hospitalDetails.totCost !== 0  && hospitalDetails.totCost !== '') ? (
            <div style={{ marginTop: "10px" }}>
              <Link
                className={
                  "hospitalizationManagement_bottomListRow border-bottom"
                }
                to={`/makeUpAdvancePayment/${hospitalDetails.name}/${hospitalDetails.inHosNo}`}
              >
                <span>补缴预交金</span>
                <Icon className={"clinic__bar__icon"} type={"right"} />
              </Link>
              <Link
                className={
                  "hospitalizationManagement_bottomListRow border-bottom"
                }
                to={`/historyAdvancePayment/${hospitalizationSel.id}/${hospitalDetails.inHosNo}`}
              >
                <span>缴纳预交金查询</span>
                <Icon className={"clinic__bar__icon"} type={"right"} />
              </Link>
              <Link
                className={
                  "hospitalizationManagement_bottomListRow border-bottom"
                }
                to={`/dailyListQueryPayment/${hospitalizationSel.id}/${hospitalDetails.inHosNo}`}
              >
                <span>一日清单查询</span>
                <Icon className={"clinic__bar__icon"} type={"right"} />
              </Link>
            </div>
          ) : null}

          <LoadingMask />
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
    const {
      history,
      bindCardActions: { loadList }
    } = this.props;
    if (history.action === "PUSH") {
      // loadList();
    }

    loadList();
  }

  componentWillUnmount() {
    const {
      history,
      hospitalizationManagementActions: { setHospNUll }
    } = this.props;
    if (history.action !== "POP") {
      setTimeout(() => setHospNUll(), 200);
    }
  }

  //重新选择家庭成员后重新刷新数据
  refreshCallBack=(data)=> {
    console.log(data)
    const {
      hospitalizationManagementActions: { refreshRegedListByOpenType },
      hospitalizationSel
    } = this.props;
    refreshRegedListByOpenType("inPrePay", hospitalizationSel, data);
  }

  //重新选择医院后重新刷新数据
  refreshHospitalDetail(data) {
    const {
      hospitalizationManagementActions: { refreshRegedListByOpenType },
      bindCardList
    } = this.props;
    let bindCardObj = bindCardList.filter(item => item.def);
    refreshRegedListByOpenType("inPrePay", data, bindCardObj[0]);
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
    hospitalDetails: getHospitalDetails(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bindCardActions: bindActionCreators(bindCardActions, dispatch),
    hospitalizationManagementActions: bindActionCreators(
      hospitalizationManagementActions,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalizationManagementContainer);
