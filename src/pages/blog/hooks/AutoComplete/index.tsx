
export const useHooks_autocomplete=(setOptions_auto:(p:{
    label:string,
    value:string
}[])=>void)=>{

    let timer:any=null
    const showSearch={
        onSearch: (text:string) =>{
            if(timer) clearTimeout(timer)
            if(text.trim()==='') {
                setOptions_auto([])
                return
            }
            console.info("onSearch...",text)
            timer=setTimeout(() => {
                console.info("request-api...",text)
                setOptions_auto([{label:text,value:text},{label:"鬼将",value:"gui"},{label:"狂豹",value:"kuang"}])
            }, 1000);
            
        }
    }


    return {
        showSearch
    }
}