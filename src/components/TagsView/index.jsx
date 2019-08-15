import React from 'react'
import { Icon } from 'antd'
import moduleCss from './tagsView.module.scss'

export default class TagsView extends React.Component {
  render() {
    return (
      <div className={moduleCss.container}>
        <div className={moduleCss.tagsViewWrapper}>
          <div
            className={`${moduleCss.tagsViewItem} ${moduleCss.currentActive}`}
          >
            <span>哈哈</span>
            <Icon type="close" />
          </div>
        </div>
      </div>
    )
  }
}
