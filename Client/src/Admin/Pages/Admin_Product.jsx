import React, { useEffect, useState } from 'react'
import AddProductModal from '../Commponents/AddProductModal'
import axios from 'axios'
import Swal from 'sweetalert2'
import {AiFillDelete} from 'react-icons/ai'
import { routePath } from '../../App'
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';

function Admin_Product() {
  const [allProducts, setAllProducts] = useState([])
  const shopdata = Cookies.get('shop');

  // Assuming shopdata is a JSON string, parse it to convert it to an object
  const shopObject = JSON.parse(shopdata);
  
  // Destructure the properties of the shopObject
  const { id, username, full_name, email, dp, role, address } = shopObject;
  
  useEffect(() => {
    try{
    axios.get(`${routePath}api/allproducts`, {
        params: {
          shop_id: id,
        },
      })
      .then((json) => {
        setAllProducts(json.data.products)
      })
    }
    catch(error){
      console.log(error)
    }
  }, [])
  const columns = [
    {name: 'Thumbnail', cell: (row) => <img src={row.thumbnail} alt="image" width='50' height='50'/>, sortable: true},
    {name: 'Product Name', selector: row => row.title, sortable: true},
    {name: 'Price', selector: row => row.price, sortable: true},
    {name: 'Category', selector: row => row.category, sortable: true},
    {name: 'Quantity', selector: row => row.stock, sortable: true}
  ]
  const [records, setRecords] = useState(allProducts);

function handleFilter(event) {
  const filterValue = event.target.value.toLowerCase();

  const newData = allProducts.filter((row) => {
    // Check if row.name and filterValue are defined before accessing their properties
    return row.name && row.name.toLowerCase().includes(filterValue);
  });

  setRecords(newData);
}

  const data1 = [
        {id:1, name:'yousaf', email:'yousaf@gmail.com', age:'20'},
        {id:2, name:'yousaf2', email:'yousaf2@gmail.com', age:'20'},
        {id:4, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:5, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:6, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:7, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:8, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:9, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:10, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:11, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:12, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:13, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:14, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:15, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'},
        {id:16, name:'yousaf3', email:'yousaf3@gmail.com', age:'20'}

  ]

  

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${routePath}api/deleteproducts`, { data: { _id: productId } });   
        Swal.fire({
          icon: 'success',
          title: 'Product Deleted',
          text: response.data.message
        });
      
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
          <div className="container">

          

            <div className="my-4 bg-white">
              <div className="text" style={{float:'right'}}>
                <AddProductModal />
              </div>
              
              <h3 className='ps-4 pb-2'>All Products</h3>
              <div>
                <input type='text' />
              </div>
              <hr/>
              <DataTable
            columns={columns}
            data={allProducts }
            fixedHeader
            pagination
          ></DataTable>
              {/* <div className="my-2">
                <h3 className='ps-4 pb-2'>All Products</h3>

                <table className="table  table-hover border">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thumbnail</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((product, index) => (
                      <tr key={product._id}> 
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            src={product.thumbnail}
                            alt="no image"
                            className="rounded-circle"
                            style={{ width: "100px", height: "100px", objectFit: "contain" }}
                          />
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                      <td>{<AiFillDelete onClick={(e) => {handleDelete(product._id)}}  className='text-danger' style={{fontSize: "50px", cursor:"pointer"}}/>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div> */}
            </div>
      </div>
    </div>
  )
}

export default Admin_Product
