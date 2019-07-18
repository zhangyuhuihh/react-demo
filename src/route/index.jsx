import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

const Dashboard = lazy(() => import('../views/test/Dashboard'))
const TwoLevelPageOne = lazy(() => import('../views/test/twoLevelMenu/PageOne'))
// const TwoLevelPageTwo = lazy(() => import('../views/test/twoLevelMenu/PageTwo'))

const ThreeLevelPageOne = lazy(() => import('../views/test/threeLevelMenu/PageOne'))
const ThreeLevelPageTwo = lazy(() => import('../views/test/threeLevelMenu/PageTwo'))
class MyRouter extends React.Component {
  state = {
    // authArr: ['测试', '测试2'], // 放入redux进行权限判断
    routeList: [
      {
        path: '/Dashboard',
        component: Dashboard,
        role: '首页权限'
      },
      // {
      //   path: '/twoLevelMenu',
      //   component: TwoLevelPageOne,
      //   role: '二级菜单'
      // },
      {
        path: '/twoLevelMenu/PageOne',
        component: TwoLevelPageOne,
        role: '二级菜单-1'
      },
      // {
      //   path: '/threeLevelMenu',
      //   component: TwoLevelPageOne,
      //   role: '三级菜单'
      // },
      {
        path: '/threeLevelMenu/PageOne',
        component: ThreeLevelPageOne,
        role: '三级菜单-1'
      },
      {
        path: '/threeLevelMenu/threeLevelMenu-sub/PageTwo',
        component: ThreeLevelPageTwo,
        role: '三级菜单-2-1'
      }
    ]
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/Login" />
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.routeList
            .filter(v => {
              return this.hasPermission(v)
            })
            .map(v => {
              // todo 这里可以添加全局路由守卫
              return (
                <Route path={v.path} component={v.component} key={v.path} />
              )
            })}
        </Suspense>
      </Switch>
    )
  }

  hasPermission(v) {
    return this.props.authArr.includes(v.role)
  }
}

const mapStateToProps = state => {
  // 1.尽量不要添加ownProps
  return {
    authArr: state.authArr
  }
}

export default connect(
  mapStateToProps,
  null
)(MyRouter)
