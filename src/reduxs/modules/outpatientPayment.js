/**
 * 门诊缴费
 * By Cy 2020-01-03
 */
import {FETCH_DATA} from '@reduxs/middleware/api'
import URL from '@api/httpUrl'
import {post} from '@api/httpUtil'
import Axios from "axios";
import {cityID} from "@api/Constant";

const initialState = {
    isFetching: false,
    familyList: [], //家庭成员列表
    defaultPerson: {}, //默认人员
    hospitalList: [], //人员相关医院列表
    selHospital: {}, //当前选择的医院。默认为 hospitalList[0]
    balanceinfoList: [],//门诊缴费列表
    recentHopsitalList: []
}

const actionTypes = {
    FETCH_FAMILY_REQUEST: 'OUTPATIENT/FETCH_FAMILY_REQUEST',
    FETCH_FAMILY_SUCCESS: 'OUTPATIENT/FETCH_FAMILY_SUCCESS',
    FETCH_FAMILY_FAILURE: 'OUTPATIENT/FETCH_FAMILY_FAILURE',

    FETCH_HOSPITAL_BY_PERSON_REQUEST: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_REQUEST',
    FETCH_HOSPITAL_BY_PERSON_SUCCESS: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_SUCCESS',
    FETCH_HOSPITAL_BY_PERSON_FAILURE: 'OUTPATIENT/FETCH_HOSPITAL_BY_PERSON_FAILURE',

    FETCH_BALANCEINFO_REQUEST: 'OUTPATIENT/FETCH_BALANCEINFO_REQUEST',
    FETCH_BALANCEINFO_SUCCESS: 'OUTPATIENT/FETCH_BALANCEINFO_SUCCESS',
    FETCH_BALANCEINFO_FAILURE: 'OUTPATIENT/FETCH_BALANCEINFO_FAILURE',

    FETCH_RECENTHOS_BY_PERSON_REQUEST: 'OUTPATIENT/FETCH_RECENTHOS_BY_PERSON_REQUEST',
    FETCH_RECENTHOS_BY_PERSON_SUCCESS: 'OUTPATIENT/FETCH_RECENTHOS_BY_PERSON_SUCCESS',
    FETCH_RECENTHOS_BY_PERSON_FAILURE: 'OUTPATIENT/FETCH_RECENTHOS_BY_PERSON_FAILURE',

    CHANG_DEFAULT_PERSON: 'OUTPATIENT/CHANG_DEFAULT_PERSON',
    CHANG_SELECT_HOSPITAL: 'OUTPATIENT/CHANG_SELECT_HOSPITAL'
}

export const actions = {
    /**
     * 根据类型和默认用户id获取医院列表
     * @param type 'recipe'为诊间缴费
     * @param personId
     * @returns {function(*=, *): *}
     */
    loadPageByDefaultPerson: () => {
        let person
        return (dispatch, getstate) => {
            const targetURL = URL.API__BIND_CARD_LIST()
            dispatch(loadFamilyRequest())
            return post(targetURL).then(data => {
                person = getDefaultPersonFromList(data.data)
                dispatch(loadFamilySuccess(data.data))
                if (person) {
                    let hospital
                    const targetURL1 = URL.API_GET_REGED_LIST_BY_OPEN_TYPE('recipe', person.id)
                    // return dispatch(loadHospitalsByPersonId(targetURL1))
                    dispatch(loadHospitalRequest())
                    return post(targetURL1).then(data => {
                        if (data && data.infocode) {
                            dispatch(loadHospitalSuccess(data.data))
                            hospital = data.data[0];
                            if (hospital) {
                                console.log("hospital: " + JSON.stringify(hospital))
                                const targetURL2 = URL.API_QUERY_BALANCEINFO_LIST(person.id, hospital.id)
                                dispatch(loadBalanceInfoRequest())
                                return post(targetURL2).then(data => {
                                    if (data && data.infocode) {
                                        console.group(data)
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    },
    /**
     * 根据选择的用户进行页面数据刷新
     * @returns {function(*, *): Promise<T | never>}
     */
    loadPageBySelectPerson: (person) => {
        return (dispatch, getstate) => {
            dispatch(changeDefaultPerson(person))
            let hospital
            const targetURL1 = URL.API_GET_REGED_LIST_BY_OPEN_TYPE('recipe', person.id)
            // return dispatch(loadHospitalsByPersonId(targetURL1))
            dispatch(loadHospitalRequest())
            return post(targetURL1).then(data => {
                if (data && data.infocode) {
                    dispatch(loadHospitalSuccess(data.data))
                    hospital = data.data[0];
                    if (hospital) {
                        const targetURL2 = URL.API_QUERY_BALANCEINFO_LIST(person.id, hospital.id)
                        dispatch(loadBalanceInfoRequest())
                        return post(targetURL2).then(data => {
                            if (data && data.infocode) {
                                console.group(data)
                            }
                        })
                    }
                }
            })
        }
    },
    /**
     * 根据选择的医院进行页面数据刷新
     * @param hospital
     * @returns {function(*=, *): Promise<T | never>}
     */
    loadPageBySelectHospital: (hospital, goback) => {
        return (dispatch, getstate) => {
            console.group(getstate())
            let person = getstate().outpatientPayment.defaultPerson
            dispatch(changeSelectHospital(hospital))
            const targetURL2 = URL.API_QUERY_BALANCEINFO_LIST(person.id, hospital.id)
            dispatch(loadBalanceInfoRequest())
            return post(targetURL2).then(data => {
                if (data && data.infocode) {
                    console.group(data)
                }
                goback()
            })
        }
    },
    /**
     * 加载最近预约的医院
     * @returns {function(*=, *): Promise<T | never>}
     */
    loadRecentHospitalListByPersonId: (person) => {
        return (dispatch, state) => {
            let targetURL = URL.API_GET_REGED_LIST_BY_OPEN_TYPE('recipe', person.id)
            return post(targetURL)
                .then(data => {
                    if (data.infocode && data.infocode === 1) {
                        dispatch(loadBalanceInfoSuccess(data.data))
                    }
                })
                .catch()
        }
    }
}

/**
 * 从家庭人员列表中筛选出默认人员
 * @param personList
 */
function getDefaultPersonFromList(personList) {
    let defaultPerson
    if (personList) {
        if (personList.length > 1) {
            personList.map((item, index) => {
                if (item.def) {
                    defaultPerson = item
                }
            })
            if (!defaultPerson) {
                defaultPerson = personList[0]
            }
        } else {
            defaultPerson = personList[0]
        }
    }
    return defaultPerson
}

const loadFamilyRequest = () => ({
    type: actionTypes.FETCH_FAMILY_REQUEST
})
const loadFamilySuccess = data => ({
    type: actionTypes.FETCH_FAMILY_SUCCESS,
    data
})
const loadHospitalRequest = data => ({
    type: actionTypes.FETCH_HOSPITAL_BY_PERSON_REQUEST
})
const loadHospitalSuccess = data => ({
    type: actionTypes.FETCH_HOSPITAL_BY_PERSON_SUCCESS,
    data
})
const loadBalanceInfoRequest = data => ({
    type: actionTypes.FETCH_BALANCEINFO_REQUEST
})
const loadBalanceInfoSuccess = data => ({
    type: actionTypes.FETCH_BALANCEINFO_SUCCESS,
    data
})
const loadRecentHospitals = data => ({
    type: actionTypes.FETCH_RECENTHOS_BY_PERSON_SUCCESS,
    data
})
const changeDefaultPerson = data => ({
    type: actionTypes.CHANG_DEFAULT_PERSON,
    data
})
const changeSelectHospital = data => ({
    type: actionTypes.CHANG_SELECT_HOSPITAL,
    data
})
const loadHospitalsByPersonId = targetURL => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HOSPITAL_BY_PERSON_REQUEST,
            actionTypes.FETCH_HOSPITAL_BY_PERSON_SUCCESS,
            actionTypes.FETCH_HOSPITAL_BY_PERSON_FAILURE
        ],
        targetURL
    }
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FAMILY_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_FAMILY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                familyList: action.data,
                defaultPerson: getDefaultPersonFromList(action.data)
            }
        case actionTypes.FETCH_HOSPITAL_BY_PERSON_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_HOSPITAL_BY_PERSON_SUCCESS:
            console.log("FETCH_HOSPITAL_BY_PERSON_SUCCESS action.data:")
            console.group(action.data)
            return {
                ...state,
                hospitalList: action.data,
                selHospital: action.data[0]
            }
        case actionTypes.FETCH_BALANCEINFO_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_BALANCEINFO_SUCCESS:
            return {
                ...state,
                isFetching: false,
                balanceinfoList: action.data
            }
        case actionTypes.FETCH_RECENTHOS_BY_PERSON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                recentHopsitalList: action.data
            }
        case actionTypes.CHANG_DEFAULT_PERSON:
            return {
                ...state,
                isFetching: false,
                defaultPerson: action.data
            }
        case actionTypes.CHANG_SELECT_HOSPITAL:
            return {
                ...state,
                isFetching: false,
                selHospital: action.data
            }
        default:
            return state
    }
}
export default reducer

//selectors
export const getDefaultPerson = state => {
    return state.outpatientPayment.defaultPerson
}
export const getFamilyList = state => {
    return state.outpatientPayment.familyList
}
export const getHospitalList = state => {
    return state.outpatientPayment.hospitalList
}
export const getSelHospital = state => {
    return state.outpatientPayment.selHospital
}
export const getRecentHospitalList = state => {
    return state.outpatientPayment.recentHopsitalList
}
export const getFetchingStatus = state => {
    return state.outpatientPayment.isFetching
}
