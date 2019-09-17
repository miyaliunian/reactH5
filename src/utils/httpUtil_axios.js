/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求
 */
/**
 *  GET 请求
 * @param url
 * @returns {Promise<Response>}
 */
function get(url) {
    let headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
    })
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return handelResponse(response, url)
    }).catch(error => {
        console.error(`Request failed. Url = ${url}. Message = ${error}`)
        return Promise.reject({error: {message: "Request failed."}})
    })
}


/**
 * POST 请求
 * @param url
 * @param data
 * @returns {Promise<Response>}
 */
function post(url, data = '') {
    let headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
    })
    if ( url.endsWith('.do')) {
        let tid = JSON.parse(sessionStorage.getItem('token')).access_token
        headers.append("tid", tid)
    }
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        return handelResponse(response, url)
    }).catch(error => {
        console.error(`Request failed. Url = ${url}. Message = ${error}`)
        return Promise.reject({error: {message: "Request failed."}})
    })
}


/**
 * 容错处理
 * @param resposne
 * @param url
 * @returns {*}
 */
function handelResponse(resposne, url) {
    if (resposne.status === 200) {
        return resposne.json()
    } else {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({error: {message: "Request failed due to server error"}})
    }
}


timeout_fetch(fetch_promise, timeout = 30000) {
    let timeout_fn = null;
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('abort promise');
        };
    });
    let abort_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function () {
        timeout_fn();
    }, timeout);

    return abort_promise;
}

export {post}