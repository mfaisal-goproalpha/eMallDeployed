import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cart from './Cart';
import { GlobalContext } from '../../Context/context';
import { decodeToken } from 'react-jwt'

function Navigation() {
  const { state, dispatch } = useContext(GlobalContext);

  const logout = () => {
    setTimeout(() => {
      loadingAlert.close();
      dispatch({
        type: "USER_LOGOUT"
      });
    }, 3000);

    const loadingAlert = Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Move the decodeToken function call here, after it's defined
  const res = decodeToken(state.token);




  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#26104f" }}>
        <div className="container-fluid">
          <Link to={"/"}>
            <img src="https://www.ekecommerce.com/wp-content/uploads/2023/04/EKEcommerce_Logo_Gold@2x.png" width="30" height="30" alt="Logo" />
          </Link>
          <div className='ms-5'>
          <img src={res.dp} width="30" height="30" alt="Logo" />
            <span className='text-white ms-3'> {res.username}</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 mx ms-auto">
              <li className="nav-item ">
                <Link to="/" className="nav-link active nav-bar-text"  >Home</Link>
              </li>
              <li className="nav-item ">
                <Link to="/Categories" className="nav-link active nav-bar-text"  >Categories</Link>
              </li>
            </ul>

            <form className="d-flex" role="submit">
              <Link to="/cart">
                <Cart />
              </Link>
              <button className="btn btn-outline-primary ms-2" type="button" onClick={logout}>Logout</button>
                
            </form>
          </div>
        </div>
      </nav >

    </>
  )
}

export default Navigation

