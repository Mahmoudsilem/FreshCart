import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext/TokenContext'
import { CartContext } from '../../Context/TokenContext/CartContext'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {
  const navigate = useNavigate();
  const [navbarState, setNavbarState] = useState("hidden");
  const { userToken, setUserToken } = useContext(TokenContext);
  const { setUserId } = useContext(UserContext);
  const { cartCount, getCartProducts,setCartCount } = useContext(CartContext);

  const [isUserVerifyed, setIsUserVerifyed] = useState(false)
  async function verifyUser(){

    try {
              const { data } = await axios({
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
                headers: {
                  token: localStorage.getItem("userToken")||userToken
                }
              })
              
              if (data.message == "verified") {
                setUserId(data.decoded.id)
                localStorage.setItem("userId",data.decoded.id)
                setIsUserVerifyed(true)
              } else {
                setIsUserVerifyed(false)
              }
            } catch (error) {
              // console.log(error);
              setIsUserVerifyed(false)
            }
  }
  useEffect(() => {
        verifyUser()
        // console.log("navEffext");
        
  }, [userToken])
  
  function toggleNavbar() {
    if (navbarState == "hidden") {
      setNavbarState("")
    } else {
      setNavbarState("hidden")
    }
  }
  function signout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login")
  }
  return <>

    <nav className="fixed top-0 start-0 end-0 z-50 bg-gray-300  border-gray-200 dark:bg-gray-900 text-[1.1rem]">
      <div className='container flex content-center'>
        <div>
          <Link to="" className="w-[200px] h-full flex items-center space-x-3 rtl:space-x-reverse">
            <img className='w-full' src={logo} alt="Frsh Cart logo" />
          </Link>

        </div>
        <div className="container flex flex-wrap items-center justify-end md:justify-between mx-auto px-4 py-6">
          <button onClick={toggleNavbar} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`${navbarState} transition-all duration-300 ease-in-out w-full md:flex justify-between  md:w-full`} id="navbar-default">
            {isUserVerifyed ? <ul className="font-normal text-gray-500 flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <NavLink to="" className="block py-2 px-3 text-gray-500 font-normal rounded md:bg-transparent md:p-0 " aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to="wishlist" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wish List</NavLink>
              </li>
              <li>
                <NavLink to="products" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
              </li>
              <li>
                <NavLink to="categories" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
              </li>
              <li>
                <NavLink to="brands" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
              </li>
              <li>
                <NavLink to="allorders" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Orders</NavLink>
              </li>
            </ul> : <div></div>}

            <div className='md:flex md:gap-x-3'>
              <ul className='font-medium flex flex-row px-4 md:p-0 md:flex-row md:ali md:space-x-3 rtl:space-x-reverse md:mt-0'>
                <li><Link to=''><i className='hover:text-green-700 fab fa-facebook'></i></Link></li>
                <li><Link to=''><i className="hover:text-green-700 fa-brands fa-x-twitter"></i></Link></li>
                <li><Link target='_blank' to="https://www.linkedin.com/in/mahmoud-a-s"><i className='hover:text-green-700 fab fa-linkedin'></i></Link></li>
                <li><Link to=''><i className='hover:text-green-700 fab fa-youtube'></i></Link></li>

              </ul>

              <ul className='font-medium flex flex-row px-4 space-x-3 md:p-0 md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0'>

                {!isUserVerifyed ? <>
                  <li className='text-gray-500'><Link className='p-0' to="login">Login</Link></li>
                  <li className='text-gray-500'><Link className='p-0' to="register">Register</Link></li>
                </> : <>
                  <li onClick={signout} className='text-gray-500 cursor-pointer'> SigOut</li>
                  <li><Link to='/profile'><i className="text-green-700 hover:text-blue-700 text-[1.3rem] fa-solid fa-user"></i></Link></li>
                  <li>
                    <Link to="/cart">
                    <i className='relative fas fa-cart-shopping text-[1.3rem]'>
                      <span className='absolute top-[-8px] size-4 flex justify-center content-center end-[-4px] text-[0.7rem] p-[2px] bg-green-600 text-white border border-transparent rounded-full'>{cartCount}</span>
                    </i>
                    </Link>
                  </li>
                </>
                }
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>

  </>
}
