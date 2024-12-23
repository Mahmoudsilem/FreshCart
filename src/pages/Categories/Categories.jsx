import React from 'react'
import Style from "./Categories.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'
import ErrorPage from '../errorPage/errorPage'
import useAllCategories from '../../Hooks/useAllCategories'

import Slider from 'react-slick'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'

export default function Categories() {
  const CategoriesSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: "none",
    rows: 2,
    // slidesPerRow: 4
    // autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
  }

  return <>
    <Helmet>
    <title>Categories</title>
  </Helmet>
    <h1 className='text-center font-bold text-4xl text-green-800 mb-4'>Our Categories</h1>

    <CategoriesSlider CategoriesSliderSettings={CategoriesSliderSettings} />




  </>
}
