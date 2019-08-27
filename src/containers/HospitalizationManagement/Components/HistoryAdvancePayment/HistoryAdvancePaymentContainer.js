/**
 * Class: HistoryAdvancePaymentContainer
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 历史缴纳预交金
 */
import React, {Component} from 'react';
import Bscroll from 'better-scroll'
import Header from "@components/Header/NavBar";
import LoadingMask from "@components/Loading/LoadingMask";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './style.less'

import {
    actions as historyAdvancePaymentActions,
    getFetchingStatus,
    getHistoryList
} from "@reduxs/modules/historyAdvancePayment";

class HistoryAdvancePaymentContainer extends Component {

    render() {
        const {fetchingStatus, itemList} = this.props
        let data = itemList.data ? itemList.data.listPrePayList : []
        return (
            <div className={'historyAdvancePayment'} style={{position: 'absolute', left:'0',top:'0',width:'100vw',height:'100vh'}}>
                <Header title={'历史缴纳预交金'} isRight={false} onBack={this.handleBack}/>
                <div className={'historyAdvancePayment_container'} ref={'historyAdvancePaymentWrapper'}>
                    <div>
                        {data.map(item => {
                            return (
                                <div key={item.billNo}>
                                    <div className={'historyAdvancePayment_container_header border-bottom'}>
                                    <span style={{
                                        fontSize: '16px',
                                        color: 'rgb(127,127,127)',
                                        marginRight: '15px'
                                    }}>发票号</span>
                                        <span style={{fontSize: '16px', color: 'rgb(127,127,127)'}}>{item.billNo}</span>
                                    </div>
                                    <div className={'historyAdvancePayment_container_body'}>
                                        <div className={'historyAdvancePayment_container_body_row'}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '90px',
                                    color: 'rgb(127,127,127)'
                                }}>类型</span>
                                            <span>{item.moneyType}</span>
                                        </div>
                                        <div className={'historyAdvancePayment_container_body_row'}>
                            <span
                                style={{display: 'inline-block', width: '90px', color: 'rgb(127,127,127)'}}>缴纳金额</span>
                                            <span style={{color: 'orange'}}>￥{item.addMoney}</span>
                                        </div>
                                        <div className={'historyAdvancePayment_container_body_row'}>
                            <span
                                style={{display: 'inline-block', width: '90px', color: 'rgb(127,127,127)'}}>支付方式</span>
                                            <span>{item.payType}</span>
                                        </div>
                                        <div className={'historyAdvancePayment_container_body_row'}>
                            <span
                                style={{display: 'inline-block', width: '90px', color: 'rgb(127,127,127)'}}>缴纳时间</span>
                                            <span>{item.billDate}</span>
                                        </div>
                                    </div>
                                    <div style={{height:'15px',backgroundColor:'rgb(230,230,230)'}}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {fetchingStatus ? <LoadingMask/> : null}
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.bscroll = new Bscroll(this.refs.historyAdvancePaymentWrapper, {
            mouseWheel: true,
            probeType: 3,
            click: true,
            tap: true,
            useTransition: false
        })
        const {hosId, inHosNo} = this.props.match.params
        this.props.historyAdvancePaymentActions.loadData('inPrePay', hosId, inHosNo)
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        itemList: getHistoryList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        historyAdvancePaymentActions: bindActionCreators(historyAdvancePaymentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryAdvancePaymentContainer)
