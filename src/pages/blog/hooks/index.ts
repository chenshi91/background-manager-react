import {useFilterDrop} from '../filterDropdown'
import {useOnFilter} from '../onFilter'
import type {TSearchParams} from '../type'
import {    useRender   } from '../render'
import {useHooks_autocomplete} from './AutoComplete'
import {useState} from 'react'
import type { AutoCompleteProps } from 'antd'

export const useHooks=()=>{
    const {filterDropDown:filterDropDown_title}=useFilterDrop('标题')
    const {filterDropDown:filterDropDown_content}=useFilterDrop('内容')
    const {filterDropDown:filterDropDown_about}=useFilterDrop('关于')

    const search:TSearchParams={
        title:'',
        content:'',
        about:''
    }
    const {onFilter:filter_title}=useOnFilter(search,'title')
    const {onFilter:filter_content}=useOnFilter(search,'content')
    const {onFilter:filter_about}=useOnFilter(search,'about')

    const {render:render_title}=useRender(search,'title')
    const {render:render_content}=useRender(search,'content')
    const {render:render_about}=useRender(search,'about')

    const [options_auto,setOptions_auto]=useState<{
        label:string,
        value:string
    }[]>([])
    const {showSearch}=useHooks_autocomplete(setOptions_auto)

    return {
        filterDropDown_title,filterDropDown_content,filterDropDown_about,
        filter_title,filter_content,filter_about,
        render_title,render_content,render_about,
        options_auto,showSearch
    }
}