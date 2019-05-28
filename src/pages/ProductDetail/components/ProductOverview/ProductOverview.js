/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css'

export default class ProductOverview extends Component {
    render() {

        const {id, shop, picture, description, currentPrice, oldPrice} = this.props
        return (
            <div className={'productOverview'}>
                <div className={'productOverview__header'}>
                    <div className={'productOverview__imgContainer'}>
                        <img alt={''}
                             src={picture}
                             className={'productOverview__img'}/>
                    </div>
                    <div className={'productOverview__baseInfo'}>
                        <div className={'productOverview__title'}>
                            {shop}
                        </div>
                        <div className={'productOverview__content'}>
                            {description}
                        </div>
                    </div>
                </div>
                <div className={'productOverview__purchase'}>
                    <span className={'productOverview__symbol'}>￥</span>
                    <span className={'productOverview__price'}>{currentPrice}</span>

                    <span className={'productOverview__price__old'}>{oldPrice}</span>
                    <Link to={`/purchase/${id}`} className={'productOverview__btn'}>购买</Link>
                </div>
                <ul className={'productOverview__remark'}>
                    <li className={'productOverview__remarkItem'}>
                        <i className={'productOverview__sign1'}></i>
                        <span className={'productOverview__desc'}>随时可退</span>
                    </li>
                    <li className={'productOverview__remarkItem'}>
                        <i className={'productOverview__sign2'}></i>
                        <span className={'productOverview__desc'}>过期自动退</span>
                    </li>
                </ul>
            </div>
        )
    }
}    
