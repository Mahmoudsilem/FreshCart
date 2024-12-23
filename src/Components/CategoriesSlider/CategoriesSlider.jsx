import React from 'react'
import Style from "./CategoriesSlider.module.css"
import ErrorPage from '../../pages/errorPage/errorPage';
import Loader from '../Loader/Loader';
import useAllCategories from '../../Hooks/useAllCategories';
import Slider from 'react-slick';
export default function CategoriesSlider({CategoriesSliderSettings}) {

  const { data, isLoading, error, isError } = useAllCategories();
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading Categories please try agein`} />
  }
  return <>
    {/* data._id */}
    <Slider {...CategoriesSliderSettings}>
      {data?.map((category) => 
        <div key={category._id}>
          <img className='h-[300px]' src={category.image} alt={category.name} />
        </div>
      )}
    </Slider>




  </>
}
