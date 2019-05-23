/**
 * Class:
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.css'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="loading__img"/>
                <span>正在加载...</span>
            </div>
        )
    }
}    
