import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext(0);

export default function TokenContextProvider(props) {
    const [userToken, setUserToken] = useState(null)
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setUserToken(localStorage.getItem("userToken"))
        }
    }, [])

    return <TokenContext.Provider value={{ userToken, setUserToken }}>
        {props.children}
    </TokenContext.Provider>

}