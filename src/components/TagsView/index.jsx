import React from 'react'
import { Icon } from 'antd'
import { RouteConfig } from '@/route'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moduleCss from './tagsView.module.scss'
import { addVisitiedViews, removeVisitiedViews } from '@/store/action'

class TagsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveTag: ''
    }
  }

  componentDidMount() {
    this.initTags()
    this.initActiveTag()
  }

  componentWillReceiveProps() {
    // 这个生命周期，类似于computed,在props变化的时候派生出状态给state。或者类似于watch,在props变化的时候，做点什么
    // todo 暂且采用异步的方式，解决props.history.location在一次redirect中有两次addVisitiedViews的问题, i dont know how to do it
    setTimeout(() => {
      this.initTags()
      this.initActiveTag()
    }, 0)
  }

  initTags = () => {
    const { addVisitiedViews } = this.props
    const { pathname } = this.props.history.location
    console.log('pathname: ', pathname)
    if (pathname !== '/') {
      // 这边由于pathname第一次为/, 第二次为传入的值，会有两次执行。会导致多传入一层'/',componentWillReceiveProps中传入派生状态的问题
      const tagName = this.findCurrentTagName(pathname)
      addVisitiedViews({
        routeName: tagName,
        path: pathname
      })
    }
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

  handleChangeTag = item => {
    this.props.history.push(item.path)
  }

  handleRemoveTag = (e, item) => {
    e.stopPropagation()
    const { removeVisitiedViews, visitiedViews } = this.props
    const { currentActiveTag } = this.state
    removeVisitiedViews(item)
    if (visitiedViews.length === 2) {
      this.props.history.push('/Dashboard')
      return
    }
    for (let i = 0; i < visitiedViews.length; i++) {
      if (
        visitiedViews[i].path === item.path &&
        currentActiveTag === item.path
      ) {
        if (i === visitiedViews.length - 1) {
          this.props.history.push(visitiedViews[i - 1].path)
        } else {
          this.props.history.push(visitiedViews[i + 1].path)
        }
      }
    }
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
                <span style={{ marginLeft: '3px' }}>{item.routeName}</span>
                {item.path === '/Dashboard' ? null : (
                  <Icon
                    type="close"
                    onClick={e => this.handleRemoveTag(e, item)}
                    style={{ marginLeft: '3px', fontSize: '13px' }}
                  />
                )}
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
  addVisitiedViews,
  removeVisitiedViews
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TagsView)
)
