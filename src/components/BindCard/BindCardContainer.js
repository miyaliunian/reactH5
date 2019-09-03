/**
 * Class: BindCard
 * Author: wufei
 * Date: 2019/6/10
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    actions as bindCardActions,
    getBindCardList
} from "@reduxs/modules/bindCard";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";


class BindCardContainer extends Component {

    render() {
        const {list} = this.props
        return (
            <div className={'bindCard'}>
                <SafeAreaView showBar={true} title={'成员列表'} isRight={false} handleBack={this.handleBack}>
                    <BindCardItem data={list} isRefresh={this.refresh}/>
                </SafeAreaView>
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
