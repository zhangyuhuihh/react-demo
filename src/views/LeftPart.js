import React from 'react'
import { Link } from 'react-router-dom'

export default class LeftPart extends React.Component {
  render() {
    return (
      <div>
        <Link to="/Test">跳test</Link>
        <Link to="/Testt">跳test2</Link>
      </div>
    )
  }
}
