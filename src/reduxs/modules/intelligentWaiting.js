/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/20
 * Description:
 *    智能候诊 reduce
 *
 */

import { FETCH_DATA } from '@reduxs/middleware/api'
import URL from '@api/httpUrl'
import { post } from '@api/httpUtil'
import { Toast } from 'antd-mobile/lib/index'

const initialState = {
    isFetching: false,
    waitingList: [] // 智能候诊列表数据
}

const actionTypes = {
    FETCH_WAITING_REQUEST: 'INTELLIGENTWAITING/FETCH_WAITING_REQUEST',
    //智能候诊获取列表
    FETCH_WAITING_SUCCESS: 'INTELLIGENTWAITING/FETCH_WAITING_SUCCESS',
    FETCH_WAITING_FAILURE: 'INTELLIGENTWAITING/FETCH_WAITING_FAILURE',
    //重置智能候诊列表
    RESET_WAITING_ITEM: 'INTELLIGENTWAITING/RESET_WAITING_ITEM',
}

export const actions = {

    loadWaitingList: () => {
        let person
        return (dispatch, getstate) => {
            const targetURL = URL.API__BIND_CARD_LIST()
            return post(targetURL).then(data => {
                data.data.map((item, index) => {
                    if (item.def) {
                        person = item
                    }
                })
                if (person) {
                    const targetURL = URL.API__INTELLIGENT_WAITING_LIST(person.id)
                    return dispatch(loadIntelligentWaitingList(targetURL))
                }
            })
        }
    },
    loadingWaitingListByPerson: (person,from) => {
        return (dispatch, getstate) => {
            console.log(person)
            const {id} = person
            const targetURL = URL.API__INTELLIGENT_WAITING_LIST(id)
            return dispatch(loadingWaitingListByPersonId(targetURL))
        }
    },

    resetWaitingList: () => ({
        type: actionTypes.RESET_WAITING_ITEM
    })
}

const loadIntelligentWaitingList = targetURL => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_WAITING_REQUEST,
            actionTypes.FETCH_WAITING_SUCCESS,
            actionTypes.FETCH_WAITING_FAILURE
        ],
        targetURL
    }
})

const loadingWaitingListByPersonId = targetURL => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_WAITING_REQUEST,
            actionTypes.FETCH_WAITING_SUCCESS,
            actionTypes.FETCH_WAITING_FAILURE
        ],
        targetURL
    }
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WAITING_REQUEST:
            return { ...state, isFetching: true }
        case actionTypes.FETCH_WAITING_SUCCESS:
            if (action.response.infocode !== 1) {
                Toast.info(action.response.infomessage, 2)
                return { ...state, isFetching: false }
            }
            return {
                ...state,
                isFetching: false,
                waitingList: action.response.data
            }
        case actionTypes.FETCH_WAITING_FAILURE:
            return { ...state, isFetching: false }
        case actionTypes.RESET_WAITING_ITEM:
            return {
                ...state,
                isFetching: false,
                waitingList: []
            }
        default:
            return state
    }
}
export default reducer

//selectors
export const getIntelligentWaitingList = state => {
    return state.intelligentWaiting.waitingList
}

export const getFetchingStatus = state => {
    return state.intelligentWaiting.isFetching
}

