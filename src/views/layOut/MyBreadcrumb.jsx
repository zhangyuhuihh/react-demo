import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import React from 'react'

class MyBreadcrumb extends React.Component {
  render() {
    const { location } = this.props
    console.log('location: ', location);
    const pathSnippets = location.pathname.split('/').filter(i => i)
    console.log('pathSnippets: ', pathSnippets);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      console.log('url: ', url);
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
}

export default withRouter(MyBreadcrumb)
