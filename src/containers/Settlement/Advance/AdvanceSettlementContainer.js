/**
 * Class: AdvanceSettlementContainer
 * Author: wufei
 * Date: 2019/8/28
 * Description:
 *  订单预结算
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import ico_user from '@images/Home/ico_user.png'
import Button from "@components/Button/Button";
import {PerContent, SettleInfoContent, InfoRow, Separation, PayInfoContent, BtnContent} from './style'

export default class AdvanceSettlementContainer extends Component {
    render() {
        return (
            <div id={'AdvanceSettlementContainer'} style={{height:'100vh',width:'100%',position:'fixed'}}>
                <Header title={'订单预结算'} isRight={false} onBack={this.handleBack}/>
                <PerContent>
                    <img src={ico_user} className={'bindCard__icon'} width={'35px'} height={'35px'}/>
                    <span style={{marginLeft: '10px', fontSize: '20px'}}>王兴辉</span>
                </PerContent>
                <SettleInfoContent>
                    <InfoRow showBorder={false}>
                        <span style={{color: '#737373', fontSize: '17px'}}>订单号</span>
                        <span>616265765313576960</span>
                    </InfoRow>
                    <InfoRow showBorder={false}>
                        <span style={{color: '#737373', fontSize: '17px'}}>商品名称</span>
                        <span>线上挂号</span>
                    </InfoRow>
                    <InfoRow showBorder={false}>
                        <span style={{color: '#737373', fontSize: '17px'}}>总金额</span>
                        <span style={{color: 'orange', fontSize: '22px', fontWeight: 'bold'}}>￥30.00</span>
                    </InfoRow>
                </SettleInfoContent>
                <Separation/>
                <PayInfoContent>
                    <InfoRow showBorder={true}>
                        <span className={'infoRow_item_title'}>统筹支付</span>
                        <div className={'infoRow_item_middle'}>
                            <span>￥0.00</span>
                            <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                        </div>
                        <div className={'infoRow_item_right'}>
                            <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                            <span style={{marginLeft: '10px', fontSize: '10px', color: '#737373'}}>3987.95</span>
                        </div>
                    </InfoRow>
                    <InfoRow showBorder={true}>
                        <span className={'infoRow_item_title'}>账户支出</span>
                        <div className={'infoRow_item_middle'}>
                            <span>￥0.00</span>
                            <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                        </div>
                        <div className={'infoRow_item_right'}>
                            <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                            <span style={{marginLeft: '10px', fontSize: '10px', color: '#737373'}}>3987.95</span>
                        </div>
                    </InfoRow>
                    <InfoRow showBorder={true}>
                        <span className={'infoRow_item_title'}>自费支出</span>
                        <div className={'infoRow_item_middle'}>
                            <span>￥0.00</span>
                            <span style={{marginLeft: '5px', color: '#0084ff'}}>[已支付]</span>
                        </div>
                        <div className={'infoRow_item_right'}>
                            <span style={{fontSize: '10px', color: '#737373'}}>账户余额:</span>
                            <span style={{marginLeft: '10px', fontSize: '10px', color: '#737373'}}>3987.95</span>
                        </div>
                    </InfoRow>
                </PayInfoContent>
                <BtnContent height={20}>
                    <Button txt={'自费支付'} onSubmit={() => alert('sss')}/>
                </BtnContent>
            </div>
        )
    }

    componentDidMount(){
        // document.getElementById('AdvanceSettlementContainer').addEventListener("touchstart", (event) => {
        //     event.preventDefault();
        // }, {
        //     passive: false //  禁止 passive 效果
        // })
    }

    handleBack = () => {
        this.props.history.goBack()
    }
}    
