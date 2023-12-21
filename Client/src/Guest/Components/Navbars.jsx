import React, { useContext, useEffect, useState, uses } from 'react'
import logo from "../Images/logo.png"
import { LiaSearchSolid } from "react-icons/lia"
import { Link } from 'react-router-dom'
import Cart from '../../Guest/Components/Cart'
import LogIn from '../Pages/LogIn'
import { GlobalContext } from '../Context/UserContext'
import axios from 'axios'
import Cookies from 'js-cookie';
import Customer_dashboard from './Customer_dashboard'


function Navbars() {
  const { state, dispatch } = useContext(GlobalContext)
  const [user, setUser] = useState()
  const userData = Cookies.get('user');

  return (
    <>
      <header>
        <div className="container navbarcontainer p-0">
          <div className="registration-btns d-flex justify-content-between">
            {/* <button>Shop - Login/ Register</button> */}
            <Link to={"/shop_login"}>
                <button className='topbarbutton'>Shop - Login/ Register</button>
            </Link>
            {/* <LogIn /> */}
            {
                  userData ? (
                  <Link to={"/customer_dashboard"} className='text-decoration-none'>
                    <span className="btn mx-2 mt-3 add-to-cart " >
                      Customer Dashboard
                    </span>
                  </Link>
                  ) : (
                    <p style={{marginTop:'5px'}}>Welcome Guest</p>
                  )
                }
            <Link to={"/customer_login"}>
                <button className='topbarbutton' style={{float:'right'}}>Customer - Login/ Register</button>
            </Link>
           
          </div>
        </div>

        <nav className=" border navbar navbar-expand-lg bg-white">
          <div className="container p-0">
            <a className="navbar-brand">
              <Link to={'/'} className="nav-link home active">
                  <img src={logo} alt="Bootstrap" width="100" height="40" />
              </Link>  
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-1 justify-content-lg-between">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown">
                    Browse Categories
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={'/'} className="nav-link home active">
                    Home
                  </Link>
                </li>
              </ul>
              <form className="d-flex search mx-auto flex-2 justify-content-center" role="search">
                <input
                  className="px-3"
                  type="search"
                  placeholder="Search Shop & Product"
                />
                <Link to={"/search"}>
                <button className="btn text-center" type="submit">
                  <LiaSearchSolid />
                </button>
                </Link>
              </form>

              <form className="d-flex location" role="search">
                <select name="county" className='' id="country">
                  <option value="Pakistan" className='col-sm-4 col-lg-3 col-xl-3 city form-control chosen-select' >Pakistan</option>
                  <option value="Pakistan" >India</option>
                  <option value="Pakistan" >Bangladesh</option>
                </select>
                <select name="county" id="country">
                  <option value="Pakistan" >Karachi</option>
                  <option value="Pakistan" >Islamabad</option>
                  <option value="Pakistan" >Lahore</option>
                </select>

                <input
                  className="px-3"
                  type="search"
                  placeholder="Location"
                />
                <button className="btn" type="submit">
                  Go
                </button>

              </form>
            <Cart />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbars

