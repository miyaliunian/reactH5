/**
 * Class: MakeUpAdvancePaymentContainer
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 补缴预交金
 */
import React, {Component} from 'react';
import ButtonWrapper from "@baseUI/Button/PrimaryButton";
import {withRouter} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import './style.less'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

const amounts = ['1000', '2000', '3000', '5000', '10000', '20000',]

class MakeUpAdvancePaymentContainer extends Component {

    state = {
        amountSel: ''
    };

    render() {
        const {inName, inHosNo} = this.props.match.params
        return (
            <div className={'makeUpAdvancePayment'}>
                <SafeAreaView showBar={true} title={'补缴预交金'} isRight={false} handleBack={this.handleBack}>
                    <div className={'makeUpAdvancePayment_header'}>
                        <div className={'makeUpAdvancePayment_header_row'}>
                        <span style={{
                            color: '#6E6E6E',
                            fontSize: '16px',
                            display: 'inline-block',
                            width: '70px'
                        }}>住院号</span>
                            <span style={{fontSize: '16px'}}>{inHosNo}</span>
                        </div>
                        <div className={'makeUpAdvancePayment_header_row'}>
                        <span style={{
                            color: '#6E6E6E',
                            fontSize: '16px',
                            display: 'inline-block',
                            width: '60px'
                        }}>姓名</span>
                            <span style={{fontSize: '16px'}}>{inName}</span>
                        </div>
                    </div>
                    <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <div style={{padding: '10px', backgroundColor: 'white'}}>
                        <p>选择缴费金额</p>
                        <div className={'makeUpAdvancePayment_price_container'}
                             style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {amounts.map((item, index) => {
                                return (
                                    <div key={index} className={'makeUpAdvancePayment_price_item border-theme'}
                                         onClick={() => this.setState({amountSel: item})}>
                                        <span className={'makeUpAdvancePayment_price_item_txt'}>{item}元</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                    <div style={{padding: '10px', paddingBottom: '20px', backgroundColor: 'white'}}>
                        <p>请输入缴费金额</p>
                        <input placeholder={'￥'} className={'makeUpAdvancePayment_price_input'}
                               value={this.state.amountSel}
                               onChange={(e) => this.setState({amountSel: e.target.value})}/>

                        <ButtonWrapper txt={'立即缴费'} onSubmit={() => this.submitBtn()}/>
                    </div>
                </SafeAreaView>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    submitBtn() {
        if (this.state.amountSel === '') {
            Toast.info('缴费金额不能为空', 1)
            return
        }
        let path = {
            pathname: '/payContainer',
        }
        this.props.history.push(path)
    }
}


export default withRouter(MakeUpAdvancePaymentContainer)
