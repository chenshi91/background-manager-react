import {useMenuHooks} from "./menu"
import {useTabsHooks} from "./tabs"


export const useHooks=()=>{
    //1,menu
    const {collapsed,setCollapsed,menuSelectedKey,setMenuSelectedKey,items,menuOnSelect_HF,openKeys,onOpenChange} =useMenuHooks()

    //2,tabs
    const {tabsItems,tabsActiveKey,setTabsActiveKey,setTabsItems,tabsOnTabClick_HF}=useTabsHooks()
  

    //高阶函数
    const tabsOnTabClick=tabsOnTabClick_HF(setMenuSelectedKey)
    const menuOnSelect=menuOnSelect_HF(tabsItems,setTabsItems,setTabsActiveKey)


    return  {
        collapsed,setCollapsed,menuSelectedKey,setMenuSelectedKey,items,
        tabsItems,tabsActiveKey,setTabsActiveKey,setTabsItems,
        menuOnSelect,tabsOnTabClick,openKeys,onOpenChange
    }
}