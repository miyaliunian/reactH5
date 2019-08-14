import {cityID} from "@assets/static/DictionaryConstant";
import url from "../../utils/httpUrl";
import {FETCH_DATA} from "../middleware/api";
import {loadBindCardList} from './bindCard'
import {post} from "@utils/httpUtil";

/**
 * Class:
 * Author: wufei
 * Date: 2019/8/14
 * Description:
 *    住院管理 reduce
 *
 */


const initialState = {
    isFetching: false,
}


// action types
const actionTypes = {
    //标识当前页是否为上页面返回
    ISREFRESH: 'HOSPITALIZATION_MANAGEMENT/ISREFRESH',
    //家庭成员列表
    BIND_CARD_LIST: 'HOSPITALIZATION_MANAGEMENT/BIND_CARD_LIST',
    //请求医院列表
    FETCH_HOSPITALIZATION_REQUEST: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_REQUEST',
    FETCH_HOSPITALIZATION_SUCCESS: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITAL_SUCCESS',
    FETCH_HOSPITALIZATION_FAILURE: 'HOSPITALIZATION_MANAGEMENT/FETCH_HOSPITALIZATION_FAILURE',
}


// action creators
export const actions = {

    //加载家庭成员信息、医院列表
    loadBindCardList: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API__BIND_CARD_LIST()
            dispatch(fetchRequest())
            return post(targetURL).then(
                (data) => {
                    if (data.infocode === 1) {
                        dispatch(bindCardItems(data.data))
                    }
                    console.log(data)
                }
            ).catch()
        }
    },

    //加载医院
    getRegedListByOpenType: (type, perObj) => {
        return (dispatch, getstate) => {
            const targetURL = url.API_GET_REGED_LIST_BY_OPEN_TYPE(type, perObj.id)
            return post(targetURL).then(
                (data) => {
                    console.log(data)
                }
            ).catch()
        }
    },

}


const fetchRequest = () => ({
    type: actionTypes.FETCH_HOSPITALIZATION_REQUEST
})

const bindCardItems = (data) => ({
    type: actionTypes.BIND_CARD_LIST,
    response: data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOSPITALIZATION_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.BIND_CARD_LIST:
            return {
                ...state,
                bindCardData: action
            }
        default:
            return state
    }
}
export default reducer


//selectors
export const getFetchingStatus = (state) => {
    return state.hospitalizationManagement.isFetching
}


export const getbindCardIems = (state) => {
    return state.hospitalizationManagement.isFetching
}
