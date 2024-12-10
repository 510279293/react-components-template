---
category: Components
title: 正则
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 通用
  order: 1
---

项目中可能用到的正则

## 常见正则

```js
// 通用型正则
const fixedPhone = new RegExp(/^\d{3,4}(-)?\d{7,8}$/)  // 固话,座机☎️
const phoneReg = new RegExp(/^1[3456789][\d*]{5}[\d]{4}$/) // 手机号码
const cmPhoneReg = new RegExp(/^((((13[4|5|6|7|8|9])|(15[0|1|2|4|7|8|9])|(18[2|3|4|7|8])|(147)|(1(78|48|49)))\d{8})|((170(3|5|6))\d{7}))$/) // 移动号码
const cuPhoneReg = new RegExp(/^((((13[0|1|2])|(15[5|6])|(18[5|6])|(1(44|45|76|71)))\d{8})|(((17(04|07|08|09)))\d{7}))$/) // 联通号码
const ctPhoneReg = new RegExp(/^((((1(33|49|73))|(153)|(18[0|1|9])|(177))\d{8})|((170(0|1|2))\d{7}))$/) // 电信号码
const emailReg = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) // 邮箱
const idCardNumReg = new RegExp(/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/) // 身份证号码
const doubleNumReg = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/) // 非负整数(2位小数)
const floatNumReg = new RegExp(/^[0-9]+(.[0-9]{1,4})?$/) // 非负整数(4位小数)

// 系统登录名正则
const userNameReg = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_]{6,30}$/) // 字母或数字或中文，长度6-30
// export const userNameReg = new RegExp(/(^([\u4e00-\u9fa5a-zA-Z\d+]+)$)/) // 字母或数字或中文，长度不限
const illegal = new RegExp(/#|[~～]|[!！]|[?？]|\.\.|--|__|－|＿|※|▲|△| | |@/) // 非法正则(特殊符号)

// 系统登录密码正则
// export const pwdReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) // 必须包含字母和数字 6-16位
// export const pwdReg = new RegExp(/(^([a-zA-Z\d+]+)$)/) // 英文、数字或组合
const pwdReg = new RegExp(/(?!^(\d+|[a-zA-Z]+|[!@#$%^&.*_?]+)$)^[\w!@#$%^&.*_?]{6,20}$/) // 密码至少包含英文、数字、符号中的两种
const homePageReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/ // 官网正则判断

// ip地址正则
const ipv4ItemReg = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)  // ipv4 地址每组的校验
const ipv6ItemReg = new RegExp(/[a-fA-F0-9]{0,4}/g) // ipv6 地址每组的校验
const ipv4Reg = new RegExp(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/) // ipv4 全地址校验
const ipv6Reg = new RegExp(/^(((([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4}))|(((([\da-fA-F]{1,4}):){1,7}:)|((([\da-fA-F]{1,4}):){6}:([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){5}:(([\da-fA-F]{1,4}):)?([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):){0,2}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,3}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,4}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){1}:(([\da-fA-F]{1,4}):){0,5}([\da-fA-F]{1,4}))|(::(([\da-fA-F]{1,4}):){0,6}([\da-fA-F]{1,4}))|(::([\da-fA-F]{1,4})?))|(((([\da-fA-F]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-fA-F]{1,4})::(([\da-fA-F]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-fA-F]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/) // ipv6 全地址校验

```

## 常见表单上传 accept
```js
const acceptImg = ".png, .jpg, .jpeg, .bmp, .gif" // 文件上传: 只上传图片
const acceptExcel = ".xls, .xlsx" // 文件上传: 只上传 excel
const acceptPdf = ".pdf" //  文件上传: 只上传 pdf
```
