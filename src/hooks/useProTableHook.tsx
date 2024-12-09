import { ActionType, ProTableProps } from "@ant-design/pro-table";
import { useRef, useState } from "react";
import { Table } from "antd"

type useProTableHookProps = {
    // columnsFn: any;
    // operate?: (action: string, record: any) => void;
    // delApi?: (params: any, showMsg: boolean, callBack?: () => void) => void;
    columns?: ProTableProps<any, any>['columns'];
    // resizableHeaderColumnsState?: OptionsType['columnsState']
}
const useProTableHook = ({ columns }: useProTableHookProps) => {
    const formRef = useRef<any>(null)
    const actionRef = useRef<ActionType>(null); 
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onRefresh = () => actionRef.current?.reload() // ProTable 表格刷新函数
    const pagination = {defaultPageSize: 10, showSizeChanger: true}
    const rowSelection = {
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT], 
        onChange: setSelectedRowKeys
    }

    // const { components, resizableColumns } = useAntdResizableHeader({ columns, columnsState: createResizableHeaderColumnsState(resizableHeaderColumnsState), });

    // const delAction = (params: any) => Modal.confirm({
    //     title: '确认要删除该数据吗?',
    //     content: '删除后当前内容将永久删除，不可恢复。',
    //     okText: '确认',
    //     cancelText: '取消',
    //     onOk: async() => {
    //         await delApi?.(params, true, onRefresh)
    //     },
    // });

    const getQueryParams = (otherParams?: Record<string, any>) => {
        return {
            ...formRef.current?.getFieldsFormatValue(),
            ...otherParams
        }
    }
    
    // const getDvmExportParams = (otherParams?: Record<string, any>) => {
    //     const showInTableColumns = resizableColumns?.filter(column => (!column.hideInTable && !['option'].includes(column?.valueType as any)))
    //     return {
    //         ...formRef.current?.getFieldsFormatValue(),
    //         fields: showInTableColumns.map(column => column.dataIndex).toString(),
    //         captions: showInTableColumns.map(column => column.title).toString(),
    //         ...otherParams
    //     }
    // }

    return {
        actionRef,
        formRef,
        getQueryParams,
        // getDvmExportParams,
        onRefresh,
        // delAction,
        pagination,
        // components,
        // columns: resizableColumns,
        columns,
        selectedRowKeys,
        rowSelection
    }
}

export default useProTableHook