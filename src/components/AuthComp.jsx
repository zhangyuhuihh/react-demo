import { Component } from 'react'
import { connect } from 'react-redux'

// 方案1
class AuthComp extends Component {
  render() {
    const { auth } = this.props

    return this.hasPermission(auth) ? this.props.renderAuth() : null
  }

  hasPermission(v) {
    const { authArr } = this.props
    const env = process.env.NODE_ENV
    if (env === 'development') {
      return true
    } else {
      return authArr.includes(v)
    }
  }
}

const mapStateToProps = state => {
  return {
    authArr: state.authArr
  }
}

export default connect(mapStateToProps, null)(AuthComp)


// 方案2 pass
// export default connect(mapStateToProps, null)(AuthComp)
// const mapStateToProps = state => {
//   return {
//     authArr: state.authArr
//   }
// }
// const AuthComp = ComposedComponent => {
//   class WrapComp extends React.Component {
//     // constructor(props) {
//     //   super(props)
//     // }

//     hasPermission(v) {
//       const { authArr } = this.props
//       // const env = process.env.NODE_ENV
//       // if (env === 'development') {
//       //   return true
//       // } else {
//       return authArr.includes(v)
//       // }
//     }

//     render() {
//       const { auth } = this.props
//       return this.hasPermission(auth) ? (
//         <ComposedComponent {...this.props}></ComposedComponent>
//       ) : null
//     }
//   }

//   return connect(mapStateToProps, null)(WrapComp)
// }

// export default AuthComp

// 方案3 pass
// class AuthComp extends React.Component {
//   render() {
//     const {authArr} = this.props
//     return (
//       <React.Fragment>
//         {this.props.children}
//       </React.Fragment>
//     )
//   }

//   hasPermission(v) {
//     const { authArr } = this.props
//     // const env = process.env.NODE_ENV
//     // if (env === 'development') {
//     //   return true
//     // } else {
//     return authArr.includes(v)
//     // }
//   }
// }

// const mapStateToProps = state => {
//   return {
//     authArr: state.authArr
//   }
// }


// export default connect(mapStateToProps, null)(AuthComp)