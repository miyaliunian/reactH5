/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, {Component} from 'react'
import HomeHeader from "./components/HomeHeader/HomeHeader";
import {bindActionCreators} from 'redux'

import {actions as homeActions, getPageCountOfLikes, getDiscounts, getLists} from '../../reduxs/modules/home'
import {connect} from 'react-redux'
import Banner from './components/Banner'
import Category from './components/Category'
import HeadLine from './components/HeadLine'
import LikeList from './components/LikeList/LikeList'
import Footer from "../../components/Footer/Footer";
import Activity from "./components/Activity/Activity";
import './style.css'


class Home extends Component {
    render() {
        const {likes, discounts, pageCount} = this.props
        return (
            <div>
                <HomeHeader/>
                <Banner/>
                <Category/>
                <HeadLine/>
                <Activity/>
                <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes}/>
                <Footer/>
            </div>
        )
    }

    componentDidMount() {
        // this.props.homeActions.loadDiscounts()
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


