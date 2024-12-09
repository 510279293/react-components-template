import React, { FC, useState } from "react"
import * as XLSX from 'xlsx'

const wopts: any = { bookType: 'xlsx', bookSST: true, type: 'binary' };

function s2ab(s: any) {
  if (typeof ArrayBuffer !== 'undefined') {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
  }
  const buf = new Array(s.length);
  for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

function transformData2Stream(data: any){
  const SheetNames = Object.keys(data||{});
  const wb: any = { SheetNames, Sheets: {}, Props: {} };
  if (!SheetNames.length) return;
  SheetNames.forEach(key => {
      wb.Sheets[key] = XLSX.utils.json_to_sheet(data[key]);
  });
  const blobStream = new Blob([s2ab(XLSX.write(wb, wopts))] as any, { type: 'application/octet-stream' })
  return blobStream
}

function getFileName(fileName: string) {
  return `${fileName}.${wopts.bookType === 'biff2' ? 'xls' : wopts.bookType }`
}


function useDownloadHook () {
  const [aprops, setAprops] = useState({download: '', href: ''})

  const download = ({data, fileName, href}: DownloadProps) => {
    const blobStream = data ? transformData2Stream(data) as any : undefined
    const name = data ? getFileName(fileName||'下载') : fileName

    setAprops({download: name||'下载', href: href || URL.createObjectURL(blobStream)})

    setTimeout(() => {
      // 延时释放
        URL.revokeObjectURL(blobStream);
    }, 100);
  }

  return {
    aprops,
    download
  }
}


type DownloadProps = {
  data?: Record<string, any[]>;
  href?: string;
  fileName?: string;
  children?: any
}

type DownloadStaticProps = {
  useDownloadHook?: any;
}

const Download: FC<DownloadProps> & DownloadStaticProps = ({data, href, fileName, children, ...restProps}) => {
  const { aprops, download } = useDownloadHook()

  return (<a {...aprops} {...restProps} onClick={() => download({fileName, href, data})}>{children || '下载'}</a>)
}

Download.useDownloadHook = useDownloadHook

export default Download

