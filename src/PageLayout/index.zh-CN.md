---
category: Components
title: PageLayout
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---


中后台页面布局, 并不是一个单独的组件，而是基于 PageHeader PageSlider Layout 组件的基础上的组合

左右布局:

```jsx
import React from "react"
import { Layout } from "antd"
import PageSlider from '../PageSlider'
import { MenuProps } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import PageHeader from "../PageHeader"
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { User, Message } = PageHeader
const { Content } = Layout

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

// Header 消息数据
const dataSource = [
  {title: '最新消息，小日本爆炸了', time: '2022-08-23 14:23:34' },
  {title: '小日本要向大海排污了，此举遭到联合国强烈反对', time: '2022-08-23 14:23:34' },
  {title: 'xxxxss', time: '2022-08-23 14:23:34' }
]

// 菜单数据
const logo = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem(<a href="/components/page-header">Option 1</a>, '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
]

const Header = () => (<PageHeader style={{background: '#e5e5e5', height: 48, paddingRight: 12}}>
    <QuestionCircleOutlined style={{marginRight: 18}} />
    <Message count={99} dataSource={dataSource} />
    <div style={{marginLeft: 18}}><User src={src} name="朱镕基" menu={{items}} /></div>
  </PageHeader>)

export default () => {
  return (<Layout hasSider>
    <PageSlider
      logo={logo}
      title={<h3 style={{color: '#fff'}}>云极</h3> as any}
      theme="dark"
      items={menuItems}
    />
    <Layout>
      <Header />
       <Content> content </Content>
    </Layout>
  </Layout>)
}

```

上下布局:
```jsx
import React from "react"
import { Layout } from "antd"
import PageSlider from '../PageSlider'
import { MenuProps } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import PageHeader from "../PageHeader"
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { User, Message } = PageHeader
const { Content } = Layout

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

// Header 消息数据
const dataSource = [
  {title: '最新消息，小日本爆炸了', time: '2022-08-23 14:23:34' },
  {title: '小日本要向大海排污了，此举遭到联合国强烈反对', time: '2022-08-23 14:23:34' },
  {title: 'xxxxss', time: '2022-08-23 14:23:34' }
]

// 菜单数据
const logo = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuItem[] = [
  getItem(<a href="/components/page-header">Option 1</a>, '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
]

const Header = () => (<PageHeader 
    style={{background: '#e5e5e5', height: 48, paddingRight: 12}}
    logo={logo}
    title={"云极"}
    >
    <QuestionCircleOutlined style={{marginRight: 18}} />
    <Message count={99} dataSource={dataSource} />
    <div style={{marginLeft: 18}}><User src={src} name="朱镕基" menu={{items}} /></div>
  </PageHeader>)

export default () => {
  return (<Layout>
    <Header />
    <Layout>
      <PageSlider
        theme="light"
        items={menuItems}
      />
      <Content> content </Content>
    </Layout>
  </Layout>)
}

```
