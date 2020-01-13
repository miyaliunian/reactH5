import {takeEvery} from "redux-saga/effects"
import {actionTypes} from "@reduxs/modules/hospital"


function* getInitList() {
    console.log("getInitList")
}

//generator 函数
function* mySaga() {
    console.log("mySaga")
    yield  takeEvery(actionTypes.FILTER_HOSPITAL_SUCCESS,getInitList)
}

export default mySaga;