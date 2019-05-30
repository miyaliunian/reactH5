/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *
 */
import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile';
import './style.less'
export default class Header extends Component {
    render() {
        const {title, onBack} = this.props;
        return (
            <div className={'header'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"  color={'#969696'}/>}
                    onLeftClick={onBack}
                    rightContent={[
                        <Icon key="0" type="search"  style={{marginRight: '16px'}} onClick={() => console.log('onRightClick')}/>
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}    
