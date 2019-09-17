import { lazy } from 'react'

/**
 * name: 路由对应的名称
 * role: 路由对应的权限名称
 * component: 路由对应的组件
 * path: 路由对应的path(子路由的path需加上对应所有父级的path)
 * icon: 图标
 * redirect: 决定此路由是否是大菜单，以跳转到对应的子路由
 * children: 大菜单，子路由
 * hidden: 是否隐藏(true隐藏，默认打开)
 */


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
    redirect: '/twoLevelMenu/PageOne',
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
    redirect: '/threeLevelMenu/PageOne',
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
        redirect: '/threeLevelMenu/threeLevelMenu-sub/PageTwo',
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
  },
  {
    name: 'expressDemo',
    path: '/expressDemo',
    component: lazy(() => import('../views/expressDemo')),
    role: 'express测试',
    icon: 'menu'
  }
]
