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
  console.log('product idididididi => ', _id)
  const { stateCart, dispatchCart } = useContext(CartGlobalContext)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState([0])
  
  useEffect(() => {
    try {
      const api = `${routePath}api/getproductbyid/${_id}`
      console.log('`http://localhost:3000/api/getproductbyid/${_id}`', api)
      axios.get(api)
        .then((response) => {
          const product = response.data.products;
          if (product) {
            setSelectedProduct(product);
            console.log('in single_product product => ', product);
          } else {
            console.log('Product not found');
          }
        })
        .catch((error) => {
          console.log('Error fetching product:', error.message);
        });
    } catch (error) {
      console.log('useeffect catch block')
      console.log(error);
    }
  }, [_id]);
  


// ADD TO CART
const addToCart = () => {
  try {
      const shopid = selectedProduct.shop_id;
      const item = { ...selectedProduct, count, shopid };
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
 //console.log('localstorage cart => ', localStorage.getItem("cart"));
 const cart = JSON.parse( localStorage.getItem("cart") )
//console.log('cart details => ', cart)
var addproduct_status=false;
if(cart){
    cart.map((v, k) => {
      console.log('value of cart', v.shop_id)
      console.log('selectedProduct=> ',  selectedProduct.shop_id)
      if(v.shop_id == selectedProduct.shop_id){
        addproduct_status=false;
        return addproduct_status;
      }
    })
}else{
  addproduct_status=true;
}
console.log('addproduct_status => ', addproduct_status)

  return (
    <>
      <div className="card">
      <div className="single-product row auto my-5 mx-5">
        <div className="col-md-4 col-sm-12 d-flex px-sm-auto">
          <div className="row">
          <div className="col-lg-4 col-sm-12 d-flex flex-wrap">
              {selectedProduct && selectedProduct.images && selectedProduct.images.map((val) => (
                <img
                  src={val}
                  style={{ width: "120px", height: "120px" }}
                  alt=""
                  onClick={() => {
                    setMainImage(val);
                  }}
                />
              ))}
            </div>
            <div className="main-image col-lg-8 col-sm-12 shadow p-2">
            {selectedProduct && (
              <img
                src={mainImage === 0 ? selectedProduct.thumbnail : mainImage}
                alt=""
                className="img-fluid"
              />
            )}
          </div>

          </div>

        </div>

        <div className="col-lg-6 col-sm-12 d-flex">
            <div className="card">
            <div className="row w-100">
              <div className="col-lg-9">
              <div className="card-body">
              <h5 className="card-title">{ selectedProduct ? selectedProduct.title :'no title' }</h5>
              <p className="card-text text-secondary">{ selectedProduct ? selectedProduct.description :'no description'}</p>

              <p className="card-text"><strong>Product Category:
              </strong>  <span className='mx-3'>{selectedProduct ? selectedProduct.category :'no category'}</span></p>
              <p className="card-text"><strong>Shop ID:
              </strong>  <span className='mx-3'>{selectedProduct ? selectedProduct.shop_id :'no shopid'}</span></p>

              <p className="card-text "><strong>Price :
              </strong><span className='mx-3'>Rs. {selectedProduct ? selectedProduct.price :'no price'}</span></p>

            </div>
              </div>
              <div className="col-lg-3 justify-content-center d-flex flex-column">
              {
                selectedProduct && (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary m-2" onClick={() => setCount(count - 1)} disabled={count > 1 ? false : true}>
                      -
                    </button>
                    <p className='text-center m-3'>{count}</p>
                    <button className="btn btn-primary m-2" onClick={() => setCount(count + 1)}>
                      +
                    </button>
                  </div>
                )
              }

              

              <div className="d-flex justify-content-center">
                  {
                    selectedProduct && (
                      addproduct_status ? (
                        <Link to={"/cart"} className='text-decoration-none'>
                          <button className="btn mx-2 mt-3 add-to-cart btn-outline-dark" onClick={addToCart}>
                            Add to Cart
                          </button>
                        </Link>
                      ) : (
                        <p>Only same shop products are allowed.</p>
                      )
                    )
                  }
              </div>
              </div>
            </div>
            </div>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-12 shadow p-3">
          <p className="mx-auto fw-semibold">This product is available in following place(s):</p>
          <div>
            <p className='my-2 fw-semibold'>Country: <span className='fw-normal'> Pakistan</span></p>
            <p className='my-2 fw-semibold'>City: <span className='fw-normal'> Karachi</span></p>
          </div>
        </div>
      </div>
      </div>
    </>
  )

}

export default Single_Product





