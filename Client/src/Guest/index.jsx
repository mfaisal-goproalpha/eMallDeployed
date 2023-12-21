import React from 'react'
import Navbars from './Components/Navbars'
import Footer from './Components/Footer'
import Customer_login from './Components/Customer_login'
import Customer_registration from './Components/Customer_registration'

import Shop_login from './Components/Shop_login'
import Shop_registration from './Components/Shop_registration'

import Customer_dashboard from './Components/Customer_dashboard'
import {Routes, Route, } from 'react-router-dom'
import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home'
import Single_Product from "./Pages/Single_Product"
import Cart from './Pages/cart'
import Checkout from './Pages/Checkout'
import Search_Page from './Pages/Search_Page'
import Allorders from './Pages/Allorders'
function index() {
  return (
    <>
        <Navbars />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allorders' element={<Allorders />} />
          <Route path='/single-product/:_id' element={<Single_Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout/:orderId' element={<Checkout />} />
          <Route path='/search' element={<Search_Page />} />
          <Route path='/customer_login' element={<Customer_login />} />
          <Route path='/customer_registration' element={<Customer_registration />} />
          <Route path='/customer_dashboard' element={<Customer_dashboard />} />
          <Route path='/shop_registration' element={<Shop_registration />} />
          <Route path='/shop_login' element={<Shop_login />} />
        </Routes>
      <Footer />
    </>
  )
}

export default index
