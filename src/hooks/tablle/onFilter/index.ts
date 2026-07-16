



const createOnFilter=<T extends Record<string,any>>(key:keyof  T):(a:any,b:any)=>boolean =>{
    return (value:any, record:T) =>{
            
            //console.info("onFilter-value,record:",value,record)
            return record[key]
            .toString()
            .toLowerCase()
            .includes((value as string).trim().toLowerCase())
        }
    
}

export {    createOnFilter     }