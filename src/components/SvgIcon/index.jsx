import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss' //已启用 CSS Modules

const SvgIcon = props => {
  const { iconClass, fill, ownClass } = props

  return (
    <i aria-hidden="true" className="anticon">
      <svg className={`${styles['svg-class']} ${ownClass}`}>
        <use xlinkHref={'#icon-' + iconClass} fill={fill} />
      </svg>
    </i>
  )
}

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string,
  ownClass: PropTypes.string
}

SvgIcon.defaultProps = {
  fill: 'currentColor',
  ownClass: ''
}

export default SvgIcon
