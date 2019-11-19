import React from 'react'
import { Icon } from 'antd-mobile'

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
      >
        <div
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
          style={{
            height: '30px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {this.renderIcons()}
        </div>
        <div>{this.props.children}</div>
      </div>
    )
  }

  renderIcons() {
    const { upOrDown } = this.state
    return upOrDown === 'up' ? (
      <Icon type="up" color={'#fff'}></Icon>
    ) : (
      <Icon type="down" color={'#fff'}></Icon>
    )
  }

  handleTouchStart = e => {
    this.startPointY = e.touches[0].clientY
    this.initTopLen = this.state.topLen
    this.setState({
      transitionStyle: 'none',
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
    if (touchEndPos <= 0) {
      this.setState({
        transitionStyle: 'transform 0.2s ease 0s',
        topLen: 0,
        upOrDown: 'up'
      })
    }
  }
}

export default UpDown
