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
                        <img src={product.thumbnail} alt="Product Thombnail" className=' p-1 rounded' width={'auto'} height={150}/>
                        <div className="card-body py-2">
                            <h4 className="card-title fs-6">{product.title}</h4>
                            <span><b><u><i>ShopID:</i></u></b></span>
                            <p className="card-text text-truncate text-secondary" style={{fontSize:'13px'}}>
                                {product.shop_id}
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