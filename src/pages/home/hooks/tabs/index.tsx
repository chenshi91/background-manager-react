import {useState} from "react"
import type {TabsProps} from "antd"
import {useNavigate} from "react-router-dom"


type TtabsOnTabClick_HF=(setMenuSelectedKey:(p:string[])=>void)=>TabsProps['onTabClick']
export const useTabsHooks=()=>{
    const [tabsItems, setTabsItems] = useState<TabsProps['items']>([]);
    const [tabsActiveKey, setTabsActiveKey] = useState<string>('');
    const navigate=useNavigate()

    const tabsOnTabClick_HF:TtabsOnTabClick_HF = (setMenuSelectedKey)=>{
        return  (key, _info) => {
            //console.log('Tab Clicked: ', key, info);
            setTabsActiveKey(key as string);
            setMenuSelectedKey([key as string]);//+主菜单展开的操作
            navigate(key+"?params='xjl'&num=100",{
                state:{
                lastPath:location.pathname
                }
            })
        }
    }

    return {
        tabsItems,setTabsItems,
        tabsActiveKey,setTabsActiveKey,
        tabsOnTabClick_HF
    }
}