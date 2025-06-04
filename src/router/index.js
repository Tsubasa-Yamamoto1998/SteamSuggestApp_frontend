import { createRouter, createWebHistory } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import HomePage from '../views/HomeView.vue'
import SignupPage from '../views/SignupView.vue'
import LoginPage from '../views/LoginView.vue'
import AboutPage from '../views/AboutView.vue'
import Confirm from '../views/ConfirmView.vue'
import GamesPage from '../views/GamesView.vue'
import AccountPage from '../views/AccountView.vue'
import RegisterSteamid from '../views/RegisterSteamidView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },
  { path: '/about', component: AboutPage },
  { path: '/confirm', component: Confirm },
  { path: '/games', component: GamesPage, meta: { requiresAuth: true } },
  { path: '/account', component: AccountPage, meta: { requiresAuth: true } },
  { path: '/RegisterSteamid', component: RegisterSteamid },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authCookie = useAuthCookie()
  if (to.meta.requiresAuth && !authCookie.isLoggedIn) {
    next('/login') // ログインページにリダイレクト
  } else {
    next() // 通常の遷移
  }
})

export default router
