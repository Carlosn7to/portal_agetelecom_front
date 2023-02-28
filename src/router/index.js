import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/intranet/web/LoginPage";
import Guard from '/services/middleware/Auth.js'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/test',
    name: 'test',
    component: () => import("@/views/TestComponent")
  },
  {
    path: '/sistemas',
    name: 'SystemApp',
    component: () => import('@/views/intranet/app/SystemApp'),
    beforeEnter: [
      Guard.auth
    ]
  },
  {
    path: '/gerenciamento/dashboard',
    name: 'PanelDashboard',
    component: () => import('@/views/intranet/app/management/PanelDashboard'),
    beforeEnter: [
      Guard.auth,
      Guard.management_portal
    ]
  },
  {
    path: '/gerenciamento/usuarios',
    name: 'PanelUsers',
    component: () => import("@/views/intranet/app/management/PanelUsers"),
    beforeEnter: [
      Guard.auth,
      Guard.management_portal
    ]
  },
  {
    path: '/gerenciamento/usuarios/novo',
    name: 'NewUser',
    component: () => import("@/views/intranet/app/management/NewUser"),
    beforeEnter: [
      Guard.auth,
      Guard.management_portal
    ]
  },
  {
    path: '/ageReport/home',
    name: 'ReportPage',
    component: () => import("@/views/intranet/ageReport/app/ReportPage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_report
    ]
  },
  {
    path: '/ageReport/gerenciamento',
    name: 'DashboardPageReport',
    component: () => import('@/views/intranet/ageReport/app/management/DashboardPageReport.vue'),
    beforeEnter: [
      Guard.auth,
      Guard.permission_report
    ]
  },
  {
    path: '/ageRv/comercial/analitico',
    name: 'SalesAnalytics',
    component: () => import("@/views/intranet/ageRv/app/commercial/dashboard/SalesAnalytics"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/comissao',
    name: 'SalesCommission',
    component: () => import("@/views/intranet/ageRv/app/commercial/dashboard/SalesCommission"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/supervisor-comissao',
    name: 'SalesSupCommission',
    component: () => import("@/views/intranet/ageRv/app/commercial/dashboard/SalesSupCommission"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/vendas/dashboard',
    name: 'NewSalesPage',
    component: () => import("@/views/intranet/ageRv/app/commercial/dashboard/NewSalesPage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/home',
    name: 'HomePageRv',
    component: () => import("@/views/intranet/ageRv/app/HomePage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/gerenciamento',
    name: 'DashboardPage',
    component: () => import("@/views/intranet/ageRv/app/commercial/management/DashboardPage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/simulador',
    name: 'SimulatorPage',
    component: () => import("@/views/intranet/ageRv/app/commercial/management/SimulatorPage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/vendas/dashboard/extrato',
    name: 'DashboardSales',
    component: () => import("@/views/intranet/ageRv/app/commercial/dashboard/DashboardSales"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageBoard/home',
    name: 'HomePage',
    component: () => import('@/views/intranet/ageBoard/app/HomePage'),
    beforeEnter: [
      Guard.auth,
      Guard.permission_board
    ]
  },
  {
    path: '/ageBoard/gerenciamento/dashboards',
    name: 'DashboardManagement',
    component: () => import("@/views/intranet/ageBoard/app/management/DashboardManagement"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_board
    ]
  },
  {
    path: '/ageBoard/gerenciamento/usuarios',
    name: 'UsersManagement',
    component: () => import("@/views/intranet/ageBoard/app/management/UsersManagement"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_board
    ]
  },
  {
    path: '/ageControle/home',
    name: 'HomePageControl',
    component: () => import("@/views/intranet/AgeControl/app/HomePage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_control
    ]
  },
  {
    path: '/ageControle/gerenciamento/dashboard',
    name: 'DashboardControl',
    component: () => import("@/views/intranet/AgeControl/app/management/DashboardPage"),
    beforeEnter: [
      Guard.auth,
      Guard.permission_control
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
