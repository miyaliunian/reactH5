/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */
export default {
    getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
    API_LOGIN: (userName, pwd) => `/mock/products/${userName}/${pwd}`,
    API_REFRESH: (userName, pwd) => `/mock/products/${userName}/${pwd}`,
    API_GET_LIST: (userName, pwd) => `/mock/products/${userName}/${pwd}`,
}