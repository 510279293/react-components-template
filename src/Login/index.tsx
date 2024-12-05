import React, {type FC } from 'react';
import { TabPaneProps, Tabs } from 'antd';
import {
  LoginForm,
  LoginFormProps,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  // AlipayCircleOutlined,
  // TaobaoCircleOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';

const AccountForm = () => {
  return (<>
    <ProFormText
      name="username"
      fieldProps={{
        size: 'large',
        prefix: <UserOutlined className={'prefixIcon'} />,
      }}
      placeholder='用户名'
      rules={[
        {
          required: true,
          message: '请输入用户名!',
        },
      ]}
    />
    <ProFormText.Password
      name="password"
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined className={'prefixIcon'} />,
      }}
      placeholder='密码'
      rules={[
        {
          required: true,
          message: '请输入密码！',
        },
      ]}
    />
  </>)
}

type PhoneFormProps = {
  onGetCaptcha: (mobile: string) => Promise<void>
}
const PhoneForm = ({onGetCaptcha}: PhoneFormProps) => {
  return (<>
    <ProFormText
      fieldProps={{
        size: 'large',
        prefix: <MobileOutlined className={'prefixIcon'} />,
      }}
      name="phone"
      placeholder={'手机号'}
      rules={[
        {
          required: true,
          message: '请输入手机号！',
        },
        {
          pattern: /^1\d{10}$/,
          message: '手机号格式错误！',
        },
      ]}
    />

    <ProFormCaptcha
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined className={'prefixIcon'} />,
      }}
      captchaProps={{
        size: 'large',
      }}
      placeholder={'请输入验证码'}
      captchaTextRender={(timing, count) => {
        if (timing) {
          return `${count} ${'获取验证码'}`;
        }
        return '获取验证码';
      }}
      phoneName="phone"
      name="captcha"
      rules={[
        {
          required: true,
          message: '请输入验证码！',
        },
      ]}
      onGetCaptcha={onGetCaptcha}
    />
  </>)
}

type AutoLoginProps = {
  checkboxText?: string;
  right?: any;
}
const AutoLogin = ({checkboxText, right}:AutoLoginProps) => {
  return (<div style={{ marginBlockEnd: 24 }}>
    <ProFormCheckbox noStyle name="autoLogin"> {checkboxText || '自动登陆'} </ProFormCheckbox>
    {right || <a style={{float: 'right' }}>忘记密码</a>}
  </div>)
}

interface LoginProps<T> extends LoginFormProps<T> {
  defaultLoginType?: string;
  items?: TabPaneProps[];
  children?: any;
}

type LoginStaticProps = {
  AccountForm?: any;
  PhoneForm?: any;
  AutoLogin?: any
}


const Login: FC<LoginProps<any>> & LoginStaticProps = ({items, children, ...rest}) => {
  return (<LoginForm {...rest}>
    { (items && items?.length > 1) ? <Tabs centered items={items as any} destroyInactiveTabPane /> : null}
    { children }
  </LoginForm>)
};

Login.AccountForm = AccountForm
Login.PhoneForm = PhoneForm
Login.AutoLogin = AutoLogin


export default Login;


