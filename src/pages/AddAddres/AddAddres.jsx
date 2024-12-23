import React, { useContext, useState } from 'react'
import Style from "./AddAddres.module.css"
import { useFormik } from 'formik';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { TokenContext } from '../../Context/TokenContext/TokenContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function AddAddres() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const phoneRegex = /^01[12540][0-9]{8}$/;
  const { userToken } = useContext(TokenContext);

  const validationSchema = Yup.object({
    phone: Yup.string().matches(phoneRegex, "Phone must to be an egyptian phone").required("Phone is required."),
    details: Yup.string().max(25),
  })

  // const navigate = useNavigate();
  // async function payInCash(values) {
  //   setLoader(true);
  //   const headers = {
  //     token: userToken
  //   }
  //   const shippingAddress = {
  //     shippingAddress: values
  //   }
  //   const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //     shippingAddress
  //     , {
  //       headers
  //     })
  //   console.log(data);
  //   console.log(data.data.user);
  //   localStorage.setItem("userId", data.data.user)
  //   navigate("/");
  // }
  async function addAnAddres(values) {
    try {
      
      setLoader(true);
      const headers = {
        token: userToken
      }
  
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`,
        values
        , {
          headers
        })
      toast.success("Addres has been added successfully.")
      navigate("/addresses");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      setLoader(false)
    }
  }


  const formk = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (values) => {
      addAnAddres(values)

    },
    validationSchema
  })



  return <>
  <Helmet>
    <title>Add Addres</title>
  </Helmet>
    {loader ? <Loader /> : null}
    <form onSubmit={formk.handleSubmit}>
      <div className='w-[70%] mx-auto pt-3'>
        <h1 className='text-green-950 mb-3'>Add adders</h1>

        <div className="relative z-0 w-full mb-7 group">
          <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.name}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address name</label>
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.city}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
        </div>

        <div className="relative z-0 w-full mb-7 group">
          <input type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.phone}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          {formk.errors.phone && formk.touched.phone &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.phone}
              </div>
            </div>}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.details}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
             />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
          {formk.errors.details && formk.touched.details &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.details}
              </div>
            </div>}
        </div>

        <button className='btn-outline w-full text-base' type='submit'>Add Addrees</button>
      </div>
    </form>
  </>
}

