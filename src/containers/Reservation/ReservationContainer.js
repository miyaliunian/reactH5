/**
 * Class: ReservationContainer
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *   预约信息
 */
import React, { Component } from 'react'
import PrimaryButton from '@baseUI/Button/PrimaryButton'
import ReservationHeader from '@containers/Reservation/Components/ReservationHeader/ReservationHeader'
import ReservationForm from '@containers/Reservation/Components/ReservationForm/ReservationForm'
import LoadingMask from '@components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    const { doctorInfo, reservationInfo, timeInterval } = this.props.location.state
    const { diagnosis, payType, switchInfo, medicalType, bindCardItem, btnDisable } = this.props
    return (
      <SafeAreaView showBar={true} title={'预约信息'} isRight={false} handleBack={this.handleBack}>
        <div className={'reservation'}>
          <ReservationHeader doctorInfo={doctorInfo} reservationInfo={reservationInfo} timeInterval={timeInterval} />
          <div className={'reservation__interval'} />
          <ReservationForm
            {...this.props}
            bindCardItem={bindCardItem}
            diagnosis={diagnosis}
            medicalType={medicalType}
            payType={payType}
            switchInfo={switchInfo}
            refreshPage={newBindCard => this.refreshPage(newBindCard)}
          />
          <div className={'reservationForm__btn'}>
            <PrimaryButton txt={'确认预约'} onSubmit={() => this.onSubmit()} disabled={btnDisable} />
          </div>
          <div className={'reservationForm_ps'}>
            <span style={{ color: '#CCCCCC' }}>
              确认预约代表您已阅读并接受
              <span style={{ color: '#0084ff' }}>预约须知</span>
            </span>
          </div>
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    const {
      history,
      location,
      reservationActions: { loadPayType, loadBindCardAndMedicalTypeList }
    } = this.props
    const { doctorInfo, reservationInfo } = location.state
    if (history.action === 'PUSH') {
      loadPayType(doctorInfo.hosId, reservationInfo.id, () => {
        loadBindCardAndMedicalTypeList()
      })
    }
  }

  componentWillUnmount() {
    const {
      history,
      reservationActions: { reset }
    } = this.props
    if (history.action === 'POP') {
      reset()
    }
  }

  //切换家庭成员之后，重新请求 switch组件的状态
  refreshPage(newBindCard) {
    const {
      reservationActions: { loadMedicalTypeByBindCard }
    } = this.props
    loadMedicalTypeByBindCard(newBindCard)
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  onSubmit() {
    const {
      reservationActions: { onSubmit },
      location,
      history
    } = this.props
    onSubmit({ ...location.state }, { ...history })
  }
}

const mapStateToProps = state => {
  return {
    fetchingStatus: getFetchingStatus(state),
    btnDisable: getBtnDisable(state),
    payType: getPayTypeData(state),
    bindCardItem: getBindCard(state),
    diagnosis: getDiagnosis(state),
    medicalType: getMedicalType(state),
    switchInfo: getSwitchInfo(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reservationActions: bindActionCreators(reservationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationContainer)
