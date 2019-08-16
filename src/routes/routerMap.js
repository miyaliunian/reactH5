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
import BindCardList from "@components/BindCard/components/BindCardList/BindCardList";
import DoctorList from "@containers/DoctorList/DoctorListContainer";
import Doctor from "@containers/Doctor/DoctorContainer"
import ReservationContainer from "@containers/Reservation/ReservationContainer";
import IntelligentWaitingContainer from "@containers/IntelligentWaiting/IntelligentWaitingContainer";
import RegisterContainer from "@containers/Register/RegisterContainer";
import HospitalizationManagementContainer
    from "@containers/HospitalizationManagement/HospitalizationManagementContainer";
import MakeUpAdvancePayment
    from "@containers/HospitalizationManagement/Components/MakeUpAdvancePayment/MakeUpAdvancePayment";
import HistoryAdvancePayment
    from "@containers/HospitalizationManagement/Components/HistoryAdvancePayment/HistoryAdvancePaymentContainer";
import DailyListQueryPayment
    from "@containers/HospitalizationManagement/Components/DailyListQueryPayment/DailyListQueryPayment";
import PayContainer from "@containers/Pay/PayContainer";


const routerMap = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
        path: '/register',
        name: 'Register',
        component: RegisterContainer
    },
    {
        path: '/division/:id/:name',
        name: 'Division',
        component: Division
    },
    {
        path: '/doctorList/:id/:name',
        name: 'DoctorList',
        component: DoctorList
    },
    {
        path: '/doctor',
        name: 'Doctor',
        component: Doctor
    },
    {
        path: '/reservation',
        name: 'Reservation',
        auth: true,
        component: ReservationContainer
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
    {
        path: '/intelligentWaiting',
        name: 'IntelligentWaiting',
        auth: true,
        component: IntelligentWaitingContainer
    },
    {
        path: '/hospitalizationManagement',
        name: 'hospitalizationManagement',
        auth: true,
        component: HospitalizationManagementContainer
    },
    {
        path: '/makeUpAdvancePayment/:inName/:inHosNo',
        name: 'makeUpAdvancePayment',
        component: MakeUpAdvancePayment
    },
    {
        path: '/payContainer',
        name: 'payContainer',
        component: PayContainer
    },
    {
        path: '/historyAdvancePayment/:hosId/:inHosNo',
        name: 'historyAdvancePayment',
        component: HistoryAdvancePayment
    },
    {
        path: '/dailyListQueryPayment',
        name: 'dailyListQueryPayment',
        component: DailyListQueryPayment
    },
]

export default routerMap
