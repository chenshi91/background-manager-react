import {createFilterDrop} from "./filterDropdown"
import {createOnFilter} from "./onFilter"
import {createRender} from "./render"
import type { TTableSearch } from "../../type"

export const useTableHooks=()=>{
    
    

    const createTableFilter=<T extends Record<string,any>>(s:string,key:keyof T)=>{
        const tableSearch:TTableSearch={
            key:''
        }
        const filterDrop=createFilterDrop(s,tableSearch)
        const filter=createOnFilter<T>(key)
        const render=createRender(tableSearch)
        return {
            filterDrop,filter,render
        }
    }

    return  {
        createFilterDrop,createOnFilter,createTableFilter
    }
}