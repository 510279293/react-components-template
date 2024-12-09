---
category: Components
title: Login(废弃)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 2
---

登录组件，依托于 antd-design/pro-components  LoginForm 组件再次封装 

## 登录(组件级)
账号密码登录
```tsx
import { message } from 'antd';
import { Login } from '@junc/rc';
import { LoginForm } from '@ant-design/pro-components';
const { AccountForm, PhoneForm, AutoLogin } = Login
export default () => (<Login 
    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
    title="云极"
    subTitle="全球最大的短信服务平台"
  >
  <AccountForm />
  <AutoLogin />
</Login>)
```

手机号登录
```tsx
import { message } from 'antd';
import { Login } from '@junc/rc';
import { LoginForm } from '@ant-design/pro-components';
const { AccountForm, PhoneForm, AutoLogin } = Login
export default () => (<Login 
    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
    title="云极"
    subTitle="全球最大的短信服务平台"
  >
  <PhoneForm />
  <AutoLogin checkboxText="记住密码" right={<a style={{float: 'right' }}>忘记密码</a>} />
</Login>)
```

带 Tab 切换的组合式登录
```tsx
import { message } from 'antd';
import { Login } from '@junc/rc';
const { AccountForm, PhoneForm, AutoLogin } = Login
const onGetCaptcha = async (phone: string) => {
  console.log(phone)
  message.success('获取验证码成功！验证码为：1234')
}
const items: any[] = [
  { label: '账号密码登录', key: 'account', children: <AccountForm /> },
  { label: '手机号登录', key: 'phone', children: <PhoneForm onGetCaptcha={onGetCaptcha} /> }
]
export default () => (<Login 
    items={items} 
    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
    title="云极"
    subTitle="全球最大的代码托管平台"
    onFinish={async (values) => {console.log(values)}}
  >
  <AutoLogin />
</Login>)

```

## 登录(页面级)
```tsx
import { message, Tabs } from 'antd';
import { LoginFormPage } from '@ant-design/pro-components';
import { Login } from '@junc/rc';

const { AccountForm, PhoneForm, AutoLogin } = Login
const onGetCaptcha = async (phone: string) => {
  console.log(phone)
  message.success('获取验证码成功！验证码为：1234')
}
const items: any[] = [
  { label: '账号密码登录', key: 'account', children: <AccountForm /> },
  { label: '手机号登录', key: 'phone', children: <PhoneForm onGetCaptcha={onGetCaptcha} /> }
]

export default () => (<LoginFormPage
    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
    title="云极"
    subTitle="全球最大的代码托管平台"
    backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
    onFinish={async (values) => {console.log(values)}}
  >
    <Tabs centered items={items as any} destroyInactiveTabPane />
    <AutoLogin />
</LoginFormPage>)
```
