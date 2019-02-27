import axios from 'axios'
import { userKey } from '@/global'
import store from './store'

const success = res => res
const error = err => {
    if (401 === err.response.status) {
        //const json = localStorage.getItem(userKey)
        //const userData = JSON.parse(json)
        store.commit('setUser', null)
        localStorage.removeItem(userKey)

        if (!store.state.isForgot) {
            if (store.user) {
                window.location = '/'
            }
        }
        console.log('Erro 401 - ', err.response)
        return Promise.reject(err.response.data)
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)
