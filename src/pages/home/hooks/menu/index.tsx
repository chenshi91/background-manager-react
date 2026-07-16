import {useEffect, useState} from 'react'
import type { MenuProps,TabsProps,  } from 'antd';
import {useNavigate} from 'react-router-dom'
import {
  DesktopOutlined,
  FileOutlined,
  FileTextOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

//tabsItems:TabsProps['items'],setTabsItems:(p:any)=>void,setTabsActiveKey:(p:string)=>void
type TMenuOnSelect_HF=(tabsItems:TabsProps['items'],setTabsItems:(p:any)=>void,setTabsActiveKey:(p:string)=>void)=>MenuProps['onSelect']
export const useMenuHooks=()=>{
    const [collapsed, setCollapsed] = useState(false);
    const [menuSelectedKey, setMenuSelectedKey] = useState(['']);
    const navigate=useNavigate()
    const [openKeys,setOpenKeys]=useState<string[]>(['@blog'])

    const menuOnSelect_HF: TMenuOnSelect_HF = (tabsItems,setTabsItems,setTabsActiveKey)=>{
        return  ({ key, selectedKeys, domEvent }):void => {
            // console.log('key: ', key);
            const label=(domEvent.target as HTMLElement).innerText;
            setMenuSelectedKey(selectedKeys);
            if(key.includes('@')){
                //主菜单，不联动
                return
            }
            //1，菜单联动tabs
            const tabItem = tabsItems?.find(item => item.key === key);
            if (!tabItem) {
                //tabs新增
                if(tabsItems?.length as number>4){
                    alert("最多只能打开5个标签页")
                    return;
                }
                setTabsItems([...tabsItems||[], {label,key}]) 
            }
            setTabsActiveKey(key as string);
            //2，路由跳转
            navigate(key+"?name='xjl'",{
            state: { "home": "hb" ,count:86,lastPath:location.pathname},
            })
        }
    }

    const onOpenChange=(keys:string[])=>setOpenKeys(keys)

    type MenuItem = Required<MenuProps>['items'][number];
    
    useEffect(()=>{
        //读取本地缓存数据store
        localStorage.getItem("menuSelectedKey")
        &&setMenuSelectedKey([localStorage.getItem("menuSelectedKey") as string])
        &&navigate(localStorage.getItem("menuSelectedKey") as string)

        localStorage.getItem("openKeys")&&setOpenKeys([localStorage.getItem("openKeys") as string])
    },[])    

    useEffect(()=>{
        // console.info("menuSelectedKey:",menuSelectedKey)
        //递归找到所有父级菜单的key
        const topParentKey = findTopParentOpenKey(items, menuSelectedKey[0] as string);
        // console.info("topParentKey:",topParentKey)
        //同步本地缓存
        topParentKey&&localStorage.setItem("openKeys",topParentKey)
        localStorage.setItem("menuSelectedKey",menuSelectedKey[0])
        
    },[menuSelectedKey])

    /**
     * 第一步：根据目标子key，找到【直接父节点key】
     */
    const findDirectParentKey = (menuList: MenuItem[], targetKey: string): string | null => {
        for (const item of menuList) {
            if (item && 'children' in item && (item.children?.length as number)>0) {
                const hasTarget = item.children?.some(child => child?.key === targetKey);
                if (hasTarget) {
                    return item.key as string; // 返回直接父
                }
                const deep = findDirectParentKey(item.children as MenuItem[], targetKey);
                if (deep) return deep;
            }
        }
        return null;
    };

    /**
     * 第二步：根据任意一个父key，向上查找【最顶层根父key】
     */
    const findRootParentKey = (allMenu: MenuItem[], currentParentKey: string): string | null => {
        for (const item of allMenu) {
            if (item && 'children' in item && (item.children?.length as number > 0)){
                // 当前层级包含这个父节点，说明item是它的上一级
                const match = item.children?.some(child => child?.key === currentParentKey);
                if (match) {
                // 继续往上递归，直到找不到上层，此时item.key就是顶层根父
                return findRootParentKey(allMenu, item?.key as string) || (item?.key as string);
                }
                // 深层递归查找
                const deepRoot = findRootParentKey(item?.children as MenuItem[], currentParentKey);
                if (deepRoot) return deepRoot;
            } 
        }
        // 找不到上层，说明传入的currentParentKey本身就是顶层父
        return currentParentKey;
    };

    /**
     * 对外统一入口：传入目标子key，直接返回【最顶层父菜单key】
     */
    const findTopParentOpenKey = (allMenu: MenuItem[], targetKey: string): string | null => {
        const directParent = findDirectParentKey(allMenu, targetKey);
        if (!directParent) return null;
        return findRootParentKey(allMenu, directParent);
    };
    
    function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('患者处置中心', 'pat-handel-center', <PieChartOutlined style={{fontSize: "10px"}}/>),
        getItem('远程业务A', '/remote-a', <DesktopOutlined />),
        getItem('YY管理', '@blog', <UserOutlined />, [
            getItem('分类列表', 'blog-module/blog-type'),
            getItem('文章列表', 'blog-module/blog'),
            
        ]),
        getItem('个人中心', 'self', <TeamOutlined />, [getItem('个人中心1', 'self'), getItem('个人中心 2', '8')]),
        getItem('XX管理', 'blog', <FileOutlined style={{fontSize: "10px"}}/>),
        getItem('虚拟列表', 'xuniliebiao', <DesktopOutlined />),
    ];


    return {
        collapsed, setCollapsed,
        menuSelectedKey, setMenuSelectedKey,
        menuOnSelect_HF,
        items,openKeys,onOpenChange
    }
}