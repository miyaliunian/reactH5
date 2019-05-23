/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首页列表业务数据
 *
 */
export const schema = {
    name: 'products',
    id: 'id',
}

const reducer = (state = {}, action) => {
    if (action.response && action.response.products){
        return {...state, ...action.response.products}
    }
    return state
}

export default reducer