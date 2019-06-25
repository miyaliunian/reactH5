/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */

//登录前缀
export const BASE_URL = 'http://58.208.84.112:10086/t-core'
// export const BASE_URL = 'http://ykt.nn12333.com:7070/t-core'

//业务请求URL
export default {
    getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
    getProductDetail: (id) => `/mock/product_detail/${id}.json`,
    getShopById: (id) => `/mock/shops/${id}.json`,


    /*---------------------------------------------登录---*/
    //登录
    API_LOGIN: (username, password) => `${BASE_URL}/login/v1.0/${username}/${password}.action`,


    /*---------------------------------------------医院列表---*/
    //医院列表->区域选择
    API_AREA_LIST: (cityId) => `${BASE_URL}/city/v1.0/list/${cityId}.ch`,
    //医院列表
    API_HOSPITAL_LIST: (cityId, orderType, page) => `${BASE_URL}/hospital/v1.0/list/${cityId}/${orderType}/${page}.action`,
    //医院列表对应的科室列表
    API_HOSPITAL_DIVSION_LIST: (hosid) => `${BASE_URL}/division/v1.0/list/${hosid}.action`,
    //科室列表对应的门诊列表
    API_DIVSION__DEPARTMENT_LIST: (hosid, divisionid) => `${BASE_URL}/hisdept/v1.0/list/${hosid}/${divisionid}.action`,


    /*---------------------------------------------医生列表---*/
    //医生列表
    API_DOCTOR_LIST: (type, deptId, order, page) => `${BASE_URL}/doctor/v1.0/list/${type}/${deptId}/${order}/${page}.action`,
    //医生列表-预约日期
    API_DOCTOR_RESERVATION_LIST: (type, deptId, days) => `${BASE_URL}/schedule/v1.0/list/day/${type}/${deptId}/${days}.action`,


    /*---------------------------------------------医生详情---*/
    //医生详情->科室列表
    API_DOCTOR_VISITING_DIVISION: (doctid) => `${BASE_URL}/hisdept/v1.0/list/${doctid}.action`,
    //医生详情->预约列表
    API_DOCTOR_VISITING_LIST: (hosid, deptid, doctid, date, pageno) => `${BASE_URL}/schedule/v1.2/list/${hosid}/${deptid}/${doctid}/${date}/${pageno}.action`,


    /*---------------------------------------------家庭成员---*/
    //家庭成员选择:卡绑定
    // API__BIND_CARD_LIST: () => `/baseURL/bindcard/v1.0/list.do`,
    API__BIND_CARD_LIST: () => `${BASE_URL}/bindcard/v1.0/list.do`,
    //智能候诊:获取候诊列表
    API__INTELLIGENT_WAITING_LIST: (personid) => `/baseURL/register/v1.0/getSeenNoByPerson/${personid}.do`,

}