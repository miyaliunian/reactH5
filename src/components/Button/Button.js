/**
 * Class: Button
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import PropTypes from "prop-types";
import './style.less'

export default class Button extends Component {

    static propTypes = {
        txt: PropTypes.string.isRequired
    }

    render() {
        const {txt} = this.props
        return (
            <div className={'form__btnContainer'}>
                <button className={'form__btn'}>{txt}</button>
            </div>
        )
    }
}    
