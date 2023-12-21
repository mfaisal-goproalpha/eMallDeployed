import React from 'react'
import Navbars from './Components/Navbars'
import Footer from './Components/Footer'
import { Routes, Route, Navigate} from 'react-router-dom'
import Categories from './Pages/Categories'
import Cart_Page from './Pages/Cart_Page'
import Single_Product from './Pages/Single_Product'

import UserHome from './Pages/UserHome'
function index() {
  return (
    <div>
      <Navbars />
        <Routes>
        <Route path='/' element={<UserHome />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/single-product/:_id' element={<Single_Product />} />
        <Route path='/cart' element={<Cart_Page />} />
        <Route path="*" element={<Navigate to='/' replace={true} />} />

        </Routes>
      <Footer />

    </div>
  )
}

export default index
