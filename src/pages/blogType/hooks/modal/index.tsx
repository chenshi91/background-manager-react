

import {Button,type FormInstance} from "antd"
import type { ArticleItemType } from '../../../../type'

export const useModalHooks=(form:FormInstance<ArticleItemType>,setOpen:(p:boolean)=>void)=>{

    const edit=async ()=>{
        console.info("edit",form.getFieldsValue())
        try {
            await    form.validateFields()
            form.submit()
        } catch (error) {
            console.error("edit-error:",error)
        }

    }

    const reset=()=>{
        console.info("reset:",form.getFieldsValue())
        form.resetFields()
    }

    const onCancel=(_e:any)=>{
        setOpen(false)
        form.resetFields()
    }
    
    const isEdit=!!form.getFieldValue("_id")
    // console.info("isEdit:",form.getFieldValue("_id"))

    const footer=[
        isEdit?
            (<>
                <Button type="primary" onClick={edit}>修改</Button>
                <Button  onClick={reset}>重置</Button>
            </>)
            :(
                <Button type="primary" onClick={edit}>新增</Button>
            )
    ]

    


    return {
        footer,onCancel
    }
}