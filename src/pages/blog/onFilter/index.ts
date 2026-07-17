
import type {TSearchParams,TKey} from '../type'


const useOnFilter=(searchParams:TSearchParams,key:TKey):{onFilter:(a:any,b:any)=>boolean} =>{
    return {
        onFilter:(value:any, record:any) =>{
            searchParams[key]=value
            //console.info("onFilter-value,record:",value,record)
            return record[key]
            .toString()
            .toLowerCase()
            .includes((value as string).trim().toLowerCase())
        }
    }
}

export {    useOnFilter     }