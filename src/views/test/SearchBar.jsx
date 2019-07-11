import React from 'react'

import { Form, Input, Button } from 'antd'

export default class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <Form layout={'inline'}>
          <Form.Item>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">搜索</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
