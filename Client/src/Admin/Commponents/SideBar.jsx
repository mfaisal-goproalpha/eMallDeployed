import React, { useContext, useState} from 'react'
import { AiOutlineDashboard } from "react-icons/ai"
import { BiCategoryAlt } from 'react-icons/bi'
import { BsBorderStyle } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { GlobalContext } from '../../Context/context'
//import { decodeToken } from 'react-jwt'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

function SideBar() {
    const {state, dispatch} = useContext(GlobalContext)
    //let res = decodeToken(state.token)
    let res = 0;
    const logout = () => {
        // setTimeout(() => {
        //     loadingAlert.close();
            
        // }, 3000);
        // dispatch({
        //     type: "USER_LOGOUT"
        // })
        Cookies.set('token','');
        Cookies.set('shop','');
        const loadingAlert = Swal.fire({
            title: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }

          });
          window.location.href = '';
    }
    const path = useLocation()

    const items = [
        {
            tab: "Dashboard",
            url: "/",
            icon: <AiOutlineDashboard />
        },
        {
            tab: "Categories",
            url: "/admin-category",
            icon: <BiCategoryAlt />
        },
        {
            tab: "Products",
            url: "/admin-products",
            icon: <BiCategoryAlt />
        },
        {
            tab: "Orders",
            url: "/admin-order",
            icon: <BsBorderStyle />
        }
    ]

    return (
        <>
            <>
                
                <div className="sidebar row" style={{width:'15%', marginTop:'90px'}}>
                    
                    <ul className="nav flex-column">
                        {
                            items.map((val, key) =>

                                <li key={key} className={`nav-item m-2 ${path.pathname == val.url ? 'bg-primary rounded' : null}`}>
                                    <Link className='nav-link d-flex align-items-center text-white  gap-2' to={val.url}>
                                        <span>{val.icon}</span>
                                        <span>{val.tab}</span>
                                    </Link>
                                </li>)
                        }
                    </ul>
                    <div className="profile9 mt-5">
                        <div>
                            {/*
                            <img src={res?.dp} alt="Profile Image" />
                            <span className='text-dark'>{res?.username}</span>
                            */}
                        </div>
                        <button className="btn btn-primary p-1" style={{width:'95%', marginLeft:'5px'}} onClick={() => {logout()}}>Logout</button>
                    </div>
                </div>
                <div className="content">{/* Your main content here */}</div>
            </>

        </>
    )
}

export default SideBar
