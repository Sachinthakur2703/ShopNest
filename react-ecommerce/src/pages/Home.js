import React from 'react'
import Product from '../features/product.list/components/Product'
import Navbar from '../features/navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../features/comman/Footer'

const Home = () => {
  return (
    <div>
        <Navbar>
      <Product/>
      </Navbar>
      <Footer></Footer>
      
    </div>
  )
}

export default Home
