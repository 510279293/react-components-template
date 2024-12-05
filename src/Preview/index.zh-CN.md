---
category: Components
title: Preview（文件预览）
subtitle: 组件
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DfTMRYSDngEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y5pcQLplFu4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 业务型
  order: 5
---

文件预览组件，基于 antd 和 react-file-viewer 实现

```jsx
import React, {useState} from "react"
import { Select } from 'antd';
import { Preview } from '@junc/rc';

// url 预览模式
const imgSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/9E6B5DD9C75D400F9EF4B515C6E409D7_5294d977d96773e6ea9a81d3119b51c9.jpg'
const imgSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imgSrc2 = 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
const imgSrc3 =  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
const wordSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A74090AF17F146D8BD667F5FF8188D12_云罟使用指南（精简）.docx'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
const pptSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A8ADCCE12F3E410FAD2AF860F4905666_新建 PPTX 演示文稿.pptx'
const pdfSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/D86E4B42D89F411982CE150C644C7EBC_云罟云安全产品介绍.pdf'

const options = [
  { label: '图片预览', value: imgSrc },
  { label: 'word预览', value: wordSrc },
  { label: 'pdf预览', value: pdfSrc },
  { label: 'excel预览', value: excelSrc },
  { label: 'ppt预览', value: pptSrc },
]
export default () => {
  const [src, setSrc] = useState(pdfSrc)
  return (<>
    请选择需要预览的组件<Select options={options} defaultValue={src} style={{width: 120}} onChange={setSrc} />
    <Preview src={src} />
  </>)
}

```

Preview.Group

```jsx
import React from "react"
import { Image } from 'antd';
import { Preview } from '@junc/rc';

// url 预览模式
const imgSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/9E6B5DD9C75D400F9EF4B515C6E409D7_5294d977d96773e6ea9a81d3119b51c9.jpg'
const imgSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imgSrc2 = 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
const imgSrc3 =  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
const wordSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A74090AF17F146D8BD667F5FF8188D12_云罟使用指南（精简）.docx'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
const pptSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A8ADCCE12F3E410FAD2AF860F4905666_新建 PPTX 演示文稿.pptx'
const pdfSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/D86E4B42D89F411982CE150C644C7EBC_云罟云安全产品介绍.pdf'
const vedioSrc = ''

const items = [
  imgSrc1,
  imgSrc2,
  imgSrc,
  wordSrc,
  pdfSrc,
  excelSrc,
  pptSrc
]
export default () => {
  return (<>
    <Preview.Group items={items}>
      <Image src={items[0]} width={100} />
    </Preview.Group>
  </>)
}

```

结合 antd Upload 文件上传 进行文件预览
```jsx
import React, {useState} from 'react';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { Preview } from '@junc/rc';

const imgSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/9E6B5DD9C75D400F9EF4B515C6E409D7_5294d977d96773e6ea9a81d3119b51c9.jpg'
const imgSrc1 = 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
const imgSrc2 = 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
const imgSrc3 =  'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
const wordSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A74090AF17F146D8BD667F5FF8188D12_云罟使用指南（精简）.docx'
const excelSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/30B167B900F04769878916CBB4E3AF16_星辰数智产品报价模板v1.0_0513.xlsx'
const pptSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/A8ADCCE12F3E410FAD2AF860F4905666_新建 PPTX 演示文稿.pptx'
const pdfSrc = 'https://jns-crm.oss-cn-hangzhou.aliyuncs.com/D86E4B42D89F411982CE150C644C7EBC_云罟云安全产品介绍.pdf'

const props: UploadProps = {
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: imgSrc,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: imgSrc1,
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: imgSrc2,
    },
    {
      uid: '4',
      name: 'xxx.doc',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: wordSrc,
    },
    {
      uid: '5',
      name: 'aaa.pdf',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: pdfSrc,
    },
  ],
  showUploadList: {
    showPreviewIcon: true,
    showDownloadIcon: true,
    // downloadIcon: 'Download',
    showRemoveIcon: true,
    removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
  },
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  const items = props?.defaultFileList?.map(({url}) => url)
  const onPreview = ({url}) => {
    const current = items?.findIndex(src => src === url)
    setVisible(true)
    setTimeout(() => {  // 避免弹窗先出来再加载图片造成的白屏事件
      setCurrent(current)  
    }, 10)
  }
  return (<>
    <Upload {...props} onPreview={onPreview}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    <Preview.Group 
      items={items} 
      preview={{
        visible,
        current,
        onChange: setCurrent,
        onVisibleChange: setVisible,
        imageRender: (_, {current}: any) => {
          const currentSrc = items[current]
          return <Preview src={currentSrc} />
        },
        toolbarRender: () => null,
      }}
    />
  </>
  )
};

export default App;
```

### Preview props

基于 antd  Image 和 第三方插件（react-file-viewer） 组件开发，属性参数继承至 Image 组件，目前支持 pdf｜word｜img 文件预览
参数如下：
src: string;
  ErrorComponent?: ReactNode;
  UnsupportedComponent?: ReactNode;
  onError?: () => void;
<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| src | 预览的文件链接 | string |  |  |
| ErrorComponent | 预览出错的组件 | any |  |  |
| UnsupportedComponent | 不支持文件预览时显示的组件 | any |  |  |
| onError | 预览出错时的回调函数 | Function |  |  |


Preview.Group 继承自 Image.Group 组件
