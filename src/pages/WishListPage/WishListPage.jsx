import React, { useContext, useEffect, useState } from 'react'
import Style from "./WishListPage.module.css"
import { wishListContext } from '../../Context/WishListContext'
import WishListItem from '../../Components/WishListItem/WishListItem';
import Loader from '../../Components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../errorPage/errorPage';
import { Helmet } from 'react-helmet';
export default function WishListPage() {
  const {getWishList, removeWishListItem} = useContext(wishListContext)
  // const [data, setData] = useState([])
  // const [loader, setLoader] = useState(false)

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryFn: getWishList,
    queryKey: ["getWishList"],
    refetchIntervalInBackground:3000,
    refetchInterval:1000,
    staleTime: 5000,
    select: (data) => data.data,
  })
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading cart please try agein`} />
  }
  
  // function getList(){
  //   getWishList()
  //   .then((response)=>{
  //     setLoader(true)
  //     // setData(response.data.data)
  //     console.log(response);
      
  //     setLoader(false)

  //   }).catch((error)=>{
  //       console.log(error);
  //     setLoader(false)
        
  //   }).finally(()=>{
  //     setLoader(false)
  //   })
  // }  

  // useEffect(() => {
  //   getList()
  // }, [])
  


  return <>
    <Helmet>
    <title>Wishlist</title>
  </Helmet>
  <section>
        <h1>WishListPage</h1>
        {data?.data.map((item)=><WishListItem key={item._id} data={item} count={data.count}/>)}
  </section>



  </>
}
