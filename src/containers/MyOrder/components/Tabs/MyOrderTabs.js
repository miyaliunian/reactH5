/**
 * 我的订单页tab
 */
import React, {Component} from "react";
import {MYORDERTABKAY} from "@api/Constant";
//Redux
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as myOrderTabActions,
    getTabs,
    getActionTabKey,
    getRegisterList,
    getOutpatientList,
    getFetchingStatus,
    getIsRegisterLastPage,
    getIsOutpatientLastPage
} from "@reduxs/modules/myOrderTabs";
import MyOutpatientPaymentItem from '../../components/MyOutpatientPaymentItem/MyOutpatientPaymentItem'
import MyRegisterItem from '../../components/MyRegisterItem/MyRegisterItem'

//样式
import {Tab, TabItem, Wrapper} from './style'
import ScrollView from "@baseUI/ScrollView/scroll";

class MyOrderTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selTab: 'register',
            registerPageno: 1,  // 挂号:用于翻页
            outpatientPageno: 1 // 门诊缴费:用于翻页
        };
    }


    /**
     * 点击切换Tab
     * @param key
     */
    onChangeTab(key) {
        const {myOrderTabActions: {changeTab}} = this.props;
        changeTab(key)
    }


    /**
     * 渲染顶部tab
     */
    renderOrderTabs() {
        const {tabs, actionTabKey} = this.props;
        let aray = [];
        for (let key in tabs) {
            let item = tabs[key];
            let cls = '';
            if (item.key === actionTabKey) {
                cls += " current";
            }
            aray.push(
                <TabItem className={cls} key={item.key} onClick={() => this.onChangeTab(item.key)}>
                    {item.text}
                </TabItem>);
        }

        return aray;
    }

    /**
     * 下拉刷新预约挂号
     */
    pullDownRegister = () => {
        const {
            myOrderTabActions: {pullDownFreshRegister}
        } = this.props

        return new Promise((resolve, reject) => {
            pullDownFreshRegister().then(response => {
                resolve()
            })
        })
    }
    /**
     * 下拉刷新门诊缴费
     */
    pullDownOutpatient = () => {
        const {
            myOrderTabActions: {pullDownFreshOutpatient}
        } = this.props

        return new Promise((resolve, reject) => {
            pullDownFreshOutpatient().then(response => {
                resolve()
            })
        })
    }

    /**
     * 上啦加载更多预约挂号
     */
    pullUpLoadRegister = () => {
        const {
            isRegisterLastPage,
            myOrderTabActions: {pullUpLoadMoreRegister}
        } = this.props

        return new Promise((resolve, reject) => {
            if (isRegisterLastPage) {
                resolve()
                return
            }
            pullUpLoadMoreRegister().then(response => {
                resolve()
            })
        })
    }

    /**
     * 上啦加载更多门诊缴费
     */
    pullUpLoadOutpatient = () => {
        const {
            isOutpatientLastPage,
            myOrderTabActions: {pullUpLoadMoreOutpatient}
        } = this.props

        return new Promise((resolve, reject) => {
            if (isOutpatientLastPage) {
                resolve()
                return
            }
            pullUpLoadMoreOutpatient().then(response => {
                resolve()
            })
        })
    }

    render() {
        const {actionTabKey, registerList, outpatientList, fetchingStatus, isRegisterLastPage, isOutpatientLastPage} = this.props
        switch (actionTabKey) {
            case MYORDERTABKAY.register:
                return (
                    <Tab>
                        {this.renderOrderTabs(actionTabKey)}
                        <Wrapper>
                            <ScrollView
                                pullDownRefresh
                                doPullDownFresh={this.pullDownRegister}
                                pullUpLoad
                                fetchingStatus={fetchingStatus}
                                isLastPgae={isRegisterLastPage}  //是不是最后一页
                                pullUpLoadMoreData={this.pullUpLoadRegister}
                                click={true}
                                data={registerList} //要遍历的数据
                                emptyTxt={'什么也没找到'} //空文本描述
                                isPullUpTipHide={false}>
                                <ul>
                                    <MyRegisterItem
                                        realList={registerList}
                                        {
                                            ...this.props
                                        }
                                    />
                                </ul>
                            </ScrollView>
                        </Wrapper>
                    </Tab>
                );
                break;
            case MYORDERTABKAY.outpatientPayment:
                return (
                    <Tab>
                        {this.renderOrderTabs()}
                        <Wrapper>
                            <ScrollView
                                pullDownRefresh
                                doPullDownFresh={this.pullDownOutpatient}
                                pullUpLoad
                                fetchingStatus={fetchingStatus}
                                isLastPgae={isOutpatientLastPage}  //是不是最后一页
                                pullUpLoadMoreData={this.pullUpLoadOutpatient}
                                click={true}
                                data={outpatientList} //要遍历的数据
                                emptyTxt={'什么也没找到'} //空文本描述
                                isPullUpTipHide={false}>
                                <ul>
                                    <MyOutpatientPaymentItem
                                        realList={outpatientList}
                                        {...this.props}
                                    />
                                </ul>
                            </ScrollView>
                        </Wrapper>
                    </Tab>
                );
                break;
            default:
                return;
        }
    }

    componentDidMount() {
        const {myOrderTabActions: {resetData}} = this.props
        resetData();
    }

}


const mapStateToProps = state => {
    return {
        tabs: getTabs(state),
        actionTabKey: getActionTabKey(state),
        registerList: getRegisterList(state),
        outpatientList: getOutpatientList(state),
        fetchingStatus: getFetchingStatus(state),
        isRegisterLastPage: getIsRegisterLastPage(state),
        isOutpatientLastPage: getIsOutpatientLastPage(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        myOrderTabActions: bindActionCreators(myOrderTabActions, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyOrderTabs);
