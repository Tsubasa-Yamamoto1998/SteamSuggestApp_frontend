import { createRouter, createWebHistory } from 'vue-router'
import { useAuthCookie } from '@/stores/auth'
import HomePage from '../views/HomeView.vue'
import SignupPage from '../views/SignupView.vue'
import LoginPage from '../views/LoginView.vue'
import Confirm from '../views/ConfirmView.vue'
import GamesPage from '../views/GamesView.vue'
import AccountPage from '../views/AccountView.vue'
import EditPage from '../views/EditView.vue'
import RegisterSteamid from '../views/RegisterSteamidView.vue'
import YoutubeVideos from '../views/YoutubeVideosView.vue'
import GuestLoginView from '@/views/GuestLoginView.vue'

const routes = [
  { path: '/', component: HomePage, meta: { requiresGuestAuth: true } },
  { path: '/signup', component: SignupPage, meta: { requiresGuestAuth: true } },
  { path: '/login', component: LoginPage, meta: { requiresGuestAuth: true } },
  { path: '/confirm', component: Confirm },
  { path: '/games', component: GamesPage, meta: { requiresAuth: true } },
  { path: '/account', component: AccountPage, meta: { requiresAuth: true } },
  { path: '/edit', component: EditPage, meta: { requiresAuth: true } },
  { path: '/RegisterSteamid', component: RegisterSteamid },
  { path: '/YoutubeVideos', component: YoutubeVideos },
  { path: '/GuestLogin', component: GuestLoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authCookie = useAuthCookie()

  // 認証状態を確認
  if (!authCookie.isLoggedIn && localStorage.getItem('authToken')) {
    await authCookie.checkAuth()
  }

  if (to.meta.requiresAuth && !authCookie.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.requiresGuestAuth && !localStorage.getItem('authToken')) {
    return next('/GuestLogin')
  }

  next()
})

export default router
