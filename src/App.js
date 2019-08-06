import React from 'react'
import MyLayOut from './views/layOut/LayOut'
import './App.css'
import './assets/styles/andtEdit/part_andt_edit.scss'
// 这里的scss文件不能再css文件里面引入，必须在scss或者js文件里面引入

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SinglePage from '@/views/test/SinglePage'
import Login from '@/views/login/Login.jsx'

import { connect } from 'react-redux'
import { setAuthArr } from './store/action'

class App extends React.Component {
  componentDidMount() {
    const { setAuthArr } = this.props
    const arr = [
      '首页权限',
      '二级菜单',
      '二级菜单-1',
      '三级菜单',
      '三级菜单-1',
      '三级菜单-2',
      '三级菜单-2-1',
      'express测试'
    ]
    setTimeout(() => {
      setAuthArr(arr)
    }, 100)
  }

  render() {
    return (
      <Router basename="/react_test">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/singlePage" component={SinglePage} />
          <Route path="/" component={MyLayOut} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = {
  setAuthArr
}

export default connect(
  null,
  mapDispatchToProps
)(App)
