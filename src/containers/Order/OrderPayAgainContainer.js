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
                access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3MTY2MTgzOSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiJjZjBiOWIxNy02YzJiLTQ4NzktODI5ZC0wMjk1NjBhYTBmMjAiLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.Y3uFDxQRxcsAXaF74ZJOt8J8SXHA24R7uPJ0a-GwgysYxX00v_YvTNXLpxYOUSWBCjcMvrxhtlDpLak2da0sYAsQj7CNdYHhc6LzKLWnWIMBUK4T88OD6i7I8rxuKdTrGcPh5NDrhEKEuUl8EWTq7tZWJoQwtZxImR_1N9UQ9sVfSZiJ5fFT8my9ctD0G0FQhNiR4PGRzxwbry2Z_sYwxe3yzhqtopeIrMdkPUVowFu4UovNe_EMYn_tRIaQn1dleaVzrDVe_kShaErEd49-BgkyEdABL5dNyUAIxJLk56WwuPPGbPV9U-0ypvvJ6QzW5-k9qXLVQ08lZkzNh73aNA",
                refresh_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmZmE3ZjVlODhiODM0ZmY0YWIzODUzOTc0MDVmMzgyYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJjZjBiOWIxNy02YzJiLTQ4NzktODI5ZC0wMjk1NjBhYTBmMjAiLCJnaXJkZXJfdXNlciI6ImZmYTdmNWU4OGI4MzRmZjRhYjM4NTM5NzQwNWYzODJhX1VTRVJfQUxMT1dFRCIsImV4cCI6MTU3NDIxMDYzOSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9QRVJTT05fVVNFUiJdLCJqdGkiOiJmMDYzZWJlYS0yZjMzLTQzZjItODlkNS1mMTFhMWU1YzRlYWEiLCJjbGllbnRfaWQiOiJhY21lX21vYmlsZSJ9.XUMPV08ylkLWARPPfFGMNQF4KBqps2ZGmYzRlSHPDlFHWdi-SHjYJxNFdzK64-FGSo94PqN48bpQ-oi6qL74MFLT6ytoNpeDWC7sRz5RhmP-XpnGfKNJHiOyfV3fbb6VTarEMq0AfOx-_eGLgnZa-nWHF_V-VCZ2E4V_nl91QZTpaAA8viRje3JHZa3zJ09TV7I05M0Hn1VjT7xT6LqYlpfHDHRVOzmuA43HHce5JM0oi09I-Gn59xCzYlH9dZNoL1HIVCfBpd-hNQXy8ddwVXx31OmxiP_AKGlaewM00lbH9E1X76mJ8eCyANd8d36nfrEv4KpZReA6VtR1SD5bRQ"
            }
        }
    }


    render() {
        return (
            <div onClick={() => this.pay()}>
                去支付
            </div>
        );
    }

    componentDidMount() {
        //    J2C-WebView
        const {history} = this.props
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    // 测试方式
    pay() {
        const {history} = this.props
        window['J2C'].payReg("去支付", function (e) {
        })

        window['J2C']['payRegCallBack'] = function (response) {
            let resObj = JSON.parse(response)
            let token = {}
            token.access_token = resObj.access_token
            token.refresh_token = resObj.refresh_token
            sessionStorage.setItem('token', JSON.stringify(token))
            let path = {
                reservationName: OrderType[0].register,
                reservationCode: OrderType[0].status,
                reservationEntity: resObj.reservationEntity,
                paymentMethod: resObj.reservationEntity.paymentMethod,
                from: resObj.fromTarget
            }
            history.push(path)
        }
    }
}


export default withRouter(OrderPayAgainContainer)
