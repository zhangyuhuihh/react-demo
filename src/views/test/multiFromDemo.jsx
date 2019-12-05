import React from 'react'

import { Form, Input, Icon, Button } from 'antd'
import _ from 'lodash'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

// tree的数据结构
const treeData = [
  {
    location: '1',
    name: '第一层',
    coreList: [
      { location: '4', name: '第一层子一' },
      { location: '5', name: '第一层子二' }
    ]
  },
  {
    location: '2',
    name: '第一层',
    coreList: [
      {
        location: '6',
        name: '第一层子一',
        coreList: [{ location: '8', name: '第一层子子一' }]
      }
    ]
  },
  {
    location: '3',
    name: '第一层',
    coreList: [
      { location: '7', name: '第一层子一' },
      { location: '9', name: '第一层子二' },
      { location: '10', name: '第一层子三' }
    ]
  }
]

let id = 0

function getObjectByPath(obj, path) {
  let tempObj = obj
  let keyArr = path.split('.')
  for (let i = 0; i < keyArr.length; i++) {
    let key = keyArr[i]
    if (key in obj) {
      // in操作符会从对象原型上寻找
      tempObj = tempObj[key]
    } else {
      throw new Error('请输入一个正确的对象路径')
    }
  }
  return { ...tempObj }
}

class DynamicFieldSet extends React.Component {
  constructor() {
    super()
    this.state = {
      muiltFormItems: treeData,
      renderCommonFormItems: []
    }
  }
  remove = index => {
    const { muiltFormItems } = this.state
    const newMuiltFormItems = muiltFormItems.filter((v, i) => i !== index)
    this.setState({
      muiltFormItems: newMuiltFormItems
    })
  }

  add = index1 => {
    // 增加第一级
    const { muiltFormItems } = this.state
    // todo 这里要修改一个初始值,初始化的对象结构要完整
    let item = {
      location: '',
      name: '',
      coreList: [
        {
          location: '',
          name: ''
        }
      ]
    }
    this.setState({
      muiltFormItems: muiltFormItems.concat(item)
    })
  }

  add2(index1) {
    // 增加第二级
    const { muiltFormItems } = this.state
    let o = _.cloneDeep(muiltFormItems)
    o[index1].coreList.push({
      location: '',
      name: ''
    })
    this.setState({
      muiltFormItems: o
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values
        console.log('Received values of form: ', values)
        console.log(
          'Merged values:',
          keys.map(key => names[key])
        )
      }
    })
  }

  renderMuiltFormItemsFirst() {
    const { getFieldDecorator } = this.props.form
    const { muiltFormItems } = this.state

    return muiltFormItems.map((item1, index1) => {
      return (
        <React.Fragment key={index1}>
          <Form.Item {...formItemLayout} label={'第一级'} required={false}>
            {getFieldDecorator(`locationAndCount.${index1}.location`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: item1.location,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入第一层'
                }
              ]
            })(
              <Input
                placeholder='第一层输入框'
                style={{ width: '60%', marginRight: 8 }}
              />
            )}
            {muiltFormItems.length > 1 ? (
              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                onClick={() => this.remove(index1)}
              />
            ) : null}
          </Form.Item>
          <div
            style={{
              marginLeft: '50px'
            }}
          >
            {this.renderMuiltFormItemsSecond(item1, index1)}
          </div>
        </React.Fragment>
      )
    })
  }

  renderMuiltFormItemsSecond(item1, index1) {
    const { getFieldDecorator } = this.props.form
    return item1.coreList.map((items2, index2) => {
      return (
        <React.Fragment key={index2}>
          <Form.Item {...formItemLayout} label={'第二级'} required={false}>
            {/* 这里的id，如果${}里面的是数字，那么产生的是数组，如果是字符串，那么产生的是对象属性 */}
            {getFieldDecorator(`locationAndCount.${index1}.coreList.${index2}.location`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: items2.location,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入第二层'
                }
              ]
            })(
              <Input
                placeholder='第二层输入框'
                style={{ width: '60%', marginRight: 8 }}
              />
            )}

            <Icon
              className='dynamic-delete-button'
              type='minus-circle-o'
              onClick={() => this.remove(index1, index2)}
            />
          </Form.Item>
          <span>
            <Button type='dashed' onClick={() => this.add2(index1)}>
              <Icon type='plus' /> 增加二级
            </Button>
          </span>
        </React.Fragment>
      )
    })
  }

  renderCommonFormItems() {
    return <div>这里是正常的表单</div>
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderMuiltFormItemsFirst()}
        {this.renderCommonFormItems()}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
            <Icon type='plus' /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(
  DynamicFieldSet
)
export default WrappedDynamicFieldSet
