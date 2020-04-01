const Dashboard = () => import('./../views/Dashboard.vue')
import financesRoutes from './../modules/finances/router'

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // meta: Routes that needs authentization
    children: [
      ...financesRoutes
    ]
  }
]
