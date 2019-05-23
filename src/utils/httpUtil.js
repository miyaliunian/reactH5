/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  网络请求
 */

const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
})

/**
 *  GET 请求
 * @param url
 * @returns {Promise<Response>}
 */
function get(url) {
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
function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
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

export {get, post}