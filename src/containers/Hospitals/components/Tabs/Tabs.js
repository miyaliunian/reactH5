/**
 * Class:
 * Author: wufei
 * Date: 2019/5/26
 * Description:  tabs 选择器
 *  医院列表
 */
import React, {Component} from 'react'
import {ZHPX, SX_YYLX, SX_YYDJ} from '@assets/static/DictionaryConstant'
import './style.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as tabActions, getAreasList} from "@reduxs/modules/tabs";


class Tabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab1focused: false,
            tab1focused_title: '全部区域',
            tab2focused: false,
            tab2focused_title: '综合排序',
            tab3focused: false,
            tabMaskIsSHow: false,
            sx_lx: SX_YYLX,
            sx_dj: SX_YYDJ,
            tab_sx_value: [],// 筛选
            tab_qylb_value: '',// 全部区域
            tab_zhpx_value: '',// 综合排序
        }
    }

    render() {
        const {areasList} = this.props
        return (
            <div className={'tabs'}>
                <ul className={'tabs__searchTOPWrapper border-bottom'}>
                    <li
                        className={this.state.tab1focused ? 'searchItem  itemSelected ' : 'searchItem'}
                        onClick={() => this.tabSelc(1)}>
                        {this.state.tab1focused_title}
                    </li>
                    <li
                        className={this.state.tab2focused ? 'searchItem2Seled' : 'searchItem2'}
                        onClick={() => this.tabSelc(2)}>
                        {this.state.tab2focused_title}
                        <div className={this.state.tab2focused ? 'searchItemSeledLine' : ''}/>
                    </li>
                    <li
                        className={this.state.tab3focused ? 'searchItem  itemSelected' : 'searchItem'}
                        onClick={() => this.tabSelc(3)}>筛选
                    </li>
                </ul>
                <div
                    id="tabsBottomWrapperCon"
                    className={this.state.tabMaskIsSHow ? 'tabs__BottomWrapper__con__show border-top' : 'tabs__BottomWrapper__con'}
                    onClick={() => this.close()}
                    onTouchMove={(e) => this.handleTouchMove(e)}

                >
                    {this.state.tab1focused
                        ?
                        <div
                            className={this.state.tab1focused ? 'tabs__BottomWrapper__tab animated fadeInDown faster' : 'tabs__BottomWrapper__tabSel '}
                        >
                            {areasList.map((item) => {
                                return <div className={'tabs__Bottom__Item border-bottom'}
                                            key={item.name}
                                            onClick={() => this.tabRowSel(item, 1)}>{item.name}</div>
                            })}
                        </div>

                        :
                        null
                    }
                    {this.state.tab2focused
                        ?
                        <div
                            className={this.state.tab2focused ? 'tabs__BottomWrapper__tab animated fadeInDown faster' : 'tabs__BottomWrapper__tabSel'}>

                            {ZHPX.map((item) => {
                                return <div className={'tabs__Bottom__Item border-bottom'}
                                            key={item.value}
                                            onClick={() => this.tabRowSel(item, 2)}>{item.title}</div>
                            })}
                        </div>
                        :
                        null
                    }
                    {this.state.tab3focused
                        ?
                        <div
                            className={this.state.tab3focused ? 'tabs__BottomWrapper__tab animated fadeInDown faster' : 'tabs__BottomWrapper__tabSel'}>
                            <div className={'tabs__BottomWrapper__tab3__con'} onClick={(e) => {
                                e.stopPropagation()
                            }}>
                                <div>
                                    <div>
                                        医院类型: {this.state.sx_lx.title}
                                    </div>
                                    <div className={'tabs__tab3__inner'}>

                                        {this.state.sx_lx.data.map((item) => {
                                            return <div
                                                className={item.isSel ? 'tabs3__innerTextSel' : 'tabs3__innerText'}
                                                key={item.value}
                                                onClick={(e) => this.tabItemSel(e, item, 1)}>{item.title}</div>
                                        })}
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        医院类型: {this.state.sx_dj.title}
                                    </div>
                                    <div className={'tabs__tab3__inner'}>
                                        {this.state.sx_dj.data.map((item) => {
                                            return <div
                                                className={item.isSel ? 'tabs3__innerTextSel' : 'tabs3__innerText'}
                                                key={item.value}
                                                onClick={(e) => this.tabItemSel(e, item, 2)}>{item.title}</div>
                                        })}
                                    </div>
                                    <div className={'tabs__tab3__btn'} onClick={() => this.tabItemBtnClick()}>确定</div>
                                </div>
                            </div>

                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    //tab选中
    tabSelc(index) {
        switch (index) {
            case 1:
                if (this.state.tab1focused) {
                    this.setState({
                        tabMaskIsSHow: !this.state.tabMaskIsSHow
                    })
                } else {
                    this.setState({
                        tab1focused: !this.state.tab1focused,
                        tab2focused: false,
                        tab3focused: false,
                        tabMaskIsSHow: !this.state.tab1focused
                    })
                }
                return
            case 2:
                if (this.state.tab2focused) {
                    this.setState({
                        tabMaskIsSHow: !this.state.tabMaskIsSHow
                    })
                } else {
                    this.setState({
                        tab1focused: false,
                        tab2focused: !this.state.tab2focused,
                        tab3focused: false,
                        tabMaskIsSHow: !this.state.tab2focused
                    })
                }

                return
            case 3:
                if (this.state.tab3focused) {
                    this.setState({
                        tabMaskIsSHow: !this.state.tabMaskIsSHow
                    })
                } else {
                    this.setState({
                        tab1focused: false,
                        tab2focused: false,
                        tab3focused: !this.state.tab3focused,
                        tabMaskIsSHow: !this.state.tab3focused
                    })
                }
                return
            default:
                return
        }
    }

    //行选择
    tabRowSel(item, tabIndex) {
        if (tabIndex === 1) {
            this.setState({
                tabMaskIsSHow: false,
                tab_qylb_value: item.code,
                tab1focused_title: item.name
            })

        } else {
            this.setState({
                tabMaskIsSHow: false,
                tab_zhpx_value: item.value,
                tab2focused_title: item.title
            })
        }
        //容器回调
        this.props.handelTabRowSel(item, tabIndex)
    }

    //列选中
    tabItemSel(e, item, tabIndex) {
        e.stopPropagation();
        if (tabIndex === 1) {
            let lx = JSON.parse(JSON.stringify((this.state.sx_lx)))
            lx.title = item.title
            lx.data.map((dataItem) => {
                if (dataItem.value === item.value) {
                    dataItem.isSel = true
                } else {
                    dataItem.isSel = false
                }
            })
            this.setState({
                sx_lx: lx
            })
            return
        } else {
            let dj = JSON.parse(JSON.stringify((this.state.sx_dj)))
            dj.title = item.title
            dj.data.map((dataItem) => {
                if (dataItem.value === item.value) {
                    dataItem.isSel = true
                } else {
                    dataItem.isSel = false
                }
            })
            this.setState({
                sx_dj: dj
            })
            return
        }
    }

    //列选中->确定按钮
    tabItemBtnClick() {
        let lx = ''
        let dj = ''
        this.state.sx_lx.data.map((dataItem) => {
            if (dataItem.isSel) {
                lx = dataItem.value
            }
        })

        this.state.sx_dj.data.map((dataItem) => {
            if (dataItem.isSel) {
                dj = dataItem.value
            }
        })
        this.setState({
            tabMaskIsSHow: false
        })
        let param = {yylx: lx, yydj: dj}
        this.props.handelTabItemSel(param)
    }

    close() {
        this.setState({
            tabMaskIsSHow: false
        })
    }

    handleTouchMove(event) {
        // event.preventDefault();
    }

    componentDidMount() {
        if (this.props.areasList && this.props.areasList.length !== 1) {
            return
        }
        this.props.tabActions.loadCitys()

        document.getElementById('tabsBottomWrapperCon').addEventListener("touchmove", (event) => {
            // 执行滚动回调
            // event.preventDefault();
        }, {
            passive: false //  禁止 passive 效果
        })
    }
}

const mapStateToProps = (state) => {
    return {
        areasList: getAreasList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tabActions: bindActionCreators(tabActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
