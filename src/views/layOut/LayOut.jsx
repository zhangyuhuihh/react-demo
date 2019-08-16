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
    selectedKeys: [],
    openKeys: [],
    menuList: []
  }

  componentWillMount() {
    // 这里不能用componentDidMount
    this.initMenu()
  }

  componentWillReceiveProps() {
    // 这个生命周期，类似于computed,在props变化的时候派生出状态给state。或者类似于watch,在props变化的时候，做点什么
    this.initMenu()
  }

  initMenu = () => {
    // 这里是所谓的“派生”状态，即state 依赖 props 的情况该如何处理（但是这里也有小小的不同，这里的props其实是相当于一个初始的值，“init”的概念
    // 类比vue的computed计算属性，派生状态的区别
    const { pathname } = this.props.history.location
    const newMenuList = this.produceNewMenuList(RouteConfig)
    const newOpenKeys = this.findopenKeys(newMenuList, pathname).concat(
      this.state.openKeys
    )
    this.setState({
      selectedKeys: [pathname],
      openKeys: newOpenKeys,
      menuList: newMenuList
    })
  }

  // 适用上述格式多层级菜单,这里由于迭代，算重了，所以返回结果去重
  findopenKeys = (menuList, pathname) => {
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
    return (
      <Layout className={'local_layout_container'}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
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

  // menu的openKeys一旦定义，就变成了了完全受控组件，所有的东西都要自己通过更新react的state来更新所有状态
  handleSubMenuClick = ({ key }) => {
    let newOpenKeys = []
    const isHave = this.state.openKeys.includes(key)
    if (isHave) {
      newOpenKeys = this.state.openKeys.filter(v => v !== key)
    } else {
      newOpenKeys = [...this.state.openKeys, key]
    }
    this.setState({
      openKeys: newOpenKeys
    })
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

const mapDispatchToProps = {
  addVisitiedViews
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyLayOut)
)
