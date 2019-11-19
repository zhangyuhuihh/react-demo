import React from 'react'
import './casc.less'
import _ from 'lodash'
import PropTypes from 'prop-types'

class CascderTest extends React.Component {
  constructor() {
    super()
    this.state = {
      activeCell: null
    }
  }

  render() {
    const { treeData } = this.props
    return <div>{this.renderCasc(treeData)}</div>
  }

  renderCasc(tree) {
    const {
      cellMarginTop,
      cellMarginLeft,
      cellWidth,
      cellHeight,
      lineColor,
      cellColor,
      cellBgColor,
      lineWidth,
      models
    } = this.props
    let arr = []
    for (let i = 0; i < tree.length; i++) {
      const element = tree[i]
      if (element.children && element.children.length > 0) {
        arr[i] = (
          <div
            key={element[models.value]}
            style={{
              marginLeft: `${cellMarginLeft}px`,
              marginTop: `${cellMarginTop}px`,
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${cellWidth}px`,
                height: `${cellHeight}px`,
                borderRadius: '5px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '13px',
                backgroundColor: cellBgColor,
                color: cellColor,
                ...this.renderActiveStyle(element)
              }}
              onClick={() => this.handleClick(element)}
            >
              <div
                style={{
                  padding: '0 5px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                {element[models.label]}
              </div>

              {/* 竖线 */}
              <div
                style={{
                  width: lineWidth,
                  height: `${this.findYaxisNumber(element) *
                    (cellHeight + cellMarginTop) -
                    cellHeight * 0.5 +
                    lineWidth}px`,
                  backgroundColor: lineColor,
                  position: 'absolute',
                  left: `${(cellWidth - lineWidth) * 0.5}px`,
                  top: `${cellHeight}px`
                }}
              ></div>

              {/* 横线 ,去除第一个没有父级的前面的横线*/}
              {element.pid ? (
                <div
                  style={{
                    width: `${cellMarginLeft - cellWidth * 0.5}px`,
                    height: lineWidth,
                    backgroundColor: lineColor,
                    position: 'absolute',
                    left: `-${cellMarginLeft - cellWidth * 0.5}px`,
                    top: `${cellHeight * 0.5}px`
                  }}
                ></div>
              ) : null}
            </div>
            {this.renderCasc(element.children)}
          </div>
        )
      } else {
        arr[i] = (
          <div
            key={element[models.value]}
            style={{
              marginLeft: `${cellMarginLeft}px`,
              marginTop: `${cellMarginTop}px`,
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${cellWidth}px`,
                height: `${cellHeight}px`,
                borderRadius: '5px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '13px',
                backgroundColor: cellBgColor,
                color: cellColor,
                ...this.renderActiveStyle(element)
              }}
              onClick={() => this.handleClick(element)}
            >
              <div
                style={{
                  padding: '0 5px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                {element[models.label]}
              </div>
              {/* 横线 */}
              <div
                style={{
                  width: `${cellMarginLeft - cellWidth * 0.5}px`,
                  height: lineWidth,
                  backgroundColor: lineColor,
                  position: 'absolute',
                  left: `-${cellMarginLeft - cellWidth * 0.5}px`,
                  top: `${cellHeight * 0.5}px`
                }}
              ></div>
            </div>
          </div>
        )
      }
    }
    return arr
  }

  renderActiveStyle(element) {
    const { activeCell } = this.state
    const { activeCellColor, models, activeCellBgColor } = this.props
    if (activeCell === element[models.value]) {
      return {
        color: activeCellColor,
        backgroundColor: activeCellBgColor
      }
    }
  }

  handleClick = element => {
    const { cellClick, models } = this.props
    cellClick(element)
    this.setState({
      activeCell: element[models.value]
    })
  }

  findYaxisNumber(item) {
    const currentObj = this.findCurrentObj(item)
    let num = 0
    const iteraTwo = arr => {
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i]
        if (element.children && element.children.length > 0) {
          num++
          iteraTwo(element.children)
        } else {
          num++
        }
      }
    }
    // 这里在循环你里面的定位已经是树形结构里面的单独的一个节点了，
    // 所以只考虑当前的这个节点 在计算的时候，应该包括哪些子节点在内，所以
    // 这里的iteraTwo(_.initial(currentObj.children))的逻辑不需要带到上面的迭代里
    if (currentObj.children.length > 1) {
      iteraTwo(_.initial(currentObj.children))
      return num + 1
    } else {
      return 1
    }
  }

  findCurrentObj(item) {
    const { models, treeData } = this.props
    const mainKey = models.value
    let result
    const iteraOne = list => {
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (element[mainKey] === item[mainKey]) {
          result = element
        } else {
          if (element.children && element.children.length) {
            iteraOne(element.children)
          }
        }
      }
    }
    iteraOne(treeData)
    return result
  }
}

CascderTest.propTypes = {
  cellMarginTop: PropTypes.number,
  cellMarginLeft: PropTypes.number,
  cellColor: PropTypes.string,
  cellBgColor: PropTypes.string,
  activeCellColor: PropTypes.string,
  activeCellBgColor: PropTypes.string,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  lineWidth: PropTypes.number,
  lineColor: PropTypes.string,
  cellClick: PropTypes.func,
  treeData: PropTypes.array.isRequired,
  models: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
}

CascderTest.defaultProps = {
  cellMarginTop: 10,
  cellMarginLeft: 50,
  cellColor: '#fff',
  cellBgColor: '#232C3E',
  activeCellColor: 'red',
  activeCellBgColor: 'blue',
  cellWidth: 65,
  cellHeight: 30,
  lineWidth: 2,
  lineColor: '#232C3E',
  cellClick: () => {},
}

export default CascderTest
