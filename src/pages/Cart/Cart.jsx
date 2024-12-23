import React, { useContext, useEffect, useState } from 'react'
import Style from "./Cart.module.css"
import { CartContext } from '../../Context/TokenContext/CartContext'
import { useQuery } from '@tanstack/react-query'
import ErrorPage from '../errorPage/errorPage'
import Loader from '../../Components/Loader/Loader'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
  const { getCartProducts, removeCartItem, updateCartProductQuantity, clearCart, setCartCount, cartCount } = useContext(CartContext);
  const [cursor, setCursor] = useState("")

  async function handelCartCount() {
    try {
      const { data } = await getCartProducts();
      setCartCount(data.data.products.length)
    } catch (error) {
      console.log("erroe from cart handelCartCount ");
    }
  }
  useEffect(() => {
    handelCartCount()

  }, [])

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryFn: getCartProducts,
    queryKey: ["getCartProducts"],
    refetchIntervalInBackground: 3000,
    refetchInterval: 1000,
    staleTime: 5000,
    select: (data) => data.data,
  })
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading cart please try agein`} />
  }

  async function remove(itemId) {
    setCursor("cursor-wait");
    const { data } = await removeCartItem(itemId);
    setCursor("");
    setCartCount(data.numOfCartItems)
  }
  async function updateProductQuantity(productId, inputValue, productCount, change) {
    setCursor("cursor-wait");
    const { data } = await updateCartProductQuantity(productId, inputValue, productCount, change);
    setCursor("");
    setCartCount(data.numOfCartItems)
  }
  async function clearCartItems() {
    setCursor("cursor-wait");
    const { data } = await clearCart();
    setCursor("");
    setCartCount(data.numOfCartItems)
  }

  return <>

    <Helmet>
      <title>Cart</title>
    </Helmet>
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${cursor}`}>
      <h1>Cart</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.numOfCartItems != 0 ? (
            data?.data?.products.map((product) =>
              <tr key={product?.product?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product?.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateProductQuantity(product?.product?.id, null, product?.count, -1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Decrease product quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div className={`${cursor}`}>
                      <input
                        onChange={(e) => { updateProductQuantity(product?.product?.id, e.target.value) }}
                        type="number" min="0" className={` bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={product.count} required />
                    </div>
                    <button onClick={() => updateProductQuantity(product?.product?.id, null, product?.count, 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Increase product quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => remove(product.product?._id)} className={`font-medium text-red-600 dark:text-red-500 hover:underline ${cursor || "cursor-pointer"}`}>Remove</span>
                </td>
              </tr>
            )) : <tr >
            <td colSpan={5}>
              <h2 className='text-center py-4'>Cart is empty. <Link className='hover:underline' to="/products">Add products to cart.</Link></h2>
            </td>
          </tr>
          }
        </tbody>
        <tfoot>

        </tfoot>
      </table>
      <div className='w-[75%] mx-auto'>
        {data?.numOfCartItems == 0 || <>
          <Link className='w-full mx-auto' to={`/paymentpage/${data?.cartId}/true`}><button className='btn w-full'>Pay Cash</button></Link>
          <Link className='w-full mx-auto' to={`/paymentpage/${data?.cartId}/false`}><button className='btn w-full'>Paymet with card</button></Link>
          <button onClick={clearCartItems} className='btn-outline-danger w-full'>Clear Cart</button>
        </>
        }
      </div>
    </div>




  </>
}
