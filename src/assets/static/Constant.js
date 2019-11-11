/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *   字典常量
 */


//洛阳 行政区域代码
export const cityID = "410300";
export const BASE_URL = "http://ykt.haly12333.org.cn/t-core";

// //export const BASE_URL = 'http://58.208.84.112:10086/t-core'
// //南通正式
// export const cityID = '320600'
// export const BASE_URL = 'http://www.ntyibao.com/t-core'
//常州正式
//export const cityID = '320600'
//export const BASE_URL = 'http://app.czrsj.cn:10086/t-core'


//预约挂号-医院列表
//

// -综合排序
export const ZHPX = [
  { title: "综合排序", value: "register" },
  { title: "医院等级", value: "grade" }
];


//筛选->医院类型
export const SX_YYLX = {
  title: "不限",
  data: [
    {
      title: "不限",
      value: "",
      isSel: true
    },
    {
      title: "综合医院",
      value: "general",
      isSel: false
    },
    {
      title: "专科",
      value: "special",
      isSel: false
    },
    {
      title: "其它",
      value: "other",
      isSel: false
    }
  ]
};

//筛选->医院等级
export const SX_YYDJ = {
  title: "不限",
  data: [
    {
      title: "不限",
      value: "",
      isSel: true
    },
    {
      title: "三甲",
      value: "threeAGrade",
      isSel: false
    },
    {
      title: "三级",
      value: "threeGrade",
      isSel: false
    },
    {
      title: "二级",
      value: "twoGrade",
      isSel: false
    },
    {
      title: "其它",
      value: "othersGrade",
      isSel: false
    }
  ]
};

//医生类别
export const DoctorOrderType = {
  doctordefalut: "doctordefalut",
  title: "title",
  hosgrade: "hosgrade"
};

/**
 * 平台类型
 * 0：医院科室  1：平台科室
 */
export const PlatformType = {
  HospitalDepartments: 0,
  PlatformDepartment: 1
};

//医院等级
export const HosGradeAppType = {
  threeAGrade: "threeAGrade",
  threeGrade: "threeGrade",
  twoGrade: "twoGrade",
  oneGrade: "oneGrade",
  othersGrade: "othersGrade"
};


export const OrderType =
  [
    { register: "线上挂号", status: "register" },
    { recipe: "门诊缴费", status: "recipe" },
    { medicineScan: "扫码购药", status: "medicineScan" },
    { inPrePay: "住院押金", status: "inPrePay" }
  ];




export const payMethodId = "1";


