import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart } from 'react-icons/bs'
import ReactStars from 'react-stars'
import { routePath } from '../../App'


function Product_Card({ product }) {
    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-12 gx-1">
                <Link to={`/single-product/${product._id}`} className='text-decoration-none'>
                    <div className="card mx-1">
                        <img src={product.thumbnail} alt="Product Thombnail" className='card-image-top p-1 rounded' />
                        <div className="card-body py-1">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">
                                {product.description}
                            </p>
                        </div>
                    </div>


                </Link>
            </div>






        </>
    )
}

export default Product_Card

//</><Link to={`/single-product/${product._id}`}
//     <div className="col-sm-12 col md-3 col-lg-2">
//         <div className="Card m-2">
//             <div className='card-header'>
//             <div className="image m-1">
//                 <img src={product.thumbnail} alt="" className="card-image img-fluid" />
//             </div>
//             </div>
//             <div className='ms-2'>
//                 <h6 className='card-title'><span className="title">{product.title.toUpperCase()}</span>
//                 </h6>
//                 <p className="dexs">{limit}</p>
//             </div>
//                 <h6 className='ms-2'>{product.price} $ <span>only</span></h6>
//         </div>
//     </div>
//     </Link>