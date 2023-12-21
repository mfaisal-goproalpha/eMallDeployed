import React, { useState, useEffect } from 'react'
import Product_Card from '../Components/Product_Card';
import axios from 'axios';
import { routePath } from '../../App';
function UserHome() {
  const api = `${routePath}api/allproducts`
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      axios.get(api)
      .then((json) => {setProducts(json.data.products)})

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <section className="hero" id="hero__section">
        <article className="left-hero">
            <h3 style={{color: "white"}}>The Ultimate Shopping Experience: Discover Your Perfect Purchase!</h3>
          <p className="desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius,
            temporibus.
          </p>
        </article>
        <div className="right-hero">
          <img
            className='card-image img-fluid'
            id="hero__img"
            src="https://www.lenovo.com/medias/lenovo-laptop-thinkpad-l-subseries-thumbnail.png?context=bWFzdGVyfHJvb3R8MTcyMjR8aW1hZ2UvcG5nfGhhMS9oYjkvMTA4OTI2NjUyNTgwMTQucG5nfDlhMjk5NzYxOTZmZDM1ODZiNzBjOTExNjYyM2MzMTM2OTdhODdjNWQ3OWE5NDZkNzZiNWVkMGVmZjQzZGExMGY&w=480"
            alt="right-hero"
          />
        </div>
      </section>
      {/* New Arriaval */}
      <section className="projects my-5" id="project__section">
        <div className="container">
        <h3 className="project-heading my-1">New Arrival</h3>
        <p className='my-3'>Introducing the Latest Arrivals: Explore our newest collection of trendsetting products. From fashion-forward apparel to cutting-edge gadgets, be the first to discover the hottest items in the market. Upgrade your style and stay ahead with our new arrivals!</p>
          <div className="row">
           {
            products.map((val, key) =>(
              <Product_Card key={key} product={val} />
            ))
           }
          </div>
        </div>

      </section>

      {/* Feature Products */}
      <section className="projects" id="project__section">
        <div className="container">
        <h3 className="project-heading my-1">Feature Products</h3>
        <p className='my-3'>Introducing Our New Feature Products: Uncover the latest and most sought-after items carefully curated for you. Stay ahead of trends and find the perfect additions to your shopping wishlist. Explore our handpicked selection of must-have products that blend innovation, style, and quality. Upgrade your shopping experience today!</p>
          <div className="row">
           {
            products.map((val, key) =>(
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
