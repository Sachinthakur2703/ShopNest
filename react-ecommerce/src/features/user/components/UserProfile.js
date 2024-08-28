import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, UpdateUserAsync } from '../UserSlice';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';


export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const { register, handleSubmit ,reset,setValue} = useForm();
  const [selectedEditIndex,setselectedEditIndex]=useState(-1)
  const [showAddAddressForm,setshowAddAddressForm]=useState(false)
  const alert=useAlert();
  const handleEdit = (addressUpdate,index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // Create a shallow copy
    newUser.addresses.splice(index, 1,addressUpdate); // Remove the address at the specified index
    dispatch(UpdateUserAsync(newUser));
    setselectedEditIndex(-1)
   
                                           // Add your edit logic here
  };

  const handleRemove = (e, index) => {
    console.log('Remove clicked', index);
    const newUser = { ...user, addresses: [...user.addresses] }; // Create a shallow copy
    newUser.addresses.splice(index, 1); // Remove the address at the specified index
    dispatch(UpdateUserAsync(newUser)); // Dispatch the updated user information
    alert.success("Removed successfully")
  };
  const handleEditForm=(index)=>{
    setselectedEditIndex(index)
    setshowAddAddressForm(false)
    const address= user.addresses[index]
    setValue("name",address.name)
    setValue("email",address.email)
    setValue("city",address.city)
    setValue("street",address.street)
    setValue("state",address.state)
    setValue("phone",address.phone)
    setValue("pincode",address.pincode)
    
  }
const handleAdd=(address)=>{
  const newUser = { ...user, addresses: [...user.addresses,address] };
    dispatch(UpdateUserAsync(newUser));
    setshowAddAddressForm(false)
    alert.success("Added successfully")
}
  return (
    <div className='mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className="mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          {user.name ? user.name : "Guest User"}
        </h1>
        <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
          Email: {user.email}
        </h3>
       {user.role ==="admin" &&( <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
          role: {user.role}
        </h3>)}
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <button
                  type="submit"
                  onClick={e=>{setshowAddAddressForm(true);
                    setselectedEditIndex(-1)}
                  }
                  className="rounded-md my-3 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Address
                </button>
       
                {showAddAddressForm===true ?  <form 
            onSubmit={handleSubmit((data) => {
             
              handleAdd(data)
              reset();
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
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
             
            </div>
          </form>:null}
        <p className='mt-0.5 text-sm text-gray-500'>Your Address</p>
        {user.addresses.map((address, index) => (
          <div>
            {selectedEditIndex===index ?  <form 
            onSubmit={handleSubmit((data) => {
             
              handleEdit(data)
              alert.success("Edited successfully")
              reset();
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
                  type="submit"
                  onClick={e=>setselectedEditIndex(-1)}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Address
                </button>
              </div>
             
            </div>
          </form>:null}
            
          <div
            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray"
            key={index}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                <p className="text-sm leading-6 text-gray-900">{address.pincode}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
              <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
                type="button" // Ensure this is a button and not a submit
                onClick={(e) => handleEditForm(index)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                type="button" // Ensure this is a button and not a submit
                onClick={(e) => handleRemove(e, index)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
