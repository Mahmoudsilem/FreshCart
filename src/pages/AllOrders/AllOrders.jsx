import React, { useContext } from 'react'
import Style from "./AllOrders.module.css"
import { OrdersContext } from '../../Context/ordersContext'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import ErrorPage from '../errorPage/errorPage';
import { Helmet } from 'react-helmet';
export default function AllOrders() {
  const { userId } = useContext(OrdersContext);

  function getUserOrders(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["userOrders"],
    queryFn: () => getUserOrders(userId),
    staleTime: 5000,
    select: (data) => data.data
  })
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorPage errorMasseage={`Error loading orders please try agein`} />
  }
  return <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
    <h1>AllOrders</h1>
    {data?.map((order) => <>
      <div className='p-5 bg-green-500 m-3'>

        <h2>Order ID: {order.id}</h2>
        <h3>Price: {order.totalOrderPrice}</h3>
        <h3>PaymentMethod: {order.paymentMethodType}</h3>
        <h3>Payment: {order.isPaid ? "Full amount paid" : "Not paid"}</h3>
      </div>
    </>)}
  </>
}
