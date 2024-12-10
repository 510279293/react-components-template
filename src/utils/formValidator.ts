// 常见表单检验

import { phoneReg } from "../RegExp"

/**
 * @description: 校验手机号码：多个用 分隔符 分割
 * @param { number } num 手机号最多个数
 * @param { string } separator 指定分隔符
 * @return { Promise } 返回的目标数据
*/
export function validatorPhones(num: number = 1, separator?: string) {
    return (rules: any, val: string, ) => {
        const ownSeparator = separator || ','
        if (!val) {
            return Promise.reject('请输入手机号')
        }
        const phones = val?.split(ownSeparator).map(v => v.trim())
        if (phones.length > num) {
            return Promise.reject(`最多输入${num}个手机号`)
        }
        
        if (phones?.some(phone => !phoneReg.test(phone))) {
            return Promise.reject('请输入正确的手机号')
        }

        return Promise.resolve()
    }
}
