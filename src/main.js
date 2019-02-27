import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'

import store from './config/store'
import router from './config/router'
import './registerServiceWorker'

import VueAWN from 'vue-awesome-notifications'
const optionsAWN = { position: 'top-rigth' }
Vue.use(VueAWN, optionsAWN)

import VueLodash from 'vue-lodash'
const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
