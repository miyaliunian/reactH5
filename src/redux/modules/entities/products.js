/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  商品业务数据
 *
 */
export const schema = {
    name: 'products',
    id: 'id',
}

const reducer = (state = {}, action) => {
    if (action.response && action.reset().products){
        return {...state, ...action.response.products}
    }
    return state
}

export default reducer