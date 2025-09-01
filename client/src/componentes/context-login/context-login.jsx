import React, { createContext, useState } from 'react'

export const LoginContext = createContext(null)

export const LoginContextProvider = ({ children }) => {


    const [authorize, setAuthorize] = useState(false)
    const[authorizeAdmin, setAuthorizeAdmin] = useState(false)
    const [user, setUser] = useState([])

    const handleAuth = () =>{
        setAuthorize(true)
    }

    const contextValue = {authorize,handleAuth, setAuthorize, authorizeAdmin, setAuthorizeAdmin, user, setUser}
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}
