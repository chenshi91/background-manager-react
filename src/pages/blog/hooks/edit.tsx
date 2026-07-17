import { useRef, useState } from 'react'
import type {   ArticleItem } from '../type'
import type { FormInstance } from 'antd/es/form'
import {Form} from 'antd'


export const useEditOrAdd=()=>{
    const [data,setData]=useState<ArticleItem>()
    const [open,setOpen]=useState(false)
    const formRef=useRef<FormInstance<ArticleItem>>(null)
    

    const handleOk=()=>{
        console.info("handleOk")
        
        closeModal()
    }
    const handleCancel=()=>{
        console.info("handleCancel")
        closeModal()
    }

    const closeModal=()=>{
        setOpen(false)
        setData({} as ArticleItem)
    }

    const reset=()=>{
        console.info("rest...",formRef)
        formRef.current?.resetFields()
        //formRef.current?.setFieldValue('title','shuawadika')
    }

    const submit=()=>{
        const formVal=formRef.current?.getFieldsValue()
        console.info("submit...",formVal)
        formRef.current?.validateFields()
        setTimeout(() => {
            console.info("request-api...1s")
            closeModal()
        }, 1000);
    }

    return {
        data,setData,open,setOpen,
        handleCancel,handleOk,formRef,reset,submit
    }


}