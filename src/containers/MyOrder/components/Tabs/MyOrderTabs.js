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
    getOutpatientList
} from "@reduxs/modules/myOrderTabs";
import MyOutpatientPaymentItem from '../../components/MyOutpatientPaymentItem/MyOutpatientPaymentItem'
import MyRegisterItem from '../../components/MyRegisterItem/MyRegisterItem'

//样式
import "./style.less";


class MyOrderTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selTab: 'register',
            registerPageno: 1,
            outpatientPageno: 1
        };
    }


    /**
     * 点击切换Tab
     * @param key
     */
    onChangeTab(key) {
        const {myOrderTabActions: {changeTab}, doChangeTab} = this.props;
        console.log("onChangeTab key: " + key);
        changeTab(key, () => {
            doChangeTab(key)
        })
    }


    /**
     * 渲染顶部tab
     */
    renderOrderTabs() {
        const {tabs, actionTabKey} = this.props;
        console.log('MyOrderTabs renderTabs');
        console.group(this.props)
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
     * 渲染我的订单content
     * @returns {Array}
     */
    renderOrderContent() {
        const {actionTabKey, registerList,outpatientList} = this.props
        console.log('renderOrderContent actionTabKey: ' + actionTabKey)
        console.group(this.props)
        switch (actionTabKey) {
            case MYORDERTABKAY.register:
                return registerList.map((item, index) => {
                    return <MyOutpatientPaymentItem/>;
                });
            case MYORDERTABKAY.outpatientPayment:
                console.log("9999999999999999999");
                // this.props.myOrderTabActions.loadOutpatientByPage(this.state.outpatientPageno);
                return outpatientList.map((item, index) => {
                    return <MyRegisterItem/>;
                });
                break;
            default:
                return;
        }
    }


    renderRegisterContent() {
        const {actionTabKey, registerList,outpatientList} = this.props
        console.log('renderRegisterContent actionTabKey: ' + actionTabKey)
        console.group(this.props)

        return registerList.map((item, index) => {
            return <MyOutpatientPaymentItem/>;
        });
    }


    renderOutpatientContent() {
        const {actionTabKey, registerList,outpatientList} = this.props
        console.log('renderOutpatientContent actionTabKey: ' + actionTabKey)
        console.group(this.props)
        return outpatientList.map((item, index) => {
            return <MyRegisterItem/>;
        })
    }


    render() {
        const {actionTabKey, registerList,outpatientList} = this.props
        switch (actionTabKey) {
            case MYORDERTABKAY.register:
                console.log('777777777777777777')
                return (
                    <div className={"doctorTabs"}>
                        <div className={"tab_header border-bottom"}>
                            {this.renderOrderTabs()}
                        </div>
                        {this.renderRegisterContent()}
                    </div>
                );
                break;
            case MYORDERTABKAY.outpatientPayment:
                console.log('8888888888888888888')
                return (
                    <div className={"doctorTabs"}>
                        <div className={"tab_header border-bottom"}>
                            {this.renderOrderTabs()}
                        </div>
                        {this.renderOutpatientContent()}
                    </div>
                );
                break;
            default:
                return;
        }
    }


    componentWillUnmount() {
        // const {myOrderTabActions: {iniActionKey}} = this.props
        // iniActionKey()
    }

    componentDidMount() {
        const {actionTabKey, registerList} = this.props
        switch (actionTabKey) {
            case MYORDERTABKAY.register:
                console.log('777777777777777777')
                this.props.myOrderTabActions.loadRegisterByPage(this.props.registerPageno)
                break;
            case MYORDERTABKAY.outpatientPayment:
                break;
            default:
                return;
        }
    }

}


const mapStateToProps = state => {
    return {
        tabs: getTabs(state),
        actionTabKey: getActionTabKey(state),
        registerList: getRegisterList(state),
        outpatientList: getOutpatientList(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        myOrderTabActions: bindActionCreators(myOrderTabActions, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyOrderTabs);