// 2018/1/22 by DKZ

import Vue from 'vue'
import Router from 'vue-router'
import worksys from '@/components/worksys/worksys'

const register_setting = resolve => { require(['../components/worksys/register_setting.vue'], resolve) }
const datasource_setting = resolve => { require(['../components/worksys/datasource_setting.vue'], resolve) }
const work_operate = resolve => { require(['../components/worksys/work_operate.vue'], resolve) }
const work_operate_detail = resolve => { require(['../components/worksys/work_operate_detail.vue'], resolve) }
const workServer_operate = resolve => { require(['../components/worksys/workServer_operate.vue'], resolve) }
const workServer_operate_detail = resolve => { require(['../components/worksys/workServer_operate_detail.vue'], resolve) }
const history_path = resolve => { require(['../components/worksys/history_path.vue'], resolve) }
const history_status = resolve => { require(['../components/worksys/history_status.vue'], resolve) }
const work_properties = resolve => { require(['../components/worksys/work_properties.vue'], resolve) }


const worksys_router = {
    path: '/worksys',
    name: 'worksys',
    component: worksys,
    children: [{
        path: '/worksys/register_setting',
        name: 'register_setting',
        component: register_setting,
    }, {
        path: '/worksys/datasource_setting',
        name: 'datasource_setting',
        component: datasource_setting,
    }, {
        path: '/worksys/work_operate',
        name: 'work_operate',
        component: work_operate,
    }, {
        path: '/worksys/work_operate_detail',
        name: 'work_operate_detail',
        component: work_operate_detail,
    }, {
        path: '/worksys/workServer_operate',
        name: 'workServer_operate',
        component: workServer_operate,
    }, {
        path: '/worksys/workServer_operate_detail',
        name: 'workServer_operate_detail',
        component: workServer_operate_detail,
    }, {
        path: '/worksys/history_path',
        name: 'history_path',
        component: history_path,
    }, {
        path: '/worksys/history_status',
        name: 'history_status',
        component: history_status,
    },  {
        path: '/worksys/work_properties',
        name: 'work_properties',
        component: work_properties,
    }, ]
}

export default worksys_router;
