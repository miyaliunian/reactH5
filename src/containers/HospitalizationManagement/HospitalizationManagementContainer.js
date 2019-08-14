/**
 * Class: HospitalizationManagementContainer
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import HospitalizationList from "@containers/HospitalizationManagement/Components/Hospitalization/HospitalizationList";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import {Icon} from 'antd-mobile';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as bindCardActions, getBindCardList} from "@reduxs/modules/bindCard";
import {
    getFetchingStatus,
    getHospitalizationList,
    getIsSelHospitalization,
    getHospitalDetails,
    actions as hospitalizationManagementActions
} from "@reduxs/modules/hospitalizationManagement";

import './style.less'

class HospitalizationManagementContainer extends Component {


    constructor(props) {
        super(props)
        this.state = {
            openModalBindCardItem: false,
            openModalHospitalization: false,
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.bindCardList != this.props.bindCardList) {
            console.log('componentWillReceiveProps')
            let perObj = nextProps.bindCardList.filter(item => item.def)
            this.props.hospitalizationManagementActions.getRegedListByOpenType('inPrePay', perObj[0])
        }
    }

    render() {
        const {bindCardList, hospitalizationList, hospitalizationSel, hospitalDetails} = this.props
        return (
            <div className={'hospitalizationManagement'}>
                <Header title={'住院服务'} isRight={false} onBack={this.handleBack}/>
                {/*-------------------------选择成员信息*/}
                <BindCardItem data={bindCardList} isRefresh={this.refresh}
                              callBack={(data) => this.refreshCallBack(data)}/>
                {/*-------------------------选择医院*/}
                <div className={'hospitalizationManagement_hospitalization border-bottom'} onClick={() => {
                    this.setState({openModalHospitalization: true})
                }}>
                    <span className={'hospitalizationManagement_hospitalization_text_Style'}>就诊医院</span>
                    <div className={'hospitalization_right'}>
                        <span
                            className={'hospitalization_right_text_Style'}>{hospitalizationSel ? hospitalizationSel.aliasName : '请选择医院'}</span>
                        <Icon className={'clinic__bar__icon'} type={'right'}/>
                    </div>
                </div>
                <Modal
                    BackdropProps={{'background-color': 'red'}}
                    open={this.state.openModalHospitalization}
                >
                    <HospitalizationList reservationData={hospitalizationList}
                                         onNavBack={() => this.handelModalHospitalization()}
                                         callBack={(data) => this.refreshHospitalDetail(data)}/>
                </Modal>

                {/*是否显示住院信息*/}
                {hospitalDetails
                    ?
                    <div className={'hospitalizationManagement_hospitalization_info'}>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>住院号</span>
                            <span className={'row_info_detail'}>{hospitalDetails.inHosNo}</span>
                        </div>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>入院时间</span>
                            <span className={'row_info_detail'}>{hospitalDetails.inHosDate}</span>
                        </div>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>科室</span>
                            <span className={'row_info_detail'}>{hospitalDetails.deptName}</span>
                        </div>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>床号</span>
                            <span className={'row_info_detail'}>{hospitalDetails.bedNo}</span>
                        </div>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>总费用</span>
                            <span className={'row_info_detail'}
                                  style={{color: 'orange'}}>￥{hospitalDetails.totCost}</span>
                        </div>
                        <div className={'hospitalization__row'}>
                            <span className={'row_info_title'}>剩余预交金</span>
                            <span className={'row_info_detail'}>￥{hospitalDetails.account}</span>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    handelModalBindCardItem = () => {
        this.setState({openModalBindCardItem: false})
    };


    handelModalHospitalization = () => {
        this.setState({openModalHospitalization: false})
    };


    componentDidMount() {
        const {history} = this.props
        if (!history || history.action === 'PUSH') {
            this.props.bindCardActions.loadList()
        }
    }

    refreshCallBack(data) {
        const {hospitalizationSel} = this.props
        this.props.hospitalizationManagementActions.refreshRegedListByOpenType('inPrePay', hospitalizationSel.id, data)
    }


    refreshHospitalDetail(data) {
        console.log(data)
    }


}


const mapStateToProps = (state) => {
    return {
        bindCardList: getBindCardList(state),
        fetchingStatus: getFetchingStatus(state),
        hospitalizationList: getHospitalizationList(state),
        hospitalizationSel: getIsSelHospitalization(state),
        hospitalDetails: getHospitalDetails(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bindCardActions: bindActionCreators(bindCardActions, dispatch),
        hospitalizationManagementActions: bindActionCreators(hospitalizationManagementActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationManagementContainer)