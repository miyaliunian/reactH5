/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *
 */
import React from "react";
import PropTypes from "prop-types";
import "./navbar.less";

export default function NavBar(props) {
  const { onBack, isShowCloseIcon, isShowSearchIcon, title, onClick, onClose } = props;
  return (
    <div className="header border-bottom">
      <div className="header-back" onClick={onBack}>
        <svg width="42" height="42">
          <polyline
            points="25,13 16,21 25,29"
            stroke="black"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
      {Boolean(isShowCloseIcon) && (
        <div className="header-close" onClick={() => onClose()}>
          <i className="iconfont" style={{fontSize:"20px"}}>&#xe615;</i>
        </div>
      )}
      <h1 className="header-title">{title}</h1>
      {Boolean(isShowSearchIcon) && (
        <div className={"header-right"} onClick={() => onClick()}>
          <i className="iconfont" style={{fontSize:"20px"}}>&#xe687;</i>
      </div>
      )}
    </div>
  );
}

NavBar.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isShowSearchIcon: PropTypes.bool
};

