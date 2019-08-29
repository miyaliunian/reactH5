/**
 * Class: MedicarePayContainer
 * Author: wufei
 * Date: 2019/8/16
 * Description:
 *  医保支付
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import {withRouter} from 'react-router-dom'
import icon_ybzf from '@images/Pay/ico_ybk_png.png';
import {Modal, Icon} from 'antd-mobile'
import {Content} from './style'
import './style.less'
import CodeInput from "@components/CodeInput/CodeInput";


class MedicarePayContainer extends Component {

    state = {
        openModal: false,
    }

    render() {
        return (
            <div className={'medicarePay'} style={{height: '100vh', width: '100%', position: 'fixed'}}>
                <Header title={'医保支付'} isRight={false} onBack={this.handleBack}/>
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
                <div style={{height: '10px', backgroundColor: 'rgb(230,230,230)'}}/>
                <div className={'payComponent_payType'}>
                    <p style={{height: '50px', lineHeight: '50px', paddingLeft: '10px'}}>请选择支付方式</p>
                    <div className={'payComponent_payBtn_row border-top '}>
                        <img src={icon_ybzf} alt='' style={{width: '40px', height: '40px', paddingRight: '10px'}}/>
                        <div className={'payComponent_payBtn_row_right'}>
                            <span>医保支付</span>
                            <span style={{
                                color: 'rgb(126,126,126)',
                                fontSize: '13px',
                                marginTop: '2px'
                            }}>账户金额：830.80</span>
                        </div>
                    </div>
                </div>
                <div className={'payComponent_bottomBtn'}>
                    <span className={'payComponent_desc'}>待支付：￥1wwww</span>
                    <span className={'payComponent_btn'} onClick={() => {
                        this.setState({openModal: true})
                    }}>支  付</span>
                </div>
                <Modal
                    animated
                    transparent={true}
                    visible={this.state.openModal}
                >
                    <Content>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottom: '1px solid #0084ff',
                        }}>
                            <Icon type={'cross'} onClick={() => this.setState({openModal: false})}/>
                            <p style={{
                                flex: 1,
                                height: '40px',
                                lineHeight: '40px',
                                fontSize: '18px',

                            }}>请输入社保卡密码</p>
                        </div>
                        <p style={{marginTop: '10px', fontSize: '17px'}}>扫描购药</p>
                        <p style={{marginBottom: '10px', fontSize: '28px', fontWeight: 'bolder'}}>￥30.20</p>
                        <CodeInput/>
                    </Content>
                </Modal>
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


export default withRouter(MedicarePayContainer)
