/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:
 *
 */
import React, {PureComponent} from 'react'
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from "prop-types";
import './style.less'

export default class Header extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        isRight: PropTypes.bool.isRequired,
        onBack:PropTypes.func.isRequired
    };

    render() {
        const {title, onBack, isRight} = this.props;
        return (
            <div className={'header'}>
                {isRight
                    ?
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" color={'#969696'}/>}
                        onLeftClick={onBack}
                        rightContent={[
                            <Icon key="0" type="search" style={{marginRight: '16px'}}
                                  onClick={() => console.log('onRightClick')}/>
                        ]}
                    >{title}</NavBar>
                    :
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" color={'#969696'}/>}
                        onLeftClick={onBack}

                    >{title}</NavBar>
                }
                {/*<NavBar*/}
                {/*mode="light"*/}
                {/*icon={<Icon type="left"  color={'#969696'}/>}*/}
                {/*onLeftClick={onBack}*/}
                {/*rightContent={[*/}
                {/*<Icon key="0" type="search"  style={{marginRight: '16px'}} onClick={() => console.log('onRightClick')}/>*/}
                {/*]}*/}
                {/*>{title}</NavBar>*/}
            </div>
        )
    }
}    
