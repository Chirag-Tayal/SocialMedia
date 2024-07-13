/* eslint-disable react/prop-types */
import {createContext, useContext, useState} from "react";

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    return (
        <userContext.Provider value={{user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

const UseUserContext = ()=>{
    return useContext(userContext)
}
export {UseUserContext, UserProvider}