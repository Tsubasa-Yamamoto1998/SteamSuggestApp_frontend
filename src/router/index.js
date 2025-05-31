import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Signup from '../views/SignupView.vue'
import Login from '../views/LoginView.vue'
import About from '../views/AboutView.vue'
import Confirm from '../views/ConfirmView.vue'
import User from '../views/UserView.vue'
import RegisterSteamid from '../views/RegisterSteamidView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/about', component: About },
  { path: '/confirm', component: Confirm },
  { path: '/user', component: User },
  { path: '/RegisterSteamid', component: RegisterSteamid },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
