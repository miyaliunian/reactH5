/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求
 */

import Axios from "axios";
import { Component } from "react";

Component.prototype.$axios = Axios; //将axios挂载到Component上，以供全局使用


Axios.defaults.timeout = 30000;
Axios.defaults.headers = { "Content-Type": "application/json;charset=UTF-8" };


/**
 * 请求拦截器
 */
Axios.interceptors.request.use(async config => {
    isShowLoading(true);
    if (config.url.endsWith(".do")) {
      let tid = JSON.parse(sessionStorage.getItem('token')).access_token;
      config.headers["tid"] = tid;

      return config;
    } else {
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  });

/**
 * 响应拦截
 */
Axios.interceptors.response.use(response => {
  setTimeout(() => {
    isShowLoading(false);
  }, 1000);
  if (response.status === 200) { //网络请求正常
    return response.data;
  } else if (response.status === 403) { //token过期
    return Promise.reject({ message: "token过期 重新登录" }); //其它错误
  } else {
    return Promise.reject(response); //其它错误
  }
});

export function post(url, bodyParam = "") {
  return new Promise((resolve, reject) => {
    Axios.post(url, JSON.stringify(bodyParam), { cancelToken: Axios.CancelToken.source.token })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        isShowLoading(false);
        if (err.code && err.code == "ECONNABORTED") {//请求超时
          return reject({ url: url, message: "请求超时" });
        } else if (err.message && err.message == "Request failed with status code 403") {//403token过期
          return reject(err.message);
        } else if (err.message && err.message == "Network Error") { // 网络出现连接失败
          return reject({ url: url, message: "网络连接失败,请检查你的网络" });
        } else {
          return reject(err.message);
        }
      });
  });
}

//是否显示Loading框
function isShowLoading(payload) {
  try {
    const loading = document.getElementById("loadingMask");
    payload ? loading.style.display = "flex" : loading.style.display = "none";
  } catch (err) {

  }

}