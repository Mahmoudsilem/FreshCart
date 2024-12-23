import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserContextProvider({children}) {

    const [userName, setUserName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    
    const [addressesCount, setAddressesCount] = useState(0)

    useEffect(() => {
        setUserName(localStorage.getItem("userName")) 
        setUserMail(localStorage.getItem("userMail")) 
        setUserRole(localStorage.getItem("userRole"))
        setUserId(localStorage.getItem("userId")) 
    }, [])
    
  return <UserContext.Provider value={{
    userName,
    setUserName,
    userMail,
    setUserMail,
    userRole,
    setUserRole,
    setAddressesCount,
    setUserId,
    userId,
    }}>
    {children}
  </UserContext.Provider>
}
