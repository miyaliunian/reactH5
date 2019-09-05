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
import Button from "@components/Button/Button";

class PayResultContainer extends Component {
    render() {
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
                            <Button txt={'完成'} onSubmit={() => {}}/>
                        </ButtonWrapper>
                        <FormWrapper>
                            <div className={'form_row'}>
                                <span>订单号</span>
                                <span>订单号</span>
                            </div>
                            <div className={'form_row'}>
                                <span>商品名称</span>
                                <span>订单号</span>
                            </div>
                            <div className={'form_row'}>
                                <span>总金额</span>
                                <span>￥{5.00}</span>
                            </div>
                        </FormWrapper>
                    </ContentWrapper>
                </SafeAreaView>
            </div>
        )
    }


    handleBack() {
        this.props.history.goBack()
    }
}


export default withRouter(PayResultContainer)