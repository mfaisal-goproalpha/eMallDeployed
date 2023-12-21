import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product_Card from '../Components/Product_Card';
import { routePath } from '../../App';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

import image1 from '../Images/1680687323.png'

import image2 from '../Images/1678086752.jpg'
import image3 from '../Images/1673701252.jpeg'
import image4 from '../Images/1672481675.png'

export default function Search_Page() {
  const api = `${routePath}api/allproducts`;
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  const [dukan, setDukan] = useState(false)

  useEffect(() => {
    try {
      axios.get(api).then((json) => {
        setProducts(json.data.products);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first" onClick={() =>{
                setDukan(false)
                setShowProducts(true)}}>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link" onClick={() =>{
                setDukan(true)
                setShowProducts(false)}}>
                Dukans
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {/* Use inline style to conditionally set the display property */}
          <div  style={{ display: showProducts ? 'block' : 'none' }} className="projects bg-white my-5" id="project__section">
            <div className="row row-gap-3 mx-sm-auto">
              {products.map((val, key) => (
                <Product_Card key={key} product={val} />
              ))}
            </div>
          </div>

          <div  className="projects bg-white my-5" style={{ display: dukan ? 'block' : 'none' }}>
          <div className="row ">
                
                {/* Column 1 */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card" style={{ width: "20rem" }}>
                    <img src={image1} className="card-img-top" alt="Shop Logo" style={{
                      width: "100%",
                      height: "160px"
                    }} />
                    <div className="card-body text-start bg-dark">
                      <a href='#' className='text-decoration-none text-white fs-5 mb-2'>Demo Pharmacy</a>
                      <p className="card-text">Pharmacy / Grocery Store</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card" style={{ width: "20rem" }}>
                    <img src={image2} className="card-img-top" alt="Shop Logo" style={{
                      width: "100%",
                      height: "160px"
                    }} />

                    <div className="card-body text-start bg-dark">
                      <a href='#' className='text-decoration-none text-white fs-5 mb-2'>Add Vqlue Advertiser</a>
                      <p className="card-text">Art supply store</p>
                    </div>
                  </div>


                  {/* Column 2 */}

                </div>

                {/* Column 3 */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card" style={{ width: "20rem" }}>
                    <img src={image3} className="card-img-top" alt="Shop Logo" style={{
                      width: "100%",
                      height: "160px"
                    }} />

                    <div className="card-body text-start bg-dark">
                      <a href='#' className='text-decoration-none text-white fs-5 mb-2'>KMH Electric Store</a>
                      <p className="card-text">Electircal Store</p>
                    </div>
                  </div>
                </div>

                {/* Column 4 */}
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card" style={{ width: "20rem" }}>
                    <img src={image4} className="card-img-top" alt="Shop Logo" style={{
                      width: "100%",
                      height: "160px"
                    }} />

                    <div className="card-body text-start bg-dark">
                      <a href='#' className='text-decoration-none text-white fs-5 mb-2'>goodgetgu</a>
                      <p className="card-text">Pharmacy / Grocery Store</p>
                    </div>
                  </div>
                </div>

              </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
