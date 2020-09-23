/**
 * 门诊缴费列表组件。包括下拉刷新和显示列表项
 * By WF 2020-01-02
 */
import React, {Component} from "react";
import ScrollView from "@baseUI/ScrollView/scroll";
import OutpatientPaymentItem from '../../components/OutpatientPaymentItem/OutpatientPaymentItem'
//Redux
import {
    getOutpatientPaymentList,
    getFetchingStatus,
    getIsLastPage
} from "@reduxs/modules/outpatientPayment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
//样式
import "./style.less";


class OutpatientPaymentContent extends Component {

    /**
     * 下拉刷新
     */
    pullDownFresh = () => {
        // const {
        //   hospitalActions: { pullDownFresh }
        // } = this.props;
        //
        // return new Promise((resolve, reject) => {
        //   pullDownFresh().then(response => {
        //     resolve();
        //   });
        // });
    };

    /**
     * 上啦加载更多
     */
    pullUpLoadMore = () => {
        // const {
        //   iLastPage, hospitalActions: { pullUpLoadMore }
        // } = this.props;
        //
        // return new Promise((resolve, reject) => {
        //   if (iLastPage) {
        //     resolve();
        //     return
        //   }
        //   pullUpLoadMore().then(response => {
        //     resolve();
        //   });
        // });

    };

    renderItems() {
        const {outpatientPaymentList} = this.props
        console.log('OutpatientPaymentContent this.props')
        console.group(this.props)
        // let outpatientPaymentTestList=[{'testK':'testV'},{'testK':'testV'}]
        return outpatientPaymentList.map((item, index) => {
            return <OutpatientPaymentItem
                {...this.props}
                itemData={item}
                key={index}
            />;
        });
    }

    render() {
        const {outpatientPaymentList, fetchingStatus, isLastPage} = this.props
        return (
            <div className={"outpatientPayment-content"}>
                <ScrollView
                    pullDownRefresh
                    doPullDownFresh={this.pullDownFresh}
                    pullUpLoad
                    fetchingStatus={fetchingStatus}
                    pullUpLoadMoreData={this.pullUpLoadMore}
                    click={true}
                    isLastPgae={isLastPage}//是不是最后一页
                    data={outpatientPaymentList}
                    emptyTxt={'未查询到您的待缴费信息'}
                    isPullUpTipHide={false}>
                    <ul className={'outpatientPayment-ul'}>
                        <div className={'outpatientPayment-hint'}>待缴费列表</div>
                        {this.renderItems()}
                    </ul>
                </ScrollView>
            </div>
        );
    }

    componentDidMount() {
        // const {
        //   hospitalActions: { iniHosiList, reset }
        // } = this.props;
        // reset();
        // iniHosiList();
    }

    componentWillUnmount() {
    }
}

const mapStateToProps = state => {
    return {
        outpatientPaymentList: getOutpatientPaymentList(state),
        fetchingStatus: getFetchingStatus(state),
        isLastPage: getIsLastPage(state),
    };
};

const mapDispatchToProps = dispatch => {
    // return {
    //   hospitalActions: bindActionCreators(hospitalActions, dispatch)
    // };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutpatientPaymentContent);
