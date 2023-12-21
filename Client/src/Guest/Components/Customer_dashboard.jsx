import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { routePath } from '../../App'
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';

const Customer_dashboard = () => {


  const tokenExists = Cookies.get('token') !== undefined;

  if (tokenExists) {
    console.log('Token exists:', Cookies.get('token'));
  } else {
    console.log('Token does not exist');
  }

  const logout = () => {
    // setTimeout(() => {
    //     loadingAlert.close();
        
    // }, 3000);
    // dispatch({
    //     type: "USER_LOGOUT"
    // })
    Cookies.set('user_token','');
    Cookies.set('user','');

    window.location.href = '';
}

const [allOrders, setallOrders] = useState([])
        const userdata = Cookies.get('user');

      // Assuming shopdata is a JSON string, parse it to convert it to an object
      const userObject = JSON.parse(userdata);
      
      // Destructure the properties of the shopObject
      const { id, username, full_name, email, dp, role, address } = userObject;
    /**/
    useEffect(() => {
    const fetchData = async () => {
      try {
            const response = await axios.get(`${routePath}api/getcustomerorders`, {
			params: {
			  user_id: id,
			},
		  });
              //.then((json) => {
                setallOrders(response.data.data)
                console.log(response)
            //})
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    fetchData();
  }, []); 
  
  const columns = [
    {name: 'Order ID', selector: row => row._id, sortable: true},
    {name: 'SUBTOTAL', selector: row => row.subTotal, sortable: true},
    {name: 'Order Date', selector: row => row.orderDate, sortable: true}
  ]
  const [records, setRecords] = useState(allOrders);
      /*useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${routePath}api/allorders`);
            setallOrders(response.data.data); // Assuming your API response has a 'data' property
            console.log(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array to run the effect only once when the component mounts
      */

  return (
    <>
     <main className="main mb-5">
                <br />
                <br />
                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <h1>Customer Dashboard</h1>
                            

                            <div className="navbar navbar-expand-lg">

                                  <ul className="navbar-nav">
                                      <li className="active">
                                          <a href="#" className="nav-link">Home</a>
                                      </li>
                                      <li className="nav-item">
                                          <a href="#" className="nav-link">Product</a>
                                      </li>
                                      
                                      <li className="nav-item">
                                          <a href="#" className="nav-link">Contact Us</a>
                                      </li>
                                      <li className="nav-item">
                                          <span style={{cursor:'pointer'}}  onClick={() => {logout()}} className="nav-link">LogOut</span>
                                      </li>
                                  </ul>
                              </div>




                            
            <div className="my-4 bg-white">
              <div className="text-center">
                
              </div>
              <div className="my-2">
                <h3 className='ps-4 pb-2'>All Orders</h3>
                <DataTable
                  className='sm'
                  columns={columns}
                  data={allOrders }
                  fixedHeader
                  pagination
                ></DataTable>

                {/* <table className="table  table-hover border">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">Subtotal [PKR]</th>
                      <th scope="col">Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order, index) => (
                      <tr key={order._id}> 
                        <th scope="row">{index + 1}</th>
                          <td>{order._id}</td>
                          <td>{order.subTotal}</td>
                          <td>{order.orderDate}</td>
                      <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}

              </div>
            </div>
      







                          
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .checkout */}
                </div>
                {/* End .page-content */}
            </main>

    </>
  );
};
export default Customer_dashboard;
