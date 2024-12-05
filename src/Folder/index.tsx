import React, { FC } from "react";
import { IconFont, Preview } from '@junc/rc'
import { Breadcrumb, BreadcrumbProps, Dropdown, DropdownProps, Empty, Input } from "antd";
import { imgUrlReg, docUrlReg, pptUrlReg, pdfUrlReg, excelUrlReg, zipUrlReg, videoUrlReg, audioUrlReg } from '../RegExp'
import ProTable, { ProColumns, ProTableProps } from "@ant-design/pro-table";

// 待扩充
const enum FileEnum {
  IMG = 'img',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOC = 'docx',
  EXCEL = 'xslx',
  PDF = 'pdf',
  PPT = 'pptx',
  ZIP = 'zip',
  FOLDER = 'folder',
  FILE = 'file',
}

const testFileType = (file?: FileItem) => {
  const { type, url, name } = file || {}
  const fileName = name || url || ''
  if (type) return type
  if (imgUrlReg.test(fileName)) return FileEnum.IMG
  if (videoUrlReg.test(fileName)) return FileEnum.VIDEO
  if (audioUrlReg.test(fileName)) return FileEnum.AUDIO
  if (docUrlReg.test(fileName)) return FileEnum.DOC
  if (excelUrlReg.test(fileName)) return FileEnum.EXCEL
  if (pdfUrlReg.test(fileName)) return FileEnum.PDF
  if (pptUrlReg.test(fileName)) return FileEnum.PPT
  if (zipUrlReg.test(fileName)) return FileEnum.ZIP
  return FileEnum.FILE
}

type FileRenderProps = {
  file: FileItem;
  mode?: 'read' | 'write';
  operate?: (file?: FileItem, type?: FileAction, payload?: any) => void;
}
const FileRender: FC<FileRenderProps> = ({file, mode, operate}) => {
  const { url } = file
  const style = { fontSize: 20, marginRight: 4 }
  const warpStyle = {display: 'flex', alignItems: 'center', cursor: 'pointer' }
  const fileType = testFileType(file)
  const onRename = (e: any) => {
    if (e.type === 'blur' || e?.key === 'Enter') {
      operate?.(file, '重命名结束', e.target.value)
    }
  }
  const name = mode === 'write' ? <Input defaultValue={file?.name} onBlur={onRename} onKeyDown={onRename} /> : file?.name
  switch (fileType) {
    case FileEnum.FOLDER:
      return (<span style={warpStyle}><IconFont type="rc-wenjianjia" style={{...style, fontSize: 28}}/>{name}</span>)
    case FileEnum.DOC:
      return (<span style={warpStyle}><IconFont type="rc-word" style={style}/>{name}</span>)
    case FileEnum.EXCEL:
      return (<span style={warpStyle}><IconFont type="rc-excel" style={style}/>{name}</span>)
    case FileEnum.PDF:
      return (<span style={warpStyle}><IconFont type="rc-pdf" style={style}/>{name}</span>)
    case FileEnum.PPT:
      return (<span style={warpStyle}><IconFont type="rc-PPT" style={style}/>{name}</span>)
    case FileEnum.ZIP:
      return (<span style={warpStyle}><IconFont type="rc-file-zip" style={style}/>{name}</span>)
    case FileEnum.IMG:
      return (<span style={warpStyle}><img src={url} style={{width: '16px', border: '2px solid #e5e5e5', marginRight: 4}} />{name}</span>)
    default:
      return (<span style={warpStyle}><IconFont type="rc-doc-line" style={style}/>{name}</span>)
  }
}

type FilePreviewProps = {
  file: FileItem
}
const FilePreview: FC<FilePreviewProps> = ({file}) => {
  const { url } = file || {}
  const fileType = testFileType(file)
  switch (fileType) {
    case FileEnum.FOLDER:
      return <Empty />
    case FileEnum.ZIP:
      return <>暂不支持解压文件</>
    default:
      return <Preview src={url||''} />
  }
}

type FileBreadcrumbProps = BreadcrumbProps & {
  items?: FileItem[]
  onChange?: (currentItem: FileItem, newItems?: FileItem[]) => void;
}

const FileBreadcrumb: FC<FileBreadcrumbProps> = ({items, onChange, ...restProps}) => {
  const onBreadcrumbChange = (item: FileItem, idx: number) => {
    const newItems = items?.slice(0, idx+1)
    onChange?.(item, newItems as any)
  }
  return (<Breadcrumb
    items={items?.map((item: FileItem, idx: number) => ({ title: <span style={{cursor: 'pointer'}} key={idx} onClick={() => onBreadcrumbChange(item, idx)}>{item?.name}</span> }))}
    {...restProps}
  />)
}

type FileAction = '新建文件夹' | '新建文件' | '重命名' | '重命名结束' | '删除' | '复制' | '解压'
type FileDropdownProps = DropdownProps & {
  type?: 'dir';
  file?: FileItem;
  operate?: (file?: FileItem, type?: FileAction) => void;
  children?: any;
}

const FileDropdown = ({type, file, children, operate}: FileDropdownProps) => {
  const fileType = testFileType(file)
  const NewFolder = <span onClick={() => operate && operate(file, '新建文件夹')}>新建文件夹</span>
  const NewFile = <span onClick={() => operate && operate(file, '新建文件')}>新建文件</span>
  const FileReName = <span onClick={() => operate && operate(file, '重命名')}>重命名</span>
  const FileDel = <span onClick={() => operate && operate(file, '删除')}>删除</span>
  const FileClone = <span onClick={() => operate && operate(file, '复制')}>复制</span>
  const UnZip = <span onClick={() => operate && operate(file, '解压')}>解压</span>
  let items = [NewFolder, NewFile, FileReName, FileDel, FileClone].map((label: any, key: React.Key) => ({label, key}))
  switch (type || fileType) {
    case 'dir':
      items = [NewFolder].map((label: any, key: React.Key) => ({label, key}))
      break;
    case FileEnum.FOLDER:
      items = [FileReName, FileDel, FileClone].map((label: any, key: React.Key) => ({label, key}))
      break;
    case FileEnum.ZIP:
      items = [UnZip, FileReName, FileDel, FileClone].map((label: any, key: React.Key) => ({label, key}))
      break;
    default:
      items = [FileReName, FileDel, FileClone].map((label: any, key: React.Key) => ({label, key}))
  }

  return (<Dropdown menu={{items }} trigger={['contextMenu']}>
    {children}
  </Dropdown>)
}

const columns: (operate?: FileDropdownProps['operate']) => ProColumns<any>[] = (operate) =>  [
  {
    title: 'id',
    dataIndex: 'id',
    render: (text: any, record: FileItem) => (<FileDropdown file={record} operate={operate}><div><FileRender mode={record?.mode} operate={operate} file={record} /></div></FileDropdown>)
  }
];


type FileItem = {
  id?: string | number;
  name?: string;
  url?: string;
  type?: FileEnum[keyof FileEnum];
  mode?: FileRenderProps['mode'];
  children?: FileItem[];
}

type FolderStaticProps = {
  FilePreview?: any;
  FileBreadcrumb?: any;
  FileRender?: any
  FileDropdown?: any
}

type FolderProps = ProTableProps<FileItem[], any> & {
  operate?: FileDropdownProps['operate']
}

const Folder: FC<FolderProps> & FolderStaticProps = (props) => {
  return (<>
      <ProTable
        rowKey={'id'}
        showHeader={false}
        expandable={{showExpandColumn: false}}
        pagination={false}
        search={false}
        options={false}
        columns={columns(props?.operate)}
        {...props}
      />
    </>)
}

Folder.FileBreadcrumb = FileBreadcrumb
Folder.FilePreview = FilePreview
Folder.FileRender = FileRender
Folder.FileDropdown = FileDropdown

export default Folder

