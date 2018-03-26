import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/layout/index'

import example from './example'
import worksys from './worksys'
import monitor from './monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    example,
    worksys,
    monitor
  ],
})
