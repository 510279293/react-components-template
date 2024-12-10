import { useModalHook, useProTableHook } from "../hooks";
import { ListToolBarProps, ModalForm, ModalFormProps, ProColumns, ProFormColumnsType, ProTableProps } from "@ant-design/pro-components";
import { Modal } from "antd";
import { Key, ReactNode } from "react";
import WithFormSettingProTable, { WithFormSettingProTableProps } from "../WithFormSettingProTable";

type ActionType = 'add' | 'update' | 'del' | any;
type OperateType = (action: ActionType, record?: any) => Promise<any>;

interface ToolbarProps extends Omit<ListToolBarProps, 'actions'> {
    actions?: ReactNode | (({operate, hasPermission, selectedRowKeys}: {operate: OperateType, hasPermission: (code?: any) => boolean, selectedRowKeys: Key[]}) => React.ReactNode[]);
}
// interface 
export type ProTableModalFormProps<T> = {
    columns: ProFormColumnsType<any, any>[] | (({operate, hasPermission}: {operate: OperateType, hasPermission?: (code?: any) => boolean}) => ProFormColumnsType<any, any>[]);
    toolbar?: ToolbarProps;
    onSave?: (action: ActionType, record?: any, values?: any) => void;
    children?: React.ReactNode;
    modalProps?: ModalFormProps;
    hasPermission?: (code?: any) => boolean;
} & WithFormSettingProTableProps<T> & Omit<ProTableProps<any, any, any>, 'columns'| 'toolbar'>

function ProTableModalForm<T>({columns, hasPermission, children, onSave, toolbar, ...rest}: ProTableModalFormProps<T>) {
    const {
        actionRef,
        rowSelection,
        selectedRowKeys
    } = useProTableHook({})

    const {
        modalProps,
        onSuccess,
        createAction
    } = useModalHook({
        callBack: actionRef.current?.reload
    })

    const operate = async (action: ActionType, record?: any) => {
        const { params, request } = rest?.modalProps || {}
        const payload = Object.assign(record||{}, params||{})
        switch(action) {
            case 'add': {
                return createAction(action, {
                    ...rest?.modalProps,
                    params: {},
                    request: request ? () => request?.(action, payload) : undefined,
                    onFinish: async(values?: any) => {
                        const success = await onSave?.(action, payload, values)
                        success && onSuccess?.()
                    }
                })
            }
            case 'update': {
                return createAction(action, {
                    ...rest?.modalProps,
                    params: Object.assign(record||{}, params||{}),
                    request: request ? () => request?.(action, payload) : undefined,
                    onFinish: async(values?: any) => {
                        const success = await onSave?.(action, payload, values)
                        success && onSuccess?.()
                    }
                })
            }
            case 'del':
                return Modal.confirm({
                    title: '确认要删除该数据吗?',
                    content: '删除后当前内容将永久删除，不可恢复。',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        const success = await onSave?.(action, payload, {selectedRowKeys})
                        if (success) {
                            onSuccess?.()
                            return Promise.resolve()
                        }
                        return Promise.reject()
                    }
                });
            default:
                return onSave?.(action, payload)
        }
    }

    const createColumns = () => typeof columns === 'function' ? columns?.({operate, hasPermission}) : columns
    const toolbarActions = () => (typeof toolbar?.actions === 'function') ? ((toolbar||{}).actions as any)?.({operate, hasPermission, selectedRowKeys}) : toolbar?.actions

    return (<>
       <WithFormSettingProTable 
            columns={createColumns() as ProColumns<any, any>[]}
            toolbar={{
                ...toolbar,
                actions: toolbarActions(),
            }}
            actionRef={actionRef}
            rowSelection={rowSelection}
            {...rest}
       />
       <ModalForm<any> 
            layout="horizontal" 
            width={500} 
            labelCol={{span: 4}} 
            {...rest?.modalProps}
            {...modalProps}
        >
            {children}
        </ModalForm>
    </>)
}

export default ProTableModalForm