/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/19
 * Description:
 *   webpack 智能候诊
 */

import React, {Component, PureComponent} from 'react'
import Header from "@components/Header/NavBar"
import './style.less';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    actions as bindCardActions,
    getBindCardList
} from "@reduxs/modules/bindCard";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import {
    actions as integelligentWaitingActions,
    getIntelligentWaitingList
} from "@reduxs/modules/intelligentWaiting";

class IntelligentWaitingContainer extends Component {

    constructor(props) {
        super(props)
    }

    handleBack = () => {
        this.props.bindCardActions.resetBindCard()
        this.props.history.goBack()
    }

    render () {
        const {list} = this.props
        const {intelligentWaitingList} = this.props
        return(
            <div
                id='intelligentWaitingContainer'
                onTouchMove={(e) => this.handleTouchMove(e)}
                className={'intelligentWaitingContainer'}>
                <Header title={'智能候诊'} onBack={this.handleBack} isRight={false}/>
                <BindCardItem data={list} isRefresh={false}/>
                <div>

                </div>
            </div>

        )

    }

    componentDidMount() {
        const {list} = this.props
        if (!list.length > 0) {
            this.props.bindCardActions.loadList()
        }

    }
}

const mapStateToProps = (state) => {
    return {
        list: getBindCardList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bindCardActions: bindActionCreators(bindCardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntelligentWaitingContainer)