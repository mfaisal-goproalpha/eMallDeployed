import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart } from 'react-icons/bs'
import ReactStars from 'react-stars'


function Product_Card({ product }) {
    const desWords = product.description.split(" ")
    const limit = desWords.splice(0,10).join(" ")
    return (
        <>
            <div className="col-sm-6 col md-4 col-lg-3">
                <div className="Card m-2">
                    <Link to={`/single-product/${product._id}`} className='card-header'>
                    <div className="image m-1">
                        <img src={product.thumbnail} alt="" className="card-image img-fluid" />
                    </div>
                    </Link>
                    <div className='ms-2'>
                        <Link to={`/single-product/${product._id}`}className='card-title'><span className="title">{product.title.toUpperCase()}</span>
                        </Link>
                        <p className="dexs">{limit}</p>
                    </div>
                        <h6 className='ms-2'>{product.price} $ <span>only</span></h6>
                </div>
            </div>
        </>
    )
}

export default Product_Card
