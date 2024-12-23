import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext/TokenContext'
import axios from 'axios'
import { CartContext } from '../../Context/TokenContext/CartContext'
export default function ProtectedRoute(props) {
  const { userToken } = useContext(TokenContext)
  const { getCartProducts, setCartCount } = useContext(CartContext)

    async function handelCart(){
      try {
        const { data } = await getCartProducts();
        setCartCount(data.numOfCartItems);
      } catch (error) {
        
      }
  }
  // async function verifyToken() {
  //   try {
  //     const { data } = await axios({
  //       url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
  //       headers: {
  //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDcyNTgxODAzZTg4OGUwNTU2NTllZCIsIm5hbWUiOiJNYWhtb3VkIFNlbGltIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzQ4ODE1MzAsImV4cCI6MTc0MjY1NzUzMH0.qQKxpbPKBvatrEYk0aXSSErrgXn75UnZnzsAok70k70"
  //       }
  //     })
      
  //     if (data.message == "verified") {
  //       setIsAuthenticated(true);
  //         return true
  //     }
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //     console.log("catch error");
  //     return false
  //   }

  // }



  if (localStorage.getItem("userToken")) {
    handelCart();
    return props.children
  }else{
    return <Navigate to={"/login"}/>
  }
}
