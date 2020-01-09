/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 * scrollTop + clientHeight >= scrollHeight(当页面没有滚动时scrollheight是不存在当 只有body的高度超过clientHeight时才会出现)
 */
import React, { Component } from "react";
import HospitalsItem from "../HospitalsItem/HospitalsItem";
import ScrollView from "@baseUI/ScrollView/ScrollView";
//Redux
import {
  actions as hospitalActions,
  getFetchingStatus,
  getHospitalList,
  getIsLastPage
} from "@reduxs/modules/hospital";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";



class HosiContentList extends Component {

  renderItems() {
    const { hospitalList } = this.props;
    {
     return hospitalList.map((item, index) => {
        return (
          <HospitalsItem itemData={item} key={index}/>
        );
      });
    }
  }

  render() {
    const {hospitalActions:{moreHosipitalList}} = this.props
    return (
      <div className={"hospitalsItem_wrapper"}>
        <ScrollView loadCallback={()=>moreHosipitalList()}>
          {this.renderItems()}
        </ScrollView>
      </div>
    );
  }


  componentDidMount() {
    const { hospitalActions: { iniHosiList } } = this.props;
    iniHosiList();
  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {
  }

}


const mapStateToProps = state => {
  return {
    hospitalList: getHospitalList(state),
    fetchingStatus: getFetchingStatus(state),
    isLastPage: getIsLastPage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hospitalActions: bindActionCreators(hospitalActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HosiContentList);
