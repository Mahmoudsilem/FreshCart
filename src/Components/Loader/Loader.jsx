import React from 'react'
import Style from "./Loader.module.css"
import { Circles } from 'react-loader-spinner'
export default function Loader() {
  return <>
        <div className='bg-slate-300 bg-opacity-70 z-50 fixed top-0 left-0 start-0 end-0 bottom-0 flex flex-wrap justify-center content-center'>

        <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
        </div>
  </>
}
