import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/Auth/AuthSlice";

import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import SignPage from './pages/SignPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import ProductDetailsPage from './pages/ProductDetialsPage';
import Protected from './features/Auth/Components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { fetchLoggedInUserAsync } from './features/user/UserSlice';
import Logout from './features/Auth/Components/Logout';

import ProtectedAdmin from './features/Auth/Components/ProtectedAdmin';
import AdminProductDetailsPage from './pages/AdminProductDetialsPage';
import ProductFormPage from './pages/ProductFormPage';
import {  positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


import AdminHome from './pages/AdminHome';

import AdminOrderPage from './pages/AdminOrderPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


const options = {

  position: positions.BOTTOM_LEFT,
  timeout: 2000,

}

const router=createBrowserRouter([
  {
    path: '/',
    element:<Protected><Home /></Protected> ,
    },
    {
      path: '/admin',
      element:<ProtectedAdmin><AdminHome /></ProtectedAdmin> ,
      },
      {
        path: '/admin/orders',
        element:<ProtectedAdmin><AdminOrderPage /></ProtectedAdmin> ,
        },
    {
      path: '/sign',
      element:<SignPage/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/cart',
    element:
    <Protected><CartPage/></Protected>
  },
  {
    path:'/checkout',
    element:
    <Protected><CheckOut/></Protected>
  },
  
  {
    path:'/productdetails/:id',
    element:<Protected> <ProductDetailsPage/></Protected>
  },
  
    
  {
    path:'admin/productdetails/:id',
    element:<ProtectedAdmin> <AdminProductDetailsPage/></ProtectedAdmin> 
  },
  {
    path:'admin/productForm',
    element:<ProtectedAdmin> <ProductFormPage/></ProtectedAdmin> 
  },
  {
    path:'admin/productForm/edit/:id',
    element:<ProtectedAdmin> <ProductFormPage/></ProtectedAdmin> 
  },
  {
    path:'/order-success/:id',
    element: <OrderSuccess/>
  },
  {
    path:'/orders',
    element:<Protected> <UserOrderPage/></Protected>
  },
  {
    path:'/profile',
    element:<Protected><UserProfilePage/></Protected>
  },
 
  {
    path:'/logout',
    element:<Logout></Logout>
  },
  {
    path:'/forgot',
    element:<ForgotPasswordPage/>
  },
  {
    path:'/reset-password',
    element:<ResetPasswordPage/>
  },
  {
    path:'*',
    element: <PageNotFound/>
  }
])

const App=()=> {
  const dispatch=useDispatch()
  const user= useSelector(selectLoggedInUser)
  const userChecked=useSelector(selectUserChecked)
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])
  useEffect(()=>{
   
    if(user){
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
   
  },[dispatch,user])
  
  return (
    <div className="App">
   
 { userChecked &&  <AlertProvider template={AlertTemplate} {...options}>
      <RouterProvider router={router}/>
      </AlertProvider>}
     
    </div>
  );
}

export default App;