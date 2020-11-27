/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/device-alert',
    component: () => import('@/views/device-alert/device-alert')
  },
  {
    path: '/device-register-info',
    component: () => import('@/views/device-register-info/device-register-info')
  },
  {
    path: '/add-select',
    component: () => import('@/views/add-select/add-select')
  },
  {
    path: '/add-code',
    component: () => import('@/views/add-code/add-code')
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false, requireAuth: true }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  }
]
