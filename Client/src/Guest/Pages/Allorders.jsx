import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Allorders() {
    // const [order, setOrder] = useState([])
    // useEffect(() => {
    //     axios.get(`${routPath}api/fetch-order`)
    //     .then((response) => setOrder(response.data.Orders) )
    //     .cath((error) =>  console.log(error))
    // })

    // console.log("orders" ,order)

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
                                    <td><ImCross /></td>
                                </tbody>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
