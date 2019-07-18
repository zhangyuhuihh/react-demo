import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { RouteConfig } from '@/route'

class AppMain extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/Login" />
        <Suspense fallback={<div>Loading...</div>}>
          {this.produceRoute(RouteConfig)}
        </Suspense>
      </Switch>
    )
  }

  produceRoute = RouteConfigs => {
    let arr = []
    const itera = routeList => {
      for (let i = 0; i < routeList.length; i++) {
        if (this.hasPermission(routeList[i])) {
          if (routeList[i].hasOwnProperty('component')) {
            arr.push(
              <Route
                path={routeList[i].path}
                name={routeList[i].role}
                component={routeList[i].component}
                key={routeList[i].path}
              />
            )
          } else {
            itera(routeList[i].children)
          }
        }
      }
    }
    itera(RouteConfigs)
    return arr
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
