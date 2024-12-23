import axios from "axios"
import { createContext, useContext } from "react"
import { TokenContext } from "./TokenContext/TokenContext"

export const wishListContext = createContext("")
export default function WishListContextProvider({children}) {
  const {userToken} = useContext(TokenContext)
  const headers ={
    token:userToken
  }
  async function addProductToWishList(productId){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId
    },{
      headers
    }).then((response)=>response)
    .catch((error)=>error)
  }
  async function getWishList(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers
    })
    // .then((response)=>response)
    // .catch((error)=>error)
  }
  function removeWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
          headers
        })
  }
  return <wishListContext.Provider value={{addProductToWishList, getWishList, removeWishListItem}}>
      {children}
  </wishListContext.Provider>
}
