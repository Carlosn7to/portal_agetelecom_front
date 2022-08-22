import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/intranet/web/LoginPage";
import PanelDashboard from "@/views/intranet/app/management/PanelDashboard";
import SystemApp from "@/views/intranet/app/SystemApp";
import ReportPage from "@/views/intranet/ageReport/app/ReportPage";
import Guard from '/services/middleware/Auth.js'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
