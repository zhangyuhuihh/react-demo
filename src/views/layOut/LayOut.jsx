import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MyBreadcrumb from './MyBreadcrumb'
import AppMain from './AppMain'
import { RouteConfig } from '@/route'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

// @connect(mapStateToProps, mapDispatchToProps) es6:Decorator
class MyLayOut extends React.Component {
  state = {
    collapsed: false,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    menuList: []
  }

  componentWillMount() {
    // 这里不能用componentDidMount
    const { pathname } = this.props.history.location
    const newMenuList = this.produceNewMenuList(RouteConfig)
    const defaultOpenKeys = this.findDefaultOpenKeys(newMenuList, pathname)
    this.setState({
      defaultSelectedKeys: [pathname],
      defaultOpenKeys: defaultOpenKeys,
      menuList: newMenuList
    })
  }

  // 适用上述格式多层级菜单
  findDefaultOpenKeys = (menuList, pathname) => {
    const saveMenuList = _.cloneDeep(menuList)
    let arr = []
    const itera = (menuList, pathname) => {
      for (let i in menuList) {
        if (menuList[i].hasOwnProperty('children')) {
          for (let k in menuList[i].children) {
            if (menuList[i].children[k].path === pathname) {
              arr.unshift(menuList[i].path)
              // 关键迭代
              itera(saveMenuList, menuList[i].path)
            } else {
              itera(menuList[i].children, pathname)
            }
          }
        }
      }
    }
    itera(menuList, pathname)
    return arr
  }

  produceNewMenuList = RouteConfig => {
    let arr = []
    for (let i in RouteConfig) {
      if (RouteConfig[i].hasOwnProperty('children')) {
        arr[i] = {
          ..._.omit(RouteConfig[i], ['component']),
          children: this.produceNewMenuList(RouteConfig[i].children)
        }
      } else {
        arr[i] = _.omit(RouteConfig[i], ['component'])
      }
    }
    return arr
  }

  render() {
    return (
      <Layout className={'local_layout_container'}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultOpenKeys={this.state.defaultOpenKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            {this.iterateMenu(this.state.menuList)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <MyBreadcrumb />
          </Header>
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

  renderMenu() {
    return this.iterateMenu(this.state.menuList)
  }

  // 适用上述格式多层级菜单
  iterateMenu(menuList) {
    let target = []
    for (let i in menuList) {
      if (this.hasPermission(menuList[i])) {
        if (menuList[i].hasOwnProperty('children')) {
          target[i] = (
            <SubMenu
              key={menuList[i].path}
              title={
                <span>
                  {menuList[i].icon ? <Icon type={menuList[i].icon} /> : null}
                  <span>{menuList[i].name}</span>
                </span>
              }
            >
              {this.iterateMenu(menuList[i].children)}
            </SubMenu>
          )
        } else {
          target[i] = (
            <Menu.Item key={menuList[i].path}>
              <Link to={menuList[i].path}>
                {menuList[i].icon ? <Icon type={menuList[i].icon} /> : null}
                <span>{menuList[i].name}</span>
              </Link>
            </Menu.Item>
          )
        }
      }
    }
    return target
  }

  hasPermission(v) {
    return this.props.authArr.includes(v.role)
  }

  // https://www.jianshu.com/p/77e48c129c16

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

const mapStateToProps = state => {
  return {
    authArr: state.authArr
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MyLayOut)
)
