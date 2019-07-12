import React from 'react'
import moduleCss from './testScss.module.scss'
import { Table, Button, Modal } from 'antd'

import SearchBar from './SearchBar'

import {
  getCapitalAssertsLocalsForPage,
  insertCapitalAssertsLocal,
  updateCapitalAssertsLocalById
  // deleteCapitalAssertsLocalBatch
} from '@/assets/api/fixedAssetManagement/assetUsingLand'

class Test extends React.Component {
  constructor() {
    super()
    this.state = {
      detailVisible: false,
      addOrEditVisible: false,
      modalTitle: '新增',

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
          firstName: 'John',
          lastName: 'Brown',
          age: 32
        },
        {
          key: '2',
          firstName: 'Jim',
          lastName: 'Green',
          age: 42
        },
        {
          key: '3',
          firstName: 'Joe',
          lastName: 'Black',
          age: 32
        }
      ]
    }

    this.columns = [
      {
        dataIndex: 'firstName',
        title: '使用地理位置编号'
      },
      {
        dataIndex: 'lastName',
        title: '使用地理位置名称'
      },
      {
        dataIndex: 'age',
        title: '发布人'
      },
      {
        dataIndex: 'address',
        title: '发布时间'
      },
      {
        dataIndex: 'action',
        title: '操作',
        render: this.actionRender
      }
    ]
  }

  componentDidMount() {
    this.setTable()
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

  handleSizeChange = (page, pageSize) => {
    this.setState(
      {
        pageSize: pageSize
      },
      () => {
        this.setTable()
      }
    )
  }

  handleCurrentChange = current => {
    this.setState(
      {
        currentPage: current
      },
      () => {
        this.setTable()
      }
    )
  }

  handleCheckDetail = record => {
    this.setState({
      detailVisible: true
    })
  }

  handleAdd = () => {
    this.setState({
      modalTitle: '新增',
      addOrEditVisible: true
    })
  }

  handleEdit = record => {
    this.setState({
      modalTitle: '编辑',
      addOrEditVisible: true
    })
  }

  handleDelete = record => {}

  handleCancelDetailModel = () => {
    this.setState({
      detailVisible: false
    })
  }

  handleCancelAddEditModel = () => {
    this.setState({
      addOrEditVisible: false
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
          <SearchBar />
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

  renderAddOrEditModel() {
    return (
      <Modal
        title={this.state.modalTitle}
        visible={this.state.addOrEditVisible}
        onOk={() => {
          this.addOrEditVisible = false
        }}
        onCancel={this.handleCancelAddEditModel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }

  renderDetailModel() {
    return (
      <Modal
        title="详情"
        visible={this.state.detailVisible}
        onOk={() => {
          this.detailVisible = false
        }}
        onCancel={this.handleCancelDetailModel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
  async deleteData() {}

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

export default Test
