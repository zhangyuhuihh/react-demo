import React from 'react'
import MyLayOut from './views/layOut/LayOut'
import './App.css'
import './assets/styles/andtEdit/part_andt_edit.scss'
// 这里的scss文件不能再css文件里面引入，必须在scss或者js文件里面引入

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import SinglePage from '@/views/test/SinglePage'
// import Login from '@/views/login/Login.jsx'

// import { chooseSystem } from '@/assets/api/getAuth'

import { connect } from 'react-redux'
import { setAuthArr } from './store/action'
import { HasPermissionContext } from '@/assets/contexts/HasPermissionContext'

class App extends React.Component {
  componentDidMount() {
    // const { setAuthArr } = this.props

    // 这里发请求获取权限
    // chooseSystem({
    //   privilegeId: 2843
    // }).then(res => {
    //   const authArr = res.data.map(item => item.privilegeName)
    //   setAuthArr(authArr)
    // })

    // const authArr = [
    //   '首页权限',
    //   '二级菜单',
    //   '二级菜单-1',
    //   '三级菜单',
    //   '三级菜单-1',
    //   '三级菜单-2',
    //   '三级菜单-2-1',
    //   'express测试'
    // ]
    // setAuthArr(authArr)
  }

  render() {
    return (
      <HasPermissionContext.Provider value={this.hasPermission}>
        <Router basename="/react-demo">
          <Switch>
            {/* <Route path="/login" component={Login} /> */}
            {/* <Route path="/singlePage" component={SinglePage} /> */}
            <Route path="/" component={MyLayOut} />
          </Switch>
        </Router>
      </HasPermissionContext.Provider>
    )
  }

  hasPermission = v => {
    const env = process.env.NODE_ENV
    if (env === 'development') {
      return true
    } else {
      return this.props.authArr.includes(v)
    }
  }
}

const mapDispatchToProps = {
  setAuthArr
}

const mapStateToProps = state => {
  return {
    authArr: state.authArr
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
