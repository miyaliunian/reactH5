/**
 * Class: Body
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 * 医生排版列表
 */
import React, {Component} from "react";
import RefreshFooter from "@components/Refresh/Footer/RefreshFooter";
import Bscroll from "better-scroll";
import {Icon, Modal, List, Radio} from "antd-mobile";
import {getDate} from "@utils/dayutils";
import {withRouter} from "react-router-dom";
import { Toast } from 'antd-mobile'
import "./style.less";

const dayJS = require('dayjs')

class DoctorVisiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            timeIntervalShow: false,
            timeIntervalValue: 0,
            cliIntervalShow: false,
            cliInterValue: 0
        };
        //默认显示的科室
        this.defSelClinic = "";
        //选中的预约信息
        this.reservationInfoSel = {};
    }

    toggleCliIntervalShow = () => {
        this.setState({cliIntervalShow: !this.state.cliIntervalShow});
    }

    render() {
        const {
            isLastPage,
            clinicData,
            reservationData,
            timeInterval
        } = this.props;
        const {timeIntervalValue, cliInterValue} = this.state;
        if (this.defSelClinic === "") {
            if (Array.isArray(clinicData) && clinicData.length > 0) {
                this.defSelClinic = clinicData[0].name;
                this.setState({cliInterValue: clinicData[0]});
            }
        }
        return (
            <div className={"doctorVisiting"} id={"doctorVisitingTitle"}>
                <div
                    className={"doctorVisiting__title border-bottom"}
                    id={"doctorVisiting__title"}
                >
                    <div>出诊时间</div>
                    <div
                        className={"doctorVisiting__title__right"}
                        onClick={this.toggleCliIntervalShow}
                    >
                        <div>{this.defSelClinic}</div>
                        <div style={{color: "#aaa", marginLeft: "10px"}}>
                            <span className="iconfont ">&#xe628;</span>
                        </div>
                    </div>
                </div>

                <div className={"doctorVisiting__list"} ref={"doctorVisitingList"}>
                    <div>
                        {reservationData.map((item, index) => {
                            return (
                                <div
                                    className={"doctorVisiting__item border-bottom"}
                                    key={index}
                                    onClick={() => this.navPage(item)}
                                >
                                    {this.renderDesc(item)}
                                    <div className={"item__right"}>
                                        <div className={"item__right__price"}>
                                            ￥{item.regFee.toFixed(2)}
                                        </div>
                                        <div
                                            className={
                                                item.status !== 2
                                                    ? "item__right__icon icon__selBg"
                                                    : "item__right__icon"
                                            }
                                        >
                                            {item.status === 2
                                                ? "约满"
                                                : item.status === 0
                                                    ? "停诊"
                                                    : "预约"}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <RefreshFooter refreshStatus={isLastPage}/>
                    </div>
                </div>

                {/******************************popup 科室过滤*****************************************************/}
                <Modal
                    popup
                    visible={this.state.cliIntervalShow}
                    title={"科室列表"}
                    onClose={() => this.onClinicIntervalClose(0)}
                    animationType="slide-up"
                    afterClose={() => {
                    }}
                    footer={[
                        {
                            text: "取消",
                            onPress: () => this.onClinicIntervalClose(1)
                        },
                        {
                            text: "确定",
                            onPress: () => this.onClinicIntervalClose(2)
                        }
                    ]}
                >
                    <List className="doctorVisiting__timeInterval">
                        {clinicData.map(i => {
                            return (
                                <Radio.RadioItem
                                    key={i.id}
                                    checked={
                                        (typeof cliInterValue.name === "undefined"
                                            ? this.defSelClinic
                                            : cliInterValue.name) === i.name
                                    }
                                    onChange={() => this.setState({cliInterValue: i})}
                                >
                                    {i.name}
                                </Radio.RadioItem>
                            );
                        })}
                    </List>
                </Modal>

                {/******************************popup 预约时间段*****************************************************/}
                <Modal
                    popup
                    visible={this.state.timeIntervalShow}
                    title={"预约信息"}
                    onClose={() => this.onTimeIntervalClose(0)}
                    animationType="slide-up"
                    afterClose={() => {
                    }}
                    footer={[
                        {
                            text: "取消",
                            onPress: () => this.onTimeIntervalClose(1)
                        },
                        {
                            text: "确定",
                            onPress: () => this.onTimeIntervalClose(2)
                        }
                    ]}
                >
                    <List className="doctorVisiting__timeInterval">
                        {timeInterval.map(i => {
                            return (
                                <Radio.RadioItem
                                    key={i.id}
                                    checked={timeIntervalValue === i.id}
                                    onChange={() =>{
                                        console.log('选中')
                                        console.log(i)
                                        if (i.regLmt === 0)  return Toast.info('请选择其他时间或医生进行预约！', 2)
                                        this.setState({
                                            timeIntervalValue: i.id
                                        })
                                    }}
                                >
                                    {this.reservationInfoSel.noon} {i.beginTime} - {i.endTime}
                                    <span style={{marginLeft:'10px'}}>{i.regLmt === 0 ? '(约满)' : ''}</span>
                                </Radio.RadioItem>
                            );
                        })}
                    </List>
                </Modal>
            </div>
        );
    }

    /**
     * 关闭门诊列表Modal  门诊下拉列表选中,并关闭
     * @param target
     */
    onClinicIntervalClose(target) {
        console.log(target);
        console.log("选中的科室");
        console.log(this.state.cliInterValue);
        if (target === 2) {
            this.defSelClinic = this.state.cliInterValue.name;
            this.props.fetchReservationList(this.state.cliInterValue);
        }
        this.setState({cliIntervalShow: !this.state.cliIntervalShow});
    }

    /**
     * 格式化字符串
     * @param data
     * @returns {*}
     */
    renderDesc(data) {
        const {seeDate, noon, reglevlName} = data;
        return (
            <div className={"doctorVisiting__item__desc"}>
                {`${dayJS(seeDate).format('MM')}-${dayJS(seeDate).format('DD')}`} {noon} {reglevlName}
            </div>
        );
    }

    /**
     * 跳转页面
     * @param data
     */
    navPage(data) {
        const {
            doctorActions: {loadTimeInterval},
            match: {params: {type}}  // type 用于区分 预约挂号，当日挂号
        } = this.props;
        if (data.status === 2) {
            return;
        }
        this.reservationInfoSel = data;
        loadTimeInterval(this.props.doctorInfo, data, type, this);
    }

    /**
     * 时间段选项
     * @param value
     */
    onChange = value => {
        this.setState({
            timeIntervalValue: value
        });
    };

    /**
     * 关闭时间段Modal
     * @param target
     */
    onTimeIntervalClose(target) {
        const {doctorInfo, timeInterval} = this.props;
        //只有点击确定按钮，才跳转页面
        switch (target) {
            case 2:
                const deptInfo = {name: this.defSelClinic};
                let timeFilter = timeInterval.filter(
                    item => item.id === this.state.timeIntervalValue
                );
                let path = {
                    pathname: "/reservation",
                    state: {
                        doctorInfo: doctorInfo,
                        reservationInfo: {...this.reservationInfoSel, deptInfo},
                        timeInterval: timeFilter[0]
                    }
                };
                this.props.history.push(path);
                break;
            default:
                break;
        }
        this.setState({
            timeIntervalShow: false
        });
    }

    componentDidMount() {
        //预约滚动列表
        this.scroll = new Bscroll(this.refs.doctorVisitingList, {
            mouseWheel: true,
            probeType: 3,
            click: true,
            tap: true,
            pullUpLoad: {
                threshold: 80
            },
            useTransition: false
        });
        this.scroll.on("pullingUp", this.props.pullingUpHandler);

        //顶部禁止滑动
        document.getElementById("doctorVisiting__title").addEventListener(
            "touchmove",
            event => {
                event.preventDefault();
            },
            {
                passive: false //  禁止 passive 效果
            }
        );
    }
}

export default withRouter(DoctorVisiting);
