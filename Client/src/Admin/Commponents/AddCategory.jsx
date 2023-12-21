import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../Firebase/FirebaseConfig';
import { routePath } from '../../App';
import Cookies from 'js-cookie';

function AddCategory({onCategoryAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [cat_name, setcat_name] = useState('');
  const [cat_image, setcat_image] = useState(null);
  


  // const handleAddCategory = () => {
  //   try{
  //   const storageRef = ref(storage, `Images/Category Images/${cat_image.name}`)
  //   uploadBytes(storageRef, cat_image)
  //     .then((snapshot) => {
  //       getDownloadURL(snapshot.ref)
  //         .then((url) => {
  //           const payload = {
  //             cat_name,
  //             cat_image: url
  //           }
  //           axios.post(`${routePath}api/addcategory`, payload)
  //             .then((json) => {
  //               setShowModal(false)
  //               Swal.fire({
  //                 icon: 'success',
  //                 title: 'Successfull',
  //                 text: `${cat_name} successfully added`,
  //               });
  //               onCategoryAdded({
  //                 _id: json.data._id,
  //                 cat_name: cat_name,
  //                 cat_image: url,
  //               });
  //             })
  //             .catch((error) => {console.log(error.message)})
  //         })
  //     })
  //   }
  //   catch (error){
  //     console.log(error)
  //   }
  // };

    const handleAddCategory = () => {
    try{
      //console.log('cat_name', cat_name)
      //console.log('cat_image', cat_image)

      const shopdata = Cookies.get('shop');

      // Assuming shopdata is a JSON string, parse it to convert it to an object
      const shopObject = JSON.parse(shopdata);
      
      // Destructure the properties of the shopObject
      const { id, username, full_name, email, dp, role, address } = shopObject;

      const url = 'https://via.placeholder.com/150';
      const formData = new FormData();
      formData.append('cat_name', cat_name);
      formData.append('cat_image', cat_image);
      formData.append('shop_id', id);
          
          const payload = {
            cat_name:cat_name,
            cat_image: cat_image,
            shop_id:id
          }
          //console.log(routePath)
          //console.log(routePath+'api/addcategory')
          console.log('formData before Send=>', payload);
          axios.post(routePath+'api/addcategory', payload, {headers: {'Content-Type': 'multipart/form-data'},})
            .then((json) => {
              console.log('json=> ', json);
              setShowModal(false)
              Swal.fire({
                icon: 'success',
                title: 'Successfull',
                text: `${cat_name} successfully added`,
              });
              //console.log('cat_image', cat_image)
              onCategoryAdded({
                _id: json.data._id,
                cat_name: cat_name,
                cat_image: cat_image.name,
              });
            })
            .catch((error) => {
              console.log('Error Message for Category is => ',error.message)
              console.log('Error name ', error.name)
            })
    }
    catch (error){
      console.log(error)
    }
  };


  return (
    <div className="container">
      {/* Existing code */}

      <div className="text-center">
        <button className="btn btn-primary p-2 my-2" onClick={() => setShowModal(true)}>
          Add Category 
        </button>
      </div>

      {/* Existing code */}

      {/* Add Category Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cat_name}
                    onChange={(e) => setcat_name(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Category Image
                  </label>
                  <input className="form-control" name='cat_image' onChange={(e) => setcat_image(e.target.files[0])} type="file" id="formFile" />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
