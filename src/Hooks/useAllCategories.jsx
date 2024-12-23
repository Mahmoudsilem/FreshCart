import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useAllCategories() {

    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      }
    
      return useQuery({
        queryKey: ["allCategories"],
        queryFn: getAllBrands,
        staleTime: 80000,
        select: (data) => data.data.data
      })

  
}
