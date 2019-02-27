import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

import Auth from '@/components/auth/Auth'
import Forgot from '@/components/auth/Forgot'

import Hello from '@/components/HelloWorld'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'HelloWorld',
        path: '/HelloWorld',
        component: Hello,
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages,
        meta: { requiresAdmin: true },
    },

    {
        name: 'auth',
        path: '/auth',
        component: Auth,
    },
    {
        name: 'forgot',
        path: '/forgot',
        component: Forgot,
    },
]

const router = new VueRouter({
    //mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if (to.path === '/forgot/') {
        store.state.isForgot = true
        return next()
    }

    if (!store.state.isForgot) {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            const user = JSON.parse(json)
            user && user.admin ? next() : next({ path: '/' })
        } else {
            next()
        }
    }
})

export default router
