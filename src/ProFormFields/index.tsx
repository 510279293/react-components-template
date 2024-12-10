import { ProFormItem, ProFormItemProps } from "@ant-design/pro-components"
import { SelectInput, SelectInputProps } from "../Compact"

type ProFormSelectInputProps = ProFormItemProps & {
    fieldProps?: SelectInputProps
}
export const ProFormSelectInput = ({fieldProps, ...rest}: ProFormSelectInputProps) => {
    return (<ProFormItem {...rest}>
        <SelectInput {...fieldProps} />
    </ProFormItem>)
}