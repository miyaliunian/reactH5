/**
 * Class: routerMap
 * Author: wufei
 * Date: 2019/6/10
 * Description:
 *  路由映射: 路由组件化
 */

import Home from '@containers/Home/HomeContainer'
import Hospitals from "@containers/Hospitals/HospitalsContainer";
import Login from "@containers/Login/LoginContainer";
import LoadingMask from "@components/Loading/LoadingMask";
import Division from "@containers/Division/DivisionContainer";

const routerMap = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/loading',
        component: LoadingMask
    },
    {
        path: '/hospitals',
        component: Hospitals
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/clinic/:id/:name',
        component: Division
    },
]

export default routerMap
