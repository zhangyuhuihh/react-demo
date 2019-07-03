import React from 'react'
import LayOut from './views/layOut/LayOut'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import singlePage from '@/views/test/singlePage'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/singlePage" component={singlePage} />
        <Route path="/" component={LayOut} />
      </Switch>
    </Router>
  )
}
// exact 只有完全匹配才会渲染对应的组件 你可以看下路由匹配规则 或者把exact干掉 顺序由复杂到简单排列
// 个人感觉，这里完全比不上vue，略蠢略蠢

export default App
