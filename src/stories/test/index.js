
import React from 'react'
import { storiesOf } from '@storybook/react'
import MyButton from './Button'
// https://blog.csdn.net/qq_38054239/article/details/86613231
// https://www.codercto.com/a/40438.html
 
storiesOf('Product & Service', module)
  // .add('- PSListItem', () =><div>哈哈哈</div>)
  .add('- PSListItem', () => <MyButton />)
