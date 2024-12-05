---
category: Components
title: Time (相对时间)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

基本用法，根据传入的时间显示相对时间
```jsx
import { Time } from '@junc/rc'

export default () => (<Time time="2023-09-11 18:05:45" />)
```

参数用法: interval 参数可设置 setInterval 定时计算的时长
```jsx
import { Time } from '@junc/rc'

const Test = () => {
  console.log('hello, i am test')
  return (<div>test</div>)
}
export default () => (<div>
  我是兄弟组件
  <Test />
  <Time time="2023-09-12 09:10:45" interval={1} />
</div>)
```

### Time props


<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| time | 时间点 | number \| Date \| string |  |  |
| interval | 自动更新的间隔，单位：秒; (false 为取消自动更新) | number \| boolean | 60 |  |

