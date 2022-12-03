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
import SimulatorPage from "@/views/intranet/ageRv/app/commercial/management/SimulatorPage";
import SalesCommission from "@/views/intranet/ageRv/app/commercial/dashboard/SalesCommission";
import SalesSupCommission from "@/views/intranet/ageRv/app/commercial/dashboard/SalesSupCommission";
import NewUser from "@/views/intranet/app/management/NewUser";
import HomePageBoard from '@/views/intranet/ageBoard/app/HomePage';
import DashboardPageReport from '@/views/intranet/ageReport/app/management/DashboardPageReport.vue';
import DashboardManagement from "@/views/intranet/ageBoard/app/management/DashboardManagement";

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
    path: '/gerenciamento/usuarios/novo',
    name: 'NewUser',
    component: NewUser,
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
    path: '/ageReport/gerenciamento',
    name: 'DashboardPageReport',
    component: DashboardPageReport,
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
    path: '/ageRv/comercial/comissao',
    name: 'SalesCommission',
    component: SalesCommission,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageRv/comercial/supervisor-comissao',
    name: 'SalesSupCommission',
    component: SalesSupCommission,
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
    name: 'HomePageRv',
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
  },
  {
    path: '/ageRv/comercial/simulador',
    name: 'SimulatorPage',
    component: SimulatorPage,
    beforeEnter: [
      Guard.auth,
      Guard.permission_rv
    ]
  },
  {
    path: '/ageBoard/home',
    name: 'HomePage',
    component: HomePageBoard,
    beforeEnter: [
      Guard.auth,
      Guard.permission_board
    ]
  },
  {
    path: '/ageBoard/gerenciamento/dashboards',
    name: 'DashboardManagement',
    component: DashboardManagement,
    beforeEnter: [
      Guard.auth,
      Guard.permission_board
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
