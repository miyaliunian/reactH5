/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求url 常量
 */


import {BASE_URL} from '@assets/static/Constant'

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
    API_DOCTOR_VISITING_LIST: (hosid, deptid, doctid, pageno) => `${BASE_URL}/schedule/v1.1/list/${hosid}/${deptid}/${doctid}/${pageno}.action`,
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
    API_QUERY_ALL_HOSPASTIENT: (cityId, type, pageNo) => `${BASE_URL}/hospital/v1.0/list/${cityId}/${type}/${pageNo}.action`,
    API_QUERY_INHOSPASTIENT: (type, hosId, perId) => `/baseURL/${type}/v1.1/queryInHosPatient/${hosId}/${perId}.do`,
    API_QUERY_IN_PAY_LIST: (type, hosId, inHosNo) => `/baseURL/${type}/v1.0/${hosId}/${inHosNo}/queryInPrePayList.do`,
    API_QUERY_INHOSDETAIL: (type) => `/baseURL/${type}/v1.0/queryInHosDetail.do`,


    /* 11:--------------------------------------------结算-----*/
    API_PERSON: (personId) => `/baseURL/person/v1.2/getcardmsg/${personId}.do`, // 人员信息(未支付)
    API_PERSON_PAYED: (personId) => `/baseURL/bindcard/v1.0/getById/${personId}.do`, // 人员信息(未支付)
    API_PERSON_BALANCE: (personId) => `/baseURL/bindCard/v1.0/getById/${personId}.do`, // 人员信息(已支付)
    API_ADVANCE_SETTLE: (ordertype, orderid) => `/baseURL/wallet/v1.2/presettle/${ordertype}/${orderid}.do`,  // 预结算
    API_IS_SIGNABLE: () => `/baseURL/bindecard/v1.0/isSignable.action`,//获取渠道支付信息
    // API_SIGN: (signType,isIndep) => `/baseURL/bindecard/v2.0/bu/getSign/${signType}/${isIndep}.do`,//签名接口--对应部平台2.0.2版本
    API_SIGN: (signType,isIndep) => `/baseURL/bindecardHeNan/v2.0/bu/getSign/${signType}/${isIndep}.do`,//签名接口--对应部平台2.0.2版本
    API_PAY_METHOD_ATTRIBUTES: (cityId, siTypeCode, payMethodId) => `/baseURL/paymethod/v1.0/getPayMethodAttributes/${cityId}/${siTypeCode}/${payMethodId}.do`,
    API_SI_PAY: () => `/baseURL/wallet/v1.2/pay.do`, //医保支付-本地
    API_BU_SI_PAY: () => `/baseURL/wallet/v3.0/pay.do`, //医保支付-部平台
    API_THIRD_PAY_REGISTERED: (hosid) => `/baseURL/paymethod/v1.2/thirdList/${hosid}.do`, //第三方支付:当日挂号
    API_THIRD_PAY_PURCHASE_MEDICINE: (storeCode) => `/baseURL/paymethod/v1.2/store/thirdList/${storeCode}.do`, //第三方支付:扫码购药


    /* 12:--------------------------------------------报告查询-----*/
    API_QUERY_REPORT_LIST: (hosId, perId, begindate, enddate) => `/baseURL/checkresult/v1.2/list/${hosId}/${perId}/${begindate}/${enddate}.do`,
    API_QUERY_REPORT_DETAIL: (hosId, lisno, applyno, perId) => `/baseURL/checkresult/v1.2/get/${hosId}/${lisno}/${applyno}/${perId}.do`,
    API_QUERY_REPORT_EXAMINE: (hosId, reportId) => `/baseURL/inPrePay/v1.0/getExamineResult/${hosId}/${reportId}.do`,
    API_QUERY_EXAMINE_PIC: (hosId, reportId) => `/baseURL//inPrePay/v1.0/getChectPic/${hosId}/${reportId}.do`,


    API_WX_PAY:()=>`/baseURL/cmbBank/getCMBWeChatPay/v1.0.do`//微信支付
}
