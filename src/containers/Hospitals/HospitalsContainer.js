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
    return (
      <div  className={'hospitalsContainer'}>
        <SafeAreaView showBar={true} title={'医院列表'} isRight={false} handleBack={this.handleBack}>
          <Tabs
            handelTabRowSel={(item, index) => this.handelTabRowSel(item, index)}
            handelTabItemSel={item => this.handelTabItemSel(item)}
          />
          <HospitalsItem
            data={hospitalList}
            fetchingStatus={fetchingStatus}
            isLastPage={isLastPage}
            pullingDownHandler={() => this.pullingDownHandler()}
            pullingUpHandler={() => this.pullingUpHandler()}
          />
          <LoadingMask />
        </SafeAreaView>
      </div>
    )
  }

  //下拉刷新
  pullingDownHandler() {
    const {hospitalActions:{refreshHosipitalList}} = this.props
    refreshHosipitalList()
  }

  //
  pullingUpHandler() {
    const { isLastPage,hospitalActions:{loadHosipitalList}} = this.props
    if (!isLastPage) {
      loadHosipitalList()
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
    this.resetData()
    this.props.hospitalActions.loadHosipitalList()
  }

  resetData() {
    this.props.hospitalActions.reset()
  }

  //处理行选中
  handelTabRowSel(item, index) {
    const {hospitalActions:{fetchHosipitalListByFilter}} = this.props
    if (index === 1) {
      // 区域
      this.props.hospitalActions.setAreaId(item.code)
    } else {
      // 综合排序
      this.props.hospitalActions.setSord(item.value)
    }
    fetchHosipitalListByFilter()
  }

  //处理列选中
  handelTabItemSel(item) {
    const {hospitalActions:{fetchHosipitalListByFilter}} = this.props
    this.props.hospitalActions.setCategoryGrade(item)
    fetchHosipitalListByFilter()
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
