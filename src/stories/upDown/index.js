import React from 'react'
import { storiesOf } from '@storybook/react'
import UpDown from './UpDown'

// https://blog.csdn.net/qq_38054239/article/details/86613231
// https://www.codercto.com/a/40438.html

storiesOf('上拉下拉', module)
  // .add('- PSListItem', () =><div>哈哈哈</div>)
  .add('上拉下拉', () => <Test></Test>)

const screenHeight = window.screen.height

class Test extends React.Component {
  render() {
    return (
      <UpDown
        initTop={screenHeight * 0.7}
        maxTop={window.screen.height * 0.2}
        bgColor={'#232C3E'}
      >
        <div>
          这里是主要的内容
        </div>
      </UpDown>
    )
  }
}
