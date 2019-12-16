/**
 * Class: routerMap
 * requiresAuthor: wufei
 * Date: 2019/6/10
 * Description:
 *  路由映射: 路由组件化
 */

import React, { lazy, Suspense } from 'react'
const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const HomeComponent = lazy(() => import('@containers/Home/HomeContainer.tsx'))
const HospitalsComponent = lazy(() => import('@containers/Hospitals/HospitalsContainer'))
const LoginComponent = lazy(() => import('@containers/Login/LoginContainer'))
const DivisionComponent = lazy(() => import('@containers/Division/DivisionContainer'))
const BindCardComponent = lazy(() => import('@components/BindCard/BindCardContainer'))
const BindCardListComponent = lazy(() => import('@components/BindCard/components/BindCardList/BindCardList'))
const DoctorListComponent = lazy(() => import('@containers/DoctorList/DoctorListContainer'))
const DoctorComponent = lazy(() => import('@containers/Doctor/DoctorContainer'))
//(再次预约)从订单查询-进入 医生详情
const OrderReservationDoctorComponent = lazy(() => import('@containers/Order/orderReservationDoctorContainer'))
const ReservationContainerComponent = lazy(() => import('@containers/Reservation/ReservationContainer'))
const IntelligentWaitingContainerComponent = lazy(() =>
  import('@containers/IntelligentWaiting/IntelligentWaitingContainer')
)
const RegisterContainerComponent = lazy(() => import('@containers/Register/RegisterContainer'))
const HospitalizationManagementContainerComponent = lazy(() =>
  import('@containers/HospitalizationManagement/HospitalizationManagementContainer')
)
const ReportContainerComponent = lazy(() => import('@containers/Report/ReportContainer'))
const MakeUpAdvancePaymentComponent = lazy(() =>
  import('@containers/HospitalizationManagement/Components/MakeUpAdvancePayment/MakeUpAdvancePaymentContainer')
)
const HistoryAdvancePaymentComponent = lazy(() =>
  import('@containers/HospitalizationManagement/Components/HistoryAdvancePayment/HistoryAdvancePaymentContainer')
)
const DailyListQueryPaymentComponent = lazy(() =>
  import('@containers/HospitalizationManagement/Components/DailyListQueryPayment/DailyListQueryPaymentContainer')
)
const AdvanceSettlementContainerComponent = lazy(() =>
  import('@containers/Settlement/Advance/AdvanceSettlementContainer')
)
//从订单查询-进入 预结算
const OrderMedicarePayContainerComponent = lazy(() => import('@containers/Order/orderMedicarePayContainer'))
//从订单进入-纯自费支付
const OrderThirdPayContainerComponent = lazy(() => import('@containers/Order/orderThirdPayContainer'))
//医保支付
const MedicarePayComponent = lazy(() => import('@components/Pay/MedicarePay/MedicarePayContainer'))
//第三方支付
const ThirdPayContainerComponent = lazy(() => import('@components/Pay/ThirdPay/ThirdPayContainer'))
//支付成功倒计时
const PayCountdownComponent = lazy(() => import('@components/Pay/Countdown/PayCountdown'))
//支付成功
const PayResultContainerComponent = lazy(() => import('@components/Pay/Result/PayResultContainer'))

const DLRSComponent = lazy(() => import('@containers/DLRS/DLRSContainer'))

const routerMap = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: SuspenseComponent(HomeComponent)
  },
  {
    path: '/hospitals',
    exact: true,
    name: 'Hospitals',
    component: SuspenseComponent(HospitalsComponent)
  },
  {
    path: '/login',
    name: 'Login',
    component: SuspenseComponent(LoginComponent)
  },
  {
    path: '/register',
    name: 'Register',
    exact: true,
    component: SuspenseComponent(RegisterContainerComponent)
  },
  {
    path: '/division/:id/:name',
    name: 'Division',
    exact: true,
    component: SuspenseComponent(DivisionComponent)
  },
  {
    path: '/doctorList/:id/:name',
    name: 'DoctorList',
    exact: true,
    component: SuspenseComponent(DoctorListComponent)
  },
  {
    //线上预约->医生详情
    path: '/doctor',
    name: 'Doctor',
    component: SuspenseComponent(DoctorComponent)
  },
  {
    // 从我的订单进入医生详情
    path: '/orderReservationDoctor',
    name: 'orderReservationDoctor',
    component: SuspenseComponent(OrderReservationDoctorComponent)
  },
  {
    path: '/reservation',
    name: 'Reservation',
    requiresAuth: true,
    component: SuspenseComponent(ReservationContainerComponent)
  },
  {
    path: '/bindCard',
    name: 'BindCard',
    requiresAuth: true,
    component: SuspenseComponent(BindCardComponent)
  },
  {
    path: '/bindCardList',
    name: 'BindCardList',
    component: SuspenseComponent(BindCardListComponent)
  },
  {
    path: '/intelligentWaiting',
    name: 'IntelligentWaiting',
    requiresAuth: true,
    component: SuspenseComponent(IntelligentWaitingContainerComponent)
  },
  {
    path: '/hospitalizationManagement',
    name: 'hospitalizationManagement',
    requiresAuth: true,
    component: SuspenseComponent(HospitalizationManagementContainerComponent)
  },
  {
    path: '/report',
    name: 'report',
    requiresAuth: true,
    component: SuspenseComponent(ReportContainerComponent)
  },
  {
    path: '/makeUpAdvancePayment/:inName/:inHosNo',
    name: 'makeUpAdvancePayment',
    component: SuspenseComponent(MakeUpAdvancePaymentComponent)
  },
  {
    path: '/historyAdvancePayment/:hosId/:inHosNo',
    name: 'historyAdvancePayment',
    component: SuspenseComponent(HistoryAdvancePaymentComponent)
  },
  {
    path: '/dailyListQueryPayment/:hosId/:inHosNo',
    name: 'dailyListQueryPayment',
    component: SuspenseComponent(DailyListQueryPaymentComponent)
  },
  {
    path: '/advanceSettlementContainer',
    name: 'advanceSettlementContainer',
    component: SuspenseComponent(AdvanceSettlementContainerComponent)
  },
  {
    path: '/orderMedicarePayContainer',
    name: 'orderMedicarePayContainer',
    component: SuspenseComponent(OrderMedicarePayContainerComponent)
  },
  {
    path: '/orderThirdPayContainer',
    name: 'orderThirdPayContainer',
    component: SuspenseComponent(OrderThirdPayContainerComponent)
  },

  {
    path: '/medicarePayContainer',
    name: 'medicarePayContainer',
    component: SuspenseComponent(MedicarePayComponent)
  },
  {
    path: '/thirdPayContainer',
    name: 'thirdPayContainer',
    component: SuspenseComponent(ThirdPayContainerComponent)
  },
  {
    path: '/payCountdown',
    name: 'payCountdown',
    component: SuspenseComponent(PayCountdownComponent)
  },
  {
    path: '/payResultContainer',
    name: 'payResultContainer',
    component: SuspenseComponent(PayResultContainerComponent)
  },
  {
    path: '/dlrs',
    name: 'dlrs',
    component: SuspenseComponent(DLRSComponent)
  }
]

export default routerMap
