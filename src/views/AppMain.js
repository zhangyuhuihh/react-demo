import React from 'react'
import { Route } from 'react-router-dom'
import Test from './test'
import Testt from './testt'

export default class AppMain extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <div>
        <Route path="/Test" component={Test} />
        <Route path="/Testt" component={Testt} />
      </div>
    )
  }
}
