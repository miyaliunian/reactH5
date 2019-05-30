/**
 * Class: LikeItem
 * Author: wufei
 * Date: 2019/5/23
 * Description: 列表子元素
 *      传递对象
 *    <Link to={`/detail/${JSON.stringify(data)}`} className={'likeItem'}>
 *
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.less'

export default class LikeItem extends Component {
    render() {
        const {
            id,
            shop,
            tag,
            picture,
            product,
            currentPrice,
            oldPrice,
            saleDesc
        } = this.props.item
        const data = {
            id: id,
            shop: shop,
            tag: tag,
        }
        return (
            <Link to={`/detail/${id}`} className={'likeItem'}>
                <div className={'likeItem__picContainer'}>
                    <div className={'likeItem__picTag'}>{tag}</div>
                    <img className={'likeItem__pic'} src={picture} alt={''}/>
                </div>
                <div className={'likeItem__content'}>
                    <div className="likeItem__shop">{shop}</div>
                    <div className="likeItem__product">{product}</div>
                    <div className="likeItem__detail">
                        <div className="likeItem__price">
                            <ins className="likeItem__currentPrice">{currentPrice}</ins>
                            <del className="likeItem__oldPrice">{oldPrice}</del>
                        </div>
                        <div className="likeItem__sale">{saleDesc}</div>
                    </div>
                </div>
            </Link>
        )
    }
}    
