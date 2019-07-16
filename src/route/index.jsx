import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PageOne from '@/views/test/PageOne'

const PageTwo = lazy(() => import('../views/test/PageTwo'))

class MyRouter extends React.Component {
  state = {
    // authArr: ['测试', '测试2'], // 放入redux进行权限判断
    routeList: [
      {
        path: '/PageOne',
        component: PageOne,
        role: '权限测试1'
      },
      {
        path: '/PageTwo',
        component: PageTwo,
        role: '权限测试2'
      }
    ]
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/PageOne" />
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
