/**
 * Class: ReservationContainer
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *   预约信息
 */
import React, {Component} from 'react'
import PrimaryButton from "@baseUI/Button/PrimaryButton";
import ReservationHeader from "@containers/Reservation/Components/ReservationHeader/ReservationHeader";
import ReservationForm from "@containers/Reservation/Components/ReservationForm/ReservationForm";
import LoadingMask from "@components/Loading/LoadingMask";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
//Redux
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as reservationActions,
    getFetchingStatus,
    getPayTypeData,
    getBindCard,
    getDiagnosis,
    getMedicalType,
    getSwitchInfo,
    getBtnDisable
} from '@reduxs/modules/reservation'

//Style
import './style.less'

class ReservationContainer extends Component {

    render() {
        const {doctorInfo, reservationInfo, timeInterval} = this.props.location.state
        console.log(doctorInfo)
        const {diagnosis, fetchingStatus, payType, switchInfo, medicalType, bindCards, btnDisable} = this.props
        return (
            <div className={'reservation'}>
                <SafeAreaView showBar={true} title={'预约信息'} isRight={false} handleBack={this.handleBack}>
                    <ReservationHeader doctorInfo={doctorInfo} reservationInfo={reservationInfo}
                                       timeInterval={timeInterval}/>
                    <div className={'reservation__interval'}/>
                    <ReservationForm
                        {...this.props}
                        bindCards={bindCards}
                        diagnosis={diagnosis}
                        medicalType={medicalType}
                        payType={payType}
                        switchInfo={switchInfo}
                        refreshPage={() => this.setRefreshPage()}
                    />
                    <div className={'reservationForm__btn'}>
                        <PrimaryButton txt={'确认预约'} onSubmit={() => this.onBtnClick()} disabled={btnDisable}/>
                    </div>
                    <div className={'reservationForm_ps'}>
                        <span style={{color:'#CCCCCC'}}>确认预约代表您已阅读并接受<span style={{color:'#0084ff'}}>预约须知</span></span>
                    </div>
                    <LoadingMask/>
                </SafeAreaView>
            </div>
        )
    }


    componentDidMount() {
        const {doctorInfo, reservationInfo} = this.props.location.state
        const {history,reservationActions:{loadPayType,loadBindCardAndMedicalTypeList}} = this.props
        if (history.action === 'PUSH'){
            loadPayType(doctorInfo.hosId, reservationInfo.id)
            loadBindCardAndMedicalTypeList()
        }
    }

    componentWillUnmount() {
        const {reservationActions:{reset}} =this.props
        reset()
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
        const {reservationActions:{onSubmit}} = this.props
        onSubmit({...this.props.location.state}, {...this.props.history})
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        btnDisable: getBtnDisable(state),
        payType: getPayTypeData(state),
        bindCards: getBindCard(state),
        diagnosis: getDiagnosis(state),
        medicalType: getMedicalType(state),
        switchInfo: getSwitchInfo(state),
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        reservationActions: bindActionCreators(reservationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationContainer)
