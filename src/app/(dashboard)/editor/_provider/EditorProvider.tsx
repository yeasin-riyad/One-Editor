import { createContext, useContext, useState } from "react"


interface TEditorProvider{
    isLoading:boolean
    setIsLoading:(value:boolean)=>void;
    openBrowser:boolean;
    setOpenBrowser:(value:boolean)=>void;
}

const initialValue={
    isLoading:false,
    setIsLoading:()=>{},
    openBrowser:false,
    setOpenBrowser:()=>{}

}

const createEditorProviderContext= createContext<TEditorProvider>(initialValue);

export const useEditorContext= ()=>useContext(createEditorProviderContext);

export function EditorProviderComponent({children}:{children:React.ReactNode}){
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [openBrowser,setOpenBrowser]=useState<boolean>(false);

    const handleLoading=(value?:boolean)=>{
        setIsLoading(value||false)

    }

    const handleOpenBrowser=(value?:boolean)=>{
        setOpenBrowser(value || false)

    }
    return (
        <createEditorProviderContext.Provider value={
            {
                isLoading,
                setIsLoading:handleLoading,
                openBrowser,
                setOpenBrowser:handleOpenBrowser
            }
        }>
            {children}
        </createEditorProviderContext.Provider>
    )

}