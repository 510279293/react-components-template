import React, { FC, ReactNode, useEffect, useState } from "react"
import FormDragSetting, { getFormDragSettingOptions, setColumnsByOptions } from './FormDragSetting'
import { ColumnsState, ParamsType, ProTable, ProTableProps } from "@ant-design/pro-components";
import { cloneDeep } from "lodash";
import { Table } from "antd";
// import { useModalHook, useProTableHook } from "../hooks";

const TableSummary: FC<any> = ({options, data}) => {
  return (<Table.Summary fixed>
              <Table.Summary.Row>
                {
                  options?.filter((item: any) => item.show).map((v: any, idx: number) => <Table.Summary.Cell key={v.param} index={idx}>{ idx !== 0 ? data[v.param] : '总计'}</Table.Summary.Cell> )
                }
              </Table.Summary.Row>
          </Table.Summary>)
}

// type ActionType = 'add' | 'update' | 'del' | any;
// type OperateType = (action: ActionType, record?: any) => Promise<any>;

// interface ToolbarProps extends Omit<ListToolBarProps, 'actions'> {
//     actions?: ReactNode | (({operate, hasPermission, selectedRowKeys}: {operate: OperateType, hasPermission: (code?: any) => boolean, selectedRowKeys: Key[]}) => React.ReactNode[]);
// }

export type WithFormSettingProTableProps<T> = {
  settingOptions?: any[];
  searchState?: { persistenceKey: string, persistenceType: 'localStorage' | 'sessionStorage'};
  summary?: (options: any[], data: any) => any;
  // columns: ProFormColumnsType<any, any>[] | (({operate, hasPermission}: {operate: OperateType, hasPermission?: (code?: any) => boolean}) => ProFormColumnsType<any, any>[]);
  // toolbar?: ToolbarProps;
  // onSave?: (action: ActionType, record?: any, values?: any) => void;
  // children?: React.ReactNode;
  // modalProps?: ModalFormProps;
  // hasPermission?: (code?: any) => boolean;
} & ProTableProps<Record<string, T>,ParamsType>

const useWithFormSettingProTablehook = ({columns, searchState}: any) => {
  const { persistenceKey, persistenceType } = searchState || {}
  const columnsBack = cloneDeep(columns)

  const getInitSettingOptions = (columns: any[]) => {
    if ( persistenceType && persistenceKey ) {
      const settingOptionsStr = (window[persistenceType] as any)?.getItem(persistenceKey)
      const settingOptions = JSON.parse(settingOptionsStr as any) || getFormDragSettingOptions(columns as any)
      return settingOptions
    } else {
      return getFormDragSettingOptions(columns as any)
    }
  }

  const getInitColumns = (settingOptions: any) => {
    return setColumnsByOptions(settingOptions as any, columnsBack as any)
  }

  const initSettingOptions = getInitSettingOptions(columnsBack as any)
  const initColumns = getInitColumns(initSettingOptions)
  const [ownColumns, setOwnColumns] = useState(initColumns)
  const [settingOptions, setSettingOptions] = useState(initSettingOptions)

  const onFormSettingChange = (options: any[], type: string) => {
    if (type === 'reset') {
      const settingOptions = getFormDragSettingOptions(columns as any)
      setSettingOptions(settingOptions)
    } else {
      setSettingOptions(options as any)
    }
  }

  useEffect(() => {
    if (persistenceType && persistenceKey && window) {
      (window[persistenceType] as any).setItem(persistenceKey, JSON.stringify(settingOptions))
    }
    const newColumns = setColumnsByOptions(settingOptions as any, columnsBack as any)
    setOwnColumns([...newColumns] as any)
  }, [settingOptions, columns])

  return {
    ownColumns,
    settingOptions,
    onFormSettingChange
  }
}

const getSummaryOptionsByColumns = (columns: any) => {
  const summaryOptions = columns.filter((column: any) => !(column.hideInTable === true)).map((v: any) => ({param: v.dataIndex, show: true}))
  return summaryOptions
}

const useProTabSummaryHook = ({columns, columnsState, ...restProps}: any) => {
  const [summaryOptions, setSummaryOptions] = useState([])
  const [summaryData, setSummaryData] = useState(null)

  const getSummaryOptions = (localState?: any) => {
    const { persistenceKey, persistenceType } = columnsState || {}
    if (localState) {
      const allSortOptions = getSummaryOptionsByColumns(columns)?.map((v: any) => ({...v, ...localState[v.param]})).sort((a: any, b: any) => a.order - b.order)
      const leftFixedOptions = allSortOptions?.filter((v: any) => v.fixed === 'left')
      const noFixedOptions = allSortOptions?.filter((v: any) => !v.fixed)
      const rightFixedOptions = allSortOptions?.filter((v: any) => v.fixed === 'right')
      return [...leftFixedOptions, ...noFixedOptions, ...rightFixedOptions]
    }
    if (persistenceKey && persistenceType) {
      const newlocalState = JSON.parse((window[persistenceType] as any)?.getItem?.(persistenceKey))
      const allSortOptions = getSummaryOptionsByColumns(columns).map((v: any) => ({...v, ...newlocalState[v.param]})).sort((a: any, b: any) => a.order - b.order)
      const leftFixedOptions = allSortOptions?.filter((v: any) => v.fixed === 'left')
      const noFixedOptions = allSortOptions?.filter((v: any) => !v.fixed)
      const rightFixedOptions = allSortOptions?.filter((v: any) => v.fixed === 'right')
      return [...leftFixedOptions, ...noFixedOptions, ...rightFixedOptions]
    }
    return getSummaryOptionsByColumns(columns)
  }

  const request = async (...args: any[]) => {
    const { summaryData, ...rest } = await restProps?.request?.call(null, ...args) as any
    setSummaryData(summaryData)
    return rest
  }

  useEffect(() => {
    const columnState = getSummaryOptions()
    setSummaryOptions(columnState as any)
  }, [columns])

  return {
    request,
    summaryOptions,
    setSummaryOptions,
    summaryData,
    setSummaryData,
    getSummaryOptions
  }

}


function useWithFormSettingProTableHook<T>(props: WithFormSettingProTableProps<T>) {
  const {searchState, columnsState} = props
  const {
    ownColumns,
    settingOptions,
    onFormSettingChange,
  } = useWithFormSettingProTablehook(props)

  const {
    request,
    summaryOptions,
    setSummaryOptions,
    summaryData,
    getSummaryOptions
  } = useProTabSummaryHook(props)

  const calcSummaryOptions = () => {
    const options: any = [{param: '总计', show: true}]
    if (props.expandable && props.rowSelection) {
      return [...options, {param: undefined, show: true}, ...(summaryOptions||[])]
    }
    if (props.expandable || props.rowSelection) {
      return [...options, ...(summaryOptions||[])]
    }
    return [...(summaryOptions||[])]
  }

  const ownProps = {
    ...props,
    summary: props?.summary ? () => props?.summary?.(calcSummaryOptions(), summaryData) : summaryData ? () => <TableSummary options={calcSummaryOptions()} data={summaryData} /> : undefined,
    request: props?.request ? request : undefined,
    searchState,
    columnsState: ((props.options||{})?.setting) && (typeof columnsState === 'object' || summaryData) ? {
      ...columnsState,
      onChange: (value: Record<string, ColumnsState>) => {
        const columnState = getSummaryOptions(value)
        setSummaryOptions(columnState as any)
      }
    } : columnsState,
    search: {
      optionRender: (searchConfig: any, formProps: any, dom: any) => [
        ...dom.reverse(),
        <FormDragSetting key="drag" options={settingOptions as any} onChange={onFormSettingChange} />,
      ],
    },
    columns: ownColumns as any,
  }

  return ownProps
}

const WithFormSettingProTable: <T>(props: WithFormSettingProTableProps<T>) => ReactNode = (props) => {

  const ownProps = useWithFormSettingProTableHook(props)

  return (<ProTable
      {...ownProps}
    />)
}


export default WithFormSettingProTable
