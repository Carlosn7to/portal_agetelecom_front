import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/intranet/web/LoginPage";
import PanelDashboard from "@/views/intranet/app/management/PanelDashboard";
import SystemApp from "@/views/intranet/app/SystemApp";
import ReportPage from "@/views/intranet/ageReport/app/ReportPage";
import Guard from '/services/middleware/Auth.js'
import SalesAnalytics from "@/views/intranet/ageRv/app/commercial/dashboard/SalesAnalytics";
import SalesPage from "@/views/intranet/ageRv/app/commercial/dashboard/SalesPage";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/sistemas',
    name: 'SystemApp',
    component: SystemApp,
    beforeEnter: [
      Guard.auth
    ]
  },
  {
    path: '/gerenciamento',
    name: 'PanelDashboard',
    component: PanelDashboard,
    beforeEnter: [
      Guard.auth
    ]
  },
  {
    path: '/ageReport/home',
    name: 'ReportPage',
    component: ReportPage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_report
    ]
  },
  {
    path: '/ageRv/comercial/analitico',
    name: 'SalesAnalytics',
    component: SalesAnalytics,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/vendas',
    name: 'SalesPage',
    component: SalesPage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
