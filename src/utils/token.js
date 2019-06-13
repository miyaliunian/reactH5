export function isLogin() {
    if (JSON.parse(localStorage.getItem('token'))) {
        let token = JSON.parse(localStorage.getItem('token')).access_token
        return true
    } else {
        return false
    }
}