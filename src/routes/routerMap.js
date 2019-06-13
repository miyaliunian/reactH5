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
import BindCard from "@components/BindCard/BindCardContainer"
import BindCardList from "@components/BindCard/components/BindCardList";

const routerMap = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        exact: true
    },
    {
        path: '/loading',
        name: 'LoadingMask',
        component: LoadingMask
    },
    {
        path: '/hospitals',
        name: 'Hospitals',
        component: Hospitals
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/clinic/:id/:name',
        name: 'Division',
        component: Division
    },
    {
        path: '/bindCard',
        name: 'BindCard',
        auth: true,
        component: BindCard
    },
    {
        path: '/bindCardList',
        name: 'BindCardList',
        component: BindCardList
    },
]

export default routerMap
