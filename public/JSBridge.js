window.onload = function () {
    if (undefined == window["J2N"]) {
        window["J2N"] = {};
    }

//    注册到命名空间
    window["J2N"]["aliPay"] = aliPay
    window["J2N"]["aliPayCallBack"] = aliPayCallBack
    window["J2N"]["mapPosition"] = mapPosition
    window["J2N"]["mapPositionCallBack"] = mapPositionCallBack
    window["J2N"]["mapNavigation"] = mapNavigation
    window["J2N"]["mapNavigationCallBack"] = mapNavigationCallBack
    window["J2N"]["perToken"] = perToken
    window["J2N"]["perTokenCallBack"] = perTokenCallBack
    window["J2N"]["peyResultNotice"] = peyResultNotice
    window["J2N"]["peyResultNoticeCallBack"] = peyResultNoticeCallBack

    function aliPay(i,e) {
        aliPayCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else  {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function  aliPayCallBack() {

    }

    function mapPosition(i,e) {
        mapPositionCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else  {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function mapPositionCallBack() {

    }

    function mapNavigation(i,e) {
        mapNavigationCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else  {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function mapNavigationCallBack() {

    }

    function perToken(i,e) {
        perTokenCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else  {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function perTokenCallBack() {

    }

    function peyResultNotice(i,e) {
        peyResultNoticeCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else  {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function peyResultNoticeCallBack() {

    }

    console.log('执行成功')
    console.log(window["J2N"])
}
