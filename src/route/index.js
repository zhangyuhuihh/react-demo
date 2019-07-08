import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import Test from '@/views/test/test'

const Testt = lazy(() => import('../views/test/testt'))

class MyRouter extends React.Component {
  state = {
    // authArr: ['测试', '测试2'], // 放入redux进行权限判断
    routeList: [
      {
        path: '/test',
        component: Test,
        role: '测试'
      },
      {
        path: '/Testt',
        component: Testt,
        role: '测试2'
      }
    ]
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/test" />
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.routeList
            .filter(v => {
              return this.hasPermission(v)
            })
            .map(v => {
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
