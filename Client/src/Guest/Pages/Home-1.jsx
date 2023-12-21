import React, { useState, useEffect } from 'react'
import Product_Card from '../Components/Product_Card';
import axios from 'axios';
import { routePath } from '../../App';
import UserCrousel from '../Components/UserCrousel';
import { MdContactMail, MdImageNotSupported } from "react-icons/md"
import { RiRadioFill } from "react-icons/ri"
import image1 from '../Images/1680687323.png'
import image2 from '../Images/1678086752.jpg'
import image3 from '../Images/1673701252.jpeg'
import image4 from '../Images/1672481675.png'

function UserHome() {
  const api = `${routePath}api/allproducts`
  const [products, setProducts] = useState([])



  useEffect(() => {
    try {
      axios.get(api)
        .then((json) => { setProducts(json.data.products) })

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <section>
        <UserCrousel />
      </section>
      {/* Services */}
      <div className="container-fluid">
        <div className="row  shadow services ">
          <div className="col-lg-3 d-flex col-md-6 col-sm-12 ">
            <div className="d-flex mx-auto">
              <MdContactMail />
              <h6 className=" mx-sm-3" >Free Membership for shops</h6>
            </div>
    
          </div>
          <div className="col-lg-3 d-flex col-md-6 col-sm-12">
            <div className="d-flex mx-auto">
            <MdImageNotSupported />
            <h6 className=" mx-sm-3" >POS Facility for shops</h6>
            </div>
          </div>
          <div className="col-lg-3 d-flex col-md-6 col-sm-12">
            <div className="d-flex mx-auto">
            <MdImageNotSupported />
            <h6 className=" mx-sm-3" >Connectivity in just one click</h6>
            </div>
          </div>
          <div className="col-lg-3 d-flex col-md-6 col-sm-12">
            <div className="d-flex mx-auto">

            <RiRadioFill />
            <h6 className=" mx-sm-3" >24th/7 Support</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Shops */}

      <section className="projects bg-white mx-4 my-5 " id="">
        <div className='text-center'>
          <h5>VIEW ALL SHOPS</h5>
          <h1>Dukan24h Shop</h1>
        </div>
        {/* list Crousel */}

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
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

            <div className="carousel-item">
              <div className="row mx-auto">
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

            <div className="carousel-item">
              <div className="row">
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
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>


      </section>

      {/* Subscribe */}

      <section className='subscribe'>
        <div className="row bg-dark mx-2 d-flex ">
          <div className="col-lg-6 p-4 order-lg-1">
            <form className="d-flex search" role="search">
              <input
                className="px-3"
                type="search"
                placeholder="Search Shop & Product"
              />
              <button className="btn" type="submit">
                Subscibe
              </button>
            </form>
          </div>
          <div className="col-lg-6 p-3">
            <h6 className='text-white'>Subscribe Our Newsletter!</h6>
            <p className='text-white'>Subscribe to our newsletter for featured promotions and new products!</p>
          </div>
        </div>
      </section>

      {/* latest Products */}
      <section className="projects bg-white my-5 " id="project__section">
        <div className="container">
          <div className='text-center'>
            <h5 style={{ textTransform: "uppercase" }}>Latest</h5>
            <h1 style={{ textTransform: "uppercase" }}>products</h1>
          </div>
          <div className="row row-gap-3 mx-sm-auto">
            {
              products.slice(0,12).map((val, key) => (
                <Product_Card key={key} product={val} />
              ))
            }
          </div>
        </div>

      </section>

      {/* Feature Products */}
      <section className="projects bg-white my-5 " id="project__section">
        <div className="container">
          <div className='text-center'>
            <h5 style={{ textTransform: "uppercase" }}>featured</h5>
            <h1 style={{ textTransform: "uppercase" }}>products</h1>
          </div>
          <div className="row row-gap-3 mx-sm-auto">
            {
              products.slice(0,12).map((val, key) => (
                <Product_Card key={key} product={val} />
              ))
            }
          </div>
        </div>

      </section>
    </>
  )
}

export default UserHome;
