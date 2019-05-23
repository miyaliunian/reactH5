/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */
export default {
    getProductList: (rowIndex, pageSize) => `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
}