import { Modal, type ModalProps } from "antd";
import { useEffect, useState } from "react";


const modalWithAutoLoading=(props:Omit<ModalProps,"loading">&{delay:number})=>{

    const {afterOpenChange,open,delay=500 }=props
    const [loading,setLoading]=useState<boolean>(false)
    const [open_inner,setOpen_inner]=useState<boolean>(false)
   
    let timer:number
    useEffect(()=>{
        //const loading_5ms=async()=>await new Promise(resolve=>timer=setTimeout(resolve,delay))
        
        if(open){
            setOpen_inner(true)
            setLoading(true)
            timer=window.setTimeout(()=>{
                setLoading(false)
            },delay)
        }else{
            setOpen_inner(false)
        }

        return ()=>{
            clearTimeout(timer)
        }
    },[open])
    

    return  <Modal {...props} open={open_inner} loading={loading} ></Modal>
}

export {modalWithAutoLoading}