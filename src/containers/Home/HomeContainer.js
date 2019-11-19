/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {actions as homeActions} from '@reduxs/modules/home'
import {connect} from 'react-redux'

import Category from './components/Category'
import './style.less'

class Home extends Component {
    render() {
        return (
            <div className={'home'}>
                <Category category={(index) => {
                    this.categoryClick(index)
                }}/>
            </div>
        )
    }


    categoryClick(index) {
        switch (index) {
            case 0 :
                this.props.history.push('/login')
            // case 1 :
            //     this.props.history.push('/register')
            //     break
            case 1 :
                this.props.history.push('/hospitals')
                break
            // case 3 :
            //     this.props.history.push('/bindCard')
            //     break
            case 2 :
                this.props.history.push('/intelligentWaiting')
                break
            case 3 :
                this.props.history.push('/hospitalizationManagement')
                break
            // case 6 :
            //     this.props.history.push('/orderReservationDoctor')
            //     break
            // case 7:
            //     this.props.history.push('/payCountdown')
            //     break
            // case 8:
            //     this.props.history.push('/orderContainer')
            //     break
            // case 9:
            //     this.props.history.push('/report')
            //     break
            case 10:
                this.showActionSheet()
                break
        }
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}


const mapStateToProps = (state, props) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


