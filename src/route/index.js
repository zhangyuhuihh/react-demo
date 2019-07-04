import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Test from '@/views/test/test'
import Testt from '@/views/test/testt'

export default class MyRouter extends React.Component {
  state = {
    authArr: ['测试', '测试2'], // todo,放入redux进行权限判断
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
        {this.state.routeList
          .filter(v => {
            return this.hasPermission(v)
          })
          .map(v => {
            return (
              <Route path={v.path} component={v.component} key={v.path} />
            )
          })}
      </Switch>
    )
  }

  hasPermission(v) {
    return this.state.authArr.includes(v.role)
  }
}
