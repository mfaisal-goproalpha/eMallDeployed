import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import { routePath } from '../../App';

const Customer_registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [full_name, setFull_name] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [cradentioalError, setCradentioalError] = useState("")


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
            dispatch({
              type: "USER_LOGIN",
              token: json.data.token
            });
  
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

  const Signup = async (e) => {
    e.preventDefault();
    
    const payload = {
      username,
      email,
      full_name,
      password,
      address
    };
    console.log('signup data => ',payload);
    try {
      axios.post(`${routePath}api/register`, payload)
      .then((json) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: json.data.message
        });

        setUsername('');
        setEmail('');
        setFull_name('');
        setPassword('');
        setAddress('');
        setError('');

        setTimeout(() => {
               // Redirect to login page
               window.location.href = '/customer_login'; }, 2000);
      })

    

    }
     catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
     <main className="main mb-5">
                <br />
                <br />
                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <form id="registrationForm" noValidate="" onSubmit={Signup}>
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
                                                    <label>User Name *</label>
                                                    <input 
                                                            type="text" 
                                                            name="username" 
                                                            required={true}
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            className="form-control"
                                                            />
                                                          <div className="invalid-feedback ">
                                                            Please enter a user name.
                                                          </div>
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label>Full Name *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="Full Name"
                                                        required={true}
                                                        value={full_name}
                                                        onChange={(e) => setFull_name(e.target.value)}
                                                    />
                                                </div>
                                                
                                                {/* End .col-sm-6 */}
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Email *</label>
                                                    <input 
                                                            type="email" 
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            required={true}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
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
                                                        required={true}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                
                                                {/* End .col-sm-6 */}
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Address *</label>
                                                    <input 
                                                            type="text" 
                                                            className="form-control"
                                                            name="address"
                                                            required={true}
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            />
                                                          <div className="invalid-feedback ">
                                                            Please enter address.
                                                          </div>
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    {/* <label>Password *</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                       
                                                        value={password}
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                    /> */}
                                                </div>
                                                
                                                {/* End .col-sm-6 */}
                                            </div>
                                            
                                            {/* End .row */}
                                             <br/>   
                                            <div className="row">
                                              <p className="text-danger">{cradentioalError}</p>
                                              <div className="text-center">
                                                <button type="submit" className="btn signup-btn btn-block mt-3 text-black" style={{border:'1px solid lightgray', float:'right'}}>
                                                  SIGN UP
                                                </button>
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
export default Customer_registration;
