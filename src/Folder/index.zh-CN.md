---
category: Components
title: Folder（文件目录）
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 6
---

Folder组件:


```jsx
import React, { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Folder, utils, RegExper } from '@junc/rc'
const imgSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/9E6B5DD9C75D400F9EF4B515C6E409D7_5294d977d96773e6ea9a81d3119b51c9.jpg'
const imgSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imgSrc2 = 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
const imgSrc3 =  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
const wordSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A74090AF17F146D8BD667F5FF8188D12_云罟使用指南（精简）.docx'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
const pptSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A8ADCCE12F3E410FAD2AF860F4905666_新建 PPTX 演示文稿.pptx'
const pdfSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/D86E4B42D89F411982CE150C644C7EBC_云罟云安全产品介绍.pdf'

const initDataSource = [
  {
    id: 1,
    name: '文件夹1',
    type: 'folder',
    children: [
      {
        id: 4,
        name: '文件夹4',
        type: 'folder',
        children: [
          {
            id: 6,
            name: '文件夹6',
            type: 'folder',
            children: [
              {
                id: 7,
                name: '文件夹7.docx',
                url: wordSrc
              },
              {
                id: 8,
                name: '图片1.jpg',
                url: imgSrc
              },
              {
                id: 9,
                name: '压缩包1.zip',
              },
              {
                id: 10,
                name: 'excel1.xlsx',
              },
              {
                id: 11,
                name: 'xxxxx.pdf',
                url: pdfSrc
              },
              {
                id: 12,
                name: 'xxxxx.pptx',
              },
            ]
          }
        ]
      },
      {
        id: 5,
        name: '文件3.xls',
        type: 'xslx'
      }
    ]
  },
  {
    id: 2,
    name: '文件夹2',
    type: 'folder'
  },
  {
    id: 3,
    name: '文件夹3',
    type: 'folder'
  }
]
const { FilePreview, FileBreadcrumb, FileDropdown } = Folder

const createFolder = () => ({id: new Date().getTime(), name: '新建文件夹', type: 'folder', mode: 'write', children: []})

export default () => {
  const [dataSource, setDataSource] = useState(initDataSource)
  const [currentFile, setCurrentFile] = useState({})
  const [fileBreadcrumb, setFileBreadcrumb] = useState([])
  const onRow = (record) => {
    return {
      onDoubleClick: async () => {
        setCurrentFile(record)
        setFileBreadcrumb([...fileBreadcrumb, record])
        setDataSource?.(record?.children)
      }
    }
  }

  const onChange = (file, newItems) => {
    setFileBreadcrumb(newItems)
    setDataSource(file?.children||[])
  }

  const operate = (file, action, payload) => {
    console.log(file, action)
    switch (action) {
      case '重命名':
        file.mode = 'write'
        setDataSource([...dataSource])
        return 
      case '重命名结束':
        file.mode = 'read'
        file.name = payload
        setDataSource([...dataSource])
        console.log(file, action)
        return 
      case '新建文件夹':
        file ? (file?.children||[]).push(createFolder()) : dataSource.push(createFolder())
        setDataSource(file ? [...file.children] : [...(dataSource||[])]) 
      default:
        return 
    }
  }

  return (<>
    <FileBreadcrumb items={fileBreadcrumb} onChange={onChange} />
    <ConfigProvider renderEmpty={() => <FilePreview file={currentFile} />}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Folder 
          dataSource={dataSource} 
          onRow={onRow} 
          operate={operate} 
        />
        <FileDropdown type="dir" file={fileBreadcrumb[fileBreadcrumb.length -1]} operate={operate}><div style={{marginTop: -16, position: 'relative', flexGrow: 1, zIndex:2, minHeight: 100}}></div></FileDropdown>
      </div>
    </ConfigProvider>
  </>)
}
```

支持异步请求（暂未想到好办法）

```jsx
import React, { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Folder, utils, RegExper } from '@junc/rc'
const imgSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/9E6B5DD9C75D400F9EF4B515C6E409D7_5294d977d96773e6ea9a81d3119b51c9.jpg'
const imgSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imgSrc2 = 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
const imgSrc3 =  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
const wordSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A74090AF17F146D8BD667F5FF8188D12_云罟使用指南（精简）.docx'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
const pptSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A8ADCCE12F3E410FAD2AF860F4905666_新建 PPTX 演示文稿.pptx'
const pdfSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/D86E4B42D89F411982CE150C644C7EBC_云罟云安全产品介绍.pdf'

const initDataSource = [
  {
    id: 1,
    name: '文件夹1',
    type: 'folder',
    children: [
      {
        id: 4,
        name: '文件夹4',
        type: 'folder',
        children: [
          {
            id: 6,
            name: '文件夹6',
            type: 'folder',
            children: [
              {
                id: 7,
                name: '文件夹7.docx',
                url: wordSrc
              },
              {
                id: 8,
                name: '图片1.jpg',
                url: imgSrc
              },
              {
                id: 9,
                name: '压缩包1.zip',
                type: 'zip',
              },
              {
                id: 10,
                name: 'excel1.xslx',
              },
              {
                id: 11,
                name: 'xxxxx.pdf',
                url: pdfSrc
              },
              {
                id: 12,
                name: 'xxxxx.pptx',
              },
            ]
          }
        ]
      },
      {
        id: 5,
        name: '文件3.xls',
        type: 'xslx'
      }
    ]
  },
  {
    id: 2,
    name: '文件夹2',
    type: 'folder'
  },
  {
    id: 3,
    name: '文件夹3',
    type: 'folder'
  }
]

const getAllData = () => {
  const allFlatData = []
  const deps = (arr) => {
    arr.forEach(({children, ...rest}) => {
      allFlatData.push({...rest, children})
      children && deps(children||[])
    })
  }
  deps(initDataSource)
  return allFlatData
}

const allFlatData = getAllData()

const request = async (params) => {
  const { id } = params
  const data = id ? allFlatData.find(item => item.id === id)?.children : initDataSource
  console.log('request===>', params, id, data, allFlatData)
  return {
    data: data||[],
    total: 30,
    success: true
  }
}

const { FilePreview, FileBreadcrumb, FileDropdown } = Folder

const createFolder = () => ({id: new Date().getTime(), name: '新建文件夹', type: 'folder', mode: 'write', children: []})

export default () => {
  const [params, setParams] = useState(initDataSource)
  const [currentFile, setCurrentFile] = useState({})
  const [fileBreadcrumb, setFileBreadcrumb] = useState([])
  const onRow = (record) => {
    return {
      onDoubleClick: async () => {
        setCurrentFile(record)
        setFileBreadcrumb([...fileBreadcrumb, record])
        // setDataSource?.(record?.children)
        setParams({id: record?.id})
      }
    }
  }

  const onChange = (file, newItems) => {
    setFileBreadcrumb(newItems)
    // setDataSource(file?.children||[])
    setParams({id: file?.id})
  }

  const operate = (file, action, payload) => {
    console.log(file, action)
    switch (action) {
      case '重命名':
        file.mode = 'write'
        // setDataSource([...dataSource])
        return 
      case '重命名结束':
        file.mode = 'read'
        file.name = payload
        // setDataSource([...dataSource])
        console.log(file, action)
        return 
      case '新建文件夹':
        file ? (file?.children||[]).push(createFolder()) : dataSource.push(createFolder())
        // setDataSource(file ? [...file.children] : [...(dataSource||[])]) 
      default:
        return 
    }
  }

  return (<>
    <FileBreadcrumb items={fileBreadcrumb} onChange={onChange} />
    <ConfigProvider renderEmpty={() => <FilePreview file={currentFile} />}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Folder 
          onRow={onRow} 
          params={params}
          request={request}
          operate={operate} 
        />
        <FileDropdown type="dir" file={fileBreadcrumb[fileBreadcrumb.length -1]} operate={operate}><div style={{marginTop: -16, position: 'relative', flexGrow: 1, zIndex:2, minHeight: 100}}></div></FileDropdown>
      </div>
    </ConfigProvider>
  </>)
}
```


### IpAddress props

基于 antd  Input 组件开发，属性参数继承至 Input 组件，额外参数如下：
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value | ip值 | 'ipv4'\|'ipv6'\|string |  |  |
| type | ip格式 | 'ipv4'\|'ipv6' | ipv4 |  |

