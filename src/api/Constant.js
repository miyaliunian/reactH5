/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *   字典常量
 */

// //洛阳 行政区域代码
// export const cityID = "410300";
// export const BASE_URL = "http://ykt.haly12333.org.cn:80/t-core";
// //410305198201053012 qiaobin823

//南通测试
// export const cityID = "320600";
// export const BASE_URL = "http://58.208.84.112:10086/t-core";
// //310101196310114532 123456nt

//南通正式
export const cityID = '320600'
export const BASE_URL = 'http://www.ntyibao.com/t-core'
// //530101198001010051  Aa123456

//常州正式
// export const cityID = '320400'
// export const BASE_URL = 'http://app.czrsj.cn:10086/t-core'
//常州测试账号
// //321182198304262213 qwe123

//本溪
// export const cityID = "210500";
// export const BASE_URL='https://ncp.neuqsoft.com:11061/t-core'
// //210502198806292141  qwer1234

//预约挂号-医院列表

export const TABKAY = {
  AREA: 'AREA', //全部区域
  SORT: 'SORT', //综合排序
  FILTER: 'FILTER' //过滤
}

export const DOCTORTABKAY = {
  expert: 'expert', //按专家预约
  date: 'date' //按日期预约
}
export const MYORDERTABKAY = {
  register: 'register', //预约挂号
  outpatientPayment: 'outpatientPayment' //门诊缴费
}

// -综合排序
export const ZHPX = [
  { name: '综合排序', value: 'register' },
  { name: '医院等级', value: 'grade' }
]

//筛选
export const SX = [
  {
    groupTitle: '不限',
    key: 'lx', //医院等级
    value: '',
    items: [
      {
        name: '不限',
        active: false,
        key: 'lx', //医院类型
        value: ''
      },
      {
        name: '综合医院',
        active: false,
        key: 'lx', //医院类型
        value: 'general'
      },
      {
        name: '专科医院',
        active: false,
        key: 'lx', //医院类型
        value: 'special'
      },
      {
        name: '其它',
        active: false,
        key: 'lx', //医院类型
        value: 'other'
      }
    ]
  },
  {
    groupTitle: '不限',
    key: 'dj', //医院等级
    value: '',
    items: [
      {
        name: '不限',
        active: false,
        key: 'dj', //医院等级
        value: ''
      },
      {
        name: '三甲',
        active: false,
        key: 'dj', //医院等级
        value: 'threeAGrade'
      },
      {
        name: '三级',
        active: false,
        key: 'dj', //医院等级
        value: 'threeGrade'
      },
      {
        name: '二级',
        active: false,
        key: 'dj', //医院等级
        value: 'twoGrade'
      },
      {
        name: '其它',
        active: false,
        key: 'dj', //医院等级
        value: 'othersGrade'
      }
    ]
  }
]

//医生类别
export const DoctorOrderType = {
  doctordefalut: 'doctordefalut',
  title: 'title',
  hosgrade: 'hosgrade'
}

/**
 * 平台类型
 * 0：医院科室  1：平台科室
 */
export const PlatformType = {
  HospitalDepartments: 0,
  PlatformDepartment: 1
}

//医院等级
export const HosGradeAppType = {
  threeAGrade: 'threeAGrade',
  threeGrade: 'threeGrade',
  twoGrade: 'twoGrade',
  oneGrade: 'oneGrade',
  othersGrade: 'othersGrade'
}

export const OrderType = [
  { register: '线上挂号', status: 'register' },
  { recipe: '门诊缴费', status: 'recipe' },
  { medicineScan: '扫码购药', status: 'medicineScan' },
  { inPrePay: '住院押金', status: 'inPrePay' }
]

export const payMethodId = '1'
