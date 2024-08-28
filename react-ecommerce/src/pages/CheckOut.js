import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectItems,
  UpdateCartAsync,
  DeleteCartAsync
} from '../features/cart/CartSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { selectUserInfo, UpdateUserAsync } from '../features/user/UserSlice';
import { createOrderAsync,selectOrderStatus, selectOrderPlaced } from '../features/order/OrderSlice';
import { discountedPrice } from '../app/constant';
import { useAlert } from 'react-alert';
import { MagnifyingGlass } from 'react-loader-spinner'
const CheckOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const alert=useAlert()
  const status = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectOrderPlaced);
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  
  const [selectAddress, setSelectAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { register, handleSubmit ,reset } = useForm();

  const handleRemove = (id) => {
    dispatch(DeleteCartAsync(id));
  };

  const handleUpdate = (e, item) => {
    dispatch(UpdateCartAsync({ id:item.id, quantity:+e.target.value }));
  };

  const handleAddress = (e) => {
    setSelectAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (selectAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user:user.id,
        paymentMethod,
        selectAddress,
        status: "pending"  // other statuses can be "delivered", "received"
      };
      dispatch(createOrderAsync(order));
    } else {
      alert.info("Please select address and payment method ")
    }
  };

  // Conditional Navigation


  return (
    <>
     {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
     
     {status ==="loading"?<MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />:<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className='lg:col-span-3'>
        <form 
          onSubmit={handleSubmit((data) => {
            dispatch(UpdateUserAsync({
              ...user,
              addresses: [...user.addresses, data]
            }));
            reset()
          })}
          className='bg-white px-5 py-5 mt-8'
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                  <div className="mt-2">
                    <input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Email is not valid"
                        }
                      })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      {...register("phone", { required: "Phone is required" })}
                      type="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">Street</label>
                  <div className="mt-2">
                    <input
                      id="street"
                      {...register("street", { required: "Street is required" })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                  <div className="mt-2">
                    <input
                      id="city"
                      {...register("city", { required: "City is required" })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                  <div className="mt-2">
                    <input
                      id="state"
                      {...register("state", { required: "State is required" })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                  <div className="mt-2">
                    <input
                      id="pincode"
                      {...register("pincode", { required: "Pincode is required" })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Address
              </button>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose from existing addresses</p>
              <ul role="list">
                {user.addresses.map((address, index) => (
                  <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray">
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                      <p className="text-sm leading-6 text-gray-900">{address.pincode}</p>
                      <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                      <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        onChange={handlePayment}
                        name="payments"
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">Cash</label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        onChange={handlePayment}
                        name="payments"
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">Card</label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='lg:col-span-2'>
        <div className='mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className="mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Cart</h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={item.product.title}
                        src={item.product.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3><a href={item.product.id}>{item.product.title}</a></h3>
                         
                          <p className="ml-4">Rs {discountedPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label htmlFor='quantity' className='inline mr-5 text-sm font-medium leading-6 text-gray-900'>Qty</label>
                          <select onChange={(e) => handleUpdate(e, item)} value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs{totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total items in cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <div
                  onClick={handleOrder}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 }
    
    </>
  );
};

export default CheckOut;
