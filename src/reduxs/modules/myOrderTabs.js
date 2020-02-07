/**
 * 我的订单的tab
 */
import {MYORDERTABKAY} from "@api/Constant";
import URL from '@api/httpUrl'
import {post} from "@api/httpUtil";

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
    outpatientList: []
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
    FETCH_OUTPATIENT_BY_PAGE_FAILURE: 'MYORDER/FETCH_OUTPATIENT_BY_PAGE_FAILURE'
};

// action creators
export const actions = {

    //切换tab
    changeTab: (key, i) => {
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
                    dispatch(loadRegisterByPageSuccess(data.data.list))
                }
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
                    dispatch(loadOutpatientByPageSuccess(data.data.list))
                }
            })
        }
    }

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
                registerList:action.data
            };
        case actionTypes.FETCH_OUTPATIENT_BY_PAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                outpatientList:action.data
            };
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

