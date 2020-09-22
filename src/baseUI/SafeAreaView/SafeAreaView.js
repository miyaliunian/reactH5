/**
 * Class: SafeAreaView
 * Author: wufei
 * Date: 2019/9/2
 * Description:
 *  安全区外部包裹
 */
import React, { useState,useCallback} from "react";
import NavBar from "@components/NavBar/NavBar";
import SearchSelector from "@components/doSearch/SearchSelector";
import { withRouter } from "react-router-dom";
//样式
import PropTypes from "prop-types";
import { StyledComponent } from "./style";

function SafeAreaView(props) {
  const { showBar, title, isRight, isCLose } = props;
  const [showSearchPage, setSearchPage] = useState(false);

  const onClose=useCallback(()=>{
    props.history.push("/")
  },[])

  const handleBack = useCallback(()=>{
    props.history.goBack()
  },[])
 
  let show = !global.isShowNavBar ? false : (showBar ? true :false)

  return (
    <StyledComponent>
      { show ? <NavBar title={title} isShowSearchIcon={isRight} onClick={() => setSearchPage(!showSearchPage)}
                         onBack={handleBack} isShowCloseIcon={isCLose} onClose={onClose}/> : null}
      {props.children}
      <SearchSelector
        show={showSearchPage}
        onBack={() => setSearchPage(!showSearchPage)}
      />
    </StyledComponent>
  );
}


SafeAreaView.prototype = {
  showBar: PropTypes.bool.isRequired,  // 只能影响局部的
  isShowSearchIcon:PropTypes.bool, // 右侧的搜索
  isCLose:PropTypes.bool, // 关闭按钮
  title: PropTypes.string.isRequired, // 标题
};

export default withRouter(SafeAreaView);