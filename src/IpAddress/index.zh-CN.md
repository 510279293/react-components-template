---
category: Components
title: IpAddress（Ip地址）
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 6
---

IpAddress ip4地址组件:

```jsx
import React, { useState } from 'react'
import { IpAddress } from '@junc/rc'

export default () => {
  return (<IpAddress defaultValue="192.168.2.125" onChange={(val) => console.log('vval', val)} />)
}
```

```jsx
import React, { useState } from 'react'
import { IpAddress } from '@junc/rc'

export default () => {
  return (<IpAddress 
    disabled={true} 
    defaultValue="192.168.2.125"
  />)
}
```

IpAddress ip6地址组件:
```jsx
import React, { useState } from 'react'
import { IpAddress } from '@junc/rc'

export default () => {
  return (<IpAddress 
    disabled={false} 
    type="ipv6"
    defaultValue="fe80::204:61ff:fe9d:f156"
  />)
}
```

### IpAddress props

基于 antd  Input 组件开发，属性参数继承至 Input 组件，额外参数如下：
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value | ip值 | 'ipv4'\|'ipv6'\|string |  |  |
| type | ip格式 | 'ipv4'\|'ipv6' | ipv4 |  |

