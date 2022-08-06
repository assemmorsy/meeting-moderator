import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/auth/LoginView.vue"
import SignUpView from "@/views/auth/SignUpView.vue"
import MeetingsView from "@/views/MeetingsView.vue"
import MeetingView from "@/views/MeetingView.vue"

import { projectAuth } from '@/firebase/config'

// route Guards

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next()
  } else {
    next({ name: "login" })
  }
}

const AlreadyAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: "home" })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: AlreadyAuth
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    beforeEnter: AlreadyAuth
  },
  {
    path: '/meetings',
    name: 'meetings',
    component: MeetingsView,
    beforeEnter: requireAuth
  },
  {
    path: '/meeting/:id',
    name: 'meeting',
    component: MeetingView,
    beforeEnter: requireAuth,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
