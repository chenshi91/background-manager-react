import React, {  useEffect, useState } from "react";
import {type RequestResponse,http} from '@cf/demo-p1'
import Spin from "antd/es/spin";
import Table, { type ColumnsType } from "antd/es/table";
import { Button, Flex, Tag, Modal,Form,Input, Select, Radio, Checkbox, Row, Col, Breadcrumb,Image, AutoComplete, Popconfirm } from "antd";
import { createStyles } from 'antd-style';
import {useHooks} from './hooks'
import {useEditOrAdd} from './hooks/edit'
import type { TablePaginationConfig, SorterResult, FilterValue } from 'antd/es/table/interface';
import type {ArticleItem,ArticleItemType} from './type'
import TextArea from "antd/es/input/TextArea";
import "./index.css"
import {useLocation} from 'react-router-dom'
import {getAllImgSrc} from '../../utils'
import Space from "antd/lib/space";




const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token as any;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `,
  };
});

// let options:[]=[]

const App: React.FC = () => {

  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  const [current,setCurrent]=useState(1)
  const [pageSize,setPageSize]=useState(10)
  const [total,setTotal]=useState(0)
  const [loading, setLoading] = useState(false);

  const { styles } = useStyle();
  const { 
    filterDropDown_title,filterDropDown_content,filterDropDown_about,
    filter_title,filter_content,filter_about,
    render_title,render_content,render_about,
    options_auto,showSearch
  } =useHooks()

  const {data,setData,setOpen,open,handleCancel,handleOk,formRef,reset,submit}=useEditOrAdd()

  useEffect(() => {
    // console.log("blog useEffect")
    setLoading(true)
    //http.get('/getBlogTypeList').then(res=>console.log("req:",res)).catch(err=>console.log("err:",err))
    http.post<RequestResponse<ArticleItem[]>>('/getBlogList',{"pageNo":current,"pageSize":pageSize,"typeId":""}).then(res=>{
      // console.log("req2:",res);
      const { data, count  } = res; 
      setArticleList(data);
      setTotal(count as number)
    }).catch(err=>console.log("err:",err))
    .finally(()=>setLoading(false))  
  }, [current,pageSize])

  
  
  const [options,setOptions]=useState([])
  useEffect(()=>{
    http.get<ArticleItemType>('/getBlogTypeList').then(res=>{
      // console.info("blogType=",res)
       let blogTypeList:ArticleItemType[]=(res as any).data
       //options=blogTypeList.map(b=>({label:b.name,value:b._id})) as []
       setOptions(blogTypeList.map(b=>({label:b.name,value:b._id})) as [])
      //  console.info("options=",options)
    })
    return ()=>{
      //清除全局变量
      //options=[]
    }
  },[])

  const handleTableChange = (pagination:TablePaginationConfig, _filters:Record<string, FilterValue | null>, _sorter:SorterResult<ArticleItem> | SorterResult<ArticleItem>[]) => {
    // console.log('Table changed: ', pagination, filters, sorter);
    // setPagination({...pagination})
    setCurrent(pagination.current??1)
    setPageSize(pagination.pageSize??10)
  }

  

  
  

  const columns:ColumnsType<ArticleItem>=[
    { title: '标题', dataIndex: 'title', key: 'title',width:100,align:'center',
      sorter: (a:ArticleItem, b:ArticleItem) => a.title.length - b.title.length,
      filterDropdown:filterDropDown_title,
      onFilter: filter_title,
      render: render_title,
      fixed:'left'
    },
    { title:"简介", dataIndex:'excerpt',key:'excerpt',width:100 ,responsive:['sm'] },
    { title:"分类", dataIndex:'category_id',key:'category_id',width:100,render:c=>{
      return <Select defaultValue={c} options={options} style={{width:'100%'}}></Select>
    } },
    { title: '内容', dataIndex: 'content',filterDropdown:filterDropDown_content, onFilter:filter_content,
      key: 'content',ellipsis:true,width:100,render: render_content },
    { title: '封面图', dataIndex: 'content',width:100,
      key: 'user_avater',render: (html:string) => {
        const imgSrcs = getAllImgSrc(html);
        return imgSrcs.length > 0 ? <Image.PreviewGroup items={imgSrcs}>
          <Image  src={imgSrcs[0]}
              alt="hello antd img"
              width={100}
              height={60}
              preview={{cover:(<Space align="center"> beautiful </Space>)}}
            />
          </Image.PreviewGroup> : null;
      } },
    { title:'标签', dataIndex:'_id',key:'id',width:100,render:(s:string)=>{
      return (
        <Flex gap="small" align="center" wrap>
          {s.split("9").map(s=><Tag color={s.length>3?'blue':'pink'} key={s}>{s}</Tag>)}
        </Flex>
      )
    }},
    { title:"操作",width:150,fixed:"right",align:"center",
      render:(a:ArticleItem)=>{
        return (
          <div style={{display:'flex',justifyContent:'space-between',width:150,paddingRight:20}}>
            <Button type="primary" onClick={()=>editBlog(a)} style={{width:50}}>编辑</Button>
            <Popconfirm title="确认删除吗?" description="删除后，此博客将不再在前端页面展示!" onConfirm={(e:React.MouseEvent<HTMLElement, MouseEvent> | undefined)=>delBlog(a)}>
              <Button type="default"  style={{width:50}}>删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }
  ]

  const editBlog=(data:ArticleItem)=>{
    //console.info("editBlog-a:",data)
    setOpen(true)
    setData(data)
    // setTimeout(()=>{
    //   formRef.current?.setFieldsValue(data)
    // },200)
  }

  const delBlog=(a:ArticleItem)=>{
    console.info("delBlog:",a)
    setArticleList(articleList.filter(item=>item._id!==a._id))
  }

  const expandable={
      expandedRowRender: (record:ArticleItem) => <p style={{ margin: 0 }}>{record.content}</p>,
      rowExpandable: (record:ArticleItem) => record.content.length>20,
  }

  const onchange=(value:any)=>{
    console.info("onchange,value=",value,",options=",options)
  }

  const onSearch=(a:any)=>{
    console.info("onSearch,value=",a)
  }

  

  // const filterOption=(input:string, option:any)=>{
  //   console.info("input=",input,",aptions=",option)
  //   if(!option?.value){
  //     return false
  //   }
  //   const result=((option as any)?.label ?? '').toLowerCase().includes(input.toLowerCase())
  //   return result
  //   //return true 
  // }

  

  return (
    <div className="blog">
     
        <Flex justify="space-between" align="center">
          <Breadcrumb items={[{title:'首页'},{title:'博客管理'}]} style={{width:'30%'}}></Breadcrumb> 
          <Row style={{width:'20%'}}>
            <Col span={20}><AutoComplete options={options_auto} placeholder="搜索标题..." style={{width:'100%'}} {...showSearch}  /></Col>
            <Col span={4}><Button type="primary" onClick={()=>setOpen(true)}>新增</Button></Col>
          </Row>
        </Flex>
        <Spin spinning={loading} description="正在加载博客数据...">
            <Table<ArticleItem> dataSource={articleList} columns={columns} 
              pagination={{current,pageSize,total,placement:['bottomStart']}} onChange={handleTableChange}
              bordered={true}
              rowKey={record=>record._id}
              className={styles.customTable}
              scroll={{ y: 55 * 6,x: 800 }}
              expandable={expandable}/>
        </Spin>

        <Modal
          mask={{blur:true}}
          title={`${data?._id?'编辑':'新增'}数据`}
          //closable={{ 'aria-label': 'Custom Close Button' }}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button type="primary" onClick={submit}>提交</Button>,
            data?._id?null:<Button type="primary" onClick={reset}>重置</Button>
          ]}
        >
          <Flex justify="left" wrap="nowrap" style={{ paddingRight:'10px' }}>
            <Form
              key={data?._id??'add'}
              ref={formRef}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ flex: 1 }}
              style={{ width: 600,fontSize: '5px',lineHeight:1.5 }}
              initialValues={data}
              //onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<ArticleItem>
                label="id"
                name="_id"
                hidden
              >
                <Input   />
              </Form.Item>
              <Form.Item<ArticleItem>
                label="标题"
                name="title"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input   />
              </Form.Item>
              <Form.Item<ArticleItem>
                label="类别"
                name="category_id"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select     showSearch={{ optionFilterProp: 'label', onSearch}}  options={options } onChange={onchange}/>
              </Form.Item>
              <Form.Item<ArticleItem>
                label="简介"
                name="excerpt"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input   />
              </Form.Item>
              <Form.Item<ArticleItem>
                label="内容"
                name="content"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                
                <TextArea autoSize={{ minRows: 3}}></TextArea>
              </Form.Item>
              <Form.Item<ArticleItem>
                label="wife"
                //name=""
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Radio.Group style={{ width:'100%' }} options={[
                  { value: 1, label: 'A' },
                  { value: 2, label: 'B' },
                  { value: 3, label: 'C' },
                  ]}/>
              </Form.Item>
              <Form.Item<ArticleItem>
                label="爱好"
                //name=""
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Checkbox.Group style={{ width:'100%' }}   defaultValue={['P']}  >
                  <Row>
                    <Col span={6}>
                      <Checkbox value="A">Apple</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="P">Pear</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="O">Orange</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="B">Banala</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Form>
          </Flex>
          
      </Modal>
        
    </div>
  );
};

export default App;