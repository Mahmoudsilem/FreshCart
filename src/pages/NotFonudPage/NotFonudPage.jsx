import React from 'react'
import Style from "./NotFonudPage.module.css"
import { Helmet } from 'react-helmet'
export default function NotFonudPage() {
  return <>
      <Helmet>
    <title>Not Fonud Page</title>
  </Helmet>
        <h1 className='text-center text-red-700'>Not Fonud Page works</h1>
  </>
}
