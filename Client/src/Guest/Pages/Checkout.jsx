import React, { useState, useContext } from 'react'
import '../CSS/checkout.css'
import { GlobalContext } from '../Context/UserContext'
import{routePath} from '../../App'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { CartGlobalContext } from '../Context/Context'
import Cookies from 'js-cookie';

export default function Checkout() {
    const { stateCart, dispatchCart } = useContext(CartGlobalContext)
    const userData = Cookies.get('user');
    console.log('userData in checkout page =>', userData)
    let subTotal = 0
    if (stateCart.cart.length > 0) {
        stateCart.cart.map((item) => subTotal = subTotal + (item.price * item.count))
    }
    const { state, dispatch } = useContext(GlobalContext)
    const { orderId } = useParams()
    const navigate = useNavigate()
    const res = decodeToken(state.token)
    const [islogIn, setIslogIn] = useState(false)
    const [placeOrder, setPlaceOrder] = useState({
        status: false,
        message: ""
    })
    const [billformData, setbillFormData] = useState({
        fname: "", lname: "", phoneNo: "", email: "", country: "", city: "", zipCode: "", streetAddress: "",
    });
    const [shipformData, setbshipFormData] = useState({
        fname: "", lname: "", phoneNo: "", email: "", country: "", city: "", zipCode: "", streetAddress: "",
    });
    const [ischecked, setIsChecked] = useState(false)
    const [userId, setUserId] = useState("123")

    const handleChecked = () => {
        setIsChecked(!ischecked)
        setbshipFormData({ ...billformData })

    }

    const handleBillChange = (event) => {
        const { name, value } = event.target;
        setbillFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleShipChange = (event) => {
        const { name, value } = event.target;
        setbshipFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitOrder = (e) => {
        e.preventDefault();

        // if (!state.token) {
        //     setIslogIn(true)
        //     return
        // }
        const userId = '123789';
        console.log('userId from checkout.jsx =>', userId);
        console.log('orderId from checkout.jsx =>', orderId);
        console.log('billformData from checkout.jsx =>', billformData);
        console.log('shipformData from checkout.jsx =>', shipformData);

        axios.post(`${routePath}api/billshipaddress`, {
            userId, orderId, billformData, shipformData
        })
            .then((response) => {
                console.log(response.data.message)
                dispatchCart({
                    type: "EMPTY_CART",
                    payload: []
                })
                setPlaceOrder({
                    status: true,
                    message: response.data.message
                })
  // Clear local storage
  localStorage.removeItem("cart");
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            })
            .catch((error) => console.log("Catch Error",error))
    };

    return (
        <>
            <main className="main mb-5">
                <br />
                <br />
                {
                    (placeOrder.status) ? (
                        <>
                            <div className="alert alert-success" role="alert">
                                {placeOrder.message}
                            </div>
                        </>

                    ) : (<></>)
                }
                <div className="page-content">
                    {
                        (islogIn) ? (<div className="alert alert-danger my-3" role="alert">
                            Please login
                        </div>) : (<></>)
                    }

                    <div className="checkout">
                        <div className="container">
                            <form onSubmit={submitOrder}>
                                <input
                                    type="hidden"
                                    name="_token"
                                    defaultValue="eDmb4SweFeeCSx7r0UO4nfjPSdaNm82atMqM0fcH"
                                />{" "}
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="bill_sec">
                                            <h2 className="checkout-title mb-3">Billing Details</h2>
                                            {/* End .checkout-title */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>First Name *</label>
                                                    <input placeholder='Enter Your First Name'
                                                        type="text"
                                                        name="fname"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.fname}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Last Name *</label>
                                                    <input placeholder='Enter Your Last Name'
                                                        type="text"
                                                        name="lname"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.lname}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Phone *</label>
                                                    <input placeholder='Enter Your Phone Number'
                                                        type="tel"
                                                        name="phoneNo"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.phoneNo}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Email address *</label>
                                                    <input placeholder='Enter Your Email Address'
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.email}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Town / City *</label>
                                                    <input placeholder='Enter Your City'
                                                        type="text"
                                                        name="city"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.city}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>State / County *</label>
                                                    <input placeholder='Enter Your State / County'
                                                        type="text"
                                                        name="country"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.country}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Postcode / ZIP *</label>
                                                    <input placeholder='Enter Your Postcode'
                                                        type="text"
                                                        name="zipCode"
                                                        className="form-control"
                                                        required=""
                                                        value={billformData.zipCode}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Street address *</label>
                                                    <input placeholder='Enter Your Street Address'
                                                        type="text"
                                                        className="form-control"
                                                        name="streetAddress"
                                                        required=""
                                                        value={billformData.streetAddress}
                                                        onChange={handleBillChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        <br />
                                        Shipping address will same as Billing Address <br />
                                        <input placeholder='Enter Your Billed'
                                            type="checkbox"
                                            name="bill_to_ship"
                                            id="bill_to_ship"
                                            className="bill_to_ship from-control"
                                            defaultValue={1}
                                            checked={ischecked}
                                            onChange={handleChecked}

                                        />
                                        <br />
                                        <div className="ship_sec" id="ship_sec">
                                            <h2 className="checkout-title">Shipping Details</h2>
                                            {/* End .checkout-title */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>First Name *</label>
                                                    <input placeholder='Enter Your First Name'
                                                        type="text"
                                                        name="fname"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.fname}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Last Name *</label>
                                                    <input placeholder='Enter Your Last Name'
                                                        type="text"
                                                        name="lname"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.lname}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Phone *</label>
                                                    <input placeholder='Enter Your Phone Number'
                                                        type="tel"
                                                        name="phoneNo"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.phoneNo}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Email Address *</label>
                                                    <input placeholder='Enter Your Email Address'
                                                        type="email"
                                                        name="email"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.email}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Town / City *</label>
                                                    <input placeholder='Enter Your City'
                                                        type="text"
                                                        name="city"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.city}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>State / County *</label>
                                                    <input placeholder='Enter Your State / County'
                                                        type="text"
                                                        name="country"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.country}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Postcode / ZIP *</label>
                                                    <input placeholder='Enter Your Postcode'
                                                        type="text"
                                                        name="zipCode"
                                                        className="form-control shipping"
                                                        required=""
                                                        value={shipformData.zipCode}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                                <div className="col-sm-6">
                                                    <label className='mb-1 fw-semibold'>Street Address *</label>
                                                    <input placeholder='Enter Your Street Address'
                                                        type="text"
                                                        className="form-control shipping"
                                                        name="streetAddress"
                                                        required=""
                                                        value={shipformData.streetAddress}
                                                        onChange={handleShipChange}
                                                    />
                                                </div>
                                                {/* End .col-sm-6 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                    </div>
                                    {/* End .col-lg-9 */}
                                    <div className="col-lg-3">
                                        <div className="summary">
                                            <h3 className="summary-title">Your Order</h3>
                                            {/* End .summary-title */}
                                            <table className="table table-summary">
                                                <thead>
                                                    {/* <tr>
                                                        <th>Product</th>
                                                        <th></th>
                                                        <th>Total</th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    {/* <tr>
                                                        <td>

                                                        </td>
                                                        <td className="text-center"> 1</td>
                                                        <td> ₨ {subTotal}</td>
                                                    </tr> */}
                                                    <tr className="summary-subtotal">
                                                        <td className='fw-semibold'>Subtotal:</td>
                                                        <td />
                                                        <td> ₨ {subTotal}</td>
                                                    </tr>
                                                    {/* End .summary-subtotal */}
                                                    <tr className="summary-total">
                                                        <td className='fw-semibold'>Total:</td>
                                                        <td />
                                                        <td>₨ {subTotal}</td>
                                                    </tr>
                                                    {/* End .summary-total */}
                                                </tbody>
                                            </table>
                                            {/* End .table table-summary */}
                                            <div className="accordion-summary" id="accordion-payment">
                                                <div className="card">
                                                    <div className="card-header" id="heading-3">
                                                        <input placeholder='Enter Your'
                                                            type="radio"
                                                            name="cod"
                                                            defaultValue="cod"
                                                            required=""
                                                        />
                                                        <span className="card-title mx-3">Cash on delivery</span>
                                                        <br />
                                                    </div>
                                                    {/* End .card-header */}
                                                    <div

                                                        className="collapse"
                                                        aria-labelledby="heading-3"
                                                        data-parent="#accordion-payment"
                                                    ></div>
                                                    {/* End .collapse 
										    </div><!-- End .card */}
                                                </div>
                                                {/* End .accordion */}
                                                <button
                                                    type='submit'
                                                    className="btn btn-outline-warning text-dark btn-order btn-block my-3"
                                                >
                                                    <span className="btn-text">Place Order</span> /
                                                    <span className="btn-hover-text"> Submit Order</span>
                                                </button>
                                            </div>
                                            {/* End .summary */}
                                        </div>
                                    </div>
                                    {/* End .col-lg-3 */}
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
            {/* End .main */}
        </>
    )
}
