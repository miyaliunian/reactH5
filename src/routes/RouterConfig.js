/**
 * Class: routerMap
 * requiresAuthor: wufei
 * Date: 2019/6/10
 * Description:
 *  路由映射: 路由组件化
 */

import React, {lazy, Suspense} from 'react'
import LoadingMask from "@components/Loading/LoadingMask";


const HomeComponent = lazy(() => import("@containers/Home/HomeContainer"));
const Home = (props) => {
    return (
        <Suspense fallback={null}>
            <HomeComponent {...props}></HomeComponent>
        </Suspense>
    )
};


const HospitalsComponent = lazy(() => import("@containers/Hospitals/HospitalsContainer"));
const Hospitals = (props) => {
    return (
        <Suspense fallback={<div>加载中</div>}>
            <HospitalsComponent {...props}></HospitalsComponent>
        </Suspense>
    )
};


const LoginComponent = lazy(() => import("@containers/Login/LoginContainer"));
const Login = (props) => {
    return (
        <Suspense fallback={null}>
            <LoginComponent {...props}></LoginComponent>
        </Suspense>
    )
};

const DivisionComponent = lazy(() => import("@containers/Division/DivisionContainer"));
const Division = (props) => {
    return (
        <Suspense fallback={null}>
            <DivisionComponent {...props}></DivisionComponent>
        </Suspense>
    )
};


const BindCardComponent = lazy(() => import("@components/BindCard/BindCardContainer"));
const BindCard = (props) => {
    return (
        <Suspense fallback={null}>
            <BindCardComponent {...props}></BindCardComponent>
        </Suspense>
    )
};


const BindCardListComponent = lazy(() => import("@components/BindCard/components/BindCardList/BindCardList"));
const BindCardList = (props) => {
    return (
        <Suspense fallback={null}>
            <BindCardListComponent {...props}></BindCardListComponent>
        </Suspense>
    )
};


const DoctorListComponent = lazy(() => import("@containers/DoctorList/DoctorListContainer"));
const DoctorList = (props) => {
    return (
        <Suspense fallback={null}>
            <DoctorListComponent {...props}></DoctorListComponent>
        </Suspense>
    )
};


const DoctorComponent = lazy(() => import("@containers/Doctor/DoctorContainer"));
const Doctor = (props) => {
    return (
        <Suspense fallback={null}>
            <DoctorComponent {...props}></DoctorComponent>
        </Suspense>
    )
};


const ReservationContainerComponent = lazy(() => import("@containers/Reservation/ReservationContainer"));
const ReservationContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <ReservationContainerComponent {...props}></ReservationContainerComponent>
        </Suspense>
    )
};


const IntelligentWaitingContainerComponent = lazy(() => import("@containers/IntelligentWaiting/IntelligentWaitingContainer"));
const IntelligentWaitingContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <IntelligentWaitingContainerComponent {...props}></IntelligentWaitingContainerComponent>
        </Suspense>
    )
};


const RegisterContainerComponent = lazy(() => import("@containers/Register/RegisterContainer"));
const RegisterContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <RegisterContainerComponent {...props}></RegisterContainerComponent>
        </Suspense>
    )
};


const HospitalizationManagementContainerComponent = lazy(() => import("@containers/HospitalizationManagement/HospitalizationManagementContainer"));
const HospitalizationManagementContainer = (props) => {
    return (
        <Suspense fallback={<LoadingMask/>}>
            <HospitalizationManagementContainerComponent {...props}></HospitalizationManagementContainerComponent>
        </Suspense>
    )
};


const MakeUpAdvancePaymentComponent = lazy(() => import("@containers/HospitalizationManagement/Components/MakeUpAdvancePayment/MakeUpAdvancePaymentContainer"));
const MakeUpAdvancePayment = (props) => {
    return (
        <Suspense fallback={null}>
            <MakeUpAdvancePaymentComponent {...props}></MakeUpAdvancePaymentComponent>
        </Suspense>
    )
};


const HistoryAdvancePaymentComponent = lazy(() => import("@containers/HospitalizationManagement/Components/HistoryAdvancePayment/HistoryAdvancePaymentContainer"));
const HistoryAdvancePayment = (props) => {
    return (
        <Suspense fallback={null}>
            <HistoryAdvancePaymentComponent {...props}></HistoryAdvancePaymentComponent>
        </Suspense>
    )
};


const DailyListQueryPaymentComponent = lazy(() => import("@containers/HospitalizationManagement/Components/DailyListQueryPayment/DailyListQueryPaymentContainer"));
const DailyListQueryPayment = (props) => {
    return (
        <Suspense fallback={null}>
            <DailyListQueryPaymentComponent {...props}></DailyListQueryPaymentComponent>
        </Suspense>
    )
};


const AdvanceSettlementContainerComponent = lazy(() => import("@containers/Settlement/Advance/AdvanceSettlementContainer"));
const AdvanceSettlementContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <AdvanceSettlementContainerComponent {...props}></AdvanceSettlementContainerComponent>
        </Suspense>
    )
};


//医保支付
const MedicarePayComponent = lazy(() => import("@components/Pay/MedicarePay/MedicarePayContainer"));
const MedicarePayContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <MedicarePayComponent {...props}></MedicarePayComponent>
        </Suspense>
    )
}

//第三方支付
const ThirdPayContainerComponent = lazy(() => import("@components/Pay/ThirdPay/ThirdPayContainer"));
const ThirdPayContainer = (props) => {
    return (
        <Suspense fallback={null}>
            <ThirdPayContainerComponent {...props}></ThirdPayContainerComponent>
        </Suspense>
    )
};

const routerMap = [
    {
        path: '/',
        name: 'Home',
        exact: true,
        component: Home,
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
        requiresAuth: true,
        component: ReservationContainer
    },
    {
        path: '/bindCard',
        name: 'BindCard',
        requiresAuth: true,
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
        requiresAuth: true,
        component: IntelligentWaitingContainer
    },
    {
        path: '/hospitalizationManagement',
        name: 'hospitalizationManagement',
        requiresAuth: true,
        component: HospitalizationManagementContainer
    },
    {
        path: '/makeUpAdvancePayment/:inName/:inHosNo',
        name: 'makeUpAdvancePayment',
        component: MakeUpAdvancePayment
    },
    {
        path: '/historyAdvancePayment/:hosId/:inHosNo',
        name: 'historyAdvancePayment',
        component: HistoryAdvancePayment
    },
    {
        path: '/dailyListQueryPayment/:hosId/:inHosNo',
        name: 'dailyListQueryPayment',
        component: DailyListQueryPayment
    },
    {
        path: '/advanceSettlementContainer',
        name: 'advanceSettlementContainer',
        component: AdvanceSettlementContainer
    },
    {
        path: '/medicarePayContainer',
        name: 'medicarePayContainer',
        component: MedicarePayContainer
    },
    {
        path: '/thirdPayContainer',
        name: 'thirdPayContainer',
        component: ThirdPayContainer
    },
]

export default routerMap
