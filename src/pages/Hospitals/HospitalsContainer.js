/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *  医院列表容器
 */
import React, {Component} from 'react'
import Header from "../../components/Header/Header";
import HospitalsItem from "./components/HospitalsItem/HospitalsItem";
import Tabs from "./components/Tabs/Tabs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as hospitalActions, getHospitalList} from '../../reduxs/modules/hospital'
import './style.css'

class HospitalsContainer extends Component {

    render() {
        return (
            <div className={'hospitalsContainer'}>
                <Header title={'医院列表'} onBack={this.handleBack}/>
                <Tabs
                    handelTabRowSel={(item, index) => this.handelTabRowSel(item, index)}
                    handelTabItemSel={(item) => this.handelTabItemSel(item)}
                />
                <HospitalsItem data={this.props.hospitalList}/>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.props.hospitalActions.loadHosipitalList()
    }

    //处理行选中
    handelTabRowSel(item, index) {
        if (index == 1) { // 区域
            this.props.hospitalActions.setAreaId(item.code)
        } else { // 综合排序
            this.props.hospitalActions.setSord(item.value)
        }
        this.props.hospitalActions.loadHosipitalList()
    }

    //处理列选中
    handelTabItemSel(item) {
        this.props.hospitalActions.setCategoryGrade(item)
        this.props.hospitalActions.loadHosipitalList()
    }
}


const mapStateToProps = (state) => {
    return {
        hospitalList: getHospitalList(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        hospitalActions: bindActionCreators(hospitalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalsContainer)