import Vue from 'vue'
import Router from 'vue-router'
import ContentWrap from '@/frames/ContentWrap'
import Main from '../pages/Main'//需要跳转的页面 给组件重新命名
import View from '../pages/View'
import Hello from '../pages/Hello'
import Firm from '@/pages/Firm'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ContentWrap',
            component: ContentWrap,
            children: [
                {//首页
                    path: '/Main',
                    name: 'Main',
                    component: Main
                },
                {//需要跳转的页面
                    path: '/View',
                    name: 'View',
                    component: View//组件名字
                },
                {//需要跳转的页面
                    path: '/Hello',
                    name: 'Hello',
                    component: Hello//组件名字
                }
            ]
        },
        {
            path: '/Firm',
            name: 'Firm',
            component: Firm
        }
    ]
})
