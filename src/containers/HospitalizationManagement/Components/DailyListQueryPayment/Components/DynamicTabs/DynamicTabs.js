/**
 * Class: DynamicTabs
 * Author: wufei
 * Date: 2019-08-19
 * Description:
 * 一日清单
 */
import React, {Component} from 'react';
import './style.less'

export default class DynamicTabs extends Component {

    state = {};

    render() {
        const {pre,queryTitle,nex} = this.props
        return (
            <div className={'dynamicTabs border-bottom'}>
                <div className={'dynamicTabs_tabs border-right'} onClick={()=>pre()}><span>上一天</span></div>
                <div className={'dynamicTabs_tabs'}><span>{queryTitle}</span></div>
                <div className={'dynamicTabs_tabs border-left'} onClick={()=>nex()}><span>下一天</span></div>
            </div>
        );
    }
}

