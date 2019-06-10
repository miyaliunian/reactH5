/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {actions as homeActions, getPageCountOfLikes, getDiscounts, getLists} from '@reduxs/modules/home'
import {connect} from 'react-redux'
import Banner from './components/Banner'
import Category from './components/Category'
import HeadLine from './components/HeadLine'
import Activity from "./components/Activity/Activity";

import './style.less'

class Home extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <Category category={(index) => {
                    this.categoryClick(index)
                }}/>
                <HeadLine/>
                <Activity/>
            </div>
        )
    }

    componentDidMount() {
        // this.props.homeActions.loadDiscounts()
    }

    componentWillUnmount(){

    }


    categoryClick(index) {
        switch (index) {
            case 0 :
                this.props.history.push('/hospitals')
                break
            case 1 :
                this.props.history.push('/login')
                break
            case 2 :
                // this.props.history.push('/clinic')
                break
        }
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}


const mapStateToProps = (state, props) => {
    return {
        likes: getLists(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

