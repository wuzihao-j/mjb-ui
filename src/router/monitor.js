// import ConfigAdd from '../components/Monitor/ConfigAdd.vue'
// import CheckFeatureAdd from '../components/Monitor/CheckFeatureAdd.vue'
// import ConfigManager from '../components/Monitor/ConfigManager.vue'

import Vue from 'vue'
import Router from 'vue-router'
import monitor from '@/components/Monitor/monitor'

const ConfigAdd = resolve => { require(['../components/Monitor/ConfigAdd.vue'], resolve) }
const CheckFeatureAdd = resolve => { require(['../components/Monitor/CheckFeatureAdd.vue'], resolve) }
const ConfigManager = resolve => { require(['../components/Monitor/ConfigManager.vue'], resolve) }


const routers = {
  path: '/mjb-monitor',
  name: 'mjb-monitor',
  component: monitor,
  children: [

    {
      path: '/mjb-monitor/configManager',
      component: ConfigManager
    },
    {
      path: '/mjb-monitor/configAdd',
      component: ConfigAdd
    },
    {
      path: '/mjb-monitor/checkFeatureAdd',
      component: CheckFeatureAdd
    }
  ]
}
export default routers

