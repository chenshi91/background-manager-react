import {useState} from "react"
import {useTableHooks} from "./table"
import type { ArticleItemType } from '../../../type'
import { useModalHooks } from "./modal"
import { useFormHooks } from "./form"
import { Form } from "antd"

export const useHooks=()=>{
    //spin
    const [loading,setLoading]=useState(false)
    //table
    const [data,setData]=useState<ArticleItemType[]>([])
    //modal
    const [open,setOpen]=useState<boolean>(false)
    //form
    const   [form]=Form.useForm<ArticleItemType>()
    // const [editDate,setEditData]=useState<ArticleItemType>()
    

    const {styles,columns,expandable}=useTableHooks(setLoading,setData,setOpen,form)
    const {onFinish,onFinishFailed}=useFormHooks()
    const {footer,onCancel}=useModalHooks(form,setOpen)

    return  {
        loading,expandable,setOpen,form,footer,onCancel,onFinish,onFinishFailed,
        data,styles,columns,open
    }
}