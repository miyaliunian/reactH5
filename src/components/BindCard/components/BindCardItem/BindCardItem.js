/**
 * Class: item
 * Author: wufei
 * Date: 2019/6/12
 * Description:
 *   每一项
 */
import React, {Component} from 'react'
import PropTypes from "prop-types";
import ico_user from '@images/Home/ico_user.png'
import {Icon} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import './style.less'

class BindCardItem extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    render() {
        const {data} = this.props
        return (

            <div className={'bindCard__list border-bottom'} onClick={() => this.navPage(data)}>
                <div className={'bindCard__left'}>
                    <img src={ico_user} className={'bindCard__icon'}/>

                    {data.map(item => {
                        if (item.def) {
                            return (<div key={item.id}>{item.name}</div>)
                        }
                    })}
                </div>

                <div>
                    <Icon type="right" color={'#007FFE'}/>
                </div>
            </div>

        )
    }


    navPage(data) {
        let path = {
            pathname: 'bindCardList',
            state: data
        }
        this.props.history.push(path)
    }

}


export default withRouter(BindCardItem)