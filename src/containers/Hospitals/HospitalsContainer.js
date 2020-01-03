/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *              医院列表容器
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
      <div id="hospitalsContainer" onTouchMove={e => this.handleTouchMove(e)} className={'hospitalsContainer'}>
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
    debugger
    this.props.hospitalActions.refreshHosipitalList()
  }

  //
  pullingUpHandler() {
    const { isLastPage } = this.props
    if (!isLastPage) {
      this.props.hospitalActions.loadHosipitalList()
    }
  }

  handleBack = () => {
    this.resetData()
    this.props.history.goBack()
  }

  handleTouchMove(event) {}

  componentDidMount() {
    document.getElementById('hospitalsContainer').addEventListener(
      'touchmove',
      event => {
        event.preventDefault()
      },
      {
        passive: false //  禁止 passive 效果
      }
    )

    this.initailData()

    // if (this.props.history.action === 'PUSH') {
    //   this.initailData()
    // }
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
    if (index === 1) {
      // 区域
      this.props.hospitalActions.setAreaId(item.code)
    } else {
      // 综合排序
      this.props.hospitalActions.setSord(item.value)
    }
    this.props.hospitalActions.fetchHosipitalListBy()
  }

  //处理列选中
  handelTabItemSel(item) {
    this.props.hospitalActions.setCategoryGrade(item)
    this.props.hospitalActions.fetchHosipitalListBy()
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
