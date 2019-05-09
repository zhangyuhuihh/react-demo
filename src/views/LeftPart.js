import React from 'react'
import { Link, withRouter } from 'react-router-dom'

 class LeftPart extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <div>
        {/* <Link to="/">跳test</Link> */}
        <div onClick={() => { this.handleClick('111')}}>跳转</div>
        <Link to="/Testt">跳test2</Link>
      </div>
    )
  }
  handleClick = () => {
    this.props.history.push('/test')
  }
}

export default withRouter(LeftPart)