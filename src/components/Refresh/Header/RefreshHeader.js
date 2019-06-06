/**
 * Class: RefreshHeader
 * Author: wufei
 * Date: 2019/6/5
 * Description:
 *   下拉刷新头部
 */
import React, {Component} from 'react'
import ReactLoading from 'react-loading';
import './style.less'
export default class RefreshHeader extends Component {
    render() {
        return (
            <div className={'refreshHeader'}>
                {/*<div className="loading__img"/>*/}
                <ReactLoading type={'spokes'} width={20} height={20} color={'rgb(201,201,201)'}/>
            </div>
        )
    }
}    
