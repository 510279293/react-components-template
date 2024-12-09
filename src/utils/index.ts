import dayjs from "dayjs"
import { parse } from 'qs'

export const allDateRanges: any = {
  '今天': [dayjs(), dayjs()],
  '昨天': [dayjs().add(-1, 'days'), dayjs().add(-1, 'days')],
  '近7天': [dayjs().add(-7, 'days'), dayjs()],
  '近30天': [dayjs().add(-30, 'days'), dayjs()],
  '本周': [dayjs().startOf('isoWeek' as any), dayjs().endOf('isoWeek' as any)],
  '上周': [dayjs().startOf('isoWeek' as any).add(-7, 'days'), dayjs().endOf('isoWeek' as any).add(-7, 'days')],
  '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
  '上月': [dayjs().startOf('month').add(-1, 'month'), dayjs().endOf('month').add(-1, 'month')],
  '本季': [dayjs().startOf('quarter' as any), dayjs().endOf('quarter' as any)],
  '上季': [dayjs().startOf('quarter' as any).add(-1, 'quarter' as any), dayjs().endOf('quarter' as any).add(-1, 'quarter' as any)],
  '本年': [dayjs().startOf('year'), dayjs().endOf('year')],
  '上年': [dayjs().startOf('year').add(-1, 'year'), dayjs().endOf('year').add(-1, 'year')]
}

// localStorage 存储
export const setStorage = (key: string, value: any) => localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
export const getStorage = (key: string) => JSON.parse(localStorage.getItem(key)||'')
export const removeStorage = (key?: string) => key ? localStorage.removeItem(key) : localStorage.clear()

// sessionStorage 存储
export const setSession = (key: string, value: any) => sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
export const getSession = (key: string) => JSON.parse(sessionStorage.getItem(key)||'')
export const removeSession = (key?: string) => key ? sessionStorage.removeItem(key) : sessionStorage.clear()

// 地址栏 search 参数解析
export const parseSearch = (search: string = '') => parse((search||'').slice(1)) as Record<string, any>;

// 判断是否为浏览器环境(服务端渲染会用到)
export const isBrowser = () => !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * @description: 树状结构扁平化
 * @param {any[]} treeData 数据源
 * @param {string} childrenName 树结构的 children 名
 * @return { any[] } 返回的目标数据
*/
type FlattenTreeFn = (treeData: any[], childrenName?: string) => any[];
export const flattenTree: FlattenTreeFn = (treeData: any[], childrenName = 'children') => treeData.reduce((acc, node) => acc.concat(node, ...flattenTree(node[childrenName] || [], childrenName)), [])

// 递归处理公共树结构

export const handleTreeData = (treeData: any, handleItem: (v: any, i?: any, parent?: any) => object| boolean) => {
  const allLeafArr: any[] = []
  const flatArr: any[] = []
  const newTreeData: any = []
  const copyTreeData = JSON.parse(JSON.stringify(treeData))

  const deps = (data: any[], newTreeData: any[], parent?: any) => (data||[])?.filter((v: any, i) => {
      const { children } = v
      const newV = handleItem?.(v, i, parent)
      const isFilter = typeof newV === 'boolean'
      if (isFilter) {
        flatArr.push(v)
        if (children && children.length) {
          v.children = deps(children||[], v.children)
        } else {
          allLeafArr.push(v)
        }
        return newV
      }
      v = isFilter ? v : newV
      flatArr.push(v)
      newTreeData[i] = v
      newTreeData[i].children = children||[]
      if (children && children.length) {
          deps(children||[], v.children, v)
      } else {
          allLeafArr.push(v)
      }
  })
  const filterTreeData = deps(copyTreeData, newTreeData, {})
  return {
      treeData,
      newTreeData,
      flatArr,
      allLeafArr,
      filterTreeData
  }
}
