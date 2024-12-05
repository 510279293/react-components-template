import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { Checkbox, Col, Popover, Row, Tooltip } from "antd";
import { CheckboxGroupProps, CheckboxProps } from 'antd/es/checkbox'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { ProColumnType } from "@ant-design/pro-table";
import { arrayMoveImmutable } from 'array-move';
import { isFunction } from "lodash";
import {
  SettingOutlined,
  HolderOutlined
} from '@ant-design/icons';
import './style/index.less'

interface DragSortWarpProps extends SortableContainerProps {
    warpStyle?: CSSProperties;
    warpClassName?: string;
    children?: ReactNode;
}

type OptionsItemType = {
    label: string;
    value: string | number;
    checked?: boolean;
}
type FormDragSettingProps = {
    options: OptionsItemType[];
    onChange: (options: OptionsItemType[], type: string) => void;
}

interface PopoverContentProps extends CheckboxGroupProps{
    onSortEnd?: (val: any) => void
}

interface PopoverTitleProps extends CheckboxProps{
    onReset?: () => void;
}

interface OwnProColumnType extends ProColumnType{
    hideInSearchImportant?: boolean
}

export const getFormDragSettingOptions = (columns: ProColumnType[]) => columns.filter(({hideInSearch, key}) => !hideInSearch && key !== 'option').sort((a,b) => (b.order||0) - (a.order||0)).map(({dataIndex: value, title: label}: any) => ({label: isFunction(label) ? label({}, 'form') : label, value, checked: true}))
export const setColumnsByOptions = (options: OptionsItemType[], columns: OwnProColumnType[]) => {
    let len = (options||[]).length;
    (options||[]).forEach((v) => {
        const thatItem = columns.find(item => item.dataIndex === v.value)||{} as any
        Object.assign(thatItem, {
           order: len--,
           hideInSearch: (thatItem?.hideInSearchImportant as any) || !v.checked,
        })
    })
    return columns
}

const getCheckedValue = (options: any[]) => options.filter(v => v.checked).map(v => v.value)

const DragHandle = SortableHandle(({children}: any) => <div><HolderOutlined />&nbsp;&nbsp;{children}</div>) as any
const DragSortWarp: any = SortableContainer(({ children, warpStyle, warpClassName }: DragSortWarpProps) => <div className={warpClassName} style={warpStyle}>{children}</div>)
const DragSortItem = SortableElement(({ children }: any) => children) as any

const PopoverTitle = ({onReset, ...rest}: PopoverTitleProps) => (<Row justify="space-between">
  <Col>
    <Checkbox {...rest}>筛选项设置</Checkbox>
  </Col>
  <Col>
    <a onClick={() => onReset && onReset()}>重置</a>
  </Col>
</Row>)

const PopoverContent = ({options, onSortEnd, ...rest}: PopoverContentProps) => {
    return (<DragSortWarp helperClass="dargging" lockAxis="y" useDragHandle onSortEnd={onSortEnd}>
        <Checkbox.Group style={{width: 224}} value={getCheckedValue(options as any)} {...rest}>
        {
            (options||[]).map(({label, value}: any, idx) =>
            <DragSortItem key={value} index={idx} >
                <Row align="middle" style={{flex: 'none', width: '100%'}}>
                    <DragHandle>
                      <Checkbox value={value}>{label}</Checkbox>
                    </DragHandle>
                </Row>
            </DragSortItem>)
        }
        </Checkbox.Group>
    </DragSortWarp>)
}

type ActionType = 'all' | 'item' | 'sortEnd' | 'reset'

const useFormDragSettingHooks = ({options, onChange}: FormDragSettingProps) => {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);

  const onOwnChange = (type: ActionType, val: any) => {
    switch(type) {
      case 'all':
        onChange?.(options?.map(v => ({...v, checked: val})), type)
        break;
      case 'item':
        onChange?.(options?.map(v => ({...v, checked: val.includes(v.value)})), type)
        break;
      case 'sortEnd':
        onChange?.(arrayMoveImmutable(options, val?.oldIndex, val?.newIndex), type)
        break;
      case 'reset':
        onChange?.([], 'reset')
    }
  }

  useEffect(() => {
      const checkedLen = getCheckedValue(options).length
      if (checkedLen > 0) {
          if (checkedLen === options.length) {
              setCheckAll(true)
              setIndeterminate(false)
          } else {
              setCheckAll(false)
              setIndeterminate(true)
          }
      } else {
          setCheckAll(false)
          setIndeterminate(false)
      }
  }, [options])

  return {
    checkAll,
    setCheckAll,
    indeterminate,
    setIndeterminate,
    onOwnChange
  }
}

const FormDragSetting = ({options, onChange}: FormDragSettingProps) => {
    const {
      checkAll,
      indeterminate,
      onOwnChange
    } = useFormDragSettingHooks({options, onChange})

    return (<Popover
                trigger={['click']}
                placement="bottomRight"
                content={
                  <PopoverContent
                    options={options}
                    onChange={(val) => onOwnChange && onOwnChange('item', val)}
                    onSortEnd={(val) => onOwnChange && onOwnChange('sortEnd', val)}
                  />
                }
                title={
                  <PopoverTitle
                    checked={checkAll}
                    indeterminate={indeterminate}
                    onChange={(e) => onOwnChange && onOwnChange('all', e?.target?.checked)}
                    onReset={() => onOwnChange && onOwnChange('reset', null)}
                  />
                }
            >
              <Tooltip placement="top" title="筛选条件设置">
                <SettingOutlined />
              </Tooltip>
        </Popover>)
}

export default FormDragSetting
