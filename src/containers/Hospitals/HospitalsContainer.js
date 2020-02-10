/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *  医院列表容器
 */
import React, { Component } from 'react'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import Tabs from './components/Tabs/Tabs'
import HosiContentList from '@containers/Hospitals/components/HosiContentList/HosiContentList'
import LoadingMask from '../../components/Loading/LoadingMask'

//样式
import './style.less'

class HospitalsContainer extends Component {
  render() {
    return (
      <SafeAreaView showBar={true} title={'医院列表'} isRight={true} handleBack={this.handleBack}>
        <div className={'hospitalsContainer'}>
          <Tabs />
          <HosiContentList />
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  handleBack = () => {
    this.props.history.goBack()
  }
}

export default HospitalsContainer
