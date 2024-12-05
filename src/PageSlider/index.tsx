import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';
import PageHeader from '../PageHeader';
const { Logo } = PageHeader
const { Sider } = Layout;

type PageSliderProps = {
  logo?: string;
  title?: any;
} & MenuProps

export default ({logo, title, theme, ...rest}: PageSliderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        theme={theme}
      >
        <Logo src={logo} height={48} title={!collapsed ? title : null} />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineIndent={20}
          inlineCollapsed={collapsed}
          items={[]}
          theme={theme}
          {...rest}
        />
      </Sider>
  )
}
