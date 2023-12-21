import React, { useContext } from 'react'
import "../CSS/cart.css"
import { ImCross } from "react-icons/im"
import {Link, useNavigate   } from 'react-router-dom'
import { CartGlobalContext } from '../Context/Context'
import axios from 'axios'
import { routePath } from '../../App'
import Cookies from 'js-cookie';


export default function Cart() {
    const { stateCart, dispatchCart } = useContext(CartGlobalContext)
    let subTotal = 0
    if (stateCart.cart.length > 0) {
        stateCart.cart.map((item) => subTotal = subTotal + (item.price * item.count))
    }

    const navigate = useNavigate();
    const userDataCookie = Cookies.get('user')
    var user_id = 0;
    if(userDataCookie){
    const userData = JSON.parse(userDataCookie);
     user_id = userData.id;
    //console.log('userid in cart before order place ', user_id)
    }else{
        user_id = 0
    }
    const checkOut = () => {

        const product = stateCart.cart

        //console.log('userid in cart checkout before order place ', user_id)

         const shop_id = product[0].shop_id;
        axios.post(`${routePath}api/create-order`, { product, subTotal, shop_id, user_id })
            .then((json) => {
                if (json.data.orderid){
                    navigate(`/checkout/${json.data.orderid}`);
                }

            })
            .catch((error) => console.log(error))
    }

    const deletCartItem = (item) => {
        //console.log('deletCartItem');
        console.log('Delete clicked for:', item.title);
        console.log('item in deletecartitem =>', item);
        console.log('beforeCartState =>', stateCart)
        return dispatchCart({
          type: "REMOVE_CART_ITEM",
          payload: item._id
        })
        
        // // Remove the item from local storage
        // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
        // const updatedCart = cartFromLocalStorage.filter(cartItem => cartItem._id !== item._id);
        // localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Update local storage with the current cart state
  const currentCartState = stateCart.cart; // Assuming you have access to getState
  console.log('currentCartState =>', stateCart)
  localStorage.setItem("cart", JSON.stringify(currentCartState));
      }


    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-12 flex-2">
                        <div className="table-responsive">
                        <table className='table align-middle'>
                            <thead>
                                <tr>
                                <th className='col'>S#</th>
                                <th className='col'>Image</th>
                                <th className='col'>Product Name</th>
                                <th className='col' >Price</th>
                                <th className='col'>Quantity</th>
                                <th className='col'>Total</th>
                                <th className='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                            {
                               stateCart?.cart.map((val, key) => (
                                  <tr key={key}>
                                  <td>{key + 1}</td>
                                    <td><img src={val.thumbnail} height={30} width={30} alt="Product Image" /></td>
                                    <td>{val.title}</td>
                                    <td ><span>Rs</span><span>  {val.price}</span></td>
                                    <td>
                                        <button className='btn btn-wite border'>-</button>
                                        <input type="text" value={val.count} />
                                        <button className='btn'>+</button>
                                    </td>
                                    <td><span>{val.price * val.count}</span></td>
                                    <td   onClick={() => { deletCartItem(val) }}><ImCross /></td>
                                  </tr>
                                  ))
                                }
                            </tbody>
                            <tfoot>
                                <td colSpan={6}>
                                    {
                                        (stateCart?.cart.length) ?
                                            (
                                                    <button className="button-5 mx-auto" onClick={checkOut} role="button">PROCEED TO CHECKOUT</button>
                                            ) :
                                            (
                                                <div className='text-decoration-none'>
                                                    <button className="button-5 mx-auto" role="button">PROCEED TO CHECKOUT</button>
                                                </div>
                                            )

                                    }
                                </td>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2 col-sm-12 total ">
                        <div className='mx-2 my-2'>
                            <h5>Cart Total</h5>
                        </div>

                        <div className="count-total mx-2 my-2 d-flex justify-content-between ">
                            <p>Subtotal:</p>
                            <p><span>Rs </span> {subTotal}</p>
                        </div>
                        <div className="count-total m-2-wrap-wrap    d-flex justify-content-between flex-wrap">
                            <p>Total:</p>
                            <p><span>Rs </span> {subTotal}</p>
                            {
                                (stateCart?.cart.length) ?
                                    (

                                        <button className="button-5 mx-auto " onClick={checkOut} role="button">
                                            PROCEED TO CHECKOUT
                                        </button>
                                    ) :
                                    (
                                        <div className='text-decoration-none'>
                                            <button className="button-5 mx-auto" role="button">PROCEED TO CHECKOUT</button>
                                        </div>
                                    )

                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
