/**
 * Class: MakeUpAdvancePayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 补缴预交金
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";
import './style.less'
import Button from "@components/Button/Button";

const amounts = ['1000元', '2000元', '3000元', '5000元', '10000元', '20000元',]
export default class MakeUpAdvancePayment extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {inName, inHosNo} = this.props.match.params
        return (
            <div className={'makeUpAdvancePayment'}>
                <Header title={'补缴预交金'} isRight={false} onBack={this.handleBack}/>
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
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {amounts.map((item, index) => {
                            return (
                                <div key={index} className={'makeUpAdvancePayment_price_item border'}>
                                    <span>{item}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{height: '15px', backgroundColor: 'rgb(230,230,230)'}}/>
                <div style={{padding: '10px', backgroundColor: 'white'}}>
                    <p>请输入缴费金额</p>
                    <input placeholder={'￥'} className={'makeUpAdvancePayment_price_input'}/>
                    <Button txt={'立即缴费'} onSubmit={()=>{alert('立即缴费')}}/>
                </div>
                
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
    }
}



