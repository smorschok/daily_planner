import {useCallback} from 'react'
import {  toast } from 'react-toastify';

export const useToast= ()=>{

    const error = useCallback((text)=>{
        toast.error(text);

    },[])
    const success = useCallback((text)=>{
        toast.success(text);

    },[])

    return {error,success}
}