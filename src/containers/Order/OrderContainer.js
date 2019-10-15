/**
 * Class: OrderContainer
 * Author: wufei
 * Date: 2019-10-15
 * Description:
 *  订单查询-进入 预结算
 */
import React, {Component} from 'react';
import {OrderType} from "@assets/static/DictionaryConstant";
import {withRouter} from 'react-router-dom'

class OrderContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            reservationEntity:{
                beginTime: "07:45",
                birthday: 315504000000,
                canPaidMsg: null,
                cardAccount: null,
                cityId: 320600,
                createdate: 1571106930000,
                deptId: 1321,
                deptName: "影像会诊门诊",
                diagName: null,
                disaseCode: null,
                disaseName: null,
                doctId: 113962,
                doctName: "贾中正",
                doctTitle: "副主任医师",
                endTime: "11:30",
                expire: null,
                ext: "诊查费|110200006B|110200006-b|副主任医师门诊诊察费|",
                first: true,
                hisScheduleId: null,
                hosId: 474,
                hosName: "南通大学附属医院",
                hosRegLmt: null,
                hosRegid: null,
                hosResponse: null,
                id: 19116,
                idenNo: "530101198001010051",
                mdicalType: "11",
                mdicaltypeName: null,
                memberId: "2c9f818e683cfbc00168a3260eb515b7",
                mgwCardid: "LOCAL-849AFA4F-5511-4AAD-834B-DE2F997FE89E",
                mgwCode: "3001",
                modifydate: 1571106930000,
                noon: "上午",
                notifyDate: null,
                notifyStatus: 0,
                nowCanPaid: null,
                onlyTodayPaid: true,
                ownCost: 0,
                password: null,
                patientId: "fa1b9ee261254ca4886317ae6f6c3f9c",
                patientName: "测试",
                payCost: 0,
                paymentDate: null,
                paymentMethod: 1,
                paymentMethodMame: "在线支付",
                paymentStatus: 0,
                personNo: "9000353885",
                phone: "13889229646",
                promotion: null,
                promotionDiscount: null,
                pubCost: 0,
                regDate: 1571106930000,
                regFee: 22,
                regStatus: 0,
                reglevlCode: null,
                reglevlName: "副主任医师号",
                scanType: null,
                scheduleId: null,
                seeNo: "1",
                seenDate: 1571068800000,
                serialNo: "10304aa39aa1",
                sex: "男",
                si: false,
                siHosCode: null,
                sicardNo: "JSF044874172",
                sitypeCode: null,
                sitypeId: 3,
                sitypeName: null,
                sn: "633613918987620352",
                symptom: null,
                timeintervalId: null,
                unifiedOrderId: "f96589c725324415bc410e20a6876e03"
            },
            token:{
                access_token:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3MTE0NDA2MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiIwOWI2MzRjOS1kNzQxLTRhOGUtYTQxMi02OTQ4NDExZmNmMjAiLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.Ni8m4UDYI6_m5cAuNJ0xmPsk7mbXjE1bLIMN6Qx7CngdAKKhu9Nihp93OwZDVKQGq5C9N409nJq2_4Ev07ATBtf0CmkYu7bnMTHJ-_vhsWDFBhNrHRhxyLCo4RMz1-zm6_v9CKZ3t39SvXDhQVRsNbaUJr7nqCMcqBSSfO00IpGIBOs6eEZOxYHadZ4LG-gLbGeb08_NfljIclAyEEyzXSDkFxGFhSxe7pFlPke09w3yZCmS73dmeDJ1jFoz1UjdTOGb0ps-9FsNhQfLhROkHsUPFy3GOdZ8I_dEo2z55P1pd_FA1PzM9qCUqdl5JTC_swEIv0l-BiGP2P29J_OQGw',
                refresh_token:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiIwOWI2MzRjOS1kNzQxLTRhOGUtYTQxMi02OTQ4NDExZmNmMjAiLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3MzY5Mjg2MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiIxNDcwYzA2ZS04ZDVlLTRjMWUtOTc1NS01ZThmYTY0MWRmNmYiLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.R3s9yCwFDiFlzAtIuLfDaFnn50w3GXqhT55OzPGMEhkwQDLbbFcXfNLjTjVrJK5MjpC4EPVjNEX4yautni57VcjjcTPtXMetPOTfCuWxSfNEdByf5WszhOENWy1xGHfO74ER0CeARIpSB-BeSKKO87vkV64d6Xc_s-DofOlI0AY5SAlZhPBvcp2F90EKn_uBDcFczydsRFXjvOP_p_0qxWN1Weqez1iZuJn2nWC8PZSc_VNNR_ppg8JQlYx4QK57FFTqPrFWroivOtWx_UFJNPM7TDYoKwsAzXW5-iu_Wt7zTabvMKvAZTVb7O6JSLEe_LbNda8Z164MnzpbHe1AHA'
            }
        };
    }


    render() {
        return (
            <div>

            </div>
        );
    }

    componentDidMount() {
        // window.addEventListener('message', (e) => this.showRNmessage(e))
        debugger
        let reservationEntity = this.state.reservationEntity
        let token = this.state.token
        sessionStorage.setItem('token', JSON.stringify(token))
        console.log(reservationEntity)
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

    showRNmessage(e) {
        debugger
        let reservationEntity = JSON.parse(e.data)
        console.log(reservationEntity)
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



export default withRouter(OrderContainer)
