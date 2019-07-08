export function isLogin() {
    if (JSON.parse(sessionStorage.getItem('token'))) {
        let token = JSON.parse(sessionStorage.getItem('token')).access_token
        return true
    } else {
        return false
    }
}