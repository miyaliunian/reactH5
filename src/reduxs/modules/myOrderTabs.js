/**
 * 我的订单的tab
 */
import {cityID, MYORDERTABKAY} from "@api/Constant";
import URL from '@api/httpUrl'
import {post} from "@api/httpUtil";
import {Toast} from "antd-mobile";

let tabs = {};
tabs[MYORDERTABKAY.register] = {
    key: MYORDERTABKAY.register,
    text: "线上挂号",
    obj: {}
};
tabs[MYORDERTABKAY.outpatientPayment] = {
    key: MYORDERTABKAY.outpatientPayment,
    text: "门诊缴费",
    obj: {}
};

const initialState = {
    headerTabs: tabs,
    actionKey: MYORDERTABKAY.register,
    registerList: [],
    outpatientList: [],
    isFetching: false,
    isRegisterLastPage: false,
    isOutpatientLastPage: false,
    registerPageno: 0,
    outpatientPageno: 0
};

// action types
const actionTypes = {
    CHANGE_TAB_DOCTOR: "CHANGE_TAB_DOCTOR",
    INIT_TAB_DOCTOR: "INIT_TAB_DOCTOR",
    CHANGE_FILTER_DOCTOR: "CHANGE_FILTER_DOCTOR",

    FETCH_REGISTER_BY_PAGE_REQUEST: 'MYORDER/FETCH_REGISTER_BY_PAGE_REQUEST',
    FETCH_REGISTER_BY_PAGE_SUCCESS: 'MYORDER/FETCH_REGISTER_BY_PAGE_SUCCESS',
    FETCH_REGISTER_BY_PAGE_FAILURE: 'MYORDER/FETCH_REGISTER_BY_PAGE_FAILURE',

    FETCH_OUTPATIENT_BY_PAGE_REQUEST: 'MYORDER/FETCH_OUTPATIENT_BY_PAGE_REQUEST',
    FETCH_OUTPATIENT_BY_PAGE_SUCCESS: 'MYORDER/FETCH_OUTPATIENT_BY_PAGE_SUCCESS',
    FETCH_OUTPATIENT_BY_PAGE_FAILURE: 'MYORDER/FETCH_OUTPATIENT_BY_PAGE_FAILURE',

    LOAD_MORE_REGISTER_SUCCESS: 'MYORDER/LOAD_MORE_REGISTER_SUCCESS',
    LOAD_MORE_OUTPATIENT_SUCCESS: 'MYORDER/LOAD_MORE_OUTPATIENT_SUCCESS',

    RESET_PAGE_DATA: 'MYORDER/RESET_PAGE_DATA',
    RESET_REGISTER_DATA: 'MYORDER/RESET_REGISTER_DATA',
    RESET_OUTPATIENT_DATA: 'MYORDER/RESET_OUTPATIENT_DATA',

    CANCEL_REGISTEATION_SUCCESS: 'MYORDER/CANCEL_REGISTEATION_SUCCESS'
};

// action creators
export const actions = {

    //切换tab
    changeTab: (key, i) => {
        console.log('key');
        console.log(key);
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.CHANGE_TAB_DOCTOR, actionKey: key});
            i()
        };
    },

    //初始化tab选中
    iniActionKey: () => {
        return (dispatch, getstate) => {
            dispatch({type: actionTypes.INIT_TAB_DOCTOR});
        }
    },

    loadRegisterByPage: (pageno) => {
        return (dispatch, getstate) => {
            if (!pageno)
                pageno = 1
            const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(pageno)
            dispatch(loadRegisterByPageRequest())
            return post(targetURL).then(data => {
                console.log("123456789")
                console.group(data)
                if (data && data.infocode) {
                    dispatch(loadRegisterByPageSuccess(data.data))
                }
            })
        }
    },
    /**
     * 取消线上挂号
     */
    cancelRegistration: (regId) => {
        console.log('myOrderTabs cancelRegistration')
        console.log('regId: ' + regId)
        return (dispatch, getstate) => {
            const targetURL = URL.AIP_ORDER_CANCEL_REG(regId)
            dispatch(loadRegisterByPageRequest())
            return post(targetURL)
                .then(data => {
                    console.log('myOrderTabs cancelRegistration data: ')
                    console.group(data)
                    if (data.infocode && data.infocode == 1) {

                        const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(1)
                        dispatch(loadRegisterByPageRequest())
                        return post(targetURL).then(data => {
                            console.log("myOrderTabs cancelRegistration loadRegisterByPageRequest")
                            console.group(data)
                            if (data && data.infocode) {
                                dispatch(loadRegisterByPageSuccess(data.data))
                            }
                        })
                        //取消成功之后 重新刷新订单列表
                    } else {
                        // dispatch({type: Types.FETCH_FAILURE})
                        // DeviceEventEmitter.emit(ToastResultType.TOAST_NAME, data.infomessage, ToastResultType.FAIL);
                    }
                })
                .catch(err => {
                    dispatch({type: actionTypes.CANCEL_REGISTER_FAILURE})
                    // isEventEmitter(err)
                })
        }
    },

    loadOutpatientByPage: (pageno) => {
        return (dispatch, getstate) => {
            if (!pageno)
                pageno = 1
            const targetURL = URL.API_QUERY_BALANCEINFO_IN_MY_ORDER(pageno)
            dispatch(loadOutpatientByPageRequest())
            return post(targetURL).then(data => {
                console.log("123456789")
                console.group(data)
                if (data && data.infocode) {
                    dispatch(loadOutpatientByPageSuccess(data.data))
                }
            })
        }
    },


    /**
     *  上拉加载更多门诊缴费
     * @returns {function(*=, *): Promise<any>}
     */
    pullUpLoadMoreOutpatient: () => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_QUERY_BALANCEINFO_IN_MY_ORDER(getstate().myOrderTabs.outpatientPageno)
            return new Promise((resolve, reject) => {
                return post(targetURL)
                    .then(response => {
                        dispatch({type: actionTypes.LOAD_MORE_OUTPATIENT_SUCCESS, response: response})
                        resolve()
                    })
                    .catch(err => {
                        Toast.info(err.message)
                        reject()
                    })
            })
        }
    },


    /**
     *  上拉加载更多预约挂号
     * @returns {function(*=, *): Promise<any>}
     */
    pullUpLoadMoreRegister: () => {
        return (dispatch, getstate) => {
            const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(getstate().myOrderTabs.registerPageno)
            return new Promise((resolve, reject) => {
                return post(targetURL)
                    .then(response => {
                        dispatch({type: actionTypes.LOAD_MORE_REGISTER_SUCCESS, response: response})
                        resolve()
                    })
                    .catch(err => {
                        Toast.info(err.message)
                        reject()
                    })
            })
        }
    },
    /**
     * 下拉刷新预约注册页面。根据常州人社app逻辑，将页面pageno置为1后，重新加载第一页
     */
    pullDownFreshRegister: () => {
        return (dispatch, getstate) => {
            dispatch(resetData());
            const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(1)
            return new Promise((resolve, reject) => {
                return post(targetURL)
                    .then(response => {
                        dispatch({type: actionTypes.LOAD_MORE_REGISTER_SUCCESS, response: response})
                        resolve()
                    })
                    .catch(err => {
                        Toast.info(err.message)
                        reject()
                    })
            })
        }
    },
    /**
     * 下拉刷新门诊缴费页面。根据常州人社app逻辑，将页面pageno置为1后，重新加载第一页
     */
    pullDownFreshOutpatient: () => {
        return (dispatch, getstate) => {
            dispatch(resetData());
            const targetURL = URL.API_QUERY_BALANCEINFO_IN_MY_ORDER(1)
            return new Promise((resolve, reject) => {
                return post(targetURL)
                    .then(response => {
                        dispatch({type: actionTypes.LOAD_MORE_OUTPATIENT_SUCCESS, response: response})
                        resolve()
                    })
                    .catch(err => {
                        Toast.info(err.message)
                        reject()
                    })
            })
        }
    },


    //清空
    resetData: () => ({
        type: actionTypes.RESET_PAGE_DATA
    }),
    resetRegisterData: () => ({
        type: actionTypes.RESET_REGISTER_DATA
    }),
    resetOutpatientData: () => ({
        type: actionTypes.RESET_OUTPATIENT_DATA
    }),
};
//
// function loadRegisterByPageNo(pageno) {
//     if (!pageno)
//         pageno = 1
//     const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(pageno)
//     return post(targetURL).then(data => {
//         console.log("123456789")
//         console.group(data)
//         if (data && data.infocode) {
//             return data.data.list;
//         }
//     })
// }
// function loadOutpatientByPage(pageno){
//     if (!pageno)
//         pageno = 1
//     const targetURL = URL.API_QUERY_BALANCEINFO_IN_MY_ORDER(pageno)
//     return post(targetURL).then(data => {
//         console.log("987654321")
//         console.group(data)
//         if (data && data.infocode) {
//             return data.data.list;
//         }
//     })
// }


const loadRegisterByPageRequest = () => ({
    type: actionTypes.FETCH_REGISTER_BY_PAGE_REQUEST
})

const loadRegisterByPageSuccess = (data) => ({
    type: actionTypes.FETCH_REGISTER_BY_PAGE_SUCCESS,
    data
})

const loadOutpatientByPageRequest = () => ({
    type: actionTypes.FETCH_OUTPATIENT_BY_PAGE_REQUEST
})

const resetData = () => ({
    type: actionTypes.RESET_PAGE_DATA
})

const loadOutpatientByPageSuccess = (data) => ({
    type: actionTypes.FETCH_OUTPATIENT_BY_PAGE_SUCCESS,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TAB_DOCTOR:
            return {
                ...state,
                actionKey: action.actionKey,
            };
        case actionTypes.INIT_TAB_DOCTOR:
            return {
                ...state,
                actionKey: MYORDERTABKAY.register,
            };
        case actionTypes.FETCH_REGISTER_BY_PAGE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_OUTPATIENT_BY_PAGE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_REGISTER_BY_PAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registerList: action.data.list,
                isRegisterLastPage: action.data.lastPage,
                registerPageno: (action.data.pageNo += 1)
            };
        case actionTypes.FETCH_OUTPATIENT_BY_PAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                outpatientList: action.data.list,
                isOutpatientLastPage: action.data.lastPage,
                outpatientPageno: (action.data.pageNo += 1)
            };
        case actionTypes.LOAD_MORE_REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                registerList: state.registerList.concat(action.response.data.list),
                isRegisterLastPage: action.response.data.lastPage,
                registerPageno: (action.response.data.pageNo += 1)
            }
        case actionTypes.LOAD_MORE_OUTPATIENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                outpatientList: state.outpatientList.concat(action.response.data.list),
                isOutpatientLastPage: action.response.data.lastPage,
                outpatientPageno: (action.response.data.pageNo += 1)
            }
        case actionTypes.RESET_PAGE_DATA:
            return {
                ...state,
                // actionKey: MYORDERTABKAY.register,
                registerList: [],
                outpatientList: [],
                isFetching: false,
                isRegisterLastPage: false,
                isOutpatientLastPage: false,
                registerPageno: 1,
                outpatientPageno: 1
            }
        case actionTypes.RESET_REGISTER_DATA:
            return {
                ...state,
                registerList: [],
                isFetching: false,
                isRegisterLastPage: false,
                registerPageno: 1
            }
        case actionTypes.RESET_OUTPATIENT_DATA:
            return {
                ...state,
                outpatientList: [],
                isFetching: false,
                isOutpatientLastPage: false,
                outpatientPageno: 1
            }
        // case actionTypes.CANCEL_REGISTEATION_SUCCESS:
        //     return {
        //
        //     }
        default:
            return state;
    }
};

export default reducer;


export const getTabs = state => {
    return state.myOrderTabs.headerTabs;
};


export const getActionTabKey = state => {
    return state.myOrderTabs.actionKey;
};

export const getRegisterList = state => {
    return state.myOrderTabs.registerList;
};
export const getOutpatientList = state => {
    return state.myOrderTabs.outpatientList;
};
export const getFetchingStatus = state => {
    return state.myOrderTabs.isFetching;
};

export const getIsRegisterLastPage = state => {
    return state.myOrderTabs.isRegisterLastPage
}

export const getIsOutpatientLastPage = state => {
    return state.myOrderTabs.isOutpatientLastPage
}

