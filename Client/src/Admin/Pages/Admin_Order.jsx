import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { routePath } from '../../App'
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';

function Admin_Order() {
  const [allOrders, setallOrders] = useState([])
        const shopdata = Cookies.get('shop');

      // Assuming shopdata is a JSON string, parse it to convert it to an object
      const shopObject = JSON.parse(shopdata);
      
      // Destructure the properties of the shopObject
      const { id, username, full_name, email, dp, role, address } = shopObject;
    /**/
    useEffect(() => {
    const fetchData = async () => {
      try {
            const response = await axios.get(`${routePath}api/allorders`, {
			params: {
			  shop_id: id,
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
    <div>
      <div className="container">
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
    </div>
  )
}

export default Admin_Order
