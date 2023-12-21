import React, { useContext } from 'react'
import "../CSS/cart.css"
import { ImCross } from "react-icons/im"
import {Link, useNavigate   } from 'react-router-dom'
import { CartGlobalContext } from '../Context/Context'
import axios from 'axios'
import { routePath } from '../../App'


export default function Cart() {
    const { stateCart, dispatchCart } = useContext(CartGlobalContext)
    let subTotal = 0
    if (stateCart.cart.length > 0) {
        stateCart.cart.map((item) => subTotal = subTotal + (item.price * item.count))
    }

    const navigate = useNavigate();


    const checkOut = () => {

        const product = stateCart.cart

        axios.post(`${routePath}api/create-order`, { product, subTotal })
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
        return dispatchCart({
          type: "REMOVE_CART_ITEM",
          payload: item._id
        })
      }


    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <table>
                            <thead>
                                <th>S#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total (₨)</th>
                                <th>Action</th>
                            </thead>
                            {
                                stateCart?.cart.map((val, key) => (<tbody key={key}>
                                    <td>{key + 1}</td>
                                    <td><img src={val.thumbnail} height={100} width={100} alt="Product Image" /></td>
                                    <td>{val.title}</td>
                                    <td><span>Rs</span><span>  {val.price}</span></td>
                                    <td>
                                        <button className='btn btn-wite border'>-</button>
                                        <input type="text" value={val.count} />
                                        <button className='btn'>+</button>

                                    </td>
                                    <td><span>Rs </span> <span>{val.price * val.count}</span></td>
                                    <td   onClick={() => { deletCartItem(val) }}><ImCross /></td>
                                </tbody>
                                ))
                            }
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
