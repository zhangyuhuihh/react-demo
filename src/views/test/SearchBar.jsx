import React from 'react'

import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <WrappedSearchForm {...this.props} />
      </div>
    )
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func
}

class SearchForm extends React.Component {
  doSearch = () => {
    const { handleSearch } = this.props
    const queryParams = this.props.form.getFieldsValue()
    handleSearch(queryParams)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout={'inline'}>
        <Form.Item>
          {getFieldDecorator('name', {
            initalValue: ''
          })(<Input allowClear placeholder="请输入姓名" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('age', {
            initalValue: ''
          })(<Input allowClear placeholder="请输入年龄" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.doSearch}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func
}

const WrappedSearchForm = Form.create({ name: 'searchBar' })(SearchForm)

export default SearchBar
