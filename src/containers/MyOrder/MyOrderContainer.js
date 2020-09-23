
/**
 * 我的订单
 */
import React, { Component } from 'react'
import Header from '@components/NavBar/NavBar'
import MyOrderTabs from '@containers/MyOrder/components/Tabs/MyOrderTabs'
import LoadingMask from '@components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import { connect } from 'react-redux'

//Redux
import { bindActionCreators } from 'redux'
import { actions as myOrderActions } from '@reduxs/modules/myOrderTabs'

//样式
import './style.less'

class MyOrderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iShow: false
    }
  }

  render() {
    return (
        <SafeAreaView showBar={true} title={'我的订单'} isRight={false} handleBack={this.handleBack}>
          <MyOrderTabs
              {...this.props}
              filterMoreItem={this.filterMore}
              filterItemClick={i => this.doDoctorListFilter(i)}
          />
          <LoadingMask />
        </SafeAreaView>
    )
  }



  doDoctorListFilter(i) {

  }

  handleBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    const {
      history
    } = this.props
    const { id } = this.props.match.params
    if (history.action === 'PUSH') {
    }
  }

  componentWillUnmount() {}
}

const mapStateToProps = state => {
  return {
    // fetchingStatus: getFetchStatus(state),
    // actionTabKey: getActionTabKey(state),
    // doctors: getDoctorList(state),
    // reservations: getReservationList(state),
    // seeDate: getSeeDate(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // doctorListActions: bindActionCreators(doctorListActions, dispatch),
    doctorTabsActions: bindActionCreators(myOrderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderContainer)
