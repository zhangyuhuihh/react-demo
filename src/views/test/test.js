import React from 'react'
// import Testt from './testt'
import moduleCss from './testScss.module.scss'
import { Button } from 'antd'
export default class Test extends React.Component {
  constructor(props) {
    super(props)
    this.myRefs = React.createRef()
    // this.myRefs2 = React.createRef()
    this.btn = null
  }

  componentDidMount() {
    console.log(this.myRefs.current)
    // console.log(this.myRefs2.current)
    console.log(this.btn)
  }

  render() {
    return (
      <div className={moduleCss.container}>
        哈哈
        {/* <h1 className={moduleCss.title}>这里是测试页面</h1> */}
        {/* <Testt></Testt>
         */}
        <Button ref={this.myRefs2.bind(this)} type="primary">Button</Button>
        <Button ref={this.myRefs} type="primary">Button</Button>
        <Button onClick={this.handleJumpSingle.bind(this)}>跳转到单独的页面</Button>
        {/* <div ref={this.myRefs2.bind(this)}>第二个dom</div> */}
      </div>
    )
  }

  myRefs2(element) {
    this.btn = element
  }

  handleJumpSingle() {
    this.props.history.push('/singlePage')
  }
}
