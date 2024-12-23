import React, { useContext, useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import Loader from '../../Components/Loader/Loader'
import { TokenContext } from '../../Context/TokenContext/TokenContext'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Login() {
  const { setUserToken } = useContext(TokenContext);
  const userInfo = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
    password: Yup.string().matches(passwordRegex, "Password must contain at least one uppercase letter and one number.").min(6, "Password must be at least 3 characters").required("Password is required."),
  })

  const navigate = useNavigate();
  async function registerNewUser(values) {
    setLoader(true);
    try {
      const { data } = await axios({
        method: "post",
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data: values
      })
  
      if (data.message == "success") {
        setLoader(false);
        navigate("/");
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        //set user data
        userInfo.setUserName(data.user.name);
        userInfo.setUserMail(data.user.email);
        userInfo.setUserRole(data.user.role);
        localStorage.setItem("userName",data.user.name);
        localStorage.setItem("userMail",data.user.email);
        localStorage.setItem("userRole",data.user.role);
      } 
  
    } catch (error) {
      toast.error(`${error.response.data.message}`)
      setLoader(false)
    }
  }
  const formk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      registerNewUser(values)

    },
    validationSchema
  })



  return <>
      <Helmet>
    <title>Login</title>
  </Helmet>
    {loader ? <Loader /> : null}
    <form onSubmit={formk.handleSubmit}>
      <div className='w-[70%] mx-auto pt-3'>
        <h1 className='text-green-950 mb-3'>Login Now:</h1>
        <div className="relative z-0 w-full mb-7 group">
          <input type="email" name="email" id="email2" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formk.values.email}
            onBlur={formk.handleBlur}
            onChange={formk.handleChange}
            required />
          <label htmlFor="email2" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
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
        <p className=''>Didn't register yet? <span className='font-medium'><Link to="/register">Register Now</Link></span></p>
        <p className='font-medium pb-2'><Link to="/resetpassword">Forget your password ?</Link> </p>
        <button className='btn-outline w-full text-base' type='submit'>Login</button>
      </div>
    </form>
  </>
}
