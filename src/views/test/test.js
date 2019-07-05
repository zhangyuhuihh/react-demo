import React from 'react'
import moduleCss from './testScss.module.scss'
import { Button } from 'antd'
import { connect } from 'react-redux'

class Test extends React.Component {
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
    const { count, onIncClick } = this.props
    return (
      <div className={moduleCss.container}>
        {count}
        <button type="button" onClick={onIncClick}>
          Increase
        </button>
        <Button ref={this.myRefs2.bind(this)} type="primary">
          Button
        </Button>
        <Button ref={this.myRefs} type="primary">
          Button
        </Button>
        <Button onClick={this.handleJumpSingle.bind(this)}>
          跳转到单独的页面
        </Button>
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

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps called')
  // 1.尽量不要添加ownProps
  return {
    count: state.count
  }
}

// 我们建议使用对象形式的mapDispatchToProps，除非你需要以某种自定义形式进行分发操作
// bindActionCreators
const mapDispatchToProps = {
  onIncClick() {
    return {
      type: 'TEST_REDUX'
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)
