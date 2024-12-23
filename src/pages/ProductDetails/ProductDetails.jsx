import React, { useContext, useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../errorPage/errorPage';
import Loader from '../../Components/Loader/Loader';
import { CartContext } from '../../Context/TokenContext/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import ProductItem from '../../Components/ProductItem/ProductItem';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
  const { id, category } = useParams();
  const { addToProductCart } = useContext(CartContext);
  let spasficProduct
  let relatedProducts;
  const spasficProductSliderSettings = {
    // dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: "none",
    rows: 1,
    // slidesPerRow: 4
    autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 5000,
    // cssEase: "linear",
  }
  const relatedProductsSliderSettings = {
    // dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: "none",
    rows: 1,
    // slidesPerRow: 4
    autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 5000,
    // cssEase: "linear",
  }
  async function addProduct(productId) {
    const response = await addToProductCart(productId);
    if (response.data) {
      toast.success(response.message)
    } else {
      toast.error(response.message || `Something went wrong please try again later`)
    }
  }
  function getProductsById(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  const { data, isLoading, isFetching, error, isError,isSuccess } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => getProductsById(id),
    staleTime: 200000,
    select: (data) => data.data.data
  })
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading all products please try agein`} />
  }
  if (isSuccess) {
    spasficProduct = data.filter((product) => product._id === id)[0];
    relatedProducts = data.filter((product) => product.category.name === category);
  }


  return <>
  <Helmet>
    <title>Product details</title>
  </Helmet>
    <section>
      <div className='flex flex-wrap py- content-center py-6'>
        <div className='md:w-1/3'>
          <Slider {...spasficProductSliderSettings}>
            {spasficProduct?.images?.map((img) => {
              return <div key={img}>
                <img className='w-full' src={img} alt={spasficProduct.title} />
              </div>
            })}
          </Slider>
          {/* <img className='w-full' src={spasficProduct.imageCover} alt={spasficProduct.title} /> */}
        </div>
        <div className='md:w-8/12 ps-4 py-10'>
          <h1 className='font-semibold'>{spasficProduct.title}</h1>
          <h2 className='font-medium text-gray-950'>{spasficProduct.description}</h2>
          <h3>{spasficProduct.category?.name}</h3>
          <div className='flex justify-between my-2'>
            {spasficProduct.priceAfterDiscount ? <>
              <div>
                <span className='pe-2 text-red-600'><del>{spasficProduct.price} EGP</del></span>
                <span className='font-medium'>{spasficProduct.priceAfterDiscount} EGP</span>
              </div>
              <span><i className='fas fa-star text-yellow-300'></i> {spasficProduct.ratingsAverage}</span>
            </> : <><span>{spasficProduct.price} EGP</span>
              <span><i className='fas fa-star text-yellow-300 font-medium'></i> {spasficProduct.ratingsAverage}</span>
            </>}

          </div>
          <button onClick={() => addProduct(id)} className='w-full btn-outline'>Add to cart</button>
        </div>
      </div>
    </section>

    <section className='my-10'>
      <div>
        <h1 className='text-green-700 font-bold mb-2'>Related Products:</h1>
        <h2 className='text-green-700 font-bold mb-2'>{category}</h2>
        <Slider {...relatedProductsSliderSettings}>

        {relatedProducts.map((product) =>
          <>
            <ProductItem key={product.id} product={product} />
          </>
        )}
        </Slider>
      </div>
    </section>
  </>
}
