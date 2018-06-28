import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import Add from '@/components/Add'
import DocList from '@/components/DocList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/add/:id?',
            name: 'Add',
            component: Add
        },
        {
            path: '/doclist/:id',
            name: 'DocList',
            component: DocList
        }
    ]
})
