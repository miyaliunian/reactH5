/**
 * Class: CodeInput
 * Author: wufei
 * Date: 2019/8/29
 * Description:
 *
 */
import React, {Component} from 'react'
import AutoTabInput from './AutoTabInput'
import {Content} from './style'

export default class CodeInput extends React.Component {
    state = {};

    render() {
        return (
            <Content>
                <span style={{display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center'}}>
                <AutoTabInput
                    ref="inputmy"
                    type="tel"
                    autoFocus
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 0)}
                />
                <AutoTabInput
                    type="tel"
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 1)}
                />
                <AutoTabInput
                    type="tel"
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 2)}
                />
                <AutoTabInput
                    type="tel"
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 3)}
                />
                <AutoTabInput
                    type="tel"
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 4)}
                />
                <AutoTabInput
                    type="tel"
                    maxLength={1}
                    onChange={this.unitOnChange.bind(null, 5)}
                />
                </span>
            </Content>
        );
    }

    unitOnChange = (index, unit) => {
        console.log(index, unit)
    };
}


