import React, { FC, ReactNode, useEffect, useState } from "react"
import FormDragSetting, { getFormDragSettingOptions, setColumnsByOptions } from './FormDragSetting'
import { ColumnsState, ParamsType, ProTable, ProTableProps } from "@ant-design/pro-components";
import { cloneDeep } from "lodash";
import { Table } from "antd";

const TableSummary: FC<any> = ({options, data}) => {
  return (<Table.Summary fixed>
              <Table.Summary.Row>
              <Table.Summary.Cell key="总计" align='center' index={0}>总计</Table.Summary.Cell>
                {
                  options?.filter((item: any) => item.show).map((v: any, idx: number) => <Table.Summary.Cell key={v.param} align='center' index={idx+1}>{data[v.param]||' '}</Table.Summary.Cell> )
                }
              </Table.Summary.Row>
          </Table.Summary>)
}


type WithFormSettingProTableProps<T> = {
  settingOptions?: any[];
  searchState?: { persistenceKey: string, persistenceType: 'localStorage' | 'sessionStorage'};
  summary?: (options: any[], data: any) => any;
} & ProTableProps<Record<string, T>,ParamsType>

const useWithFormSettingProTablehooks = ({columns, searchState}: any) => {
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
  return (columns||[])?.filter((column: any) => !column.hiddenInTable).map((v: any) => ({param: v.dataIndex, show: true}))
}

const useProTabSummaryHooks = ({originRequest, columns, columnsState}: any) => {
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
  }

  const request = async (...args: any[]) => {
    const { summaryData, ...rest } = await originRequest?.call(null, ...args) as any
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

const WithFormSettingProTable: <T>(props: WithFormSettingProTableProps<T>) => ReactNode = ({columns, searchState, columnsState, request: originRequest, summary, ...restProps}) => {
  const {
    ownColumns,
    settingOptions,
    onFormSettingChange,
  } = useWithFormSettingProTablehooks({columns, searchState})

  const {
    request,
    summaryOptions,
    setSummaryOptions,
    summaryData,
    getSummaryOptions
  } = useProTabSummaryHooks({originRequest, columns, columnsState})

  const ownProps = {
    columns: ownColumns as any,
    summary: summary ? () => summary(summaryOptions, summaryData) : summaryData ? () => <TableSummary options={summaryOptions} data={summaryData} /> : undefined,
    request: originRequest ? request : undefined,
    searchState,
    columnsState: typeof columnsState === 'object' ? {
      ...columnsState,
      onChange: (value: Record<string, ColumnsState>) => {
        const columnState = getSummaryOptions(value)
        setSummaryOptions(columnState as any)
      }
    } : columnsState,
    ...restProps
  }

  return (<ProTable
            search={{
              optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                <FormDragSetting key="drag" options={settingOptions as any} onChange={onFormSettingChange} />,
              ],
            }}
            {...ownProps}
          />)
}


export default WithFormSettingProTable
