/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  购物信息业务数据
 *
 */


import createReducer from '../../../utils/createReducer'

export const schema = {
    name: 'shops',
    id: 'id'
}

const reducer = createReducer(schema.name)
export default reducer


//selectors
export const getShopById = (state, id) => {
    const shop = state.entities.shops[id]
    return shop
}
