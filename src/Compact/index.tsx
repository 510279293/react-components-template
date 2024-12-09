import React, { useRef } from "react"
import { Input, InputNumber, InputNumberProps, InputProps, Space } from "antd"

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
} & InputProps & InputNumberProps & InputRangeStaticProps

const InputNumberRange = ({value, defaultValue, placeholder, disabled, warpStyle, onChange, ...rest}: InputRangeProps) => {
  const valRef = useRef<any>(value||defaultValue)
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
        {...rest}
      />
  </Space.Compact>)
}

export default InputNumberRange
