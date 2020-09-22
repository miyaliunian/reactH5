(function () {
    if (undefined == window["J2N"]) {
        window["J2N"] = {};
    }
    window["J2N"]["aliPay"] = aliPay;
    window["J2N"]["aliPayCallBack"] = aliPayCallBack;
    window["J2N"]["mapPosition"] = mapPosition;
    window["J2N"]["mapPositionCallBack"] = mapPositionCallBack;
    window["J2N"]["mapNavigation"] = mapNavigation;
    window["J2N"]["mapNavigationCallBack"] = mapNavigationCallBack;
    window["J2N"]["perToken"] = perToken;
    window["J2N"]["perTokenCallBack"] = perTokenCallBack;
    window["J2N"]["peyResultNotice"] = peyResultNotice;
    window["J2N"]["peyResultNoticeCallBack"] = peyResultNoticeCallBack;


    
    // 支付宝支付   -------------------- start
    function aliPay(i, e) {
        aliPayCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function aliPayCallBack() {

    }
    // 支付宝支付   -------------------- end 



    // 地图定位   -------------------- start
    function mapPosition(i, e) {
        mapPositionCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function mapPositionCallBack() {

    }
    // 地图定位   -------------------- end



    // 地图导航 -------------------- start
    function mapNavigation(i, e) {
        mapNavigationCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function mapNavigationCallBack() {

    }
    // 地图导航 -------------------- end



    // 人员token -------------------- start
    function perToken(i, e) {
        perTokenCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function perTokenCallBack() {

    }
    // 人员token -------------------- end



    // 支付结果通知 -------------------- start
    function peyResultNotice(i, e) {
        peyResultNoticeCallBack = e
        const u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            console.log('安卓手机进入')
            // window.Tnative.gridItemClick(JSON.stringify(item))
        } else {
            console.log('ios手机进入')
            // window.webkit.messageHandlers.gridItemClick.postMessage(JSON.stringify(item))
        }
    }

    function peyResultNoticeCallBack() {

    }
    // 支付结果通知 -------------------- end

    console.log('执行成功')
    console.log(window["J2N"])
})(window)
