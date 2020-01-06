import React, { Component } from "react";
import './scrollView.less'

/**
 * <ScrollView loadCallback={function} isend={false}>
 */
export default class ScrollView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isend: false//标示页面是否可以滚动
    };
    //记录当前页码
    this.page = 0;
  }

  render() {
    return (
      <div className={"scrollview"}>
        {this.props.child}
      </div>
    );
  }


  onLoadPage() {
    console.log(this.props.data);
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let proLoadDis = 80;
    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      if (!this.props.isend){
        this.props.loadCallback &&  this.props.loadCallback()
      }
    }
  }


  componentDidMount() {
    window.addEventListener("scroll", () => this.onLoadPage());
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.onLoadPage());
  }

}