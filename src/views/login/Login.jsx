import { Form, Icon, Input, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import React from 'react'
import moduleCss from './login.module.scss'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.history.push('/PageOne')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={moduleCss.login_form}>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [{ required: true, message: '请输入用户名!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)} */}
          {/* <a className={moduleCss.login_form_forgot} href="">
            Forgot password
          </a> */}
          <Button
            type="primary"
            htmlType="submit"
            className={moduleCss.login_form_button}
          >
            登录
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    )
  }
}

const WrappeNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)

class Login extends React.Component {
  render() {
    console.log(this.props.history)
    return (
      <div className={moduleCss.login_container}>
        <div>
          <div className={moduleCss.login_title}>后台管理系统</div>
          <WrappeNormalLoginForm {...this.props} />
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
