---
category: Components
title: WithSearchTree
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

基于 Antd Tree 组件开发，组件属性参数请参考 antd Tree 组件

```jsx
import React, { useState } from 'react'
import { WithSearchTree } from '@junc/rc'
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: 'sss', key: '0-0-1-0' }
        ],
      },
    ],
  },
]

export default () => {
  return (<WithSearchTree 
      treeData={treeData}
      showLine
      onSearch={({filterData, expandedKeys, keyword}) => {
        console.log(filterData, expandedKeys, keyword)
      }}
      onOperate={(...res) => {
        console.log(res)
      }}
  />)
}
```
### WithSearchTree props
属性继承 atnd Tree, 以下是额外属性

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| showIcons | title右边【新增/编辑/删除】的icon 显示 | 'add'\|'update'\|'del'[] | ['add', 'update', 'del'] |  |
| warpStyle | 组件的被包裹组件样式 style | CSSProperties | - |  |
| search | 组件中Input.Search 的配置参数, onSearch 被重写(具体请参考 antd Input.Search) |  |  |  |
| onSearch | Input搜索触发事件 | function({filterData, expandedKeys, keyword}) | - |  |
| onOperate | showIcons图标以及 title 的点击事件 | function(e: Event, type?: 'add'\|'update'\|'del'\|'titleClick') | - |  |


