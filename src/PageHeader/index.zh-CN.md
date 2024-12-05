---
category: Components
title: PageHeader
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 2
---


基本配置

```tsx
import { PageHeader } from '@junc/rc';
import { MenuProps } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { User, Message } = PageHeader
const logo = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
const src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        个人中心
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        个人设置
      </a>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        退出登录
      </a>
    ),
  },
]

const dataSource = [
  {title: '最新消息，小日本爆炸了', time: '2022-08-23 14:23:34' },
  {title: '小日本要向大海排污了，此举遭到联合国强烈反对', time: '2022-08-23 14:23:34' },
  {title: 'xxxxss', time: '2022-08-23 14:23:34' }
]

export default () => (<PageHeader 
    style={{background: '#e5e5e5', height: 48, padding: '0 12px'}}
    logo={logo} 
    title={<span style={{color: '#fff'}}>云极</span>}
  >
    <QuestionCircleOutlined style={{marginRight: 18}} />
    <Message count={99} dataSource={dataSource} />
    <div style={{marginLeft: 18}}><User src={src} name="朱镕基" menu={{items}} /></div>
  </PageHeader>)
```

自定义 Logo
```tsx
import { PageHeader } from '@junc/rc';
import { MenuProps, Image } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { User, Message } = PageHeader
const logo = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
const src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        个人中心
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        个人设置
      </a>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        退出登录
      </a>
    ),
  },
]

const dataSource = [
  {title: '最新消息，小日本爆炸了', time: '2022-08-23 14:23:34' },
  {title: '小日本要向大海排污了，此举遭到联合国强烈反对', time: '2022-08-23 14:23:34' },
  {title: 'xxxxss', time: '2022-08-23 14:23:34' }
]

const Logo = () => (<div><Image src={logo} width={36} preview={false} /> &nbsp;&nbsp;云极</div>)
export default () => (<PageHeader 
    style={{background: '#e5e5e5', height: 48, padding: '0 12px'}}
    renderLogo={() => <Logo />}
  >
    <QuestionCircleOutlined style={{marginRight: 18}} />
    <Message count={99} dataSource={dataSource} />
    <div style={{marginLeft: 18}}><User src={src} name="朱镕基" menu={{items}} /></div>
  </PageHeader>)
```
