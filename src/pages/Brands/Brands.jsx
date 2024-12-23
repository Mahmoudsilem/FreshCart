import React, { useState } from 'react'
import Style from "./Brands.module.css"
import Loader from '../../Components/Loader/Loader'
import ErrorPage from '../errorPage/errorPage'
import useAllBrands from '../../Hooks/useAllBrands'
import axios from 'axios'
import { Helmet } from 'react-helmet'
export default function Brands() {
  const { data, isLoading, error, isError } = useAllBrands();
  const [loading, setLoading] = useState(false)
  const [specificBrand, setSpecificBrand] = useState({})
  const [modal, setModal] = useState("hidden")
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading brands please try agein`} />
  }

  async function getSpecificBrand(id) {
    setLoading(true);
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setSpecificBrand(data.data);
    setLoading(false)
    setModal("flex");
  }

  return <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
    {loading && <Loader />}
    {/* data._id */}
    <h1 className='text-center font-bold text-4xl text-green-800'>Our Brands</h1>
    <div className='grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 place-content-center'>
      {data?.map((brand) =>
        <div onClick={() => {
          getSpecificBrand(brand._id)

        }} key={brand._id} className='cursor-pointer'>
          <img className='w-auto' src={brand.image} alt={brand.name} />

        </div>
      )}
      <div onClick={(e) => {
        if (e.target == e.currentTarget) {
          setModal("hidden")
        }
      }} className={`${modal} flex-wrap justify-center content-center model-cover fixed top-0 bottom-0 start-0 end-0  bg-gray-700 bg-opacity-70`} >
        <div className='w-[50%]'>
          <img className='w-full' src={specificBrand.image} alt='' />
        </div>
      </div>
    </div>
  </>
}
