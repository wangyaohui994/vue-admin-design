import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './router/auth'

import './assets/icon-fonts/iconfont.css'
import './assets/icon-fonts/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
// import Base64 from 'js-base64'


import moment from "moment"

Vue.prototype.$moment = moment

// Vue.use(Base64)
Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
