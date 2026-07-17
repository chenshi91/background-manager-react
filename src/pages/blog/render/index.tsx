// @ts-ignore
import Highlighter from 'react-highlight-words';
import type {TSearchParams,TKey} from '../type'

const useRender=(searchParams:TSearchParams,key:TKey)=>{
    return {
        render:(text:string) => {
            if(searchParams[key]){
            const a= <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchParams[key]]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
            searchParams[key]=''
            return a
            }
            return <span>{ text }</span>
      }
    }
}

export {useRender}

