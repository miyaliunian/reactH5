/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, {Component} from 'react'
import Banner from './components/Banner'
import Category from './components/Category'
import HeadLine from './components/HeadLine'
import Discount from './components/Discount/Discount'
import LikeList from './components/LikeList/LikeList'
import './style.css'

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <Banner/>
                <Category/>
                <HeadLine/>
                <Discount/>
                <LikeList/>
            </div>
        )
    }
}