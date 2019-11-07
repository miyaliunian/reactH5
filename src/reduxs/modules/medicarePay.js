/**
 * Class: medicarePay
 * Author: wufei
 * Date: 2019/9/4
 * Description:
 *  医保支付
 */

import URL from "@utils/httpUrl";
import { Toast } from "antd-mobile";
import { post } from "@utils/httpUtil";
import { PUBLIC_LEY } from "@assets/static";
import { cityID, payMethodId } from "@assets/static/Constant";

const initialState = {
  isFetching: false,
  isSignableEntity: "",
  verify: "2"
};

const actionTypes = {
  FETCH_REQUEST: "MEDICARE_PAY/FETCH_MEDICARE_PAY_REQUEST",
  FETCH_SUCCESS: "MEDICARE_PAY/FETCH_SUCCESS",
  FETCH_SIGNABLE_SUCCESS: "MEDICARE_PAY/FETCH_SIGNABLE_SUCCESS",
  FETCH_PAY_METHOD_ATTRI_SUCCESS: "MEDICARE_PAY/FETCH_PAY_METHOD_ATTRI_SUCCESS",
  FETCH_FAILURE: "MEDICARE_PAY/FETCH_MEDICARE_PAY_FAILURE"
};

export const actions = {
  //获取渠道支付信息
  loadSignable: (per) => {
    return (dispatch, getstate) => {
      const targetURL = URL.API_IS_SIGNABLE();
      dispatch(fetchRequest());
      let param = {
        idNumber: per.idCardNo,
        name: per.name
      };
      return post(targetURL, param)
        .then((data) => {
            if (data.infocode && data.infocode === 1) {
              dispatch(fetchSignableSuccess(data.data));
              signed(dispatch, per);
            } else {
              Toast.fail(data.infomessage, 2);
            }
          },
          error => {
            dispatch(fetchFailure());
            Toast.fail(error, 1);
          }
        )
        .catch(err => {
          dispatch(fetchFailure());
        });
    };
  },


  // 获取密码验证方式
  loadVerifyInfo: (per) => {
    return (dispatch, getstate) => {
      const targetUrl = URL.API_PAY_METHOD_ATTRIBUTES(cityID, per.siTypeCode, payMethodId);
      dispatch(fetchRequest());
      return post(targetUrl)
        .then((data) => {
            if (data.infocode && data.infocode === 1) {
              if (data.data.length > 0) {
                let obj = data.data[0];
                dispatch(fetchPayMethodAttriSuccess(obj.id === 1 ? "1" : "2"));
              } else {
                dispatch(fetchPayMethodAttriSuccess("2"));
              }
            } else {
              Toast.fail(data.infomessage, 2);
            }
          },
          error => {
            dispatch(fetchFailure());
            Toast.fail(error, 1);
          }
        )
        .catch(err => {
          dispatch(fetchFailure());
        });
    };
  },


  //支付
  pay: (pass, orderType, objEntity, reservationName, orderPayment, route, callBack) => {
    /**
     * @property (nonatomic, copy) NSString *orderType;//1 register 挂号；2 recipe 诊间支付
     @property (nonatomic, copy) NSString *orderId;
     @property (nonatomic, copy) NSString *phone;//签约手机号
     @property (nonatomic, copy) NSString *smsCode;//支付验证码
     @property (nonatomic, copy) NSString *password;//支付密码
     @property (nonatomic, copy) NSString *mgwUploadOrderNo;//商户网关编码(后台使用),扫码购药时需要传此值
     */
    return (dispatch, getstate) => {
      //RAS:处理加密
      let encrypt = new window.JSEncrypt();
      encrypt.setPublicKey(PUBLIC_LEY);
      let pwdencry = encrypt.encrypt(pass);
      //判断是否为扫描购药(medicineScan）
      let Params = orderType === "medicineScan" ? {
        orderType: orderType,
        orderId: objEntity.unifiedOrderId,
        phone: orderPayment.phone,
        password: pwdencry,
        mgwUploadOrderNo: orderPayment.orderNo
      } : { orderType: orderType, orderId: objEntity.unifiedOrderId, phone: orderPayment.phone, password: pwdencry };
      const targetURL = URL.API_SI_PAY();
      dispatch(fetchRequest());
      return post(targetURL, Params)
        .then((data) => {
            dispatch(fetchSuccess());
            if (data.infocode && data.infocode === 1) {
              let orderPaymentEntity = data.data;
              if (orderPaymentEntity.ownPayAmt > 0) {
                //回退到预结算(修改支付状态：将未医保支付 改成已经医保支付)
                callBack({ paymentStatus: 1 });
              } else {
                //跳转到支付完成
                let path = {
                  pathname: "/payResultContainer",
                  state: {
                    sn: objEntity.sn,
                    reservationName: reservationName,
                    price: orderPayment.siPayAmt + orderPayment.pubPayAmt
                  }
                };
                route.push(path);
              }
            } else {
              Toast.fail(data.infomessage, 2);
            }
          },
          error => {
            dispatch(fetchFailure());
            Toast.fail(error, 1);
          }
        )
        .catch(err => {
          dispatch(fetchFailure());
        });
    };
  }
};


/*
signType ： 1 申领  2 卡信息页面  3 修改密码  4 重置密码 5 支付  6 二级签发，开通缴费 7 密码登录
isIndep：是否为独立服务，传1：为独立服务，独立服务下必传 ;不传：为申领流程
 */
function signed(dispatch, per) {
  let signTYpe = 5;
  let isIndep = 1;
  const targetURL = URL.API_SIGN(signTYpe, isIndep);
  let Params = {
    cityId: cityID,
    idNo: per.idCardNo,
    name: per.name
  };
  if (per.auth) {
    Params.signNo = per.mgwId;
  }
  return post(targetURL, Params)
    .then(data => {
      debugger;
      console.log(data);
    }, err => {
      debugger;
      console.log(err);
    })
    .catch(err => {
      debugger;
      console.log(err);
    });
}


const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
});

const fetchSuccess = () => ({
  type: actionTypes.FETCH_REQUEST
});


const fetchSignableSuccess = (data) => ({
  type: actionTypes.FETCH_SIGNABLE_SUCCESS,
  response: data
});


const fetchPayMethodAttriSuccess = (data) => ({
  type: actionTypes.FETCH_PAY_METHOD_ATTRI_SUCCESS,
  response: data
});


const fetchFailure = () => ({
  type: actionTypes.FETCH_FAILURE
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case actionTypes.FETCH_SIGNABLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSignableEntity: action.response
      };
    case actionTypes.FETCH_PAY_METHOD_ATTRI_SUCCESS:

      return {
        ...state,
        isFetching: false,
        verify: action.response
      };
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
export default reducer;


//selectors
export const getFetchingStatus = (state) => {
  return state.medicarePay.isFetching;
};

export const getIsSignableEntity = (state) => {
  return state.medicarePay.isSignableEntity;
};

export const getVerifyEntity = (state) => {
  return state.medicarePay.verify;
};
