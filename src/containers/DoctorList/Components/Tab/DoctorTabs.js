/**
 * Class: DoctorTabs
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *   门诊医生列表Tabs
 */
import React, {Component, Fragment, useState} from 'react';
import './style.less'

export default class DoctorTabs extends Component {

    state = {
        tab1Sel: false,
        tab2Sel: false
    }

    render() {
        return (
            <div className={'doctorTabs'}>
                <div onClick={() => this.tabSel(1)}
                     className={this.state.tab1Sel ? 'doctorTabs__tabsLeft itemSelected' : 'doctorTabs__tabsLeft'}>按专家预约
                </div>
                <div onClick={() => this.tabSel(2)}
                     className={this.state.tab2Sel ? 'doctorTabs__tabsRight itemSelected' : 'doctorTabs__tabsRight'}>按日期预约
                </div>
            </div>
        );
    }

    tabSel(target) {
        if (target % 2 == true) {
            console.log('基数')
            this.setState({
                tab1Sel: true,
                tab2Sel: false
            })
        } else {
            console.log('偶数')
            this.setState({
                tab1Sel: false,
                tab2Sel: true
            })
        }
    }
}
