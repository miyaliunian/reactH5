/**
 * weixinJSBridge.js , alipayJSBridge.js ,
 * j2c_core.js , j2c_core_kit.js , j2c_corePWA2.js , j2c_coreWechart.js , j2c_coreAlipay.js 七个js合并而成
 *
 * j2c_core.js： 调用各平台代码 （Version 1.2.1）
 * j2c_core_local.js： 地方代码，主要getUserInfo （Version 1.1.1）
 * j2c_corePWA2.js：PC、微信、支付宝这三种平台共同调用方法，主要在j2c_core.js里分流调用 （Version 1.1.1）,添加upDatePersonId 获取用户信息（南昌项目里面增加）
 * j2c_coreWechart.js： 主要是微信独有特性，在j2c_core.js里分流调用 （Version 1.1.0）
 * j2c_coreAlipay.js: 主要支付宝平台独有特性，j2c_core.js里分流调用 （Version 1.1.0）
 *j2c_core_kit.js  ios修改loginout,安卓添加检测更新和刷脸
 * Version 1.2.7  医保专项 j2c_core_kit 添加ess
 *
 *
 */
!function (e, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function () {
        return i(e)
    }) : i(e, !0)
}(this, function (t, e) {
    function s(i, e, n) {
        t.WeixinJSBridge ? WeixinJSBridge.invoke(i, a(e), function (e) {
            r(i, e, n)
        }) : d(i, n)
    }

    function n(i, n, o) {
        t.WeixinJSBridge ? WeixinJSBridge.on(i, function (e) {
            o && o.trigger && o.trigger(e), r(i, e, n)
        }) : d(i, o || n)
    }

    function a(e) {
        return (e = e || {}).appId = y.appId, e.verifyAppId = y.appId, e.verifySignType = "sha1", e.verifyTimestamp = y.timestamp + "", e.verifyNonceStr = y.nonceStr, e.verifySignature = y.signature, e
    }

    function i(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }

    function r(e, i, n) {
        "openEnterpriseChat" == e && (i.errCode = i.err_code), delete i.err_code, delete i.err_desc, delete i.err_detail;
        var o = i.errMsg;
        o || (o = i.err_msg, delete i.err_msg, o = function (e, i) {
            var n = e, o = g[n];
            o && (n = o);
            var t = "ok";
            if (i) {
                var a = i.indexOf(":");
                "confirm" == (t = i.substring(a + 1)) && (t = "ok"), "failed" == t && (t = "fail"), -1 != t.indexOf("failed_") && (t = t.substring(7)), -1 != t.indexOf("fail_") && (t = t.substring(5)), "access denied" != (t = (t = t.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != t || (t = "permission denied"), "config" == n && "function not exist" == t && (t = "ok"), "" == t && (t = "fail")
            }
            return i = n + ":" + t
        }(e, o), i.errMsg = o), (n = n || {})._complete && (n._complete(i), delete n._complete), o = i.errMsg || "", y.debug && !n.isInnerInvoke && alert(JSON.stringify(i));
        var t = o.indexOf(":");
        switch (o.substring(t + 1)) {
            case"ok":
                n.success && n.success(i);
                break;
            case"cancel":
                n.cancel && n.cancel(i);
                break;
            default:
                n.fail && n.fail(i)
        }
        n.complete && n.complete(i)
    }

    function c(e) {
        if (e) {
            for (var i = 0, n = e.length; i < n; ++i) {
                var o = e[i], t = w[o];
                t && (e[i] = t)
            }
            return e
        }
    }

    function d(e, i) {
        if (!(!y.debug || i && i.isInnerInvoke)) {
            var n = g[e];
            n && (e = n), i && i._complete && delete i._complete, console.log('"' + e + '",', i || "")
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function u(e) {
        h && (t.WeixinJSBridge ? e() : o.addEventListener && o.addEventListener("WeixinJSBridgeReady", e, !1))
    }

    if (!t.jWeixin) {
        var w = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                onMenuShareQZone: "menu:share:QZone",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest",
                openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                startSearchBeacons: "startMonitoringBeacons",
                stopSearchBeacons: "stopMonitoringBeacons",
                onSearchBeacons: "onBeaconsInRange",
                consumeAndShareCard: "consumedShareCard",
                openAddress: "editAddress"
            }, g = function () {
                var e = {};
                for (var i in w) e[w[i]] = i;
                return e
            }(), o = t.document, f = o.title, p = navigator.userAgent.toLowerCase(), m = navigator.platform.toLowerCase(),
            v = !(!m.match("mac") && !m.match("win")), J = -1 != p.indexOf("wxdebugger"),
            h = -1 != p.indexOf("micromessenger"), I = -1 != p.indexOf("android"),
            S = -1 != p.indexOf("iphone") || -1 != p.indexOf("ipad"),
            C = (M = p.match(/micromessenger\/(\d+\.\d+\.\d+)/) || p.match(/micromessenger\/(\d+\.\d+)/)) ? M[1] : "",
            k = {initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0}, b = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: S ? 1 : I ? 2 : -1,
                clientVersion: C,
                url: encodeURIComponent(location.href)
            }, y = {}, B = {_completes: []}, N = {state: 0, data: {}};
        u(function () {
            k.initEndTime = l()
        });
        var P = !1, A = [], T = {
            config: function (e) {
                d("config", y = e);
                var o = !1 !== y.check;
                u(function () {
                    if (o) s(w.config, {verifyJsApiList: c(y.jsApiList)}, function () {
                        B._complete = function (e) {
                            k.preVerifyEndTime = l(), N.state = 1, N.data = e
                        }, B.success = function (e) {
                            b.isPreVerifyOk = 0
                        }, B.fail = function (e) {
                            B._fail ? B._fail(e) : N.state = -1
                        };
                        var o = B._completes;
                        return o.push(function () {
                            !function (e) {
                                if (!(v || J || y.debug || C < "6.0.2" || b.systemType < 0)) {
                                    var n = new Image;
                                    b.appId = y.appId, b.initTime = k.initEndTime - k.initStartTime, b.preVerifyTime = k.preVerifyEndTime - k.preVerifyStartTime, T.getNetworkType({
                                        isInnerInvoke: !0,
                                        success: function (e) {
                                            b.networkType = e.networkType;
                                            var i = "https://open.weixin.qq.com/sdk/report?v=" + b.version + "&o=" + b.isPreVerifyOk + "&s=" + b.systemType + "&c=" + b.clientVersion + "&a=" + b.appId + "&n=" + b.networkType + "&i=" + b.initTime + "&p=" + b.preVerifyTime + "&u=" + b.url;
                                            n.src = i
                                        }
                                    })
                                }
                            }()
                        }), B.complete = function (e) {
                            for (var i = 0, n = o.length; i < n; ++i) o[i]();
                            B._completes = []
                        }, B
                    }()), k.preVerifyStartTime = l(); else {
                        N.state = 1;
                        for (var e = B._completes, i = 0, n = e.length; i < n; ++i) e[i]();
                        B._completes = []
                    }
                }), T.invoke || (T.invoke = function (e, i, n) {
                    t.WeixinJSBridge && WeixinJSBridge.invoke(e, a(i), n)
                }, T.on = function (e, i) {
                    t.WeixinJSBridge && WeixinJSBridge.on(e, i)
                })
            }, ready: function (e) {
                0 != N.state ? e() : (B._completes.push(e), !h && y.debug && e())
            }, error: function (e) {
                C < "6.0.2" || (-1 == N.state ? e(N.data) : B._fail = e)
            }, checkJsApi: function (e) {
                s("checkJsApi", {jsApiList: c(e.jsApiList)}, (e._complete = function (e) {
                    if (I) {
                        var i = e.checkResult;
                        i && (e.checkResult = JSON.parse(i))
                    }
                    e = function (e) {
                        var i = e.checkResult;
                        for (var n in i) {
                            var o = g[n];
                            o && (i[o] = i[n], delete i[n])
                        }
                        return e
                    }(e)
                }, e))
            }, onMenuShareTimeline: function (e) {
                n(w.onMenuShareTimeline, {
                    complete: function () {
                        s("shareTimeline", {
                            title: e.title || f,
                            desc: e.title || f,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            }, onMenuShareAppMessage: function (i) {
                n(w.onMenuShareAppMessage, {
                    complete: function (e) {
                        "favorite" === e.scene ? s("sendAppMessage", {
                            title: i.title || f,
                            desc: i.desc || "",
                            link: i.link || location.href,
                            img_url: i.imgUrl || "",
                            type: i.type || "link",
                            data_url: i.dataUrl || ""
                        }) : s("sendAppMessage", {
                            title: i.title || f,
                            desc: i.desc || "",
                            link: i.link || location.href,
                            img_url: i.imgUrl || "",
                            type: i.type || "link",
                            data_url: i.dataUrl || ""
                        }, i)
                    }
                }, i)
            }, onMenuShareQQ: function (e) {
                n(w.onMenuShareQQ, {
                    complete: function () {
                        s("shareQQ", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareWeibo: function (e) {
                n(w.onMenuShareWeibo, {
                    complete: function () {
                        s("shareWeiboApp", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareQZone: function (e) {
                n(w.onMenuShareQZone, {
                    complete: function () {
                        s("shareQZone", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, updateTimelineShareData: function (e) {
                s("updateTimelineShareData", {title: e.title, link: e.link, imgUrl: e.imgUrl}, e)
            }, updateAppMessageShareData: function (e) {
                s("updateAppMessageShareData", {title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl}, e)
            }, startRecord: function (e) {
                s("startRecord", {}, e)
            }, stopRecord: function (e) {
                s("stopRecord", {}, e)
            }, onVoiceRecordEnd: function (e) {
                n("onVoiceRecordEnd", e)
            }, playVoice: function (e) {
                s("playVoice", {localId: e.localId}, e)
            }, pauseVoice: function (e) {
                s("pauseVoice", {localId: e.localId}, e)
            }, stopVoice: function (e) {
                s("stopVoice", {localId: e.localId}, e)
            }, onVoicePlayEnd: function (e) {
                n("onVoicePlayEnd", e)
            }, uploadVoice: function (e) {
                s("uploadVoice", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadVoice: function (e) {
                s("downloadVoice", {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, translateVoice: function (e) {
                s("translateVoice", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, chooseImage: function (e) {
                s("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || ["original", "compressed"],
                    sourceType: e.sourceType || ["album", "camera"]
                }, (e._complete = function (e) {
                    if (I) {
                        var i = e.localIds;
                        try {
                            i && (e.localIds = JSON.parse(i))
                        } catch (e) {
                        }
                    }
                }, e))
            }, getLocation: function (e) {
            }, previewImage: function (e) {
                s(w.previewImage, {current: e.current, urls: e.urls}, e)
            }, uploadImage: function (e) {
                s("uploadImage", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadImage: function (e) {
                s("downloadImage", {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, getLocalImgData: function (e) {
                !1 === P ? (P = !0, s("getLocalImgData", {localId: e.localId}, (e._complete = function (e) {
                    if (P = !1, 0 < A.length) {
                        var i = A.shift();
                        wx.getLocalImgData(i)
                    }
                }, e))) : A.push(e)
            }, getNetworkType: function (e) {
                s("getNetworkType", {}, (e._complete = function (e) {
                    e = function (e) {
                        var i = e.errMsg;
                        e.errMsg = "getNetworkType:ok";
                        var n = e.subtype;
                        if (delete e.subtype, n) e.networkType = n; else {
                            var o = i.indexOf(":"), t = i.substring(o + 1);
                            switch (t) {
                                case"wifi":
                                case"edge":
                                case"wwan":
                                    e.networkType = t;
                                    break;
                                default:
                                    e.errMsg = "getNetworkType:fail"
                            }
                        }
                        return e
                    }(e)
                }, e))
            }, openLocation: function (e) {
                s("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e)
            }, getLocation: function (e) {
                s(w.getLocation, {type: (e = e || {}).type || "wgs84"}, (e._complete = function (e) {
                    delete e.type
                }, e))
            }, hideOptionMenu: function (e) {
                s("hideOptionMenu", {}, e)
            }, showOptionMenu: function (e) {
                s("showOptionMenu", {}, e)
            }, closeWindow: function (e) {
                s("closeWindow", {}, e = e || {})
            }, hideMenuItems: function (e) {
                s("hideMenuItems", {menuList: e.menuList}, e)
            }, showMenuItems: function (e) {
                s("showMenuItems", {menuList: e.menuList}, e)
            }, hideAllNonBaseMenuItem: function (e) {
                s("hideAllNonBaseMenuItem", {}, e)
            }, showAllNonBaseMenuItem: function (e) {
                s("showAllNonBaseMenuItem", {}, e)
            }, scanQRCode: function (e) {
                s("scanQRCode", {
                    needResult: (e = e || {}).needResult || 0,
                    scanType: e.scanType || ["qrCode", "barCode"]
                }, (e._complete = function (e) {
                    if (S) {
                        var i = e.resultStr;
                        if (i) {
                            var n = JSON.parse(i);
                            e.resultStr = n && n.scan_code && n.scan_code.scan_result
                        }
                    }
                }, e))
            }, openAddress: function (e) {
                s(w.openAddress, {}, (e._complete = function (e) {
                    var i;
                    (i = e).postalCode = i.addressPostalCode, delete i.addressPostalCode, i.provinceName = i.proviceFirstStageName, delete i.proviceFirstStageName, i.cityName = i.addressCitySecondStageName, delete i.addressCitySecondStageName, i.countryName = i.addressCountiesThirdStageName, delete i.addressCountiesThirdStageName, i.detailInfo = i.addressDetailInfo, delete i.addressDetailInfo, e = i
                }, e))
            }, openProductSpecificView: function (e) {
                s(w.openProductSpecificView, {pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo}, e)
            }, addCard: function (e) {
                for (var i = e.cardList, n = [], o = 0, t = i.length; o < t; ++o) {
                    var a = i[o], r = {card_id: a.cardId, card_ext: a.cardExt};
                    n.push(r)
                }
                s(w.addCard, {card_list: n}, (e._complete = function (e) {
                    var i = e.card_list;
                    if (i) {
                        for (var n = 0, o = (i = JSON.parse(i)).length; n < o; ++n) {
                            var t = i[n];
                            t.cardId = t.card_id, t.cardExt = t.card_ext, t.isSuccess = !!t.is_succ, delete t.card_id, delete t.card_ext, delete t.is_succ
                        }
                        e.cardList = i, delete e.card_list
                    }
                }, e))
            }, chooseCard: function (e) {
                s("chooseCard", {
                    app_id: y.appId,
                    location_id: e.shopId || "",
                    sign_type: e.signType || "SHA1",
                    card_id: e.cardId || "",
                    card_type: e.cardType || "",
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + "",
                    nonce_str: e.nonceStr
                }, (e._complete = function (e) {
                    e.cardList = e.choose_card_info, delete e.choose_card_info
                }, e))
            }, openCard: function (e) {
                for (var i = e.cardList, n = [], o = 0, t = i.length; o < t; ++o) {
                    var a = i[o], r = {card_id: a.cardId, code: a.code};
                    n.push(r)
                }
                s(w.openCard, {card_list: n}, e)
            }, consumeAndShareCard: function (e) {
                s(w.consumeAndShareCard, {consumedCardId: e.cardId, consumedCode: e.code}, e)
            }, chooseWXPay: function (e) {
                s(w.chooseWXPay, i(e), e)
            }, openEnterpriseRedPacket: function (e) {
                s(w.openEnterpriseRedPacket, i(e), e)
            }, startSearchBeacons: function (e) {
                s(w.startSearchBeacons, {ticket: e.ticket}, e)
            }, stopSearchBeacons: function (e) {
                s(w.stopSearchBeacons, {}, e)
            }, onSearchBeacons: function (e) {
                n(w.onSearchBeacons, e)
            }, openEnterpriseChat: function (e) {
                s("openEnterpriseChat", {useridlist: e.userIds, chatname: e.groupName}, e)
            }, launchMiniProgram: function (e) {
                s("launchMiniProgram", {
                    targetAppId: e.targetAppId, path: function (e) {
                        if ("string" == typeof e && 0 < e.length) {
                            var i = e.split("?")[0], n = e.split("?")[1];
                            return i += ".html", void 0 !== n ? i + "?" + n : i
                        }
                    }(e.path), envVersion: e.envVersion
                }, e)
            }, miniProgram: {
                navigateBack: function (e) {
                    e = e || {}, u(function () {
                        s("invokeMiniProgramAPI", {name: "navigateBack", arg: {delta: e.delta || 1}}, e)
                    })
                }, navigateTo: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "navigateTo", arg: {url: e.url}}, e)
                    })
                }, redirectTo: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "redirectTo", arg: {url: e.url}}, e)
                    })
                }, switchTab: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "switchTab", arg: {url: e.url}}, e)
                    })
                }, reLaunch: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "reLaunch", arg: {url: e.url}}, e)
                    })
                }, postMessage: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "postMessage", arg: e.data || {}}, e)
                    })
                }, getEnv: function (e) {
                    u(function () {
                        e({miniprogram: "miniprogram" === t.__wxjs_environment})
                    })
                }
            }
        }, W = 1, V = {};
        return o.addEventListener("error", function (e) {
            if (!I) {
                var i = e.target, n = i.tagName, o = i.src;
                if (("IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n) && -1 != o.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var t = i["wx-id"];
                    if (t || (t = W++, i["wx-id"] = t), V[t]) return;
                    V[t] = !0, wx.ready(function () {
                        wx.getLocalImgData({
                            localId: o, success: function (e) {
                                i.src = e.localData
                            }
                        })
                    })
                }
            }
        }, !0), o.addEventListener("load", function (e) {
            if (!I) {
                var i = e.target, n = i.tagName;
                if (i.src, "IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n) {
                    var o = i["wx-id"];
                    o && (V[o] = !1)
                }
            }
        }, !0), e && (t.wx = t.jWeixin = T), T
    }
    var M
}), function (e, i) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function () {
        return i(e)
    }) : i(e, !0)
}(this, function (t, e) {
    function s(i, e, n) {
        t.AlipayJSBridge ? AlipayJSBridge.invoke(i, a(e), function (e) {
            r(i, e, n)
        }) : d(i, n)
    }

    function n(i, n, o) {
        t.AlipayJSBridge ? AlipayJSBridge.on(i, function (e) {
            o && o.trigger && o.trigger(e), r(i, e, n)
        }) : d(i, o || n)
    }

    function a(e) {
        return (e = e || {}).appId = y.appId, e.verifyAppId = y.appId, e.verifySignType = "sha1", e.verifyTimestamp = y.timestamp + "", e.verifyNonceStr = y.nonceStr, e.verifySignature = y.signature, e
    }

    function i(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }

    function r(e, i, n) {
        "openEnterpriseChat" == e && (i.errCode = i.err_code), delete i.err_code, delete i.err_desc, delete i.err_detail;
        var o = i.errMsg;
        o || (o = i.err_msg, delete i.err_msg, o = function (e, i) {
            var n = e, o = g[n];
            o && (n = o);
            var t = "ok";
            if (i) {
                var a = i.indexOf(":");
                "confirm" == (t = i.substring(a + 1)) && (t = "ok"), "failed" == t && (t = "fail"), -1 != t.indexOf("failed_") && (t = t.substring(7)), -1 != t.indexOf("fail_") && (t = t.substring(5)), "access denied" != (t = (t = t.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != t || (t = "permission denied"), "config" == n && "function not exist" == t && (t = "ok"), "" == t && (t = "fail")
            }
            return i = n + ":" + t
        }(e, o), i.errMsg = o), (n = n || {})._complete && (n._complete(i), delete n._complete), o = i.errMsg || "", y.debug && !n.isInnerInvoke && alert(JSON.stringify(i));
        var t = o.indexOf(":");
        switch (o.substring(t + 1)) {
            case"ok":
                n.success && n.success(i);
                break;
            case"cancel":
                n.cancel && n.cancel(i);
                break;
            default:
                n.fail && n.fail(i)
        }
        n.complete && n.complete(i)
    }

    function c(e) {
        if (e) {
            for (var i = 0, n = e.length; i < n; ++i) {
                var o = e[i], t = w[o];
                t && (e[i] = t)
            }
            return e
        }
    }

    function d(e, i) {
        if (!(!y.debug || i && i.isInnerInvoke)) {
            var n = g[e];
            n && (e = n), i && i._complete && delete i._complete, console.log('"' + e + '",', i || "")
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function u(e) {
        h && (t.AlipayJSBridge ? e() : o.addEventListener && o.addEventListener("AlipayJSBridgeReady", e, !1))
    }

    if (!t.jWeixin) {
        var w = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                onMenuShareQZone: "menu:share:QZone",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest",
                openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                startSearchBeacons: "startMonitoringBeacons",
                stopSearchBeacons: "stopMonitoringBeacons",
                onSearchBeacons: "onBeaconsInRange",
                consumeAndShareCard: "consumedShareCard",
                openAddress: "editAddress"
            }, g = function () {
                var e = {};
                for (var i in w) e[w[i]] = i;
                return e
            }(), o = t.document, f = o.title, p = navigator.userAgent.toLowerCase(), m = navigator.platform.toLowerCase(),
            v = !(!m.match("mac") && !m.match("win")), J = -1 != p.indexOf("wxdebugger"),
            h = -1 != p.indexOf("micromessenger"), I = -1 != p.indexOf("android"),
            S = -1 != p.indexOf("iphone") || -1 != p.indexOf("ipad"),
            C = (M = p.match(/micromessenger\/(\d+\.\d+\.\d+)/) || p.match(/micromessenger\/(\d+\.\d+)/)) ? M[1] : "",
            k = {initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0}, b = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: S ? 1 : I ? 2 : -1,
                clientVersion: C,
                url: encodeURIComponent(location.href)
            }, y = {}, B = {_completes: []}, N = {state: 0, data: {}};
        u(function () {
            k.initEndTime = l()
        });
        var P = !1, A = [], T = {
            config: function (e) {
                d("config", y = e);
                var o = !1 !== y.check;
                u(function () {
                    if (o) s(w.config, {verifyJsApiList: c(y.jsApiList)}, function () {
                        B._complete = function (e) {
                            k.preVerifyEndTime = l(), N.state = 1, N.data = e
                        }, B.success = function (e) {
                            b.isPreVerifyOk = 0
                        }, B.fail = function (e) {
                            B._fail ? B._fail(e) : N.state = -1
                        };
                        var o = B._completes;
                        return o.push(function () {
                            !function (e) {
                                if (!(v || J || y.debug || C < "6.0.2" || b.systemType < 0)) {
                                    var n = new Image;
                                    b.appId = y.appId, b.initTime = k.initEndTime - k.initStartTime, b.preVerifyTime = k.preVerifyEndTime - k.preVerifyStartTime, T.getNetworkType({
                                        isInnerInvoke: !0,
                                        success: function (e) {
                                            b.networkType = e.networkType;
                                            var i = "https://open.weixin.qq.com/sdk/report?v=" + b.version + "&o=" + b.isPreVerifyOk + "&s=" + b.systemType + "&c=" + b.clientVersion + "&a=" + b.appId + "&n=" + b.networkType + "&i=" + b.initTime + "&p=" + b.preVerifyTime + "&u=" + b.url;
                                            n.src = i
                                        }
                                    })
                                }
                            }()
                        }), B.complete = function (e) {
                            for (var i = 0, n = o.length; i < n; ++i) o[i]();
                            B._completes = []
                        }, B
                    }()), k.preVerifyStartTime = l(); else {
                        N.state = 1;
                        for (var e = B._completes, i = 0, n = e.length; i < n; ++i) e[i]();
                        B._completes = []
                    }
                }), T.invoke || (T.invoke = function (e, i, n) {
                    t.AlipayJSBridge && AlipayJSBridge.invoke(e, a(i), n)
                }, T.on = function (e, i) {
                    t.AlipayJSBridge && AlipayJSBridge.on(e, i)
                })
            }, ready: function (e) {
                0 != N.state ? e() : (B._completes.push(e), !h && y.debug && e())
            }, error: function (e) {
                C < "6.0.2" || (-1 == N.state ? e(N.data) : B._fail = e)
            }, checkJsApi: function (e) {
                s("checkJsApi", {jsApiList: c(e.jsApiList)}, (e._complete = function (e) {
                    if (I) {
                        var i = e.checkResult;
                        i && (e.checkResult = JSON.parse(i))
                    }
                    e = function (e) {
                        var i = e.checkResult;
                        for (var n in i) {
                            var o = g[n];
                            o && (i[o] = i[n], delete i[n])
                        }
                        return e
                    }(e)
                }, e))
            }, onMenuShareTimeline: function (e) {
                n(w.onMenuShareTimeline, {
                    complete: function () {
                        s("shareTimeline", {
                            title: e.title || f,
                            desc: e.title || f,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            }, onMenuShareAppMessage: function (i) {
                n(w.onMenuShareAppMessage, {
                    complete: function (e) {
                        "favorite" === e.scene ? s("sendAppMessage", {
                            title: i.title || f,
                            desc: i.desc || "",
                            link: i.link || location.href,
                            img_url: i.imgUrl || "",
                            type: i.type || "link",
                            data_url: i.dataUrl || ""
                        }) : s("sendAppMessage", {
                            title: i.title || f,
                            desc: i.desc || "",
                            link: i.link || location.href,
                            img_url: i.imgUrl || "",
                            type: i.type || "link",
                            data_url: i.dataUrl || ""
                        }, i)
                    }
                }, i)
            }, onMenuShareQQ: function (e) {
                n(w.onMenuShareQQ, {
                    complete: function () {
                        s("shareQQ", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareWeibo: function (e) {
                n(w.onMenuShareWeibo, {
                    complete: function () {
                        s("shareWeiboApp", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareQZone: function (e) {
                n(w.onMenuShareQZone, {
                    complete: function () {
                        s("shareQZone", {
                            title: e.title || f,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, updateTimelineShareData: function (e) {
                s("updateTimelineShareData", {title: e.title, link: e.link, imgUrl: e.imgUrl}, e)
            }, updateAppMessageShareData: function (e) {
                s("updateAppMessageShareData", {title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl}, e)
            }, startRecord: function (e) {
                s("startRecord", {}, e)
            }, stopRecord: function (e) {
                s("stopRecord", {}, e)
            }, onVoiceRecordEnd: function (e) {
                n("onVoiceRecordEnd", e)
            }, playVoice: function (e) {
                s("playVoice", {localId: e.localId}, e)
            }, pauseVoice: function (e) {
                s("pauseVoice", {localId: e.localId}, e)
            }, stopVoice: function (e) {
                s("stopVoice", {localId: e.localId}, e)
            }, onVoicePlayEnd: function (e) {
                n("onVoicePlayEnd", e)
            }, uploadVoice: function (e) {
                s("uploadVoice", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadVoice: function (e) {
                s("downloadVoice", {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, translateVoice: function (e) {
                s("translateVoice", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, chooseImage: function (e) {
                s("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || ["original", "compressed"],
                    sourceType: e.sourceType || ["album", "camera"]
                }, (e._complete = function (e) {
                    if (I) {
                        var i = e.localIds;
                        try {
                            i && (e.localIds = JSON.parse(i))
                        } catch (e) {
                        }
                    }
                }, e))
            }, getLocation: function (e) {
            }, previewImage: function (e) {
                s(w.previewImage, {current: e.current, urls: e.urls}, e)
            }, uploadImage: function (e) {
                s("uploadImage", {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadImage: function (e) {
                s("downloadImage", {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, getLocalImgData: function (e) {
                !1 === P ? (P = !0, s("getLocalImgData", {localId: e.localId}, (e._complete = function (e) {
                    if (P = !1, 0 < A.length) {
                        var i = A.shift();
                        wx.getLocalImgData(i)
                    }
                }, e))) : A.push(e)
            }, getNetworkType: function (e) {
                s("getNetworkType", {}, (e._complete = function (e) {
                    e = function (e) {
                        var i = e.errMsg;
                        e.errMsg = "getNetworkType:ok";
                        var n = e.subtype;
                        if (delete e.subtype, n) e.networkType = n; else {
                            var o = i.indexOf(":"), t = i.substring(o + 1);
                            switch (t) {
                                case"wifi":
                                case"edge":
                                case"wwan":
                                    e.networkType = t;
                                    break;
                                default:
                                    e.errMsg = "getNetworkType:fail"
                            }
                        }
                        return e
                    }(e)
                }, e))
            }, openLocation: function (e) {
                s("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e)
            }, getLocation: function (e) {
                s(w.getLocation, {type: (e = e || {}).type || "wgs84"}, (e._complete = function (e) {
                    delete e.type
                }, e))
            }, hideOptionMenu: function (e) {
                s("hideOptionMenu", {}, e)
            }, showOptionMenu: function (e) {
                s("showOptionMenu", {}, e)
            }, closeWindow: function (e) {
                s("closeWindow", {}, e = e || {})
            }, hideMenuItems: function (e) {
                s("hideMenuItems", {menuList: e.menuList}, e)
            }, showMenuItems: function (e) {
                s("showMenuItems", {menuList: e.menuList}, e)
            }, hideAllNonBaseMenuItem: function (e) {
                s("hideAllNonBaseMenuItem", {}, e)
            }, showAllNonBaseMenuItem: function (e) {
                s("showAllNonBaseMenuItem", {}, e)
            }, scanQRCode: function (e) {
                s("scanQRCode", {
                    needResult: (e = e || {}).needResult || 0,
                    scanType: e.scanType || ["qrCode", "barCode"]
                }, (e._complete = function (e) {
                    if (S) {
                        var i = e.resultStr;
                        if (i) {
                            var n = JSON.parse(i);
                            e.resultStr = n && n.scan_code && n.scan_code.scan_result
                        }
                    }
                }, e))
            }, openAddress: function (e) {
                s(w.openAddress, {}, (e._complete = function (e) {
                    var i;
                    (i = e).postalCode = i.addressPostalCode, delete i.addressPostalCode, i.provinceName = i.proviceFirstStageName, delete i.proviceFirstStageName, i.cityName = i.addressCitySecondStageName, delete i.addressCitySecondStageName, i.countryName = i.addressCountiesThirdStageName, delete i.addressCountiesThirdStageName, i.detailInfo = i.addressDetailInfo, delete i.addressDetailInfo, e = i
                }, e))
            }, openProductSpecificView: function (e) {
                s(w.openProductSpecificView, {pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo}, e)
            }, addCard: function (e) {
                for (var i = e.cardList, n = [], o = 0, t = i.length; o < t; ++o) {
                    var a = i[o], r = {card_id: a.cardId, card_ext: a.cardExt};
                    n.push(r)
                }
                s(w.addCard, {card_list: n}, (e._complete = function (e) {
                    var i = e.card_list;
                    if (i) {
                        for (var n = 0, o = (i = JSON.parse(i)).length; n < o; ++n) {
                            var t = i[n];
                            t.cardId = t.card_id, t.cardExt = t.card_ext, t.isSuccess = !!t.is_succ, delete t.card_id, delete t.card_ext, delete t.is_succ
                        }
                        e.cardList = i, delete e.card_list
                    }
                }, e))
            }, chooseCard: function (e) {
                s("chooseCard", {
                    app_id: y.appId,
                    location_id: e.shopId || "",
                    sign_type: e.signType || "SHA1",
                    card_id: e.cardId || "",
                    card_type: e.cardType || "",
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + "",
                    nonce_str: e.nonceStr
                }, (e._complete = function (e) {
                    e.cardList = e.choose_card_info, delete e.choose_card_info
                }, e))
            }, openCard: function (e) {
                for (var i = e.cardList, n = [], o = 0, t = i.length; o < t; ++o) {
                    var a = i[o], r = {card_id: a.cardId, code: a.code};
                    n.push(r)
                }
                s(w.openCard, {card_list: n}, e)
            }, consumeAndShareCard: function (e) {
                s(w.consumeAndShareCard, {consumedCardId: e.cardId, consumedCode: e.code}, e)
            }, chooseWXPay: function (e) {
                s(w.chooseWXPay, i(e), e)
            }, openEnterpriseRedPacket: function (e) {
                s(w.openEnterpriseRedPacket, i(e), e)
            }, startSearchBeacons: function (e) {
                s(w.startSearchBeacons, {ticket: e.ticket}, e)
            }, stopSearchBeacons: function (e) {
                s(w.stopSearchBeacons, {}, e)
            }, onSearchBeacons: function (e) {
                n(w.onSearchBeacons, e)
            }, openEnterpriseChat: function (e) {
                s("openEnterpriseChat", {useridlist: e.userIds, chatname: e.groupName}, e)
            }, launchMiniProgram: function (e) {
                s("launchMiniProgram", {
                    targetAppId: e.targetAppId, path: function (e) {
                        if ("string" == typeof e && 0 < e.length) {
                            var i = e.split("?")[0], n = e.split("?")[1];
                            return i += ".html", void 0 !== n ? i + "?" + n : i
                        }
                    }(e.path), envVersion: e.envVersion
                }, e)
            }, miniProgram: {
                navigateBack: function (e) {
                    e = e || {}, u(function () {
                        s("invokeMiniProgramAPI", {name: "navigateBack", arg: {delta: e.delta || 1}}, e)
                    })
                }, navigateTo: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "navigateTo", arg: {url: e.url}}, e)
                    })
                }, redirectTo: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "redirectTo", arg: {url: e.url}}, e)
                    })
                }, switchTab: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "switchTab", arg: {url: e.url}}, e)
                    })
                }, reLaunch: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "reLaunch", arg: {url: e.url}}, e)
                    })
                }, postMessage: function (e) {
                    u(function () {
                        s("invokeMiniProgramAPI", {name: "postMessage", arg: e.data || {}}, e)
                    })
                }, getEnv: function (e) {
                    u(function () {
                        e({miniprogram: "miniprogram" === t.__wxjs_environment})
                    })
                }
            }
        }, W = 1, V = {};
        return o.addEventListener("error", function (e) {
            if (!I) {
                var i = e.target, n = i.tagName, o = i.src;
                if (("IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n) && -1 != o.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var t = i["wx-id"];
                    if (t || (t = W++, i["wx-id"] = t), V[t]) return;
                    V[t] = !0, wx.ready(function () {
                        wx.getLocalImgData({
                            localId: o, success: function (e) {
                                i.src = e.localData
                            }
                        })
                    })
                }
            }
        }, !0), o.addEventListener("load", function (e) {
            if (!I) {
                var i = e.target, n = i.tagName;
                if (i.src, "IMG" == n || "VIDEO" == n || "AUDIO" == n || "SOURCE" == n) {
                    var o = i["wx-id"];
                    o && (V[o] = !1)
                }
            }
        }, !0), e && (t.wx = t.jWeixin = T), T
    }
    var M
});
var J2C_CONFIG = {pc: !1};

function webshowNativeToast(e, i) {
    document.getElementById("alertm") && document.body.removeChild(document.getElementById("alertm"));
    var n = document.createElement("div");
    n.setAttribute("id", "alertm"), n.style.position = "fixed", n.style.bottom = "50px", n.style.left = "0", n.style.right = "0", n.style.textAlign = "center", n.style.zIndex = "99999";
    var o = document.createElement("span");
    n.appendChild(o), o.style.display = "inline-block", o.style.padding = "5px 45px", o.style.color = "#fff", o.style.fontSize = "14px", o.style.background = "rgba(33, 33, 33, .7)", o.style.borderRadius = "5px", o.innerText = e, document.body.appendChild(n), null != i && "" != i || (i = 1500), setTimeout("document.body.removeChild(document.getElementById('alertm'))", i)
}

function webcreateNewWebPage(e) {
    webSetCurPageId(e), "string" == typeof e.param ? localStorage.setItem("webCreateNewPage", e.param) : "object" == typeof e.param && localStorage.setItem("webCreateNewPage", JSON.stringify(e.param)), location.href = e.url
}

function webfetchParam() {
    var e = localStorage.getItem("webCreateNewPage");
    null != e && "" != e && (-1 != e.indexOf("{") || -1 != e.indexOf("[") ? J2C.onFetchParamSuccessed(JSON.parse(e)) : J2C.onFetchParamSuccessed(e))
}

function webrequestNet(e, i, n, o, t, a, r, s, c) {
    r({method: i, url: e, params: n, data: o, headers: t}).then(function (e) {
        getCloseLoad(), updResponse(e), a.resolve(e)
    }, function (e) {
        getCloseLoad(10), updResponse(e), 404 == e.status ? dialogMsg(e.data.detail) : dialogMsg(e.data.infomessage), a.reject(e)
    })
}

function websaveNativeStorage(e, i) {
    localStorage.setItem(e, i)
}

function webgetNativeStorage(e, i) {
    J2C.onGetNativeStorageSuccessed(localStorage.getItem(e))
}

function webSetCurPageId(e) {
    if ("" == localStorage.getItem("curPageList") || null == localStorage.getItem("curPageList")) var i = []; else i = JSON.parse(localStorage.getItem("curPageList"));
    i.push(e), localStorage.setItem("curPageList", JSON.stringify(i))
}

function backBtnAction(e) {
    window.history.pushState({title: "title", url: "#"}, "title", "#"), window.addEventListener("popstate", e, !1)
}

function webBackToPage(e) {
    var i = !1;
    if ("" == localStorage.getItem("curPageList") || null == localStorage.getItem("curPageList")) var n = []; else {
        n = JSON.parse(localStorage.getItem("curPageList"));
        for (var o = 0; o < n.length; o++) {
            if (e.toPageId == n[0].pageId) {
                localStorage.removeItem("curPageList"), location.href = n[0].url, i = !0;
                break
            }
            if (e.toPageId == n[o].pageId && e.toPageId != n[0].pageId) {
                location.href = n[o].url, i = !0;
                break
            }
            if ("" == e.toPageId || null == e.toPageId) {
                i = !0, history.go(-1);
                break
            }
        }
    }
    i || history.go(-1)
}

function getViewPdf(e, i) {
    console.log(i);
    var n = {pageId: "pdf"};
    n.url = global_config.ahrefUrl + "pdfView/pdf.html", "PC" == i ? e.url = e.url + e.weixin || "" : "WECHAT" == i && (e.url = e.url + e.weixin || ""), n.param = e, console.log(n), J2C.createNewWebPage(n)
}

function registerBroadcastPWA(e, i) {
    if ("" == localStorage.getItem("curPageList") || null == localStorage.getItem("curPageList")) {
        var n = [];
        webSetCurPageId({pageId: "root", url: window.location.href})
    }
    for (curpage in n = JSON.parse(localStorage.getItem("curPageList"))) if (n[curpage].url == window.location.href) {
        if (isEmpty(n[curpage][e])) {
            J2C.onBroadcastInvoked(i, n[curpage][e]);
            break
        }
        n[curpage][e] = e, localStorage.setItem("curPageList", JSON.stringify(n))
    }
}

function sendBroadcastPWA(e, i) {
    for (curpage in curPageList = JSON.parse(localStorage.getItem("curPageList")), curPageList) if (isEmpty(curPageList[curpage][e])) for (key in curPageList[curpage]) console.log(key), key == e && (console.log("监听到了"), curPageList[curpage][e] = i, localStorage.setItem("curPageList", JSON.stringify(curPageList)))
}

function getLogInHistoryPWA(e) {
    var n = [],
        o = isEmpty(localStorage.getItem("accountIdList")) ? JSON.parse(localStorage.getItem("accountIdList")) : [];
    if (0 < o.length) for (i in o) if ("PublicAccount" != o[i]) {
        var t = {userName: o[i]};
        n.push(t)
    }
    var a = {serialNum: e, obj: n};
    J2C.onGetLogInHistory(a)
}

function getLogInAccountIdPWA(e) {
    var n = [],
        o = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    if (0 < o.length) {
        for (i in o) if (n.push(!!o[i].loginTrue), o[i].loginTrue) {
            var t = {accountId: o[i].accountId, serialNum: e};
            J2C.ongetLogInAccountId(t)
        }
        if (n.indexOf(!0) < 0) {
            t = {accountId: "PublicAccount", serialNum: e};
            J2C.ongetLogInAccountId(t)
        }
    } else {
        t = {accountId: "PublicAccount", serialNum: e};
        J2C.ongetLogInAccountId(t)
    }
}

function chooseAccountPWA(e) {
    var n = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    if (0 < n.length) for (i in n) if (n[i].loginTrue = !1, n[i].accountId == e) {
        n[i].loginTrue = !0;
        var o = n[i], t = n[i];
        spliceList(o, n), n.splice(0, 0, t)
    } else if ("PublicAccount" == e) {
        n.push({accountId: "PublicAccount", loginTrue: !0})
    }
    localStorage.setItem("loginHistoryList", JSON.stringify(n)), sendBroadcastPWA("UserAccountChangedMessage", {param: e}), console.log(n)
}

function logInOutPWA() {
    var e = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    console.log(e), chooseAccountPWA("PublicAccount"), J2C.getLogInAccountId()
}

function saveAccountInfoPWA(e, i, n, o) {
    var t = {accountId: e, token: i, refreshToken: n, userName: o};
    saveUserInfoPWA(e, "accountInfo", JSON.stringify(t))
}

function saveUserInfoPWA(e, n, o) {
    var t = isEmpty(localStorage.getItem("accountIdList")) ? JSON.parse(localStorage.getItem("accountIdList")) : [],
        a = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    if (0 < a.length && 0 <= t.indexOf(e)) {
        for (i in a) if (a[i].accountId == e) {
            a[i][n] = o;
            break
        }
    } else {
        var r = {accountId: e};
        r[n] = o, a.push(r), t.push(e)
    }
    localStorage.setItem("loginHistoryList", JSON.stringify(a)), localStorage.setItem("accountIdList", JSON.stringify(t))
}

function getAccountInfoPWA(e, n) {
    var o = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    if (0 < o.length) for (i in o) if (o[i].accountId == e) {
        var t = {
            accountId: e,
            userName: e,
            serialNum: n,
            token: JSON.parse(o[i].accountInfo).token,
            refreshToken: JSON.parse(o[i].accountInfo).refreshToken
        };
        J2C.onGetAccountInfo(t)
    }
}

function getUserInfoPWA(e, n, o) {
    var t = isEmpty(localStorage.getItem("loginHistoryList")) ? JSON.parse(localStorage.getItem("loginHistoryList")) : [];
    if (0 < t.length) {
        for (i in t) if (t[i].accountId == e) {
            var a = {serialNum: o, val: t[i][n]};
            J2C.ongetUserInfo(a)
        }
    } else {
        a = {serialNum: o, val: ""};
        J2C.ongetUserInfo(a)
    }
}

function webBackToPageWechart(e) {
    var i = !1;
    if ("" == localStorage.getItem("curPageList") || null == localStorage.getItem("curPageList")) var n = []; else {
        n = JSON.parse(localStorage.getItem("curPageList"));
        for (var o = 0; o < n.length; o++) {
            if (e.toPageId == n[0].pageId) {
                localStorage.removeItem("curPageList"), location.href = n[0].url, i = !0;
                break
            }
            if (e.toPageId == n[o].pageId && e.toPageId != n[0].pageId) {
                location.href = n[o].url, i = !0;
                break
            }
            if ("" == e.toPageId || null == e.toPageId) {
                i = !0, history.go(-1);
                break
            }
        }
    }
    i || WeixinJSBridge.call("closeWindow")
}

function webBackToPageAlipay(e) {
    var i = !1;
    if ("" == localStorage.getItem("curPageList") || null == localStorage.getItem("curPageList")) var n = []; else {
        n = JSON.parse(localStorage.getItem("curPageList"));
        for (var o = 0; o < n.length; o++) {
            if (e.toPageId == n[0].pageId) {
                localStorage.removeItem("curPageList"), location.href = n[0].url, i = !0;
                break
            }
            if (e.toPageId == n[o].pageId && e.toPageId != n[0].pageId) {
                location.href = n[o].url, i = !0;
                break
            }
            if ("" == e.toPageId || null == e.toPageId) {
                i = !0, history.go(-1);
                break
            }
        }
    }
    i || AlipayJSBridge.call("closeWebview")
}

!function () {
    null == window.J2C && (window.J2C = {}), j2cReadyCallback = function (e) {
        alert("J2C环境准备好了，喊你回家吃饭")
    };
    var i = new function (e) {
    };
    var n = new function (e) {
    };
    var o = new function (e) {
    };
    var I = [];
    var t = new function (e) {
    };

    function S() {
        for (var e = [], i = "0123456789abcdef", n = 0; n < 36; n++) e[n] = i.substr(Math.floor(16 * Math.random()), 1);
        return e[14] = "4", e[19] = i.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
    }

    var a = new function (e) {
    };
    var r = new function (e) {
    };
    window.J2C.registerJ2CReadyCallback = function (e) {
        if (window.iosdkqgqc) setTimeout(function () {
            e("j2c_ready")
        }, 10); else if (window.WebViewJ2CJavascriptBridge) setTimeout(function () {
            e("j2c_ready")
        }, 10); else if (J2C_CONFIG.pc) setTimeout(function () {
            e("j2c_ready")
        }, 10); else {
            j2cReadyCallback = e;
            var i = document;
            i.addEventListener("WebViewJ2CJavascriptBridgeReady", j2cReadyCallback, !1), i.addEventListener("WeixinJSBridgeReady", j2cReadyCallback, !1), i.addEventListener("AlipayJSBridgeReady", j2cReadyCallback, !1)
        }
    }, window.J2C.replaceBackBtnAction = function (e) {
        i = e, window.iosdkqgqc ? window.webkit.messageHandlers.replaceBackBtnAction.postMessage(1) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.replaceBackBtnAction", {}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, backBtnAction(e))
    }, window.J2C.onCustomBackAction = function (e) {
        i(e)
    }, window.J2C.createNewWebPage = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.createNewWebPage.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.createNewWebPage", e, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, webcreateNewWebPage(e))
    }, window.J2C.setCurPageId = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.setCurPageId.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.setCurPageId", e, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, webSetCurPageId(e))
    }, window.J2C.fetchParam = function (e) {
        n = e, window.iosdkqgqc ? window.webkit.messageHandlers.fetchParam.postMessage(1) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.fetchParam", {}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, webfetchParam())
    }, window.J2C.onFetchParamSuccessed = function (e) {
        n(e)
    }, window.J2C.registerReceiver = function (e) {
        o = e
    }, window.J2C.onReceiverResult = function (e) {
        o(e)
    }, window.J2C.sendResultToOtherPage = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.sendResultToOtherPage.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.sendResultToOtherPage", e, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.sendRequest = function (e, i, n, o, t, a, r, s, c) {
        var d, l, u, w, g, f, p, m, v, J = S(), h = {};
        h.serialNum = J, h.callback = c, I.push(h), d = J, l = e, u = i, w = n, g = o, f = t, p = a, m = r, v = s, window.iosdkqgqc ? window.webkit.messageHandlers.requestNet.postMessage({
            serialNum: d,
            requestQueries: w,
            requestUrl: l,
            requestMethod: u,
            requestBody: g,
            requestHeaders: f
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.requestNet", {
            serialNum: d,
            requestUrl: l,
            requestMethod: u,
            requestQueries: w,
            requestHeaders: f,
            requestBody: g
        }, function (e) {
        }) : window.WeixinJSBridge ? webrequestNet(l, u, w, g, f, p, m, v, "微信成功") : window.AlipayJSBridge ? webrequestNet(l, u, w, g, f, p, m, v, "支付宝成功") : webrequestNet(l, u, w, g, f, p, m, v, "pc成功")
    }, window.J2C.onRequestNetSuccessed = function (e, i, n, o) {
        for (x in I) {
            var t = I[x].serialNum, a = I[x].callback;
            if (t == e) return void a(i, n, o)
        }
    }, window.J2C.registerTitleBarFunctionCallback = function (e) {
        t = e
    }, window.J2C.onTitleBarFunctionInvoked = function (e) {
        t(e)
    }, window.J2C.showNativeToast = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.showToast.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.showToast", {param: e}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, webshowNativeToast(e))
    }, window.J2C.saveNativeStorage = function (e, i) {
        window.iosdkqgqc ? window.webkit.messageHandlers.saveNativeStorage.postMessage({
            key: e,
            val: i
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.saveNativeStorage", {
            key: e,
            val: i
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, websaveNativeStorage(e, i))
    }, window.J2C.getNativeStorage = function (e, i) {
        var n = S(), o = {};
        o.serialNum = n, o.callback = i, I.push(o), window.iosdkqgqc ? window.webkit.messageHandlers.getNativeStorage.postMessage({
            key: e,
            serialNum: n
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.getNativeStorage", {
            key: e,
            serialNum: n
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, webgetNativeStorage(e))
    }, window.J2C.onGetNativeStorageSuccessed = function (e) {
        var i = e.val, n = e.serialNum;
        for (x in I) {
            var o = I[x].serialNum, t = I[x].callback;
            if (o == n) return void(t && t(i))
        }
    }, window.J2C.pickPhotos = function (e, i) {
        null != i && (a = i), window.iosdkqgqc ? window.webkit.messageHandlers.pickPhotos.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.pickPhotos", e, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.onPickPhotosSuccessed = function (e) {
        a(e)
    }, window.J2C.backToPage = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.backToPage.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.backToPage", e, function (e) {
        }) : window.WeixinJSBridge ? webBackToPageWechart(e) : window.AlipayJSBridge ? webBackToPageAlipay(e) : webBackToPage(e)
    }, window.J2C.openInBrowser = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.openInBrowser.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.openInBrowser", e, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.buildTitleButtonGroup = function (e, i) {
        null != i && (r = i), window.iosdkqgqc ? window.webkit.messageHandlers.buildTitleButtonGroup.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.buildTitleButtonGroup", e, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.onBuildTitleButtonGroupSuccessed = function (e) {
        r(e)
    }, window.J2C.registerBroadcast = function (e, i) {
        var n = S(), o = {};
        o.serialNum = n, o.callback = i, I.push(o);
        var t = {};
        t.feature = e, t.serialNum = n, window.iosdkqgqc ? window.webkit.messageHandlers.registerBroadcast.postMessage({body: t}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.registerBroadcast", t, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.onBroadcastInvoked = function (e, i) {
        for (x in I) {
            var n = I[x].serialNum, o = I[x].callback;
            if (n == e) return void o(i)
        }
    }, window.J2C.sendBroadcast = function (e, i) {
        var n = {};
        n.feature = e, n.obj = i, window.iosdkqgqc ? window.webkit.messageHandlers.sendBroadcast.postMessage({body: n}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.sendBroadcast", n, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }
}(), function () {
    function s() {
        for (var e = [], i = "0123456789abcdef", n = 0; n < 36; n++) e[n] = i.substr(Math.floor(16 * Math.random()), 1);
        return e[14] = "4", e[19] = i.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
    }

    null == window.J2C && (window.J2C = {});
    var c = [];
    getToken4NanNingBack = function (e) {
        window.localStorage.setItem("token", e)
    }, isLoginback = function (e) {
    }, isPensionCertificationback = function (e) {
    }, isInjuryCertificationback = function (e) {
    };
    var o = function (e) {
    };
    var n = new function (e) {
    };
    var t = new function (e) {
    };
    var a = function (e) {
    };
    var i = function (e) {
    };
    var r = function (e) {
    };
    var d = function (e) {
    };
    var l = new function (e) {
    }, u = new function (e) {
    };
    window.J2C.requestGetToken4NanNing = function (e) {
        getToken4NanNingBack = e, window.iosdkqgqc ? window.webkit.messageHandlers.requestGetToken4Nanning.postMessage(1) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.requestGetToken4Nanning", {param: "测试"}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, getUserInfowechat())
    }, window.J2C.onGetTokenSuccessed4NanNing = function (e) {
        getToken4NanNingBack(e)
    }, window.J2C.requestISLogin = function (e) {
        if (isLoginback = e, window.iosdkqgqc) window.webkit.requestISLogin(); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.requestISLogin", {}, function (e) {
            })
        }
    }, window.J2C.requestISLoginSuccessed = function (e) {
        isLoginback(e)
    }, window.J2C.requestPensionCertification = function (e, i, n) {
        if (isPensionCertificationback = n, window.iosdkqgqc) window.webkit.messageHandlers.requestPensionCertification.postMessage({
            idNumber: e,
            name: i
        }); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.requestPensionCertification", {
                idNumber: e,
                name: i
            }, function (e) {
            })
        }
    }, window.J2C.requestPensionCertificationSuccessed = function (e) {
        isPensionCertificationback(e)
    }, window.J2C.requestInjuryCertification = function (e, i, n) {
        if (isInjuryCertificationback = n, window.iosdkqgqc) window.webkit.messageHandlers.requestInjuryCertification.postMessage({
            idNumber: e,
            name: i
        }); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.requestInjuryCertification", {
                idNumber: e,
                name: i
            }, function (e) {
            })
        }
    }, window.J2C.requestInjuryCertificationSuccessed = function (e) {
        isInjuryCertificationback(e)
    }, window.J2C.requestSurvival = function (e, i, n) {
        if (o = n, window.iosdkqgqc) window.webkit.messageHandlers.requestSurvival.postMessage({
            idNumber: e,
            name: i
        }); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.requestSurvival", {
                idNumber: e,
                name: i
            }, function (e) {
            })
        }
    }, window.J2C.onrequestSurvivalSuccessed = function (e) {
        o(e)
    }, window.J2C.viewPdf = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.viewPdf.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.viewPdf", e, function (e) {
        }) : window.WeixinJSBridge ? getViewPdf(e, "WECHAT") : window.AlipayJSBridge ? getViewPdf(e, "ALIPAY") : getViewPdf(e, "PC")
    }, window.J2C.scanFace = function (e, i) {
        null != i && (n = i), window.iosdkqgqc ? window.webkit.messageHandlers.scanFace.postMessage({body: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.scanFace", e, function (e) {
        }) : window.WeixinJSBridge || window.AlipayJSBridge
    }, window.J2C.onScanFaceSuccessed = function (e) {
        n(e)
    }, window.J2C.startQRCode = function (e, i) {
        if (t = i, window.iosdkqgqc) window.webkit.messageHandlers.startQRCode.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.startQRCode", e, function (e) {
            })
        }
    }, window.J2C.onstartQRCodeSuccessed = function (e) {
        t(e)
    }, window.J2C.startXunfeiYuYin = function (e, i) {
        if (null != i && (a = i), window.iosdkqgqc) window.webkit.messageHandlers.startXunfeiYuYin.postMessage({body: e}); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.startXunfeiYuYin", e, function (e) {
            })
        }
    }, window.J2C.onstartXunfeiYuYined = function (e) {
        a(e)
    }, window.J2C.endXunfeiYuYin = function (e) {
        if (i = e, window.iosdkqgqc) window.webkit.messageHandlers.endXunfeiYuYin.postMessage(1); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.endXunfeiYuYin", {}, function (e) {
            })
        }
    }, window.J2C.onendXunfeiYuYined = function (e) {
        i(e)
    }, window.J2C.cancelXunfeiYuYin = function (e) {
        if (r = e, window.iosdkqgqc) window.webkit.messageHandlers.cancelXunfeiYuYin.postMessage(1); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.cancelXunfeiYuYin", {}, function (e) {
            })
        }
    }, window.J2C.oncancelXunfeiYuYined = function (e) {
        r(e)
    }, window.J2C.startBaiduYuYin = function (e, i) {
        if (null != i && (d = i), window.iosdkqgqc) window.webkit.messageHandlers.startBaiduYuYin.postMessage({body: e}); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.startBaiduYuYin", e, function (e) {
            })
        }
    }, window.J2C.onstartBaiduYuYined = function (e) {
        d(e)
    }, window.J2C.endBaiduYuYin = function () {
        if (window.iosdkqgqc) window.webkit.messageHandlers.endBaiduYuYin.postMessage(1); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.endBaiduYuYin", {}, function (e) {
            })
        }
    }, window.J2C.getLogInHistory = function (e) {
        var i = s(), n = {};
        n.serialNum = i, n.callback = e, c.push(n), window.iosdkqgqc ? window.webkit.messageHandlers.getLogInHistory.postMessage({serialNum: i}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.getLogInHistory", {serialNum: i}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, getLogInHistoryPWA(i))
    }, window.J2C.onGetLogInHistory = function (e) {
        var i = e.serialNum, n = e.obj;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.getLogInAccountId = function (e) {
        var i = s(), n = {};
        n.serialNum = i, n.callback = e, c.push(n), window.iosdkqgqc ? window.webkit.messageHandlers.getLogInAccountId.postMessage({serialNum: i}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.getLogInAccountId", {serialNum: i}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, getLogInAccountIdPWA(i))
    }, window.J2C.ongetLogInAccountId = function (e) {
        var i = e.accountId, n = e.serialNum;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == n) return void(t && t(i))
        }
    }, window.J2C.chooseAccount = function (e) {
        window.iosdkqgqc ? window.webkit.messageHandlers.chooseAccount.postMessage({accountId: e}) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.chooseAccount", {accountId: e}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, chooseAccountPWA(e))
    }, window.J2C.logInOut = function () {
        window.iosdkqgqc ? window.webkit.messageHandlers.logInOut.postMessage(1) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.logInOut", {}, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, logInOutPWA())
    }, window.J2C.saveAccountInfo = function (e, i, n, o) {
        if (!(e && i && n && o)) throw new Error("saveAccountInfo 参数字段不全");
        window.iosdkqgqc ? window.webkit.messageHandlers.saveAccountInfo.postMessage({
            accountId: e,
            token: i,
            refreshToken: n,
            userName: o
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.saveAccountInfo", {
            accountId: e,
            token: i,
            refreshToken: n,
            userName: o
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, saveAccountInfoPWA(e, i, n, o))
    }, window.J2C.saveUserInfo = function (e, i, n) {
        if (!e || !i || !n) throw new Error("saveAccountInfo 参数字段不全");
        window.iosdkqgqc ? window.webkit.messageHandlers.saveUserInfo.postMessage({
            accountId: e,
            key: i,
            val: n
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.saveUserInfo", {
            accountId: e,
            key: i,
            val: n
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, saveUserInfoPWA(e, i, n))
    }, window.J2C.getAccountInfo = function (e, i) {
        var n = s(), o = {};
        o.serialNum = n, o.callback = i, c.push(o), window.iosdkqgqc ? window.webkit.messageHandlers.getAccountInfo.postMessage({
            serialNum: n,
            accountId: e
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.getAccountInfo", {
            serialNum: n,
            accountId: e
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, getAccountInfoPWA(e, n))
    }, window.J2C.onGetAccountInfo = function (e) {
        var i = e.accountId, n = e.serialNum,
            o = {accountId: i, token: e.token, refreshToken: e.refreshToken, userName: e.userName};
        for (x in c) {
            var t = c[x].serialNum, a = c[x].callback;
            if (t == n) return void(a && a(o))
        }
    }, window.J2C.getUserInfo = function (e, i, n) {
        var o = s(), t = {};
        t.serialNum = o, t.callback = n, c.push(t), window.iosdkqgqc ? window.webkit.messageHandlers.getUserInfo.postMessage({
            key: i,
            serialNum: o,
            accountId: e
        }) : window.WebViewJ2CJavascriptBridge ? window.WebViewJ2CJavascriptBridge.callHandler("Native.getUserInfo", {
            key: i,
            serialNum: o,
            accountId: e
        }, function (e) {
        }) : (window.WeixinJSBridge || window.AlipayJSBridge, getUserInfoPWA(e, i, o))
    }, window.J2C.ongetUserInfo = function (e) {
        var i = e.serialNum, n = e.val;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.yunupdate = function () {
        var e = {msg: "no_used"};
        if (window.iosdkqgqc) alert("iOS do not allow to do this!"); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.yunupdate", e, function (e) {
            })
        }
    }, window.J2C.openLiveness = function (e, i, n) {
        var o = s(), t = s(), a = {};
        a.serialNum = o, a.callback = i, c.push(a);
        var r = {};
        if (r.serialNum = t, r.callback = n, c.push(r), e.serialNumOnShow = o, e.serialNumOnComplete = t, window.iosdkqgqc) window.webkit.messageHandlers.openLiveness.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.openLiveness", e, function (e) {
            })
        }
    }, window.J2C.onShowOpenLiveness = function (e) {
        var i = e.serialNum;
        for (x in c) {
            var n = c[x].serialNum, o = c[x].callback;
            if (n == i) return void(o && o())
        }
    }, window.J2C.onCompleteOpenLiveness = function (e) {
        var i = e.serialNum, n = e.val;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.openOcr = function (e, i, n) {
        var o = s(), t = s(), a = {};
        a.serialNum = o, a.callback = i, c.push(a);
        var r = {};
        if (r.serialNum = t, r.callback = n, c.push(r), e.serialNumOnShow = o, e.serialNumOnComplete = t, window.iosdkqgqc) window.webkit.messageHandlers.openOcr.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.openOcr", e, function (e) {
            })
        }
    }, window.J2C.onShowOpenOcr = function (e) {
        var i = e.serialNum;
        for (x in c) {
            var n = c[x].serialNum, o = c[x].callback;
            if (n == i) return void(o && o())
        }
    }, window.J2C.onCompleteOpenOcr = function (e) {
        var i = e.serialNum, n = e.val;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.loginNeteaseim = function (e, i) {
        var n = s(), o = {};
        if (o.serialNum = n, o.callback = i, c.push(o), e.serialNumOnComplete = n, window.iosdkqgqc) window.webkit.messageHandlers.loginNeteaseim.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.loginNeteaseim", e, function (e) {
            })
        }
    }, window.J2C.onCompleteLoginNeteaseim = function (e) {
        var i = e.serialNum, n = e.val;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.videoCallNeteaseim = function (e, i) {
        if (window.iosdkqgqc) window.webkit.messageHandlers.videoCallNeteaseim.postMessage({
            towho: e,
            extendMessage: i
        }); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.videoCallNeteaseim", {
                towho: e,
                extendMessage: i
            }, function (e) {
            })
        }
    }, window.J2C.startIbeaconbc = function (e, i) {
        var n = s(), o = {};
        if (o.serialNum = n, o.callback = i, c.push(o), e.serialNumOnComplete = n, window.iosdkqgqc) window.webkit.messageHandlers.startIbeaconbc.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.startIbeaconbc", e, function (e) {
            })
        }
    }, window.J2C.onCompleteStartIbeaconbc = function (e) {
        var i = e.serialNum, n = e.val;
        for (x in c) {
            var o = c[x].serialNum, t = c[x].callback;
            if (o == i) return void(t && t(n))
        }
    }, window.J2C.stopIbeaconbc = function () {
        if (window.iosdkqgqc) window.webkit.messageHandlers.stopIbeaconbc.postMessage(1); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.stopIbeaconbc", {}, function (e) {
            })
        }
    }, window.J2C.openEssc = function (e, i, n) {
        if (l = i, u = n, window.iosdkqgqc) window.webkit.messageHandlers.openEssc.postMessage(e); else {
            if (!window.WebViewJ2CJavascriptBridge) throw new Error("J2C env init error");
            window.WebViewJ2CJavascriptBridge.callHandler("Native.openEssc", e, function (e) {
            })
        }
    }, window.J2C.onEsscResult = function (e) {
        l(e)
    }, window.J2C.onEsscSceneResult = function (e) {
        u(e)
    }
}();