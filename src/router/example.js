// 2018/1/15 by DKZ

import Vue from 'vue'
import Router from 'vue-router'
import example from '@/components/example/example'

const search =resolve => {require(['../components/example/search.vue'], resolve)}

const example_router ={
    path: '/example',
    name: 'example',
    component: example,
    children: [
        {
            path: '/example/search',
            name: 'search',
            component: search,
        },
    ]
}

export default example_router;