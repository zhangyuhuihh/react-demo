import React from 'react'
import { Layout, Icon } from 'antd'
import MyBreadcrumb from './MyBreadcrumb'
import AppMain from './AppMain'
import { RouteConfig } from '@/route'
import TagsView from '@/components/TagsView'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addVisitiedViews } from '@/store/action'
// import _ from 'lodash'
import TopRightDrop from './TopRightDrop'
import SideMenu from './SideMenu'

import { HasPermissionContext } from '@/assets/contexts/HasPermissionContext'

const { Header, Sider, Content } = Layout

// @connect(mapStateToProps, mapDispatchToProps) es6:Decorator
class MyLayOut extends React.Component {
  static contextType = HasPermissionContext
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentDidMount() {
    const { addVisitiedViews } = this.props
    const { pathname, state } = this.props.history.location
    console.log('pathname: ', pathname);
    const tagName = this.findCurrentTagName(pathname)
    addVisitiedViews({
      routeName: tagName,
      path: pathname,
      state: state
    })
  }

  componentDidUpdate(preProps) {
    const { addVisitiedViews } = this.props
    const { pathname, state } = this.props.history.location
    const tagName = this.findCurrentTagName(pathname)
    addVisitiedViews({ // 这种情况必须非常小心
      routeName: tagName,
      path: pathname,
      state: state
    })
  }

  findCurrentTagName(pathname) {
    let currentName = ''
    const itera = list => {
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (element.path !== pathname) {
          if (element.hasOwnProperty('children')) {
            itera(element.children)
          }
        } else {
          if (element.hasOwnProperty('component')) {
            // 避免添加二级菜单到TagsView上
            currentName = element.name
          }
        }
      }
    }
    itera(RouteConfig)
    return currentName
  }

  render() {
    return (
      <Layout className={'local_layout_container'}>
        <Sider
          style={{
            overflowX: 'hidden'
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <SideMenu></SideMenu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <MyBreadcrumb />
            <div style={{ float: 'right', marginRight: '20px' }}>
              <TopRightDrop></TopRightDrop>
            </div>
          </Header>
          <TagsView />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <AppMain />
          </Content>
        </Layout>
      </Layout>
    )
  }

  toggle = () => {
    if (!this.state.collapsed) {
      this.setState({
        cacheOpenKeys: []
      })
    }
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

const mapDispatchToProps = {
  addVisitiedViews
}

export default withRouter(connect(null, mapDispatchToProps)(MyLayOut))
