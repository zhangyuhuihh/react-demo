import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { RouteConfig } from '@/route'

class AppMain extends React.Component {
  render() {
    return (
      <Switch>su
        <Redirect exact from="/" to="/Login" />
        {/* Redirect不能放在 Suspense里面*/}
        {this.produceRoute(RouteConfig).arr2}
        <Suspense fallback={<div>Loading...</div>}>
          {this.produceRoute(RouteConfig).arr1}
        </Suspense>
      </Switch>
    )
  }

  produceRoute = RouteConfigs => {
    let arr1 = []
    let arr2 = []
    const itera = routeList => {
      for (let i = 0; i < routeList.length; i++) {
        if (this.hasPermission(routeList[i])) {
          if (routeList[i].hasOwnProperty('component')) {
            arr1.push(
              <Route
                path={routeList[i].path}
                name={routeList[i].role}
                component={routeList[i].component}
                key={routeList[i].path}
              />
            )
          } else {
            if (routeList[i].hasOwnProperty('redirect')) {
              arr2.push(
                <Redirect
                  exact
                  from={routeList[i].path}
                  to={routeList[i].redirect}
                  key={routeList[i].path}
                />
              )
            }
            itera(routeList[i].children)
          }
        }
      }
    }
    itera(RouteConfigs)
    return {
      arr1,
      arr2
    }
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
)(AppMain)
