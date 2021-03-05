import {createContext} from 'react'

export const ToastContext = createContext({
   
    error:(text:string|null)=>{},
    success:(text:string|null)=>{},
    
})