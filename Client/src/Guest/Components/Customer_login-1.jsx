import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import { routePath } from '../../App';

const Customer_login = () => {
  const [cradentioalError, setCradentioalError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', email+' => '+password);
    // You can send the data to a server, update state, or perform other actions here

    //SignIn Form Validation
    const payload = { email, password };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (email == "" ) {setCradentioalError("Please enter an email");return false;}else{setCradentioalError("")}
    //if (isValidEmail) {setCradentioalError("Please enter a valid email");return false;}else{setCradentioalError("")}
    if (password == "" ) {setCradentioalError("Please enter password");return false;}else{setCradentioalError("")}
    if (password.length < 8) {setCradentioalError("Please enter password greater then 8 character");return false;}else{setCradentioalError("")}

    //if (email !== "" && password !== "") {
      console.log('Now api is starting to submit in /api/login ')
      axios.post(`${routePath}api/login`, payload)
        .then((json) => {
          setCradentioalError(json.data.message); // Update the error message state
  
          if (json.data.token) {
            Cookies.set('token', json.data.token);
            Cookies.set('user', json.data.user);
            
            // dispatch({
            //   type: "USER_LOGIN",
            //   token: json.data.token
            // });
  
            // Display success SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You have successfully logged in.',
            });
          } else {
            // Display a generic error message
          console.log("else block")
          }
        })
        .catch((error) => {
          setCradentioalError("An error occurred. Please try again.");
          console.log("Catch error", error.message);
        });
    //} else {
      //setCradentioalError("Please enter email and password");
    //}
  };

  return (
    <>
     <main className="main mb-5">
                <br />
                <br />
                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_token"
                                    defaultValue="eDmb4SweFeeCSx7r0UO4nfjPSdaNm82atMqM0fcH"
                                />{" "}
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="bill_sec">
                                            <h2 className="checkout-title">Customer Registration</h2>
                                            
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Email *</label>
                                                    <input 
                                                            type="email" 
                                                            name="email" 
                                                           
                                                            value={email}
                                                            onChange={(e) => { setEmail(e.target.value) }}
                                                            className="form-control"
                                                            />
                                                          <div className="invalid-feedback ">
                                                            Please enter a valid email address.
                                                          </div>
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label>Password *</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                       
                                                        value={password}
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                    />
                                                </div>
                                                
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                             <br/>   
                                            <div className="row">
                                              <p className="text-danger">{cradentioalError}</p>
                                              <div className="text-center">
                                                <button type="submit" className="btn signup-btn btn-block mt-3 text-black" style={{border:'1px solid lightgray', float:'right'}}>
                                                  Log In
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row">
                                              
                                              <div className="text-center">
                                                <Link to='/customer_registration'>
                                                 
                                                <span  className=" mt-3 text-black" style={{border:'1px solid lightgray', float:'left', borderRadius:'10px'}}>
                                                  New Customer Registration
                                                </span>
                                                </Link>
                                              </div>
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        
                                        
                                    </div>
                                   
                                </div>
                                {/* End .row */}
                            </form>
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .checkout */}
                </div>
                {/* End .page-content */}
            </main>

    </>
  );
};
export default Customer_login;
