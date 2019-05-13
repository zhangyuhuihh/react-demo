import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import LeftPart from './LeftPart'
import LayOutCss from '@/assets/styles/LayOut.module.scss'
import AppMain from './AppMain'
import TopPart from './topPart'

class LayOut extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <div>
          <div className={LayOutCss.topPart}>
            <TopPart></TopPart>
          </div>
          <div className={LayOutCss.leftPart}>
            <LeftPart />
          </div>
          <div className={LayOutCss.rightPart}>
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
