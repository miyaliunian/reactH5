/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:  登录实体数据
 *
 */

export const schema = {
    name: 'loginData',
    id: 'id',
}

const reducer = (state = {}, action) => {
    if (action.response && action.response.products) {
        return {...state, ...action.response.products}
    }
    return state;
}

export default reducer;