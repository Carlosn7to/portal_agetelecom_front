import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/intranet/web/LoginPage";
import PanelDashboard from "@/views/intranet/app/management/PanelDashboard";
import SystemApp from "@/views/intranet/app/SystemApp";
import ReportPage from "@/views/intranet/ageReport/app/ReportPage";
import Guard from '/services/middleware/Auth.js'
import SalesAnalytics from "@/views/intranet/ageRv/app/commercial/dashboard/SalesAnalytics";
import SalesPage from "@/views/intranet/ageRv/app/commercial/dashboard/SalesPage";
import HomePage from "@/views/intranet/ageRv/app/HomePage";
import PanelUsers from "@/views/intranet/app/management/PanelUsers";
import DashboardPage from "@/views/intranet/ageRv/app/commercial/management/DashboardPage";

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
    path: '/gerenciamento/dashboard',
    name: 'PanelDashboard',
    component: PanelDashboard,
    beforeEnter: [
      Guard.auth,
      Guard.management_portal
    ]
  },
  {
    path: '/gerenciamento/usuarios',
    name: 'PanelUsers',
    component: PanelUsers,
    beforeEnter: [
      Guard.auth,
      Guard.management_portal
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
    path: '/ageRv/comercial/vendas/dashboard',
    name: 'SalesPage',
    component: SalesPage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/home',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/gerenciamento',
    name: 'DashboardPage',
    component: DashboardPage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
