import type React from "react";
import {FloatButton} from 'antd'
import {FileTextOutlined,UserOutlined,DesktopOutlined} from '@ant-design/icons'

type TParams={
    sendMsg:()=>void
}

const App:React.FC<TParams>=({sendMsg}:TParams)=>{
    

    const onclickOther=()=>{
        console.info("Msg-onclickOther is click")
        sendMsg()
    }

    return (
        <>
        <FloatButton.Group content="消息" type='primary' trigger='hover' shape="square" icon={<FileTextOutlined />} style={{ insetInlineEnd: 80 }} badge={{count:68}}>
            <FloatButton type='primary' content="博客消息" style={{width:'70px'}} icon={<UserOutlined />} badge={{dot:true}}></FloatButton>
            <FloatButton type='primary' content="账户消息" style={{width:'70px'}} icon={<DesktopOutlined />}></FloatButton>
            <FloatButton type='primary' content="其他消息" style={{width:'70px'}} icon={<FileTextOutlined />} badge={{count:22}} onClick={onclickOther}></FloatButton>
        </FloatButton.Group>
        <FloatButton.BackTop />
        </>
    )
}

export default App