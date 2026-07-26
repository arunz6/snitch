import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../feature/sharedcomponent/pages/Navbar'
const Applayout = () => {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default Applayout
