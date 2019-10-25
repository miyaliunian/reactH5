/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  分类九宫格
 *
 */
import React, {Component} from 'react'
import Slider from 'react-slick'
import './style.less'

const dataSource = [
    [
        {
            name: "登录",
            src:
                "https://www.dpfile.com/sc/eleconfig/20170223152109dp_wx_maoyan_icon.png"
        },
        {
            name: "注册",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203337jiudian.png"
        },
        {
            name: "线上预约",
            src: "https://www.dpfile.com/sc/eleconfig/20160126202841xiuxianyule.png"
        },
        {
            name: "家庭成员",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203251waimai.png"
        },
        {
            name: "智能候诊",
            src: "https://www.dpfile.com/sc/eleconfig/20160204172927huoguo.png"
        },
        {
            name: "住院管理",
            src: "https://www.dpfile.com/sc/eleconfig/20160126202946liren.png"
        },
        {
            name: "H5TNative",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png"
        },
        {
            name: "支付成功倒计时",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png"
        },
        {
            name: "订单查询去支付",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png"
        },
        {
            name: "actionSheet",
            src: "https://www.dpfile.com/sc/eleconfig/20160126203542ktv.png"
        },
    ],
];
export default class Category extends Component {


    render() {
        const settings = {
            dots: true, //显示指示器
            arrow: true, // 左右两边隐藏箭头
            slidesToShow: 1,
            swipeToSlide: true,
            autoplay: true
        }
        return (
            <div className='category'>
                <Slider {...settings}>
                    {dataSource.map((section, index) => {
                        return (
                            <div key={index}>
                                {
                                    section.map((item, i) => {
                                        return (
                                            <div key={i} className='category__section' onClick={()=>this.props.category(i)}>
                                                <img className="category__icon" src={item.src} alt={'没有图片'}/>
                                                <span className='category__text'>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </Slider>
            </div>
        )
    }
}
