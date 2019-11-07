/**
 * Class:
 * Author: wufei
 * Date: 2019/5/27
 * Description:
 *  tabs reducer
 */

import url from "../../utils/httpUrl"
import {cityID} from '@assets/static/Constant'
import {FETCH_DATA} from "../middleware/api";

const initialState = {
    areas: [
        {id: '', name: '全部区域'}
    ],
}


// action types
const actionTypes = {
    FETCH_AREAS_REQUEST: 'TABS/FETCH__AREAS_REQUEST',
    FETCH_AREAS_SUCCESS: 'TABS/FETCH__AREAS_SUCCESS',
    FETCH_AREAS_FAILURE: 'TABS/FETCH__AREAS_FAILURE',
}

// action creators
export const actions = {
    loadCitys: () => {
        return (dispatch, getstate) => {
            const targetURL = url.API_AREA_LIST(cityID)
            return dispatch(fetchAreasList(targetURL))
        }
    }
}


// action creators：二
const fetchAreasList = (targetURL) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_AREAS_REQUEST,
            actionTypes.FETCH_AREAS_SUCCESS,
            actionTypes.FETCH_AREAS_FAILURE,
        ],
        targetURL,
    }
})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AREAS_REQUEST:
            return {...state, isFetching: true}
        case actionTypes.FETCH_AREAS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                areas: state.areas.concat(action.response.data)
            }
        case actionTypes.FETCH_AREAS_FAILURE:
            return {...state, isFetching: false}
        default:
            return state

    }
}

export default reducer


//selectors
export const getAreasList = (state) => {
    return state.tabs.areas
}
