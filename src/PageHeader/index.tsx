import React, {ReactNode, type FC, CSSProperties } from 'react';
import { Avatar, Badge, Col, Dropdown, DropdownProps, Image, ImageProps, List, Popover, PopoverProps, Row } from 'antd';
import {
  BellOutlined,
  // AlipayCircleOutlined,
  // TaobaoCircleOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';

// const src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"

type UserProps = {
  src?: string;
  name?: ReactNode;
} & DropdownProps
const User: FC<UserProps> = ({src, name, menu, ...rest}) => {
  const ownProps = {
    menu,
    open: menu?.items?.length ? undefined : false,
    ...rest
  }
  return (<Dropdown placement="bottom" {...ownProps}>
   <div><Avatar src={src} />{name}</div>
  </Dropdown>)
};

const MeaasgeContent = ({dataSource}: any) => {
  return (<div>
      <List
         itemLayout="horizontal"
         dataSource={dataSource||[]}
         style={{width: 240}}
         size="small"
         split={false}
         renderItem={(item: any) => (<List.Item style={{padding: '5px 16px', display: 'block', cursor: 'pointer'}}>
          <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.title}</div>
          <div style={{color: 'rgb(168,168,168)'}}>{item.time}</div>
         </List.Item>)}
         header={<div style={{width: '100%', padding: '0 0 8px 8px', borderBottom: '1px solid #e5e5e5'}}>未读消息</div>}
         footer={<div style={{width: '100%', textAlign: 'center', paddingTop: 10, borderTop: '1px solid #e5e5e5'}}><a>查看更多&gt;</a></div>}
      />
  </div>)
}

type MessageProps = {
  count?: number;
  dataSource?: any[];
} & PopoverProps
const Message: FC<MessageProps> = ({count, dataSource, ...rest}) => {
  return (<Popover placement="bottom" overlayInnerStyle={{padding: 0}} content={<MeaasgeContent dataSource={dataSource} />} {...rest}>
    <Badge count={count}>
      <BellOutlined style={{height: '100%'}} />
    </Badge>
  </Popover>)
};

type LogoProps =  {
  title?: any;
} & ImageProps
const Logo: FC<LogoProps> & ImageProps = ({src, title, ...rest}) => {
  return (src || title) ? (<div style={{display: 'flex', alignItems: 'center', padding: '5px 10px'}}>
    { src ? <Image src={src} preview={false} {...rest} /> : null }
    { title ? <span style={{marginLeft: 6}}>{title}</span> : null }
  </div>) : null
}

type PageHeaderProps = {
  logo?: string;
  title?: any;
  renderLogo?: () => ReactNode;
  children?: any;
  style?: CSSProperties;
  size?: 'small' | 'middle' | 'large'
}

type PageHeaderStaticProps = {
  Logo?: any;
  User?: any;
  Message?: any;
}

const PageHeader: FC<PageHeaderProps> & PageHeaderStaticProps = ({logo, title, renderLogo, children, ...rest}) => {
  return (<Row justify="space-between" align="middle" wrap={false}  {...rest}>
    <Col style={{cursor: 'pointer'}}>
      { renderLogo ? renderLogo() : <Logo preview={false} height={36} src={logo} title={title} /> }
    </Col>
    <Col flex="auto" style={{display: 'flex', justifyContent: 'flex-end',}}>
      {children}
    </Col>
  </Row>)
}
PageHeader.Logo = Logo
PageHeader.User = User
PageHeader.Message = Message

export default PageHeader
