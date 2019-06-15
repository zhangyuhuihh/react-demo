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
        // 这里及是阮一峰的书里所说，通常类的方法内部的this指向的是类的实例
        // 但是onclick绑定方法之后，相当于书里的“将此方法单独拿出来”（绑定到外部）
        // 所以在运行时，this的指向会像书里说的那样报错，所以必须在这里绑定this
        // 通常如果没有绑定在事件上时，this就是上面的指向类的实例，这时候是可以拿到
        // 这里绑定的handleJump的方法的,this.handleJump是可以的

        // this.handleJump是可以调用的，但是handleJump这个函数里面的this的指向是个问题,
        // 如果采用不绑定this的做法，handleJump这个方法是会执行的，但是如果内部如果用到了此组件内部的属性，将会报错（及上面的原因）
        // 如果绑定了this，主要的还是handleJump这个方法里面的this的指向可以正常拿到
        <Menu.Item onClick={this.handleJump} key={v.key}>
          {v.name}
        </Menu.Item>
      )
    })
  }

  handleJump(path) {
    console.log('hahahah')
    // this.props.history.push(path)
  }
}

export default withRouter(LeftPart)
