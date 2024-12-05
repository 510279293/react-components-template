---
category: Components
title: Editor (编辑器)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 2
---

推荐使用: https://react-component.github.io/footer/demo/rows

基本配置

```jsx
import { Editor } from '@junc/rc';
import { QuestionCircleOutlined } from '@ant-design/icons'
const logo = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
const src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
export default () => (
    <Editor 
       init={{
        language:'zh_CN'
       }}
    />
)
```
