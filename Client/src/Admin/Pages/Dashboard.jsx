import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { routePath } from '../../App'

function Dashboard() {
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
    try {

      axios.get(`${routePath}api/alluser`)
      .then((json) => setUser(json.data.allusers))
      .catch((err) => {console.log(err.message)})

      axios.get(`${routePath}api/allcategories`)
      .then((json) => setCategories(json.data.categories))
      .catch((err) => {console.log(err.message)})

      axios.get(`${routePath}api/allproducts`)
      .then((json) => setProducts(json.data.products))
      .catch((err) => {console.log(err.message)})
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
   
    <div>
          <div className="list-group my-5">
          <h2 className="list-group-item list-group-item-action text-success">
            Dashboard
          </h2> 
        </div>
              <div className="list-group my-1 ">
                <h6 className="list-group-item list-group-item-action text-success d-flex justify-content-between">
                  All Users <span className="ms-auto">
                    {
                      //user.length
                    }
                  </span>
                </h6> 
              </div>
              <div className="list-group my-1 ">
                  <h6 className="list-group-item list-group-item-action text-success d-flex justify-content-between">
                    All Users <span className="ms-auto">{categories.length}</span>
                  </h6> 
              </div>
              <div className="list-group my-1 ">
                  <h6 className="list-group-item list-group-item-action text-success d-flex justify-content-between">
                    All Users <span className="ms-auto">{products.length}</span>
                  </h6> 
              </div>
    </div>
  )
}

export default Dashboard
