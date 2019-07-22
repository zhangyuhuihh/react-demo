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
        {this.produceRoute(RouteConfig).redirectArr}
        <Suspense fallback={<div>Loading...</div>}>
          {this.produceRoute(RouteConfig).routeArr}
        </Suspense>
      </Switch>
    )
  }

  produceRoute = RouteConfigs => {
    let routeArr = []
    let redirectArr = []
    const itera = routeList => {
      for (let i = 0; i < routeList.length; i++) {
        if (this.hasPermission(routeList[i])) {
          if (routeList[i].hasOwnProperty('component')) {
            routeArr.push(
              <Route
                path={routeList[i].path}
                name={routeList[i].role}
                component={routeList[i].component}
                key={routeList[i].path}
              />
            )
          } else {
            if (routeList[i].hasOwnProperty('redirect')) {
              redirectArr.push(
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
      routeArr,
      redirectArr
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
