/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */

/**
 * 登录前缀
 * @type {string}
 */
const BASE_URL = 'http://58.208.84.112:10086/t-core'
// const BASE_URL = 'https://www.ntyibao.com/t-core'

/**
 * 业务请求URL
 */
export default {
    /* 0:-------------------------------------------Demo---*/
    getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
    getProductDetail: (id) => `/mock/product_detail/${id}.json`,
    getShopById: (id) => `/mock/shops/${id}.json`,


    /* 1:---------------------------------------------登录---*/
    //登录
    API_LOGIN: (username, password) => `${BASE_URL}/login/v1.0/${username}/${password}.action`,


    /* 2:---------------------------------------------医院列表---*/
    //医院列表->区域选择
    API_AREA_LIST: (cityId) => `${BASE_URL}/city/v1.0/list/${cityId}.ch`,
    //医院列表
    API_HOSPITAL_LIST: (cityId, orderType, page) => `${BASE_URL}/hospital/v1.0/list/${cityId}/${orderType}/${page}.action`,


    /* 3:---------------------------------------------科室-门诊列表---*/
    //医院列表对应的科室列表
    API_HOSPITAL_DIVSION_LIST: (hosid) => `${BASE_URL}/division/v1.0/list/${hosid}.action`,
    //科室列表对应的门诊列表
    API_DIVSION__DEPARTMENT_LIST: (hosid, divisionid) => `${BASE_URL}/hisdept/v1.0/list/${hosid}/${divisionid}.action`,


    /* 4:---------------------------------------------医生列表---*/
    //医生列表
    API_DOCTOR_LIST: (type, deptId, order, page) => `${BASE_URL}/doctor/v1.0/list/${type}/${deptId}/${order}/${page}.action`,
    //医生列表-预约日期
    API_DOCTOR_RESERVATION_LIST: (type, deptId, days) => `${BASE_URL}/schedule/v1.0/list/day/${type}/${deptId}/${days}.action`,


    /* 5:---------------------------------------------医生详情---*/
    //医生详情->科室列表
    API_DOCTOR_CLINIC_LIST: (doctid) => `${BASE_URL}/hisdept/v1.0/list/${doctid}.action`,
    //医生详情->预约列表
    API_DOCTOR_VISITING_LIST: (hosid, deptid, doctid, date = null, pageno) => `${BASE_URL}/schedule/v1.2/list/${hosid}/${deptid}/${doctid}/${date}/${pageno}.action`,
    //医生详情->预约时间段
    API_DOCTOR_SCHEDULE_TIME: (scheduleid) => `${BASE_URL}/timeinterval/v1.0/list/${scheduleid}.action`,


    /* 6:---------------------------------------------预约信息----------*/
    //支付方式:当日挂号或预约挂号
    API_REGISTER_PAY_TYPE: (hosid, scheduleid) => `/baseURL/paymethod/v1.2/regster/${hosid}/${scheduleid}.do`,
    //获取医疗类别:使用家庭成员的SiTypeCode
    API_REGISTER_MEDICAL_TYPE: (sitypeCode) => `/baseURL/mdicaltype/v1.0/getList/${sitypeCode}.do`,
    //挂号统一接口
    API_REGISTER_UNION: () => `/baseURL/register/v1.5/regist.do`,


    /* 7:---------------------------------------------家庭成员---*/
    //家庭成员选择:卡绑定
    API__BIND_CARD_LIST: () => `/baseURL/bindcard/v1.0/list.do`,


    /* 8:--------------------------------------------------------*/
    //智能候诊:获取候诊列表
    API__INTELLIGENT_WAITING_LIST: (personid) => `/baseURL/register/v1.0/getSeenNoByPerson/${personid}.do`,


    /* 9:--------------------------------------------------------*/
    //注册:验证码发送请求，按照手机号码
    API__USER_REGISTER_SMSMESSAGE_SEND: () => `${BASE_URL}/login/v1.1/sendSmsByMobile.action`,
    //注册:注册请求，附带手机校验码
    API__USER_REGISTER_REGISTER: (verfCode) => `${BASE_URL}/login/v1.1/registUser/${verfCode}.action`,
    //注册：获取医保类型请求
    API__USER_REGISTER_SITYPE: (cityid, own) => `${BASE_URL}/sitype//v2.0/list/${cityid}/${own}.action`,


    /* 10:--------------------------------------------住院管理-----*/
    API_GET_REGED_LIST_BY_OPEN_TYPE: (type, perId) => `/baseURL/hospital/v1.1/getRegedListByOpenType/${type}/${perId}.do`,
    API_QUERY_INHOSPASTIENT: (type, hosId, perId) => `/baseURL/${type}/v1.1/queryInHosPatient/${hosId}/${perId}.do`,


}