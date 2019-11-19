import React from 'react'
import { storiesOf } from '@storybook/react'
import CascderTest from './CascderTest'
import { getAppPosition } from '../../assets/api/apps/homePage'

// https://blog.csdn.net/qq_38054239/article/details/86613231
// https://www.codercto.com/a/40438.html

const json = [
  { positionId: '1', pid: '-1', isAtt: '0', name: '贝特集团' },
  { positionId: '2', pid: '1', isAtt: '0', name: '四合院' },
  { positionId: '3', pid: '2', isAtt: '0', name: '小会议室' },
  {
    positionId: '3470063787967488',
    pid: '3470100597228544',
    isAtt: '0',
    name: '新增安装位置啊'
  },
  {
    positionId: '3470100597228544',
    pid: '-1',
    isAtt: '0',
    name: '不是安装点'
  },
  {
    positionId: '3470256924345344',
    pid: '3470100597228544',
    isAtt: '0',
    name: '下级'
  },
  {
    isAtt: '0',
    name: '哈哈哈',
    pid: '3470100597228544',
    positionId: '34700637879674865'
  },
  {
    positionId: '3470258468045824',
    pid: '3470256924345344',
    isAtt: '0',
    name: '下级啊'
  },
  { positionId: '4', pid: '3', isAtt: '0', name: '第一排第二个凳子' },
  { positionId: '5', pid: '3', isAtt: '0', name: 'aaa' },
  { positionId: '-1', pid: null, isAtt: '0', name: '位置信息' }
]

storiesOf('级联控制', module)
  // .add('- PSListItem', () =><div>哈哈哈</div>)
  .add('级联', () => <Test></Test>)

class Test extends React.Component {
  state = {
    treeData: []
  }

  componentDidMount() {
    // getAppPosition().then(res => {
    const newData = this.trans_tree(json)
    this.setState({
      treeData: newData
    })
    // })
  }

  render() {
    const { treeData } = this.state
    return (
      <CascderTest
        cellMarginTop={10}
        cellMarginLeft={50}
        cellWidth={65}
        cellHeight={30}
        lineWidth={2}
        lineColor={'#232C3E'}
        cellClick={v => {
          console.log(v)
        }}
        treeData={treeData}
        models={{
          label: 'name',
          value: 'positionId'
        }}
      />
    )
  }

  trans_tree(jsonData) {
    var result = [],
      temp = {},
      len = jsonData.length
    for (var i = 0; i < len; i++) {
      temp[jsonData[i]['positionId']] = jsonData[i]
    }
    for (var j = 0; j < len; j++) {
      var currentElement = jsonData[j]
      var tempCurrentElementParent = temp[currentElement['pid']]
      if (tempCurrentElementParent) {
        if (!tempCurrentElementParent['children']) {
          tempCurrentElementParent['children'] = []
        }
        tempCurrentElementParent['children'].push(currentElement)
      } else {
        result.push(currentElement)
      }
    }
    return result
  }
}
