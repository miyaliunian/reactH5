/**
 * Class: DoctorTabs
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *   门诊医生列表Tabs
 */
import React, { Component, Fragment, useState } from 'react'
import './style.less'

export default class DoctorTabs extends Component {
  render() {
    const { iniTabSel } = this.props
    return (
      <div className={'doctorTabs'}>
        <div
          onClick={() => this.tabSel(1)}
          className={
            iniTabSel === 1
              ? 'doctorTabs__tabsLeft border-rightbottom itemSelected '
              : 'doctorTabs__tabsLeft  border-rightbottom '
          }>
          按专家预约
        </div>
        <div
          onClick={() => this.tabSel(2)}
          className={iniTabSel === 2 ? 'doctorTabs__tabsRight itemSelected' : 'doctorTabs__tabsRight'}>
          按日期预约
        </div>
      </div>
    )
  }

  tabSel(target) {
    this.props.tabSel(target)
  }
}
