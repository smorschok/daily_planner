import {createContext} from 'react'

type AuthProps = {
    token:string|null,
    userId:string|null,
    email:string|null,
    login:(token:string,id:string,access:boolean,email:string)=>void,
    logout:()=>void,
    isAuthenticated:boolean,
    admin:boolean,
    
    

}

export const AuthContext:React.Context<AuthProps> = createContext<AuthProps>({
    token:null,
    userId:null,
    login:(token:string,id:string,access:boolean)=>{},
    logout:()=>{},
    isAuthenticated:false,
    admin:false,
    email:null,
})