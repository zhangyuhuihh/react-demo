import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Test from '@/views/test/test'
import Testt from '@/views/test/testt'

export default class MyRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/test" />
        <Route path="/test" component={Test} />
        <Route path="/Testt" component={Testt} />
      </Switch>
    )
  }
}
