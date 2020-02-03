import React, { Component } from "react";
import "./style.less";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";
import {
    actions as reportExamineActions,
    getFetchingStatus,
    getReportExamineData,
    getReportExaminePic
} from "@reduxs/modules/reportExamine";


class ReportExamine extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { history } = this.props;
        if (history.action === "PUSH") {
            this.props.reportExamineActions.loadReportExamine(this.props.hosId, this.props.reportData, this.props.perId);
        }
    }

    componentWillUnmount() {
        const { history } = this.props;
        if (history.action !== "PUSH") {
            setTimeout(() => this.props.reportExamineActions.reset(), 200);
        }
    }

    btnClick() {
        const { history } = this.props;
        this.props.reportExamineActions.loadReportExaminePic(this.props.hosId, this.props.reportData);
    }

    //下拉刷新
    pullingDownHandler = () => {
        this.props.pullingDownHandler();
    };

    render() {
        const {
            isFetching,
            checkresult
        } = this.props;
        return (
            <div className={"reportExamine"}>
                <SafeAreaView
                    showBar={true}
                    title={"检查报告"}
                    isRight={false}
                    handleBack={this.handleBack}
                >
                    <li
                        key={Examine.id}
                        className={"reportExamine__Examine border-bottom"}
                    >
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__title"}>
                                <span className={"row_title_title"}>{"报告单编号："}</span>
                            </div>
                            <div className={"Examine__info__title"}>
                                <span className={"row_title_detail"}>{this.props.reportData.LisNo}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: "#F5F5F9",
                                height: 1,
                                marginLeft: 20
                            }}
                        />
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"就诊人姓名"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{this.props.reportData.patientName}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"科室"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.deptName}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"检查类别名称"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.type}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"报告名称"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.reportName}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"检查结果"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.reportResult}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"检查描述"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.reportDescription}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: "#F5F5F9",
                                height: 1,
                                marginLeft: 20
                            }}
                        />
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"申请医生姓名"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.applyDocName}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"申请日期"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.applyDate}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"执行日期"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.exeDate}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"报告医生姓名"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.reportDocName}</span>
                            </div>
                        </div>
                        <div className={"reportExamine__Examine__info"}>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_title"}>{"报告日期"}</span>
                            </div>
                            <div className={"Examine__info__row"}>
                                <span className={"row_info_detail"}>{checkresult.reportDate}</span>
                            </div>
                        </div>
                        <div className={'reportExamine__btnContainer'} hidden={checkresult.isReportImg !== "是"}>
                            <button className={'reportExamine__btn'} onClick={() => this.btnClick()}>
                                {'查看检查图片'}
                            </button>
                        </div>
                        {/*是否显示LoadingMask*/}
                        {isFetching ? <LoadingMask /> : null}
                    </li>
                </SafeAreaView>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fetchingStatus: getFetchingStatus(state),
        checkresult: getReportExamineData(state),
        examinepic: getReportExaminePic(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reportExamineActions: bindActionCreators(reportExamineActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportExamine);
