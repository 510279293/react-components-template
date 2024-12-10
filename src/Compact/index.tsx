import React, { useRef } from "react"
import { Input, InputNumber, InputNumberProps, InputProps, Select, SelectProps, Space } from "antd"
import { thousandsSeparator } from "../utils"

type InputRangeStaticProps = {
  InputNumberRange?: any
}

type InputRangeProps = {
  width?: number;
  warpStyle?: React.CSSProperties;
  value?: InputNumberProps['value'][];
  defaultValue?: InputNumberProps['defaultValue'][];
  placeholder?: InputProps['placeholder'][];
  onChange?: (val: InputNumberProps['defaultValue'][]) => void;
  onBlur?: (val: InputNumberProps['defaultValue'][]) => void;
  thousandsSeparator?: boolean;
} & InputProps & InputNumberProps & InputRangeStaticProps

const InputNumberRange = ({value, defaultValue, placeholder, disabled, warpStyle, onChange, thousandsSeparator: separator, ...rest}: InputRangeProps) => {
  const valRef = useRef<any>(value||defaultValue)
  const someProps = separator ? thousandsSeparator : {}
  return (<Space.Compact 
      block 
      className={`ant-input ant-input-outlined css-var-rcbl ant-input-css-var ant-input${disabled ? '-disabled' : ''}`}
      style={{padding: 0, ...warpStyle}}
      >
      <InputNumber
        style={{
          textAlign: 'center',
          width: 'calc(50% - 15px)',
        }}
        controls={false}
        value={value?.[0]}
        defaultValue={defaultValue?.[0]}
        placeholder={placeholder?.[0]}
        onChange={(val) => {
          valRef.current = [val, valRef.current?.[1]]
          onChange?.(valRef.current)
        }}
        bordered={false}
        {...someProps}
        {...rest}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
        bordered={false}
      />
      <InputNumber
        style={{
          textAlign: 'center',
          width: 'calc(50% - 15px)',
        }}
        controls={false}
        value={value?.[1]}
        defaultValue={defaultValue?.[1]}
        placeholder={placeholder?.[1]}
        onChange={(val) => {
          valRef.current = [valRef.current?.[0], val ]
          onChange?.(valRef.current)
        }}
        bordered={false}
        {...someProps}
        {...rest}
      />
  </Space.Compact>)
}

// 组合筛选条件
export type SelectInputProps = {
  warpStyle?: React.CSSProperties;
  value?: Record<string, any>;
  defaultValue?: Record<string, any>;
  onChange?: (value: any) => void;
  fieldProps?: any[];
  changeClear?: boolean;  // 第一个值发生变化的话，第二个值要不要清空
  options?: SelectProps['options']
}
const getKeyName = (obj: SelectInputProps['value']) => Object.keys(obj||{})[0] 
const getOptionLabel = (options?: any[], targetValue?: React.Key) => (options||[]).find(v => v.value === targetValue)?.label
export const SelectInput = ({value, defaultValue, warpStyle, onChange, fieldProps, options, changeClear}: SelectInputProps) => {
  const keyName = getKeyName(value)
  const keyValue = (value)?.[keyName] 
  const defaultKeyName = getKeyName(defaultValue)
  const defaultKeyValue = (defaultValue)?.[defaultKeyName] 
  const [props1, props2] = fieldProps || []

  const calcProps1 = {
      placeholder: '请选择',
      ...(props1||{}),
      value: keyName,
      defaultValue: defaultKeyName,
      options
  }

  const calcProps2 = {
      placeholder: `请输入${getOptionLabel(options, keyName)||''}`,
      ...(props2||{}),
      value: keyValue,
      defaultValue: defaultKeyValue,
  }

  const onOwnChange = (value: any, type: 'key' | 'value') => {
      if (type === 'key') {
          const newVal = { [value]: changeClear ? '' : keyValue }
          onChange?.(newVal)
      } else {
          const newVal = { [keyName]: value }
          onChange?.(newVal)
      }
  }
  return (<Space.Compact style={{width: '100%', ...warpStyle}}>
      <Select {...calcProps1} onChange={(val) => onOwnChange(val, 'key')} />
      <Input {...calcProps2} onChange={(e) => onOwnChange(e?.target?.value, 'value')} />
  </Space.Compact>)
}

export default InputNumberRange
