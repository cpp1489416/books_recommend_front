import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import permission from './permission'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/login/register'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/my_data',
    component: Layout,
    redirect: '/my_data/recommendations',
    name: 'My Data',
    meta: { title: 'My Data', icon: 'example' },
    children: [
      {
        path: 'recommendations',
        name: 'recommendations',
        component: () => import('@/views/my_data/recommendations'),
        meta: {title: 'Recommendations', icon: 'table'}
      },
      {
        path: 'ratings',
        name: 'ratings',
        component: () => import('@/views/my_data/ratings'),
        meta: {title: 'Ratings', icon: 'table'}
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/my_data/profile'),
        meta: {title: 'Profile', icon: 'edit'}
      },
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/books',
    name: 'Data',
    meta: { title: 'Data', icon: 'example' },
    children: [
      {
        path: 'books',
        name: 'Books',
        component: () => import('@/views/data/books/index'),
        meta: { title: 'Books', icon: 'table' }
      },
      {
        hidden: true,
        path: 'books/add',
        name: 'books_add',
        component: () => import('@/views/data/books/add'),
        meta: { title: 'Add Book', icon: 'form' }
      },
      {
        hidden: true,
        path: 'books/:id',
        name: 'books_info',
        component: () => import('@/views/data/books/detail'),
        meta: { title: 'Book', icon: 'form' }
      },
      {
        hidden: true,
        path: 'books/:id/ratings',
        name: 'ratings_of_book',
        component: () => import('@/views/data/books/detail/ratings'),
        meta: { title: 'Ratings Of Book', icon: 'table' }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/data/users/index'),
        meta: { title: 'Users', icon: 'table' }
      },
      {
        hidden: true,
        path: 'users/:id/ratings',
        name: 'ratings_of_user',
        component: () => import('@/views/data/users/detail/ratings'),
        meta: { title: 'Ratings Of User', icon: 'table' }
      },
      {
        hidden: true,
        path: 'users/:id/recommendations',
        name: 'recommendations_of_user',
        component: () => import('@/views/data/users/detail/recommendations'),
        meta: {title: 'Recommendations Of User', icon: 'table'}
      },
      {
        hidden: true,
        path: 'users/:id/profile',
        name: 'profile_of_user',
        component: () => import('@/views/data/users/detail/profile'),
        meta: {title: 'Profile Of User', icon: 'form'}
      },
    ],
  },
  {
    path: '/metrics',
    component: Layout,
    redirect: '/metrics/precision',
    name: 'Metrics',
    meta: { title: 'Metrics', icon: 'example' },
    children: [
      {
        path: 'precision',
        name: 'precision',
        component: () => import('@/views/metrics/precision'),
        meta: {title: 'Precision', icon: 'chart'}
      },
      {
        path: 'recall',
        name: 'recall',
        component: () => import('@/views/metrics/recall'),
        meta: {title: 'Recall', icon: 'chart'}
      },
      {
        path: 'coverage',
        name: 'coverage',
        component: () => import('@/views/metrics/coverage'),
        meta: {title: 'Coverage', icon: 'chart'}
      },
    ]
  },
  {
    hidden: true,
    path: '/3d',
    component: Layout,
    redirect: '/3d/',
    name: 'Data',
    meta: { title: 'Data', icon: 'example' },
    children: [
      {
        path: 'example',
        name: '3d',
        component: () => import('@/views/tree/index'),
        meta: { title: '3d', icon: 'example' }
      }
    ]
  },

  {
    hidden: true,
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/cxc6922',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

var router =  new Router({
  // mode: 'history', //后端支持可开
  base: '/books_recommend/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

permission(router)

export { router }

export default router
