/**
 * Class: ReservationContainer
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *   预约信息
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import Button from "@components/Button/Button";
import ReservationHeader from "@containers/Reservation/Components/ReservationHeader/ReservationHeader";
import ReservationForm from "@containers/Reservation/Components/ReservationForm/ReservationForm";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as reservationActions,
    getFetchingStatus,
    getPayTypeData,
    getBindCard,
    getSwitchInfo,
    getMedicalType
} from '@reduxs/modules/reservation'
import './style.less'
import LoadingMask from "@components/Loading/LoadingMask";


class ReservationContainer extends Component {

    render() {
        const {doctorInfo, reservationInfo, timeInterval} = this.props.location.state
        const {fetchingStatus, payType, switchInfo, medicalType, bindCards, isRefresh} = this.props
        return (
            <div className={'reservation'}>
                <Header title={'预约信息'} isRight={false} onBack={this.handleBack}/>
                <ReservationHeader doctorInfo={doctorInfo} reservationInfo={reservationInfo}
                                   timeInterval={timeInterval}/>
                <div className={'reservation__interval'}/>
                <ReservationForm
                    {...this.props}
                    bindCards={bindCards}
                    medicalType={medicalType}
                    payType={payType}
                    switchInfo={switchInfo}
                    refreshPage={() => this.setRefreshPage()}
                />
                <div className={'reservationForm__btn'}>
                    <Button txt={'确认预约'} onSubmit={() => this.onBtnClick()}/>
                </div>
                {fetchingStatus ? <LoadingMask/> : null}
            </div>
        )
    }


    componentDidMount() {
        const {doctorInfo, reservationInfo} = this.props.location.state
        this.props.reservationActions.loadPayType(doctorInfo.hosId, reservationInfo.id)
        this.props.reservationActions.loadBindCardAndMedicalTypeList()
    }


    /**
     * 标识当前页面是否刷新：
     */
    setRefreshPage() {
        this.props.reservationActions.setIsRefresh(false)
    }


    handleBack = () => {
        this.props.reservationActions.setIsRefresh(true)
        this.props.history.goBack()
    }



    onBtnClick() {
        this.props.reservationActions.onSubmit({...this.props.location.state})
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        payType: getPayTypeData(state),
        bindCards: getBindCard(state),
        switchInfo: getSwitchInfo(state),
        medicalType: getMedicalType(state),
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reservationActions: bindActionCreators(reservationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationContainer)