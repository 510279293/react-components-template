---
category: Components
title: util (通用方法)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

```ts
const allDateRanges: any = {
  '今天': [dayjs(), dayjs()],
  '昨天': [dayjs().add(-1, 'days'), dayjs().add(-1, 'days')],
  '近7天': [dayjs().add(-7, 'days'), dayjs()],
  '近30天': [dayjs().add(-30, 'days'), dayjs()],
  '本周': [dayjs().startOf('isoWeek' as any), dayjs().endOf('isoWeek' as any)],
  '上周': [dayjs().startOf('isoWeek' as any).add(-7, 'days'), dayjs().endOf('isoWeek' as any).add(-7, 'days')],
  '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
  '上月': [dayjs().startOf('month').add(-1, 'month'), dayjs().endOf('month').add(-1, 'month')],
  '本季': [dayjs().startOf('quarter' as any), dayjs().endOf('quarter' as any)],
  '上季': [dayjs().startOf('quarter' as any).add(-1, 'quarter' as any), dayjs().endOf('quarter' as any).add(-1, 'quarter' as any)],
  '本年': [dayjs().startOf('year'), dayjs().endOf('year')],
  '上年': [dayjs().startOf('year').add(-1, 'year'), dayjs().endOf('year').add(-1, 'year')]
}
```


```jsx
import { Time, utils } from '@junc/rc'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const { allDateRanges } = utils
console.log(utils)
const rangePresets = Object.keys(allDateRanges).map(key => ({label: key, value: allDateRanges[key]}))
export default () => <RangePicker presets={rangePresets} />
```
