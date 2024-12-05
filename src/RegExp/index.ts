// 通用型正则
export const fixedPhone = new RegExp(/^\d{3,4}(-)?\d{7,8}$/)  // 固话,座机☎️
export const phoneReg = new RegExp(/^1[3456789][\d*]{5}[\d]{4}$/) // 手机号码
export const cmPhoneReg = new RegExp(/^((((13[4|5|6|7|8|9])|(15[0|1|2|4|7|8|9])|(18[2|3|4|7|8])|(147)|(1(78|48|49)))\d{8})|((170(3|5|6))\d{7}))$/) // 移动号码
export const cuPhoneReg = new RegExp(/^((((13[0|1|2])|(15[5|6])|(18[5|6])|(1(44|45|76|71)))\d{8})|(((17(04|07|08|09)))\d{7}))$/) // 联通号码
export const ctPhoneReg = new RegExp(/^((((1(33|49|73))|(153)|(18[0|1|9])|(177))\d{8})|((170(0|1|2))\d{7}))$/) // 电信号码
export const emailReg = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) // 邮箱
export const idCardNumReg = new RegExp(/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/) // 身份证号码
export const doubleNumReg = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/) // 非负整数(2位小数)
export const floatNumReg = new RegExp(/^[0-9]+(.[0-9]{1,4})?$/) // 非负整数(4位小数)

export const imgUrlReg = new RegExp(/.(jpeg|jpg|png|gif|bmp|svg|webp|ico|tiff|tif)$/) // 图片url正则
export const docUrlReg = new RegExp(/.(doc|docx|docm|dot|dotx|dotm)$/) // word url正则
export const pptUrlReg = new RegExp(/.(ppt|pptx|pps|ppsx|pot|potx|ppam|thmx)$/) // ppt url正则
export const pdfUrlReg = new RegExp(/.(pdf)$/) // ppt url正则
export const excelUrlReg = new RegExp(/.(xls|xlsx|xlsm|xlsb|xml)$/) // ppt url正则
export const zipUrlReg = new RegExp(/.(zip|rar|7z|tar|gz|bz2|iso)$/) // 压缩包文件 url 正则
export const videoUrlReg = new RegExp(/.(mp4|avi|mkv|mov|wmv|flv|rmvb|mpg|3gp)$/) // 视频 url 正则
export const audioUrlReg = new RegExp(/.(mp3|wav|aac|m4a|flac|ogg|wma|ape|mka)$/) // 视频 url 正则

// 系统登录名正则
export const userNameReg = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_]{6,30}$/) // 字母或数字或中文，长度6-30
// export const userNameReg = new RegExp(/(^([\u4e00-\u9fa5a-zA-Z\d+]+)$)/) // 字母或数字或中文，长度不限
export const illegal = new RegExp(/#|[~～]|[!！]|[?？]|\.\.|--|__|－|＿|※|▲|△| | |@/) // 非法正则(特殊符号)

// 系统登录密码正则
// export const pwdReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) // 必须包含字母和数字 6-16位
// export const pwdReg = new RegExp(/(^([a-zA-Z\d+]+)$)/) // 英文、数字或组合
export const pwdReg = new RegExp(/(?!^(\d+|[a-zA-Z]+|[!@#$%^&.*_?]+)$)^[\w!@#$%^&.*_?]{6,20}$/) // 密码至少包含英文、数字、符号中的两种
export const homePageReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&amp;:/~\\+#]*[\w\-\\@?^=%&amp;/~\\+#])?/ // 官网正则判断
export const mobileNumberMask = (str: string) => (str||'').replace(/(\d{3})\d*(\d{4})/, '$1****$2') // 手机号脱敏
export const idCardNumberMask = (str: string) => (str||'').replace("(?<=\\w{3})\\w(?=\\w{4})","*") // 身份证号脱敏
export const emailMask = (str: string) => str.replace("(\\w+)\\w{5}@(\\w+)","$1***@$2") // 邮箱脱敏

// ip地址正则
export const ipv4ItemReg = new RegExp(/^(25[0-5]|2[0-4]\d|[01]?\d\d?)$/)  // ipv4 地址每组的校验
export const ipv6ItemReg = new RegExp(/^[a-fA-F0-9]{0,4}$/) // ipv6 地址每组的校验
export const ipv4Reg = new RegExp(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/) // ipv4 全地址校验
export const ipv6Reg = new RegExp(/^(((([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4}))|(((([\da-fA-F]{1,4}):){1,7}:)|((([\da-fA-F]{1,4}):){6}:([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){5}:(([\da-fA-F]{1,4}):)?([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):){0,2}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,3}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,4}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){1}:(([\da-fA-F]{1,4}):){0,5}([\da-fA-F]{1,4}))|(::(([\da-fA-F]{1,4}):){0,6}([\da-fA-F]{1,4}))|(::([\da-fA-F]{1,4})?))|(((([\da-fA-F]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-fA-F]{1,4})::(([\da-fA-F]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-fA-F]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/) // ipv6 全地址校验

// 常见表单上传 accept
export const acceptImg = ".png, .jpg, .jpeg, .bmp, .gif" // 文件上传: 只上传图片
export const acceptExcel = ".xls, .xlsx" // 文件上传: 只上传 excel
export const acceptPdf = ".pdf" //  文件上传: 只上传 pdf




