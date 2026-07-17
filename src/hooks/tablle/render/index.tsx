// @ts-ignore
import Highlighter from 'react-highlight-words';
import type { TTableSearch } from '../../../type'


const createRender=(tableSearch:TTableSearch)=>{
    return (text:string) => {
        if(tableSearch.key){
            const a= <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[tableSearch.key]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
            //tableSearch.key=''
            return a
        }
        return <span>{ text }</span>
    }
    
}

export {createRender}

