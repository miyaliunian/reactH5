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
import {connect} from 'react-redux'
import Banner from './components/Banner'
import Category from './components/Category'
import HeadLine from './components/HeadLine'
import Discount from './components/Discount/Discount'
import LikeList from './components/LikeList/LikeList'
import Footer from "../../components/Footer/Footer";
import Activity from "./components/Activity/Activity";
import './style.css'

import {
    actions as homeActions,
    getLikes,
    getDiscounts,
    getPageCountOfLikes
} from '../../redux/modules/home'

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
                {/*<Discount data={discounts}/>*/}
                <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes}/>
                <Footer/>
            </div>
        )
    }

    componentDidMount() {
        this.props.homeActions.loadDiscount()
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}


const mapStateToProps = (state, props) => {
    return {
        likes: getLikes(state),
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


