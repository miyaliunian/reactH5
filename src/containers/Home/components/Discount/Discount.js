/**
 * Class:
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, {Component} from "react";
import "./style.css"

const dataSource = [
    {
        id: "p-100",
        url: "https://m.dianping.com/tuan/deal/8225736?from=m_discount",
        shopId: "s-100",
        shop: "泫舞舞蹈俱乐部",
        product: "泫舞舞蹈俱乐部",
        currentPrice: 1,
        oldPrice: 400,
        picture:
            "https://p1.meituan.net/dpdeal/a8eb71748e1f4df175668368e98bb4f868511.jpg.webp@120w_90h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20"
    },
    {
        id: "p-101",
        url: "https://m.dianping.com/tuan/deal/21954393?from=m_discount",
        shopId: "s-101",
        shop: "忍·寿司",
        product: "忍·寿司",
        currentPrice: 1,
        oldPrice: 2,
        picture:
            "https://p0.meituan.net/deal/2540cbdfbab2b413491101cee34bbb7a51839.jpg.webp@120w_90h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20"
    },
    {
        id: "p-102",
        url: "https://m.dianping.com/tuan/deal/30093047?from=m_discount",
        shopId: "s-102",
        shop: "关忠动物医院",
        product: "关忠动物医院",
        currentPrice: 1,
        oldPrice: 349,
        picture:
            "https://p1.meituan.net/dpdeal/ef9356fa57c8382bfae0787101a69d2e164461.jpg.webp@120w_90h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20"
    }
];

class Discount extends Component {
    render() {
        const data = dataSource;
        return (
            <div className="discount">
                <a className="discount__header" href='/'>
                    <span className="discount__title">布局demo</span>
                </a>
                <div className="discount__content">
                    {data.map((item, index) => {
                        return (
                            <a key={item.id} className="discount__item" href={item.url}>
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
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Discount;