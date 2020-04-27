import React from 'react'

class Butt extends React.Component {
  focus() {}

  render() {
    return <div>哈哈哈</div>
  }
}

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    render() {
      return <WrappedComponent {...this.props} ref={this.props.csref} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} csref={ref}></LogProps>
  })
  // return  LogProps
}

const ref = React.createRef()

const FancyButton = logProps(Butt)

export default class ThreeLevelPageOne extends React.Component {
  componentDidUpdate() {
    console.log(ref)
  }

  componentDidMount() {
    console.log(ref)
  }

  render() {
    return <FancyButton label='Click Me' ref={ref} />
  }
}

let arr = []


