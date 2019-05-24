/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首页列表业务数据
 *   可以通过action.type 判断 也可用通过 action是否包含某个值 处理 reducer
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