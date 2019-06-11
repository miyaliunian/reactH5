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
import {
    actions as bindCardActions,
    getFetchingStatus
} from "@reduxs/modules/bindCard";


class BindCardContainer extends Component {
    handleBack = () => {
        this.props.history.goBack()
    }

    render() {

        return (
            <div className={'bindCard'}>
                <Header title={'成员列表'} onBack={this.handleBack} isRight={false}/>
            </div>
        )
    }


    componentDidMount() {
       this.props.bindCardActions.loadList()
    }
}


const
    mapStateToProps = (state) => {
        return {
            fetchingStatus: getFetchingStatus(state),
        }
    }

const
    mapDispatchToProps = (dispatch) => {
        return {
            bindCardActions: bindActionCreators(bindCardActions, dispatch)
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)

(
    BindCardContainer
)
