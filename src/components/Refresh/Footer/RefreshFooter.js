/**
 * Class: RefreshFooter
 * Author: wufei
 * Date: 2019/6/5
 * Description:
 *    底部刷新指示器
 */
import React, {Component} from 'react'
import './style.less'

export default class RefreshFooter extends Component {
    render() {
        return (
            <div className={'refreshFooter'}>
                <div className={'refreshFooter__txt'}>~ 已加载全部数据 ~</div>
            </div>
        )
    }
}    
