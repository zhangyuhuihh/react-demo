import React from 'react'
import './App.css'
import './assets/styles/andtEdit/part_andt_edit.scss'
// 这里的scss文件不能再css文件里面引入，必须在scss或者js文件里面引入
import HomePage from './views/HomePage'
import { BrowserRouter as Router } from 'react-router-dom'

// import { chooseSystem } from '@/assets/api/getAuth'
// import Login from '@/views/heatLogin'
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
        <Router basename="/floorheat_web">
          <HomePage></HomePage>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
