/**
 * Class: ButtonWrapper
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { BtnWrapper } from "./style";

export default class PrimaryButton extends Component {
  static propTypes = {
    txt: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  render() {
    const { txt, onSubmit, disabled } = this.props;
    return (
      <BtnWrapper disabled={disabled}>
        <button className={"form__btn"} onClick={onSubmit} disabled={disabled}>
          {txt}
        </button>
      </BtnWrapper>
    );
  }
}
