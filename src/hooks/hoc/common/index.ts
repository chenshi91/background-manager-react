import {minLoad} from "../../../config"

//至少有500毫秒的动画加载时间
export  const loadPromise=async(p:Promise<any>)=>{
    const startDate=Date.now()
    await p
    const cost=Date.now()-startDate
    //const minLoad=500
    if(cost<minLoad){
        const waitTime=minLoad-cost
        await new Promise(res=>setTimeout(res,waitTime))
    }
}