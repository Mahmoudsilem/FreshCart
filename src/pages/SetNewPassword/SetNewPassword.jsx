import React, { useContext, useState } from 'react'
import Style from "./SetNewPassword.module.css"

import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { useFormik } from 'formik';
import axios from 'axios';
import ErrorPage from '../errorPage/errorPage';
import { TokenContext } from '../../Context/TokenContext/TokenContext';
import { Helmet } from 'react-helmet';

export default function SetNewPassword() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false)

  const { setUserToken } = useContext(TokenContext);
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

  // const [error, setError] = useState(false)
  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
    newPassword: Yup.string().matches(passwordRegex, "Password must contain at least one uppercase letter and one number.").min(6, "Password must be at least 3 characters").required("Password is required."),
  })
  const navigate = useNavigate();

  function resetPassword(values) {
    setLoader(true);
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((response) => {
        navigate("/");
        console.log(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        setUserToken(response.data.token);
      })
      .catch((error) => {
        setError(true)
      }).finally(() => {
        setLoader(false)
      })
  }

  const formk = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: (values) => {
      resetPassword(values);
    },
    validationSchema
  })
  if (error) {
    return <ErrorPage errorMasseage={"Something went wrong resetting your password."} />
  }
  return <>
  <Helmet>
    <title>Reset Password</title>
  </Helmet>
    {loader ? <Loader /> : null}
    <form onSubmit={formk.handleSubmit}>
      <div className='w-[70%] mx-auto pt-3'>
        <h1 className='text-green-950 mb-4'>Reset Password:</h1>
        <div className="relative z-0 w-full mb-7 group">
          <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.email}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {formk.errors.email && formk.touched.email &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.email}
              </div>
            </div>}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.newPassword}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password </label>
          {formk.errors.newPassword && formk.touched.newPassword &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.newPassword}
              </div>
            </div>}
        </div>
        <button className='btn-outline w-full text-base' type='submit'>Varify</button>
      </div>
    </form>

  </>
}
