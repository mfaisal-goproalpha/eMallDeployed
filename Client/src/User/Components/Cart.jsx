import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { CartGlobalContext } from '../Cart/Context'
import { Link } from 'react-router-dom'

function Cart() {
    const { stateCart, dispatchCart } = useContext(CartGlobalContext)
    return (
        <>
            <Link to={"/cart"}>
                <button type="button" className="btn btn-dark mx-4 position-relative">
                    <FaShoppingCart />
                    {
                        stateCart.cart !== undefined? (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            { stateCart?.cart.length}
                             <span className="visually-hidden">unread messages</span>
                         </span>
                        ):
                        (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0
                             <span className="visually-hidden">unread messages</span>
                         </span>
                        )
                    }
                 
                </button>
            </Link>

        </>
    )
}

export default Cart
