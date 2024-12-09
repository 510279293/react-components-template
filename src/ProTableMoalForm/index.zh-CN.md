---
category: Components
title: ProTableModalForm 
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 6
---

基于ProTable ModalForm 结合的增删改查组件

```tsx
import React, { useState } from 'react'
import { ProTableModalForm } from '@junc/rc'
import { Button, message } from 'antd'
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio, ProFormDigit } from '@ant-design/pro-form';
type OperateActionType = 'add' | 'update' | 'del'  

const columnsFn: ProTableModalFormProps['columns'] = ({operate, hasPermission}) => {
    return [
            {
                title: '字典名称',
                dataIndex: 'dictName',
                fixed: 'left',
                // order: 100,
                hideInSearch: true,
                width: 100,
                // fieldProps: {placeholder: '请输入字典名称'}
            },
            {
                title: '选项名称',
                dataIndex: 'optionName',
                width: 100,
                order: 2,
            },
            {
                title: '状态',
                dataIndex: 'status',
                order: 1,
                width: 100,
                valueEnum: {
                    0: { text: '禁用', },
                    1: { text: '启用', }
                },
                search: {
                    transform: (value: any) => {
                        return {
                            status: value,
                        };
                    },
                },
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
                dataIndex: 'phone',
                key: 'phone',
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
                title: '创建时间',
                dataIndex: 'createTime',
                // valueType: 'dateRange',
                hideInSearch: true,
                width: 100,
                fieldProps: { allowEmpty: [true, true]},
                search: {
                    transform: (value: any) => {
                        return {
                            startTime: value[0],
                            endTime: value[1],
                        };
                    },
                },
            },
            {
                title: '操作',
                key: 'option',
                valueType: 'option',
                width: 100,
                fixed: 'right',
                render: (text, record) => [
                    true ? <a key="edit" onClick={() => operate?.('update', record)}>编辑</a> : null,
                    true ? <a key="del" onClick={() => operate?.('del', record)}>删除</a> : null,
                // <DragHandle key="drag" /> 
                ],
            },
        ]
}

const mockData = new Array(100).fill({}).map((_, i) => ({
    dictName: `字典-${i}`,
    optionId: i,
    optionName: `选项-${i}`,
    status: i % 2,
    createTime: '2024-04-25',
    customer: `客户-${i}`,
    phone: '123456789',
    fixedTelephoneNumber: '123456789',
    email: '123456789',
    wechatAccount: '123456789',
    num: i,
    dingNumber: '123456789',

}))

async function addApi() {
    return {
        success: true
    }
}

async function updateApi() {
    return {
        success: true
    }
}

async function request(params: any, sorter: any, filter: any) {
    return {
        data: mockData,
        success: true,
        total: 30,
        summaryData: {
            num: 100
        }
    }
}

export default () => {
    const modalRequest = async (action: any, payload: any) => {
        console.log('-----payload', payload)
        const {
            dictName,
            optionName,
            status,
            sort,
        } = payload || {}

        return {
            dictName,
            optionName,
            status,
            sort,
        }
    }
    const onSave = async (action: any, record: any, values: any) => {
        const { optionId } = record || {}
        console.log('action---->', action, record, values)
        switch (action) {
            case 'add': {
                const { success } = await addApi({ ...values })
                return success
            }
            case 'update': {
                const { success } = await updateApi({ optionId, ...values })
                return success
            }
        }
    }

    return (<ProTableModalForm 
                rowKey="optionId"
                scroll={{x: 'max-content'}}
                columns={columnsFn as any}
                request={request}
                toolbar={{
                    actions: ({operate}) => [
                        <Button key="btn6" type="primary" onClick={() => operate?.('add', null)}>配置选项</Button>
                    ],
                }}
                onSave={onSave}
                modalProps={{
                    request: modalRequest
                }}
                rowSelection={false}
            >
                <ProFormText width="md" name="dictName" disabled label="字典名称" rules={[{required: false, message: '请填写'}]} />
                <ProFormTextArea 
                    fieldProps={{ 
                        rows:1, 
                        // showCount: true,  
                        // maxLength: 20 
                    }} 
                    width="md" 
                    name="optionName" 
                    label="选项名称" 
                    rules={[{required: true, message: '请填写选项名称'}]} 
                />
                <ProFormRadio.Group width="md" name="status" label="状态" options={[{label: '启用', value: '1'}, {label: '禁用', value: '0'}]} rules={[{required: true, message: '请选择状态'}]} />
                <ProFormDigit width="md" name="sort" label="排序字段" rules={[{required: false, message: '数值越大排名越前'}]} />
            </ProTableModalForm>)
}
```



### ProTableModalForm props
属性继承 atnd-pro ProTable props, 以下是额外属性

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| columns | columns 被改写 支持 函数类型 | columns: ProFormColumnsType<any, any>[] \| (({operate, hasPermission}: {operate: OperateType, hasPermission?: (code?: any) => boolean}) => ProFormColumnsType<any, any>[]); |  |  |
| toolbar | toolbar 被改写 支持函数类型 |  actions?: ReactNode \| (({operate, hasPermission, selectedRowKeys}: {operate: OperateType, hasPermission: (code?: any) => boolean, selectedRowKeys: Key[]}) => React.ReactNode[]); | - |  |
| request | request 被改写 支持总结栏统计 |  async () => { data: any[], success: boolean, total: number, summaryData?: Record<string, any> } | - |  |
| hasPermission | 用于权限控制的方法 | (code?: any) => boolean; |  |  |
| modalProps | 增删改的弹窗组件 props | ModalFormProps | - |  |
| onSave | 用于增删改等表单提交事件，返回 Promise.reslove(true) 则关闭弹窗 | async(action: ActionType, record?: any, values?: any) => boolean; | - |  |
| children | ModalForm 组件的 children |  | - |  |

