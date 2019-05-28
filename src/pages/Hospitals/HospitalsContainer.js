/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "../../components/Header/Header";
import HospitalsItem from "./components/HospitalsItem/HospitalsItem";
import './style.css'
import Tabs from "./components/Tabs/Tabs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as hospitalActions, getHospitalList} from '../../reduxs/modules/hospital'


class HospitalsContainer extends Component {
    render() {

        return (
            <div className={'hospitalsContainer'}>
                <Header title={'医院列表'} onBack={this.handleBack}/>
                <Tabs/>
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
}


const mapStateToProps = (state) => {
    return {
        hospitalList:getHospitalList(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        hospitalActions: bindActionCreators(hospitalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalsContainer)