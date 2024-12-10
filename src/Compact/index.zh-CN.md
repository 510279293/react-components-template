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
import { InputNumberRange } from '@junc/rc'

export default () => {
  return (<InputNumberRange 
    warpStyle={{width: 180}}
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
import { InputNumberRange } from '@junc/rc'

export default () => {
  return (<InputNumberRange 
    warpStyle={{width: 240}}
    defaultValue={[12, 34]} 
    min={10}
    max={1000000}
    thousandsSeparator
    onChange={(val) => {
      console.log(val)
    }}
  />)
}
```



SelectInput 下拉组合框:
```tsx
import React, { useState } from 'react'
import { SelectInput } from '@junc/rc'
const options = [
  {
    label: '名称',
    value: 'name'
  },
  {
    label: 'ID',
    value: 'id'
  },
  {
    label: '关键字',
    value: 'keyword'
  }
]
export default () => {
  return (<SelectInput 
    warpStyle={{width: 240}}
    options={options}
    defaultValue={{keyword: '我是关键字'}}
    onChange={(val) => {
      console.log(val)
    }}
  />)
}
```

### InputNumberRange props

基于 antd  InputNumber 组件开发，属性参数继承至 InputNumber 组件，[value, defaultVaue, placeholder] 等属性改为 数组类型
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| warpStyle | Compact 组件的样式 | CSSProperties |  |  |
| thousandsSeparator | 是否显示千分位分隔符 | boolean | false |  |
| value | - | InputNumberProps['value'][] |  |  |
| defaultVaue | - | InputNumberProps['defaultVaue'][] |  | 
| placeholder | - | InputNumberProps['placeholder'][] |  |  |


### SelectInput props

基于 antd  Select Input 组件开发，属性参数继承至 Select Input 组件，[value, defaultVaue] 等属性改为 对象类型， 其他属性改为 数组类型
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| warpStyle | Compact 组件的样式 | CSSProperties |  |  |
| thousandsSeparator | 是否显示千分位分隔符 | boolean | false |  |
| value | - | Record<string, number> |  |  |
| defaultVaue | - | Record<string, number> |  |  |
| fieldProps | props 属性数组 | [SelectProps, InputProps] |  |  |

