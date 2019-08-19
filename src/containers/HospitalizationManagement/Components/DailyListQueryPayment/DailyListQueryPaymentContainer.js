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

import {
    getFetchingStatus,
    getInHosDetail,
    actions as dailyListQueryPaymentActions,
} from '@reduxs/modules/dailyListQueryPayment'


class DailyListQueryPaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {details} = this.props
        console.log(details)
        return (
            <div className={'dailyListQueryPayment'}>
                <Header title={'一日清单'} isRight={false} onBack={this.handleBack}/>
                <DynamicTabs/>
                <ListOfContent/>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        const {hosId, inHosNo} = this.props.match.params
        this.props.dailyListQueryPaymentActions.initDailyQueryList(hosId,inHosNo)
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
