/**
 * SiDynamicInfoContainer
 * by WF 20191217
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as siDynamicInfoActions, getSiDynamicInfoList, getFetchingStatus } from '@reduxs/modules/siDynamicInfo'

import './style.less'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import InfoItem from '@containers/SiDynamicInfo/Components/InfoItem/InfoItem'

class SiDynamicInfoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  render() {
    const { fetchingStatus, siDynamicInfoList } = this.props
    console.log(siDynamicInfoList)
    return (
      <div id="siDynamicInfoContainer" onTouchMove={e => this.handleTouchMove(e)} className={'siDynamicInfoContainer'}>
        <SafeAreaView showBar={false} title={'医保动态'} isRight={false} handleBack={this.handleBack}>
          <InfoItem data={siDynamicInfoList} fetchingStatus={fetchingStatus} />
        </SafeAreaView>
      </div>
    )
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    this.initData()
  }

  initData() {
    this.resetData()
    const {
      siDynamicInfoActions: { fetchSiDynamicInfoList }
    } = this.props
    fetchSiDynamicInfoList()
  }

  resetData() {
    this.props.siDynamicInfoActions.reset()
  }

  refreshData() {
    this.props.siDynamicInfoActions.refreshSiDynamicInfoList()
  }
}

/**
 * 刷新状态、医保动态列表
 * @param state
 * @returns {{siDynamicInfoList, fetchingStatus}}
 */
const mapStateToProps = state => {
  return {
    fetchingStatus: getFetchingStatus(state),
    siDynamicInfoList: getSiDynamicInfoList(state)
  }
}

/**
 *
 * @param dispatch
 * @returns {{siDynamicInfoActions: {refreshSiDynamicInfoList, reset, fetchSiDynamicInfoList}}}
 */
const mapDispatchToProps = dispatch => {
  return {
    siDynamicInfoActions: bindActionCreators(siDynamicInfoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiDynamicInfoContainer)
