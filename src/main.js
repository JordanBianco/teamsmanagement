import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/tailwind.css'

Vue.component('pagination', require('laravel-vue-pagination'));

import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

import moment from 'moment'
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
