import React from 'react'
import Cart from "../features/cart/Cart"
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/comman/Footer'

const CartPage = () => {
  return (
    <>
    <Navbar>
      <Cart>
      </Cart>
      </Navbar>
      <Footer></Footer>
    </>
  )
}

export default CartPage
