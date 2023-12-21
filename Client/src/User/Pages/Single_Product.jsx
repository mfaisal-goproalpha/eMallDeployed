import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { GlobalContext } from '../../Context/context';
import { CartGlobalContext } from "..//Cart/Context";
import { routePath } from '../../App';
function Single_Product() {

  const { _id } = useParams()
  const [selectedProduct, setSelectedProduct] = useState([])
  const [count, setCount] = useState(1)
  const { stateCart, dispatchCart } = useContext(CartGlobalContext)
  const { state, dispatch } = useContext(GlobalContext)
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


  const updateCartItemCount = (productId, newCount) => {
    const updatedCart = stateCart.cart.map(item =>
      item._id === productId ? { ...item, count: newCount } : item
    );

    dispatchCart({
      type: "UPDATE_CART_ITEM",
      payload: updatedCart,
    });

    // Update localStorage
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };
  
  const addToCart = () => {
    try {
      if (state.user !== undefined) {

        const existingCartItem = stateCart.cart.find(item => item._id === selectedProduct._id);
        if (existingCartItem) {
          // Update the count of the existing product
          const updatedCount = existingCartItem.count + count;
          updateCartItemCount(selectedProduct._id, updatedCount);
        }
        else{

        const item = { ...selectedProduct, count };
        dispatchCart({
          type: "ADD_TO_CART",
          payload: item,
        });
        localStorage.setItem("cartData", JSON.stringify([...stateCart.cart, item]));
    }
        Swal.fire({
          title: "Success!",
          text: "Added to Cart Successfully",
          icon: "success",
        });
      }
      else {
        Swal.fire({
          title: "Error!",
          text: "Please Login first",
          icon: "Login Required",
          
        })
        setTimeout(() => {
          // Redirect to login page
          window.location.href = '/login'; }, 2000);
      }7
     
    
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row auto">
        <div className="col-md-4">
          <div className="row">
            <div className="col-2">
              {selectedProduct.images?.map((val, key) => (
                <figure key={key}> {/* Add a key to the figure element */}
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
            <div className="col-10">
              <img
                src={mainImage == 0 ? selectedProduct.thumbnail : mainImage}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>;

        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{selectedProduct.title}</h5>
              <p className="card-text">{selectedProduct.description}</p>

              <p className="card-text"><strong>Category:
              </strong>  <span>{selectedProduct.category}</span></p>
              {
                (selectedProduct.stock != 0) ?
                  (<p className='card-text'><strong>Availiblity : </strong> in stock</p>) :
                  (<p className='card-text'><strong>Availiblity : </strong> no in stock</p>)
              }
              <p className="card-text ms-5"><strong>Price :
              </strong>  <span><del>{selectedProduct.price} $</del></span></p>
              <p className="card-text  ms-5"><strong>ID :
              </strong><span>  {selectedProduct._id}</span></p>
              <div className="d-flex  ms-5">
                <button className="btn btn-white mx-2" onClick={() => (setCount(count - 1))} disabled={count > 1 ? false : true}>-</button>
                <p className='text-center border-1 rounded'>{count}</p>
                <button className="btn btn-white mx-2" onClick={() => (setCount(count + 1))}>+</button>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-success mx-2 mt-3" onClick={addToCart}>Add to Cart</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Single_Product





