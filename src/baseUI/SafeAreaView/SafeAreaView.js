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
  const { showBar, title, isRight, handleBack, isCLose } = props;
  const [showSearchPage, setSearchPage] = useState(false);

  const onClose=useCallback(()=>{
    props.history.push("/")
  },[])


  return (
    <StyledComponent>
      {showBar ? <NavBar title={title} isShowSearchIcon={isRight} onClick={() => setSearchPage(!showSearchPage)}
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
  showBar: PropTypes.bool.isRequired,
  isShowSearchIcon:PropTypes.bool,
  isCLose:PropTypes.bool,
  title: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default withRouter(SafeAreaView);