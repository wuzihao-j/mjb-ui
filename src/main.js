// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Element from 'element-ui'
import './assets/scss/element.scss'

import {wtf} from './vendor/wtf/wtf'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routers from './router/monitor.js'

Vue.config.productionTip = false

Vue.prototype.$wtf=wtf;
Vue.use(Element, { size: 'small' })

Vue.use(VueResource);
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(routers)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


