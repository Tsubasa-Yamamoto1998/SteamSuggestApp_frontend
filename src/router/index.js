import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Signup from '../views/SignupView.vue'
import Login from '../views/LoginView.vue'
import About from '../views/AboutView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
