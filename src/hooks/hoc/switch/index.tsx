import {useState} from "react"
import  {type SwitchProps,Switch} from "antd"
import { loadPromise } from "../common"

const switchWithAutoLoading=(props: Omit<SwitchProps, "loading" | "onChange"> & {
    defaultChecked: boolean;
    onChange: (v: boolean) => Promise<void>|void;
    }) => {
        const [loading, setLoading] = useState<boolean>(false);
        const handleChange = async (v: boolean) => {
            setLoading(true);
            console.info("setLoading-true")
      
            let hasAsyncTask = false;
            let promiseResult: Promise<void> | void;
            try {
                promiseResult = props.onChange(v);
                // 标记是否返回Promise
                hasAsyncTask = promiseResult instanceof Promise;
                // 有Promise则等待接口执行完成
                if (hasAsyncTask)   await loadPromise(promiseResult as Promise<any>);
            }catch(err){
                console.error("withAutoLoadingFC-Switch-onChange-error:",err)
            }
            
            setLoading(false);
            console.info("setLoading-false")

        };
        return <Switch {...(props as SwitchProps)} defaultChecked={props.defaultChecked} loading={loading} onChange={handleChange} />;
    };

export {switchWithAutoLoading}

