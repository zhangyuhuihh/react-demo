import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import LeftPart from './LeftPart'
import AppMain from './AppMain'

class LayOut extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div style={{ display: 'flex' }}>
          <div className="left-Part" style={{ flex: 1 }}>
            <LeftPart />
          </div>
          <div style={{ flex: 1 }}>
            <AppMain />
          </div>
        </div>
      </Router>
    )
  }

  // handleClick = () => {
  //   this.props.history.push('/')
  // }
}
export default LayOut
