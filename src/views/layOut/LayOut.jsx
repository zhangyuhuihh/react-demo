import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MyRouter from '@/route'
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
    menuList: [
      {
        name: '测试',
        role: '权限测试1',
        path: '/subTestOne',
        icon: 'menu',
        children: [
          {
            name: '子页面1',
            path: '/PageOne',
            role: '权限测试3',
            icon: '',
            children: [
              {
                name: '测试2',
                path: '/PageTwo',
                role: '权限测试2',
                icon: 'menu',
                children: [
                  {
                    name: '测试2',
                    path: '/PageTwo2',
                    role: '权限测试2',
                    icon: 'menu'
                  }
                ]
              }
            ]
          }
        ]
      }
      // {
      //   name: '测试2',
      //   path: '/PageTwo',
      //   role: '权限测试2',
      //   icon: 'menu'
      // }
    ]
  }

  componentWillMount() {
    // 这里不能用componentDidMount
    const { pathname } = this.props.history.location
    const { menuList } = this.state
    const defaultOpenKeys = this.findDefaultOpenKeys(menuList, pathname)
    console.log('defaultOpenKeys: ', defaultOpenKeys)
    this.setState({
      defaultSelectedKeys: [pathname],
      defaultOpenKeys: defaultOpenKeys
    })
  }

  findDefaultOpenKeys = (menuList, pathname) => {
    // 探究迭代的本质
    const saveMenuList = _.cloneDeep(menuList)
    let arr = []
    const diedai = (menuList, pathname) => {
      for (let i in menuList) {
        if (menuList[i].hasOwnProperty('children')) {
          for (let k in menuList[i].children) {
            if (menuList[i].children[k].path === pathname) {
              arr.unshift(menuList[i].path)
              diedai(saveMenuList, menuList[i].path)
            } else {
              diedai(menuList[i].children, pathname)
            }
          }
        }
      }
    }
    diedai(menuList, pathname)
    return arr
  }

  render() {
    console.log(this.state.defaultSelectedKeys)
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
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <MyRouter />
          </Content>
        </Layout>
      </Layout>
    )
  }

  renderMenu() {
    return this.iterateMenu(this.state.menuList)
  }

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
