import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Test from './test/test'
import Testt from './test/testt'

export default class AppMain extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Switch>
          <Redirect exact from="/" to='/test'/>
          <Route path="/test" component={Test} />
          <Route path="/Testt" component={Testt} />
        </Switch>
      </div>
    )
  }
}
