import React, { useState, useContext, usehi } from 'react'
import '../CSS/LogIn.css'
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios'
import { routePath } from '../../App';


export default function LogIn() {
    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showpwd, setShowPwd] = useState(false)
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [pwdError, setPwdError] = useState("")
    const [signup, setSignup] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phoneNo: '',
        email: '',
        country: '',
        city: '',
        zipCode: '',
        streetAddress: '',
        joiningDate: '',
        password: '',
        confirmPasswrod: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^.{8,}$/;

    const handleShowPwd = () => {
        const newInputType = inputType === 'password' ? 'text' : 'password';
        setInputType(newInputType);
        (showpwd === false) ? setShowPwd(true) : setShowPwd(false)
    }

    const emptyErrors = () => {
        setEmailError("")
        setPwdError("")
        setError("")
    }

    const costumerRegistration = (e) => {
        e.preventDefault();

        emptyErrors()

        if (!emailPattern.test(formData.email)) {
            setEmailError("Invalid email format");
        }

        if (!passwordPattern.test(formData.password || !passwordPattern.test(formData.confirmPasswrod))) {
            setPwdError("Password must be at least 8 characters long");
        }
        else {
            setIsLogin(true)
            axios.post(`${routePath}api/signup`, { formData})
                .then((response) => {
                    if (response.data.success) {
                        setIsLogin(false)
                        setIsRegister(true)
                        setError(response.data.success)

                        setTimeout(() => {
                            window.location.href= "/"
                        }, 2000);
                    }
                    else{
                        setIsLogin(false)
                        setError(response.data.message)
                    }

                })
                .catch((err) => {
                    console.log(err)
                    setIsLogin(false)

                })

        }
    }


    const logIn = (e) => {
        e.preventDefault();
        // Reset error message
        setError("")
        // Perform validation
        if (!emailPattern.test(email)) {
            setEmailError("Invalid email format");
        }

        if (!passwordPattern.test(password)) {
            setPwdError("Password must be at least 8 characters long");
        }
        else {
            setIsLogin(true)
            axios.post(`${routePath}api/login`, { email, password })
                .then((response) => {
                    if (response.data.user) {
                        localStorage.setItem("user", JSON.stringify(response.data.user))
                        setIsLogin(false)
                        // window.location.href = "/"
                    }
                    else{
                        setIsLogin(false)
                        setError("Invalid cradential")
                    }

                })
                .catch((err) => {
                    console.log(err)
                    setIsLogin(false)

                })

        }
    };

    return (
        <>
            <button
                type="button"
                className="modalbtn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Customer - Login/ Register
            </button>
            <div
                // className={`modal fade ${isModalOpen ? 'show' : ''}`} 
                className='modal fade'
                id="exampleModal" tabIndex={-1}>

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="close-btn">
                            <input
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setSignup(false)}
                            />
                        </div>
                        <div className="modal-body">
                            {
                                (!signup) ? (
                                    <>
                                        <div>
                                            <h2>Costumer Login</h2>
                                            <form method="post" action="#" id="login" className="form-data" onSubmit={logIn}>
                                                <div className="input-data">
                                                    <FaEnvelope className="fa-solid fa-envelope" />
                                                    <input type="text" value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        name="email" placeholder='Email' required="" />
                                                    <label htmlFor="email">Email Address</label>
                                                    <p className="text-danger">{emailError}</p>
                                                </div>
                                                <div className="input-data">
                                                    <FaLock className="fa-solid fa-lock" />
                                                    {
                                                        (showpwd) ?
                                                            (
                                                                <FaEye className="fa-regular fa-eye" />
                                                            ) :
                                                            (
                                                                <FaEyeSlash className="fa-solid fa-eye-slash" />
                                                            )
                                                    }
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        name="password"
                                                        required=""
                                                        placeholder='Password'
                                                    />
                                                    <label htmlFor="password">Password</label>
                                                    <p className="text-danger">{pwdError}</p>
                                                </div>
                                                <p className="text-danger">{error}</p>
                                                <div className="button d-flex">
                                                    {
                                                        (isLogin) ? (<>
                                                            <button
                                                                type="submit"
                                                                value="LOG IN"
                                                                className="login-btn mx-5">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </button>

                                                        </>) : (
                                                            <>
                                                                <input
                                                                    type="submit"
                                                                    value="LOG IN"
                                                                    className="login-btn mx-5"
                                                                />
                                                            </>
                                                        )
                                                    }

                                                    <a href="#" className="forgot-password mx-5">
                                                        Forgot Passowrd?
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                        <p className='text-center'>Don't have account? <span className='text-decoration-underline' style={{ cursor: "pointer" }} onClick={() => setSignup(true)}>Sign up</span></p>

                                    </>
                                ) : (
                                    <>
                                        <div >
                                            {
                                                (isRegister)?(<><div class="alert alert-success" role="alert">
                                                {error}
                                              </div></>):(<></>)
                                            }
                                            <h2>Costumer Sign up</h2>
                                            <form className='d-flex flex-wrap justify-content-between' onSubmit={costumerRegistration}>
                                                <div className="form-group">
                                                    <label htmlFor="fname">First Name</label>
                                                    <input type="text" className="form-control" id="fname" name="fname" value={formData.fname} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <input type="text" className="form-control" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phoneNo">Phone Number</label>
                                                    <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                                    <p className="text-danger">{emailError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="zipCode">Zip Code</label>
                                                    <input type="text" className="form-control" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="streetAddress">Street Address</label>
                                                    <input type="text" className="form-control" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                                    <p className="text-danger">{pwdError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="confirmPasswrod">Confirm Password</label>
                                                    <input type="password" className="form-control" id="confirmPasswrod" name="confirmPasswrod" value={formData.confirmPasswrod} onChange={handleChange} />
                                                    <p className="text-danger">{pwdError}</p>
                                                </div>
                                                <div className='text-center w-100 my-3'>
                                                {
                                                        (isLogin) ? (<>
                                                            <button
                                                                type="submit"
                                                                value="LOG IN"
                                                                className="login-btn mx-5">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </button>

                                                        </>) : (
                                                            <>
                                                                <input
                                                                    type="submit"
                                                                    value="SnIGN UP"
                                                                    className="login-btn mx-5"
                                                                />
                                                                <p className="text-danger">{error}</p>
                                                            </>
                                                        )
                                                    }

                                                    <p className='text-center'>If you have an account? <span className='text-decoration-underline' style={{ cursor: "pointer" }} onClick={() => setSignup(false)}>Sign in</span></p>

                                                </div>
                                            </form>
                                        </div>

                                    </>
                                )
                            }
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
