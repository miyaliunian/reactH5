// /**
//  * 我的预约挂号
//  */
// import URL from '@api/httpUrl'
// import {post} from "@api/httpUtil";
//
// const initialState = {
//     registerList: []
// };
//
// // action types
// const actionTypes = {
//
//     FETCH_REGISTER_BY_PAGE_REQUEST: 'MYREGISTER/FETCH_REGISTER_BY_PAGE_REQUEST',
//     FETCH_REGISTER_BY_PAGE_SUCCESS: 'MYREGISTER/FETCH_REGISTER_BY_PAGE_SUCCESS',
//     FETCH_REGISTER_BY_PAGE_FAILURE: 'MYREGISTER/FETCH_REGISTER_BY_PAGE_FAILURE'
// };
//
// // action creators
// export const actions = {
//
//     loadRegisterByPage: (pageno) => {
//         return (dispatch, getstate) => {
//             if (!pageno)
//                 pageno = 1
//             const targetURL = URL.API_QUERY_REGISTER_IN_MY_ORDER(pageno)
//             dispatch(loadRegisterByPageRequest())
//             return post(targetURL).then(data => {
//                 console.log("123456789")
//                 console.group(data)
//                 if (data && data.infocode) {
//                     dispatch(loadRegisterByPageSuccess(data.data.list))
//                 }
//             })
//         }
//     }
//
// };
//
//
// const loadRegisterByPageRequest = () => ({
//     type: actionTypes.FETCH_REGISTER_BY_PAGE_REQUEST
// })
//
// const loadRegisterByPageSuccess = (data) => ({
//     type: actionTypes.FETCH_REGISTER_BY_PAGE_SUCCESS,
//     data
// })
//
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.FETCH_REGISTER_BY_PAGE_REQUEST:
//             return {
//                 ...state,
//                 isFetching: true
//             };
//         case actionTypes.FETCH_REGISTER_BY_PAGE_SUCCESS:
//             return {
//                 ...state,
//                 isFetching: false,
//                 registerList:action.data
//             };
//         default:
//             return state;
//     }
// };
//
// export default reducer;
//
// export const getRegisterList = state => {
//     return state.myRegister.registerList;
// };
//
