import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'
// import { RouteConfig } from '@/route'
import React from 'react'

class MyBreadcrumb extends React.Component {
  render() {
    const { location } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{url}</Link>
        </Breadcrumb.Item>
      )
    })
    return [
      <Breadcrumb.Item key="Dashboard">
        <Link to="/Dashboard">首页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
  }

  produceBreadcrumbItem = () => {
    
  }
}

export default withRouter(MyBreadcrumb)
