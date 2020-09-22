/**
 * Class: PayCountdown
 * Author: wufei
 * Date: 2019/9/13
 * Description:
 *
 */
import React, { Component } from "react";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import { withRouter } from "react-router-dom";
import { Container, CountDownWrapper } from "./style";

class PayCountdown extends Component {
  state = {
    countDown: 15
  };

  render() {
    return (
      <div>
        <SafeAreaView
          showBar={true}
          title={"支付结果"}
          isRight={false}
          handleBack={this.handleBack}
        >
          <Container>
            <CountDownWrapper>
              <i></i>
              <span className={"countNum"}>{this.state.countDown}</span>
            </CountDownWrapper>
            <h2 style={{ fontSize: "large", marginBottom: "10px" }}>
              正在等待对方银行返回结果...
            </h2>
            <p style={{ color: "#FFCF53", fontSize: "small" }}>
              结果返回前，请不要重复支付
            </p>
          </Container>
        </SafeAreaView>
      </div>
    );
  }

  componentDidMount() {
    const { sn, reservationName, price } = this.props.location.state;
    this.interval = setInterval(() => {
      if (this.state.countDown === 1) {
        let path = {
          pathname: "/payResultContainer",
          state: {
            sn: sn,
            reservationName: reservationName,
            price: price
          }
        };
        this.props.history.push(path);
      } else {
        this.setState({ countDown: this.state.countDown - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  handleBack = () => {
    this.props.history.goBack();
  };
}

export default withRouter(PayCountdown);
