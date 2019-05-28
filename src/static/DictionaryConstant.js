/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *   字典常量
 */


export const cityID = '320600'

//预约挂号-医院列表
//

// -综合排序
export const ZHPX = [
    {title: '综合排序', value: 'register'},
    {title: '医院等级', value: 'grade'}
]

//筛选->医院类型
export const SX_YYLX = {
    title: '不限',
    data: [
        {
            title: '不限',
            value: '',
            isSel: true
        },
        {
            title: '综合医院',
            value: 'general',
            isSel: false
        },
        {
            title: '专科',
            value: 'special',
            isSel: false
        },
        {
            title: '其它',
            value: 'other',
            isSel: false
        }
    ]
}

//筛选->医院等级
export const SX_YYDJ = {
    title: '不限',
    data: [
        {
            title: '不限',
            value: '',
            isSel: true
        },
        {
            title: '三甲',
            value: 'threeAGrade',
            isSel: false
        },
        {
            title: '三级',
            value: 'threeGrade',
            isSel: false
        },
        {
            title: '二级',
            value: 'twoGrade',
            isSel: false
        },
        {
            title: '其它',
            value: 'othersGrade',
            isSel: false
        }
    ]
}