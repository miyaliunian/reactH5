//从订单进入
const initialState = {
    fetchStatus: false,
    orderPayType: ''
}


const actionTypes = {
    ORDER_PAY_TYPE: 'ORDERPAY/ORDER_PAY_TYPE',
    ORDER_PAY_CLEAN: 'ORDERPAY/ORDER_PAY_CLEAN'
}


export const actions = {
    setOrderPayType: (i) => {
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.ORDER_PAY_TYPE, response: i})
        }
    },

    cleanOrderPayType: (i) => {
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.ORDER_PAY_CLEAN, response: ''})
            i()
        }
    },


}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ORDER_PAY_TYPE:
            return {
                ...state,
                orderPayType: action.response
            }
        case actionTypes.ORDER_PAY_CLEAN:
            return {
                ...state,
                orderPayType: ''
            }
        default:
            return state
    }
}
export default reducer

export const getOrderType = (state) => {
    return state.orderPay.orderPayType
}
