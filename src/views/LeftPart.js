import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu
const menuConfig = [
  {
    name: '菜单一',
    key: '1',
    sub: [
      {
        name: '子菜单一',
        key: '11',
        route: 'test'
      }
    ]
  },
  {
    name: '菜单二',
    key: '2',
    sub: [
      {
        name: '子菜单一',
        key: '21',
        route: 'testt'
      }
    ]
  },
  {
    name: '菜单三',
    key: '3',
    sub: [
      {
        name: '子菜单一',
        key: '31',
        route: 'test3'
      }
    ]
  },
  {
    name: '菜单四',
    key: '4',
    sub: [
      {
        name: '子菜单一',
        key: '41',
        route: 'test4'
      }
    ]
  }
]

class LeftPart extends React.Component {
  // constructor(props, context) {
  //   super(props, context)
  // }

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

  state = {
    openKeys: ['sub1']
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  render() {
    return (
      <Menu
        mode="inline"
        theme="dark"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
      >
        {this.renderSubMenu()}
      </Menu>
    )
  }

  renderSubMenu() {
    return menuConfig.map(v => {
      return (
        <SubMenu
          key={v.key}
          title={
            <span>
              <Icon type="mail" />
              <span>{v.name}</span>
            </span>
          }
        >
          {this.renderMenuItem(v.sub)}
        </SubMenu>
      )
    })
  }

  renderMenuItem(item) {
    return item.map(v => {
      return (
        <Menu.Item
          onClick={() => {
            this.handleJump(v.route)
          }}
          key={v.key}
        >
          {v.name}
        </Menu.Item>
      )
    })
  }

  handleJump(path) {
    this.props.history.push(path)
  }
}

export default withRouter(LeftPart)
