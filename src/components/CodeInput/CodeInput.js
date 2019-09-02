/**
 * Class: CodeInput
 * Author: wufei
 * Date: 2019/8/29
 * Description:
 *
 */
import React, {Component} from 'react'
import classNames from 'classnames'
import './style.less'

export default class CodeInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            v: [
                {index: 0, status: false},
                {index: 1, status: false},
                {index: 2, status: false},
                {index: 3, status: false},
                {index: 4, status: false},
                {index: 5, status: false}],
            ini:''
        };
        this.iniIndex = 0;
    }

    render() {
        return (
            <div className="pay-password">
                <input type="tel" maxLength="6" className="real-ipt"
                       onInput={(e) => this.unitOnChange(e)} />
                <div className="surface-ipts">
                    <div className="surface-ipt">
                        {this.state.v.map((item) => {
                            return (
                                <div key={item.index}>
                                    <span className={classNames({active: item.status})}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }

    unitOnChange(e) {
        let pas = Array.from(e.target.value)

        if (this.iniIndex < pas.length) {
            for (let i = 0; i < pas.length; i++) {
                this.state.v.map((item) => {
                    if (item.index == i) {
                        item.status = true
                    }
                })
            }
        } else {
            //删除
            this.state.v.map((item) => {
                if (item.index == pas.length) {
                    item.status = false
                }
            })
        }
        this.setState({v: this.state.v})
        this.iniIndex = pas.length
        if (pas.length === 6 ) console.log(`你的输入${e.target.value}`)
    };
}


