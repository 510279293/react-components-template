import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { Badge, Input, InputProps, Space } from "antd"
import { ipv4ItemReg, ipv6ItemReg } from '../RegExp'

function expandIPv6(ipv6: string) {
  if (!ipv6) return ''
  const ipArr = (ipv6||'').split(':')
  const fillLen = 8 - ipArr.filter(Boolean).length
  const fillArr = new Array(fillLen).fill('0000')
  const fullIpv6 = ipArr.map(v => v === '' ? fillArr : v).flat().join(':')
  return fullIpv6
}

const ipv4Arr = new Array(4).fill(0)
const ipv6Arr = new Array(8).fill(0)

const Dot = () => <Badge color="#252b3a" style={{display: 'flex', alignItems: 'center', transform: 'scale(0.6)'}} />
const Dotv6 = () => <span style={{display: 'flex', alignItems: 'center', marginBottom: 2}}>:</span>

type Ipv4Props = {
  onNext?: () => void;
} & InputProps


const useIpItemHooks = ({value: sourceValue, defaultValue, type, onNext, onChange, ref, ...rest}: any) => {
  const [value, setValue] = useState(sourceValue||defaultValue)
  const inputRef = useRef<any>(null)
  const onOwnChange = (type?: IpAddressProps['type']) => {
    const ipItemReg = type === 'ipv6' ? ipv6ItemReg : ipv4ItemReg
    const transVal = (val: string) => type === 'ipv6' ? `0x${val}` : (val)
    const parseVal = (val: string) => parseInt(transVal(val), type === 'ipv6' ? 16 : 10)
    const max = type === 'ipv6' ? 6553 : 25
    return (e: any) => {
      const val = e?.target?.value
      const isOk = val === '' || (ipItemReg.test(val) && !isNaN(parseVal(val)) && parseVal(val) < Math.pow(2, type === 'ipv6' ? 16 : 8))
      if (isOk) {
        onChange?.(val)
        setValue(val)
      }
      if (parseVal(val) > max) {
        onNext?.()
      }
    }
  }

  useImperativeHandle(ref, () => {
    return {
      focus: inputRef.current?.focus,
      setValue,
      getValue: () => value
    }
  })
  return {
    value,
    ref: inputRef,
    onChange: onOwnChange(type),
    ...rest
  }
}

const Ipv4 = forwardRef(({...rest}: Ipv4Props, ref: any) => {
  const props = useIpItemHooks({ type: 'ipv4', ref, ...rest })
  return (<Input
    bordered={false}
    style={{paddingLeft: 5, paddingRight: 5, textAlign: 'center'}}
    {...props}
  />)
})

const Ipv6 = forwardRef(({ ...rest}: Ipv4Props, ref: any) => {
  const props = useIpItemHooks({ type: 'ipv6', ref, ...rest })
  return (<Input
    bordered={false}
    style={{paddingLeft: 5, paddingRight: 5, textAlign: 'center'}}
    {...props}
  />)
})



type CommonIpAddressProps = {
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

// ip 地址的输入框
const Ipv4Address = ({value, defaultValue, disabled, onChange}: CommonIpAddressProps) => {
  const inputMaps: any = {}
  return (<Space.Compact
    style={{width: 200, padding: 0}}
    className={`ant-input ant-input${disabled ? '-disabled' : ''}`}
  >
    {
      ipv4Arr.map((v: any, i: number) => {
        return (<React.Fragment key={i}>
          { i === 0 ? null : <Dot /> }
          <Ipv4
            ref={(ref: any) => inputMaps[i] = ref}
            onKeyDown={(e: any) => {
              if (e.key === 'ArrowRight') inputMaps[i+1]?.focus()
              if (e.key === 'ArrowLeft') inputMaps[i-1]?.focus()
              if (e.key === 'Backspace' && e.target?.value === '') inputMaps[i-1]?.focus()
            }}
            onNext={() => inputMaps[i+1]?.focus()}
            disabled={disabled}
            value={value?.split('.')[i]}
            defaultValue={defaultValue?.split('.')[i]}
            onChange={(val: any) => {
              const newValArr = Object.keys(inputMaps).map((key: any) => (i - key === 0) ? val : inputMaps[key]?.getValue())
              onChange?.(newValArr?.join('.'))
            }}
          />
        </React.Fragment>)
      })
    }
  </Space.Compact>)
}

// ip 地址的输入框
const Ipv6Address = ({value, defaultValue, disabled, onChange}: CommonIpAddressProps) => {
  const inputMaps: any = {}
  return (<Space.Compact
    style={{width: 400, padding: 0}}
    className={`ant-input ant-input${disabled ? '-disabled' : ''}`}
  >
    {
      ipv6Arr.map((v: any, i: number) => {
        return (<React.Fragment key={i}>
          { i === 0 ? null : <Dotv6 /> }
          <Ipv6
            ref={(ref: any) => inputMaps[i] = ref}
            onKeyDown={(e: any) => {
              if (e.key === 'ArrowRight') inputMaps[i+1]?.focus()
              if (e.key === 'ArrowLeft') inputMaps[i-1]?.focus()
              if (e.key === 'Backspace' && e.target?.value === '') inputMaps[i-1]?.focus()
            }}
            onNext={() => inputMaps[i+1]?.focus()}
            disabled={disabled}
            value={expandIPv6(value||'').split(':')[i]}
            defaultValue={expandIPv6(defaultValue||'').split(':')[i]}
            onChange={(val: any) => {
              const newValArr = Object.keys(inputMaps).map((key: any) => (i - key === 0) ? val : inputMaps[key]?.getValue())
              onChange?.(newValArr?.join(':'))
            }}
          />
        </React.Fragment>)
      })
    }
  </Space.Compact>)
}

type IpAddressProps = {
  type?: 'ipv4' | 'ipv6';
} & CommonIpAddressProps

const IpAddress = ({type, ...rest}: IpAddressProps) => {
  return type === 'ipv6' ? <Ipv6Address {...rest}  /> : <Ipv4Address  {...rest} />
}

export default IpAddress

