import {cityID} from "../../static/DictionaryConstant";
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";

/**
 * Class:
 * Author: wufei
 * Date: 2019/5/28
 * Description:
 *    医院列表 reduce
 *
 */


const initialState = {
    zhpx: 'register',//综合排序
    areaId: '',//区域列表
    hosCategory: '',//医院类型
    hosGrade: '',// 医院等级
    page: 1,//翻页
    data: [] //列表数据
}


// action types
const actionTypes = {
    FETCH_HOSPITAL_REQUEST: 'HOSPITAL/FETCH_HOSPITAL_REQUEST',
    FETCH_HOSPITAL_SUCCESS: 'HOSPITAL/FETCH_HOSPITAL_SUCCESS',
    FETCH_HOSPITAL_FAILURE: 'HOSPITAL/FETCH_HOSPITAL_FAILURE',
}


// action creators
export const actions = {
    loadHosipitalList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_HOSPITAL_LIST(cityID, 'register', 1)
            let param = {
                areaId: getstate().areaId || null,
                hosCategory: getstate().hosCategory || null,
                hosGrade: getstate().hosGrade || null
            }
            return dispatch(fetchHosipitalList(targetURL, param))
        }
    }
}


// action creators：二
const fetchHosipitalList = (targetURL, param) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_HOSPITAL_REQUEST,
            actionTypes.FETCH_HOSPITAL_SUCCESS,
            actionTypes.FETCH_HOSPITAL_FAILURE,
        ],
        targetURL,
    },
    param
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOSPITAL_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_HOSPITAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.data.list
            }
        case actionTypes.FETCH_HOSPITAL_FAILURE:
            return {...state, isFetching: false}
        default:
            return state

    }
}

export default reducer


//selectors
export const getHospitalList = (state) => {
    return state.hospital.data
}
