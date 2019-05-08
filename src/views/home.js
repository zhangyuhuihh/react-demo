import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Test from './test'

export default class Home extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="left-Part">
            <Link to="/Test">跳test</Link>
          </div>
          <div>
            <Route path="/Test" component={Test} />
          </div>
        </div>
      </Router>
    )
  }
}
