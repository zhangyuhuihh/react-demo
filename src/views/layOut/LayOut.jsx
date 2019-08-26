import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MyBreadcrumb from './MyBreadcrumb'
import AppMain from './AppMain'
import { RouteConfig } from '@/route'
import TagsView from '@/components/TagsView'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addVisitiedViews } from '@/store/action'
import _ from 'lodash'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

// @connect(mapStateToProps, mapDispatchToProps) es6:Decorator
class MyLayOut extends React.Component {
  state = {
    collapsed: false,
    menuList: [],
    count: 0 // 用来刷新菜单
  }
  cacheOpenKeys = []

  componentWillMount() {
    this.initMenu()
  }

  initMenu = () => {
    const newMenuList = this.produceNewMenuList(RouteConfig)
    this.setState({
      menuList: newMenuList
    })
  }

  // 适用上述格式多层级菜单,这里由于迭代，算重了，所以返回结果去重
  finddefaultOpenKeys = (menuList, pathname) => {
    if (this.state.collapsed) {
      return []
    }
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
    return _.uniq(arr)
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
    const { pathname } = this.props.history.location
    const { menuList } = this.state
    const newdefaultOpenKeys = this.finddefaultOpenKeys(
      menuList,
      pathname
    ).concat(this.cacheOpenKeys)
    this.cacheOpenKeys = newdefaultOpenKeys
    return (
      <Layout className={'local_layout_container'}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            key={pathname + this.state.count}
            // 暂时没找到更优雅地方式，有点挫啊大哥
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={newdefaultOpenKeys}
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
              onTitleClick={this.handleSubMenuClick}
            >
              {this.iterateMenu(menuList[i].children)}
            </SubMenu>
          )
        } else {
          target[i] = (
            <Menu.Item
              key={menuList[i].path}
              onClick={v => this.handleChangeMenu(v, menuList[i])}
            >
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

  handleChangeMenu = (params, menu) => {
    const { addVisitiedViews } = this.props
    addVisitiedViews({
      routeName: menu.name,
      path: menu.path
    })
  }

  handleSubMenuClick = ({ key }) => {
    let newdefaultOpenKeys = []
    const isHave = this.cacheOpenKeys.includes(key)
    if (isHave) {
      newdefaultOpenKeys = this.cacheOpenKeys.filter(v => v !== key)
    } else {
      newdefaultOpenKeys = [...this.cacheOpenKeys, key]
    }
    this.cacheOpenKeys = newdefaultOpenKeys
  }

  hasPermission(v) {
    return this.props.authArr.includes(v.role)
  }

  // https://www.jianshu.com/p/77e48c129c16

  toggle = () => {
    if (!this.state.collapsed) {
      this.cacheOpenKeys = []
      this.handleSubMenuClick = () => {} // 牛皮，骚操作，清空函数
    }
    this.setState({
      collapsed: !this.state.collapsed,
      count: this.state.count + 1
    })
  }
}

const mapStateToProps = state => {
  return {
    authArr: state.authArr
  }
}

const mapDispatchToProps = {
  addVisitiedViews
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyLayOut)
)
