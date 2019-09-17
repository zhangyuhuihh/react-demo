/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Dropdown, Icon, Menu, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import { logout } from '@/assets/api/getAuth'

class TopRightDrop extends React.Component {
  constructor() {
    super()
    this.state = {
      currentHost: '',
      LoginUrl: ''
    }
  }

  componentDidMount() {
    const host = window.location.host
    this.setState({
      currentHost: host,
      LoginUrl: `http://${host}/web_login/`
    })
  }

  renderRoleDrop = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Dashboard">首页</Link>
        </Menu.Item>
        {/* <Menu.Item>
          <span>修改密码</span>
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item onClick={this.handleLogOut}>
          <span>退出</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <span style={{ cursor: 'pointer' }}>
          超级管理员 <Icon type="down" />
        </span>
      </Dropdown>
    )
  }

  handleJumpToSysterm = url => {
    window.open(url)
  }

  handleLogOut = () => {
    Modal.confirm({
      title: '登出',
      content: '确认登出?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.doLogOut()
      },
      onCancel: () => {
        message.info('取消登出')
      }
    })
  }

  doLogOut = () => {
    logout().then(() => {
      message.success('成功登出')
    })
  }

  renderControlDrop = () => {
    const { currentHost } = this.state
    const menu = (
      <Menu>
        <Menu.Item>
          <span
            onClick={() =>
              this.handleJumpToSysterm(
                `http://${currentHost}/web_crm/home/index`
              )
            }
          >
            客户关系管理
          </span>
        </Menu.Item>
        <Menu.Item>
          <span
            onClick={() =>
              this.handleJumpToSysterm(
                `http://${currentHost}/web_pm/home/index`
              )
            }
          >
            物业管理
          </span>
        </Menu.Item>
        {/* <Menu.Item>
          <span
            onClick={() =>
              this.handleJumpToSysterm(`http://${currentHost}/terminal_manage/`)
            }
          >
            终端管理
          </span>
        </Menu.Item> */}
        <Menu.Item>
          <span
            onClick={() =>
              this.handleJumpToSysterm(
                `http://${currentHost}/web_park/smartParkingManage/workStage`
              )
            }
          >
            停车场管理
          </span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <span style={{ cursor: 'pointer' }}>
          控制台 <Icon type="down" />
        </span>
      </Dropdown>
    )
  }

  render() {
    return (
      <div>
        {/* <div style={{ float: 'right' }}>{this.renderControlDrop()}</div> */}
        <div style={{ float: 'right', marginRight: '20px' }}>
          {this.renderRoleDrop()}
        </div>
      </div>
    )
  }
}

export default TopRightDrop
