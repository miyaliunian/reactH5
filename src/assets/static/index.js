/**
 * Class:
 * Author: wufei
 * Date: 2019/5/25
 * Description:  静态常量文件
 *
 */


//加密公钥
export const PUBLIC_LEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnUs9BxN1vawplBJI/uttk3bNy\r" +
    "l/mFbvL555EhriFkgOBfQ4J1tyIUatItIp4gvl2cDDeyrmmKOzYPrzcChVv4Bg0Y\r" +
    "94Wx4dSddCxQ172NyXXWV4MEPYkvwMucHeJjSrdchPqw+SRlYj2tmuRs56RXaf1r\r" +
    "4eiyI0MzArHfSArejwIDAQAB"


//哪些数据需要转换
export const dataConversionDic = {
    divisionList: 'division',//医院列表->科室列表
    token: 'token',//登录token
}