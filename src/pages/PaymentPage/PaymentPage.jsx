import React, { useContext, useState } from 'react'
import Style from "./PaymentPage.module.css"
import { useFormik } from 'formik';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { TokenContext } from '../../Context/TokenContext/TokenContext';
import { Helmet } from 'react-helmet';
export default function PaymentPage() {
  const [loader, setLoader] = useState(false);
  const { cartId, isCash } = useParams();
  const navigate = useNavigate()
  const phoneRegex = /^01[12540][0-9]{8}$/;
  const { userToken } = useContext(TokenContext);

  const validationSchema = Yup.object({
    phone: Yup.string().matches(phoneRegex, "Phone must to be an egyptian phone").required("Phone is required."),
  })

  // const navigate = useNavigate();
  async function payInCash(values) {
    setLoader(true);
    const headers = {
      token: userToken
    }
    const shippingAddress = {
      shippingAddress: values
    }
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      shippingAddress
      , {
        headers
      })
    console.log(data);
    console.log(data.data.user);
    localStorage.setItem("userId", data.data.user)
    navigate("/");
  }
  async function payWithCard(values) {
    setLoader(true);
    const headers = {
      token: localStorage.getItem("userToken"),
    }
    const shippingAddress = {
      shippingAddress: values
    }

    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      shippingAddress
      , {
        headers
      })
    console.log(data);

    //  const respons = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
    //     method:"POST",
    //     headers,
    //     body:shippingAddress
    //   })
    //   const data =await respons.json();
    // console.log(data);
    window.open(data.session.url, "_self")
  }
  async function pay(values) {
    if (isCash == "true") {
      await payInCash(values);
    } else {
      await payWithCard(values);
    }
  }

  const formk = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (values) => {
      pay(values)

    },
    validationSchema
  })



  return <>

<Helmet>
    <title>Payment Page</title>
  </Helmet>
    {loader ? <Loader /> : null}
    <form onSubmit={formk.handleSubmit}>
      <div className='w-[70%] mx-auto pt-3'>
        <h1 className='text-green-950 mb-3'>{isCash == "true" ? `Pay in cash` : `Pay with card`}</h1>

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
            required />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
        </div>

        <button className='btn-outline w-full text-base' type='submit'>{isCash == "true" ? `Pay in cash` : `Pay with card`}</button>
      </div>
    </form>
  </>
}

