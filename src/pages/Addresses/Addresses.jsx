import React, { useContext, useEffect, useState } from 'react'
import Style from "./Addresses.module.css"
import axios from 'axios'
import { TokenContext } from '../../Context/TokenContext/TokenContext'
import Loader from '../../Components/Loader/Loader';
import ErrorPage from '../errorPage/errorPage';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function Addresses() {
  const { userToken } = useContext(TokenContext);
  const { setAddressesCount } = useContext(UserContext)
  const headers = {
    token: userToken
  }
  function getAddresses() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      headers
    })
  }
  async function removeAddress(AddId) {
    try {
      const { data } = await axios({
        url: `https://ecommerce.routemisr.com/api/v1/addresses/${AddId}`,
        method: "delete",
        headers
      })
      console.log(data.data.length);
      console.log(data);
      toast.success("Address deleted")
      setAddressesCount(data.data.length)
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    }
  }
  const { data, isLoading, isFetching, error, isError, isSuccess } = useQuery({
    queryFn: getAddresses,
    queryKey: ["getAddresses"],
    staleTime: 2000,
    refetchInterval: 1000,
    // refetchOnWindowFocus:false,
    // refetchOnMount:false,

    select: (data) => data.data
  })
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorPage errorMasseage={`Error loading all products please try agein`} />
  }


  return <>
    <Helmet>
      <title>Addres</title>
    </Helmet>
    <section>
      <h1>Addresses</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Addres name
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((Addres) =>

              <tr key={Addres._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {Addres.name}
                </th>
                <td className="px-6 py-4">
                  {Addres.city}
                </td>
                <td className="px-6 py-4">
                  {Addres.details.split(" ").splice(0, 4).join(" ")}
                </td>
                <td className="px-6 py-4">
                  {Addres.phone}
                </td>
                <td className="px-6 py-4">

                  <span role='button' onClick={() => removeAddress(Addres._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      <Link to="/addaddres">
        <button className='btn w-full mt-3'>Add Addres</button>
      </Link >
    </section>

  </>




}
