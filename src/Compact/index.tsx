import React, { useRef } from "react"
import { Input, InputNumber, InputNumberProps, InputProps, Space } from "antd"

type InputRangeStaticProps = {
  InputNumberRange?: any
}

type InputRangeProps = {
  width?: number;
  value?: InputNumberProps['value'][];
  defaultValue?: InputNumberProps['defaultValue'][];
  placeholder?: InputProps['placeholder'][];
  onChange?: (val: InputNumberProps['defaultValue'][]) => void;
  onBlur?: (val: InputNumberProps['defaultValue'][]) => void;
} & InputProps & InputNumberProps & InputRangeStaticProps

const InputNumberRange = ({value, defaultValue, placeholder, onChange, width, ...rest}: InputRangeProps) => {
  const valRef = useRef<any>(value||defaultValue)
  return (<Space.Compact className="ant-input" style={{width: width||180, padding: 0}}>
      <InputNumber
        style={{
          textAlign: 'center',
        }}
        bordered={false}
        controls={false}
        value={value?.[0]}
        defaultValue={defaultValue?.[0]}
        placeholder={placeholder?.[0]}
        onChange={(val) => {
          valRef.current = [val, valRef.current?.[1]]
          onChange?.(valRef.current)
        }}
        {...rest}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
          backgroundColor: '#fff'
        }}
        placeholder="~"
        disabled
        bordered={false}
      />
      <InputNumber
        style={{
          textAlign: 'center',
        }}
        bordered={false}
        controls={false}
        value={value?.[1]}
        defaultValue={defaultValue?.[1]}
        placeholder={placeholder?.[1]}
        onChange={(val) => {
          valRef.current = [valRef.current?.[0], val ]
          onChange?.(valRef.current)
        }}
        {...rest}
      />
  </Space.Compact>)
}

export default InputNumberRange
