import { Form } from "antd"

export const useFormHooks=()=>{
    //const   [form]=Form.useForm()

    const onFinish=(values:any)=>{
        console.info("form-submit onFinish:",values)    
    }

    const onFinishFailed=(errorInfo:any)=>{
        console.error("form-submit onFinishFailed:",errorInfo)
    }
    return  {
        onFinish,
        onFinishFailed
    }
}