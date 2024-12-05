---
category: Components
title: Download (下载组件)
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

url 下载链接模式
```jsx
import { Download } from '@junc/rc'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
export default () => <Download href={excelSrc} />
```

data 数据纯前端生成(适用于数据量小 前端获取到需要下载的数据，自己生成)，如果数据量大请 后端 生成
```jsx
import { Download } from '@junc/rc'
const data = {
    '商圈概括': [
        {
            商圈概况: '商圈面积',
            数量: `$4k㎡`,
            均值: '-',
        },
        {
            商圈概况: '商圈居住人口',
            数量: `5人`,
            均值: `6万人/k㎡`,
        },
        {
            商圈概况: '商圈工作人口',
            数量: `6人`,
            均值: `1万人/k㎡`,
        },
        {
            商圈概况: '商圈客流人口',
            数量: `1人`,
            均值: `2万人/k㎡`,
        },
    ]
  }
export default () => <Download data={data} fileName="测试纯前端下载" />
```

自定义UI
```jsx
import { Download } from '@junc/rc'
import {
  DownloadOutlined
} from '@ant-design/icons';

const data = {
    '商圈概括': [
        {
            商圈概况: '商圈面积',
            数量: `$4k㎡`,
            均值: '-',
        },
        {
            商圈概况: '商圈居住人口',
            数量: `5人`,
            均值: `6万人/k㎡`,
        },
        {
            商圈概况: '商圈工作人口',
            数量: `6人`,
            均值: `1万人/k㎡`,
        },
        {
            商圈概况: '商圈客流人口',
            数量: `1人`,
            均值: `2万人/k㎡`,
        },
    ]
  }
export default () => <Download data={data} fileName="测试纯前端下载"><DownloadOutlined /></Download>
```

借助 hooks 与 a 标签 自定义开发逻辑 
```jsx
import { Download } from '@junc/rc'
import { message } from 'antd'
import {
  DownloadOutlined
} from '@ant-design/icons';

const { useDownloadHooks } = Download

const data = {
    '商圈概括': [
        {
            商圈概况: '商圈面积',
            数量: `$4k㎡`,
            均值: '-',
        },
        {
            商圈概况: '商圈居住人口',
            数量: `5人`,
            均值: `6万人/k㎡`,
        },
        {
            商圈概况: '商圈工作人口',
            数量: `6人`,
            均值: `1万人/k㎡`,
        },
        {
            商圈概况: '商圈客流人口',
            数量: `1人`,
            均值: `2万人/k㎡`,
        },
    ]
  }
export default () => {
  const { aprops, download } = useDownloadHooks()
  const [messageApi, contextHolder] = message.useMessage()
  const onDownload = (e) => {
    e.preventDefault()
    return  message.warning('你没权限下载!!')
  }
  return <a {...aprops} onClick={onDownload}><DownloadOutlined /></a>
}
```

### Download props

参数如下：
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| data | 下载数据 | Record<string, any[]>; |  |  |
| href | 下载的远程链接接 | string |  |  |
| fileName | 下载的文件名(data 模式生效) | string |  |  |

