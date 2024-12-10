import React, { ReactNode, type FC } from 'react';
import { Image, ImageProps } from 'antd';
import { imgUrlReg, docUrlReg, pptUrlReg, pdfUrlReg, excelUrlReg } from '../RegExp'
// @ts-ignore
import FileViewer from 'react-file-viewer';

const ErrorComponent = () => {
  return (<div>对不起，发生了错误</div>)
}

const UnsupportedComponent = () => {
  return (<div>该文件暂不支持预览</div>)
}

type PreviewProps = {
  src: string;
  ErrorComponent?: ReactNode;
  UnsupportedComponent?: ReactNode;
  onError?: () => void;
}

const Preview: FC<PreviewProps> & PreviewStaticProps = ({src, ...restProps}) => {
  if (imgUrlReg.test(src)) {
    return <Image preview={false} src={src} {...restProps} />
  }
  if (docUrlReg.test(src)) {
    return <FileViewer fileType={'docx'} filePath={src} unsupportedComponent={UnsupportedComponent} errorComponent={ErrorComponent} {...restProps} />
  }
  if (pdfUrlReg.test(src)) {
    return <FileViewer fileType={'pdf'} filePath={src} unsupportedComponent={UnsupportedComponent} errorComponent={ErrorComponent} {...restProps} />
  }
  if (excelUrlReg.test(src)) {
    return <FileViewer fileType={'xslx'} filePath={src} unsupportedComponent={UnsupportedComponent} errorComponent={ErrorComponent} {...restProps} />
  }
  if (pptUrlReg.test(src)) {
    return <FileViewer fileType={'pptx'} filePath={src} unsupportedComponent={UnsupportedComponent} errorComponent={ErrorComponent} {...restProps} />
  }

  return restProps?.UnsupportedComponent ? <>{restProps?.UnsupportedComponent}</> : <UnsupportedComponent />
}

type PreviewStaticProps = {
  Group?: any;
}

type PreviewGroupProps = {
  items: string[];
  fallback?: string;
  preview?: ImageProps['preview'];
  children?: any
}

const PreviewGroup: FC<PreviewGroupProps> = ({items, children, ...restProps}) => {
  return (<Image.PreviewGroup
    items={items}
    preview={{
      imageRender: (dom, {current}: any) => {
        const currentSrc = items[current]
        if (imgUrlReg.test(currentSrc))
          return dom
        return <div className='jrc-preview-group'><Preview src={currentSrc} /></div>
      },
      toolbarRender: (dom, {image}) => imgUrlReg.test(image?.url) ? dom : null,
    }}
    {...restProps}
  >
    {children}
  </Image.PreviewGroup>)
};

Preview.Group = PreviewGroup

export default Preview;
