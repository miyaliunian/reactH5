/**
 * Class:  Loading
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingMask extends Component {
    render() {
        return (
            <div className="loading">
                <CircularProgress />
                <span className={'loading__txt'}>正在加载...</span>
            </div>
        )
    }
}    
