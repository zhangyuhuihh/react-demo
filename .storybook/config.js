import { configure } from '@storybook/react'
import 'antd/dist/antd.less' // less版本

// css版本， css版本使用import 'antd/dist/antd.css'也可以，但是webpack.config里面的modules需要使用对象的模式，而不能使用函数模式
// require('!style-loader!css-loader!antd/dist/antd.less')

function loadStories() {
  require('../src/stories/test/index.js'),
  require('../src/stories/cascderTest/index.js')
  require('../src/stories/upDown/index.js')
}

configure(loadStories, module)
// configure(require.context('../src', true, /\stories\.js$/), module)
