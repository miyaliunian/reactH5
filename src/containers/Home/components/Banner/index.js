/**
 * Class: Banner
 * Author: wufei
 * Date: 2019/5/23
 * Description: 轮播图
 *
 */
import React, { Component } from "react";
import Slider from "react-slick";
import BannerImg from "@images/Home/banner_01.jpg";
import "./style.less";
export default class Banner extends Component {
  render() {
    const settings = {
      dots: false, //显示指示器
      arrow: false, // 左右两边隐藏箭头
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true
    };
    return (
      <div>
        <Slider {...settings}>
          <img
            src={BannerImg}
            alt=""
            className="banner__icon"
            onClick={() => {
              alert(1);
            }}
          />
          <img
            src={BannerImg}
            alt=""
            className="banner__icon"
            onClick={() => {
              alert(1);
            }}
          />
        </Slider>
      </div>
    );
  }
}
