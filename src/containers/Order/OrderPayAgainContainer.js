/**
 * Class: OrderPayAgainContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  从订单查询-进入 预结算
 */
import React, {Component} from 'react';
import {OrderType} from "@assets/static/DictionaryConstant";
import {withRouter} from 'react-router-dom'

class OrderPayAgainContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            reservationEntity: {
                beginTime: "14:40",
                birthday: 315504000000,
                canPaidMsg: null,
                cardAccount: null,
                cityId: 320600,
                createdate: 1571376339000,
                deptId: 204,
                deptName: "神经内科",
                diagName: null,
                disaseCode: null,
                disaseName: null,
                doctId: 110210,
                doctName: "普通号",
                doctTitle: "主治医师",
                endTime: "15:00",
                expire: null,
                ext: "挂号费|13895|110100001|挂号费|0$诊疗费|134832|110200006-a|普通门诊诊察费|12",
                first: true,
                hisScheduleId: null,
                hosId: 493,
                hosName: "南通市第一人民医院",
                hosRegLmt: null,
                hosRegid: null,
                hosResponse: null,
                id: 19480,
                idenNo: "530101198001010051",
                mdicalType: "11",
                mdicaltypeName: null,
                memberId: "2c9f818e683cfbc00168a3260eb515b7",
                mgwCardid: "LOCAL-849AFA4F-5511-4AAD-834B-DE2F997FE89E",
                mgwCode: "3002",
                modifydate: 1571376339000,
                noon: "下午",
                notifyDate: null,
                notifyStatus: 0,
                nowCanPaid: null,
                onlyTodayPaid: true,
                ownCost: 7,
                password: null,
                patientId: "fa1b9ee261254ca4886317ae6f6c3f9c",
                patientName: "测试",
                payCost: 5,
                paymentDate: 1571376608000,
                paymentMethod: 1,
                paymentMethodMame: "在线支付",
                paymentStatus: 1,
                personNo: "9000353885",
                phone: "13889229646",
                promotion: null,
                promotionDiscount: null,
                pubCost: 0,
                regDate: 1571376338000,
                regFee: 12,
                regStatus: 0,
                reglevlCode: null,
                reglevlName: "普通门诊",
                scanType: null,
                scheduleId: null,
                seeNo: "3",
                seenDate: 1571328000000,
                serialNo: "1008018153",
                sex: "男",
                si: false,
                siHosCode: null,
                sicardNo: "JSF044874172",
                sitypeCode: null,
                sitypeId: 3,
                sitypeName: null,
                sn: "634743897586667520",
                symptom: null,
                timeintervalId: null,
                unifiedOrderId: "0819d1c8eb504491849785e4988ef03e",
            },
            token: {
                access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3MTQwMTIyNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiI5YTYyZjRhZS03M2JkLTQ5YjEtYmNiZi03MzlkMWY5Mjk1NGMiLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.Bw6CelkV9LYjVxGkyorzNmFRjc2-TS9qk9UnVowT_cdpatO4kiiLf40NLTtQ9ieCaWrUggP44a0Zk2aWDkQkM9U0j3BJW-TCfjAC5u6g2bIJPGbxQsefuR9tD6VJKFo2K9aTnleEUlvbTbBmdx_GYrpbEEKudR8MMu8gEgNS7c0IY-WfSIvbzAIM_mchZplBZh7doTs_57OyxVU7mIc9bFc5I2I2ylU5fmVE1Fi-lTvCaRBhGKgB8U6hxSu6KXKXxGTAbH--aGvXM9TnsBHdHbkgBdwdioA6yM1b5YazqJut_Jc8hEnjvWrnQ3_2jbtUTpIoLGkA0nzfscQXV6jjgA",
                refresh_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5YTYyZjRhZS03M2JkLTQ5YjEtYmNiZi03MzlkMWY5Mjk1NGMiLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3Mzk1MDAyNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiIzYmE1MzY3YS01YjM3LTRmYTctYWViMy00NGRlMjhhZmMxOTciLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.k4EQgsLQ-hGW05EdH8TKDQWIurvKt8iDWRfbzUogzeKxSMc0QrQtLyqlZoELlce-Kl5bV2-5cN_aR4rhO7Iw-dc0ja1pU0iacn-yaQOEbb2CoFF0yxf66xrnFzZEnwdkZamWkPEhdE2HO6BqxsJs_tNn418DPzl0P_Dgkvui0QoapYggUVfYjpMN8_Vb5NEh14EUQaJfTHgOoa6Q-jKp3lF4dU1UCGxpesbNX9lhCxKu4lnxEkio0KWk5ZC-ZNk1pG_yl2GrdlOo3FZcFRIW9G7HwvMqiq70oD4vQAaLU-d-zrO9mmLvqhdpJEgr_ZchH7ql9UN67tQGZs_JpHbfNA"
            }
        }
    }


    render() {
        return (
            <div/>
        );
    }

    componentDidMount() {
        //----
        sessionStorage.setItem('token', JSON.stringify(this.state.token))
        //----
        let path = {
            pathname: '/advanceSettlementContainer',
            state: {
                reservationName: OrderType[0].register,
                reservationCode: OrderType[0].status,
                reservationEntity: this.state.reservationEntity,
                paymentMethod: this.state.reservationEntity.paymentMethod,
                from:'order_Reg'//标识是走流程进入的预结算，还是从订单列表进入的预结算
            }
        }
        this.props.history.push(path)
        //----
        window.addEventListener('message', (e) => this.dataFromRN(e))
    }

    dataFromRN(e) {
        let data = JSON.parse(e.data),
            reservationEntity = data.paramsObj
        sessionStorage.setItem('token', JSON.stringify(data.tokenObj))
        let path = {
            pathname: '/advanceSettlementContainer',
            state: {
                reservationName: OrderType[0].register,
                reservationCode: OrderType[0].status,
                reservationEntity: reservationEntity,
                paymentMethod: reservationEntity.paymentMethod,
            }
        }
        this.props.history.push(path)
    }
}


export default withRouter(OrderPayAgainContainer)
