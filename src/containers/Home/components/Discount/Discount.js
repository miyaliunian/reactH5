/**
 * Class:
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, {Component} from "react";
import {Link} from 'react-router-dom'
import "./style.less"

class Discount extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className="discount">
                <a className="discount__header" href='/'>
                    <span className="discount__title">布局demo</span>
                </a>
                <div className="discount__content">
                    {data.map((item, index) => {
                        return (
                            <Link to={`/detail/${item.id}`} key={item.id} className="discount__item">
                                <div className="discount__itemPic">
                                    <img width="100%" height="100%" src={item.picture} alt=''/>
                                </div>
                                <div className="discount__itemTitle">{item.shop}</div>
                                <div className="discount__itemPriceWrapper">
                                    <ins className="discount__itemCurrentPrice">
                                        {item.currentPrice}
                                    </ins>
                                    <del className="discount__itemOldPrice">{item.oldPrice}</del>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Discount;