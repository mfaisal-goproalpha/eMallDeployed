import React, { useState, useEffect } from 'react'
import Category_Card from '../Components/Category_Card'
import Product_Card from '../Components/Product_Card'
import axios from 'axios'
import { routePath } from '../../App'
function Categories() {
  const [category, setCategory] = useState(null)
  const [Products, setPreducts] = useState([])
  const [categories, seCategories] = useState([])
  useEffect(() => {
    try{
    axios.get(`${routePath}api/allcategories`)
      .then((json) => {
        seCategories(json.data.categories)
      })
    }
    catch(error){
      console.log(error)
    }
  }, [])


const getCategory = (get) => {
  setCategory(get)
}

useEffect(() => {
  try {
    // axios.get(`${routePath}getproductbycategory/ ${category || "Laptops"}`)
    axios.get(`${routePath}api/getproductbycategory/${category || "Laptops"}`)
    .then((json) => {
      setPreducts(json.data.products)
    })
    .catch((error) => {console.log(error.message)})
  } catch (error) {

  }
 
}, [category])


  return (
    <>
      <div className="row">
        <div className="col-2 p-3 pb-2 bg-dark rounded list-col">
          {
            categories?.map((val, key) => (
              <Category_Card key={key} categories={val.cat_name}  handleClick={getCategory}/>
            ))
          }
        </div>
        <div className="col-10">
          <div className="row">
          {
            Products  .length > 0? (
              Products.map((val, key) =>(
                <Product_Card key={key} product={val} />
              ))
            ):
            (
              <h3>No products available</h3>
            )
         
           }
`          </div>
        </div>
      </div>

    </>
  )
}

export default Categories
