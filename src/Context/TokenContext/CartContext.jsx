import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { TokenContext } from "./TokenContext";
import { data } from "autoprefixer";

export const CartContext = createContext(0)
//children
export default function CartContextProvider({ children }) {

    const { userToken } = useContext(TokenContext);
    const [cartCount, setCartCount] = useState(0)
    const headers = {
        token: userToken
    }
    async function addToProductCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then((response) => response.data)
            .catch((error) => error)
    }
    function getCartProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers
        })
    }



    async function removeCartItem(itemId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }
    function updateCartProductQuantity(productId, inputValue, productCount, change) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: inputValue || `${productCount + change}`
        }, {
            headers
        })
    }

    async function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }
    return (
        <CartContext.Provider value={{
            addToProductCart,
            getCartProducts,
            removeCartItem,
            updateCartProductQuantity,
            clearCart,
            setCartCount,
            cartCount,
        }}>
            {children}
        </CartContext.Provider>
    )
}
