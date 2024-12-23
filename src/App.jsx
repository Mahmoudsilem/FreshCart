import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import NotFonudPage from './pages/NotFonudPage/NotFonudPage'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import Brands from './pages/Brands/Brands'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import TokenContextProvider from './Context/TokenContext/TokenContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/TokenContext/CartContext'
import { Toaster } from 'react-hot-toast'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import OrdersContextProvider from './Context/ordersContext'
import AllOrders from './pages/AllOrders/AllOrders'

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResetPassword from './pages/ResetPassword/ResetPassword'
import VerifyResetCode from './pages/VerifyResetCode/VerifyResetCode'
import SetNewPassword from './pages/SetNewPassword/SetNewPassword'
import WishListContextProvider from './Context/WishListContext'
import WishListPage from './pages/WishListPage/WishListPage'
import Profile from './pages/Profile/Profile'
import UserContextProvider from './Context/UserContext'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ChangeUserData from './pages/ChangeUserData/ChangeUserData'
import Addresses from './pages/addresses/addresses'
import AddAddres from './pages/AddAddres/AddAddres'


function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([

    {
      path: "", element: <Layout />, children: [
        { path: "", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><WishListPage /></ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "changepassword", element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },
        { path: "changeuserdata", element: <ProtectedRoute><ChangeUserData /></ProtectedRoute> },
        { path: "addresses", element: <ProtectedRoute><Addresses /></ProtectedRoute> },
        { path: "addaddres", element: <ProtectedRoute><AddAddres /></ProtectedRoute> },
        { path: "paymentpage/:cartId/:isCash", element: <ProtectedRoute><PaymentPage /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFonudPage /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "verifyresetcode", element: <VerifyResetCode /> },
        { path: "setnewpassword", element: <SetNewPassword /> }

      ]
    }
  ])
  return <TokenContextProvider>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
      <OrdersContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
            <Toaster 
            position='top-right'
            />
          </WishListContextProvider>
        </CartContextProvider>
      </OrdersContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </TokenContextProvider>

}

export default App
