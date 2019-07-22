import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { RouteConfig } from '@/route'
// import { RouteConfig } from '@/route'
import React from 'react'

class MyBreadcrumb extends React.Component {
  render() {
    const { location } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const path = `/${pathSnippets.slice(0, index + 1).join('/')}`
      if (path === '/Dashboard') {
        return ''
      }
      return (
        <Breadcrumb.Item key={path}>
          <Link to={path}>{this.produceBreadcrumbItem(path)}</Link>
        </Breadcrumb.Item>
      )
    })
    return [
      <Breadcrumb.Item key="Dashboard">
        <Link to="/Dashboard">首页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
  }

  produceBreadcrumbItem = path => {
    let activeBreadName = ''
    const itera = routeList => {
      for (let i = 0; i < routeList.length; i++) {
        if (routeList[i].path === path) {
          activeBreadName = routeList[i].name
        } else {
          if (routeList[i].hasOwnProperty('children')) {
            itera(routeList[i].children)
          }
        }
      }
    }
    itera(RouteConfig)
    return activeBreadName
  }
}

export default withRouter(MyBreadcrumb)
