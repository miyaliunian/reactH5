/**
 * Class: SafeAreaView
 * Author: wufei
 * Date: 2019/9/2
 * Description:
 *  安全区外部包裹
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import PropTypes from 'prop-types'
import './style.less'

export default class SafeAreaView extends Component {

    static propTypes = {
        showBar: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        isRight: PropTypes.bool.isRequired,
        handleBack: PropTypes.func.isRequired
    }

    render() {
        const {showBar, title, isRight, handleBack} = this.props
        return (
            <div>
                {showBar ? <Header title={title} isRight={isRight} onBack={handleBack}/> : null}
                {this.props.children}
            </div>
        )
    }
}    
