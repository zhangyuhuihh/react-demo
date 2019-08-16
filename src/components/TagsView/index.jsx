import React from 'react'
import { Icon } from 'antd'
import { RouteConfig } from '@/route'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moduleCss from './tagsView.module.scss'
import { addVisitiedViews } from '@/store/action'

class TagsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveTag: ''
    }
  }

  componentDidMount() {
    this.initTags()
  }

  componentWillReceiveProps() {
    // 这个生命周期，类似于computed,在props变化的时候派生出状态给state。或者类似于watch,在props变化的时候，做点什么
    this.initActiveTag()
  }

  initTags = () => {
    const { addVisitiedViews } = this.props
    const { pathname } = this.props.history.location
    const tagName = this.findCurrentTagName(pathname)
    addVisitiedViews({
      routeName: tagName,
      path: pathname
    })
  }

  initActiveTag = () => {
    const { pathname } = this.props.history.location
    this.setState({
      currentActiveTag: pathname
    })
  }

  findCurrentTagName(pathname) {
    let currentName = ''
    const itera = list => {
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (element.path !== pathname) {
          if (element.hasOwnProperty('children')) {
            itera(element.children)
          }
        } else {
          currentName = element.name
        }
      }
    }
    itera(RouteConfig)
    return currentName
  }

  handleChangeTag = (item) => {
    this.props.history.push(item.path)
  }

  render() {
    const { visitiedViews } = this.props
    const { currentActiveTag } = this.state
    return (
      <div className={moduleCss.container}>
        <div className={moduleCss.tagsViewWrapper}>
          {visitiedViews.map(item => {
            return (
              <div
                key={item.path}
                className={`${moduleCss.tagsViewItem} ${
                  currentActiveTag === item.path ? moduleCss.currentActive : ''
                }`}
                onClick={() => this.handleChangeTag(item)}
              >
                <span>{item.routeName}</span>
                <Icon type="close" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    visitiedViews: state.visitiedViews
  }
}

const mapDispatchToProps = {
  addVisitiedViews
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TagsView)
)
