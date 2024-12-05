---
category: Components
title: Compact (组合)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 6
---

InputNumber 范围输入框:
```tsx
import React, { useState } from 'react'
import { Compact } from '@junc/rc'

export default () => {
  return (<Compact 
    defaultValue={[12, 34]} 
    min={10}
    max={1000000}
    onChange={(val) => {
      console.log(val)
    }}
  />)
}
```

InputNumber 范围输入框: 金额按千分位 分割显示:
```tsx
import React, { useState } from 'react'
import { Compact } from '@junc/rc'

export default () => {
  return (<Compact 
    defaultValue={[12, 34]} 
    min={10}
    max={1000000}
    formatter={value => `¥ ${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    parser={ (value: any) => value.replace(/\¥\s?|(,*)/g, '')}
    onChange={(val) => {
      console.log(val)
    }}
  />)
}
```


### Compact props

基于 antd  InputNumber 组件开发，属性参数继承至 InputNumber 组件，[value, defaultVaue, placeholder] 等属性改为 数组类型
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | Compact 组件的宽 | number\|string | 180 |  |
| value | - | InputNumberProps['value'][] |  |  |
| defaultVaue | - | InputNumberProps['defaultVaue'][] |  | 
| placeholder | - | InputNumberProps['placeholder'][] |  |  |
