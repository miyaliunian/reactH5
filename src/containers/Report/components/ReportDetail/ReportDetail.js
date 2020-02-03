import React, { Component } from "react";
import "./style.less";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import ReportDetailItem from "@containers/Report/components/ReportDetailItem/ReportDetailItem";
import LoadingMask from "@components/Loading/LoadingMask";
import {
    actions as reportDetailActions,
    getFetchingStatus,
    getReportDetailData
} from "@reduxs/modules/reportDetail";

class ReportDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { history } = this.props;
        if (history.action === "PUSH") {
            this.props.reportDetailActions.loadReportDetail(this.props.hosId, this.props.reportData, this.props.perId);
        }
    }

    componentWillUnmount() {
        const { history } = this.props;
        if (history.action !== "PUSH") {
            setTimeout(() => this.props.reportDetailActions.reset(), 200);
        }
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
            <div className={"reportDetail"}>
                <SafeAreaView
                    showBar={true}
                    title={"检验报告单"}
                    isRight={false}
                    handleBack={this.handleBack}
                >
                    <li
                        key={Detail.id}
                        className={"reportDetail__Detail border-bottom"}
                    >
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_title"}>{this.props.hosName}</span>
                            </div>
                            <div className={"Detail__info__row"}>
                            </div>
                        </div>
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_title"}>{this.props.reportData.patientName}</span>
                            </div>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_detail"}>{this.props.reportData.sampleDate}</span>
                            </div>
                        </div>
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_title"}>{"检验单号"}</span>
                            </div>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_detail"}>{this.props.reportData.LisNo}</span>
                            </div>
                        </div>
                        {checkresult.length != 0 ? (
                            <ReportDetailItem
                                data={checkresult}
                                fetchingStatus={fetchingStatus}
                                pullingDownHandler={() => this.pullingDownHandler()}
                                {...this.props}
                            />
                        ) : (
                            <div className={"report_empty"}>
                                <span className={"row_content"}>{"未查询到您的报告详情"}</span>
                            </div>
                        )}
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row2"}>
                                <span className={"row_info_title2"}>{"送检医生" + this.props.reportData.doctName}</span>
                            </div>
                            <div className={"Detail__info__row2"}>
                                <span className={"row_info_detail2"}>{"送检日期" + this.props.reportData.lisTime}</span>
                            </div>
                        </div>
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row2"}>
                                <span className={"row_info_title2"}>{"检验员\u3000" + this.props.reportData.lisDoctName}</span>
                            </div>
                            <div className={"Detail__info__row2"}>
                            </div>
                        </div>
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row2"}>
                            </div>
                            <div className={"Detail__info__row2"}>
                                <span className={"row_info_detail2"}>{"*数据仅供参考，结果以医院实际数据为准"}</span>
                            </div>
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
        checkresult: getReportDetailData(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reportDetailActions: bindActionCreators(reportDetailActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
