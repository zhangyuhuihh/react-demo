import React from 'react'
// import Testt from './testt'
import moduleCss from './testScss.module.scss'
import { Button } from 'antd'
export default class Test extends React.Component {
  render() {
    return (
      <div className={moduleCss.container}>
        哈哈
        {/* <h1 className={moduleCss.title}>这里是测试页面</h1> */}
        {/* <Testt></Testt>
         */}
        <Button type="primary">Button</Button>
      </div>
    )
  }
}
