import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import SinglePage from '@/views/test/SinglePage'
import Login from '@/views/login/Login.jsx'
import MyLayOut from './layOut/LayOut'
import noMatch from './test/noMatch'
import { RouteConfig } from '@/route'
import _ from 'lodash'

function flattern(RouteConfig) {
  let arr = []
  const itera = list => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i]
      if (element.hasOwnProperty('children')) {
        itera(element.children)
      }
      arr.push(_.omit(element, ['children']))
    }
  }
  itera(RouteConfig)
  return arr
}

const FlatternRouteConfig = flattern(RouteConfig)
const singleRouteList = ['/', '/Login', '/SinglePage']

class HomePage extends React.Component {
  render() {
    const { location } = this.props
    const { pathname } = location
    const targetRouter = FlatternRouteConfig.some(v => v.path === pathname)

    if (targetRouter || singleRouteList.includes(pathname)) {
      return (
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SinglePage" component={SinglePage} />
          {/* 这里相当于做了一个全局的路由守卫（'/'不用exact），神之一手 */}
          <Route
            path="/"
            render={() => {
              return sessionStorage.getItem('userId') ? (
                <MyLayOut />
              ) : (
                <Redirect to="/Login" />
              )
            }}
          ></Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route component={noMatch}></Route>
        </Switch>
      )
    }
  }
}

export default withRouter(HomePage)
