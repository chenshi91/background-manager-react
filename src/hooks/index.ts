import {useTableHooks} from "./tablle"
import {SwitchWithAutoLoading,ModalWithAutoLoading} from "./hoc"

export const useHooks=()=>{
    const {createTableFilter} =useTableHooks()



    return  {
        table:{
            createTableFilter
        },
        hoc:{
            SwitchWithAutoLoading,ModalWithAutoLoading 
        }
    }
}