/**
 * Class: DailyListQueryPayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 一日清单
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";
import DynamicTabs
    from "@containers/HospitalizationManagement/Components/DailyListQueryPayment/Components/DynamicTabs/DynamicTabs";
import ListOfContent
    from "@containers/HospitalizationManagement/Components/DailyListQueryPayment/Components/ListOfContent/ListOfContent";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getStartDate, getCurrentMMddWed, getPrevDate, getNexDate, getcurrentDate} from '@utils/dayutils'
import {
    getFetchingStatus,
    getInHosDetail,
    actions as dailyListQueryPaymentActions,
} from '@reduxs/modules/dailyListQueryPayment'
import LoadingMask from "@components/Loading/LoadingMask";
import './style.less'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

class DailyListQueryPaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryStatus: '',
            timeStep: '',
            startDate: '',
            endDate: ''

        };
    }

    render() {
        const {fetchingStatus, details} = this.props
        return (
            <div className={'dailyListQueryPayment'} >
                <SafeAreaView showBar={true} title={'一日清单'} isRight={false} handleBack={this.handleBack}>
                    <DynamicTabs queryTitle={this.state.queryStatus} pre={() => this.pre()} nex={() => this.nex()}/>
                    <ListOfContent list={details}/>
                    {fetchingStatus ? <LoadingMask/> : null}
                </SafeAreaView>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        const {hosId, inHosNo} = this.props.match.params
        let startDate = `${getStartDate(new Date().getTime()) + '000000'}`
        let endDate = `${getStartDate(new Date().getTime()) + '235959'}`
        this.setState({
            startDate: `${getStartDate() + '000000'}`,
            timeStep: new Date().getTime(),
            queryStatus: getCurrentMMddWed(),
            endDate: `${getStartDate() + '235959'}`
        })
        this.props.dailyListQueryPaymentActions.initDailyQueryList('inPrePay', hosId, inHosNo, startDate, endDate)
    }

    pre() {
        // console.log(getStartDate(this.state.timeStep - 24 * 60 * 60 * 1000))
        const {hosId, inHosNo} = this.props.match.params
        this.setState({
            timeStep: this.state.timeStep - 24 * 60 * 60 * 1000,
            queryStatus: getCurrentMMddWed(this.state.timeStep - 24 * 60 * 60 * 1000)
        })
        let startDate = `${getStartDate(this.state.timeStep - 24 * 60 * 60 * 1000) + '000000'}`
        let endDate = `${getStartDate(this.state.timeStep - 24 * 60 * 60 * 1000) + '235959'}`
        // console.log(startDate, endDate)
        this.props.dailyListQueryPaymentActions.initDailyQueryList('inPrePay', hosId, inHosNo, startDate, endDate)
    }

    nex() {
        // console.log(getStartDate(this.state.timeStep + 24 * 60 * 60 * 1000))
        const {hosId, inHosNo} = this.props.match.params
        this.setState({
            timeStep: this.state.timeStep + 24 * 60 * 60 * 1000,
            queryStatus: getCurrentMMddWed(this.state.timeStep + 24 * 60 * 60 * 1000)
        })
        let startDate = `${getStartDate(this.state.timeStep + 24 * 60 * 60 * 1000) + '000000'}`
        let endDate = `${getStartDate(this.state.timeStep + 24 * 60 * 60 * 1000) + '235959'}`
        // console.log(startDate, endDate)
        this.props.dailyListQueryPaymentActions.initDailyQueryList('inPrePay', hosId, inHosNo, startDate, endDate)
    }

}

const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        details: getInHosDetail(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dailyListQueryPaymentActions: bindActionCreators(dailyListQueryPaymentActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DailyListQueryPaymentContainer)
