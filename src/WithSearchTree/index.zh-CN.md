---
category: Components
title: WithSearchTree (带搜索组件树)
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

```tsx
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
      blockNode
      showIcon={false}
      onSearch={({filterData, expandedKeys, keyword}) => {
        console.log(filterData, expandedKeys, keyword)
      }}
      onOperate={(...res) => {
        console.log(res)
      }}
  />)
}
```

没有 children 的一级列表渲染

```tsx
import React, { useState } from 'react'
import { WithSearchTree } from '@junc/rc'
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
  },
  {
    title: 'parent 2',
    key: '0-2',
  },
  {
    title: 'parent 3',
    key: '0-3',
  },
  {
    title: 'parent 4',
    key: '0-4',
  },
  {
    title: 'parent 5',
    key: '0-5',
  },
]

export default () => {
  return (<WithSearchTree 
      treeData={treeData}
      blockNode
      noChildren
      onSearch={({filterData, expandedKeys, keyword}) => {
        console.log(filterData, expandedKeys, keyword)
      }}
      titleOperate={(...res) => {
        console.log(res)
      }}
  />)
}
```

```tsx
import React, { useState } from 'react'
import { WithSearchTree } from '@junc/rc'
const { Warp } = WithSearchTree
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

const operate = (...rest) => {
  console.log(rest)
}

export default () => {
  return (<Warp title={'组织架构树'} onOperate={operate}>
    <WithSearchTree 
        treeData={treeData}
        showLine
        draggable
        blockNode
        onSearch={({filterData, expandedKeys, keyword}) => {
          console.log(filterData, expandedKeys, keyword)
        }}
        onOperate={operate}
    />
  </Warp>)
}
```


WithSearchTreeModalForm  带有增删改查的树形组件

```tsx
import React, { useState } from 'react'
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio, ProFormDigit } from '@ant-design/pro-form';
import { WithSearchTreeModalForm } from '@junc/rc'
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

const onSave = async (action: OperateActionType, record?: any, values?: any) => {
    const { dictId } = record || {}
    switch(action) {
        case 'add': {
            console.log('add')
            return true
        }
        case 'update': {
            console.log('update')
            return true
        }
        case 'del': {
            console.log('del')
            return true
        }
    }
}

export default () => {
  return (<WithSearchTreeModalForm 
        title="组织架构树"
        showIcons={['add', 'update', 'del']}
        treeData={treeData}
        showLine
        draggable
        blockNode
        onSearch={({filterData, expandedKeys, keyword}) => {
          console.log(filterData, expandedKeys, keyword)
        }}
        modalProps={{
            request: async(action: any, payload: any) => {
                const { dictName } = payload || {}
                return {
                    parentName: dictName,
                    dictName: action === 'add' ? undefined : dictName,
                }
            }
        }}
        onSave={onSave}
    >
      <ProFormText width="md" name="parentName" disabled label="所属应用" rules={[{required: false, message: '请填写'}]} />
      <ProFormTextArea fieldProps={{ rows:1, showCount: true,  maxLength: 30 }} width="md" name="dictName" label="字典名称" rules={[{required: true, message: '请填写字典名称'}]} />
    </WithSearchTreeModalForm>)
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
| titleOperate | showIcons图标以及 title 的点击事件 | function(e: Event, type?: 'add'\|'update'\|'del'\|'titleClick') | - |  |
| noChildren | treeData 是否只有一层 | boolean | - |  |

### WithSearchTreeModalForm props

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 名称 | 'ReactNode'\|'boolean' | - |  |
| titleIcon | 顶部右边的 '+' 号 | 'ReactNode'\|'boolean' | - |  |
| showIcons | title右边【新增/编辑/删除】的icon 显示 | 'add'\|'update'\|'del'[] | ['add', 'update', 'del'] |  |
| treeData | Tree 组件的数据 | TreeProps['treeData'] | - |  |
| params | 类似ProTable['params'] 获取 treeData 的参数 | any | - |  |
| request | 类似ProTable['request'] 获取 treeData 的方法 | (params?: any) => Promise<TreeProps['treeData']> | - |  |
| modalProps | 增删改的弹窗组件 props | ModalFormProps | - |  |
| onSave | 用于增删改等表单提交事件，返回 Promise.reslove(true) 则关闭弹窗 | async(action: ActionType, record?: any, values?: any) => boolean; | - |  |

