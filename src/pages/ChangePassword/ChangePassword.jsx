import React, { useContext, useState } from 'react'
import Style from "./ChangePassword.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import Loader from '../../Components/Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext/TokenContext'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function ChangePassword() {
  const navigate = useNavigate();
  const { setUserToken,userToken } = useContext(TokenContext);
  const { setUserName } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;


  const validationSchema = Yup.object({
    currentPassword: Yup.string().matches(passwordRegex, "Password must contain at least one uppercase letter and one number.").min(6, "Password must be at least 3 characters").required("Password is required."),
    password: Yup.string().matches(passwordRegex, "Password must contain at least one uppercase letter and one number.").min(6, "Password must be at least 3 characters").required("Password is required."),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Re-password must match the password.").required("Re-password is required."),
  })


  async function changePassword(values) {
    setLoader(true);
try {
  const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
     values,
     {
    headers:{
      token:userToken
    }
  })
  if (data.message == "success") {
    setLoader(false);
    navigate("/");
    localStorage.setItem("userToken", data.token);
    setUserToken(data.token);
    setUserName(data.user.name);
    localStorage.setItem("userName",data.user.name);
  }
} catch (error) {
  toast.error(`${error.response.data.message} try other email` || "Account Already Exists try other email")
  setLoader(false)
}
  }

  const formk = useFormik({
    initialValues: {
      currentPassword:"",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      changePassword(values)

    },
    validationSchema
  })


  return <>

  <Helmet>
    <title>Change Password</title>
  </Helmet>
    {loader ? <Loader /> : null}

    <form onSubmit={formk.handleSubmit}>
      <div className='w-[70%] mx-auto pt-3'>
        <h1 className='text-green-950 mb-3'>Change Password</h1>


        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="currentPassword" id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.currentPassword}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">currentPassword</label>
          {formk.errors.currentPassword && formk.touched.currentPassword &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.currentPassword}
              </div>
            </div>}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.password}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {formk.errors.password && formk.touched.password &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.password}
              </div>
            </div>}
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.rePassword}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repassword</label>
          {formk.errors.rePassword && formk.touched.rePassword &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Validation info</span>
              <div>
                {formk.errors.rePassword}
              </div>
            </div>}
        </div>



        <button className='btn-outline w-full text-base' type='submit'>Change Password</button>
      </div>
    </form>
  </>
}
