import React, { Component } from "react";
import "./style.less";
import { withRouter } from "react-router-dom";
import { PullToRefresh, ListView } from "antd-mobile";

import icon_up from "@assets/images/Report/ico_report_arrow_high.png";
import icon_down from "@assets/images/Report/ico_report_arrow_low.png";
import icon_danger from "@assets/images/Report/ico_report_danger.png";

class ReportDetail extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {
            dataSource,
            refreshing: true,
            // isLoading: true,
            down: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            data: []
        };
    }

    componentDidMount() {
        const newheight = this.state.height - this.lv.offsetTop;
        this.setState({
            height: newheight,
            dataSource: this.state.dataSource.cloneWithRows(this.props.data)
        });
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (!this.props.fetchingStatus) {
                this.setState({
                    refreshing: false
                });
            }
        }, 200);

        if (nextProps.data !== this.props.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
            });
        }
    }

    componentDidUpdate() {
        document.body.style.overflow = "hidden";
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.pullingDownHandler();
    };

    //每一行数据
    renderRow(Detail) {
        let src = ""
        if (Detail.normalFlag === "1") {
            src = icon_up;
        } else if (Detail.normalFlag === "2") {
            src = icon_down;
        } else if (Detail.normalFlag === "3") {
            src = icon_danger;
        }
        return (
            <div className={"reportDetail"}>
                <ul>
                    <li
                        key={Detail.id}
                        className={"reportDetail__Detail border-bottom"}
                    >
                        <div className={"reportDetail__Detail__info"}>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_title"}>{Detail.itemName}</span>
                            </div>
                            <div className={"Detail__info__row"}>
                                <span className={"row_info_detail"}>
                                    {Detail.result}
                                    <img src={src} alt="" className={'reportDetail__Detail__icon'} hidden={src == ""}/>
                                </span>
                                <span className={"row_info_detail"}>
                                    {"参考值：" + Detail.range + " " + Detail.unit}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    separator() {
        return (
            <div
                style={{
                    backgroundColor: "#F5F5F9",
                    height: 10
                }}
            />
        );
    }

    render() {
        return (
            <div>
                <ListView
                    key={this.state.useBodyScroll ? "0" : "1"}
                    ref={el => (this.lv = el)}
                    dataSource={this.state.dataSource}
                    renderRow={item => this.renderRow(item)}
                    renderSeparator={this.separator}
                    useBodyScroll={this.state.useBodyScroll}
                    pullToRefresh={
                        <PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
            </div>
        );
    }

    pullingDownHandler = () => {
        this.props.pullingDownHandler();
    };

}

export default withRouter(ReportDetail);
