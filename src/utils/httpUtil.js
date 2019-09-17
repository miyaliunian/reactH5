/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求
 */

import axios from 'axios';

axios.defaults.timeout = 100;
axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8', 'Connection': 'keep-alive'}
// 请求拦截器
axios.interceptors.request.use(async config => {
        if (config.url.endsWith('.do')) {
            let tid = JSON.parse(sessionStorage.getItem('token')).access_token
            config.headers['tid'] = tid
            return config
        } else {
            return config
        }
    },
    error => {
        return Promise.reject(error)
    })

//响应拦截
axios.interceptors.response.use(response => {
    if (response.status === 200) { //网络请求正常
        return response.data
    } else if (response.status === 403) { //token过期
        console.log('token过期 重新登录')
    } else {
        console.log('其它错误')
        console.log(response)
        return Promise.reject(response) //其它错误
    }
})

export function post(url, bodyParam = '') {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(bodyParam))
            .then(res => {

                resolve(res);
            })
            .catch(err => {

                if (err.code && err.code == 'ECONNABORTED') {//请求超时
                    return reject({message: '请求超时'})
                } else if (err.message && err.message == 'Request failed with status code 403') {//403token过期
                    return reject(err.message)
                } else if (err.message && err.message == 'Network Error') { // 网络出现连接失败
                    return reject({message: '网络连接失败,请检查你的网络'})
                } else {
                    return reject(err.message)
                }
            })
    });
}
