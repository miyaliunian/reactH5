/**
 * 门诊缴费 By WF 2020/01/02
 */
import React, {Component} from 'react'
import Header from '@components/NavBar/NavBar'
import './style.less'
import {Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CategoryHosList from '@components/CategoryHosList/CategoryHosList'
import HeaderSelectItem from './components/HeaderSelectItem/HeaderSelectItem'
import OutpatientPaymentContent from './components/OutpatientPaymentContent/OutpatientPaymentContent'
import LoadingMask from '../../components/Loading/LoadingMask'
import Modal2Hos from '@material-ui/core/Modal'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import {
    actions as outpatientPaymentActions,
    getFamilyList,
    getDefaultPerson,
    getHospitalList,
    getSelHospital,
    getFetchingStatus,
    getRecentHospitalList,
    getOutpatientPaymentList
} from '@reduxs/modules/outpatientPayment'

const IntelligentWaitingRefreshTime = {
    time: 60000 // 刷新时间一分钟，单位为毫秒
}

class OutpatientPaymentContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModalHospital: false
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.bindCardList !== this.props.bindCardList) {
        //   let perObj = nextProps.bindCardList.filter(item => item.isSel)
        //   this.props.bindCardActions.loadingWaitingListByPerson(perObj[0])
        // }
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {familyList, hospitalList, fetchingStatus, recentHopsitalList, selHospital} = this.props
        console.log('OutpatientPaymentCOntainer render this.props')
        console.group(this.props)
        return (
            <SafeAreaView showBar={true} title={'门诊缴费'} isRight={false} handleBack={this.handleBack}>
                <div
                    id="outpatientPaymentContainer"
                    onTouchMove={e => this.handleTouchMove(e)}
                    className={'intelligentWaitingContainer'}>
                    {/*-------------------------选择成员信息*/}
                    <div className={'header_select_item_div border-bottom'}>
                        <div onClick={() => this.gotoFamilyPage()}>
                            <HeaderSelectItem
                                data={familyList}
                                isRefresh={this.refresh}
                                title={'就诊人'}
                                clickTxt={'切换成员'}
                                txt={this.props.defaultPerson.name}
                            />
                        </div>
                        <div onClick={() => this.setState({openModalHospital: !this.state.openModalHospital})}>
                            <HeaderSelectItem
                                data={hospitalList}
                                isRefresh={this.refresh}
                                title={'就诊医院'}
                                txt={selHospital ? selHospital.name : hospitalList[0].name}
                            />
                        </div>
                    </div>
                    <Modal2Hos BackdropProps={{'background-color': 'red'}} open={this.state.openModalHospital}>
                        <CategoryHosList
                            bindCardList={familyList}
                            onNavBack={() => this.setState({openModalHospital: !this.state.openModalHospital})}
                            callBack={data => this.refreshHospital(data)}
                        />
                    </Modal2Hos>
                    <OutpatientPaymentContent {...this.props} />
                </div>
                <LoadingMask/>
            </SafeAreaView>
        )
    }

    gotoFamilyPage() {
        let path = {
            pathname: 'bindCardList',
            callBack: data => this.refreshPerson(data)
        }
        this.props.history.push(path)
    }

    refreshPerson = data => {
        console.log('refreshPerson')
        console.group(data)
        if (data && data.id != this.props.defaultPerson.id) this.props.outpatientPaymentActions.loadPageBySelectPerson(data)
        else console.log('人员未变')
    }

    //重新选择医院后刷新数据
    refreshHospital(data) {
        console.log('OutpatientPaymentContainer refreshHospital:')
        console.group(data)
        if (data && data.id != this.props.selHospital.id) this.props.outpatientPaymentActions.loadPageBySelectHospital(data)
        else console.log('医院未变')
        this.setState({openModalHospital: !this.state.openModalHospital})
    }

    // componentDidMount() {
    //   this.props.bindCardActions.loadWaitingList();
    //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
    //   this.timer = setInterval(
    //     () => this.timeToRefresh(),
    //     IntelligentWaitingRefreshTime.time
    //   );
    // }

    componentDidMount() {
        const {history} = this.props
        if (history.action === 'PUSH') {
            const alert = Modal.alert
            const showAlert = () => {
                const alertInstance = alert('提示', '请选择就诊人和就诊医院，以准确查找缴费订单。', [
                    {text: '我已知晓', onPress: () => this.loadPageData()}
                ])
            }
            showAlert()
        }
    }

    loadPageData() {
        console.log('--------------------9999')
        this.props.outpatientPaymentActions.loadPageByDefaultPerson()
        // this.props.outpatientPaymentActions.loadRecentHospitalListByPersonId(this.props.defaultPerson)
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer && clearTimeout(this.timer)
    }

    //下拉刷新
    pullingDownHandler() {
        this.getWaitingListByPerson()
    }

    //定时执行刷新
    timeToRefresh() {
        this.getWaitingListByPerson()
    }

    handleTouchMove(event) {
    }

    //
}

const mapStateToProps = state => {
    return {
        familyList: getFamilyList(state),
        hospitalList: getHospitalList(state),
        fetchingStatus: getFetchingStatus(state),
        defaultPerson: getDefaultPerson(state),
        recentHopsitalList: getRecentHospitalList(state),
        selHospital: getSelHospital(state),
        outpatientPaymentList: getOutpatientPaymentList(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        outpatientPaymentActions: bindActionCreators(outpatientPaymentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutpatientPaymentContainer)
