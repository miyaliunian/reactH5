/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首页列表业务数据
 *   可以通过action.type 判断 也可用通过 action是否包含某个值 处理 reducer
 *
 */


import createReducer from '../../../utils/createReducer'

export const schema = {
    name: 'products',
    id: 'id',
}

const reducer = createReducer(schema.name)

export default reducer

//selectors
export const getProductDetail = (state, id) => {
    const product = state.entities.products[id]
    return product && product.detail && product.purchaseNotes ? product : null
}

export const  getProductById = (state, id)=> {
    return state.entities.products[id]
}