import type React from "react";
import {  SearchOutlined } from '@ant-design/icons';
import { Button, Space, Input,  } from "antd";
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import type { TTableSearch } from '../../../type'

type TFilterDropdown= (props: FilterDropdownProps) => React.ReactNode


const createFilterDrop=(s:string,tableSearch:TTableSearch):TFilterDropdown=>{
    return (props:FilterDropdownProps)=>{
        const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
        //console.info("filterDropdown-props:",props)

        return (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
            //ref={searchInput}
            placeholder={`Search ${s}`}
            value={selectedKeys[0]}
            onChange={(e) =>  setSelectedKeys(e.target.value ? [e.target.value] : [])  }
            onPressEnter={() => {tableSearch.key=selectedKeys[0] as string, confirm()}}
            style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => {tableSearch.key=selectedKeys[0] as string, confirm()}}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                onClick={()=>{clearFilters?.(); confirm(); tableSearch.key=''}}
                size="small"
                style={{ width: 90 }}
            >
                Reset
            </Button>
            </Space>
            </div>
            
        )
        
    }
}

export { createFilterDrop}



