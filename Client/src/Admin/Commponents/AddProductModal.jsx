import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../../Firebase/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';
import {routePath} from '../../App'
import Cookies from 'js-cookie';

function AddProductModal() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [stock, setStock] = useState("")
    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShowModal(false);
	
				      const shopdata = Cookies.get('shop');

      // Assuming shopdata is a JSON string, parse it to convert it to an object
      const shopObject = JSON.parse(shopdata);
      
      // Destructure the properties of the shopObject
      const { id, username, full_name, email, dp, role, address } = shopObject;

    const handleShow = () => {
        try {
            axios.get(`${routePath}api/allcategories`,{
				params: {
				  shop_id: id,
				},
			  })
						.then(json => {
                    setCategoryVal(json.data.categories);
                    console.log((json.data.categories)
                    )
                    console.log("Category val: ",CategoryVal)
                    setShowModal(true)
                })
                .catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }

    }

    const urls = []
    const productImages = () => images?.map((val) => {
        console.log('title images => ', title);
        console.log('value name images => ', val.name)
        const productImagesRef = ref(storage, `/images/products/${title}/${val.name}`);
        console.log('productImagesRef => ', productImagesRef)
        return uploadBytes(productImagesRef, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => { urls.push(url) }).catch((error) => alert(error));
        });
    })

    const handleAddProduct = (e) => {
        e.preventDefault()
        const uploadImages = productImages()
        Promise.all(uploadImages)
        try {

	  
            const storageRef = ref(storage, `images/products/${thumbnail.name}`)
            uploadBytes(storageRef, thumbnail)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            const payload = {
                                title,
								shop_id:id,
                                thumbnail:url,
                                description,
                                price,
                                category,
                                images: urls,
								
                                stock
                            }
                            axios.post(`${routePath}api/addproducts`, payload, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then((json) => {
                                setShowModal(false)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Login Successful',
                                    text: `${title} successfully added`,
                                  });
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successful',
                                    text: `product successfully added`,
                                });
                            })
                                .catch((error) => { console.log(error.message) })
                        })
                })

            //const url = 'url';
            //const urls = 'urls';

     

            const payload = {
                title : title,
				shop_id:id,
                thumbnail : url,
                description : description,
                price : price,
                category : category,
                images : urls,
				
                stock : stock,
            }
                            console.log(routePath + 'api/addproducts');
            axios.post(routePath + 'api/addproducts' , payload ).then((json) => {
                setShowModal(false)
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Login Successful',
                //     text: `${title} successfully added`,
                //   });
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: `product successfully added`,
                });
            })
                .catch((error) => { console.log(error.message) })
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={showModal} onHide={handleClose} centered backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleAddProduct}>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="Title" label="Product Title" className="mb-3 text-secondary">
                                    <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="col">
                                <FloatingLabel controlId="price" label="Product Price ($)" className="mb-3 text-secondary">
                                    <Form.Control type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <FloatingLabel controlId="stock" label="Quantity" className="mb-3 text-secondary">
                                    <Form.Control type="number" placeholder="Product Quantity" value={stock} onChange={(e) => setStock(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Product Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>
                        <div className="mb-3">
                            <p className='mb-0 fw-semibold'>Choose Images</p>
                            <small className="text-secondary">Double Click to Delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    images.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1"
                                            onDoubleClick={() => setImages(images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}
                                                className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>)
                                }
                                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                                    +
                                </label>
                            </div>
                            <input className="form-control d-none" onChange={(e) => setImages([...images, e.target.files[0]])} type="file" id="formFile" />
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel controlId="selectCategory" label="Select Category">
                                        <Form.Select aria-label="Please Select a Category" onChange={(e) => setCategory(e.target.value)}>
                                            <option>Please Select a Category</option>
                                            {
                                                CategoryVal.map((val, key) => <option key={key} value={val.cat_name}>{val.cat_name}</option>)
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>
                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddProductModal;
