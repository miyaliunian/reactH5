/**
 * Class: PayResultContainer
 * Author: wufei
 * Date: 2019/9/5
 * Description:
 *
 */
import React, {Component} from 'react'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import {withRouter} from 'react-router-dom'
//图标
import icon_pay_result from '@images/Pay/ico_zfcg_png.png'
import {ContentWrapper, ButtonWrapper,FormWrapper} from './style'
import PrimaryButton from "@baseUI/Button/PrimaryButton";
//Redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    actions as orderPayActions,
    getOrderType
} from '../../../reduxs/modules/orderPay'

class PayResultContainer extends Component {
    render() {
        const {sn,reservationName,price} = this.props.location.state
        return (
            <div>
                <SafeAreaView showBar={true}
                              title={'支付结果'}
                              isRight={false}
                              handleBack={() => this.handleBack()}
                >
                    <ContentWrapper>
                        <img className={'img_attr'} src={icon_pay_result} alt={''}/>
                        <span className={'img_title'}>支付成功!</span>
                        <ButtonWrapper>
                            <PrimaryButton txt={'完成'} onSubmit={() => this.btnCLick()}/>
                        </ButtonWrapper>
                        <FormWrapper>
                            <div className={'form_row'}>
                                <span>订单号</span>
                                <span>{sn}</span>
                            </div>
                            <div className={'form_row'}>
                                <span>商品名称</span>
                                <span>{reservationName}</span>
                            </div>
                            <div className={'form_row'}>
                                <span>总金额</span>
                                <span>￥{price.toFixed(2)}</span>
                            </div>
                        </FormWrapper>
                    </ContentWrapper>
                </SafeAreaView>
            </div>
        )
    }

    componentDidMount(){

    }

    btnCLick(){
        const {fromStatus,orderPayActions:{cleanOrderPayType},history} =this.props
        debugger
        if (fromStatus) {
            cleanOrderPayType(()=>{
                window['J2C'].back2NativeVC("back2NativeVC", function (e) {
                })
            })
        }else {
            history.replace('/')
        }
    }


    handleBack() {
        this.props.history.replace('/')
    }
}

const mapStateToProps = (state) => {
    return {
        fromStatus:getOrderType(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderPayActions: bindActionCreators(orderPayActions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PayResultContainer))
