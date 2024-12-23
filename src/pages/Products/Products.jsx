import React, { useState } from 'react'
import Style from "./Products.module.css"
import Loader from '../../Components/Loader/Loader';
import ErrorPage from '../errorPage/errorPage';
import ProductItem from '../../Components/ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Products() {
  const [searchProductInputValue, setSearchProductInputValue] = useState('')
  function handeleSarchInputChange(e) {
    setSearchProductInputValue(e.currentTarget.value.toLowerCase())
  }
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
    staleTime: 200000,
    // refetchInterval:false,
    // refetchOnWindowFocus:false,
    // refetchOnMount:false,
    select: (data) => data.data.data.filter((product) => product.title.toLowerCase().includes(searchProductInputValue))
  })
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading all products please try agein`} />
  }
  return <>
  <Helmet>
    <title>Products</title>
  </Helmet>
    <section>
      <form className="max-w-md mx-auto my-7">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-green-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            // value={searchProductInputValue}
            onChange={(e) => {
              handeleSarchInputChange(e)
            }}
            type="search" id="default-search" className="block w-full p-4 ps-10 text-sm outline-none text-green-900 border border-green-300 rounded-lg bg-green-50 focus:ring-green-500 focus:border-green-500 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Products..." />
        </div>
      </form>
      <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 my-4'>
        {data?.map((product) => <ProductItem key={product.id} product={product} />)}
      </div>
    </section>
  </>
}
