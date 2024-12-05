---
category: Components
title: WithFormSettingProTable 
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

基于 Antd Tree 组件开发，组件属性参数请参考 antd Tree 组件

```tsx
import React, { useState } from 'react'
import { TreeSelect, Table } from 'antd'
import { WithFormSettingProTable } from '@junc/rc'

const columnsFn: (operate?: Function) => ProColumns<TableListItem>[] = (operate) => {
  return [
    {
        title: '姓名',
        dataIndex: 'contactsName',
        key: 'contactsName',
        width: 100,
        order: 7,
        fixed: 'left',
    },
    {
        title: '主要联系人',
        dataIndex: 'primaryContact',
        key: 'primaryContact',
        fixed: 'left',
        width: 120, 
        hideInSearch: true,
        render: (text: any) => `${['1'].includes(text) ? '是' : '否'}`
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer',
        width: 120, 
        order: 3,
    },
    {
        title: '手机号',
        dataIndex: 'mobilePhoneNumber',
        key: 'mobilePhoneNumber',
        width: 180,
        order: 6,
    },
    {
        title: '固话',
        dataIndex: 'fixedTelephoneNumber',
        key: 'fixedTelephoneNumber',
        hideInSearch: true,
    },
    {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        hideInSearch: true,
    },
    {
        title: '微信号码',
        dataIndex: 'wechatAccount',
        key: 'wechatAccount',
        hideInSearch: true,
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        hideInSearch: true,
    },
    {
        title: '钉钉号',
        dataIndex: 'dingNumber',
        key: 'dingNumber',
        hideInSearch: true,
    },
    {
        title: '联系结果反馈',
        dataIndex: 'contactFeedbackStr',
        key: 'contactFeedbackStr',
        hideInSearch: true,
    },
    {
        title: '职位',
        dataIndex: 'jobPosition',
        key: 'jobPosition',
        valueType: 'select',
        order: 5,
        params: { dictId: 22 },
        render: (_, record: any) => `${record.jobPositionStr||'-'}` 
    },
    {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
        order: 4,
        params: { dictId:27 },
        render: (text: any, record: any) => `${record.sourceStr||'-'}`
    },
    // {
    //     title: '创建人',
    //     dataIndex: 'creator',
    //     key: 'creator',
    //     hideInSearch: true,
    // },
    {
        title: '客户归属人',
        dataIndex: 'ownerStr',
        key: 'ownerStr',
        order: 100,
        fieldProps: {
            maxTagCount: 4,
            treeCheckable: true,
            showSearch: true,
            treeNodeFilterProp: 'title',
            treeData: []
        },
        renderFormItem: (props) => <TreeSelect />,
        search: {
            transform: (ids) => {
                const owner = (ids||[]).map((v: string) => v.slice(1))
                return { owner }
            },
        },
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        order: 2, 
        fieldProps: { allowEmpty: [true, true]},
        valueType: 'dateRange',
        render: (text: any, record: any) => `${record.createTime|| '-'}`
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        order: 1,
        fixed: 'right',
        fieldProps: { allowEmpty: [true, true]},
        valueType: 'dateRange',
        render: (text: any, record: any) => `${record.updateTime||'-'}`
    }
  ]
}

const dataSource = [
  {
    id: 1,
    contactsName: 'aaaa',
    dingNumber: 'xxxx',
    num: 23
  },
  {
    id: 2,
    contactsName: 'bbbb',
    dingNumber: 'xxxx',
    num: 45
  },
]

const request = async () => {
  return {
    data: dataSource,
    total: 29,
    success: true,
    summaryData: {
      num: 100
    }
  }
}

// 自定义 footer 总结栏
const TableSummary = ({options, data}) => {
  return (<Table.Summary fixed>
              <Table.Summary.Row>
              <Table.Summary.Cell key="总计" align='center' index={0}>总计</Table.Summary.Cell>
                {
                  options?.filter((item: any) => item.show).map((v: any, idx: number) => <Table.Summary.Cell key={v.param} align='center' index={idx+1}>{data[v.param]}</Table.Summary.Cell> )
                }
              </Table.Summary.Row>
          </Table.Summary>)
}

export default () => {
  return (<WithFormSettingProTable<TableListItem>
              // scroll={{x: 1800}}
              scroll={{x: 'max-content'}}
              columns={columnsFn(() => null)}
              request={request}
              options={{reload: false, density: false}}
              toolbar={{
                  actions: [],
              }}
              rowKey="id"
              summary={(options, data) => <TableSummary options={options} data={data||{}} />}
              rowSelection={{
                    preserveSelectedRowKeys: true,
                    columnWidth: '46px',
              }}
              pagination={{defaultPageSize: 10}}
              columnsState={{ persistenceKey: 'customer/contact', persistenceType: 'localStorage'}}
              searchState={{ persistenceKey: 'customer/contact:searchState', persistenceType: 'localStorage' }}
          />)
}
```
### WithFormSettingProTable props
属性继承 antdPro ProTable, 以下是额外属性

columnsState	受控的列状态，可以操作显示隐藏	ColumnStateType
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| searchState | 受控的 form 搜索条件控制，可以操作显示隐藏排序 | SearchStateType |  |  |


SearchStateType
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| persistenceKey | 持久化form 条件的 key，用于判断是否是同一个 form | string \| number |  |  |
| persistenceType | 持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 | localStorage \| sessionStorage |  |  |


