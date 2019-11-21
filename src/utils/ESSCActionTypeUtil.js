/*
*
*
*   actionType: "001", //电子社保卡申领完成
  actionType: 002 ",//直接验密签发 指在其他渠道已领取，然后在当前渠道签发
actionType: 003 ,//解除绑定完成
actionType: 005 开通缴费结算  二级签发
actionType: 006 到卡面
actionType: 007 调起支付码页面（被扫模式）
actionType: 008 扫支付码成功回调（主扫模式）扫一扫
actionType: 009 独立服务：密码认证成功，如果是医保支付验证密码，需要拿到busiSeq，传给后台去验证
actionType: 010 独立服务：短信认证成功
actionType: 011 独立服务：人脸认证成功
actionType: 012 独立服务：实人认证成功（使用时不需要传入签发号，只判断身份证+姓名+人脸的一致性；此独立服务目前仅用于国办、异地就医和人社部公共服务)
actionType: 013 独立服务：扫一扫登录成功通知
actionType: 014 养老认证成功
actionType: 015 历史数据签发
actionType: 016 乘车码支付成功
actionType: 017 独立服务：修改密码成功
actionType: 018 独立服务：重置密码成功
actionType: 019 独立服务：工作人员待遇资格认证成功
actionType: 020 移动支付支付成功
actionType: 022 独立服务：授权登录成功
actionType: 111   关闭SDK
actionType: 112   自定义的scheme协议回调
*
* */
/**
 *  部平台SDK返回参数验证
 * @param actionType
 * @returns {boolean}
 */
export function esscActionUtil(actionType) {
  let resStr = false;
  switch (actionType) {
    case "001": //电子社保卡申领完成
      break;
    case "002": //直接验密签发 指在其他渠道已领取，然后在当前渠道签发
      break;
    case "003": //解除绑定完成
      break;
    case "005": //开通缴费结算  二级签发
      break;
    case "006": //到卡面
      break;
    case "007": //调起支付码页面（被扫模式）
      break;
    case "008": //扫支付码成功回调（主扫模式）扫一扫
      break;
    case "009": //独立服务：密码认证成功，如果是医保支付验证密码，需要拿到busiSeq，传给后台去验证
      break;
    case "010": //独立服务：短信认证成功
      break;
    case "011": //独立服务：人脸认证成功
      break;
    case "012": //独立服务：实人认证成功（使用时不需要传入签发号，只判断身份证+姓名+人脸的一致性；此独立服务目前仅用于国办、异地就医和人社部公共服务)
      break;
    case "013": //独立服务：扫一扫登录成功通知
      break;
    case "014": //独立服务：扫一扫登录成功通知
      break;
    case "015": //历史数据签发
      break;
    case "016": //乘车码支付成功
      break;
    case "017": //独立服务：修改密码成功
      break;
    case "018": //独立服务：重置密码成功
      break;
    case "019": //独立服务：工作人员待遇资格认证成功
      break;
    case "020": //移动支付支付成功
      break;
    case "022": //独立服务：授权登录成功
      break;
    case "111": //关闭SDK
      resStr = true;
      break;
    case "112": //自定义的scheme协议回调
      break;
    default:
      break;
  }
  return resStr;
}
