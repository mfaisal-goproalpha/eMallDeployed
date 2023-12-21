import React, { useContext, useEffect, useState, uses } from 'react'
import logo from "../Images/logo.png"
import { LiaSearchSolid } from "react-icons/lia"
import { Link } from 'react-router-dom'
import Cart from '../../Guest/Components/Cart'
import LogIn from '../Pages/LogIn'
import { GlobalContext } from '../Context/UserContext'
import axios from 'axios'


function Navbars() {
  const { state, dispatch } = useContext(GlobalContext)
  const [user, setUser] = useState()
 

  return (
    <>
      <header>
        <div className="container p-0">
          <div className="registration-btns d-flex justify-content-between">
            {/* <button>Shop - Login/ Register</button> */}
            <Link to={"/shop_login"}>
                <button>Shop - Login/ Register</button>
            </Link>
            {/* <LogIn /> */}
            <Link to={"/customer_login"}>
                <button>Customer - Login/ Register</button>
            </Link>
          </div>
        </div>

        <nav className=" border navbar navbar-expand-lg bg-white">
          <div className="container p-0">
            <a className="navbar-brand">
              <img src={logo} alt="Bootstrap" width="100" height="40" />
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown">
                    Browse Categoreis
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={'/'} className="nav-link home active">
                    Home
                  </Link>
                </li>
              </ul>
              <form className="d-flex search mx-auto" role="search">
                <input
                  className="px-3"
                  type="search"
                  placeholder="Search Shop & Product"
                />
                <Link to={"/search"}>
                <button className="btn" type="submit">
                  <LiaSearchSolid />
                </button>
                </Link>
              </form>

              <form className="d-flex location" role="search">
                <select name="county" className='' id="country">
                  <option value="Pakistan" className='col-sm-4 col-lg-3 col-xl-3 city form-control chosen-select' >Pakistan</option>
                  <option value="Pakistan" >Inda</option>
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

