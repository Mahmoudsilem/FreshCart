import React from 'react'
import Style from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
  return <>
    {/* <div className='container mx-auto'> */}

    <Navbar/>
    {/*  min-h-[70vh] mt-[4.6rem]*/}
    <main className='py-10'>
      <div className='container mt-[4.6rem]'>

      <Outlet></Outlet>
      </div>
    </main>
    <Footer/>

    {/* </div> */}
  </>
}
