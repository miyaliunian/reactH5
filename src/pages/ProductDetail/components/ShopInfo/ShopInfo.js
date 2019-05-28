/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.css'

export default class ShopInfo extends Component {
    render() {
        return (
            <div className={'shopInfo'}>
                <div className={'shopInfo__header'}>
                    使用商户(4)
                    <span className={'shopInfo__arrow'}></span>
                </div>
                <div className={'shopInfo__middle'}>
                    <div className={'shopInfo__middleLeft'}>
                        <div className={'shopInfo__shopName'}>
                            商户名称
                        </div>
                        <div className={'shopInfo__starsWrapper'}>
                            <span className={'shopInfo__stars'}>
                                <i className={'shopInfo__stars--red'} style={{"width":"80%"}}></i>
                            </span>
                            <span className={'shopInfo__distance'}>>100km</span>
                        </div>
                    </div>
                    <div className={'shopInfo__middleRight'}>
                        <i className={'shopInfo__phoneIcon'}></i>
                    </div>
                </div>
                <div className={'shopInfo__bottom'}>
                    <i className={'shopInfo__locationIcon'}></i>瞎写的地址 我也不知道是哪
                </div>
            </div>
        )
    }
}    
