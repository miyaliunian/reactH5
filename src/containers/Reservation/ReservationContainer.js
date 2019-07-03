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
    getMedicalType
} from '@reduxs/modules/reservation'
import './style.less'


class ReservationContainer extends Component {
    render() {
        const {doctorInfo, reservationInfo} = this.props.location.state
        // console.log(this.props.payTypeData)
        const {medicalType} = this.props
        return (
            <div className={'reservation'}>
                <Header title={'预约信息'} isRight={false} onBack={this.handleBack}/>
                <ReservationHeader doctorInfo={doctorInfo} reservationInfo={reservationInfo}/>
                <div className={'reservation__interval'}/>
                <ReservationForm medicalType={medicalType}/>
                <div className={'reservationForm__btn'}>
                    <Button txt={'确认预约'}/>
                </div>
            </div>
        )
    }


    componentDidMount() {
        const {doctorInfo, reservationInfo} = this.props.location.state
        this.props.reservationActions.loadPayType(doctorInfo.hosId, reservationInfo.id)
        this.props.reservationActions.loadBindCardList()
    }


    handleBack = () => {
        this.props.history.goBack()
    }


}

const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        payTypeData: getPayTypeData(state),
        medicalType: getMedicalType(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reservationActions: bindActionCreators(reservationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationContainer)