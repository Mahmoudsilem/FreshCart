import { createContext } from "react"

export const OrdersContext = createContext("");
const userId = localStorage.getItem("userId");

export default function OrdersContextProvider({children}) {
  return <OrdersContext.Provider value={{ userId }}>
  {children}
</OrdersContext.Provider>
}
