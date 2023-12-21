import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { routePath } from '../../App';
import { CartGlobalContext } from "../Context/Context"
import Swal from 'sweetalert2';
import '../custom.css' 
function Single_Product() {

  const { _id } = useParams()
  const { stateCart, dispatchCart } = useContext(CartGlobalContext)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState([0])

  useEffect(() => {
    try {
      axios.get(`${routePath}api/getproductbyid/${_id}`)
        .then((json) => {
          setSelectedProduct(json.data.products)
        })
        .catch((error) => { console.log(error.message) })
    }
    catch (error) {
      console.log(error)
    }
  }, [_id])


// ADD TO CART
const addToCart = () => {
  try {
      const item = { ...selectedProduct, count };
      dispatchCart({
        type: "ADD_TO_CART",
        payload: item,
      });
      localStorage.setItem("cart", JSON.stringify([...stateCart.cart, item]));
      Swal.fire({
        title: "Success!",
        text: "Added to Cart Successfully",
        icon: "success",
      });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <div className="single-product row auto my-3 mx-0">
        <div className="col-md-4 col-sm-12 d-flex px-sm-auto my-3">
          <div className="row">
            <div className="col-lg-2 col-sm-12 d-flex flex-wrap">
              {selectedProduct.images?.map((val, key) => (
                <figure key={key} className='mx-3 shadow'>
                  <img
                    src={val}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                    onClick={() => {
                      setMainImage(val);
                    }}
                  />
                </figure>
              ))}
            </div>
            <div className="main-image col-lg-10 col-sm-12 shadow px-5 ">
              <img
                src={mainImage == 0 ? selectedProduct.thumbnail : mainImage}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>

        </div>

        <div className="col-lg-6 col-sm-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{selectedProduct.title}</h5>
              <p className="card-text">{selectedProduct.description}</p>

              <p className="card-text"><strong>Dukan Name:
              </strong>  <span>{selectedProduct.category}</span></p>
              <p className="card-text ms-5"><strong>Price :
              </strong>Rs.  <span>{selectedProduct.price}</span></p>
              <div className="d-flex  ms-5">
                <button className="btn btn-white mx-2" onClick={() => (setCount(count - 1))} disabled={count > 1 ? false : true}>-</button>
                <p className='text-center border-1 rounded'>{count}</p>
                <button className="btn btn-white mx-2" onClick={() => (setCount(count + 1))}>+</button>
              </div>
              <div className="d-flex justify-content-end">
                <Link to={"/cart"} className='text-decoration-none'>
                <button className="btn mx-2 mt-3 add-to-cart"
                onClick={addToCart}
                >Add to Cart</button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-12 shadow">
          <p className="mx-auto">This product is available in following place(s):</p>
          <div>
            <p className='mr-4'>Country: <span>Pakistan</span></p>
            <p className='mr-4'>City: <span>Karachi</span></p>
          </div>
        </div>
      </div>
    </>
  )

}

export default Single_Product





