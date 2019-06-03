/**
 * Class:  Loading
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'
import ReactLoading from 'react-loading';

export default class LoadingMask extends Component {
    render() {
        return (
            <div className="loading">
                {/*<CircularProgress />*/}
                {/*<span className={'loading__txt'}>正在加载...</span>*/}
                <div className={'loading__contain'}>
                    <ReactLoading type={'spinningBubbles'} width={40} height={40}/>
                    <span className={'loading__txt'}>正在加载 ...</span>
                </div>
            </div>
        )
    }
}    
