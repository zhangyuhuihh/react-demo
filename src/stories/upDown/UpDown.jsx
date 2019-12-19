import React from 'react'
import { Icon } from 'antd'

// 所有高度基于screenHeight和screenWidth
class UpDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enableMove: false,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      transitionStyle: 'none',
      touchEndPos: 0,
      topLen: 0,
      upOrDown: 'up'
    }
    const { initTop, maxTop } = this.props
    this.boundryTop = -(initTop - maxTop)
    this.startPointY = 0
    this.inittopLen = 0 // 记录第二次按下上拉或者下拉的初始位置
  }

  render() {
    const { topLen, screenWidth, screenHeight, transitionStyle } = this.state
    const { initTop, maxTop, bgColor } = this.props
    return (
      <div
        style={{
          width: screenWidth,
          height: screenHeight - maxTop,
          position: 'fixed',
          backgroundColor: bgColor,
          top: initTop,
          transform: `translateY(${topLen}px)`,
          transition: transitionStyle,
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          zIndex: '88'
        }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            height: '30px',
            width: '100%'
          }}
        >
          <div
            style={{
              height: '30px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              height: '22px',
              width: '22px',
              top: '50%',
              left: '50%',
              marginTop: '-11px',
              marginLeft: '-11px'
            }}
          >
            {this.renderIcons()}
          </div>
        </div>
        <div>{this.props.children}</div>
      </div>
    )
  }

  renderIcons() {
    const { upOrDown } = this.state
    return upOrDown === 'up' ? (
      <Icon
        type='up'
        style={{ color: '#ffffff' }}
        onClick={this.handleUpClick}
      ></Icon>
    ) : (
      <Icon
        type='down'
        style={{ color: '#ffffff' }}
        onClick={this.handleDownClick}
      ></Icon>
    )
  }
  handleUpClick = () => {
    this.setState({
      transitionStyle: 'transform 0.2s ease 0s',
      topLen: this.boundryTop,
      upOrDown: 'down'
    })
  }
  handleDownClick = () => {
    this.setState({
      transitionStyle: 'transform 0.2s ease 0s',
      topLen: 0,
      upOrDown: 'up'
    })
  }

  handleTouchStart = e => {
    this.startPointY = e.touches[0].clientY
    this.initTopLen = this.state.topLen
    this.setState({
      transitionStyle: 'none',
      touchEndPos: 0,
      enableMove: true
    })
  }

  handleTouchMove = e => {
    const { enableMove, topLen } = this.state
    const boundry = topLen <= 0 && topLen >= this.boundryTop
    if (enableMove && boundry) {
      this.setState({
        topLen: -(this.startPointY - e.touches[0].clientY) + this.initTopLen,
        touchEndPos: this.startPointY - e.touches[0].clientY
      })
    }
  }

  handleTouchEnd = e => {
    const { touchEndPos } = this.state
    if (touchEndPos > 0) {
      this.setState({
        transitionStyle: 'transform 0.2s ease 0s',
        topLen: this.boundryTop,
        upOrDown: 'down'
      })
    }
    if (touchEndPos < 0) {
      this.setState({
        transitionStyle: 'transform 0.2s ease 0s',
        topLen: 0,
        upOrDown: 'up'
      })
    }
  }
}

export default UpDown
