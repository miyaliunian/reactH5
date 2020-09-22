/**
 * 门诊缴费
 * By Cy 2020-01-03
 */
import URL from '@api/httpUrl'
import {post} from '@api/httpUtil'
import {OrderType} from "@api/Constant";
import {Toast} from "antd-mobile";

const initialState = {
    isFetching: false,
    detail: {}
}

const actionTypes = {
    FETCH_DETAIL_REQUEST: 'OUTPATIENTDETAIL/FETCH_DETAIL_REQUEST',
    FETCH_DETAIL_SUCCESS: 'OUTPATIENTDETAIL/FETCH_DETAIL_SUCCESS',
    FETCH_DETAIL_FAILURE: 'OUTPATIENTDETAIL/FETCH_DETAIL_FAILURE'
}

export const actions = {
    /**
     * 根据id查询门诊缴费信息
     * @param outpatientPaymentId
     */
    loadDetailById: (outpatientPaymentId) => {
        console.log('11111111111111111111')
        console.log(outpatientPaymentId)
        return (dispatch, getstate) => {
            let url = URL.API_QUERY_BALANCEINFO_BY_ID(outpatientPaymentId)
            return post(url)
                .then(
                    data => {
                        if(data&&data.infocode)
                            dispatch(loadDetailSuccess(data.data))
                    }
                )
        }

    },

    /**
     * 门诊缴费’去结算‘按钮的提交
     * @param data
     * @param route
     * @returns {function(*, *): Promise<T | never>}
     */
    onSubmit: (detail,person,hospital,route) => {
        console.log("1234567890 onSubmit")
        console.log("detail: "+JSON.stringify(detail))
        console.log("person: "+JSON.stringify(person))
        console.log("hospital: "+JSON.stringify(hospital))
        return (dispatch, getstate) => {

            const { push } = route
            // let PARAM = {}
            // PARAM.hosId = hospital.id //医院id
            // PARAM.deptName = detail.deptName //科室名称(依排版信息为准)
            // PARAM.doctorId = detail.doctCode //医生id
            //
            // /**
            //  * 家庭成员对象
            //  * @type {T[]}
            //  */
            //
            //
            // //家庭成员id
            // PARAM.personId = detail.memberId
            // //家庭成员mgwid
            // PARAM.cardId = person.mgwId




            detail = JSON.parse(
                JSON.stringify(detail).replace(
                    /totCost/g,
                    "regFee"
                )
            );

            //纯医保
            let path = {
                pathname: '/advanceSettlementContainer',
                state: {
                    reservationName: OrderType[1].recipe,
                    reservationCode: OrderType[1].status,
                    reservationEntity: detail, //订单实体
                    paymentMethod: detail.paymentMethod
                }
            }
            push(path)
        }
    }
}


const loadDetailSuccess = data => ({
    type: actionTypes.FETCH_DETAIL_SUCCESS,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                detail: action.data
            }
        default:
            return state
    }
}
export default reducer
//selectors
export const getFetchingStatus = state => {
    return state.outpatientPaymentDetail.isFetching
}
export const getDetail = state => {
    return state.outpatientPaymentDetail.detail
}
