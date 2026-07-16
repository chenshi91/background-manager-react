import type React from "react";
import {Modal, Spin,Table,Form,Input, Switch, AutoComplete, type AutoCompleteProps, Mentions, type MentionsProps} from "antd"
import {useHooks} from "./hooks"
import type { ArticleItemType} from "../../type"
import {useHooks as useHooks_common} from "../../hooks"
import { useState } from "react";
import { CloseSquareFilled } from '@ant-design/icons';

const App:React.FC=()=>{

    const { TextArea } = Input;

    const {loading,data,styles,columns,expandable,open,form,footer,onCancel,onFinish,onFinishFailed} =useHooks()
    const {hoc:{ModalWithAutoLoading}} =useHooks_common()
    const   [options,setOptions]=useState<AutoCompleteProps['options']>([])
    const   [options_mentions,setOptions_mentions]=useState<MentionsProps['options']>([{label:"Day 1",value:"day1"},{label:"Day 2",value:"day2"},{label:"Day 3",value:"day3"}])

    const showSearch={
        onSearch:async(inputValue:string)=>{
            await new Promise(resolve=>setTimeout(resolve,1000))
            const a=["@163.com","@qq.com","@sina.com"].map(domain=>({
                value:`${inputValue}${domain}`
            }))
            setOptions(a as AutoCompleteProps['options'])
        }
    }

    const onSearch=(a:any,b:any)=>{
        console.info("onSearch:",a,b)
    }
    return  (
        <>
        <Mentions rows={1} options={options_mentions} placeholder="@..." onSearch={onSearch} prefix={['@','#','&']}></Mentions>
        <AutoComplete options={options} style={{ width: 200 }} placeholder="请输入搜索标题关键字..." showSearch={showSearch} variant="borderless" allowClear={{clearIcon: <CloseSquareFilled/>}}></AutoComplete>
        <Spin spinning={loading} description="正在加载数据...">
            <Table<ArticleItemType> dataSource={data} columns={columns}
                bordered={true}
                pagination={false}
                rowKey={record=>record._id}
                className={styles.customTable}
                scroll={{ y: 55 * 6,x: 800 }}
                expandable={expandable}
                />
            <ModalWithAutoLoading title="分类名称维护" open={open}  onCancel={onCancel} footer={footer} delay={300}  >
                <Form
                    key={form.getFieldValue("_id")??'add'}
                    form={form}
                    // layout="vertical"
                    name="basic"
                    labelCol={{ span: 4}}
                    labelAlign="left"
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    
                    
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    
                >
                    <Form.Item<ArticleItemType>
                        label="id"
                        name="_id" hidden={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ArticleItemType>
                        label="分类名称"
                        name="name"
                        rules={[{   type: 'string', required: true,max:10,min:2, message: '必填，长度2~10字符串' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ArticleItemType>
                        label="简介说明"
                        name="description"
                        rules={[{   type: 'string', required: true,max:10,min:2, message: '必填，长度2~10字符串' }]}
                    >
                        <TextArea  rows={4} />
                    </Form.Item>
                    <Form.Item<ArticleItemType>
                        label="状态"
                        name="status"
                        // style={{justifyContent:'left',backgroundColor:'pink'}}
                        rules={[{   type: 'boolean', required: true, message: 'Please choose a status!' }]}
                    >
                        <Switch />
                    </Form.Item>
                </Form>    
            </ModalWithAutoLoading>
        </Spin>
        </>
    )
}

export default App