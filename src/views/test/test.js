import React from 'react'
import moduleCss from './testScss.module.scss'
import { Table, Button } from 'antd'

import SearchBar from './SearchBar'

// const { Columns } = Table

class Test extends React.Component {
  state = {
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

  columns = [
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
      render: (text, record) => {
        return (
          <div className={moduleCss.btn_container}>
            <Button onClick={this.checkDetail} type="primary" size={'small'}>
              查看
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={this.handleEdit}
              type="primary"
              size={'small'}
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={this.handleDelete}
              type="primary"
              size={'small'}
            >
              删除
            </Button>
          </div>
        )
      }
    }
  ]

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

  checkDetail = () => {}

  handleEdit = () => {}

  handleDelete = () => {}

  renderBar() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={moduleCss.bar_left}>
          <Button onClick={this.handleEdit} type="primary">
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
      />
    )
  }

  render() {
    return (
      <div className={moduleCss.main_container}>
        <div className={moduleCss.main_container_bar}>{this.renderBar()}</div>
        <div className={moduleCss.main_container_table}>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default Test
