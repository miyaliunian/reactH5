/**
 * Class: PayContainer
 * Author: wufei
 * Date: 2019/8/16
 * Description:
 *  支付公用页面
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import {withRouter} from 'react-router-dom'
import './style.less'

class PayContainer extends Component {
    render() {
        return (
            <div className={'payComponent'} style={{position: 'absolute', left:'0',top:'0',width:'100vw',height:'100vh'}}>
                <Header title={'选择支付方式'} isRight={false} onBack={this.handleBack}/>
                <div className={'payComponent_info'}>
                    <div className={'payComponent_info_row'}>
                        <span>订单号</span>
                        <span>订单号</span>
                    </div>
                    <div className={'payComponent_info_row'}>
                        <span>商品名称</span>
                        <span>住院预交金</span>
                    </div>
                    <div className={'payComponent_info_row'}>
                        <span>账户支付</span>
                        <span style={{color: 'orange'}}>￥{12988}</span>
                    </div>
                </div>
                <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                <div className={'payComponent_payType'}>
                    <p style={{height: '30px', lineHeight: '30px'}}>请选择支付方式</p>
                    <div className={'payComponent_payBtn_row border-top '}>
                        <span style={{fontSize: '17px'}}>e融支付</span>
                    </div>
                    <div className={'payComponent_payBtn_row border-top'}>
                        <span style={{fontSize: '17px'}}>一卡通银行卡支付</span>
                    </div>
                    <div className={'payComponent_payBtn_row border-top'}>
                        <span style={{fontSize: '17px'}}>微信支付</span>
                    </div>
                </div>
                <div className={'payComponent_bottomBtn'}>
                    <span className={'payComponent_desc'}>待支付：￥1wwww</span>
                    <span className={'payComponent_btn'}>支  付</span>
                </div>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        const {history} = this.props
        if (history.action === 'PUSH') {
            console.log('第一次进入页面')
        }
    }
}


export default withRouter(PayContainer)
