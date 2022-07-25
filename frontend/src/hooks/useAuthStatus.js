import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

export function useAuthStatus() {
    const [isLogin, setisLogin] = useState();
    const [chackingStatus, setChackingStatus] = useState(true);
    const { user } = useSelector((state) => state.auth);
   
    useEffect(() => { 
        if(user){ 
            setisLogin(true)
        } else { 
            setisLogin(false)
        }
        setChackingStatus(false)
    }, [user])

    return {isLogin , chackingStatus}
}