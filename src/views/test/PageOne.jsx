import React from 'react'
import moduleCss from './testScss.module.scss'
import { Table, Button, Modal, Form, Input } from 'antd'

import SearchBar from './SearchBar'

import {
  getCapitalAssertsLocalsForPage,
  insertCapitalAssertsLocal,
  updateCapitalAssertsLocalById,
  deleteCapitalAssertsLocalBatch
} from '@/assets/api/fixedAssetManagement/assetUsingLand'

class PageOne extends React.Component {
  constructor() {
    super()
    this.state = {
      detailVisible: false,
      addOrEditVisible: false,
      modalTitle: '新增',
      initFormValues: {},
      detailObject: {},

      currentPage: 1,
      pageSize: 10,

      paginationOption: {
        total: 0,
        pageSizeOptions: ['10', '30', '50'],
        showSizeChanger: true,
        showQuickJumper: true,
        size: 'small',
        onChange: this.handleCurrentChange,
        onShowSizeChange: this.handleSizeChange
      },
      listData: [
        {
          key: '1',
          name: '张三',
          age: 25,
          work: '苦逼前端小开发'
        },
        {
          key: '2',
          name: '李四',
          age: 42,
          work: '苦逼前端小开发'
        },
        {
          key: '3',
          name: '王二',
          age: 32,
          work: '苦逼前端小开发'
        },
        {
          key: '4',
          name: '麻子',
          age: 32,
          work: '苦逼前端小开发'
        }
      ]
    }

    this.columns = [
      {
        dataIndex: 'name',
        title: '姓名'
      },
      {
        dataIndex: 'age',
        title: '年龄'
      },
      {
        dataIndex: 'work',
        title: '职业'
      },
      {
        dataIndex: 'action',
        title: '操作',
        render: this.actionRender
      }
    ]
  }

  componentDidMount() {
    // 加载表格
    // this.setTable()
  }

  actionRender = (text, record, index) => {
    return (
      <div className={moduleCss.btn_container}>
        <Button
          onClick={() => {
            this.handleCheckDetail(record)
          }}
          type="primary"
          size={'small'}
        >
          查看
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={() => {
            this.handleEdit(record)
          }}
          type="primary"
          size={'small'}
        >
          编辑
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={() => {
            this.handleDelete(record)
          }}
          type="danger"
          size={'small'}
        >
          删除
        </Button>
      </div>
    )
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  }

  handleSearch(searchParams) {
    console.log(searchParams)
    // this.setTable() 刷新列表
  }

  handleSizeChange = (page, pageSize) => {
    this.setState(
      {
        pageSize: pageSize
      },
      () => {
        // this.setTable()
      }
    )
  }

  handleCurrentChange = current => {
    this.setState(
      {
        currentPage: current
      },
      () => {
        // this.setTable()
      }
    )
  }

  handleCheckDetail = record => {
    this.setState({
      detailVisible: true,
      detailObject: record
    })
  }

  handleAdd = () => {
    this.setState({
      modalTitle: '新增',
      addOrEditVisible: true
    })
  }

  handleEdit = record => {
    // 编辑数据回显
    this.setState({
      modalTitle: '编辑',
      initFormValues: {
        name: record.name
      },
      addOrEditVisible: true
    })
  }

  handleDelete = record => {
    Modal.confirm({
      title: '删除',
      content: '确认删除此条数据?',
      okText: '确认',
      cancelText: '取消',
      onOk: this.deleteData
    })
  }

  doDelete = () => {}

  handleCancelDetailModel = () => {
    this.setState({
      detailVisible: false
    })
  }

  handleConfirmAddOrEdit = () => {
    const formToValidate = this.formRef.props.form
    formToValidate.validateFields((errors, values) => {
      if (errors) {
        return
      }
      // const formData = formTovalidate.getFieldsValue()
      // this.setState({
      //   addOrEditVisible: false
      // })
    })
  }

  handleCancelAddEditModel = () => {
    this.setState({
      addOrEditVisible: false
    })
  }

  ModelClose = () => {
    this.formRef.props.form.resetFields()
    this.setState({
      initFormValues: {
        name: ''
      }
    })
  }

  renderBar() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={moduleCss.bar_left}>
          <Button onClick={this.handleAdd} type="primary">
            新增
          </Button>
        </div>
        <div className={moduleCss.bar_right}>
          <SearchBar handleSearch={this.handleSearch} />
        </div>
      </div>
    )
  }

  renderTable() {
    const { listData } = this.state
    return (
      <Table
        rowSelection={this.rowSelection}
        columns={this.columns}
        dataSource={listData}
        pagination={this.state.paginationOption}
      />
    )
  }

  renderAddOrEditModel = () => {
    return (
      <Modal
        title={this.state.modalTitle}
        visible={this.state.addOrEditVisible}
        onOk={this.handleConfirmAddOrEdit}
        onCancel={this.handleCancelAddEditModel}
        afterClose={this.ModelClose}
      >
        <div>
          <WrappredAddOrEditForm
            wrappedComponentRef={form => (this.formRef = form)}
            initValue={this.state.initFormValues}
          />
        </div>
      </Modal>
    )
  }

  renderDetailModel() {
    const { detailObject } = this.state
    return (
      <Modal
        title="详情"
        visible={this.state.detailVisible}
        onOk={() => {
          this.detailVisible = false
        }}
        onCancel={this.handleCancelDetailModel}
      >
        <div>
          <span>{detailObject && detailObject.firstName}</span>
        </div>
      </Modal>
    )
  }

  // 列表
  async setTable(querParams = {}) {
    const { data } = await getCapitalAssertsLocalsForPage(
      { ...querParams },
      {
        page: this.state.currentPage,
        pageSize: this.state.pageSize
      }
    )
    const newPageOption = { ...this.state.paginationOption, total: data.total }
    this.setState({
      listData: data.rows,
      paginationOption: newPageOption
    })
  }

  // 新增
  async addData(insertData = {}) {
    await insertCapitalAssertsLocal({ ...insertData })
    this.setState({
      addOrEditVisible: false
    })
  }

  // 编辑
  async editData(editData = {}) {
    await updateCapitalAssertsLocalById({ ...editData })
    this.setState({
      addOrEditVisible: false
    })
  }

  // 删除
  async deleteData(id) {
    deleteCapitalAssertsLocalBatch(id).then(() => {
      // this.setTable()
    })
  }

  render() {
    return (
      <div className={moduleCss.main_container}>
        <div className={moduleCss.main_container_bar}>{this.renderBar()}</div>
        <div className={moduleCss.main_container_table}>
          {this.renderTable()}
        </div>
        {this.renderDetailModel()}
        {this.renderAddOrEditModel()}
      </div>
    )
  }
}

class addOrEditForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const { initValue } = this.props
    return (
      <Form>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: initValue.name,
            rules: [
              {
                required: true,
                message: '请输入姓名'
              }
            ]
          })(<Input placeholder="请输入姓名" />)}
        </Form.Item>
      </Form>
    )
  }
}

const WrappredAddOrEditForm = Form.create({ name: 'addOrEdit' })(addOrEditForm)

export default PageOne
