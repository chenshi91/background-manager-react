import { useEffect } from "react"
import { createStyles } from 'antd-style';
import { type ColumnsType } from "antd/es/table";
import { Button,Space,Switch,type FormInstance,Divider, Popconfirm } from "antd"
import {useHooks} from "../../../../hooks"
import type { ArticleItemType } from "../../../../type"
import {getDate} from "../../../../utils"
// import {type RequestResponse,http} from '@cf/demo-p1'
import {http} from '../../../../utils/http'

export const useTableHooks=(setLoading:(p:boolean)=>void,setData:(p:any)=>void,setOpen:(p:boolean)=>void,form: FormInstance<any>)=>{
    
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
     const { styles } = useStyle();

     //const render_status=useCallback((s:boolean)=><Switch defaultChecked={s} loading={statusLoading} onChange={onChange} />,[])

     const {table:{createTableFilter},hoc:{SwitchWithAutoLoading}}=useHooks()
     const {filterDrop,filter,render}=createTableFilter<ArticleItemType>('博客分类','name')
     const {filterDrop:filterDrop_id,filter:filter_id,render:render_id}=createTableFilter<ArticleItemType>('id','_id')
     const {filterDrop:filterDrop_des,filter:filter_des,render:render_des}=createTableFilter('分类描述','description')

     const columns:ColumnsType<ArticleItemType>=[
        {
          title:'id',dataIndex:'_id',key:'_id',width:125,align:'center',
          filterDropdown:filterDrop_id,
          onFilter:filter_id,
          render:render_id,
          fixed:'left'
        },
        { 
          title: '标题', dataIndex: 'name', key: 'title',width:100,align:'center',
          sorter: (a:ArticleItemType, b:ArticleItemType) => a.name.length - b.name.length,
          filterDropdown:filterDrop,
          onFilter: filter,
          render: render,
        },
        { 
          title: '描述', dataIndex: 'description', key: 'description',width:100,align:'center',
          sorter: (a:ArticleItemType, b:ArticleItemType) => a.name.length - b.name.length,
          filterDropdown:filterDrop_des,
          onFilter: filter_des,
          render: render_des,
        },
        {
          title:'状态',dataIndex:'status',key:'status',width:60,align:'center',
          render:(s:boolean)=><SwitchWithAutoLoading defaultChecked={s} onChange={onChange} />
        },
        {
          title:'创建日期',dataIndex:'create_date',key:'create_date',width:100,align:'center',
          render:(d:number)=><span>{getDate(d)}</span>
        },
        { title:"操作",width:150,fixed:"right",align:"center",
          render:(a:ArticleItemType)=>{
              return (
              // <div style={{display:'flex',justifyContent:'space-between',width:150,paddingRight:20}}>
                  
              // </div>
              <Space size="medium" separator={<Divider vertical />}>
                  <Button type="primary" onClick={()=>editBlog(a)} style={{width:50}}>编辑</Button>
                  <Popconfirm title="确认删除分类吗?" description="删除分类后，此分类将不再在前端页面展示!" onConfirm={(e:React.MouseEvent<HTMLElement, MouseEvent> | undefined)=>confirm(e,a)} onCancel={cancel}>
                    <Button type="default"  style={{width:50}}>删除</Button>
                  </Popconfirm>
              </Space>
              )
          }
        }
    ]

    const editBlog=async(record:ArticleItemType)=>{
      console.info("editBlog,",record)
          
      // setEditData(record)
      form.resetFields()
      await new Promise(resolve=>setTimeout(resolve,0))//延迟一帧
      form.setFieldsValue(record)
      setOpen(true)
      
    }

    const delBlog=(record:ArticleItemType)=>{
      console.info("delBlog,",record)

    }

    const confirm=(e:React.MouseEvent<HTMLElement, MouseEvent> | undefined,a:ArticleItemType)=>{
      console.info("popconfirm:",a,e)
    }

    const cancel=(a:any)=>{
      console.info("popcancel:",a)
    }

    

    const onChange=async(a:any)=>{
      // 延时2秒模拟接口
      // await new Promise(r => setTimeout(r, 2000));
      // const res=await http.post<RequestResponse<ArticleItemType[]>>('/getBlogList',{"pageNo":1,"pageSize":10,"typeId":""})
      // console.info("yanshi-res:",res)
      return http.post<RequestResponse<ArticleItemType[]>>('/getBlogList',{"pageNo":1,"pageSize":10,"typeId":""})
    }

    

    const expandable = {
      expandedRowRender: (record:ArticleItemType) => (
        <p style={{ margin: 0 }}>{record.description ?? "暂无详情描述"}</p>
      ),
      rowExpandable: (_record:ArticleItemType) => {
        // 空值兼容：不存在/空字符串直接返回false
        // const desc = record.description ?? "";
        return true;
      },
    }

    useEffect(()=>{
        setLoading(true)
        http.get<RequestResponse<ArticleItemType[]>>('/getBlogTypeList').then(res=>{
            //console.info("res=",res)
            setData(res.data)
        }).catch(err=>console.error("err=",err)).finally(()=>setLoading(false))
    },[])

    return {
        styles,columns,editBlog,delBlog,expandable
    }
}

