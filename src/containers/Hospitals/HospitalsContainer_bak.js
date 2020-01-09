/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *  医院列表容器
 */
import React, { PureComponent } from 'react'
import HospitalsItem from './components/HospitalsItem/HospitalsItem'
import Tabs from './components/Tabs/Tabs'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import LoadingMask from '../../components/Loading/LoadingMask'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as hospitalActions,
  getHospitalList,
  getFetchingStatus,
  getIsLastPage
} from '../../reduxs/modules/hospital'
import './style.less'

class HospitalsContainer extends PureComponent {
  render() {
    const { fetchingStatus, hospitalList, isLastPage } = this.props
    console.log('red')
    return (
      <SafeAreaView showBar={true} title={'医院列表'} isRight={false} handleBack={this.handleBack}>
        <div className={'hospitalsContainer'}>
          <Tabs filterHosipitalList={item => this.filterHosipitalList(item)} />
          <HospitalsItem
            data={hospitalList}
            fetchingStatus={fetchingStatus}
            isLastPage={isLastPage}
            pullingDownHandler={() => this.pullingDownHandler()}
            pullingUpHandler={() => this.pullingUpHandler()}
          />
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  //下拉刷新
  pullingDownHandler() {
    const {
      hospitalActions: { refreshHosipitalList }
    } = this.props
    refreshHosipitalList()
  }

  //
  pullingUpHandler() {
    const {
      isLastPage,
      hospitalActions: { moreHosipitalList }
    } = this.props
    if (!isLastPage) {
      moreHosipitalList()
    }
  }

  handleBack = () => {
    this.resetData()
    this.props.history.goBack()
  }

  componentDidMount() {
    this.initailData()
  }

  initailData() {
    const {
      hospitalActions: { iniHosipitalList }
    } = this.props
    this.resetData()
    iniHosipitalList()
  }

  resetData() {
    this.props.hospitalActions.reset()
  }

  filterHosipitalList(item) {
    const {
      hospitalActions: { filterHosipitalList }
    } = this.props
    return
    filterHosipitalList(item)
  }
}

const mapStateToProps = state => {
  return {
    hospitalList: getHospitalList(state),
    fetchingStatus: getFetchingStatus(state),
    isLastPage: getIsLastPage(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hospitalActions: bindActionCreators(hospitalActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalsContainer)
