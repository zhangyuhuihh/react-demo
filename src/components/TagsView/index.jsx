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
    this.scrollRef = React.createRef()

    this.tagList = []

    this.setTagRef = (element, item) => {
      if (!this.tagList.includes(element) && element !== null) {
        this.tagList.push(element)
      }
    }
  }

  componentDidMount() {
    this.initTags()
    this.initActiveTag()
  }

  componentWillReceiveProps() {
    // 这个生命周期，类似于computed,在props变化的时候派生出状态给state。或者类似于watch,在props变化的时候，做点什么
    this.initTags()
    this.initActiveTag()
  }

  initTags = () => {
    const { addVisitiedViews } = this.props
    const { pathname } = this.props.history.location
    const tagName = this.findCurrentTagName(pathname)
    if (tagName) {
      addVisitiedViews({
        routeName: tagName,
        path: pathname
      })
    }
  }

  initActiveTag = () => {
    const { pathname } = this.props.history.location
    // const { visitiedViews } = this.props
    this.setState({
      currentActiveTag: pathname
    }, () => {
      const tagName = this.findCurrentTagName(pathname)
      this.moveToTarget(tagName)
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
          if (element.hasOwnProperty('component')) {
            // 避免添加二级菜单到TagsView上
            currentName = element.name
          }
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

  handleScroll = e => {
    e.stopPropagation()
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    const $scrollWrapper = this.scrollRef.current
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  }

  moveToTarget = currentTag => {
    const tagAndTagSpacing = 4

    const $container = this.scrollRef.current
    const $containerWidth = $container.offsetWidth
    const $scrollWrapper = this.scrollRef.current
    const tagList = this.tagList

    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0]
      lastTag = tagList[tagList.length - 1]
    }

    if (firstTag.innerText === currentTag) {
      $scrollWrapper.scrollLeft = 0
    } else if (lastTag.innerText === currentTag) {
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex(item => item.innerText === currentTag)
      // ;
      const prevTag = tagList[currentIndex - 1]
      const nextTag = tagList[currentIndex + 1]

      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft =
        nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing

      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing

      if (
        afterNextTagOffsetLeft >
        $scrollWrapper.scrollLeft + $containerWidth
      ) {
        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
      } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
      }
    }
  }

  render() {
    const { visitiedViews } = this.props
    const { currentActiveTag } = this.state
    return (
      <div
        ref={this.scrollRef}
        className={moduleCss.container}
        onWheel={this.handleScroll}
      >
        <div className={moduleCss.tagsViewWrapper}>
          {visitiedViews.map(item => {
            return (
              <div
                ref={element => this.setTagRef(element, item)}
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
