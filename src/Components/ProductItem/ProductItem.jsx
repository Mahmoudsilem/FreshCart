import React, { useContext, useState } from 'react'
import Style from "./ProductItem.module.css"
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/TokenContext/CartContext'
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { wishListContext } from '../../Context/WishListContext';
export default function ProductItem({ product }) {

  const { addToProductCart, setCartCount } = useContext(CartContext);
  const { addProductToWishList } = useContext(wishListContext)
  const SliderSettings = {
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
    autoplaySpeed: 5000,
    // cssEase: "linear",
  }
  async function addProduct(productId) {
    toast.loading("Adding product to cart", {
      duration: 1500,
    })
    const response = await addToProductCart(productId);
    if (response.data) {
      toast.success(response.message);
      setCartCount(response.numOfCartItems);
    } else {
      toast.error(response.message || `something went wrong please try again later`);
    }
  }
  async function addItemToWishList(productId) {
    toast.loading("adding product to wish list", {
      duration: 1500
    })
    addProductToWishList(productId)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message || "added")
      })
      .catch((error) => {
        toast.error(`something went wrong please try again later`)
      })


  }
  return <>
    <div className='group relative overflow-hidden border border-transparent rounded-lg shadow-md'>
      <div onClick={() => { addItemToWishList(product.id) }} role='button' className={`text-green-50 absolute z-10 top-1 start-3 font-medium py-3 px-1 flex flex-wrap justify-center content-center w-[30px] h-[30px] bg-green-400 border border-transparent rounded-full`}>
        {/*  text-red-700*/}
        <i className='fas fa-heart'></i>
        <span className='sr-only'>Add product to wich list</span>
      </div>
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        {product.priceAfterDiscount && <h6 className='text-center absolute z-10 top-0 end-3 text-white font-medium py-3 px-1 flex flex-wrap justify-center content-center bg-red-600 border border-transparent rounded-b-lg'>Save <br /> {product.price - product.priceAfterDiscount} EGP</h6>}
        <div>
          <Slider {...SliderSettings}>
            <div>
              <img className='w-full' src={product.imageCover} alt={product.title} />
            </div>
            {product?.images?.map((img) => {
              return <div key={img}>
                <img className='w-full' src={img} alt={product.title} />
              </div>
            })}
          </Slider>
        </div>
        <h2 className='text-green-500 font-light'>{product.category.name}</h2>
        <h1 className='text-sm font-semibold'>{product.title.split(" ").splice(0, 10).join(" ")}</h1>
        <p className='font-light text-gray-950'>{product.description.split(" ").splice(0, 2).join(" ")}</p>
        <div className='flex justify-between'>
          {product.priceAfterDiscount ? <>
            <div>
              <span className='pe-2 text-red-600'><del>{product.price} EGP</del></span>
              <span className='font-medium'>{product.priceAfterDiscount} EGP</span>
            </div>
            <span><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
          </> : <><span>{product.price} EGP</span>
            <span><i className='fas fa-star text-yellow-300 font-medium'></i> {product.ratingsAverage}</span>
          </>}
        </div>

      </Link>
      <button onClick={() => addProduct(product.id)} className='btn-outline w-full py-2 mt-2 translate-y-[300%] group-hover:translate-y-0 transition-transform'>Add to cart</button>
    </div>


  </>
}
