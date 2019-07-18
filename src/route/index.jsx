import { lazy } from 'react'

export const RouteConfig = [
  {
    name: '首页',
    path: '/Dashboard',
    component: lazy(() => import('../views/test/Dashboard')),
    role: '首页权限',
    icon: 'menu'
  },
  {
    name: '二级菜单',
    role: '二级菜单',
    path: '/twoLevelMenu',
    icon: 'menu',
    children: [
      {
        name: '二级菜单-1',
        path: '/twoLevelMenu/PageOne',
        component: lazy(() => import('../views/test/twoLevelMenu/PageOne')),
        role: '二级菜单-1',
        icon: ''
      }
    ]
  },
  {
    name: '三级菜单',
    role: '三级菜单',
    path: '/threeLevelMenu',
    icon: 'menu',
    children: [
      {
        name: '三级菜单-1',
        path: '/threeLevelMenu/PageOne',
        component: lazy(() => import('../views/test/threeLevelMenu/PageOne')),
        role: '三级菜单-1',
        icon: ''
      },
      {
        name: '三级菜单-2',
        path: '/threeLevelMenu/threeLevelMenu-sub',
        role: '三级菜单-2',
        icon: 'menu',
        children: [
          {
            name: '三级菜单-2-1',
            path: '/threeLevelMenu/threeLevelMenu-sub/PageTwo',
            component: lazy(() => import('../views/test/threeLevelMenu/PageTwo')),
            role: '三级菜单-2-1',
            icon: ''
          }
        ]
      }
    ]
  }
]
