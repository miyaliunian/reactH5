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
        tabSel: 1,
    }

    render() {
        return (
            <div className={'doctorTabs border-bottom'}>
                <div onClick={() => this.tabSel(1)}
                     className={this.state.tabSel === 1 ? 'doctorTabs__tabsLeft itemSelected border-rightbottom' : 'doctorTabs__tabsLeft border-rightbottom'}>按专家预约
                </div>
                <div onClick={() => this.tabSel(2)}
                     className={this.state.tabSel === 2 ? 'doctorTabs__tabsRight itemSelected' : 'doctorTabs__tabsRight'}>按日期预约
                </div>
            </div>
        );
    }

    tabSel(target) {
        if (target % 2 == true) {
            this.setState({
                tabSel: 1
            })
        } else {
            this.setState({
                tabSel: 2,
            })
        }
        this.props.tabSel(target)
    }
}
