import {useState,useCallback,useEffect} from 'react'
const storageName:string = 'userData'

export const useAuth = ()=>{
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const [admin,setAdmin] = useState(false)
    const [email,setEmail] = useState(null)
    const [ready,setReady] = useState(false)
   
    const login = useCallback((jwtToken,id,access,email)=>{
        setToken(jwtToken)
        setUserId(id)
        setAdmin(access)
        setEmail(email)
        localStorage.setItem(storageName,JSON.stringify({
            userId:id,token:jwtToken,admin:access,user:email
        }))
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        setAdmin(false)
        setEmail(null)
        localStorage.removeItem(storageName)
    },[])
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName)|| '{}')

        if(data && data.token){
            login(data.token,data.userId,data.admin,data.user)
        }
        setReady(true)
    },[login])
    return {login,logout,token,userId,ready,admin,email}

}