/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */



//登录前缀
// const BASE_URL = 'http://58.208.84.112:10086/t-core'
const BASE_URL = 'http://ykt.nn12333.com:7070/t-core/'

//业务
export default {
    getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
    getProductDetail: (id) => `/mock/product_detail/${id}.json`,
    getShopById: (id) => `/mock/shops/${id}.json`,


    //登录
    API_LOGIN: (username, password) => `${BASE_URL}/login/v1.0/${username}/${password}.action`,
    //医院列表->区域选择
    API_AREA_LIST:(cityId)=>`${BASE_URL}/city/v1.0/list/${cityId}.ch`,
    //医院列表
    API_HOSPITAL_LIST:(cityId,orderType,page)=>`${BASE_URL}/hospital/v1.0/list/${cityId}/${orderType}/${page}.action`,
    //医院列表对应的科室列表
    API_HOSPITAL_DIVSION_LIST:(hosid)=>`${BASE_URL}/division/v1.0/list/${hosid}.action`,
    //科室列表对应的门诊列表
    API_DIVSION__DEPARTMENT_LIST:(hosid,divisionid)=>`${BASE_URL}/hisdept/v1.0/list/${hosid}/${divisionid}.action`

}