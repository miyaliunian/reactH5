/**
 * Class: BindCard
 * Author: wufei
 * Date: 2019/6/10
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'
import Header from "@components/Header/NavBar";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {
    actions as bindCardActions,
    getBindCardList
} from "@reduxs/modules/bindCard";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";


class BindCardContainer extends Component {

    render() {
        const {list} = this.props
        return (
            <div className={'bindCard'}>
                <Header title={'成员列表'} onBack={this.handleBack} isRight={false}/>
                <BindCardItem data={list} isRefresh={this.refresh}/>
            </div>
        )
    }


    componentDidMount() {
        const {list} = this.props
        if (!list.length > 0) {
            this.props.bindCardActions.loadList()
        }
    }


    handleBack = () => {
        this.props.bindCardActions.resetBindCard()
        this.props.history.goBack()
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

export default connect(mapStateToProps, mapDispatchToProps)(BindCardContainer)
