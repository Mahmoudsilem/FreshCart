import React from 'react'
import Style from "./ErrorPage.module.css"
import { Helmet } from 'react-helmet'
export default function ErrorPage({errorMasseage}) {
  return <>
        <Helmet>
    <title>Error</title>
  </Helmet>
        <h1>{errorMasseage}</h1>
  </>
}
