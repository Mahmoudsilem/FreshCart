import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import ProductItem from '../../Components/ProductItem/ProductItem'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import ErrorPage from '../errorPage/errorPage';
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
export default function Home() {
  const [searchProductInputValue, setSearchProductInputValue] = useState('')
  const CategoriesSliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: "none",
    rows: 1,
    // slidesPerRow: 4
    // autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
  }
  function handeleSarchInputChange(e) {
    setSearchProductInputValue(e.currentTarget.value.toLowerCase())
  }
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
    staleTime: 900000,
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
    <title>FrshCart</title>
  </Helmet>
    <section className='mb-6 shadow-lg'>
      <h2 className='text-grey-900 font-medium text-3xl my-3'>Shop popular categories:</h2>
      <CategoriesSlider CategoriesSliderSettings={CategoriesSliderSettings} />
    </section>

    <section>
      <form className="max-w-md mx-auto">
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
      <div className='my-5 grid items-start lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5'>
        {data?.map((product) => <ProductItem key={product.id} product={product} />)}
      </div>
    </section>

  </>
}
