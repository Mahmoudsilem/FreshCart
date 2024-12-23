import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useAllBrands() {
    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      }
  return useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
    staleTime: 80000,
    select: (data) => data.data.data
  })
  
}
