import React, { useContext, useEffect, useState } from 'react';
import { CartGlobalContext } from '../Cart/Context'
import { AiFillCloseCircle } from 'react-icons/ai'
import { GlobalContext } from '../../Context/context';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import Swal from 'sweetalert2';
import { routePath } from '../../App';
function Cart_Page() {
  const { stateCart, dispatchCart } = useContext(CartGlobalContext)
  const { state, dispatch } = useContext(GlobalContext)
  const res = decodeToken(state.token)

  const deletCartItem = (item) => {
    dispatchCart({
      type: "REMOVE_CART_ITEM",
      payload: item._id
    })
  }

  const handleDecrease = (item) => {
    if (item.count > 1) {
      const updatedItem = { ...item, count: item.count - 1 };
      dispatchCart({
        type: "UPDATE_CART_ITEM",
        payload: updatedItem,
      });
    }
  };

  const handleIncrease = (item) => {
    const updatedItem = { ...item, count: item.count + 1 };
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: updatedItem,
    });
  };

  const totalBill = stateCart.cart.reduce((total, product) => total + product.count * product.price, 0);


  const checkOut = () => {
    const payload = {
      items: stateCart.cart,
      totalBill: totalBill,
      customerId: res.id,
      customerName: res.full_name,
      customerEmail: res.email,
      customerAddress: res.address
    }
    try {
      axios.post(`${routePath}api/createorder`,payload)
      .then((json) => {
        Swal.fire({
          title: "success",
          text: "Checkout successfull",
          icon: "success",
        })
        dispatchCart({
          type: "CLEAR_CART",
        });
        localStorage.removeItem("cartData");
      })
    } catch (error) {
      console.log(error)
    }
    
  }




  return (
    <>
      <div className="container">

        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-8">
            <div className="rounded border-1 mx-auto my-auto bg-white">
              <div className="boder-1 mb-1 text-center py-3">
                <h5>Cart</h5>

              </div>
              <div className="bg-secondary m-2 p-2">
                <p className='text-white ' style={{ fontSize: "20px" }}>Customer Name:  <span style={{ fontSize: "15px" }}>{res.full_name}</span></p>
                <p className='text-white' style={{ fontSize: "20px" }}>Customer Email: <span style={{ fontSize: "15px" }}>{res.email}</span></p>
                <p className='text-white' style={{ fontSize: "20px" }}>Shiping Address: <span style={{ fontSize: "15px" }}>{res.address}</span></p>

              </div>
              <div className=" d-float mx-auto my-2 p-3 bg-dark" style={{ height: "40vh", overflowY: "scroll" }}>
                {
                  stateCart.cart.map((val, key) => (

                    <div className="card mb-3" key={key} >
                      <div className="d-flex justify-content-end">
                        <AiFillCloseCircle className='delete-btn m-3 rounded' onClick={() => { deletCartItem(val) }} />
                      </div>
                      <div className="row g-0">
                        <div className="d-flex justify-content-center align-items-center p-1 col-md-4">
                          <img src={val.thumbnail} className="img-fluid rounded-start" alt="Thumbnail Image" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{val.title}</h5>
                            <div className="d-flex  ms-5">
                              <button className="btn btn-white mx-2" onClick={() => handleDecrease(val)} disabled={val > 1 ? false : true}>-</button>
                              <p className='text-center border-1 rounded'>{val.count}</p>
                              <button className="btn btn-white mx-2" onClick={() => handleIncrease(val)}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  )
                }
              </div>

              <div className="d-flex p2 my-2">
                <h5>Total Bill: <span>{totalBill} $</span></h5>
                <button className="btn btn-outline-primary ms-auto" 
                onClick={checkOut}
                type="submit">Check out
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Cart_Page
