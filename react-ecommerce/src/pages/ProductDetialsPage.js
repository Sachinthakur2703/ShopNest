import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product.list/components/ProductDetails'
import Footer from '../features/comman/Footer'

const ProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
      <ProductDetails/>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailsPage
