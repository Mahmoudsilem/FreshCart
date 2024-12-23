import React, { useContext } from 'react'
import Style from "./Profile.module.css"
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Profile() {

  const userInfo = useContext(UserContext)
  return <>
  <Helmet>
    <title>Profile</title>
  </Helmet>
  <div className='bg-green-300 p-5 my-3'>
        <h1>Profile Info</h1>
        <div>{userInfo.userName}</div>
        <div>{userInfo.userMail}</div>
        <div>{userInfo.userRole}</div>
  </div>
  <div className='space-y-2 text-center'>
    <Link to="/changepassword">
      <button className='btn w-full'>Change Password</button>
    </Link>
    <Link to="/changeuserdata">
      <button className='btn w-full'>Change User Data</button>
    </Link>
    <Link to="/addresses">
      <button className='btn w-full'>Manege your addresses</button>
    </Link>
  </div>
        
        
  </>
}
