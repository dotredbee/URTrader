import React, { createContext, useContext, useEffect, useRef, useState } from "react";


export const AuthContext = createContext()

export const useAuth = () => { 
    return useContext(AuthContext)
}

export const AuthProvider = () => {
    const [ auth, setAuth ] = useState({
        status : false,
        key : "",
        expire : "",
    })

    const [ loading, setLoading ] = useState(true)
    
    const is = async () => {
        setLoading(true)
        const ret = await window.ipcRenderer.invoke('sign:key', null)
        const { ok } = ret
        
        if(!ok) {
            setAuth({...auth, status : ok})
        }else{
            const { access, expire } = ret
            
            setAuth({
                ...auth,
                status : ok,
                key : access,
                expire,
            })
        }
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }
    const connect = async (status, access, expire) => {
        setLoading(true)
        setAuth({
            ...auth,
            status : status,
            key : access,
            expire : expire
        })
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    
    return { 
        status : auth.status,
        key : auth.key,
        expire : auth.expire,
        loading,
        is,
        connect 
    }
}


export const AuthMainPovider = ({ children }) => {
    const auth = AuthProvider()

    return (
        <AuthContext.Provider value = { auth }>
            { children } 
        </AuthContext.Provider>
    )
}