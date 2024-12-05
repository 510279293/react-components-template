import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Tree, Input, } from 'antd'
import { DataNode, TreeProps } from 'antd/lib/tree';
// import { isFunction } from 'lodash';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './style/index.less'
import { SearchProps } from 'antd/es/input';
const { Search } = Input

function isFunction(val: unknown) {
  return typeof val === 'function'
}

interface TreeDataItem extends DataNode{
  _title?: string;
}

type TreeTitleRenderActions = 'add' | 'update' | 'del' | 'titleClick'

type IconFn = (item: any) => TreeTitleRenderActions[]
type TreeTitleRenderProps = {
    nodeData: any;
    showIcons?: TreeTitleRenderActions[] & IconFn;
    onOperate?: (nodeData: any, type?: TreeTitleRenderActions) => void;
}
interface WithSearchTreeProps extends TreeProps {
    warpStyle?: CSSProperties;
    onSearch?: (args: any) => void;
    onOperate?: (nodeData: any, type?: TreeTitleRenderActions) => void;
    showIcons?: TreeTitleRenderProps["showIcons"];
    treeData: TreeDataItem[];
    search?: SearchProps
}

type WithSearchTreeStaticProps = {
   WithSearchTreeWarp?: any
}

type WithSearchTreeWarpProps = {
    title?: ReactNode | boolean;
    onOperate?: WithSearchTreeProps['onOperate']
    children?: ReactNode;
    Icon?: ReactNode
}

type Loop = (data: DataNode[], searchKey: string) => any;


// 根据关键字 searchKey 在 data 中模糊查找
const loop: Loop = (data: TreeDataItem[], searchKey: string) => data.map((item: TreeDataItem) => {
    const { key, _title } = item
    const index = (_title||'')?.indexOf(searchKey);
    const beforeStr = (_title||'')?.substring(0, index);
    const afterStr = (_title||'')?.slice(index + searchKey.length);
    const newtitle = index > -1 ? (<>{beforeStr}<span style={{color: '#f50'}}>{searchKey}</span>{afterStr}</>) : item?._title
    if (item?.children) {
        return { title: newtitle, _title, key, children: loop(item.children, searchKey) };
    }
    return {
        title: newtitle,
        _title,
        key,
    }
})

// 根据 key 在 treeData 中查询 父节点
const getParentKey = (key: string | number, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
};

//
export const handleCommonTreeData = (treeData: any, handleItem?: (v: any) => object) => {
  const allLeafArr: any[] = []
  const flatArr: any[] = []
  const deps = (data: any[]) => (data||[]).forEach((v) => {
      const { children } = v
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      handleItem && Object.assign(v, handleItem(v))
      flatArr.push(v)
      if (children && children.length) {
          deps(children||[])
      } else {
          allLeafArr.push(v)
      }
  })
  deps(treeData)
  return {
      treeData,
      flatArr,
      allLeafArr
  }
}

const treeSearch = (treeData: TreeDataItem[]) => {
  const { flatArr: flatKeyValueArr } = handleCommonTreeData(treeData)
  return (searchKey: string) => {
    const filterData = loop(treeData, searchKey)
    const expandedKeys = flatKeyValueArr.map((item: TreeDataItem) => {
        if ((item._title as string).indexOf(searchKey) > -1) {
            return getParentKey(item.key, treeData);
        }
        return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    return { filterData, expandedKeys }
  }
}

const TreeTitleRender = ({nodeData, showIcons: icons, onOperate}: TreeTitleRenderProps) => {
    const { title } = nodeData
    const showIcons = isFunction(icons) ? icons?.(nodeData) : (icons || ['add', 'update', 'del'])

    const titleClick = (e: Event, type?: TreeTitleRenderActions) => {
      if(type !== 'titleClick') e.stopPropagation()
      onOperate?.(nodeData, type)
    }
    return <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}} onClick={(e) => titleClick(e as unknown as Event, 'titleClick')}>
                <span>{title}</span>
                <div className='title-operate'>
                    {showIcons?.includes('add') ? <PlusOutlined style={{ color: '#0479FE', marginLeft: 6}} onClick={(e) => titleClick(e as unknown as Event, 'add')} /> : null}
                    {showIcons?.includes('update') ? <EditOutlined style={{ color: '#0479FE', marginLeft: 6}} onClick={(e) => titleClick(e as unknown as Event, 'update')} /> : null}
                    {showIcons?.includes('del') ? <DeleteOutlined style={{ color: '#0479FE', marginLeft: 6}} onClick={(e) => titleClick(e as unknown as Event, 'del')} /> : null}
                </div>
            </div>
}

const WithSearchTreeWarp = ({title, onOperate, Icon: MIcon, children}: WithSearchTreeWarpProps) => {
    return <div>
       {(typeof title === 'boolean' && !title) ? null : <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 500, background: '#F5F5F5', boxSizing: 'border-box', padding: '12px'}}>
            {title}{MIcon ? MIcon : <PlusOutlined style={{cursor: 'pointer'}} onClick={() => onOperate?.(null, 'add')} />}
        </div>}
        <div style={{boxSizing: 'border-box', padding: '12px', background: '#fff',}}>{children}</div>
    </div>
}

const WithSearchTree: FC<WithSearchTreeProps> & WithSearchTreeStaticProps =  ({
    search,
    warpStyle,
    onSearch,
    onOperate,
    showIcons,
    treeData: originTreeData,
    expandedKeys: originExpandedKeys,
    autoExpandParent: originAutoExpandParent,
    ...rest
  }) => {
      const { treeData: pTreeData } = handleCommonTreeData(originTreeData, (v) => ({...v, _title: v._title || v.title}))
      const [treeData, setTreeData] = useState(pTreeData)
      const [expandedKeys, setExpandedKeys] = useState<any>(originExpandedKeys)
      const [autoExpandParent, setAutoExpandParent] = useState(originAutoExpandParent)
      const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
      }
      return (<div className="jrc-with-search-tree" style={warpStyle}>
                  <Search
                    placeholder={'请输入关键字'}
                    style={{width: '100%', marginBottom: '12px'}}
                    onChange={(e) => {
                      const { filterData, expandedKeys } = treeSearch(treeData)(e?.target.value)
                      setTreeData(filterData)
                      setExpandedKeys(expandedKeys)
                      setAutoExpandParent(true)
                      onSearch?.({filterData, expandedKeys, keyword: e?.target.value})
                    }}
                    {...search}
                  />
                  <Tree
                    titleRender={(nodeData) => <TreeTitleRender nodeData={nodeData} showIcons={showIcons} onOperate={onOperate} />}
                    treeData={treeData}
                    expandedKeys={expandedKeys}
                    onExpand={onExpand}
                    autoExpandParent={autoExpandParent}
                    {...rest}
                  />
              </div>)
}

WithSearchTree.WithSearchTreeWarp = WithSearchTreeWarp

export default WithSearchTree
