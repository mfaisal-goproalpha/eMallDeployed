import React, { useState, useContext } from 'react'
import '../CSS/checkout.css'
import { GlobalContext } from '../Context/UserContext'
import{routePath} from '../../App'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { CartGlobalContext } from '../Context/Context'

export default function Checkout() {
    const { stateCart, dispatchCart } = useContext(CartGlobalContext)
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
     
        axios.post(`${routePath}api/billshipaddress`, {
            userId: "123", orderId, billformData, shipformData
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
                                            <h2 className="checkout-title">Billing Details</h2>
                                            {/* End .checkout-title */}
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>First Name *</label>
                                                    <input
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
                                                    <label>Last Name *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Phone *</label>
                                                    <input
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
                                                    <label>Email address *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Town / City *</label>
                                                    <input
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
                                                    <label>State / County *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Postcode / ZIP *</label>
                                                    <input
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
                                                    <label>Street address *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="streetAddress"
                                                        placeholder="House number and Street name"
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
                                        <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>First Name *</label>
                                                    <input
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
                                                    <label>Last Name *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Phone *</label>
                                                    <input
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
                                                    <label>Email address *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Town / City *</label>
                                                    <input
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
                                                    <label>State / County *</label>
                                                    <input
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
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>Postcode / ZIP *</label>
                                                    <input
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
                                                    <label>Street address *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control shipping"
                                                        name="streetAddress"
                                                        placeholder="House number and Street name"
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
                                                        <td>Subtotal:</td>
                                                        <td />
                                                        <td> ₨ {subTotal}</td>
                                                    </tr>
                                                    {/* End .summary-subtotal */}
                                                    <tr className="summary-total">
                                                        <td>Total:</td>
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
                                                        <input
                                                            type="radio"
                                                            name="cod"
                                                            defaultValue="cod"
                                                            required=""
                                                        />
                                                        <span className="card-title">Cash on delivery</span>
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
                                                    // type="submit"
                                                    type='submit'
                                                    className="btn btn-outline-primary-2 btn-order btn-block"
                                                >
                                                    <span className="btn-text">Place Order</span>
                                                    <span className="btn-hover-text">Submit Order</span>
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
